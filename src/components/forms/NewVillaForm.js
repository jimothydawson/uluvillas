import React, { useState } from 'react';

function NewVillaForm({ onSave, onCancel }) {
  const [newVilla, setNewVilla] = useState({
    title: '',
    pricePerNight: 250,
    description: '',
    location: '',
    maxGuests: 2,
    amenities: [],
    latitude: -8.8165,                                                       // Default to Uluwatu coordinates
    longitude: 115.0994
  });

  const availableAmenities = [
    'Pool', 'Ocean View', 'WiFi', 'Air Conditioning', 'Kitchen', 
    'Parking', 'Beach Access', 'Garden', 'Balcony', 'Gym'
  ];

  const handleAmenityToggle = (amenity) => {
    setNewVilla({
      ...newVilla,
      amenities: newVilla.amenities.includes(amenity)
        ? newVilla.amenities.filter(a => a !== amenity)
        : [...newVilla.amenities, amenity]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newVilla);
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
        <h2>Add New Villa</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Villa Name:
            </label>
            <input
              type="text"
              value={newVilla.title}
              onChange={(e) => setNewVilla({
                ...newVilla,
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
              value={newVilla.location}
              onChange={(e) => setNewVilla({
                ...newVilla,
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
              value={newVilla.description}
              onChange={(e) => setNewVilla({
                ...newVilla,
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
                value={newVilla.pricePerNight}
                onChange={(e) => setNewVilla({
                  ...newVilla,
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
                value={newVilla.maxGuests}
                onChange={(e) => setNewVilla({
                  ...newVilla,
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
                  value={newVilla.latitude}
                  onChange={(e) => setNewVilla({
                    ...newVilla,
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
                  value={newVilla.longitude}
                  onChange={(e) => setNewVilla({
                    ...newVilla,
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
                    checked={newVilla.amenities.includes(amenity)}
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
              Create Villa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewVillaForm;