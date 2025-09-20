import { useState } from 'react';
import BookingCalendar from '@/components/BookingCalendar';
import BookingForm from '@/components/BookingForm';
import { TimeSlot } from '@/types/booking';

const Index = () => {
  const [currentView, setCurrentView] = useState<'calendar' | 'form'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const handleBookingClick = (date: string, timeSlot: TimeSlot) => {
    setSelectedBooking({
      date,
      time: timeSlot.time,
    });
    setCurrentView('form');
  };

  const handleBack = () => {
    setCurrentView('calendar');
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'calendar' ? (
        <BookingCalendar onBookingClick={handleBookingClick} />
      ) : (
        selectedBooking && (
          <BookingForm
            selectedDate={selectedBooking.date}
            selectedTime={selectedBooking.time}
            onBack={handleBack}
          />
        )
      )}
    </div>
  );
};

export default Index;
