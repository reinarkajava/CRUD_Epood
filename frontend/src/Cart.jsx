import { useEffect, useState } from 'react';

const CART_KEY = 'cartId';

const getCartId = () => localStorage.getItem(CART_KEY);

function Cart({onCheckoutSuccess}) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const cartId = getCartId();
    if (!cartId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/carts/${cartId}`);
      const data = await res.json();
      setCart(data.Products || []);
    } catch (err) {
      console.error("Viga ostukorvi laadimisel:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCart();
    };
    
    fetchData();
  }, []);

  const handleCheckout = async () => {
    const cartId = getCartId();
    try {
      // Eeldame, et sul on backendis checkout endpoint valmis
      await fetch(`http://localhost:3000/api/carts/${cartId}/checkout`, {
        method: 'POST'
      });

      setCart([]); // Tühjendame kohaliku vaate
      if (onCheckoutSuccess) onCheckoutSuccess(); // Teavitame peamist App-i
    } catch (err) {
      console.error("Viga vormistamisel:", err);
      alert("Viga tellimuse vormistamisel!"); 
    }
  };

  const totalSum = cart.reduce((sum, p) => sum + (p.price * p.CartItem.quantity), 0);

const handleRemoveItem = async (productId) => {
  const cartId = getCartId();
  try {
    const res = await fetch(`http://localhost:3000/api/carts/${cartId}/products/${productId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      // Laeme ostukorvi uuesti, et vaade uueneks
      loadCart();
    }
  } catch (err) {
    console.error("Viga toote eemaldamisel:", err);
  }
};

const handleUpdateQuantity = async (productId, currentQuantity, change) => {
  const newQuantity = currentQuantity + change;
  if (newQuantity < 1) return; // Ei luba kogust alla 1 (selleks on eemalda nupp)

  const cartId = getCartId();
  try {
    await fetch(`http://localhost:3000/api/carts/${cartId}/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    });
    loadCart(); // Värskenda vaadet
  } catch (err) {
    console.error("Viga koguse muutmisel:", err);
  }
};

  return (
<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Ostukorv</h1>

      {cart.length === 0 ? (
        <p>Ostukorv on tühi</p>
      ) : (
        <>
{cart.map(product => (
  <div key={product.id} style={{
    border: '1px solid #ccc',
    marginBottom: '10px',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a'
  }}>
    {/* Grupeerime pildi ja teksti vasakule poole */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      {/* TOOTE PILT OSTUKORVIS */}
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
        />
      )}
      
      <div>
        <h3 style={{ margin: 0 }}>{product.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
          <button 
            onClick={() => handleUpdateQuantity(product.id, product.CartItem.quantity, -1)}
            style={{ padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#555', color: 'white' }}
          > - </button>
          
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{product.CartItem.quantity}</span>
          
          <button 
            onClick={() => handleUpdateQuantity(product.id, product.CartItem.quantity, 1)}
            style={{ padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#555', color: 'white' }}
          > + </button>
        </div>
        <p style={{ fontWeight: 'bold', margin: 0 }}>{(product.price * product.CartItem.quantity).toFixed(2)} €</p>
      </div>
    </div>
    
    <button 
      onClick={() => handleRemoveItem(product.id)}
      style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
    >
      Eemalda
    </button>
  </div>
))}
          
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <h2>Kokku: {totalSum.toFixed(2)} €</h2>
            <button 
              onClick={handleCheckout}
              style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                padding: '15px 30px', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: '1.1rem', 
                width: '100%' 
              }}
            >
              VORMISTA OST
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
