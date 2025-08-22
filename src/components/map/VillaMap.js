import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// Component to handle map center updates
function MapUpdater({ center, zoom }) {
  const map = useMap();                                                       // Get the map instance
  
  useEffect(() => {                                                          // Update map when center or zoom changes
    map.setView(center, zoom);                                               // Set new center and zoom
  }, [center, zoom, map]);
  
  return null;                                                               // This component doesn't render anything
}

function VillaMap({ villas, onVillaClick, selectedVillaId, mapWidth }) {     // Add mapWidth prop
  const mapRef = useRef();                                                   // Reference to the map container
  
  // Default center coordinates for Uluwatu, Bali
  const defaultCenter = [-8.8165, 115.0994];                                // Uluwatu coordinates [latitude, longitude]
  
  // Use real coordinates from database, filter out villas without coordinates
  const villasWithCoordinates = villas
    .filter(villa => villa.latitude && villa.longitude)                      // Only include villas with coordinates
    .map(villa => ({
      ...villa,
      coordinates: [villa.latitude, villa.longitude]                         // Use actual database coordinates
    }));

  // Calculate map center based on villa locations
  const calculateMapCenter = () => {
    if (villasWithCoordinates.length === 0) {
      return defaultCenter;                                                  // Use default center if no villas with coordinates
    }
    
    // Calculate the center point of all villa coordinates
    const totalLat = villasWithCoordinates.reduce((sum, villa) => sum + villa.coordinates[0], 0);
    const totalLng = villasWithCoordinates.reduce((sum, villa) => sum + villa.coordinates[1], 0);
    
    return [
      totalLat / villasWithCoordinates.length,                              // Average latitude
      totalLng / villasWithCoordinates.length                               // Average longitude
    ];
  };

  const mapCenter = calculateMapCenter();                                    // Get the calculated center point

  return (
    <MapContainer 
      center={mapCenter}                                                     // Center the map on calculated center
      zoom={12}                                                              // Initial zoom level
      style={{ height: '100%', width: '100%' }}                             // Make map fill its container
      ref={mapRef}                                                           // Store reference to map container
    >
      {/* CartoDB Voyager - More colorful but still clean and modern */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />
      
      {/* Villa Markers */}
      {villasWithCoordinates.map(villa => (
        <Marker 
          key={villa.id} 
          position={villa.coordinates}
          eventHandlers={{
            click: () => onVillaClick(villa.id)
          }}
        >
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{villa.title}</h3>
              <p style={{ margin: '0 0 8px 0', color: '#666' }}>{villa.location}</p>
              <p style={{ margin: 0, color: '#007bff', fontWeight: 'bold' }}>
                ${villa.pricePerNight}/night
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <MapUpdater center={mapCenter} zoom={12} />
    </MapContainer>
  );
}

export default VillaMap;