import React, { FC, useState } from "react";
import Divider from "./Divider";
import Dropdown from "./FormControls/Dropdown";
import { FilterOption } from "../hooks/useCars";
import Button from "./Button/Button";

interface FilterCarsProps {
  filterOptions: FilterOption;
  onFilter: (value: string) => void;
  reset: () => void;
}
const styles = {
  heading: { fontWeight: 600, color: "#495057" },
  btn: {
    borderColor: "#adb5bd",
    borderWidth: "1px",
    borderRadius: "8px",
    backgroundColor: "#ced4da",
    cursor: "pointer",
    marginTop: 20,
  },
};

const FilterCars: FC<FilterCarsProps> = ({
  filterOptions,
  onFilter,
  reset,
}) => {
  const [selectedCar, setSelectedCar] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedCar(value);
    onFilter(value);
  };

  return (
    <div className="px-16">
      <h1 className="font-medium" style={styles.heading}>
        Filter Cars By
      </h1>
      <Divider color="#e9ecef" />
      <div className="flex items-center mt-16 gap-16">
        <div
          style={{
            width: "12rem",
          }}
        >
          <Dropdown
            name="bodyType"
            label="Body Type"
            options={filterOptions}
            value={selectedCar}
            id="bodyType"
            onChange={handleFilterChange}
            aria-labelledby={`filter-label-bodyType`}
          />
        </div>
        <Button
          variant="filled"
          label="Reset Filter"
          className="px-16"
          style={styles.btn}
          aria-label="Reset car filters"
          onClick={() => {
            setSelectedCar("");
            reset();
          }}
        />
      </div>
    </div>
  );
};

export default FilterCars;
