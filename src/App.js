import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

import GuestSide from './components/guest/GuestSide';
import HostDashboard from './components/host/HostDashboard';

function App() {
  const [selectedVillaId, setSelectedVillaId] = useState(null);                // Track which villa is currently selected (null = none selected)
  const [currentView, setCurrentView] = useState('guest');                     // Track current view: 'guest' or 'host'
  const [bookingRequests, setBookingRequests] = useState([]);                  // Array of all booking requests from database
  
  const [villas, setVillas] = useState([]);                                    // Array of all villas from database
  const [loading, setLoading] = useState(true);                                // Track if data is still loading from database

  useEffect(() => {                                                            // Run this code when the component first loads
    fetchVillas();                                                             // Get all villas from database
    fetchBookingRequests();                                                    // Get all booking requests from database
  }, []);                                                                      // Empty array means "only run once when component mounts"

  const fetchVillas = async () => {                                            // Function to get all villas from the database
    try {                                                                      // Try to fetch the data, and if anything goes wrong, catch the error
      const { data, error } = await supabase                                   // Make a request to Supabase and get back data and any error
        .from('villas')                                                        // Tell Supabase which table to query (villas)
        .select('*')                                                           // Select all columns from the table (the * means "everything")
        .order('id');                                                          // Sort the results by the 'id' column in ascending order
      
      if (error) throw error;                                                  // If there was an error with the database request, throw it so we can catch it below

      setVillas(data || []);                                                   // Update our villas state with the data (use empty array if data is null)
    } catch (error) {                                                          // If anything went wrong (network error, database error, etc.), log it to the console
      console.error('Error fetching villas:', error);
    } finally {                                                                // This runs whether the request succeeded or failed
      setLoading(false);                                                       // Set loading to false so we stop showing the loading spinner
    }
  };

  const fetchBookingRequests = async () => {                                   // Function to get all booking requests from the database
    try {                                                                      // Try to fetch the data, and if anything goes wrong, catch the error
      const { data, error } = await supabase                                   // Make a request to Supabase and get back data and any error
        .from('booking_requests')                                              // Tell Supabase which table to query (booking_requests)
        .select('*')                                                           // Select all columns from the table (the * means "everything")
        .order('created_at', { ascending: false });                           // Sort by creation date, newest first (false = descending order)
  
      if (error) throw error;                                                  // If there was an error with the database request, throw it so we can catch it below
  
      setBookingRequests(data || []);                                          // Update our booking requests state with the data (use empty array if data is null)
    } catch (error) {                                                          // If anything went wrong (network error, database error, etc.), log it to the console
      console.error('Error fetching booking requests:', error )
    }
  }

  const handleBookingRequest = async (bookingData) => {                        // Function to create a new booking request in the database
    try {
      const { data, error } = await supabase                                   // Make a request to Supabase to insert new booking data
        .from('booking_requests')                                              // Tell Supabase which table to insert into
        .insert(bookingData)                                                   // Insert the booking data (dates, guests, villa info, etc.)
        .select();                                                             // Get back the newly created booking record

      if (error) throw error;                                                  // If there was an error, throw it so we can catch it below

      setBookingRequests(prevRequests => [data[0], ...prevRequests]);          // Add the new booking to the beginning of our local state array
      alert('Booking request submitted successfully!');                        // Show success message to user
    } catch (error) {                                                          // If anything went wrong, show error message
      console.error('Error creating booking request:', error);
      alert('Failed to submit booking request. Please try again.');
    }
  };

  const handleBookingAccept = async (bookingId) => {                          // Function to accept a booking request (host action)
    try {
      const { error } = await supabase                                         // Make a request to Supabase to update the booking status
        .from('booking_requests')                                              // Tell Supabase which table to update
        .update({ status: 'accepted' })                                        // Change the status field to 'accepted'
        .eq('id', bookingId);                                                  // Only update the booking with this specific ID
      
      if (error) throw error;                                                  // If there was an error, throw it so we can catch it below
      
      setBookingRequests(prevRequests =>                                       // Update our local state to reflect the change
        prevRequests.map(request =>                                            // Loop through all booking requests
          request.id === bookingId                                             // If this is the booking we just accepted
            ? { ...request, status: 'accepted' }                               // Update its status to 'accepted'
            : request                                                          // Otherwise leave it unchanged
        )
      );
      
      alert('Booking accepted successfully!');                                 // Show success message to host
    } catch (error) {                                                          // If anything went wrong, show error message
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking. Please try again.');
    }
  };

  const handleBookingDecline = async (bookingId) => {                         // Function to decline a booking request (host action)
    try {
      const { error } = await supabase                                         // Make a request to Supabase to update the booking status
        .from('booking_requests')                                              // Tell Supabase which table to update
        .update({ status: 'declined' })                                        // Change the status field to 'declined'
        .eq('id', bookingId);                                                  // Only update the booking with this specific ID
      
      if (error) throw error;                                                  // If there was an error, throw it so we can catch it below
      
      setBookingRequests(prevRequests =>                                       // Update our local state to reflect the change
        prevRequests.map(request =>                                            // Loop through all booking requests
          request.id === bookingId                                             // If this is the booking we just declined
            ? { ...request, status: 'declined' }                               // Update its status to 'declined'
            : request                                                          // Otherwise leave it unchanged
        )
      );
      
      alert('Booking declined successfully!');                                 // Show success message to host
    } catch (error) {                                                          // If anything went wrong, show error message
      console.error('Error declining booking:', error);
      alert('Failed to decline booking. Please try again.');
    }
  };

  const handleVillaUpdate = async (villaId, updatedData) => {                  // Function to update an existing villa in the database
    try {
      const { error } = await supabase                                         // Make a request to Supabase to update the villa
        .from('villas')                                                        // Tell Supabase which table to update
        .update(updatedData)                                                   // Update with the new data (name, price, description, etc.)
        .eq('id', villaId);                                                    // Only update the villa with this specific ID

      if (error) throw error;                                                  // If there was an error, throw it so we can catch it below

      setVillas(prevVillas =>                                                  // Update our local state to reflect the changes
        prevVillas.map(villa =>                                                // Loop through all villas
          villa.id === villaId                                                 // If this is the villa we just updated
          ? { ...villa, ...updatedData }                                       // Merge the old villa data with the new updates
          : villa                                                              // Otherwise leave it unchanged
        )
      );
    } catch (error) {                                                          // If anything went wrong, show error message
      console.error('Error updating villa:', error);
      alert('Failed to update villa. Please try again.');
    }
  };

  const handleVillaCreate = async (newVillaData) => {                         // Function to create a new villa in the database
    try {
      const { data, error } = await supabase                                   // Make a request to Supabase to insert new villa data
        .from('villas')                                                        // Tell Supabase which table to insert into
        .insert(newVillaData)                                                  // Insert the new villa data (name, price, description, etc.)
        .select();                                                             // Get back the newly created villa record

      if (error) throw error;                                                  // If there was an error, throw it so we can catch it below

      setVillas(prevVillas => [...prevVillas, data[0]]);                      // Add the new villa to the end of our local state array

    } catch (error) {                                                          // If anything went wrong, show error message
      console.error('Error creating villa:', error);
      alert('Failed to create villa. Please try again.');
    }
  };

  const handleVillaDelete = async (villaId) => {                              // Function to delete a villa from the database
    try {
      const { error } = await supabase                                         // Make a request to Supabase to delete the villa
        .from('villas')                                                        // Tell Supabase which table to delete from
        .delete()                                                              // Delete the record
        .eq('id', villaId);                                                    // Only delete the villa with this specific ID
      
      if (error) throw error;                                                  // If there was an error, throw it so we can catch it below
      
      setVillas(prevVillas => prevVillas.filter(villa => villa.id !== villaId)); // Remove the deleted villa from our local state
      
      if (selectedVillaId === villaId) {                                       // If the deleted villa was currently selected
        setSelectedVillaId(null);                                              // Clear the selection (go back to villa list)
      }
    } catch (error) {                                                          // If anything went wrong, show error message
      console.error('Error deleting villa:', error);
      alert('Failed to delete villa. Please try again.');
    }
  };

  return (
    <div>
      <div style={{                                                            // Navigation header container
        backgroundColor: '#f8f9fa', 
        padding: '15px 20px', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>UluVillas</div>  {/* App title */}
        <div>
          <button
            onClick={() => {                                                   // When guest view button is clicked
              setCurrentView('guest');                                         // Switch to guest view
              setSelectedVillaId(null);                                        // Clear any selected villa
            }}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: currentView === 'guest' ? '#007bff' : '#6c757d', // Blue if active, gray if inactive
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Guest View
          </button>
          <button
            onClick={() => {                                                   // When host dashboard button is clicked
              setCurrentView('host');                                          // Switch to host view
              setSelectedVillaId(null);                                        // Clear any selected villa
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: currentView === 'host' ? '#007bff' : '#6c757d', // Blue if active, gray if inactive
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

      {currentView === 'guest' ? (                                             // If current view is guest, show guest interface
        <GuestSide 
          villas={villas}                                                      // Pass all villas to guest component
          selectedVillaId={selectedVillaId}                                    // Pass currently selected villa ID
          setSelectedVillaId={setSelectedVillaId}                              // Pass function to change selected villa
          onBookingSubmit={handleBookingRequest}                               // Pass function to handle booking submissions
        />
      ) : (                                                                    // Otherwise show host dashboard
        <HostDashboard 
          villas={villas}                                                      // Pass all villas to host component
          bookingRequests={bookingRequests}                                    // Pass all booking requests to host component
          onVillaUpdate={handleVillaUpdate}                                    // Pass function to update villas
          onVillaCreate={handleVillaCreate}                                    // Pass function to create new villas
          onVillaDelete={handleVillaDelete}                                    // Pass function to delete villas
          onBookingAccept={handleBookingAccept}                                // Pass function to accept bookings
          onBookingDecline={handleBookingDecline}                              // Pass function to decline bookings
        />
      )}
    </div>
  );
}

export default App;