import { useState, useEffect } from "react";

const useSearchedServices = (searchTerm) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredServices(
        services.filter(
          (service) =>
            service.category.toLowerCase().includes(lowercasedTerm) ||
            service.name.toLowerCase().includes(lowercasedTerm) ||
            service.worker.toLowerCase().includes(lowercasedTerm) ||
            service.address.toLowerCase().includes(lowercasedTerm)
        )
      );
    } else {
      setFilteredServices(services);
    }
  }, [searchTerm, services]);

  return filteredServices;
};

export default useSearchedServices;
