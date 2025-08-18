import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  popular?: boolean;
}

interface ServiceGridProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
}

const ServiceGrid = ({ services, onServiceSelect }: ServiceGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="card-elevated hover:scale-[1.02] transition-all duration-300 cursor-pointer relative">
          {service.popular && (
            <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
              Most Popular
            </Badge>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-heading mb-3">{service.title}</h3>
            <p className="text-body mb-4">{service.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                ${service.price}
              </div>
            </div>
            
            <Button 
              className="w-full btn-primary"
              onClick={() => onServiceSelect(service)}
            >
              Book This Service
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ServiceGrid;