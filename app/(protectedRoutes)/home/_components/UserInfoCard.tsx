import React from 'react';

// 1. Define the shape of the customer object
interface Customer {
  name?: string;
  email?: string;
  tags?: string[]; // Optional if you want to pass tags via the customer object
}

// 2. Define the Props for the component
interface UserInfoCardRightProps {
  customer: Customer | null | undefined;
  tags?: string[]; // The tags array used in your mapping
  highlight?: boolean;
}

const UserInfoCardRight: React.FC<UserInfoCardRightProps> = ({ 
  customer, 
  tags = [], 
  highlight = false 
}) => {
  // Guard against missing data
  if (!customer) {
    return null;
  }

  // Define glow styling: subtle white border and a soft shadow
  const highlightStyles = highlight
    ? 'border-[#3f3f3f] shadow-[0_0_20px_2px_rgba(255,255,255,0.08)]'
    : 'border-[#1a1a1a] shadow-none';

  return (
    <div className={`
      w-[250px]
      bg-[#0A0A0A]
      p-4
      rounded-xl
      border
      backdrop-blur-lg
      font-sans
      transition-all
      duration-300
      ease-in-out
      ${highlightStyles}
    `}>
      {/* Header Section: Name and Email */}
      <div className="flex flex-col mb-4 text-left">
        <h3 className="text-white text-lg font-semibold tracking-tight">
          {customer.name || 'Unknown User'}
        </h3>
        <p className="text-gray-400 text-xs font-normal opacity-80 whitespace-nowrap overflow-hidden text-ellipsis">
          {customer.email || 'no-email@example.com'}
        </p>
      </div>

      {/* Tags Section: Styled as subtle pills */}
      <div className="flex flex-wrap gap-2.5">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <div 
              key={`${tag}-${index}`}
              className="px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#262626]"
            >
              <span className="text-gray-300 text-[11px] font-medium whitespace-nowrap">
                {tag}
              </span>
            </div>
          ))
        ) : (
          <div className="px-3 py-1 rounded-full bg-[#161616] border border-[#262626]">
            <span className="text-gray-500 text-[11px] font-medium">No Tags</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoCardRight;