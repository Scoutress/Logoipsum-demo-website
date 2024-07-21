import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Service {
  id: number;
  name: string;
  category: string;
}

interface UseFilteredServicesReturn {
  filteredServices: Service[];
  loading: boolean;
  error: string | null;
}

const useFilteredServices = (
  selectedCategory?: string
): UseFilteredServicesReturn => {
  const { category } = useParams<{ category: string }>();
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services");
        const data: Service[] = response.data;

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
