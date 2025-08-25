import React, { useEffect, useState } from 'react'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"
import ButtonUI from '../Components/UI/ButtonUI'

function OnePlayerPage() {
  const [level, setLevel] = useState("")
  const [board, setBoard] = useState(Array(9).fill(""))
  const [isTurn, setIsTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState("")


  useEffect(() => {
    if (level === "unbeatable" && board.every(cell => cell === "")) {
      setIsTurn(false); 
      setTimeout(botMove, 300); 
    }
  }, [level]);
  

  const toggle = (index) => {
    if (board[index] !== "" || !isTurn || gameOver) return
    const newBoard = [...board]
    newBoard[index] = "x"
    const win = checkWinner(newBoard)
    if (win) {
      setGameOver(true)
      setBoard(newBoard)
      setWinner("x")
      return
    }
  
    if (getEmptyIndexes(newBoard).length === 0) {
      setGameOver(true)
      setBoard(newBoard)
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
  
        const win = checkWinner(next);
        if (win) {
          setGameOver(true);
          setWinner("o");
        } else if (getEmptyIndexes(next).length === 0) {
    
          setGameOver(true);
          setWinner("draw");
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-center justify-center ">
              <div className="bg-green-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
                <button onClick={() => setLevel("easy")} className="text-center group">
                  <div className="flex flex-col items-center gap-3">
                    <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">🤓</div>
                    <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">Easy</p>
                  </div>
                </button>
              </div>
              <div className="bg-blue-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
                <button onClick={() => setLevel("normal")} className="text-center group">
                  <div className="flex flex-col items-center gap-3">
                    <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">😎</div>
                    <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">Normal</p>
                  </div>
                </button>
              </div>
              <div className="bg-red-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
                <button onClick={() => setLevel("hard")} className="group">
                  <div className="flex flex-col items-center gap-3">
                    <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">🧠</div>
                    <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">Hard</p>
                  </div>
                </button>
              </div>
              <div className="bg-red-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300 animate-[boxshift_6s_linear_infinite]">
  <button onClick={() => setLevel('unbeatable')} className="group">
    <div className="flex flex-col items-center gap-3">
      <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">☠</div>
      <p className="font-bold text-lg sm:text-2xl md:text-3xl drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none animate-[textshift_6s_linear_infinite]">
        Unbeatable
      </p>
    </div>
  </button>
</div>

<style jsx>{`
  @keyframes boxshift {
    0%   { background-color: rgb(220,38,38); border-color: rgb(234,179,8); }   /* красный + жёлтый */
    25%  { background-color: rgb(34,197,94); border-color: rgb(59,130,246); } /* зелёный + синий */
    50%  { background-color: rgb(59,130,246); border-color: rgb(236,72,153); }/* синий + розовый */
    75%  { background-color: rgb(236,72,153); border-color: rgb(250,204,21); }/* розовый + жёлтый */
    100% { background-color: rgb(220,38,38); border-color: rgb(234,179,8); }  /* обратно красный */
  }

  @keyframes textshift {
    0%   { color: rgb(253,224,71); }  /* жёлтый */
    25%  { color: rgb(34,197,94); }  /* зелёный */
    50%  { color: rgb(59,130,246); } /* синий */
    75%  { color: rgb(236,72,153); } /* розовый */
    100% { color: rgb(253,224,71); } /* снова жёлтый */
  }
`}</style>


            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center px-4 w-full">
          <div className="flex flex-col items-center gap-5 mt-6">
            <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl text-center min-h-[2.5rem] sm:min-h-[3rem]"> {winner === "draw" ? "Draw" : winner ? `${winner.toUpperCase()} has won the game` : ""}</p>
          </div>
          <div className="flex justify-center mt-6 mb-6 w-full">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {board.map((value, index) => (
                <div key={index} onClick={() => toggle(index)} className="select-none rounded-xl border-2 border-black bg-[#1f3540] w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] flex items-center justify-center">
                  {value === "x" && <img src={cross_icon} className="w-[40px] sm:w-[55px] md:w-[75px] lg:w-[95px]" />}
                  {value === "o" && <img src={circle_icon} className="w-[40px] sm:w-[55px] md:w-[75px] lg:w-[95px]" />}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 w-full max-w-[600px] px-4'>
          <button
        onClick={() => window.history.back()}
        className="bg-[hsl(49,98%,60%)] text-center w-40 sm:w-48 h-12 sm:h-14 mt-2 sm:mt-5 
                   rounded-2xl relative text-white text-lg sm:text-xl font-semibold group overflow-hidden"
        type="button"
      >
        <div className="bg-red-600 rounded-xl h-10 sm:h-12 w-1/4 flex items-center justify-center 
                        absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="22px" width="22px">
            <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
            <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
          </svg>
        </div>
        <p
          className="translate-x-2 font-semibold text-lg sm:text-xl"
          style={{ textShadow: "2px 2px rgb(116,116,116)" }}
        >
          Go Back
        </p>
      </button>
              <ButtonUI onCustomClick={() => {
                setBoard(Array(9).fill(""))
                setWinner("")
                setIsTurn(true)
                setGameOver(false)

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
