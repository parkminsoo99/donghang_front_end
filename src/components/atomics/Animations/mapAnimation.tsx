import dynamic from 'next/dynamic';
// const Lottie = dynamic(() => import('react-lottie-player'), { ssr: true });
import Lottie from 'react-lottie-player';
import lottieJson from '/public/animations/mapAnimation.json';

export const MapAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 150, height: 150 }}
    />
  );
};
