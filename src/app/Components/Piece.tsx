import React, { useEffect, useState } from 'react'



type Arguments = {
    blackPiece: React.JSX.Element
    whitePiece: React.JSX.Element
}

const Piece = ({blackPiece,whitePiece}:Arguments) => {

  return (
    <div>
        <div >{blackPiece}</div>
        <div className='text-white'>{whitePiece}</div>
    </div>
  )
}

export default Piece