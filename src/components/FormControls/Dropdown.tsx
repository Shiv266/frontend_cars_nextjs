import React, { ComponentProps, FC } from "react";
import { Select } from "@volvo-cars/react-forms";

type Options = {
  label: string;
  value: string | number;
};

interface DropdownProps extends ComponentProps<"select"> {
  label: string;
  options: Options[];
  id: string;
}

const style = {
  dropdown: {
    borderColor: "#adb5bd",
    borderWidth: "1px",
    borderRadius: "8px",
    padding: "8px 12px",
    width: "100%",
    backgroundColor: "#fff",
    outline: "none",
  },
} as const;

const Dropdown: FC<DropdownProps> = ({ label, options, id, ...rest }) => {
  return (
    <div className="px-2 flex flex-col gap-4">
      <label className="" style={{ fontSize: 14 }} htmlFor={id}>
        {label}
      </label>
      <select {...rest} id={id} style={style.dropdown}>
        <option disabled value={""}>
          Select...
        </option>
        {options.map((option) => (
          <option
            className="capitalize"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
