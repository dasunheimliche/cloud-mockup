import { PiSoundcloudLogoDuotone } from "react-icons/pi";

// import { PiRainbowCloud } from "react-icons/pi";
// import { CiCloudOn } from "react-icons/ci";
// import { PiRainbowCloudThin } from "react-icons/pi";
// import { LiaCloudSolid } from "react-icons/lia";

const Logo: React.FC = () => (
  <div className="flex justify-center mx-auto relative mb-5">
    <div className="relative">
      <img className="w-auto h-7 sm:h-8" src="/imgs/eva-green.png" alt="Logo" />
      <div className="absolute bg-white rounded-full -right-6 opacity-90 -bottom-4 text-xs font-bold text-green-950">
        <PiSoundcloudLogoDuotone className="text-[1.75rem] font-semibold" />
      </div>
    </div>
  </div>
);

export default Logo;
