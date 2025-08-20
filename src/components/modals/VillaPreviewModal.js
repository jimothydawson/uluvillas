import React from 'react';

function VillaPreviewModal({ villa, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '90%',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Header with close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 20px 10px 20px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{ margin: 0, color: '#007bff' }}>Guest View Preview</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        {/* Villa detail content - reusing the same layout as guest view */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            {/* Left Column - Villa Details */}
            <div style={{ flex: '1', minWidth: '400px' }}>
              <div style={{ 
                height: '300px', 
                backgroundColor: '#f0f0f0', 
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '18px',
                borderRadius: '8px'
              }}>
                Image Placeholder
              </div>
              
              <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#2c3e50' }}>
                {villa.title}
              </h1>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px', 
                marginBottom: '15px',
                fontSize: '14px',
                color: '#666'
              }}>
                <span>📍 {villa.location}</span>
                <span>👥 Up to {villa.maxGuests} guests</span>
              </div>

              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#2c3e50',
                marginBottom: '20px'
              }}>
                ${villa.pricePerNight} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>per night</span>
              </div>

              {/* Description Section */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '10px', color: '#2c3e50', fontSize: '18px' }}>About this villa</h3>
                <p style={{ 
                  lineHeight: '1.6', 
                  color: '#555',
                  fontSize: '14px'
                }}>
                  {villa.description}
                </p>
              </div>

              {/* Amenities Section */}
              {villa.amenities && villa.amenities.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '10px', color: '#2c3e50', fontSize: '18px' }}>Amenities</h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                    gap: '8px'
                  }}>
                    {villa.amenities.map((amenity, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        padding: '6px 10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        <span style={{ marginRight: '6px' }}>✓</span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Booking Form Preview */}
            <div style={{ flex: '0 0 300px' }}>
              <div style={{
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}>
                <h3 style={{ margin: '0 0 15px 0' }}>Book This Villa</h3>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                    Check-in Date:
                  </label>
                  <div style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f8f8f8',
                    color: '#666'
                  }}>
                    Guest selects date
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                    Check-out Date:
                  </label>
                  <div style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f8f8f8',
                    color: '#666'
                  }}>
                    Guest selects date
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                    Number of Guests:
                  </label>
                  <div style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f8f8f8',
                    color: '#666'
                  }}>
                    Guest selects count
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  Request Booking (Preview)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VillaPreviewModal;