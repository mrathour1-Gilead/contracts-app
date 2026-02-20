import gileadLogo from "/png/logo.png";

interface GileadHeaderProps {
  userName?: string;
  currentTime?: string;
}

export function GileadHeader({
  userName = "Abhishek",
  currentTime = "10:26 AM",
}: GileadHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-2 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="h-16"
              src={gileadLogo}
              alt="Gilead Logo"
            />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Global Supply Chain - SSSM Contracts Summary
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {userName}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {currentTime}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#306e9a] text-white flex items-center justify-center text-sm font-bold shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}