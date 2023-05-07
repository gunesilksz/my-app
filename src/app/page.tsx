'use client';

import Products from './pages/Products';
import Cart from './pages/Cart';
import React, { useState, useEffect } from 'react';
export default function Home() {
  const [selectedTab, setSelectedTab] = useState('');
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length > 0) {

      const confirmClearCart = window.confirm("You have an unfinished order, do you want to continue?");
      if (confirmClearCart) {

        setCart(cartItems);
      } else {
        setCart([]);
        localStorage.removeItem("cartItems");
      }


    }

  }, []);

  const handleTabChange = (tab: React.SetStateAction<string>) => {

    setSelectedTab(tab);

  };

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="flex space-x-4 mb-4">
          <button onClick={() => handleTabChange('products')}>Products</button>
          <button onClick={() => handleTabChange('Cart')}>Cart</button>
        </div>
        <div>
          {selectedTab === 'products' && <Products />}
          {selectedTab === 'Cart' && <Cart />}
        </div>
      </div>
      <style jsx>{`
        .category-header {
          background-color: white;
        }
      `}</style>
    </main>


  );
}
