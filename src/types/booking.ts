export interface Therapist {
  id: string;
  name: string;
  specialties: string[];
  avatar?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  therapistId?: string;
  therapistName?: string;
}

export interface BookingDay {
  date: string;
  dayName: string;
  timeSlots: TimeSlot[];
}

export interface BookingData {
  date: string;
  time: string;
  therapistId: string;
  therapistName: string;
  customerName?: string;
  customerPhone?: string;
}