import { Therapist, BookingDay } from '@/types/booking';

export const therapists: Therapist[] = [
  {
    id: '1',
    name: 'คุณน้อย',
    specialties: ['นวดแผนไทย', 'นวดน้ำมันหอมระเหย'],
  },
  {
    id: '2', 
    name: 'คุณมาลี',
    specialties: ['นวดฟุตรีเฟล็กซ์', 'นวดหิน'],
  },
  {
    id: '3',
    name: 'คุณสุดา',
    specialties: ['นวดแผนไทย', 'นวดผ่อนคลาย'],
  },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00'
];

export const generateMockBookings = (): BookingDay[] => {
  const bookings: BookingDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < 4; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = date.toLocaleDateString('th-TH', { weekday: 'long' });
    const dateString = date.toISOString().split('T')[0];
    
    const slots = timeSlots.map(time => {
      return {
        time,
        available: true,
        therapistId: undefined,
        therapistName: undefined,
      };
    });
    
    bookings.push({
      date: dateString,
      dayName,
      timeSlots: slots,
    });
  }
  
  return bookings;
};