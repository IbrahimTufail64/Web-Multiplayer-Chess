'use client'
import React, { useEffect, useState } from 'react'
import { FaChessPawn } from "react-icons/fa";
import { FaChessRook } from "react-icons/fa";
import { FaChessKnight } from "react-icons/fa";
import { FaChessBishop } from "react-icons/fa6";
import { FaChessQueen } from "react-icons/fa";
import { FaChessKing } from "react-icons/fa";
import Piece from './Piece';
import { FindTargetSquares } from './MoveValidation';


type PieceType = 'r' | 'b' | 'n' | 'q' | 'k' | 'p';

interface IndexedPiece {
  [key: string]: React.JSX.Element;  // Index signature with number key and string value
}

const Board = () => {
    const [board, setBoard] = useState(Array(64).fill(''));
    const [blackPosition,setBlackPostition] = useState<any>({ 
        0:'r',
        1:'n',
        2:'b',
        3:'q',
        4:'k',
        5:'b',
        6:'n',
        7:'r',
        8:'p',
        9:'p',
        10:'p',
        11:'p',
        12:'p',
        13:'p',
        14:'p',
        15:'p',
    })
    const [whitePosition,setWhiteostition] = useState<any>({
       48:'p',
        49:'p',
        50:'p',
        51:'p',
        52:'p',
        53:'p',
        54:'p',
        55:'p',
        56:'r',
        57:'n',
        58:'b',
        59:'q',
        60:'k',
        61:'b',
        62:'n',
        63:'r',
    })
    const [selectedPiece,setSelectedPiece] = useState(0);
    const [isselectedPiece,setisSelectedPiece] = useState(false);
    const [targetSquares, setTargetSquares] = useState< Number[]>([]);
    const [whiteTurn, setWhiteTurn] = useState(false);
    const [boardIndexOffset, setboardIndexOffset] = useState(0); // defines a board inverstion index that is zero by default and 63 on black turn to invet index logic

    useEffect(()=>{
      const timeoutId = setTimeout(() => {
    // Code to execute after the delay
      if(whiteTurn) setboardIndexOffset(63);
      else setboardIndexOffset(0);
  }, 400);

  // Cleanup function to clear the timeout when the component unmounts
  return () => clearTimeout(timeoutId);
      
    },[whiteTurn])

    const Pieces: IndexedPiece = {
        'p': <FaChessPawn size={40} />,
        'r': <FaChessRook size={40} />,
        'n': <FaChessKnight size={40}/>,
        'b': <FaChessBishop size={40}/>,
        'q': <FaChessQueen  size={40}/>,
        'k': <FaChessKing  size={40}/>,
    }
    
    
    const printColor = (index:number):boolean => {
        const temp=Math.floor(index/8)%2;
        if(temp === 0){
           return index%2 === 0 
        }
        else {
            return index%2 !== 0
        }
    }
    
const playSound = ()=>{
    new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3').play()
}
const CaptureSound = ()=>{
    new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3').play()
}
const CheckSound = ()=>{
    new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3').play()
}


const HandleMouseMovement = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const GRID_SIZE = 80; 
  const row = Math.floor(event.clientY / GRID_SIZE);
  const col = Math.floor(event.clientX / GRID_SIZE);

  // Calculate array index (assuming a 7x7 chessboard)
  const index = Math.abs(boardIndexOffset-(row * 8 + col));

  console.log('array index:', index);
  
  if(Pieces[blackPosition[index]] && whiteTurn){
    setTargetSquares([]);
    setisSelectedPiece(true);
    setSelectedPiece(index);
    FindTargetSquares(targetSquares, setTargetSquares,blackPosition[index],true,index, blackPosition,whitePosition );
    
  }
  else if( Pieces[whitePosition[index]] && !whiteTurn){
    setTargetSquares([]);
    setisSelectedPiece(true);
    setSelectedPiece(index);
    FindTargetSquares(targetSquares, setTargetSquares,whitePosition[index],false,index,  blackPosition,whitePosition  );

  }
  else {
    setisSelectedPiece(false);
    setSelectedPiece(index);
    setTargetSquares([]);
  }
  console.log(isselectedPiece)
  console.log(selectedPiece)
// here index is the new position and selectedPiece is the current position of the piece
    if(blackPosition[selectedPiece] && isselectedPiece && whiteTurn){
        if(!targetSquares.includes(index)) 
            {return false; }
        
        let tempObj = blackPosition;
        // set new position for the piece
        const temp = tempObj[selectedPiece];
        // take the enemy piece if their positions overlap
        if(whitePosition[index]) {
          delete whitePosition[index];
          CaptureSound();
        }
        else playSound();
        delete tempObj[selectedPiece];
        tempObj[index] = temp;
        setBlackPostition(tempObj)
        setTargetSquares([]);
        setWhiteTurn(false);
    }
    else if(whitePosition[selectedPiece] && isselectedPiece && !whiteTurn){
         if(!targetSquares.includes(index)) 
            {return false; }
        let tempObj = whitePosition;
        const temp = tempObj[selectedPiece];
        // take the enemy piece if their positions overlap
        if(blackPosition[index]) {
          delete blackPosition[index];
          CaptureSound();
        }
        else playSound();
        delete tempObj[selectedPiece];
        tempObj[index] = temp;
        setWhiteostition(tempObj)
        setTargetSquares([])
        setWhiteTurn(true);
    }

  
};


    
  return (
    <div >
      <div className={`grid grid-cols-8 gap-0 w-[640px] relative`}>
        {board.map((square:string,idx:number) =>{
        return <div key={idx}   onMouseDown={(event)=>HandleMouseMovement(event)}
            className={`${printColor(idx)  ? 'bg-[#EBD3A9]': 'bg-[#725344]'} ${targetSquares.includes(Math.abs(boardIndexOffset-idx)) && 'bg-[#e8b45a] border border-[#f0d19b]'} w-[80px] h-[80px] flex justify-center items-center`}>
                <Piece blackPiece={Pieces[blackPosition[Math.abs(boardIndexOffset-idx)]]} whitePiece={Pieces[whitePosition[Math.abs(boardIndexOffset-idx)]]} />
                
            </div>
        })}
    </div>
    </div>
  )
}

export default Board