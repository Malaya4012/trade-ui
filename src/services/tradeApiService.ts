export const fetchProducts = async () => {
    const response = await fetch('/api/products');
    return response.json();
  };
  