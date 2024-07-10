import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
