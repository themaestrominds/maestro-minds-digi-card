import { useState } from 'react';
import { Calendar, Clock, ArrowLeft, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, addDays, startOfToday } from 'date-fns';

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  popular?: boolean;
}

interface BookingCalendarProps {
  service: Service;
  onBack: () => void;
}

const BookingCalendar = ({ service, onBack }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Generate next 14 days
  const today = startOfToday();
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  // Generate time slots (9 AM to 6 PM, every 30 minutes)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break; // Stop at 5:30 PM
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(2024, 0, 1, hour, minute).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, display: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      if (!userDetails.name || !userDetails.email || !userDetails.phone) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Handle booking logic here
      alert(
        `Booking confirmed for ${service.title}\n` +
        `Date: ${format(selectedDate, 'PPP')}\n` +
        `Time: ${timeSlots.find(slot => slot.value === selectedTime)?.display}\n` +
        `Name: ${userDetails.name}\n` +
        `Email: ${userDetails.email}\n` +
        `Phone: ${userDetails.phone}`
      );
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
        
        <Card className="card-soft mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-heading mb-2">{service.title}</h2>
                <p className="text-body mb-4">{service.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    ${service.price}
                  </div>
                </div>
              </div>
              {service.popular && (
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Date Selection */}
        <Card className="card-elevated">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-heading mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Date
            </h3>
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {availableDates.map((date) => (
                <Button
                  key={date.toISOString()}
                  variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                  className="justify-start p-3 h-auto"
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-left">
                    <div className="font-medium">{format(date, 'EEE')}</div>
                    <div className="text-sm">{format(date, 'MMM d')}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Time Selection */}
        <Card className="card-elevated">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-heading mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Select Time
              {selectedDate && (
                <span className="text-sm font-normal text-muted">
                  for {format(selectedDate, 'MMM d')}
                </span>
              )}
            </h3>
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.value}
                    variant={selectedTime === slot.value ? "default" : "outline"}
                    className="justify-center"
                    onClick={() => setSelectedTime(slot.value)}
                  >
                    {slot.display}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-8">
                Please select a date first
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Booking Confirmation */}
      {selectedDate && selectedTime && (
        <Card className="card-elevated mt-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-heading mb-4">Confirm Booking</h3>
            <div className="bg-primary/5 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted">Service:</span>
                  <div className="font-medium">{service.title}</div>
                </div>
                <div>
                  <span className="text-muted">Duration:</span>
                  <div className="font-medium">{service.duration}</div>
                </div>
                <div>
                  <span className="text-muted">Date:</span>
                  <div className="font-medium">{format(selectedDate, 'PPP')}</div>
                </div>
                <div>
                  <span className="text-muted">Time:</span>
                  <div className="font-medium">
                    {timeSlots.find(slot => slot.value === selectedTime)?.display}
                  </div>
                </div>
              </div>
            </div>

            {/* User Details Form */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium">Your Details</h4>
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                Total: ${service.price}
              </div>
              <Button className="btn-primary" onClick={handleBooking}>
                <Check className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BookingCalendar;