import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"
import ButtonUI from '../Components/ButtonUI'
import lets from "/let'sk.m4a"
import win  from  "/winn.mp3"
import Draw from "/Draw.mp3"
import ClickSound from "/click.mp3"
import confetti from "canvas-confetti";
import LoadingUI from '../Components/UI/LoadingUI'


function TwoPlayersPage() {
  const clickSound = useRef(new Audio(ClickSound))
  const audioRef = useRef(new Audio(lets));
  const audioRefDraw = useRef(new Audio(Draw));
  const audioRefWin = useRef(new Audio(win));
  const [data, setData] = useState(Array(9).fill("")); 
  const [count, setCount] = useState(0);        
  const [winner,setWinner] = useState("")       
  const [lock, setLock] = useState(false);     
  const [loading ,setLoading] = useState(true)


  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
useEffect(() => {
setTimeout(() => {
  setLoading(false)
}, 5000);
},[])



  const confettiWin = () => {
    confetti({
      particleCount: 400, 
      spread: 400, 
      origin: { y: 0.4 ,x: 0.15 } 
    });
    confetti({
      particleCount: 400, 
      spread: 400, 
      origin: { y: 0.4 ,x: 0.85 } 
    });
  }

  const winningEffect = () => {
    confettiWin()
    intervalRef.current = setInterval(() => {
      confettiWin()
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current)
    }, 4000);      
  }

  const stopWinningEffect = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  }

  const toggle = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "x" : "o";
    setData(newData);

    setCount(count + 1);
    setTimeout(() => {checkWin(newData); }, 50);
    clickSound.current.currentTime = 0
    clickSound.current.play()
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);


    stopWinningEffect();

    audioRefDraw.current.pause()
    audioRefWin.current.pause()
    audioRefDraw.current.currentTime = 0
    audioRefWin.current.currentTime = 0
    audioRef.current.play();
    setWinner('')
  };
  
  const checkWin = (board) => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
  
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        won(board[a]);
        return;
      }
    }
  
    if (!board.includes("")) {
      audioRefDraw.current.play()
      setLock(true);
      setWinner("draw")
    }
  };

  const won = (winner) => {
    if(winner === "x"){
      audioRefWin.current.play()
      winningEffect()
    } else {
      audioRefWin.current.play()
      winningEffect()
    }
    setLock(true);
    setWinner(winner)
  };

  const leavePage = () => {
    window.history.back()
    audioRefDraw.current.pause()
    audioRefWin.current.pause()
    audioRefDraw.current.currentTime = 0
    audioRefWin.current.currentTime = 0


    stopWinningEffect();
  }

  return (
<>
{loading ? (
       <div className='flex justify-center items-center mt-50'>
         <LoadingUI />
       </div>
      ) : (
        <div className="flex flex-col items-center px-4">
          <div className="flex flex-col items-center gap-5 mt-6">
            <p className="text-white font-bold text-2xl sm:text-3xl text-center min-h-[2.5rem] sm:min-h-[3rem]">
              {winner === "draw"
                ? "It's a draw"
                : winner
                ? `Player ${winner} has won the game`
                : ""}
            </p>
          </div>

          <div className="flex justify-center mt-6 mb-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {data.map((value, index) => (
                <div
                  key={index}
                  onClick={() => toggle(index)}
                  className="select-none rounded-xl border-2 border-black bg-[#1f3540] w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] flex items-center justify-center"
                >
                  {value === "x" && (
                    <img
                      src={cross_icon}
                      className="w-[50px] sm:w-[60px] md:w-[80px] lg:w-[100px]"
                    />
                  )}
                  {value === "o" && (
                    <img
                      src={circle_icon}
                      className="w-[50px] sm:w-[60px] md:w-[80px] lg:w-[100px]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between w-[600px] px-6">
            <button
              onClick={leavePage}
              className="bg-[hsl(49,98%,60%)] text-center w-48 h-14 mt-5 rounded-2xl relative text-white text-xl font-semibold group overflow-hidden"
              type="button"
            >
              <div className="bg-red-600 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                  <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                  <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
                </svg>
              </div>
              <p
                className="translate-x-2 font-semibold text-xl"
                style={{ textShadow: "2px 2px rgb(116,116,116)" }}
              >
                Go Back
              </p>
            </button>

            <ButtonUI onCustomClick={resetGame} />
          </div>
        </div>
      )}
</>
  )
}

export default TwoPlayersPage
