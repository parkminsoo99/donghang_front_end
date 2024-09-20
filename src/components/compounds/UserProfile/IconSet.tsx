import { DeleteIcon } from '@/components/atomics/Icon/delete';
import { Share } from '@/components/atomics/Icon';
import { WatchIcon } from '@/components/atomics/Icon';
import { WatchVideoIconWithModal } from './watchVideo/watchVideo';
const MobileIconSize = 15;

export const IconSet = () => {
    return (
      <>
        <Share mobilesize={MobileIconSize} size={24} />
        <WatchVideoIconWithModal mobilesize={MobileIconSize} size={27} />
        <DeleteIcon mobilesize={MobileIconSize} size={26} />
      </>
    );
  };