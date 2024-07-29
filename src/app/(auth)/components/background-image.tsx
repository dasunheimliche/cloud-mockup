const BackgroundImage: React.FC = () => (
  <div
    className="hidden bg-cover lg:block lg:w-1/2 relative max-lg:hidden"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1676288176903-a68732722cce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    }}
  >
    <div className="w-full h-full absolute inset-0 bg-green-950 bg-opacity-85 p-20 py-28 text-slate-50 text-3xl leading-10 font-semibold flex justify-center items-start mb-12"></div>
  </div>
);

export default BackgroundImage;
