import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { MaestroProfile } from '@/types/maestro';

interface ConsultantProfileProps {
  profile: MaestroProfile;
}

const ConsultantProfile = ({ profile }: ConsultantProfileProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <LeftPanel profile={profile} />
      <RightPanel profile={profile} />
    </div>
  );
};

export default ConsultantProfile;