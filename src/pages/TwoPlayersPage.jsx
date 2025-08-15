import React from 'react'
import { useRef, useState } from 'react'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"
import ButtonUI from '../Components/ButtonUI'
import lets from "/let'sk.m4a"
import win  from  "/winn.mp3"
import Draw from "/Draw.mp3"
import confetti from "canvas-confetti";


function TwoPlayersPage() {
    const audioRef = useRef(new Audio(lets));
    const audioRefDraw = useRef(new Audio(Draw));
    const audioRefWin = useRef(new Audio(win));
    const [data, setData] = useState(Array(9).fill("")); 
    const [count, setCount] = useState(0);        
    const [winner,setWinner] = useState("")       
    const [lock, setLock] = useState(false);             
    const toggle = (index) => {
      if (lock || data[index] !== "") return;
    
      const newData = [...data];
      newData[index] = count % 2 === 0 ? "x" : "o";
      setData(newData);
      setCount(count + 1);
      setTimeout(() => {checkWin(newData); }, 50);
    };
    const resetGame = () => {
      setData(Array(9).fill(""));
      setCount(0);
      setLock(false);
      audioRefDraw.current.pause()
      audioRefWin.current.pause()
      audioRefDraw.current.currentTime = 0
      audioRefWin.current.currentTime = 0
      audioRef.current.play();
      setWinner('')
      confetti({
        particleCount: 400, // сколько частиц
        spread: 400, // угол разлета
        origin: { y: 0.3 ,x: 0.1 } // откуда летят
      });
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
      }else {
        audioRefWin.current.play()
      }
      setLock(true);
      setWinner(winner)
    };
  return (
<div className="flex flex-col items-center px-4">
  <div className="flex flex-col items-center gap-5 mt-6">
    <p className="text-white font-bold text-2xl sm:text-3xl text-center min-h-[2.5rem] sm:min-h-[3rem]">
      {winner === 'draw'
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

  <ButtonUI onCustomClick={resetGame} />
</div>

  )
}

export default TwoPlayersPage
