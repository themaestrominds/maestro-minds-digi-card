import ConsultantProfile from '@/components/ConsultantProfile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaestroProfile } from '@/store/maestroSlice';
import { RootState } from '@/store';
import { AppLoader } from '@/components/AppLoader';

const Index = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state: RootState) => state.maestro);

  useEffect(() => {
    // Extract ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const maestroId = urlParams.get('id');
    
    if (maestroId) {
      dispatch(fetchMaestroProfile(maestroId) as any);
    }
  }, [dispatch]);

  if (loading) return <AppLoader />;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;
  if (profile.length === 0) {
    return <div>No profile information available</div>;
  }
  return <ConsultantProfile profile={profile[0]} />;
};

export default Index;
