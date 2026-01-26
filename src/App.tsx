import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'

// import { Header } from './components/Header'
// import { Section } from './components/Section'
// import { Counter } from './components/Counter'
// import { List } from './components/List'

import './App.css'
import Dashboard from './features/dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Dashboard/>}>

      </Route>
    </>
  )
)

function App() {
  // let [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router} />
    {/* <Header title='Personal Dashboard'/>
    <Section title='Main Content'>
      <p>Welcome to your personal dashboard!</p>
      <div>
        <p>What is the current count?</p>
        <p>Current Count: {count}</p>
      </div>
    </Section>
    <Counter count={count} setCount={setCount}></Counter>
    <List items={["Tacos", "Code"]} renderItem={(item) => <span>{item}</span>}/> */}
    </>
  )
}

export default App
