import React from 'react';

function VillaCard({ villa, onCardClick, viewMode = 'grid' }) {
  // Get card styles based on view mode
  const getCardStyles = () => {
    switch (viewMode) {
      case 'album':
        return {
          display: 'flex',
          padding: '20px',
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minHeight: '200px'
        };
      case 'amenities':
        return {
          display: 'flex',
          padding: '12px',
          border: '1px solid #eee',
          borderRadius: '6px',
          backgroundColor: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minHeight: '80px'
        };
      default: // grid
        return {
          padding: '20px',
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minWidth: '280px',
          flex: '1 1 300px'
        };
    }
  };

  // Get content styles based on view mode
  const getContentStyles = () => {
    switch (viewMode) {
      case 'album':
        return {
          display: 'flex',
          width: '100%',
          gap: '20px',
          alignItems: 'flex-start'
        };
      case 'amenities':
        return {
          display: 'flex',
          width: '100%',
          gap: '15px',
          alignItems: 'center'
        };
      default: // grid
        return {
          display: 'block'
        };
    }
  };

  // Get image styles based on view mode
  const getImageStyles = () => {
    switch (viewMode) {
      case 'album':
        return {
          width: '200px',
          height: '120px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          flexShrink: 0
        };
      case 'amenities':
        return {
          width: '60px',
          height: '40px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          flexShrink: 0
        };
      default: // grid
        return {
          width: '100%',
          height: '200px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          marginBottom: '15px'
        };
    }
  };

  // Get text styles based on view mode
  const getTextStyles = () => {
    switch (viewMode) {
      case 'album':
        return {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          minWidth: '0'                                                      // Allow text to shrink
        };
      case 'amenities':
        return {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        };
      default: // grid
        return {
          display: 'block'
        };
    }
  };

  // Amenity emoji mapping
  const getAmenityEmoji = (amenity) => {
    const emojiMap = {
      'WiFi': '📶',
      'Pool': '🏊',
      'Kitchen': '🍳',
      'AC': '❄️',
      'Parking': '🚗',
      'Garden': '🌴',
      'Beach Access': '🏖️',
      'Balcony': '��',
      'BBQ': '🔥',
      'Gym': '🏋️',
      'Spa': '🧖',
      'Ocean View': '🌊',
      'Mountain View': '⛰️',
      'Private Pool': '🏊‍♂️',
      'Hot Tub': '🛁',
      'Fireplace': '🔥',
      'Washing Machine': '👕',
      'Dishwasher': '🍽️',
      'Coffee Maker': '☕',
      'Wine Cellar': '🍷'
    };
    return emojiMap[amenity] || '✨';                                        // Default emoji if not found
  };

  // Render amenities view
  const renderAmenitiesView = () => (
    <div style={getContentStyles()}>
      {/* Villa Image Placeholder */}
      <div style={getImageStyles()}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px'
        }}>
          🏠
        </div>
      </div>

      {/* Villa Details - Left side */}
      <div style={getTextStyles()}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {villa.title}
        </h3>
        
        <p style={{ 
          margin: 0, 
          color: '#666',
          fontSize: '12px'
        }}>
          {villa.location}
        </p>
        
        <p style={{ 
          margin: 0, 
          color: '#007bff',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          ${villa.pricePerNight}/night
        </p>
      </div>

      {/* Amenities Row - Right side */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexShrink: 0,
        alignItems: 'center'
      }}>
        {villa.amenities && villa.amenities.length > 0 ? (
          villa.amenities.slice(0, 8).map((amenity, index) => (              // Show first 8 amenities
            <span 
              key={index}
              style={{
                fontSize: '16px',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #eee'
              }}
              title={amenity}                                                 // Show amenity name on hover
            >
              {getAmenityEmoji(amenity)}
            </span>
          ))
        ) : (
          <span style={{ color: '#999', fontSize: '12px' }}>No amenities listed</span>
        )}
        
        {/* Show count if more than 8 amenities */}
        {villa.amenities && villa.amenities.length > 8 && (
          <span style={{
            fontSize: '12px',
            color: '#666',
            backgroundColor: '#f0f0f0',
            padding: '2px 6px',
            borderRadius: '10px'
          }}>
            +{villa.amenities.length - 8}
          </span>
        )}
      </div>
    </div>
  );

  // Render album view with multiple full-size images
  const renderAlbumView = () => (
    <div style={getContentStyles()}>
      {/* Image Gallery Section - 4 equal size images */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexShrink: 0,
        flex: 1                                                              // Take up available space
      }}>
        {/* Main Image */}
        <div style={{
          width: '120px',
          height: '80px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
          flexShrink: 0
        }}>
          Main
        </div>
        
        {/* Second Image - same size as main */}
        <div style={{
          width: '120px',
          height: '80px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
          flexShrink: 0
        }}>
          🛏️ Bedroom
        </div>
        
        {/* Third Image - same size as main */}
        <div style={{
          width: '120px',
          height: '80px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
          flexShrink: 0
        }}>
          Pool
        </div>
        
        {/* Fourth Image - same size as main */}
        <div style={{
          width: '120px',
          height: '80px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
          flexShrink: 0
        }}>
          🌴 Garden
        </div>
      </div>

      {/* Villa Details - Pushed to the right edge */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '180px',                                                   // Reduced width
        flexShrink: 0,                                                       // Don't allow shrinking
        justifyContent: 'flex-end',                                          // Push content to bottom
        alignItems: 'flex-end',                                              // Push content to right edge
        textAlign: 'right'                                                   // Right-align text
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
          lineHeight: '1.2'
        }}>
          {villa.title}
        </h3>
        
        <p style={{ 
          margin: 0, 
          color: '#666',
          fontSize: '13px',
          lineHeight: '1.2'
        }}>
          {villa.location}
        </p>
        
        <p style={{ 
          margin: 0, 
          color: '#007bff',
          fontWeight: 'bold',
          fontSize: '18px',
          lineHeight: '1.2'
        }}>
          ${villa.pricePerNight}/night
        </p>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          fontSize: '12px',
          color: '#666',
          justifyContent: 'flex-end'                                         // Right-align the icons
        }}>
          <span>👥 {villa.maxGuests} guests</span>
          <span>✨ {villa.amenities?.length || 0} amenities</span>
        </div>
      </div>
    </div>
  );

  // Render other view modes
  const renderOtherViews = () => (
    <div style={getContentStyles()}>
      {/* Villa Image Placeholder */}
      <div style={getImageStyles()}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: viewMode === 'amenities' ? '12px' : '14px'
        }}>
          🏠 Villa
        </div>
      </div>

      {/* Villa Details */}
      <div style={getTextStyles()}>
        <h3 style={{ 
          margin: 0, 
          fontSize: viewMode === 'amenities' ? '14px' : '18px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {villa.title}
        </h3>
        
        <p style={{ 
          margin: 0, 
          color: '#666',
          fontSize: viewMode === 'amenities' ? '12px' : '14px'
        }}>
          {villa.location}
        </p>
        
        <p style={{ 
          margin: 0, 
          color: '#007bff',
          fontWeight: 'bold',
          fontSize: viewMode === 'amenities' ? '14px' : '16px'
        }}>
          ${villa.pricePerNight}/night
        </p>
        
        {viewMode !== 'amenities' && (
          <p style={{ 
            margin: 0, 
            color: '#666',
            fontSize: '12px'
          }}>
            {villa.maxGuests} guests max • {villa.amenities?.length || 0} amenities
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div 
      onClick={() => onCardClick(villa.id)}
      style={getCardStyles()}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {viewMode === 'album' ? renderAlbumView() : 
       viewMode === 'amenities' ? renderAmenitiesView() : 
       renderOtherViews()}
    </div>
  );
}

export default VillaCard;