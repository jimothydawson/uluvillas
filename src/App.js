import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

import GuestSide from './components/guest/GuestSide';
import HostDashboard from './components/host/HostDashboard';

function App() {
  const [selectedVillaId, setSelectedVillaId] = useState(null);
  const [currentView, setCurrentView] = useState('guest'); // 'guest' or 'host'
  const [bookingRequests, setBookingRequests] = useState([]);
  
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);

    // Load villas from database when app starts
  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      const { data, error } = await supabase
        .from('villas')
        .select('*')
        .order('id');
      
      if (error) throw error;

      setVillas(data || []);
    } catch (error) {
      console.error('Error fetching villas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVillaUpdate = async (villaId, updatedData) => {
    try {
      const { error } = await supabase
        .from('villas')
        .update(updatedData)
        .eq('id', villaId);

        if (error) throw error;

        setVillas(prevVillas =>
          prevVillas.map(villa =>
            villa.id === villaId
            ? { ...villa, ...updatedData }
            : villa
          )
        );
    } catch (error) {
      console.error('Error updating villa:', error);
      alert('Failed to update villa. Please try again.');
    }
  };

  const handleVillaCreate = async (newVillaData) => {
    try {
      const { data, error } = await supabase
        .from('villas')
        .insert(newVillaData)
        .select();

        if (error) throw error;

        setVillas(prevVillas => [...prevVillas, data[0]]);

    } catch (error) {
      console.error('Error creating villa:', error);
      alert('Failed to create villa. Please try again.');
    }
  };

  const handleVillaDelete = async (villaId) => {
    try {
      const { error } = await supabase
        .from('villas')
        .delete()
        .eq('id', villaId);
      
      if (error) throw error;
      
      // Remove from local state
      setVillas(prevVillas => prevVillas.filter(villa => villa.id !== villaId));
      
      // Clear any related state if the deleted villa was selected
      if (selectedVillaId === villaId) {
        setSelectedVillaId(null);
      }
    } catch (error) {
      console.error('Error deleting villa:', error);
      alert('Failed to delete villa. Please try again.');
    }
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
          onVillaCreate={handleVillaCreate}
          onVillaDelete={handleVillaDelete}
        />
      )}
    </div>
  );
}

export default App;
