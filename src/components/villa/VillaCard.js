import React from 'react';

function VillaCard({ villa, onCardClick }) {
  return (
    <div 
      onClick={() => onCardClick(villa.id)}
      style={{ 
        border: '1px solid #ccc', 
        padding: '16px', 
        margin: '8px',
        borderRadius: '8px',
        width: '320px',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ 
        height: '200px', 
        backgroundColor: '#f0f0f0', 
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        borderRadius: '6px'
      }}>
        Image Placeholder
      </div>
      
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{villa.title}</h3>
      
      <p style={{ 
        margin: '0 0 8px 0', 
        color: '#666', 
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center'
      }}>
        📍 {villa.location}
      </p>
      
      <p style={{ 
        margin: '0 0 8px 0', 
        color: '#666', 
        fontSize: '14px'
      }}>
        👥 Up to {villa.maxGuests} guests
      </p>

      <p style={{ 
        margin: '0 0 8px 0', 
        color: '#888', 
        fontSize: '14px',
        height: '40px',
        overflow: 'hidden',
        lineHeight: '1.3'
      }}>
        {villa.description?.substring(0, 80) + (villa.description?.length > 80 ? '...' : '')}
      </p>

      <div style={{ 
      display: 'flex',  
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #eee'
      }}>
        <div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
            ${villa.pricePerNight}
          </span>
          <span style={{ fontSize: '14px', color: '#666' }}> / night</span>
        </div>
        
        {villa.amenities?.length > 0 && (
          <div style={{ fontSize: '12px', color: '#007bff' }}>
            +{villa.amenities.length} amenities
          </div>
        )}
      </div>
    </div>
  );
}

export default VillaCard;