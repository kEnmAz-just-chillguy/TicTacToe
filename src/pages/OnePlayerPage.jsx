import React from 'react'
import { useState } from 'react'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"

function OnePlayerPage() {
  const [level, setLevel] = useState("");
  const [board,setBoard] = useState(Array(9).fill(""));
  const [isTurn, setIsTurn] = useState(true)
  const [gameOver,setGameOver] = useState(false)

  const toggle = (index) => {
    if (board[index] !== "" || !isTurn || gameOver) return;


       const newBoard = [...board]
         newBoard[index] = "x"
    

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true)
      setBoard(newBoard)
      setTimeout(() =>     alert(winner.toUpperCase() + " wins!"), 50);
      return ;
    }
    setBoard(newBoard)
    setIsTurn(false)
    setTimeout( botMove , 500);
  }
  const botMove = () => {
    if (gameOver) return
    setBoard((prev) => {
      let emptyIndexes = prev
        .map((val, i) => (val === "" ? i : null))
        .filter((v) => v !== null);
  
      if (emptyIndexes.length === 0) return prev;
  
      let randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  
      let newBoard = [...prev];
      newBoard[randomIndex] = "o";
  
      
      const winner = checkWinner(newBoard);
      if (winner) {
        setGameOver(true)
        console.log("Winner is:", winner);
      }
  
      
      return newBoard;
    });
  
    setTimeout(() => setIsTurn(true), 50);
  };
  
  
  const checkWinner = (board) => {
    const winLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    for ( let [a,b,c] of winLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a]
      }
    }
    return null
  }
  
  return (
 <>
{
  !level ? 
  (
    <div className="select-none">
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-center justify-center">
        
      
        <div className="bg-green-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl  text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
          <button onClick={() => setLevel("easy")} className="text-center group">
            <div className="flex flex-col items-center  gap-3">
              <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">
                🤓
              </div>
              <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">
            Easy
          </p>
            </div>
          </button>
        </div>
  
        <div className="bg-blue-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl  text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
          <button onClick={() => setLevel("normal")} className="text-center group">
            <div className="flex flex-col items-center  gap-3">
              <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">
                😎
              </div>
              <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">
            Normal
          </p>
            </div>
          </button>
        </div>
  
        <div className="bg-red-600 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl text-center border-2 sm:border-4 border-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,1)] transition-all duration-300">
          <button onClick={() => setLevel("hard")}  className="group">
            <div className="flex flex-col items-center gap-3">
            <div className="mt-3 w-14 sm:w-20 md:w-24 text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">
            🧠
              </div>
            <p className="font-bold text-lg sm:text-2xl md:text-3xl text-yellow-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] select-none">
            Hard
          </p>
            </div>
          </button>
   
        </div>
  
      </div>
    </div>
  </div>
  ) : 
  (
    
  <div className="flex flex-col items-center px-4 w-full">

  <div className="flex flex-col items-center gap-5 mt-6">
    <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl text-center min-h-[2.5rem] sm:min-h-[3rem]">
      AI has won the game
    </p>
  </div>

 

 {/* {loading  */}
  {/* ?  */}
  {/* <div className='flex justify-center mt-6 mb-6 w-full'>    <LoadingUI/> </div> */}

         
   <div className="flex justify-center mt-6 mb-6 w-full">
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {board.map((value, index) => (
        <div
          key={index}
          onClick={() => toggle(index)}
          className="select-none rounded-xl border-2 border-black bg-[#1f3540] 
                     w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] 
                     flex items-center justify-center"
        >
          {value === "x" && (
            <img
              src={cross_icon}
              className="w-[40px] sm:w-[55px] md:w-[75px] lg:w-[95px]"
            />
          )}
          {value === "o" && (
            <img
              src={circle_icon}
              className="w-[40px] sm:w-[55px] md:w-[75px] lg:w-[95px]"
            />
          )}
        </div>
      ))}
    </div>
  </div>


   {/* Buttons */}
{/* //   <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 w-full max-w-[600px] px-4"> */}
//     {/* Go Back */}
{/* //     <button */}
{/* //       onClick={leavePage} */}
{/* //       className="bg-[hsl(49,98%,60%)] text-center w-40 sm:w-48 h-12 sm:h-14 mt-2 sm:mt-5  */}
{/* //                  rounded-2xl relative text-white text-lg sm:text-xl font-semibold group overflow-hidden" */}
{/* //       type="button" */}
{/* //     > */}
{/* //       <div className="bg-red-600 rounded-xl h-10 sm:h-12 w-1/4 flex items-center justify-center  */}
{/* //                       absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-500"> */}
{/* //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="22px" width="22px"> */}
{/* //           <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" /> */}
{/* //           <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" /> */}
{/* //         </svg> */}
{/* //       </div> */}
{/* //       <p */}
{/* //         className="translate-x-2 font-semibold text-lg sm:text-xl" */}
{/* //         style={{ textShadow: "2px 2px rgb(116,116,116)" }} */}
{/* //       > */}
{/* //         Go Back */}
{/* //       </p> */}
{/* //     </button> */}

//     {/* Reset */}
{/* //     <ButtonUI onCustomClick={resetGame} /> */}
{/* //   </div> */}
// </div> 

  )
}

 </>
  )
}

export default OnePlayerPage
