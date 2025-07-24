import { useRef, useState } from 'react'
import './App.css'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"
import ButtonUI from './Components/ButtonUI'
import lets from "/let'sk.m4a"
import blya from "/бляя.mp3"
import Blya from "/БЛЯ.mp3"
import Ex from "/эх.mp3"

function App() {
  const audioRef = useRef(new Audio(lets));
  const audioRefEx = useRef(new Audio(Ex));
  const audioRefBlyaa = useRef(new Audio(Blya));
  const audioRefBlya = useRef(new Audio(blya));
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
      audioRefEx.current.play()
      setLock(true);
    setWinner("draw")
    }
  };
  const won = (winner) => {
    if(winner === "x"){
      audioRefBlya.current.play()
    }else {
      audioRefBlyaa.current.play()
    }
    setLock(true);
    setWinner(winner)
  };
  return (
<div className='flex flex-col items-center px-4 min-h-screen bg-[#0f1b21]'>
  <div className='flex flex-col items-center gap-5 mt-6'>
    <h1 className='text-white font-extrabold text-3xl sm:text-4xl text-center'>Tic Tac Toe</h1>
    <p className='text-white font-bold text-2xl sm:text-3xl text-center'>
      {winner === 'draw' ? "It's a draw" : winner ? `Player ${winner} has won the game ` : ""}
    </p>
  </div>

  <div className='flex justify-center mt-8 mb-10'>
    <div className='grid grid-cols-3 gap-2 sm:gap-3'>
      {data.map((value, index) => (
        <div
          key={index}
          onClick={() => toggle(index)}
          className='select-none rounded-xl border-2 border-black bg-[#1f3540] w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] flex items-center justify-center'
        >
          {value === "x" && <img src={cross_icon} className='w-[50px] sm:w-[60px] md:w-[80px] lg:w-[100px]' />}
          {value === "o" && <img src={circle_icon} className='w-[50px] sm:w-[60px] md:w-[80px] lg:w-[100px]' />}
        </div>
      ))}
    </div>
  </div>

  <ButtonUI onCustomClick={resetGame} />
</div>

  );
}

export default App;
