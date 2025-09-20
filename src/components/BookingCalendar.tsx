import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar } from 'lucide-react';
import { BookingDay, TimeSlot } from '@/types/booking';
import { generateMockBookings } from '@/data/mockData';

interface BookingCalendarProps {
  onBookingClick: (date: string, timeSlot: TimeSlot) => void;
}

const BookingCalendar = ({ onBookingClick }: BookingCalendarProps) => {
  const [bookings] = useState<BookingDay[]>(generateMockBookings());

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">จองการนวด</h1>
        <p className="text-muted-foreground text-lg">เลือกวันและเวลาที่สะดวกสำหรับคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookings.map((booking) => (
          <Card key={booking.date} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{booking.dayName}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatThaiDate(booking.date)}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-2">
              {booking.timeSlots.map((slot) => (
                <div
                  key={slot.time}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    slot.available 
                      ? 'bg-available border-available-foreground/20 hover:bg-available/80' 
                      : 'bg-booked border-booked-foreground/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{slot.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {slot.available ? (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onBookingClick(booking.date, slot)}
                        className="text-xs px-3 py-1"
                      >
                        จอง
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <Badge variant="secondary" className="text-xs">
                          {slot.therapistName}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;