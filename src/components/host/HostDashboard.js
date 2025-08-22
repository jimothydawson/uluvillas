import React, { useState } from 'react';

import VillaEditForm from '../forms/VillaEditForm';
import VillaPreviewModal from '../modals/VillaPreviewModal';
import NewVillaForm from '../forms/NewVillaForm';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import AvailabilityCalendar from './AvailabilityCalendar';

function HostDashboard({ 
  villas, 
  bookingRequests, 
  onVillaUpdate, 
  onVillaCreate, 
  onVillaDelete,
  onBookingAccept,    
  onBookingDecline    
}) {
  const [editingVillaId, setEditingVillaId] = useState(null);
  const [previewVillaId, setPreviewVillaId] = useState(null);
  const [showNewVillaForm, setShowNewVillaForm] = useState(false);
  const [deletingVillaId, setDeletingVillaId] = useState(null);
  const [showCalendar, setShowCalendar] = useState(null);

  const handleEditClick = (villaId) => {
    setEditingVillaId(villaId);
  };

  const handleViewClick = (villaId) => {
    setPreviewVillaId(villaId);
  };

  const handleEditAvailabilityClick = (villa) => {
    setShowCalendar(villa.id);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(null);
  };

  const handleDeleteClick = (villaId) => {
    setDeletingVillaId(villaId);
  };

  const handleAddNewClick = () => {
    setShowNewVillaForm(true);
  };

  const handleSaveEdit = (villaId, updatedData) => {
    onVillaUpdate(villaId, updatedData);
    setEditingVillaId(null);
  };

  const handleSaveNew = (newVillaData) => {
    onVillaCreate(newVillaData);
    setShowNewVillaForm(false);
  };

  const handleConfirmDelete = (villaId) => {
    onVillaDelete(villaId);
    setDeletingVillaId(null);
  };

  const handleCancelEdit = () => {
    setEditingVillaId(null);
  };

  const handleCancelNew = () => {
    setShowNewVillaForm(false);
  };

  const handleCancelDelete = () => {
    setDeletingVillaId(null);
  };

  const handleClosePreview = () => {
    setPreviewVillaId(null);
  };

  const editingVilla = villas.find(villa => villa.id === editingVillaId);
  const previewVilla = villas.find(villa => villa.id === previewVillaId);
  const deletingVilla = villas.find(villa => villa.id === deletingVillaId);
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Host Dashboard</h1>
      <p>Manage your villa listings and bookings</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '32px', marginBottom: '40px' }}>
        
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
                    onClick={() => handleEditAvailabilityClick(villa)}
                    style={{ 
                      padding: '5px 10px', 
                      marginRight: '5px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Calendar
                  </button>  
                  <button 
                    onClick={() => handleEditClick(villa.id)}
                    style={{ 
                      padding: '5px 10px', 
                      marginRight: '5px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleViewClick(villa.id)}
                    style={{ 
                      padding: '5px 10px',
                      marginRight: '5px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(villa.id)}
                    style={{ 
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={handleAddNewClick}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
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
                    <button 
                      onClick={() => onBookingAccept(request.id)}
                      style={{ 
                        padding: '5px 15px', 
                        marginRight: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => onBookingDecline(request.id)}
                      style={{ 
                        padding: '5px 15px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
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

      {/* Preview Modal */}
      {previewVilla && (
        <VillaPreviewModal
          villa={previewVilla}
          onClose={handleClosePreview}
        />
      )}

      {/* New Villa Form Modal */}
      {showNewVillaForm && (
        <NewVillaForm
          onSave={handleSaveNew}
          onCancel={handleCancelNew}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingVilla && (
        <DeleteConfirmModal
          villa={deletingVilla}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Calendar Modal */}
      {showCalendar && (
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
            width: '800px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2>Calendar - {villas.find(v => v.id === showCalendar)?.title}</h2>
              <button
                onClick={handleCloseCalendar}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
            
            <AvailabilityCalendar 
              villas={villas}
              bookingRequests={bookingRequests}
              selectedVillaId={showCalendar}
              onVillaSelect={(villaId) => setShowCalendar(villaId)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HostDashboard;