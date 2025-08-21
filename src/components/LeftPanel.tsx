import { Star, Award, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MaestroProfile } from '@/types/maestro';
import consultantPhoto from '@/assets/consultant-photo.jpg';

interface LeftPanelProps {
  profile: MaestroProfile;
}

const LeftPanel = ({ profile }: LeftPanelProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`}
      />
    ));
  };

  return (
    <div className="w-80 min-h-screen bg-card/50 border-r border-border p-6 overflow-y-auto">
      {/* Profile Card */}
      <Card className="card-elevated mb-6">
        <div className="p-6 text-center">
          <div className="relative mb-4">
            <img
              src={profile.profile_image_url}
              alt="Business Consultant"
              className="w-40 h-40 mx-auto rounded-full object-cover shadow-[var(--shadow-medium)]"
            />
            <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2">
              <div className="w-3 h-3 bg-card rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-heading mb-2">{profile.name}</h1>
          <p className="text mb-4">{profile.company_name}</p>
          
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Available for new clients
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {renderStars(5)}
            <span className="text-sm font-medium ml-1">4.9/5</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-success" />
              <span>IRCC Certified</span>
            </div>
            <span>Experience: {profile.experience} years</span>
          </div>
        </div>
      </Card>

      {/* Bio Section */}
      <Card className="card-soft mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-heading mb-4">About</h2>
          <p className="text-body text-sm leading-relaxed mb-4">
            {profile.about}
          </p>
          
        </div>
      </Card>

      {/* Stats 
      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="text-center bg-primary/5 rounded-lg p-3">
          <div className="text-xl font-bold text-primary">200+</div>
          <div className="text-xs text-muted">Companies Helped</div>
        </div>
        <div className="text-center bg-primary/5 rounded-lg p-3">
          <div className="text-xl font-bold text-primary">$50M+</div>
          <div className="text-xs text-muted">Revenue Generated</div>
        </div>
        <div className="text-center bg-primary/5 rounded-lg p-3">
          <div className="text-xl font-bold text-primary">10+</div>
          <div className="text-xs text-muted">Years Experience</div>
        </div>
      </div>*/}

      {/* Contact Info */}
      <Card className="card-soft">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-heading mb-4">Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{profile.business_address}</span>
            </div>
          </div>
        </div>
      </Card>
      <p className="text-center font-bold text-sm mt-4">Powered by Immigos</p>
    </div>
  );
};

export default LeftPanel;