import React from "react";
import Switch from "./Switch";

type SwitchFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  desc?: string;
  mt?: string;
  mb?: string;
};

const SwitchField: React.FC<SwitchFieldProps> = ({
  id,
  label,
  checked,
  onChange,
  desc = "",
  mt = "",
  mb = "",
}) => {
  return (
    <div className={`flex justify-between ${mt} ${mb} items-center`}>
      <label
        htmlFor={id}
        className="max-w-[80%] hover:cursor-pointer lg:max-w-[65%]"
      >
        <h5 className="text-base font-bold text-navy-700 dark:text-white">
          {label}
        </h5>

        {desc && (
          <p className="text-base text-gray-600">
            {desc}
          </p>
        )}
      </label>

      <div>
        <Switch
          id={id}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SwitchField;