import React from 'react';
import FilterBar from '../filters/FilterBar';

function FilterModal({ isOpen, onClose, onFilterChange }) {
  if (!isOpen) return null;                                                   // Don't render anything if modal is closed

  return (
    <div style={{                                                            // Full screen overlay
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',                                    // Semi-transparent background
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000                                                           // Ensure modal appears above everything
    }}>
      <div style={{                                                          // Modal content container
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto'
      }}>
        <div style={{                                                        // Header with title and close button
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0 }}>Filter Villas</h2>                      {/* Modal title */}
          <button
            onClick={onClose}                                                 // Close modal when clicked
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✕ Close
          </button>
        </div>
        
        <FilterBar onFilterChange={onFilterChange} />                        {/* Filter component inside modal */}
      </div>
    </div>
  );
}

export default FilterModal;
