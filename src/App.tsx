import { useState } from 'react'

import { Header } from './components/Header'
import { Section } from './components/Section'
import { Counter } from './components/Counter'
import { List } from './components/List'

import './App.css'

function App() {
  let [count, setCount] = useState(0)

  return (
    <>
    <Header title='Personal Dashboard'/>
    <Section title='Main Content'>
      <p>Welcome to your personal dashboard!</p>
      <div>
        <p>What is the current count?</p>
        <p>Current Count: {count}</p>
      </div>
    </Section>
    <Counter count={count} setCount={setCount}></Counter>
    <List items={["Tacos", "Code"]} renderItem={(item) => <span>{item}</span>}/>
    </>
  )
}

export default App
