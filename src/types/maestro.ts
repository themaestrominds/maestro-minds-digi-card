export interface MaestroProfile {
    id: string;
    name: string;
    title: string;
    bio: string;
    expertise: string[];
    rating: number;
    reviews: number;
    imageUrl: string;
    services: Array<{
        id: string;
        name: string;
        description: string;
        price: number;
    }>;
    // Add more fields as per your API response
}

export interface MaestroState {
    profile: MaestroProfile | null;
    loading: boolean;
    error: string | null;
}
