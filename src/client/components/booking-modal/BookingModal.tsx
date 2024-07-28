import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.tsx";
import CalendarComponent from "../calendar/Calendar.tsx";
import styles from "./BookingModal.module.scss";

interface BookingModalProps {
  serviceID: string;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ serviceID, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = async () => {
    if (selectedDate && selectedTime && user) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const [hours, minutes] = selectedTime.split(":").map(Number);
        const bookingDate = new Date(selectedDate);
        bookingDate.setHours(hours);
        bookingDate.setMinutes(minutes);
        bookingDate.setSeconds(0);
        bookingDate.setMilliseconds(0);

        console.log("Selected Date:", selectedDate);
        console.log("Selected Time:", selectedTime);
        console.log("Booking Date with Time:", bookingDate);

        const bookingData = {
          serviceID,
          date: bookingDate.toISOString().split("T")[0],
          time: selectedTime,
          userEmail: user.email,
          userName: user.firstName + " " + user.lastName,
          status: "Pending",
        };

        console.log("Booking Data:", bookingData);

        await axios.post("http://localhost:5005/bookings", bookingData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage("Booking successful!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    }
  };

  const times = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`);

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <h2>Book a Service</h2>
          {successMessage ? (
            <p className={styles.successMessage}>{successMessage}</p>
          ) : (
            <>
              <div className={styles.calendarWrapper}>
                <h3>Select Date</h3>
                <CalendarComponent onDateChange={handleDateChange} />
              </div>
              <div className={styles.timeSlotsWrapper}>
                <h3>Select Time Slot</h3>
                <div className={styles.timeSlots}>
                  {times.map((time) => (
                    <button
                      key={time}
                      className={`${styles.timeSlot} ${
                        selectedTime === time ? styles.selected : ""
                      }`}
                      onClick={() => handleTimeChange(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <button className={styles.bookButton} onClick={handleBooking}>
                Book for this time
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
