import { useState } from 'react';
import BookingCalendar from '@/components/BookingCalendar';
import BookingForm from '@/components/BookingForm';
import { TimeSlot, BookingDay } from '@/types/booking';
import { generateMockBookings } from '@/data/mockData';

const Index = () => {
  const [currentView, setCurrentView] = useState<'calendar' | 'form'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [bookings, setBookings] = useState<BookingDay[]>(generateMockBookings());

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

  const handleBookingComplete = (date: string, time: string, therapistName: string) => {
    // ฟังก์ชันนี้จะถูกเรียกเมื่อจองสำเร็จ
    console.log(`Booking completed: ${date} ${time} with ${therapistName}`);
  };

  const handleBookingSuccess = (date: string, time: string, therapistName: string) => {
    // ฟังก์ชันนี้จะถูกเรียกเมื่อจองสำเร็จและส่งข้อมูลไปยัง BookingCalendar
    console.log(`Booking success: ${date} ${time} with ${therapistName}`);
    
    // อัปเดตสถานะการจองใน state
    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (booking.date === date) {
          return {
            ...booking,
            timeSlots: booking.timeSlots.map(slot => {
              if (slot.time === time) {
                console.log('Updating slot:', slot);
                return {
                  ...slot,
                  available: false,
                  therapistName: therapistName,
                  therapistId: 'booked'
                };
              }
              return slot;
            })
          };
        }
        return booking;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'calendar' ? (
        <BookingCalendar 
          bookings={bookings}
          onBookingClick={handleBookingClick}
          onBookingComplete={handleBookingComplete}
        />
      ) : (
        selectedBooking && (
          <BookingForm
            selectedDate={selectedBooking.date}
            selectedTime={selectedBooking.time}
            onBack={handleBack}
            onBookingSuccess={handleBookingSuccess}
          />
        )
      )}
    </div>
  );
};

export default Index;
