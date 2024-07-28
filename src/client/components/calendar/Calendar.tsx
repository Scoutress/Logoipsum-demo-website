import React, { useState } from "react";
import styles from "./Calendar.module.scss";
import { useTranslation } from "react-i18next";

interface CalendarComponentProps {
  onDateChange: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { t } = useTranslation();

  const daysOfWeek = [
    t("MONDAY"),
    t("TUESDAY"),
    t("WEDNESDAY"),
    t("THURSDAY"),
    t("FRIDAY"),
    t("SATURDAY"),
    t("SUNDAY"),
  ];

  const months = [
    t("JANUARY"),
    t("FEBRUARY"),
    t("MARCH"),
    t("APRIL"),
    t("MAY"),
    t("JUNE"),
    t("JULY"),
    t("AUGUST"),
    t("SEPTEMBER"),
    t("OCTOBER"),
    t("NOVEMBER"),
    t("DECEMBER"),
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;

    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className={styles.empty}></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected =
        selectedDate && selectedDate.toDateString() === date.toDateString();

      calendarDays.push(
        <div
          key={day}
          className={`${styles.day} ${
            isWeekend ? styles.weekend : styles.weekday
          } ${isSelected ? styles.selected : ""}`}
          onClick={() => {
            setSelectedDate(date);
            onDateChange(date);
          }}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>{generateCalendar()}</div>
    </div>
  );
};

export default CalendarComponent;
