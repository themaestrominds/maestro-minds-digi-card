import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceGrid from './ServiceGrid';
import BookingCalendar from './BookingCalendar';
import ReviewsSection from './ReviewsSection';
import ChatButton from './ChatButton';
import { MaestroProfile } from '@/types/maestro';

interface Service {
  
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  popular?: boolean;
}

interface RightPanelProps {
  profile: MaestroProfile;
}

const RightPanel = ({ profile }: RightPanelProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = profile.services.map((service) => ({
    id: service.id,
    title: service.name,
    description: service.name,
    duration: service.duration, // Assuming a default duration, can be dynamic
    price: service.amount,
    popular: false, // Assuming no popularity flag, can be dynamic
  }));

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-background to-accent/20 relative">
      <div className="p-6 overflow-y-auto">
        {!selectedService ? (
          <>
            {/* Services Section */}
            <div className="mb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-heading mb-4">Consulting Services</h2>
                <p className="text-lg text-body">
                  Choose from my range of professional consulting services designed to accelerate your business growth.
                </p>
              </div>
              <ServiceGrid services={services} onServiceSelect={handleServiceSelect} />
            </div>

            {/* Reviews Section */}
            <ReviewsSection />
          </>
        ) : (
          <BookingCalendar service={selectedService} onBack={handleBackToServices} />
        )}
      </div>
      
      <ChatButton />
    </div>
  );
};

export default RightPanel;