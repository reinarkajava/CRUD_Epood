// frontend/src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Kasuta try...catch plokki vigade püüdmiseks
      try {
        const url = 'http://localhost:3000/api/products';
        console.log(`Fetching products from: ${url}`);
        
        const response = await fetch(url); 

        // Kontrolli HTTP staatust
        if (!response.ok) {
          // Viska viga, kui staatus ei ole 200 (OK)
          throw new Error(`HTTP error! Status: ${response.status}. Could not reach backend.`);
        }

        const data = await response.json();
        
        // Veendu, et saadud data on massiiv
        if (Array.isArray(data)) {
            setProducts(data);
        } else {
            console.error("API did not return an array:", data);
            throw new Error("Received invalid data format from API.");
        }
        
      } catch (e) {
        console.error("Päring ebaõnnestus:", e);
        // Salvesta viga, et seda kuvada
        setError(e.message || "Tundmatu viga andmete laadimisel.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  // --- Renderdamise loogika ---

  // 1. Laadimise olek
  if (loading) {
    return (
      <div style={{ padding: '20px', color: 'blue' }}>
        <h2>Laen tooteid...</h2>
        <p>Palun oodake, kuni päring teostatakse backend'i.</p>
      </div>
    );
  }

  // 2. Vea olek (kui API päring ebaõnnestus)
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', border: '1px solid red' }}>
        <h2>❌ Viga Andmete Laadimisel ❌</h2>
        <p>Palun kontrollige, kas backend töötab aadressil **http://localhost:3000** ja kas teenus on kättesaadav.</p>
        <p>Detailne viga: **{error}**</p>
      </div>
    );
  }

  // 3. Andmete olek
  return (
    <div style={{ padding: '20px' }}>
      <h1>E-poe Tootevalik 🛒</h1>
      {products.length === 0 ? (
        <p style={{ color: 'orange' }}>Tooteid ei leitud. Andmebaas võib olla tühi või päring ebaõnnestus vaikselt.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {products.map(product => (
            // Kasuta product.id kindlasti, et vältida Reacti hoiatust
            <li key={product.id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px', borderRadius: '4px' }}>
              <h3>{product.name}</h3>
              <p>Hind: **{product.price} €**</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;