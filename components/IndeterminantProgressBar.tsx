import React from 'react'

const IndeterminateProgressBar = () => {
  return (
    <div>
      <style>
        {`
          @keyframes move {
            0% {
              left: -33%;
            }
            100% {
              left: 100%;
            }
          }

          .animate-move {
            animation: move 1.5s ease-in-out infinite;
          }
        `}
      </style>
      <div className="w-full h-2 bg-secondary rounded-sm overflow-hidden relative animate-fadeIn">
        <div className="h-full w-1/3 bg-primary absolute animate-move"></div>
      </div>
    </div>
  )
}

export default IndeterminateProgressBar
