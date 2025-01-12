import React from 'react'

interface ErrorStateProps {
  error: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#300D1F]/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-md w-full border border-[#300D1F]/20">
        <p className="text-[#FF4000] font-medium text-center">{error}</p>
      </div>
    </div>
  )
}