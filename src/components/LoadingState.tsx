import React from 'react'

export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#B3D9FE]/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-md w-full border border-[#B3D9FE]/30">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-[#FF4000] border-t-transparent" />
          <p className="text-[#03101D] dark:text-white font-medium text-sm sm:text-base">
            Loading transaction details...
          </p>
        </div>
      </div>
    </div>
  )
}