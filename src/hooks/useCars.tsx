import { useState, useEffect, useMemo, useCallback } from "react";

export interface CarsData {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export type FilterOption = {
  value: string;
  label: string;
}[];

type ApiResponse = CarsData[];

const fetchCarsData = async (): Promise<ApiResponse> => {
  const res = await fetch("api/cars.json");
  if (!res.ok) {
    throw new Error("Failed to fetch cars data");
  }
  return res.json();
};

export const useCars = () => {
  const [cars, setCars] = useState<CarsData[]>([]);
  const [originalCars, setOriginalCars] = useState<CarsData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchCarsData();
        setCars(result);
        setOriginalCars(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getBodyTypeOptions = (cars: CarsData[]): FilterOption => {
    const options = Array.from(new Set(cars.map((car) => car.bodyType)));

    return options.map((bodyType) => ({
      label: bodyType.toUpperCase(),
      value: bodyType,
    }));
  };

  const filterOptions = useMemo(() => {
    return getBodyTypeOptions(originalCars);
  }, [originalCars]);

  const filterCarsByBodyType = (bodyType: string) => {
    if (!bodyType) {
      resetFilters();
    } else {
      const filteredCars = originalCars.filter(
        (car) => car.bodyType === bodyType
      );
      setCars(filteredCars);
    }
  };

  const resetFilters = useCallback(() => {
    setCars(originalCars);
  }, [originalCars]);

  return {
    cars,
    filterOptions,
    filterCarsByBodyType,
    resetFilters,
  };
};
