export default function HeaderActions({ desktopActions, mobileActions }: any) {
  return (
    <>
      <div className="flex gap-3 max-lg:hidden">{desktopActions}</div>
      {mobileActions && mobileActions}
    </>
  );
}
