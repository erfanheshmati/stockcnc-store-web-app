"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AttributeType, Product } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

type CheckedItems = {
  [attributeTitle: string]: {
    [value: string]: string | number | boolean | null;
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
  totalDocs: number;
  totalPages: number;
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
  const [totalDocs, setTotalDocs] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [enabledAttributes, setEnabledAttributes] = useState<Set<string>>(
    new Set()
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAttributes = async () => {
      // const controller = new AbortController();
      try {
        const res = await fetch(`${BASE_URL}/product-archive-filter`, {
          // signal: controller.signal,
        });
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات برند!");
        const data = await res.json();
        setAttributes(data);
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
      }
      // return () => controller.abort();
    };
    fetchAttributes();
  }, []);

  useEffect(() => {
    const calculateEnabledAttributes = () => {
      const enabled = new Set<string>();

      attributes.forEach((attribute) => {
        if (!attribute.requiredAttribute) {
          enabled.add(attribute._id);
        } else {
          const parentAttribute = attributes.find(
            (attr) => attr._id === attribute.requiredAttribute
          );
          if (
            parentAttribute &&
            checkedItems[parentAttribute._id] &&
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
    const params = new URLSearchParams(window.location.search);
    const newCheckedItems: CheckedItems = {};

    // Load range filters from URL params
    params.forEach((value, key) => {
      if (value.includes("-")) {
        const [min, max] = value
          .split("-")
          .map((v) => (isNaN(Number(v)) ? null : Number(v)));
        newCheckedItems[key] = { min, max };
      } else {
        const values = value.split(",");
        newCheckedItems[key] = values.reduce((acc, val) => {
          acc[val] = true; // Mark each value as checked
          return acc;
        }, {} as { [value: string]: boolean });
      }
    });

    setCheckedItems(newCheckedItems);

    // Load inStockOnly from URL
    const availableParam = params.get("available");

    setInStockOnly(
      availableParam === "true"
        ? true
        : availableParam === "false"
        ? false
        : null
    );
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentParams = new URLSearchParams(window.location.search);
      const newParams = new URLSearchParams();

      Object.keys(checkedItems).forEach((attributeId) => {
        const selectedValues = Object.keys(checkedItems[attributeId]).filter(
          (key) => checkedItems[attributeId][key]
        );
        if (selectedValues.length > 0) {
          newParams.set(attributeId, selectedValues.join(","));
        }
      });

      if (inStockOnly) {
        newParams.set("available", "true");
      } else {
        newParams.delete("available");
      }

      const newQueryString = newParams.toString();
      if (currentParams.toString() !== newQueryString) {
        router.push(`?${newQueryString}`);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [checkedItems, inStockOnly, router]);

  // useEffect(() => {
  //   const loadFiltersFromUrl = () => {
  //     const params = new URLSearchParams(window.location.search);
  //     const newCheckedItems: CheckedItems = {};

  //     params.forEach((value, key) => {
  //       if (value.startsWith("[") && value.endsWith("]")) {
  //         const [min, max] = value.slice(1, -1).split(",").map(Number);
  //         newCheckedItems[key] = { min, max };
  //       } else {
  //         const values = value.split(",");
  //         newCheckedItems[key] = values.reduce((acc, val) => {
  //           acc[val] = true; // Mark each value as checked
  //           return acc;
  //         }, {} as { [value: string]: boolean });
  //       }
  //     });

  //     setCheckedItems(newCheckedItems);
  //   };

  //   loadFiltersFromUrl();
  // }, []);

  // const searchQuery = searchParams.get("q") || "";
  // const categoryQuery = searchParams.get("category") || "";
  // const pageQuery = parseInt(searchParams.get("page") || "1", 10);
  // const limitQuery = parseInt(searchParams.get("limit") || "10", 10);
  // const sortQuery = searchParams.get("sort") || "";

  const fetchFilteredProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/product?${searchParams.toString()}`);
      // const res = await fetch(
      //   `${BASE_URL}/product?${searchParams.toString()}&page=${pageQuery}&limit=${limitQuery}&category=${categoryQuery}&q=${searchQuery}&sort=${sortQuery}`
      // );
      if (!res.ok) throw new Error("Failed to fetch filtered products!");

      const data = await res.json();
      const totalDocs = data.totalDocs;
      const totalPages = data.totalPages;
      setTotalDocs(totalDocs);
      setTotalPages(totalPages);

      setFilteredProducts(data.docs);

      const updatedParams = new URLSearchParams(searchParams.toString());

      router.push(`?${updatedParams.toString()}`);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const updateParams = (
    params: URLSearchParams,
    attributeId: string,
    value: string | number | [number, number],
    isChecked: boolean
  ) => {
    if (Array.isArray(value)) {
      const rangeString = `${value[0]}-${value[1]}`;
      params.set(attributeId, rangeString);
    } else if (isChecked) {
      const existingValues = params.get(attributeId);
      if (existingValues) {
        const valuesArray = existingValues.split(",");
        const updatedValues = valuesArray.filter((v) => v !== value.toString());
        if (updatedValues.length > 0) {
          params.set(attributeId, updatedValues.join(","));
        } else {
          params.delete(attributeId);
        }
      }
    } else {
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
        updated[attributeId] = { min: value[0], max: value[1] };
      } else {
        updated = {
          ...prev,
          [attributeId]: {
            ...prev[attributeId],
            [value.toString()]: !prev[attributeId]?.[value.toString()],
          },
        };

        if (
          Object.values(updated[attributeId]).every((selected) => !selected)
        ) {
          delete updated[attributeId];
        }
      }

      const params = new URLSearchParams(searchParams.toString());
      const isChecked =
        typeof value !== "object" &&
        prev[attributeId]?.[value.toString()] === true;

      updateParams(params, attributeId, value, isChecked);
      router.push(`?${params.toString()}`);

      return updated;
    });
  };

  const handleRangeChange = (
    attributeId: string,
    { min, max }: { min: number | null; max: number | null }
  ) => {
    // Update local state for debouncing URL updates
    setCheckedItems((prev) => {
      const updated = { ...prev };
      if (min === null && max === null) {
        // Remove the attribute if both inputs are cleared
        delete updated[attributeId];
      } else {
        // updated[attributeId] = { min, max };
        updated[attributeId] = { min: min ?? 0, max: max ?? 0 };
      }
      return updated;
    });

    // Delay updating the URL until both min and max are provided or cleared
    clearTimeout((window as any).rangeUpdateTimer); // Clear previous timer
    (window as any).rangeUpdateTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (min === null || (min === 0 && max === null) || max === 0) {
        // Clear the parameter from the URL if both inputs are cleared
        params.delete(attributeId);
      } else if (min !== null || (min !== 0 && max !== null) || max !== 0) {
        // Update the URL with the format id=min-max
        params.set(attributeId, `${min}-${max}`);
      }

      router.push(`?${params.toString()}`);
    }, 1000); // Adjust debounce delay as needed
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
        totalDocs: totalDocs ?? 0,
        totalPages: totalPages ?? 0,
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
