import { useState, useEffect } from "react";
import axios from "axios";

const useSearchedServices = (searchTerm) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services");
        setServices(response.data);
      } catch (error) {
        setError("Error fetching services");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
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

  return { filteredServices, loading, error };
};

export default useSearchedServices;
