import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Teeme päringu backendi API-sse
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Viga andmete pärimisel:", err));
  }, []);

  return (
    <div className="App">
      <h1>E-poe Tooted</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '200px' }}>
              <h2>{product.name}</h2>
              <p>Hind: {product.price} €</p>
              <button>Lisa ostukorvi</button>
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