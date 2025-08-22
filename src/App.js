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
    fetchBookingRequests();
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

  const fetchBookingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });

        if (error) throw error;

        setBookingRequests(data || []);
    } catch (error) {
      console.error('Error fetching booking requests:', error )
    }
  }

  const handleBookingRequest = async (bookingData) => {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .insert(bookingData)
        .select();

        if (error) throw error;

        // Add to local state
        setBookingRequests(prevRequests => [data[0], ...prevRequests]);

        alert('Booking request submitted successfully!');
    } catch (error) {
      console.error('Error creating booking request:', error);
      alert('Failed to submit booking request. Please try again.');
    }
  };

  const handleBookingAccept = async (bookingId) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status: 'accepted' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      // Update local state
      setBookingRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === bookingId
            ? { ...request, status: 'accepted' }
            : request
        )
      );
      
      alert('Booking accepted successfully!');
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking. Please try again.');
    }
  };

  const handleBookingDecline = async (bookingId) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status: 'declined' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      // Update local state
      setBookingRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === bookingId
            ? { ...request, status: 'declined' }
            : request
        )
      );
      
      alert('Booking declined successfully!');
    } catch (error) {
      console.error('Error declining booking:', error);
      alert('Failed to decline booking. Please try again.');
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
          onBookingSubmit={handleBookingRequest}
        />
      ) : (
        <HostDashboard 
          villas={villas}
          bookingRequests={bookingRequests}
          onVillaUpdate={handleVillaUpdate}
          onVillaCreate={handleVillaCreate}
          onVillaDelete={handleVillaDelete}
          onBookingAccept={handleBookingAccept}
          onBookingDecline={handleBookingDecline}
        />
      )}
    </div>
  );
}

export default App;
