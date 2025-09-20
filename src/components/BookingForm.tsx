import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, User, Phone, CheckCircle } from 'lucide-react';
import { TimeSlot, Therapist } from '@/types/booking';
import { therapists } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  selectedDate: string;
  selectedTime: string;
  onBack: () => void;
}

const BookingForm = ({ selectedDate, selectedTime, onBack }: BookingFormProps) => {
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTherapist || !customerName || !customerPhone) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดเลือกหมอนวดและกรอกชื่อ-เบอร์โทรศัพท์",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // จำลองการส่งข้อมูล
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const therapist = therapists.find(t => t.id === selectedTherapist);
    
    toast({
      title: "จองสำเร็จ!",
      description: `การจองของคุณ ${customerName} เวลา ${selectedTime} กับ${therapist?.name} ได้รับการยืนยันแล้ว`,
    });
    
    setIsSubmitting(false);
    onBack(); // กลับไปหน้าแรก
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        กลับ
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">ยืนยันการจอง</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* ข้อมูลที่เลือก */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatThaiDate(selectedDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{selectedTime}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* เลือกหมอนวด */}
            <div>
              <Label className="text-base font-semibold mb-3 block">เลือกหมอนวด</Label>
              <div className="grid grid-cols-1 gap-3">
                {therapists.map((therapist) => (
                  <div
                    key={therapist.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTherapist === therapist.id
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card hover:bg-accent/30'
                    }`}
                    onClick={() => setSelectedTherapist(therapist.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{therapist.name}</div>
                          <div className="flex gap-1 mt-1">
                            {therapist.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {selectedTherapist === therapist.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ข้อมูลลูกค้า */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">ข้อมูลการติดต่อ</Label>
              
              <div>
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  className="mt-1"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  กำลังจอง...
                </div>
              ) : (
                'ยืนยันการจอง'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;