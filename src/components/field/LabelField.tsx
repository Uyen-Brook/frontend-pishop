// Label.tsx
import React from "react";

type LabelProps = {
  htmlFor?: string;          // id của input/textarea mà label liên kết
  text?: string;             // nội dung hiển thị
  className?: string;       // thêm class tùy chỉnh
  required?: boolean;       // hiển thị dấu * nếu bắt buộc
};

const Label: React.FC<LabelProps> = ({
  htmlFor,
  text,
  className = "",
  required = false,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-2 text-sm font-medium text-gray-700 dark:text-white ${className}`}
    >
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
