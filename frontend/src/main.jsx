// src/App.jsx
import { useState, useEffect } from 'react';

// Kontrollige seda URL-i! See peab viitama teie backend'i pordile.
const API_URL = 'http://localhost:3000/api/products'; 

function App() {
  const [products, setProducts] = useState(null); // Kasutame nulli, mitte []
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Kui staatus ei ole OK, siis on tegemist tõrgega (nt. 404, 500)
          throw new Error(`HTTP Error: ${response.status} from ${API_URL}`);
        }

        const data = await response.json();
        
        setProducts(data); // Andmed laeti edukalt
      } catch (e) {
        console.error("Viga andmete laadimisel:", e);
        setError(e.message || "Tundmatu viga. Vaata konsooli.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  // --- Renderdamine ---

  if (loading) {
    return <h1 style={{ color: 'blue' }}>Laen tooteid... (Kontrollin {API_URL})</h1>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
        <h1>❌ Viga! Backend'i ei leitud. ❌</h1>
        <p>Detail: {error}</p>
        <p>Kas backend töötab aadressil http://localhost:3000?</p>
      </div>
    );
  }

  // Kui products on null, aga loading on false, on see viga
  if (!products) {
    return <h1 style={{ color: 'orange' }}>Viga: Toodete massiiv on null.</h1>;
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>E-poe Tooted ({products.length})</h1>
      {products.length === 0 ? (
        <p style={{ color: 'gray' }}>Toodete massiiv on tühi. Kontrolli seemendust.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id || product.name}>
              {product.name} - {product.price} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;