import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of a category object
interface Category {
  id: number;
  name: string;
}

// Define the return type of the custom hook
interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
