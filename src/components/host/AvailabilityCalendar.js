import React, { useState, useMemo, useEffect } from 'react';

function AvailabilityCalendar({ villas, bookingRequests, selectedVillaId, onVillaSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedVilla, setSelectedVilla] = useState(null);

  useEffect(() => {
    if (selectedVillaId) {
      const villa = villas.find(v => v.id === selectedVillaId);
      setSelectedVilla(villa);
    } else {
      setSelectedVilla(null);
    }
  }, [selectedVillaId, villas]);

  // Get current month's calendar data
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  // Get booking status for a specific date
  const getDateStatus = (date) => {
    if (!selectedVilla) return 'available';
    
    const dateStr = date.toISOString().split('T')[0];
    
    // Check if there are any bookings for this villa on this date
    const bookingsForDate = bookingRequests.filter(request => 
      request.villaTitle === selectedVilla.title &&
      request.status === 'accepted' &&
      dateStr >= request.checkIn &&
      dateStr <= request.checkOut
    );
    
    const pendingForDate = bookingRequests.filter(request => 
      request.villaTitle === selectedVilla.title &&
      request.status === 'pending' &&
      dateStr >= request.checkIn &&
      dateStr <= request.checkOut
    );
    
    if (bookingsForDate.length > 0) return 'booked';
    if (pendingForDate.length > 0) return 'pending';
    return 'available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked': return '#dc3545';
      case 'pending': return '#ffc107';
      case 'available': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'booked': return 'Booked';
      case 'pending': return 'Pending';
      case 'available': return 'Available';
      default: return 'Unknown';
    }
  };

  const handleVillaSelect = (villa) => {
    setSelectedVilla(villa);
    if (onVillaSelect) onVillaSelect(villa.id);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Availability Calendar</h3>
      
      {/* Villa Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Select Villa:
        </label>
        <select 
          value={selectedVilla?.id || ''} 
          onChange={(e) => {
            const villa = villas.find(v => v.id === parseInt(e.target.value));
            handleVillaSelect(villa);
          }}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '100%'
          }}
        >
          <option value="">Choose a villa...</option>
          {villas.map(villa => (
            <option key={villa.id} value={villa.id}>
              {villa.title}
            </option>
          ))}
        </select>
      </div>

      {selectedVilla && (
        <>
          {/* Month Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <button 
              onClick={goToPreviousMonth}
              style={{
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ← Previous
            </button>
            <h4 style={{ margin: 0 }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>
            <button 
              onClick={goToNextMonth}
              style={{
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Next →
            </button>
          </div>

          {/* Calendar Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '2px',
            marginBottom: '20px'
          }}>
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{
                padding: '10px',
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: '#e9ecef',
                fontSize: '12px'
              }}>
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarData.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const status = getDateStatus(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={index}
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                    backgroundColor: isCurrentMonth ? 'white' : '#f8f9fa',
                    border: isToday ? '2px solid #007bff' : '1px solid #dee2e6',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: isCurrentMonth ? '#333' : '#999',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {date.getDate()}
                  {isCurrentMonth && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(status)
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#28a745'
              }} />
              Available
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffc107'
              }} />
              Pending
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#dc3545'
              }} />
              Booked
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AvailabilityCalendar;
