import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Teeme päringu backendi API-sse
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Viga andmete pärimisel:", err));
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
      // Lisame uue toote olemasolevasse nimekirja, et leht ei peaks refrešima
      setProducts([...products, newProduct]); 
      // Tühjendame vormi väljad
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

  

  return (
    <div className="App">
      <h1>E-poe Tooted</h1>
{/* 3. Vorm uue toote lisamiseks */}
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
        <h2>Lisa uus toode</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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

      {/* 4. Toodete kuvamine */}
      <h2>Tootenimekiri</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '200px' }}>
              <h2>{product.name}</h2>
              <p>Baashind: {product.price} €</p>
              {/* Kuvame ka service-kihis arvutatud staatuse ja soodushinna, kui need on olemas */}
              {product.status && <p><strong>Staatus:</strong> {product.status}</p>}
              {product.discountPrice && <p style={{ color: 'green' }}>Soodushind: {product.discountPrice} €</p>}
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

