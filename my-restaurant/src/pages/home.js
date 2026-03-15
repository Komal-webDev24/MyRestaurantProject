import React from 'react';

function Home() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '100px 20px',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Sea View Delights 🌊</h1>
      <p style={{ fontSize: '1.5rem' }}>Swad ka naya thikana, Samundar ke kinare!</p>
      <button style={{
        marginTop: '20px',
        padding: '10px 25px',
        fontSize: '1rem',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Explore Our Menu
      </button>
    </div>
  );
}

export default Home;