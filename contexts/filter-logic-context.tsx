"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Filter, Product, ProductArchiveFilterResponse } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

type NumericFilter = { min: number; max: number };
type CheckboxFilter = { [option: string]: boolean };

type CheckedItems = {
  [key: string]: NumericFilter | CheckboxFilter;
};

type FiltersContextType = {
  attributes: Filter[];
  checkedItems: CheckedItems;
  setCheckedItems: (items: CheckedItems) => void;
  inStockOnly: boolean | null;
  setInStockOnly: (value: boolean | null) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  toggleFilter: (index: number | null) => void;
  openFilter: number | null;
  setOpenFilter: (index: number | null) => void;
  clearFilters: () => void;
  handleCheckAndFilterChange: (
    filterId: string,
    value: string | number | [number, number]
  ) => void;
  handleRangeChange: (
    filterId: string,
    range: { min: number; max: number }
  ) => void;
  enabledAttributes: Set<string>;
  totalDocs: number;
  totalPages: number;
  filteredProductsCount: number;
  applyFilters: () => void;
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
  const [attributes, setAttributes] = useState<Filter[]>([]);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [inStockOnly, setInStockOnly] = useState<boolean | null>(null);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts); // Initially show all products
  const [enabledAttributes, setEnabledAttributes] = useState<Set<string>>(
    new Set()
  );
  const [filteredProductsCount, setFilteredProductsCount] = useState<number>(
    initialProducts.length
  );

  const router = useRouter();

  // Build the query string from checkedItems and inStockOnly.
  // Numeric filters are formatted as "min,max" while checkbox filters join the keys that are true.
  const buildQueryString = () => {
    const params = new URLSearchParams();
    Object.keys(checkedItems).forEach((filterId) => {
      const filterValue = checkedItems[filterId];
      if ("min" in filterValue && "max" in filterValue) {
        // Numeric filter: use comma-separated min and max
        params.set(filterId, `${filterValue.min},${filterValue.max}`);
      } else {
        // Checkbox filter
        const selectedValues = Object.keys(filterValue).filter(
          (key) => filterValue[key]
        );
        if (selectedValues.length > 0) {
          params.set(filterId, selectedValues.join(","));
        }
      }
    });
    if (inStockOnly) {
      params.set("available", "true");
    }
    return params.toString();
  };

  // Fetch all products initially (no filters applied)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product`);
        if (!res.ok) throw new Error("Failed to fetch all products!");
        const data = await res.json();
        setFilteredProducts(data.docs);
        setTotalDocs(data.totalDocs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  // Fetch the count of filtered products when filters change
  useEffect(() => {
    const fetchFilteredProductCount = async () => {
      const queryString = buildQueryString();
      try {
        const res = await fetch(`${BASE_URL}/product?${queryString}`);
        if (!res.ok)
          throw new Error("Failed to fetch filtered products count!");
        const data = await res.json();
        setFilteredProductsCount(data.docs.length);
      } catch (error) {
        console.error("Error fetching filtered products count:", error);
      }
    };
    fetchFilteredProductCount();
  }, [checkedItems, inStockOnly]);

  // Fetch filter attributes on mount
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product-archive-filter`);
        if (!res.ok) throw new Error("Error fetching filter attributes!");
        const data: ProductArchiveFilterResponse = await res.json();
        setAttributes(data.filters);
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
      }
    };
    fetchAttributes();
  }, []);

  // Apply filters and fetch filtered products when "Show Products" is clicked
  const applyFilters = async () => {
    const queryString = buildQueryString();
    try {
      const res = await fetch(`${BASE_URL}/product?${queryString}`);
      if (!res.ok) throw new Error("Failed to fetch filtered products!");
      const data = await res.json();
      setTotalDocs(data.totalDocs);
      setTotalPages(data.totalPages);
      setFilteredProducts(data.docs);
      router.push(`?${queryString}`);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  // Update enabledAttributes based on fetched filters
  useEffect(() => {
    setEnabledAttributes(new Set(attributes.map((filter) => filter.id)));
  }, [attributes]);

  const handleCheckAndFilterChange = (
    filterId: string,
    value: string | number | [number, number]
  ) => {
    setCheckedItems((prev) => {
      let updated = { ...prev };
      if (Array.isArray(value)) {
        // For numeric filters, update with a NumericFilter object.
        updated[filterId] = { min: value[0], max: value[1] };
      } else {
        // For checkbox filters, cast the previous value to a CheckboxFilter.
        const prevCheckbox = (prev[filterId] as CheckboxFilter) || {};
        updated[filterId] = {
          ...prevCheckbox,
          [value.toString()]: !prevCheckbox[value.toString()],
        };
        // If no checkbox is selected, remove the filter.
        if (
          Object.values(updated[filterId] as CheckboxFilter).every(
            (selected) => !selected
          )
        ) {
          delete updated[filterId];
        }
      }
      return updated;
    });
  };

  const handleRangeChange = (
    filterId: string,
    { min, max }: { min: number; max: number }
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [filterId]: { min, max },
    }));
  };

  const toggleFilter = (index: number | null) => {
    setOpenFilter(openFilter === index ? null : index);
  };

  const clearFilters = () => {
    // Here you could reset state or redirect; this example navigates to the archive page.
    window.location.href = "/archiv";
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
        setFilteredProducts,
        toggleFilter,
        openFilter,
        setOpenFilter,
        handleCheckAndFilterChange,
        handleRangeChange,
        enabledAttributes,
        totalDocs,
        totalPages,
        filteredProductsCount,
        clearFilters,
        applyFilters,
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
