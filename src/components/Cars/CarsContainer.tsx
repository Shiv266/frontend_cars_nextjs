import React from "react";
import { useCars } from "../../hooks/useCars";
import CarCard from "./CarCard";
import FilterCars from "../FilterCars";
import CustomSlider from "../CustomSlider/CustomSlider";

const CarsContainer = () => {
  const { cars, filterOptions, filterCarsByBodyType, resetFilters } = useCars();
  return (
    <section aria-labelledby="cars-section">
      <FilterCars
        filterOptions={filterOptions}
        onFilter={filterCarsByBodyType}
        reset={resetFilters}
      />
      <CustomSlider
        items={cars}
        renderItem={(item) => <CarCard key={item.id} car={item} />}
      />
    </section>
  );
};

export default CarsContainer;
