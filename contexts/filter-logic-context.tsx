"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Attribute, AttributeType, Product } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

type CheckedItems = {
  [attributeTitle: string]: {
    [value: string]: string | number | boolean;
  };
};

type FiltersContextType = {
  attributes: AttributeType[];
  checkedItems: CheckedItems;
  setCheckedItems: (items: CheckedItems) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  filteredProducts: Product[];
  toggleFilter: (index: number | null) => void;
  openFilter: number | null;
  setOpenFilter: (index: number | null) => void;
  clearFilters: () => void;
  sortOption: string;
  setSortOption: (value: string) => void;
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
  const [inStockOnly, setInStockOnly] = useState(false);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("latest");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [enabledAttributes, setEnabledAttributes] = useState<Set<string>>(
    new Set()
  );

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

  const handleCheck = (
    attributeTitle: string,
    value: string | number | [number, number]
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [attributeTitle]: {
        ...prev[attributeTitle],
        [value.toString()]: !prev[attributeTitle]?.[value.toString()],
      },
    }));
  };

  const handleRangeChange = (
    attributeTitle: string,
    range: { min: number; max: number }
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [attributeTitle]: {
        min: range.min,
        max: range.max,
      },
    }));
  };

  const clearFilters = () => {
    setCheckedItems({});
    setInStockOnly(false);
    setOpenFilter(null);
    setSortOption("latest");
  };

  const toggleFilter = (index: number | null) => {
    setOpenFilter(openFilter === index ? null : index);
  };

  useEffect(() => {
    const filterAndSortProducts = () => {
      let filtered = [...initialProducts];
      // Apply attribute filters
      Object.keys(checkedItems).forEach((attributeTitle) => {
        const selectedValues = Object.keys(checkedItems[attributeTitle]).filter(
          (key) => checkedItems[attributeTitle][key]
        );
        if (selectedValues.length > 0) {
          filtered = filtered.filter((product) =>
            product.attributes.some((attr) => {
              // Range-based filtering for numeric attributes
              if (
                typeof checkedItems[attributeTitle]?.min === "number" &&
                typeof checkedItems[attributeTitle]?.max === "number"
              ) {
                const { min, max } = checkedItems[attributeTitle] as {
                  min: number;
                  max: number;
                };
                const value = parseFloat(attr.value.toString());
                return value >= min && value <= max;
              }
              // Regular filtering for other attributes
              return (
                attr.attribute?.title === attributeTitle &&
                selectedValues.includes(attr.value.toString())
              );
            })
          );
        }
      });
      if (inStockOnly) {
        filtered = filtered.filter((product) => product.available);
      }
      // Apply sorting
      if (sortOption === "latest") {
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOption === "mostViewed") {
        filtered.sort((a, b) => b.view - a.view);
      }
      setFilteredProducts(filtered);
    };
    filterAndSortProducts();
  }, [checkedItems, inStockOnly, initialProducts, sortOption]);

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
        sortOption,
        setSortOption,
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
