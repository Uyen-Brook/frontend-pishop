import React, { useState } from "react";
import Calendar from "react-calendar";
import Card from "../card/Card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type Value = Date | Date[] | [Date | null, Date | null] | null;

const MiniCalendar = () => {
  const [value, setValue] = useState(new Date());

  const handleChange = (val: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    if (val instanceof Date) {
      setValue(val);
    }
  };

  return (
    <div>
      <Card extra="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={handleChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
