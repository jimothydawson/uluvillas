import React, { useState, useMemo } from 'react';
import VillaCard from '../villa/VillaCard';
import VillaDetail from '../villa/VillaDetail';
import FilterModal from '../modals/FilterModal';
import VillaMap from '../map/VillaMap';

function GuestSide({ villas, selectedVillaId, setSelectedVillaId, onBookingSubmit }) {
  const [filters, setFilters] = useState({                                    // State for current filter settings
    priceRange: [0, 1500],                                                   // Price range [min, max] - start with full range
    maxGuests: null,                                                         // Number of guests filter - null means "any"
    amenities: []                                                            // Array of selected amenities - empty means "any"
  });
  const [showFilterModal, setShowFilterModal] = useState(false);             // State to control filter modal visibility
  const [listWidth, setListWidth] = useState(50);                            // State for villa list width percentage (50% default - half and half)
  const [viewMode, setViewMode] = useState('grid');                          // State for view mode: 'grid', 'album', 'amenities'

  const selectedVilla = villas.find(villa => villa.id === selectedVillaId);  // Find the villa object that matches the selected ID

  // Filter villas based on current filters
  const filteredVillas = useMemo(() => {                                     // Memoize the filtered results to avoid recalculating on every render
    return villas.filter(villa => {                                          // Loop through all villas and keep only those that match filters
      // Price filter
      if (villa.pricePerNight < filters.priceRange[0] ||                    // Check if villa price is below minimum
          villa.pricePerNight > filters.priceRange[1]) {                    // Check if villa price is above maximum
        return false;                                                        // Exclude this villa if price doesn't match
      }

      // Max guests filter
      if (filters.maxGuests && villa.maxGuests < filters.maxGuests) {        // If guest filter is set and villa capacity is too small
        return false;                                                        // Exclude this villa if it can't accommodate enough guests
      }

      // Amenities filter
      if (filters.amenities.length > 0) {                                    // If any amenities are selected for filtering
        const hasAllAmenities = filters.amenities.every(amenity =>           // Check if villa has ALL selected amenities
          villa.amenities.includes(amenity)                                  // Look for each required amenity in villa's amenity list
        );
        if (!hasAllAmenities) {                                              // If villa is missing any required amenity
          return false;                                                      // Exclude this villa
        }
      }

      return true;                                                           // Include this villa if it passes all filters
    });
  }, [villas, filters]);                                                     // Recalculate when villas array or filters change

  // Handle mouse events for resizing (desktop only)
  const handleMouseDown = (e) => {                                           // Start resizing when mouse is pressed on divider
    e.preventDefault();                                                      // Prevent text selection during drag
    
    const startX = e.clientX;                                                // Get initial mouse position
    const startWidth = listWidth;                                            // Get initial list width
    
    const handleMouseMove = (e) => {                                         // Handle mouse movement during drag
      const deltaX = e.clientX - startX;                                     // Calculate how far mouse has moved
      const containerWidth = window.innerWidth;                              // Get total container width
      const deltaPercent = (deltaX / containerWidth) * 100;                  // Convert pixels to percentage
      const newWidth = Math.max(20, Math.min(80, startWidth + deltaPercent)); // Constrain width between 20% and 80%
      setListWidth(newWidth);                                                // Update list width
    };
    
    const handleMouseUp = () => {                                            // Stop resizing when mouse is released
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);                  // Listen for mouse movement
    document.addEventListener('mouseup', handleMouseUp);                      // Listen for mouse release
  };

  // Count active filters for the filter icon badge
  const activeFilterCount = (filters.maxGuests ? 1 : 0) +                    // Count guest filter if active
                           (filters.amenities.length > 0 ? 1 : 0) +          // Count amenities filter if active
                           (filters.priceRange[0] > 0 || filters.priceRange[1] < 1500 ? 1 : 0); // Count price filter if not default

  // Get view mode styles
  const getViewModeStyles = () => {
    switch (viewMode) {
      case 'album':
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        };
      case 'amenities':
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        };
      default: // grid
        return {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'flex-start'
        };
    }
  };

  if (selectedVilla) {                                                       // If a villa is selected, show the detail view instead of list
    return (
      <VillaDetail 
        villa={selectedVilla}                                                // Pass the selected villa object to detail component
        onBackClick={() => setSelectedVillaId(null)}                        // Function to go back to villa list (clear selection)
        onBookingSubmit={onBookingSubmit}                                   // Function to handle booking submissions
      />
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}> {/* Full height container */}
      {/* Header */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0' }}>UluVillas</h1>
          <p style={{ margin: 0, color: '#666' }}>Luxury Villa Booking in Uluwatu, Bali</p>
        </div>
        
        {/* Filter Button */}
        <button
          onClick={() => setShowFilterModal(true)}                           // Open filter modal when clicked
          style={{
            padding: '12px 20px',
            backgroundColor: activeFilterCount > 0 ? '#007bff' : '#f8f9fa',  // Blue if filters active, gray if not
            color: activeFilterCount > 0 ? 'white' : '#333',                 // White text if filters active, dark if not
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <span style={{ fontSize: '16px' }}>🔍</span>                       {/* Filter icon */}
          Filters
          {activeFilterCount > 0 && (                                        // Show badge if filters are active
            <span style={{
              backgroundColor: 'white',
              color: '#007bff',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content - Responsive layout */}
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden',                                                   // Prevent scrolling issues
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row'           // Column on mobile, row on desktop
      }}>
        {/* Left Side - Villa List (Top on mobile) */}
        <div style={{ 
          width: window.innerWidth <= 768 ? '100%' : `${listWidth}%`,        // Full width on mobile, dynamic on desktop
          height: window.innerWidth <= 768 ? '60%' : '100%',                 // 60% height on mobile, full height on desktop
          overflowY: 'auto',                                                 // Scrollable if many villas
          backgroundColor: 'white',
          borderRight: window.innerWidth <= 768 ? 'none' : '1px solid #eee', // No border on mobile
          borderBottom: window.innerWidth <= 768 ? '1px solid #eee' : 'none', // Bottom border on mobile
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Quick Filter Bar */}
          <div style={{
            padding: '15px 20px',
            borderBottom: '1px solid #eee',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0                                                    // Don't allow this to shrink
          }}>
            {/* Results Count */}
            <div style={{ fontSize: '14px', color: '#666' }}>
              {filteredVillas.length} villa{filteredVillas.length !== 1 ? 's' : ''} found
            </div>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              gap: '5px',
              backgroundColor: 'white',
              borderRadius: '6px',
              padding: '2px',
              border: '1px solid #ddd'
            }}>
              {/* Grid View Button */}
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'grid' ? '#007bff' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span style={{ fontSize: '16px' }}>⊞</span>                   {/* Grid icon */}
                Grid
              </button>

              {/* Album View Button */}
              <button
                onClick={() => setViewMode('album')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'album' ? '#007bff' : 'transparent',
                  color: viewMode === 'album' ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span style={{ fontSize: '16px' }}>🖼️</span>                  {/* Album icon */}
                Album
              </button>

              {/* Amenities View Button */}
              <button
                onClick={() => setViewMode('amenities')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'amenities' ? '#007bff' : 'transparent',
                  color: viewMode === 'amenities' ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span style={{ fontSize: '16px' }}>✨</span>                  {/* Amenities icon */}
                Amenities
              </button>
            </div>
          </div>

          {/* Villa Cards Container */}
          <div style={{ 
            padding: '20px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {filteredVillas.length > 0 ? (                                   // If there are villas to show
              <div style={getViewModeStyles()}>                              {/* Dynamic styles based on view mode */}
                {filteredVillas.map(villa => (                               // Loop through filtered villas and create a card for each
                  <VillaCard 
                    key={villa.id}                                           // Unique key for React to track each card
                    villa={villa}                                            // Pass the villa object to the card component
                    onCardClick={setSelectedVillaId}                         // Function to select this villa when card is clicked
                    viewMode={viewMode}                                      // Pass view mode to card for styling
                  />
                ))}
              </div>
            ) : (                                                            // If no villas match the current filters
              <div style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
                <p>No villas match your current filters.</p>
                <p>Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Resizable Divider - Desktop only */}
        {window.innerWidth > 768 && (
          <div
            onMouseDown={handleMouseDown}                                     // Start resizing when mouse pressed
            style={{
              width: '8px',                                                  // Width of the draggable area
              backgroundColor: '#f8f9fa',                                    // Light background color
              cursor: 'col-resize',                                          // Show resize cursor
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 100                                                    // Ensure it's above other elements
            }}
          >
            {/* Divider Handle */}
            <div style={{
              width: '2px',
              height: '40px',
              backgroundColor: '#ddd',
              borderRadius: '1px'
            }} />
          </div>
        )}

        {/* Right Side - Map (Bottom on mobile) */}
        <div style={{ 
          width: window.innerWidth <= 768 ? '100%' : `${100 - listWidth}%`,  // Full width on mobile, dynamic on desktop
          height: window.innerWidth <= 768 ? '40%' : '100%'                  // 40% height on mobile, full height on desktop
        }}>
          <VillaMap 
            villas={filteredVillas}                                          // Pass filtered villas to map
            onVillaClick={setSelectedVillaId}                                // Handle villa selection from map
            selectedVillaId={selectedVillaId}                                // Pass selected villa for highlighting
            mapWidth={window.innerWidth <= 768 ? 100 : 100 - listWidth}      // Full width on mobile, dynamic on desktop
          />
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={showFilterModal}                                             // Control modal visibility
        onClose={() => setShowFilterModal(false)}                            // Close modal function
        onFilterChange={setFilters}                                          // Update filters function
      />
    </div>
  );
}

export default GuestSide;