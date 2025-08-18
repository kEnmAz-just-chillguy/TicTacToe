import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
<div class=" select-none">
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
 <div className='flex flex-row gap-32'>
 <div className="bg-blue-600 w-40 h-40 rounded-xl text-center border-4 border-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,1)] transition-all duration-300">
  <Link to="/single-player" className="text-center group">
    <div className="flex flex-col items-center">
      <img
        className="block transition-transform duration-300 group-hover:scale-110"
        src="/robot.png"
        alt="One player"
      />
    </div>
  </Link>
  <p className="font-bold text-2xl text-yellow-300 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)] select-none">
    One Player
  </p>
</div>

<div className="bg-red-600 w-40 h-40 rounded-xl text-center border-4 border-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,1)] transition-all duration-300">
  <Link to="/two-players" className="group">
    <div className="flex flex-col items-center">
      <img
        className="block transition-transform duration-300 group-hover:scale-110"
        src="/twoPlayers.png"
        alt="Two player"
      />
    </div>
  </Link>
  <p className="font-bold text-2xl text-yellow-300 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)] select-none">
    Two Players
  </p>
</div>


 </div>
  </div>
</div>
  )
}

export default HomePage
