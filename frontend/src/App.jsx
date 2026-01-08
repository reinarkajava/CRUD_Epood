import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const CART_KEY = 'cartId';

const getCartId = () => localStorage.getItem(CART_KEY);
const setCartId = (id) => localStorage.setItem(CART_KEY, id);

// Ühendame Socket.IO-ga (väljaspool komponenti)
const socket = io('http://localhost:3000');

// --------------------
// Dummy Login Component
// --------------------
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Block admin/admin
    if (username === 'admin' && password === 'admin') {
      setError('Admin login is not allowed.');
      return;
    }

    // Allow everything else
    onLogin();
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          minWidth: '300px'
        }}
      >
        <h2>Login</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <button type="submit" style={{ width: '100%' }}>
          Login
        </button>
      </form>
    </div>
  );
}

// --------------------
// Main App
// --------------------
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    socket.on('product_added', (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(''), 5000);
    });

    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Viga andmete pärimisel:", err));

    return () => socket.off('product_added');
  }, []);

  // --------------------
  // Auth Guard
  // --------------------
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // --------------------
  // Logout
  // --------------------
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // --------------------
  // Product handlers
  // --------------------
  // Initialize cart
  useEffect(() => {
    const initCart = async () => {
      let cartId = getCartId();

      if (!cartId) {
        const res = await fetch('http://localhost:3000/api/carts', { method: 'POST' });
        const cartData = await res.json();
        cartId = cartData.id;
        setCartId(cartId);
      }

      // Load cart items
      const res = await fetch(`http://localhost:3000/api/carts/${cartId}`);
      const data = await res.json();
      setCart(data.Products || []);
    };

    initCart();
  }, []);
  
  // Uue toote lisamise funktsioon
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) })
    })
      .then(res => res.json())
      .then(newProduct => {
        setProducts([...products, newProduct]);
        setName('');
        setPrice('');
      })
      .catch(err => console.error("Viga toote lisamisel:", err));
  };
  const handleDelete = (id) => {
      if (window.confirm('Kas oled kindel, et soovid selle toote kustutada?')) {
          fetch(`http://localhost:3000/api/products/${id}`, {
              method: 'DELETE',
          })
          .then(() => {
              // Eemaldame toote kohalikust staadiumist (state), et see kaoks ekraanilt kohe
              setProducts(products.filter(product => product.id !== id));
          })
          .catch(err => console.error("Viga kustutamisel:", err));
      }
  };

  // Add product to cart
  const handleAddToCart = async (productId) => {
    const cartId = getCartId();

    await fetch(`http://localhost:3000/api/carts/${cartId}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    });

    // Reload cart
    const res = await fetch(`http://localhost:3000/api/carts/${cartId}`);
    const data = await res.json();
    setCart(data.Products || []);

    const product = products.find(p => p.id === productId);
    setNotification(`Toode "${product.name}" lisati ostukorvi!`);
    setTimeout(() => setNotification(''), 5000);
  };

  

  // --------------------
  // UI
  // --------------------
  return (
    <div className="App">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: '15px',
          right: '15px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          padding: '8px 14px',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1100
        }}
      >
        Logout
      </button>

      {notification && (
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          position: 'fixed',
          top: '10px',
          right: '100px',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          {notification}
        </div>
      )}

      <h1>E-poe Tooted</h1>

      <section style={{
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '10px'
      }}>
        <h2>Lisa uus toode</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
        >
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Toote nimi"
            required
          />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Hind"
            required
          />
          <button type="submit">Salvesta andmebaasi</button>
        </form>
      </section>

      <hr />

      <h2>Tootenimekiri</h2>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {products.length > 0 ? (
          products.map(product => (
            <div
              key={product.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '8px',
                minWidth: '200px'
              }}
            >
              <h2>{product.name}</h2>
              <p>Baashind: {product.price} €</p>
              {/* Kuvame ka service-kihis arvutatud staatuse ja soodushinna, kui need on olemas */}
              {product.status && <p><strong>Staatus:</strong> {product.status}</p>}
              {product.discountPrice && <p style={{ color: 'green' }}>Soodushind: {product.discountPrice} €</p>}
              <button onClick={() => handleAddToCart(product.id)}>Lisa ostukorvi</button>
              <button 
    onClick={() => handleDelete(product.id)} 
    style={{ 
        backgroundColor: '#ff4d4d', 
        color: 'white', 
        marginTop: '10px',
        border: 'none',
        padding: '8px',
        borderRadius: '5px',
        cursor: 'pointer'
    }}
>
    Kustuta toode
</button>
            </div>
          ))
        ) : (
          <p>Laen tooteid või andmed puuduvad...</p>
        )}
      </div>
    </div>
  );
}

export default App;
