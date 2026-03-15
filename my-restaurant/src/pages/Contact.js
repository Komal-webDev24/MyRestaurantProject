import React, { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2 style={{ color: '#ff4d4d' }}>Book a Table 🍽️</h2>
      
      {submitted ? (
        <div style={{ padding: '20px', background: '#d4edda', color: '#155724', borderRadius: '5px' }}>
          <h3>Success! Aapki table book ho gayi hai.</h3>
          <p>Hum aapko thodi der mein call karenge.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Aapka Naam" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="email" placeholder="Email Address" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="date" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <textarea placeholder="Special Request (e.g. Birthday celebration)" rows="4" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}></textarea>
          <button type="submit" style={{ padding: '12px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>
            Confirm Booking
          </button>
        </form>
      )}

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h4>Visit Us:</h4>
        <p>Marine Drive, Near Sea Shore, Mumbai</p>
        <p>Email: contact@seaside.com | Phone: +91 98765 43210</p>
      </div>
    </div>
  );
}

export default Contact;