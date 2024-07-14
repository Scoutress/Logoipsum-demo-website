import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useFilteredServices = (selectedCategory) => {
  const { category } = useParams();
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services");
        const data = response.data;

        const currentCategory = category || selectedCategory || "All";
        const services =
          currentCategory !== "All"
            ? data.filter(
                (service) =>
                  service.category.toLowerCase() ===
                  currentCategory.toLowerCase()
              )
            : data;
        setFilteredServices(services);
      } catch (error) {
        setError("Error fetching services");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category, selectedCategory]);

  return { filteredServices, loading, error };
};

export default useFilteredServices;
