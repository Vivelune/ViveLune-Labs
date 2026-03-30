import React from 'react';

/**
 * AcademicUserCard - Recreates the 'featurecard.png' aesthetic
 * Width: 250px
 * Context: ViveLune Academia Learner Profile
 */
const AcademicUserCard = ({ 
  name = "Jane Smith", 
  email = "j.smith@vivelune.edu", 
  tags = ["Enrolled", "Bio 101"] 
}) => {
  return (
    <div className="w-[250px] bg-[#0A0A0A] p-4 rounded-xl border border-[#1F1F1F] shadow-2xl font-sans">
      {/* Header Section */}
      <div className="flex flex-col mb-4">
        <h3 className="text-white text-lg font-semibold tracking-tight">
          {name}
        </h3>
        <p className="text-gray-400 text-sm font-medium opacity-80">
          {email}
        </p>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div 
            key={index}
            className="px-3 py-1 rounded-md bg-[#161616] border border-[#262626]"
          >
            <span className="text-[#A1A1AA] text-[11px] font-medium whitespace-nowrap">
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicUserCard;