import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [userComment, setUserComment] = useState<string>("");

  useEffect(() => {
    axios
      .get<Product>(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data));
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`You stated: "${userComment}" about this product.`);
    setUserComment("");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.image} alt={product.title} className="product-detail-image" />
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-category">{product.category.toUpperCase()}</p>
          <p>{product.description}</p>
          <p className="product-detail-price">Price: ₹{product.price.toFixed(2)}</p>
          <div className="rating">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={index < Math.round(product.rating.rate) ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
            <span> ({product.rating.count} reviews)</span>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Your Feedback</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Is this product Good or Bad?"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
