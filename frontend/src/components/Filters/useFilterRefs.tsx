import { useEffect, useRef } from "react";
import RootStore from "../../store/RootStore";

const useFilterRefs = () => {
  const priceMinRef = useRef<HTMLInputElement>(document.createElement("input"));
  const priceMaxRef = useRef<HTMLInputElement>(document.createElement("input"));

  const handlePriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    RootStore.cars.filterCars(false);
    // RootStore.filters.setFilters({ priceMin: Number(e.target.value) });
  };
  const handlePriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    RootStore.cars.filterCars(false);
    // RootStore.filters.setFilters({ priceMax: Number(e.target.value) });
  };

  useEffect(() => {
    RootStore.filters.priceMinRef = priceMinRef.current;
    RootStore.filters.priceMaxRef = priceMaxRef.current;
  }, []);
  return { priceMinRef, priceMaxRef, handlePriceMin, handlePriceMax };
};

export { useFilterRefs };
