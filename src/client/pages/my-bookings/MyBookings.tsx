import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import moment from "moment-timezone";
import styles from "./MyBookings.module.scss";

interface Booking {
  _id: string;
  serviceID: string;
  date: string;
  time: string;
  userEmail: string;
  userName: string;
}

interface Service {
  _id: string;
  name: string;
  address: string;
  contactPerson: string;
  photo: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Record<string, Service>>({});
  const [activeTab, setActiveTab] = useState<"Booked" | "Completed">("Booked");
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const response = await axios.get<Booking[]>(
          `http://localhost:5005/bookings/user/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBookings(response.data);

        const serviceIDs = response.data.map((booking) => booking.serviceID);
        const serviceResponses = await axios.get<Service[]>(
          `http://localhost:5005/services`,
          {
            params: {
              ids: serviceIDs.join(","),
            },
          }
        );

        const servicesMap: Record<string, Service> = {};
        serviceResponses.data.forEach((service) => {
          servicesMap[service._id] = service;
        });

        setServices(servicesMap);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  const now = new Date();

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = moment
      .tz(
        `${booking.date}T${booking.time.padStart(5, "0")}:00`,
        "Europe/Berlin"
      )
      .toDate();
    return activeTab === "Booked" ? bookingDate >= now : bookingDate < now;
  });

  const formatDate = (date: string, time: string) => {
    const d = moment.tz(`${date}T${time.padStart(5, "0")}:00`, "Europe/Berlin");
    return d.format("YYYY-MM-DD");
  };

  const formatTime = (date: string, time: string) => {
    const d = moment.tz(`${date}T${time.padStart(5, "0")}:00`, "Europe/Berlin");
    return d.format("HH:mm");
  };

  if (!user) {
    return <div>Please log in to see your bookings.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>My Bookings</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Booked" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Booked")}
        >
          Booked
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Completed" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </button>
      </div>
      <div className={styles.bookingsList}>
        {filteredBookings.map((booking) => {
          const service = services[booking.serviceID];
          const bookingDate = moment
            .tz(
              `${booking.date}T${booking.time.padStart(5, "0")}:00`,
              "Europe/Berlin"
            )
            .toDate();
          return (
            <div key={booking._id} className={styles.bookingCard}>
              {service && (
                <>
                  <img
                    src={`/${service.photo}`}
                    alt={service.name}
                    className={styles.servicePhoto}
                  />
                  <div className={styles.serviceInfo}>
                    <h3>{service.name}</h3>
                    <p>{service.contactPerson}</p>
                    <p>{service.address}</p>
                    <p>Service on: {formatDate(booking.date, booking.time)}</p>
                    <p>Service at: {formatTime(booking.date, booking.time)}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
