// components/ui/Loader.tsx
import { BounceLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background flex justify-center items-center z-50">
      <BounceLoader color="#fff" size={100} />
    </div>
  );
};

export default Loader;
