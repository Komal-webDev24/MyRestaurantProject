import React from 'react';

function Menu() {
  const dishes = [
    { 
      id: 1, 
      name: "Sea Food Platter", 
      price: "₹850", 
      img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500",
      desc: "Fresh prawns, fish and crabs." 
    },
    { 
      id: 2, 
      name: "Paneer Tikka", 
      price: "₹350", 
      img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
      desc: "Creamy and spicy paneer." 
    },
    { 
      id: 3, 
      name: "Tropical Mocktail", 
      price: "₹200", 
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500",
      desc: "Refreshing beach drink." 
    }
  ];

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2 style={{ color: '#ff4d4d' }}>Our Special Menu 📜</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px', 
        marginTop: '30px' 
      }}>
        {dishes.map(dish => (
          <div key={dish.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '15px', 
            overflow: 'hidden', // Taki image ke corners bhi round dikhein
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}>
            <img src={dish.img} alt={dish.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3>{dish.name}</h3>
              <p>{dish.desc}</p>
              <h4 style={{ color: '#ff4d4d' }}>{dish.price}</h4>
              <button style={{ background: '#333', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px' }}>Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;