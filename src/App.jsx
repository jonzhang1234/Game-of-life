import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'
import Header from './Header'
import Game from './Game'
import Board from './TicTacToe'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Header>
      </Header>
      <Game>
      </Game>
      <Footer>
      </Footer>
      <Board />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>

    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
