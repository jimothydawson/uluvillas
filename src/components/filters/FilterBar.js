import React, { useState } from 'react';

function FilterBar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [maxGuests, setMaxGuests] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const availableAmenities = [
    'Pool', 'Ocean View', 'WiFi', 'Air Conditioning', 'Kitchen', 
    'Parking', 'Beach Access', 'Garden', 'Balcony', 'Gym'
  ];

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleFilterChange = () => {
    onFilterChange({
      priceRange,
      maxGuests: maxGuests ? parseInt(maxGuests) : null,
      amenities: selectedAmenities
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 1500]);
    setMaxGuests('');
    setSelectedAmenities([]);
  }

  // Update filters when any filter changes
  React.useEffect(() => {
    handleFilterChange();
  }, [priceRange, maxGuests, selectedAmenities]);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginBottom: '15px' }}>Filter Villas</h3>
      <button
        onClick={handleClearFilters}>Clear Filters</button>
      {/* Price Range */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="1500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          style={{ width: '100%' }}
        />
      </div>

      {/* Max Guests */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Guests:
        </label>
        <select
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '200px'
          }}
        >
          <option value="">Any</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>

      {/* Amenities */}
      <div>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Amenities:
        </label>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px'
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
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                style={{ marginRight: '8px' }}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;