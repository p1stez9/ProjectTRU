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
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const generateMockBookings = (): BookingDay[] => {
  const bookings: BookingDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = date.toLocaleDateString('th-TH', { weekday: 'long' });
    const dateString = date.toISOString().split('T')[0];
    
    const slots = timeSlots.map(time => {
      // สุ่มสถานะว่างหรือจอง (70% ว่าง)
      const available = Math.random() > 0.3;
      const randomTherapist = therapists[Math.floor(Math.random() * therapists.length)];
      
      return {
        time,
        available,
        therapistId: available ? undefined : randomTherapist.id,
        therapistName: available ? undefined : randomTherapist.name,
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