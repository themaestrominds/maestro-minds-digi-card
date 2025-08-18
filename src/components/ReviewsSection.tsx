import { Star, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

const ReviewsSection = () => {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Exceptional insights that transformed our business strategy. Alex\'s expertise is unmatched.',
      date: '2024-01-15',
      service: 'Business Strategy'
    },
    {
      id: '2',
      name: 'Michael Chen',
      rating: 5,
      comment: 'The marketing review session was incredibly valuable. We saw a 40% increase in leads within 2 months.',
      date: '2024-01-10',
      service: 'Marketing Review'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      rating: 5,
      comment: 'Professional, knowledgeable, and results-driven. Highly recommend for any business challenges.',
      date: '2024-01-08',
      service: 'Financial Planning'
    },
    {
      id: '4',
      name: 'David Park',
      rating: 5,
      comment: 'Outstanding team building workshop. Our productivity increased significantly after the session.',
      date: '2024-01-05',
      service: 'Team Building'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      rating: 5,
      comment: 'Clear, actionable advice that made an immediate impact on our operations.',
      date: '2024-01-03',
      service: 'Business Strategy'
    },
    {
      id: '6',
      name: 'James Wilson',
      rating: 5,
      comment: 'Alex helped us identify key growth opportunities we hadn\'t considered.',
      date: '2024-01-01',
      service: 'Marketing Review'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`}
      />
    ));
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-heading mb-4">Client Reviews</h2>
        <div className="flex items-center gap-2 mb-4">
          {renderStars(5)}
          <span className="text-lg font-medium ml-2">4.9 out of 5</span>
          <span className="text-muted">(127 reviews)</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="card-soft">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                </div>
                <Badge variant="outline">{review.service}</Badge>
              </div>
              
              <p className="text-body mb-4 italic">"{review.comment}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-heading">{review.name}</div>
                    <div className="text-sm text-muted">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;