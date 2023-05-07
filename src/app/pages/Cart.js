import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(cartItems);
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = [...cart];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    setCart(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotal((prevTotal) => prevTotal + product.price);
  };

  const handleRemoveFromCart = (product) => {
    const cartItems = [...cart];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      if (cartItems[existingProductIndex].quantity > 1) {
        cartItems[existingProductIndex].quantity--;
      } else {
        cartItems.splice(existingProductIndex, 1);
      }
      setCart(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setTotal((prevTotal) => prevTotal - product.price);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    setCart([]);
    setTotal(0);
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>There are no items in your cart.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} - {item.quantity} quantity{" "}
                <button onClick={() => handleAddToCart(item)}>+</button>{" "}
                <button onClick={() => handleRemoveFromCart(item)}>-</button>
              </li>
            ))}
          </ul>
          <p>Total: {total} TL</p>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}
