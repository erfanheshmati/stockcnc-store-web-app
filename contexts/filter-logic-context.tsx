import React, { createContext, useContext, useState, useMemo } from "react";

type FilterState = {
  filters: { [attributeTitle: string]: string[] }; // Current filters
  setFilter: (
    attributeTitle: string,
    valuesOrUpdater: string[] | ((prev: string[]) => string[])
  ) => void; // Allow both direct array or callback for state update
};

const FilterLogicContext = createContext<FilterState | undefined>(undefined);

export const FilterLogicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<{
    [attributeTitle: string]: string[];
  }>({});

  const setFilter = (
    attributeTitle: string,
    valuesOrUpdater: string[] | ((prev: string[]) => string[])
  ) => {
    setFilters((prev) => ({
      ...prev,
      [attributeTitle]:
        typeof valuesOrUpdater === "function"
          ? valuesOrUpdater(prev[attributeTitle] || []) // Call the updater function
          : valuesOrUpdater, // Directly set the array
    }));
  };

  const value = useMemo(() => ({ filters, setFilter }), [filters]);

  return (
    <FilterLogicContext.Provider value={value}>
      {children}
    </FilterLogicContext.Provider>
  );
};

export const useFiltersLogic = () => {
  const context = useContext(FilterLogicContext);
  if (!context) {
    throw new Error("useFiltersLogic must be used within a FilterProvider");
  }
  return context;
};
