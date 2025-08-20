import React from 'react';

function DeleteConfirmModal({ villa, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>Delete Villa</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.5' }}>
          Are you sure you want to delete <strong>"{villa.title}"</strong>?
        </p>
        <p style={{ 
          marginBottom: '25px', 
          fontSize: '14px', 
          color: '#666',
          lineHeight: '1.4'
        }}>
          This action cannot be undone. The villa will be permanently removed from your listings and will no longer be visible to guests.
        </p>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(villa.id)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Delete Villa
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;