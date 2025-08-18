import React, { useState } from 'react';

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

function BookingForm({ villa }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request for ${villa.title}:\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      marginTop: '20px'
    }}>
      <h3>Book This Villa</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Check-in Date:
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            style={{
              padding: '8px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Check-out Date:
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            style={{
              padding: '8px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Number of Guests:
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            style={{
              padding: '8px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
            <option value={6}>6 Guests</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 24px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Request Booking
        </button>
      </form>
    </div>
  );
}

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

function GuestSide({ villas, selectedVillaId, setSelectedVillaId }) {
  const selectedVilla = villas.find(villa => villa.id === selectedVillaId);

  if (selectedVilla) {
    return (
      <VillaDetail 
        villa={selectedVilla} 
        onBackClick={() => setSelectedVillaId(null)}
      />
    );
  }

  return (
    <div>
      <h1>UluVillas</h1>
      <p>Luxury Villa Booking in Uluwatu, Bali</p>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        marginTop: '32px'
      }}>
        {villas.map(villa => (
          <VillaCard 
            key={villa.id}
            villa={villa}
            onCardClick={setSelectedVillaId}
          />
        ))}
      </div>
    </div>
  );
}

function VillaEditForm({ villa, onSave, onCancel }) {
  const [editedVilla, setEditedVilla] = useState({
    title: villa.title,
    pricePerNight: villa.pricePerNight,
    description: villa.description || '',
    location: villa.location || '',
    maxGuests: villa.maxGuests || 2,
    amenities: villa.amenities || []
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
        width: '500px',
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

function HostDashboard({ villas, bookingRequests, onVillaUpdate }) {
  const [editingVillaId, setEditingVillaId] = useState(null);

  const handleEditClick = (villaId) => {
    setEditingVillaId(villaId);
  };

  const handleSaveEdit = (villaId, updatedData) => {
    onVillaUpdate(villaId, updatedData);
    setEditingVillaId(null);
  };

  const handleCancelEdit = () => {
    setEditingVillaId(null);
  };

  const editingVilla = villas.find(villa => villa.id === editingVillaId);
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Host Dashboard</h1>
      <p>Manage your villa listings and bookings</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '32px' }}>
        
        {/* Villa Management Section */}
        <div>
          <h2>Your Villas</h2>
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#f9f9f9'
          }}>
            {villas.map(villa => (
              <div key={villa.id} style={{ 
                padding: '15px', 
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{villa.title}</h4>
                  <p style={{ margin: 0, color: '#666' }}>${villa.pricePerNight}/night</p>
                </div>
                <div>
                  <button 
                    onClick={() => handleEditClick(villa.id)}
                    style={{ 
                      padding: '5px 10px', 
                      marginRight: '5px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button style={{ 
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    View
                  </button>
                </div>
              </div>
            ))}
            <button style={{
              width: '100%',
              padding: '15px',
              marginTop: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              + Add New Villa
            </button>
          </div>
        </div>

        {/* Booking Requests Section */}
        <div>
          <h2>Recent Booking Requests</h2>
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#f9f9f9'
          }}>
            {bookingRequests.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center' }}>No booking requests yet</p>
            ) : (
              bookingRequests.map((request, index) => (
                <div key={index} style={{ 
                  padding: '15px', 
                  borderBottom: '1px solid #eee',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>{request.villaTitle}</h4>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Dates:</strong> {request.checkIn} to {request.checkOut}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Guests:</strong> {request.guests}
                  </p>
                  <div style={{ marginTop: '10px' }}>
                    <button style={{ 
                      padding: '5px 15px', 
                      marginRight: '10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Accept
                    </button>
                    <button style={{ 
                      padding: '5px 15px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingVilla && (
        <VillaEditForm
          villa={editingVilla}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

function App() {
  const [selectedVillaId, setSelectedVillaId] = useState(null);
  const [currentView, setCurrentView] = useState('guest'); // 'guest' or 'host'
  const [bookingRequests, setBookingRequests] = useState([]);
  
  const [villas, setVillas] = useState([
    { 
      id: 1, 
      title: "Ocean View Villa", 
      pricePerNight: 450,
      description: "Stunning oceanfront villa with panoramic views of the Indian Ocean. Perfect for romantic getaways and peaceful retreats.",
      location: "Uluwatu, Bali",
      maxGuests: 4,
      amenities: ["Pool", "Ocean View", "WiFi", "Kitchen", "Beach Access"]
    },
    { 
      id: 2, 
      title: "Cliff Edge Retreat", 
      pricePerNight: 680,
      description: "Luxurious villa perched on dramatic cliffs with infinity pool and world-class sunset views. Ultimate privacy and elegance.",
      location: "Uluwatu, Bali",
      maxGuests: 6,
      amenities: ["Pool", "Ocean View", "WiFi", "Air Conditioning", "Kitchen", "Gym", "Balcony"]
    },
    { 
      id: 3, 
      title: "Tropical Paradise Villa", 
      pricePerNight: 520,
      description: "Secluded garden villa surrounded by lush tropical vegetation. Traditional Balinese architecture with modern amenities.",
      location: "Uluwatu, Bali",
      maxGuests: 8,
      amenities: ["Pool", "Garden", "WiFi", "Air Conditioning", "Kitchen", "Parking"]
    }
  ]);

  const handleVillaUpdate = (villaId, updatedData) => {
    setVillas(prevVillas => 
      prevVillas.map(villa => 
        villa.id === villaId 
          ? { ...villa, ...updatedData }
          : villa
      )
    );
  };

  return (
    <div>
      {/* Navigation Header */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px 20px', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>UluVillas</div>
        <div>
          <button
            onClick={() => {
              setCurrentView('guest');
              setSelectedVillaId(null);
            }}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: currentView === 'guest' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Guest View
          </button>
          <button
            onClick={() => {
              setCurrentView('host');
              setSelectedVillaId(null);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: currentView === 'host' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Host Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      {currentView === 'guest' ? (
        <GuestSide 
          villas={villas}
          selectedVillaId={selectedVillaId}
          setSelectedVillaId={setSelectedVillaId}
        />
      ) : (
        <HostDashboard 
          villas={villas}
          bookingRequests={bookingRequests}
          onVillaUpdate={handleVillaUpdate}
        />
      )}
    </div>
  );
}

export default App;
