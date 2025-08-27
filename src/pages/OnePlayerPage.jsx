import React, { useEffect, useRef, useState } from 'react'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"
import ButtonUI from '../Components/UI/ButtonUI'
import ClickSound from "/click.mp3"
import lets from "/let'sk.m4a"
import win  from  "/winn.mp3"
import botwins  from  "/botwins.mp3"
import Draw from "/Draw.mp3"
import confetti from "canvas-confetti";



function OnePlayerPage() {
  const audioRef = useRef(new Audio(lets));
  const clickSound = useRef(new Audio(ClickSound))
  const audioRefWin = useRef(new Audio(win));
  const audioRefBotWin = useRef(new Audio(botwins));
  const audioRefDraw = useRef(new Audio(Draw));
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [level, setLevel] = useState("")
  const [board, setBoard] = useState(Array(9).fill(""))
  const [isTurn, setIsTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState("")


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


  useEffect(() => {
    if (level === "unbeatable" && board.every(cell => cell === "")) {
      setIsTurn(false); 
      setTimeout(botMove, 300); 
    }
  }, [level]);
  

  const toggle = (index) => {
    if (board[index] !== "" || !isTurn || gameOver) return
    const newBoard = [...board]
    clickSound.current.currentTime = 0
    clickSound.current.play()
    newBoard[index] = "x"
    const win = checkWinner(newBoard)
    if (win) {
      setGameOver(true)
      setBoard(newBoard)
      setWinner("x")
      audioRefWin.current.play()
      winningEffect()
      return
    }
  
    if (getEmptyIndexes(newBoard).length === 0) {
      setGameOver(true)
      setBoard(newBoard)
      audioRefDraw.current.play()
      setWinner("draw")
      return
    }
  
    setBoard(newBoard)
    setIsTurn(false)
    setTimeout(botMove, 500)
  }
  
  const botMove = () => {
    if (gameOver) return;
  
    setTimeout(() => {
      setBoard((prev) => {
        const empties = getEmptyIndexes(prev);
        if (empties.length === 0) return prev;
  
        let moveIndex;
  
        if (level === "easy") {
    
          moveIndex = empties[Math.floor(Math.random() * empties.length)];
        } else if (level === "normal") {
  
          moveIndex =
            Math.random() < 0.5
              ? empties[Math.floor(Math.random() * empties.length)]
              : smartMoveIndex(prev, "o", "x");
        } else if (level === "hard") {
    
          moveIndex = bestMoveIndex(prev, "o", "x");
        } else if (level === "unbeatable") {
          moveIndex = bestMoveIndex(prev, "o", "x");
        } 
        else {
          moveIndex = empties[Math.floor(Math.random() * empties.length)];
        }
  
        const next = [...prev];
        next[moveIndex] = "o";
        clickSound.current.currentTime = 0
        clickSound.current.play()
  
        const win = checkWinner(next);
        if (win) {
          setGameOver(true);
          setWinner("o");
          audioRefBotWin.current.play()
        } else if (getEmptyIndexes(next).length === 0) {
    
          setGameOver(true);
          setWinner("draw");
          audioRefDraw.current.play()
        }
  
        return next;
      });
  

      setIsTurn(true);
    }, 300);
  };
  

  const checkWinner = (board) => {
    const winLines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
    for (let [a,b,c] of winLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

 
const getEmptyIndexes = (b) =>
  b.map((v, i) => (v === "" ? i : null)).filter((i) => i !== null);

const smartMoveIndex = (board, me = "o", opp = "x") => {
  const empties = getEmptyIndexes(board);


  for (const i of empties) {
    const test = [...board];
    test[i] = me;
    if (checkWinner(test) === me) return i;
  }

 
  for (const i of empties) {
    const test = [...board];
    test[i] = opp;
    if (checkWinner(test) === opp) return i;
  }


  if (board[4] === "") return 4;


  const corners = [0, 2, 6, 8].filter((i) => board[i] === "");
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];


  return empties[Math.floor(Math.random() * empties.length)];
};

const minimax = (board, depth, isMaximizing, me = "o", opp = "x") => {
  const winner = checkWinner(board);

  
  if (winner === me) return 10 - depth;  
  if (winner === opp) return depth - 10; 
  if (getEmptyIndexes(board).length === 0) return 0; 

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const i of getEmptyIndexes(board)) {
      const test = [...board];
      test[i] = me;
      const score = minimax(test, depth + 1, false, me, opp);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const i of getEmptyIndexes(board)) {
      const test = [...board];
      test[i] = opp;
      const score = minimax(test, depth + 1, true, me, opp);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

const bestMoveIndex = (board, me = "o", opp = "x") => {
  let bestScore = -Infinity;
  let move;
  for (const i of getEmptyIndexes(board)) {
    const test = [...board];
    test[i] = me;
    const score = minimax(test, 0, false, me, opp);

   
    if (score === 10) return i;

    if (score > bestScore) {
      bestScore = score;
      move = i;
    }
  }
  return move;
};


  return (
    <>
    {!level ? (
      <div className="select-none">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row gap-4 xs:gap-6 sm:gap-16 items-center justify-center">
            {/* Easy */}
            <div className="bg-green-600 
                            w-28 h-28 xs:w-32 xs:h-32 
                            sm:w-40 sm:h-40 md:w-48 md:h-48 
                            rounded-xl text-center border-2 sm:border-4 border-yellow-400 
                            shadow-[0_0_10px_rgba(255,255,0,0.8)] 
                            hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] 
                            transition-all duration-300">
              <button onClick={() => setLevel("easy")} className="text-center group w-full h-full">
                <div className="flex flex-col items-center gap-2 xs:gap-3">
                  <div className="mt-2 xs:mt-3 
                                  w-10 xs:w-14 sm:w-20 md:w-24 
                                  text-4xl xs:text-5xl sm:text-6xl md:text-7xl 
                                  transition-transform duration-300 group-hover:scale-110">🤓</div>
                  <p className="font-bold text-base xs:text-lg sm:text-2xl md:text-3xl 
                                text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">Easy</p>
                </div>
              </button>
            </div>
  
            {/* Normal */}
            <div className="bg-blue-600 
                            w-28 h-28 xs:w-32 xs:h-32 
                            sm:w-40 sm:h-40 md:w-48 md:h-48 
                            rounded-xl text-center border-2 sm:border-4 border-yellow-400 
                            shadow-[0_0_10px_rgba(255,255,0,0.8)] 
                            hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] 
                            transition-all duration-300">
              <button onClick={() => setLevel("normal")} className="text-center group w-full h-full">
                <div className="flex flex-col items-center gap-2 xs:gap-3">
                  <div className="mt-2 xs:mt-3 
                                  w-10 xs:w-14 sm:w-20 md:w-24 
                                  text-4xl xs:text-5xl sm:text-6xl md:text-7xl 
                                  transition-transform duration-300 group-hover:scale-110">😎</div>
                  <p className="font-bold text-base xs:text-lg sm:text-2xl md:text-3xl 
                                text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">Normal</p>
                </div>
              </button>
            </div>
  
            {/* Hard */}
            <div className="bg-red-600 
                            w-28 h-28 xs:w-32 xs:h-32 
                            sm:w-40 sm:h-40 md:w-48 md:h-48 
                            rounded-xl text-center border-2 sm:border-4 border-yellow-400 
                            shadow-[0_0_10px_rgba(255,255,0,0.8)] 
                            hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] 
                            transition-all duration-300">
              <button onClick={() => setLevel("hard")} className="group w-full h-full">
                <div className="flex flex-col items-center gap-2 xs:gap-3">
                  <div className="mt-2 xs:mt-3 
                                  w-10 xs:w-14 sm:w-20 md:w-24 
                                  text-4xl xs:text-5xl sm:text-6xl md:text-7xl 
                                  transition-transform duration-300 group-hover:scale-110">🧠</div>
                  <p className="font-bold text-base xs:text-lg sm:text-2xl md:text-3xl 
                                text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">Hard</p>
                </div>
              </button>
            </div>
  
            {/* Unbeatable */}
            <div className="bg-red-600 
                            w-28 h-28 xs:w-32 xs:h-32 
                            sm:w-40 sm:h-40 md:w-48 md:h-48 
                            rounded-xl text-center border-2 sm:border-4 border-yellow-400 
                            shadow-[0_0_10px_rgba(255,255,0,0.8)] 
                            hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] 
                            transition-all duration-300 animate-[boxshift_6s_linear_infinite]">
              <button onClick={() => setLevel('unbeatable')} className="group w-full h-full">
                <div className="flex flex-col items-center gap-2 xs:gap-3">
                  <div className="mt-2 xs:mt-3 
                                  w-10 xs:w-14 sm:w-20 md:w-24 
                                  text-4xl xs:text-5xl sm:text-6xl md:text-7xl 
                                  transition-transform duration-300 group-hover:scale-110">☠</div>
                  <p className="font-bold text-base xs:text-lg sm:text-2xl md:text-3xl 
                                drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none 
                                animate-[textshift_6s_linear_infinite]">
                    Unbeatable
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
  
        <style jsx>{`
          @keyframes boxshift {
            0%   { background-color: rgb(220,38,38); border-color: rgb(234,179,8); }
            25%  { background-color: rgb(34,197,94); border-color: rgb(59,130,246); }
            50%  { background-color: rgb(59,130,246); border-color: rgb(236,72,153); }
            75%  { background-color: rgb(236,72,153); border-color: rgb(250,204,21); }
            100% { background-color: rgb(220,38,38); border-color: rgb(234,179,8); }
          }
  
          @keyframes textshift {
            0%   { color: rgb(253,224,71); }
            25%  { color: rgb(34,197,94); }
            50%  { color: rgb(59,130,246); }
            75%  { color: rgb(236,72,153); }
            100% { color: rgb(253,224,71); }
          }
        `}</style>
      </div>
    ) : (
      <div className="flex flex-col items-center px-2 sm:px-4 w-full">
        {/* Заголовок */}
        <div className="flex flex-col items-center gap-3 xs:gap-5 mt-4 sm:mt-6">
          <p className="text-white font-bold 
                        text-lg xs:text-xl sm:text-2xl md:text-3xl 
                        text-center min-h-[2rem] xs:min-h-[2.5rem] sm:min-h-[3rem]">
            {winner === "draw" ? "Draw" : winner ? `${winner.toUpperCase()} has won the game` : ""}
          </p>
        </div>
  
        {/* Игровое поле */}
        <div className="flex justify-center mt-4 sm:mt-6 mb-4 sm:mb-6 w-full">
          <div className="grid grid-cols-3 gap-1 xs:gap-2 sm:gap-3">
            {board.map((value, index) => (
              <div
                key={index}
                onClick={() => toggle(index)}
                className="select-none rounded-xl border-2 border-black bg-[#1f3540] 
                           w-[65px] h-[65px] xs:w-[80px] xs:h-[80px] 
                           sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] 
                           flex items-center justify-center"
              >
                {value === "x" && (
                  <img src={cross_icon} className="w-[30px] xs:w-[40px] sm:w-[55px] md:w-[75px] lg:w-[95px]" />
                )}
                {value === "o" && (
                  <img src={circle_icon} className="w-[30px] xs:w-[40px] sm:w-[55px] md:w-[75px] lg:w-[95px]" />
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-center 
                        gap-3 xs:gap-5 sm:gap-10 w-full max-w-[600px] px-2 sm:px-4">
          {/* Go Back */}
          <button
            onClick={() => {
              window.history.back()
              audioRefDraw.current.pause()
              audioRefWin.current.pause()
              audioRefDraw.current.currentTime = 0
              audioRefWin.current.currentTime = 0
            }}
            className="bg-[hsl(49,98%,60%)] text-center 
                       w-32 h-10 xs:w-36 xs:h-11 
                       sm:w-48 sm:h-14 mt-2 sm:mt-5 
                       rounded-2xl relative text-white 
                       text-base xs:text-lg sm:text-xl font-semibold group overflow-hidden"
            type="button"
          >
            <div className="bg-red-600 rounded-xl h-8 xs:h-9 sm:h-12 w-1/4 flex items-center justify-center 
                            absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" 
                   className="h-[18px] w-[18px] xs:h-[20px] xs:w-[20px] sm:h-[22px] sm:w-[22px]">
                <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
              </svg>
            </div>
            <p className="translate-x-2 font-semibold text-base xs:text-lg sm:text-xl"
               style={{ textShadow: "2px 2px rgb(116,116,116)" }}>
              Go Back
            </p>
          </button>
  
          {/* Restart */}
          <ButtonUI onCustomClick={() => {
            setBoard(Array(9).fill(""))
            setWinner("")
            setIsTurn(true)
            setGameOver(false)
            audioRef.current.play();  
            audioRefDraw.current.pause()
            audioRefWin.current.pause()
            audioRefDraw.current.currentTime = 0
            audioRefWin.current.currentTime = 0
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
            intervalRef.current = null;
            timeoutRef.current = null;
  
            if (level === "unbeatable") {
              setIsTurn(false);
              setTimeout(botMove, 100);
            }
          }}/>
        </div>
      </div>
    )}
  </>
  
  )
}

export default OnePlayerPage
