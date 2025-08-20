import React from 'react';
import BookingForm from '../forms/BookingForm';

function VillaDetail({ villa, onBackClick }) {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        onClick={onBackClick}
        style={{ 
          color: '#007bff', 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        ← Back to villas
      </button>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Left Column - Villa Details */}
        <div style={{ flex: '1', minWidth: '400px' }}>
          <div style={{ 
            height: '400px', 
            backgroundColor: '#f0f0f0', 
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '18px',
            borderRadius: '8px'
          }}>
            Image Placeholder
          </div>
          
          <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', color: '#2c3e50' }}>
            {villa.title}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            marginBottom: '20px',
            fontSize: '16px',
            color: '#666'
          }}>
            <span>📍 {villa.location}</span>
            <span>👥 Up to {villa.maxGuests} guests</span>
          </div>

          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            marginBottom: '30px'
          }}>
            ${villa.pricePerNight} <span style={{ fontSize: '18px', fontWeight: 'normal' }}>per night</span>
          </div>

          {/* Description Section */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>About this villa</h3>
            <p style={{ 
              lineHeight: '1.6', 
              color: '#555',
              fontSize: '16px'
            }}>
              {villa.description}
            </p>
          </div>

          {/* Amenities Section */}
          {villa.amenities && villa.amenities.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>Amenities</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '10px'
              }}>
                {villa.amenities.map((amenity, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}>
                    <span style={{ marginRight: '8px' }}>✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Booking Form */}
        <div style={{ flex: '0 0 380px' }}>
          <BookingForm villa={villa} />
        </div>
      </div>
    </div>
  );
}

export default VillaDetail;