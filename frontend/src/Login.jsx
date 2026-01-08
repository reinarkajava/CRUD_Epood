import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ Block admin/admin
    if (username === 'admin' && password === 'admin') {
      setError('Admin login is not allowed.');
      return;
    }

    // ✅ Allow everything else
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
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

export default Login;
