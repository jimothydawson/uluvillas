import React, { useState, useMemo } from 'react';
import VillaCard from '../villa/VillaCard';
import VillaDetail from '../villa/VillaDetail';
import FilterBar from '../filters/FilterBar';

function GuestSide({ villas, selectedVillaId, setSelectedVillaId, onBookingSubmit }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1500],
    maxGuests: null,
    amenities: []
  });

  const selectedVilla = villas.find(villa => villa.id === selectedVillaId);

  // Filter villas based on current filters
  const filteredVillas = useMemo(() => {
    return villas.filter(villa => {
      // Price filter
      if (villa.pricePerNight < filters.priceRange[0] || 
          villa.pricePerNight > filters.priceRange[1]) {
        return false;
      }

      // Max guests filter
      if (filters.maxGuests && villa.maxGuests < filters.maxGuests) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          villa.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [villas, filters]);

  if (selectedVilla) {
    return (
      <VillaDetail 
        villa={selectedVilla} 
        onBackClick={() => setSelectedVillaId(null)}
        onBookingSubmit={onBookingSubmit}
      />
    );
  }

  return (
    <div>
      <h1>UluVillas</h1>
      <p>Luxury Villa Booking in Uluwatu, Bali</p>
      
      <FilterBar onFilterChange={setFilters} />
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        marginTop: '32px'
      }}>
        {filteredVillas.map(villa => (
          <VillaCard 
            key={villa.id}
            villa={villa}
            onCardClick={setSelectedVillaId}
          />
        ))}
      </div>
      
      {filteredVillas.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          No villas match your current filters. Try adjusting your search criteria.
        </p>
      )}
    </div>
  );
}

export default GuestSide;