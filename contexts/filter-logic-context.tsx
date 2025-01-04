"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AttributeType, Product } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

type CheckedItems = {
  [attributeTitle: string]: {
    [value: string]: string | number | boolean;
  };
};

type FiltersContextType = {
  attributes: AttributeType[];
  checkedItems: CheckedItems;
  setCheckedItems: (items: CheckedItems) => void;
  inStockOnly: boolean | null;
  setInStockOnly: (value: boolean | null) => void;
  filteredProducts: Product[];
  toggleFilter: (index: number | null) => void;
  openFilter: number | null;
  setOpenFilter: (index: number | null) => void;
  clearFilters: () => void;
  handleCheckAndFilterChange: (
    attributeId: string,
    value: string | number | [number, number]
  ) => void;
  handleRangeChange: (
    attributeTitle: string,
    range: { min: number; max: number }
  ) => void;
  enabledAttributes: Set<string>;
};

const FiltersLogicContext = createContext<FiltersContextType | undefined>(
  undefined
);

export function FiltersLogicProvider({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts: Product[];
}) {
  const [attributes, setAttributes] = useState<AttributeType[]>([]);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [inStockOnly, setInStockOnly] = useState<boolean | null>(null);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [enabledAttributes, setEnabledAttributes] = useState<Set<string>>(
    new Set()
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product-archive-filter`);
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات برند!");
        const data = await res.json();
        setAttributes(data);
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
      }
    };
    fetchAttributes();
  }, []);

  useEffect(() => {
    const calculateEnabledAttributes = () => {
      const enabled = new Set<string>();

      attributes.forEach((attribute) => {
        if (!attribute.requiredAttribute) {
          enabled.add(attribute._id); // Always visible if no dependency
        } else {
          const parentAttribute = attributes.find(
            (attr) => attr._id === attribute.requiredAttribute
          );
          if (
            parentAttribute &&
            // checkedItems[parentAttribute.title] &&
            checkedItems[parentAttribute._id] &&
            // Object.values(checkedItems[parentAttribute.title]).some(Boolean)
            Object.values(checkedItems[parentAttribute._id]).some(Boolean)
          ) {
            enabled.add(attribute._id);
          }
        }
      });
      setEnabledAttributes(enabled);
    };
    calculateEnabledAttributes();
  }, [attributes, checkedItems]);

  useEffect(() => {
    const updateUrlParams = () => {
      // Get existing query params from the URL
      const currentParams = new URLSearchParams(window.location.search);
      // Update or clear filter parameters based on `checkedItems`
      Object.keys(checkedItems).forEach((attributeId) => {
        const selectedValues = Object.keys(checkedItems[attributeId]).filter(
          (key) => checkedItems[attributeId][key]
        );

        if (selectedValues.length > 0) {
          currentParams.set(attributeId, selectedValues.join(","));
        } else {
          currentParams.delete(attributeId);
        }
      });

      if (inStockOnly) {
        currentParams.set("available", "true");
      } else {
        currentParams.delete("available");
      }

      // Push the updated parameters back to the router
      const newQueryString = currentParams.toString();
      if (window.location.search !== `?${newQueryString}`) {
        router.push(`?${newQueryString}`);
      }
    };

    updateUrlParams();
  }, [checkedItems, inStockOnly, router]);

  useEffect(() => {
    const loadFiltersFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const newCheckedItems: CheckedItems = {};

      params.forEach((value, key) => {
        // Check if the parameter is for a range (e.g., [min,max])
        if (value.startsWith("[") && value.endsWith("]")) {
          const [min, max] = value.slice(1, -1).split(",").map(Number); // Convert to numbers
          newCheckedItems[key] = { min, max };
        } else {
          newCheckedItems[key] = {}; // Handle other filter types here
        }
      });

      setCheckedItems(newCheckedItems);
    };

    loadFiltersFromUrl();
  }, []);

  const fetchFilteredProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/product?${searchParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch filtered products!");

      const data = await res.json();
      const totalDocs = data.totalDocs;
      const totalPages = data.totalPages;

      setFilteredProducts(data.docs);

      // Update URL params to include totalDocs and totalPages
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.set("totalDocs", totalDocs.toString());
      updatedParams.set("totalPages", totalPages.toString());

      // Push the updated URL back to the router
      router.push(`?${updatedParams.toString()}`);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchParams]);

  const toggleFilter = (index: number | null) => {
    setOpenFilter(openFilter === index ? null : index);
  };

  const handleCheckAndFilterChange = (
    attributeId: string,
    value: string | number | [number, number]
  ) => {
    setCheckedItems((prev) => {
      let updated = { ...prev };

      if (Array.isArray(value)) {
        // Handle range values [min, max]
        updated[attributeId] = { min: value[0], max: value[1] };
      } else {
        // Handle non-range values (string/number)
        updated = {
          ...prev,
          [attributeId]: {
            ...prev[attributeId],
            [value.toString()]: !prev[attributeId]?.[value.toString()],
          },
        };

        // If all values for the attribute are unchecked, remove the attribute
        if (
          Object.values(updated[attributeId]).every((selected) => !selected)
        ) {
          delete updated[attributeId];
        }
      }

      // Update URL parameters
      const params = new URLSearchParams(searchParams.toString());

      if (Array.isArray(value)) {
        // Set range [min, max] in the URL
        // params.set(attributeId, `[${value[0]},${value[1]}]`);

        // Manually create the range string in the format [min,max]
        const rangeString = `[${value[0]},${value[1]}]`;
        // Set the unencoded range string
        params.set(attributeId, rangeString);
      } else {
        // Handle toggling of non-range values
        const isChecked = prev[attributeId]?.[value.toString()] || false;

        if (isChecked) {
          // If the value is already checked, remove it from URL
          const existingValues = params.get(attributeId);
          if (existingValues) {
            const valuesArray = existingValues.split(",");
            const updatedValues = valuesArray.filter(
              (v) => v !== value.toString()
            );
            if (updatedValues.length > 0) {
              params.set(attributeId, updatedValues.join(","));
            } else {
              params.delete(attributeId); // Remove the param if no values are left
            }
          }
        } else {
          // If the value is not checked, add it to the URL
          const existingValues = params.get(attributeId);
          if (existingValues) {
            const valuesArray = existingValues.split(",");
            if (!valuesArray.includes(value.toString())) {
              valuesArray.push(value.toString());
              params.set(attributeId, valuesArray.join(","));
            }
          } else {
            params.set(attributeId, value.toString());
          }
        }
      }

      // Push the updated parameters to the router
      router.push(`?${params.toString()}`);

      return updated;
    });
  };

  const handleRangeChange = (
    attributeId: string,
    // range: { min: number; max: number }
    { min, max }: { min: number; max: number }
  ) => {
    setCheckedItems((prev) => {
      // const updatedCheckedItems = {
      //   ...prev,
      //   [attributeId]: {
      //     min: range.min,
      //     max: range.max,
      //   },
      // };

      const updated = { ...prev };

      // Handle range values [min, max]
      updated[attributeId] = { min, max };

      // Update URL parameters
      const params = new URLSearchParams(searchParams.toString());
      // if (range.min || range.max) {
      //   params.set(
      //     attributeId,
      //     encodeURIComponent(`[${range.min},${range.max}]`)
      //   );
      // } else {
      //   params.delete(attributeId); // If both min and max are not set, remove the query param
      // }

      // Ensure the range is formatted correctly without extra encoding
      params.set(attributeId, `[${min},${max}]`);

      router.push(`?${params.toString()}`);

      // return updatedCheckedItems;
      return updated;
    });
  };

  const clearFilters = () => {
    setCheckedItems({});
    setInStockOnly(null);
    setOpenFilter(null);
    window.history.replaceState(null, "", "/archiv");
  };

  return (
    <FiltersLogicContext.Provider
      value={{
        attributes,
        checkedItems,
        setCheckedItems,
        inStockOnly,
        setInStockOnly,
        filteredProducts,
        toggleFilter,
        openFilter,
        setOpenFilter,
        clearFilters,
        handleCheckAndFilterChange,
        handleRangeChange,
        enabledAttributes,
      }}
    >
      {children}
    </FiltersLogicContext.Provider>
  );
}

export function useFiltersLogic() {
  const context = useContext(FiltersLogicContext);
  if (!context) {
    throw new Error(
      "useFiltersLogic must be used within a FiltersLogicProvider"
    );
  }
  return context;
}
