import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: string;
  name: string;
  link: string;
  icon: string;
}

type UseSidebarResult = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  handleCategoryClick: (category: Category) => void;
};

const useSidebar = (
  selectedCategory: string,
  onCategoryClick: (categoryName: string) => void
): UseSidebarResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:3001/categories"
        );
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

  const handleCategoryClick = (category: Category) => {
    onCategoryClick(category.name);
  };

  return { categories, loading, error, handleCategoryClick };
};

export default useSidebar;
