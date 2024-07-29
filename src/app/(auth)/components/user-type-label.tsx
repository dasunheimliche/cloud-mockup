export default function UserTypeLabel({ userType }: { userType: string }) {
  return (
    <div className="absolute h-4 font-semibold text-[0.90rem] top-0 left-0 ml-7 mt-5 text-slate-800 uppercase flex justify-start items-center">
      {userType}
    </div>
  );
}
