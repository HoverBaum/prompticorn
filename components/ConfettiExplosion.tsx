'use client'

import Confetti from 'react-dom-confetti'
import { useEffect, useState } from 'react'

// https://daniel-lundin.github.io/react-dom-confetti/
const config = {
  angle: 90,
  spread: 360,
  startVelocity: 51,
  elementCount: 130,
  dragFriction: 0.19,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

export const ConfettiExplosion = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true)
    }, 100)
  })

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translatey-1/2 z-50">
      <Confetti active={isActive} config={config} />
    </div>
  )
}
