import React from "react";
import Calendar from "react-calendar";
import Card from "../card/Card";

import "react-calendar/dist/Calendar.css";

import {
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

type Value = Date | null;

interface MiniCalendarProps {
  value: Value;
  onChange: (date: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  value,
  onChange,
}) => {
  return (
    <Card extra="flex h-full w-full flex-col px-3 py-3">
      <Calendar className="rounded-xl  bg-white p-3 shadow-sm "
        onChange={(val) => {
          if (val instanceof Date) {
            onChange(val);
          }
        }}
        value={value}
        prevLabel={
          <MdChevronLeft className="ml-1 h-6 w-6" />
        }
        nextLabel={
          <MdChevronRight className="ml-1 h-6 w-6" />
        }
        view="month"
      />
    </Card>
  );
};

export default MiniCalendar;