import React from 'react'

export default function Speech() {
    const handleClick=()=>{
        const text="Pepsi"
        const value=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value)
    }
  return (
    <div>
      <button onClick={handleClick}>text to speech</button>
    </div>
  )
}
