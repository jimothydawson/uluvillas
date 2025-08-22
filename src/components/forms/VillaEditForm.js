import React, { useState } from 'react';

function VillaEditForm({ villa, onSave, onCancel }) {
  const [editedVilla, setEditedVilla] = useState({
    title: villa.title,
    pricePerNight: villa.pricePerNight,
    description: villa.description || '',
    location: villa.location || '',
    maxGuests: villa.maxGuests || 2,
    amenities: villa.amenities || [],
    latitude: villa.latitude || -8.8165,                                     // Default to Uluwatu coordinates
    longitude: villa.longitude || 115.0994
  });

  const availableAmenities = [
    'Pool', 'Ocean View', 'WiFi', 'Air Conditioning', 'Kitchen', 
    'Parking', 'Beach Access', 'Garden', 'Balcony', 'Gym'
  ];

  const handleAmenityToggle = (amenity) => {
    setEditedVilla({
      ...editedVilla,
      amenities: editedVilla.amenities.includes(amenity)
        ? editedVilla.amenities.filter(a => a !== amenity)
        : [...editedVilla.amenities, amenity]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(villa.id, editedVilla);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '600px',
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto'
      }}>
        <h2>Edit Villa</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Villa Name:
            </label>
            <input
              type="text"
              value={editedVilla.title}
              onChange={(e) => setEditedVilla({
                ...editedVilla,
                title: e.target.value
              })}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Location:
            </label>
            <input
              type="text"
              value={editedVilla.location}
              onChange={(e) => setEditedVilla({
                ...editedVilla,
                location: e.target.value
              })}
              placeholder="e.g., Uluwatu, Bali"
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Description:
            </label>
            <textarea
              value={editedVilla.description}
              onChange={(e) => setEditedVilla({
                ...editedVilla,
                description: e.target.value
              })}
              placeholder="Describe your villa's unique features, views, and what makes it special..."
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '100px',
                resize: 'vertical'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Price per Night ($):
              </label>
              <input
                type="number"
                value={editedVilla.pricePerNight}
                onChange={(e) => setEditedVilla({
                  ...editedVilla,
                  pricePerNight: parseInt(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                min="1"
                required
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Max Guests:
              </label>
              <select
                value={editedVilla.maxGuests}
                onChange={(e) => setEditedVilla({
                  ...editedVilla,
                  maxGuests: parseInt(e.target.value)
                })}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Map Coordinates Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>Map Location</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Latitude:
                </label>
                <input
                  type="number"
                  step="0.00000001"
                  value={editedVilla.latitude}
                  onChange={(e) => setEditedVilla({
                    ...editedVilla,
                    latitude: parseFloat(e.target.value)
                  })}
                  placeholder="-8.8165"
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Longitude:
                </label>
                <input
                  type="number"
                  step="0.00000001"
                  value={editedVilla.longitude}
                  onChange={(e) => setEditedVilla({
                    ...editedVilla,
                    longitude: parseFloat(e.target.value)
                  })}
                  placeholder="115.0994"
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              💡 Tip: You can get coordinates from Google Maps by right-clicking on a location
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Amenities:
            </label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '10px',
              padding: '10px',
              border: '1px solid #eee',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9'
            }}>
              {availableAmenities.map(amenity => (
                <label key={amenity} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  <input
                    type="checkbox"
                    checked={editedVilla.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    style={{ marginRight: '8px' }}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VillaEditForm;