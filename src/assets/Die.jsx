import { useState, useEffect } from 'react'

function Die(props) {
  const style = {
    backgroundColor: props.isHeld && '#59E391',
  }
  return (
    <button className='boxes' style={style} onClick={props.handleClick}>
      {props.value}
    </button>
  )
}

export default Die
