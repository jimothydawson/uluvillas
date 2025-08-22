import React, { useState } from 'react';
import { Range } from 'react-range';

function FilterBar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 1500]);                    // State for price range slider (min, max)
  const [maxGuests, setMaxGuests] = useState('');                             // State for selected number of guests
  const [selectedAmenities, setSelectedAmenities] = useState([]);             // State for selected amenities (array of strings)

  const availableAmenities = [                                                // List of all possible amenities that villas can have
    'Pool', 'Ocean View', 'WiFi', 'Air Conditioning', 'Kitchen', 
    'Parking', 'Beach Access', 'Garden', 'Balcony', 'Gym'
  ];

  const handleAmenityToggle = (amenity) => {                                  // Function to add/remove an amenity from the selected list
    setSelectedAmenities(prev =>                                              // Update the selected amenities state
      prev.includes(amenity)                                                  // If amenity is already selected
        ? prev.filter(a => a !== amenity)                                     // Remove it from the array
        : [...prev, amenity]                                                  // Otherwise add it to the array
    );
  };

  const handleFilterChange = () => {                                          // Function to send current filter values to parent component
    onFilterChange({                                                          // Call the parent function with an object containing all filters
      priceRange,                                                             // Current price range [min, max]
      maxGuests: maxGuests ? parseInt(maxGuests) : null,                      // Convert string to number, or null if empty
      amenities: selectedAmenities                                            // Array of selected amenities
    });
  };

  const handleClearFilters = () => {                                          // Function to reset all filters to their default values
    setPriceRange([0, 1500]);                                                 // Reset price range to full range
    setMaxGuests('');                                                         // Reset guests to empty (any)
    setSelectedAmenities([]);                                                 // Reset amenities to empty array (any)
  }

  React.useEffect(() => {                                                     // Hook that runs whenever filter values change
    handleFilterChange();                                                     // Send updated filters to parent component
  }, [priceRange, maxGuests, selectedAmenities]);                             // Dependencies: re-run when any of these change

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginBottom: '15px' }}>Filter Villas</h3>
      <button onClick={handleClearFilters}>Clear Filters</button>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold' }}>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        
        {/* Dual Range Slider */}
        <div style={{ padding: '20px 10px' }}>
          <Range
            step={50}                                                         // Price increments of $50
            min={0}                                                           // Minimum possible price
            max={1500}                                                        // Maximum possible price
            values={priceRange}                                               // Current selected range [min, max]
            onChange={(values) => setPriceRange(values)}                      // Update state when slider changes
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',                                             // Height of clickable area
                  display: 'flex',
                  width: '100%'
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '6px',                                            // Height of the track line
                    width: '100%',
                    borderRadius: '3px',
                    background: `linear-gradient(
                      to right, 
                      #ccc 0%, 
                      #ccc ${((priceRange[0] - 0) / (1500 - 0)) * 100}%, 
                      #007bff ${((priceRange[0] - 0) / (1500 - 0)) * 100}%, 
                      #007bff ${((priceRange[1] - 0) / (1500 - 0)) * 100}%, 
                      #ccc ${((priceRange[1] - 0) / (1500 - 0)) * 100}%, 
                      #ccc 100%
                    )`,                                                       // Gray track with blue active section
                    alignSelf: 'center'
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '20px',                                             // Size of the draggable handle
                  width: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',                                 // Blue handle color
                  border: '3px solid white',
                  boxShadow: isDragged ? '0 0 10px rgba(0,123,255,0.5)' : '0 2px 6px rgba(0,0,0,0.1)', // Shadow effect
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            )}
          />
        </div>
      </div>

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