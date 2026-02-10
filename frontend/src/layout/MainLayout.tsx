// src/layout/MainLayout.tsx
import Navbar from "./Navbar";
import Notification from "./Notification";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between">
        <div className="px-10 py-6">{children}</div>
      </div>
      <div
        id="gileadLogo"
        aria-label="Gilead logo"
        aria-current="page"
        className="fixed bottom-0 left-0 w-full text-black flex flex-col justify-center items-center pb-5"
      >
        <h1 className="text-gilead-blue font-serif font-semibold mb-1">
          Powered By
        </h1>
        <img
          src="/png/dna_logo.png"
          className="h-[35px]"
          alt="BannerImage"
        />
      </div>
      <Notification />
    </>
  );
}