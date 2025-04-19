"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Filter, Product, ProductArchiveFilterResponse } from "@/lib/types";
import { API_URL } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

type NumericFilter = { min: number; max: number };
export type CheckboxFilter = { [option: string]: boolean };

type CheckedItems = {
  [key: string]: NumericFilter | CheckboxFilter;
};

type FiltersContextType = {
  totalDocs: number;
  totalPages: number;
  filteredProductsCount: number;
  isLoading: boolean;
  attributes: Filter[];
  checkedItems: CheckedItems;
  setCheckedItems: (items: CheckedItems) => void;
  inStockOnly: boolean | null;
  setInStockOnly: (value: boolean | null) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  openFilter: number | null;
  setOpenFilter: (index: number | null) => void;
  toggleFilter: (index: number | null) => void;
  clearFilters: () => void;
  handleCheckAndFilterChange: (
    filterId: string,
    value: string | number | [number, number]
  ) => void;
  handleRangeChange: (
    filterId: string,
    range: { min: number; max: number }
  ) => void;
  applyFilters: (autoApply?: boolean) => void;
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
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState<Filter[]>([]);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [inStockOnly, setInStockOnly] = useState<boolean | null>(null);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasAutoApplied, setHasAutoApplied] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [filteredProductsCount, setFilteredProductsCount] = useState<number>(
    initialProducts.length
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  // Build the query string from checkedItems and inStockOnly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buildQueryString = () => {
    const params = new URLSearchParams();
    Object.keys(checkedItems).forEach((filterId) => {
      const filterValue = checkedItems[filterId];
      if ("min" in filterValue && "max" in filterValue) {
        // Use dash between min and max values
        params.set(filterId, `${filterValue.min}-${filterValue.max}`);
      } else {
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

  // Fetch the count of filtered products when filters change
  useEffect(() => {
    const fetchFilteredProductCount = async () => {
      const queryString = buildQueryString();
      try {
        const res = await fetch(`${API_URL}/product?${queryString}`);
        if (!res.ok) {
          throw new Error("Failed to fetch filtered products count!");
        }
        const data = await res.json();
        setFilteredProductsCount(data.docs.length);
      } catch (error) {
        console.error("Error fetching filtered products count:", error);
      }
    };
    fetchFilteredProductCount();
  }, [buildQueryString, checkedItems, inStockOnly]);

  // Fetch filter attributes on mount
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await fetch(`${API_URL}/product-archive-filter`);
        if (!res.ok) throw new Error("Error fetching filter attributes!");
        const data: ProductArchiveFilterResponse = await res.json();
        setAttributes(data.filters);
      } catch (error) {
        console.error("Failed to fetch attributes:", error);
      }
    };
    fetchAttributes();
  }, []);

  // Parse URL query parameters on mount and update filter state
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const newCheckedItems: CheckedItems = {};
      let stock: boolean | null = null;
      params.forEach((value, key) => {
        if (key === "available") {
          stock = value === "true";
        } else {
          // For numeric filters, split on dash (-)
          const parts = value.split("-");
          if (
            parts.length === 2 &&
            !isNaN(parseFloat(parts[0])) &&
            !isNaN(parseFloat(parts[1]))
          ) {
            newCheckedItems[key] = {
              min: parseFloat(parts[0]),
              max: parseFloat(parts[1]),
            };
          } else {
            // Otherwise assume checkbox filter (using comma-separated values)
            const checkboxState: CheckboxFilter = {};
            value.split(",").forEach((v) => {
              checkboxState[v] = true;
            });
            newCheckedItems[key] = checkboxState;
          }
        }
      });
      setCheckedItems(newCheckedItems);
      setInStockOnly(stock);
    }
  }, []);

  // Auto-apply filters once after state has been updated from URL params
  useEffect(() => {
    if (
      !hasAutoApplied &&
      typeof window !== "undefined" &&
      window.location.search
    ) {
      setHasAutoApplied(true);
      applyFilters(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAutoApplied, checkedItems, inStockOnly]);

  // Apply filters and fetch filtered products when "Show Products" is clicked or auto-applied
  const applyFilters = async (autoApply = false) => {
    setIsLoading(true);
    const filterQueryString = buildQueryString();
    // Retrieve default reserved parameters from the URL (q, category, sort)
    const urlParams = new URLSearchParams(window.location.search);
    const defaultParams = new URLSearchParams();
    const reservedKeys = ["q", "category", "sort"];
    reservedKeys.forEach((key) => {
      let value = urlParams.get(key);
      if (key === "sort" && !value) {
        value = "latest"; // Set sort to latest as default
      }
      if (value) {
        defaultParams.set(key, value);
      }
    });
    // Merge filtering parameters with the default reserved parameters
    const filterParams = new URLSearchParams(filterQueryString);
    for (const [key, value] of filterParams.entries()) {
      defaultParams.set(key, value);
    }
    // Add limit = 9
    defaultParams.set("limit", "9");
    // The combined query string to be sent to the API
    const combinedQueryString = defaultParams.toString();
    try {
      const [productRes, filterRes] = await Promise.all([
        fetch(`${API_URL}/product?${combinedQueryString}`),
        fetch(`${API_URL}/product-archive-filter?${combinedQueryString}`),
      ]);
      if (!productRes.ok) {
        throw new Error("Failed to fetch filtered products!");
      }
      if (!filterRes.ok) {
        throw new Error("Failed to fetch limited filters!");
      }
      const productData = await productRes.json();
      const filterData: ProductArchiveFilterResponse = await filterRes.json();
      setTotalDocs(productData.totalDocs);
      setTotalPages(productData.totalPages);
      setFilteredProducts(productData.docs);
      setAttributes(filterData.filters);
      // Update URL without clearing parameters if autoApply is true.
      if (combinedQueryString) {
        if (autoApply) {
          window.history.replaceState(null, "", `?${combinedQueryString}`);
        } else {
          router.push(`?${combinedQueryString}`);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  // Automatically apply filters whenever checkedItems or inStockOnly changes
  useEffect(() => {
    applyFilters(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems, inStockOnly, searchParams]);

  const handleCheckAndFilterChange = (
    filterId: string,
    value: string | number | [number, number]
  ) => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      if (Array.isArray(value)) {
        // For numeric filters, update with a NumericFilter object.
        updated[filterId] = { min: value[0], max: value[1] };
      } else {
        // For checkbox filters, toggle the boolean value.
        const prevCheckbox = (prev[filterId] as CheckboxFilter) || {};
        updated[filterId] = {
          ...prevCheckbox,
          [value.toString()]: !prevCheckbox[value.toString()],
        };
        // Remove filter if no option is selected.
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
    // Reset filter state
    setCheckedItems({});
    setInStockOnly(null);
    // Get current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const preservedKeys = ["category", "q", "sort"];
    // Create a new URLSearchParams instance with only the preserved keys
    const newParams = new URLSearchParams();
    preservedKeys.forEach((key) => {
      if (urlParams.has(key)) {
        newParams.set(key, urlParams.get(key)!);
      }
    });
    // Update the URL, preserving only the desired parameters
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
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
        totalDocs,
        totalPages,
        filteredProductsCount,
        clearFilters,
        applyFilters,
        isLoading,
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
