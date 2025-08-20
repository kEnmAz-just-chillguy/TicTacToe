import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
<div className="select-none">
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-center justify-center">
      
      {/* One Player */}
      <div className="bg-blue-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
        <Link to="/one-player" className="text-center group">
          <div className="flex flex-col items-center">
            <img
              className="w-14 sm:w-20 md:w-24 transition-transform duration-300 group-hover:scale-110"
              src="/robot.png"
              alt="One player"
            />
          </div>
        </Link>
        <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">
          One Player
        </p>
      </div>

      {/* Two Players */}
      <div className="bg-red-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
        <Link to="/two-players" className="group">
          <div className="flex flex-col items-center">
            <img
              className="w-14 sm:w-20 md:w-24 transition-transform duration-300 group-hover:scale-110"
              src="/twoPlayers.png"
              alt="Two player"
            />
          </div>
        </Link>
        <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">
          Two Players
        </p>
      </div>

    </div>
  </div>
</div>

  )
}

export default HomePage
