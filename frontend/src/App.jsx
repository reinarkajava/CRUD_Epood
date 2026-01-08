<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

// Socket.IO connection
const socket = io('http://localhost:3000');
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  const [count, setCount] = useState(0)
=======
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
          setProducts(products.filter(product => product.id !== id));
        })
        .catch(err => console.error("Viga kustutamisel:", err));
    }
  };
>>>>>>> Stashed changes

  // --------------------
  // UI
  // --------------------
  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
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

              {product.status && (
                <p><strong>Staatus:</strong> {product.status}</p>
              )}

              {product.discountPrice && (
                <p style={{ color: 'green' }}>
                  Soodushind: {product.discountPrice} €
                </p>
              )}

              <button>Lisa ostukorvi</button>

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
>>>>>>> Stashed changes
