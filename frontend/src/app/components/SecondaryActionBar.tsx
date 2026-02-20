import { ArrowLeftOutlined } from "@ant-design/icons";

interface SecondaryActionBarProps {
  onBackClick: () => void;
  backText?: string;
}

export function SecondaryActionBar({ 
  onBackClick, 
  backText = "Back to Dashboard" 
}: SecondaryActionBarProps) {
  return (
    <div 
      className="sticky z-40 bg-white border-b border-[#E5E7EB]" 
      style={{ 
        top: 'calc(56px + 32px + 1px)', // logo height + py-4*2 + border
        height: '48px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="h-full flex items-center" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <button
          onClick={onBackClick}
          className="flex items-center text-[#306e9a] hover:bg-[#306e9a]/[0.09] transition-all duration-150 px-3 py-2 rounded-md"
          type="button"
          style={{ marginLeft: '-12px' }}
        >
          <ArrowLeftOutlined style={{ fontSize: '12px' }} />
          <span className="text-sm font-medium" style={{ marginLeft: '8px' }}>
            {backText}
          </span>
        </button>
      </div>
    </div>
  );
}