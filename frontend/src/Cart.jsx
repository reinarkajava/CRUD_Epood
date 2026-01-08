import { useEffect, useState } from 'react';

const CART_KEY = 'cartId';

const getCartId = () => localStorage.getItem(CART_KEY);

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const cartId = getCartId();
      if (!cartId) return;

      const res = await fetch(`http://localhost:3000/api/carts/${cartId}`);
      const data = await res.json();
      setCart(data.Products || []);
    };

    loadCart();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ostukorv</h1>

      {cart.length === 0 ? (
        <p>Ostukorv on tühi</p>
      ) : (
        cart.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            <h3>{product.name}</h3>
            <p>Kogus: {product.CartItem.quantity}</p>
            <p>Hind: {product.CartItem.price} €</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
