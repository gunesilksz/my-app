import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState(1);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) {
      setCartItems([...cartItems, { ...product, quantity }]);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setQuantities({ ...quantities, [product.id]: 1 });



  };
  const handleQuantityChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: parseInt(value) });
  };
  return (
    <div className="container">
      <h1>Products</h1>
      <div>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className="category-button"
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <ul className="products-list">
        {products
          .filter((product) => selectedCategory === "" || product.category === selectedCategory)
          .map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
                <input type="number"
                  className="product-input"
                  value={quantities[product.id] || 1}
                  min={0}
                  max={10}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                />
                <button onClick={() => handleAddToCart(product, quantities)} className="add-to-cart">
                  Sepete Ekle
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .products-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .product-input{
          color: #000;
          margin-right: 10px;
          width: 50px;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 3px;
          text-align: center;
                }
        .product-item {
          display: flex;
          margin-bottom: 20px;
        }
        .product-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          margin-right: 20px;
        }
        .product-details {
          display: flex;
          flex-direction: column;
          width: calc(100% - 100px);
        }
        .product-title {
          margin: 0 0 5px 0;
        }
        .product-category {
          margin: 0;
          color: #999;
        }
        .product-price {
          margin: 0;
          font-weight: bold;
        }
        .add-to-cart {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #0080ff;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        .add-to-cart:hover {
          background-color: #0052cc;
        }
        .categories {
          display: flex;
          margin-bottom: 20px;
        }
        .category-button {
          margin-right: 10px;
          padding: 5px 10px;
          background-color: #000;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        .category-button:hover {
          background-color: #eee;
        }
      `}</style>
    </div>
  );
}
