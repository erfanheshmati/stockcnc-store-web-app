"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Attribute, AttributeType, Product } from "@/lib/types";
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
  // sortOption: string;
  // setSortOption: (value: string) => void;
  handleCheck: (
    attributeTitle: string,
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
  // const [sortOption, setSortOption] = useState<string>("latest");
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

      // Object.entries(checkedItems).forEach(([attributeId, values]) => {
      //   Object.entries(values).forEach(([value, isSelected]) => {
      //     if (isSelected) {
      //       params.append(attributeId, value);
      //     }
      //   });
      // });

      if (inStockOnly) {
        currentParams.set("available", "true");
      } else {
        currentParams.delete("available");
      }

      // if (sortOption) {
      //   params.set("sort", sortOption);
      // }

      // Push the updated parameters back to the router
      // router.push(`?${currentParams.toString()}`);

      // Push the updated parameters back to the router
      const newQueryString = currentParams.toString();
      if (window.location.search !== `?${newQueryString}`) {
        router.push(`?${newQueryString}`);
      }
    };

    updateUrlParams();
  }, [checkedItems, inStockOnly, router]);

  const fetchFilteredProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/product?${searchParams.toString()}`);
      // const res = await fetch(
      //   `${BASE_URL}/product?${searchParams.toString()}&page=${pageQuery}&limit=${limitQuery}&category=${categoryQuery}&q=${searchQuery}&sort=${sortQuery}&view=${viewQuery}`
      // );
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

  const handleCheck = (
    attributeTitle: string,
    value: string | number | [number, number]
  ) => {
    setCheckedItems((prev) => {
      const updated = {
        ...prev,
        [attributeTitle]: {
          ...prev[attributeTitle],
          [value.toString()]: !prev[attributeTitle]?.[value.toString()],
        },
      };
      // Remove the attribute entirely if no values are selected
      if (
        Object.values(updated[attributeTitle]).every((selected) => !selected)
      ) {
        delete updated[attributeTitle];
      }
      return updated;
    });
  };

  // const handleRangeChange = (
  //   attributeTitle: string,
  //   range: { min: number; max: number }
  // ) => {
  //   setCheckedItems((prev) => ({
  //     ...prev,
  //     [attributeTitle]: {
  //       min: range.min,
  //       max: range.max,
  //     },
  //   }));
  // };

  const handleRangeChange = (
    attributeId: string,
    range: { min: number; max: number }
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [attributeId]: {
        min: range.min,
        max: range.max,
      },
    }));
  };

  const clearFilters = () => {
    setCheckedItems({});
    setInStockOnly(null);
    setOpenFilter(null);
    // updateUrlParams();
    // setSortOption("latest");
    const params = new URLSearchParams();
    router.push(`?${params.toString()}`);
    // fetchFilteredProducts();
  };

  const toggleFilter = (index: number | null) => {
    setOpenFilter(openFilter === index ? null : index);
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchParams]);

  // useEffect(() => {
  //   const filterAndSortProducts = () => {
  //     let filtered = [...initialProducts];
  //     // Apply attribute filters
  //     Object.keys(checkedItems).forEach((attributeTitle) => {
  //       const selectedValues = Object.keys(checkedItems[attributeTitle]).filter(
  //         (key) => checkedItems[attributeTitle][key]
  //       );
  //       if (selectedValues.length > 0) {
  //         filtered = filtered.filter((product) =>
  //           product.attributes.some((attr) => {
  //             // Range-based filtering for numeric attributes
  //             if (
  //               typeof checkedItems[attributeTitle]?.min === "number" &&
  //               typeof checkedItems[attributeTitle]?.max === "number"
  //             ) {
  //               const { min, max } = checkedItems[attributeTitle] as {
  //                 min: number;
  //                 max: number;
  //               };
  //               const value = parseFloat(attr.value.toString());
  //               return value >= min && value <= max;
  //             }
  //             // Regular filtering for other attributes
  //             return (
  //               attr.attribute?.title === attributeTitle &&
  //               selectedValues.includes(attr.value.toString())
  //             );
  //           })
  //         );
  //       }
  //     });
  //     if (inStockOnly) {
  //       filtered = filtered.filter((product) => product.available);
  //     }
  //     // Apply sorting
  //     // if (sortOption === "latest") {
  //     //   filtered.sort(
  //     //     (a, b) =>
  //     //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     //   );
  //     // } else if (sortOption === "mostViewed") {
  //     //   filtered.sort((a, b) => b.view - a.view);
  //     // }
  //     setFilteredProducts(filtered);
  //   };
  //   filterAndSortProducts();
  // }, [checkedItems, inStockOnly, initialProducts,
  //   //  sortOption
  //   ]);

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
            checkedItems[parentAttribute.title] &&
            Object.values(checkedItems[parentAttribute.title]).some(Boolean)
          ) {
            enabled.add(attribute._id);
          }
        }
      });
      setEnabledAttributes(enabled);
    };
    calculateEnabledAttributes();
  }, [attributes, checkedItems]);

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
        handleCheck,
        handleRangeChange,
        // sortOption,
        // setSortOption,
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
