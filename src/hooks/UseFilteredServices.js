import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFilteredServices = (selectedCategory) => {
  const { category } = useParams();
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/services");
        const data = await response.json();

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
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [category, selectedCategory]);

  return filteredServices;
};

export default useFilteredServices;
