import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const messages = [
  {
    tip: 'Use " to specify phrase search!',
    query: '"fyp poster"'
  },
  {
    tip: 'Use AND, OR to join queries.',
    query: 'deep learning AND workshop'
  },
  {
    tip: 'Title matches are weighted higher!',
    query: 'desmond tsoi'
  }
]

export default function Tips() {
  const [currentMessage, setCurrentMessage] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((currentMessage + 1) % messages.length)
    }, 10000)
    return () => clearInterval(interval)
  })
  return (
    <div className="text-center">
      <span className="font-weight-bold">Tips:</span>{' '}
      {messages[currentMessage].tip} Try out{' '}
      <Link
        className="text-monospace"
        to={`/search?q=${encodeURIComponent(messages[currentMessage].query)}`}>
        {messages[currentMessage].query}
      </Link>
      !
    </div>
  )
}
