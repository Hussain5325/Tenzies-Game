import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './assets/Die'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)

    if (allHeld && allValue) {
      setTenzies(true)
    }
  }, [dice])

  function genrateObject() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const randomNumbers = []
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(genrateObject())
    }
    return randomNumbers
  }

  const newElements = dice.map(item => {
    return (
      <Die
        value={item.value}
        isHeld={item.isHeld}
        key={item.id}
        handleClick={() => hold(item.id)}
      />
    )
  })

  function hold(id) {
    setDice(prevState =>
      prevState.map(item => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item
      })
    )
  }

  function rollClick() {
    if (!tenzies) {
      setDice(prevState =>
        prevState.map(item => {
          return item.isHeld ? item : genrateObject()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <section id='container'>
        <article id='content'>
          <h1 id='title'>Tenzies</h1>
          <p id='txt'>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </article>
        <section id='btn_container'>{newElements}</section>
        <button id='roll' onClick={rollClick}>
          {tenzies ? 'new Game' : 'Roll'}
        </button>
      </section>
    </main>
  )
}

export default App
