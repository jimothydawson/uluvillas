import React from 'react';
import VillaCard from '../villa/VillaCard';
import VillaDetail from '../villa/VillaDetail';
import BookingForm from '../forms/BookingForm';

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

export default GuestSide;