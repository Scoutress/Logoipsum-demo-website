import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.scss";

interface CalendarComponentProps {
  onDateChange: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDateChange,
}) => {
  const [date, setDate] = useState<Date | null>(null);

  const handleDateChange = (value: Date | [Date, Date] | null) => {
    if (value instanceof Date) {
      setDate(value);
      onDateChange(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      setDate(value[0]);
      onDateChange(value[0]);
    } else {
      setDate(null);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={(value) =>
          handleDateChange(value as Date | [Date, Date] | null)
        }
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;
