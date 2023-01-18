import './styles/global.css'
import { Habit } from "./components/Habit"

function App() {
 
  return (
    <div>
      <Habit completed={30} />
      <Habit completed={30} />
      <Habit completed={30} />
    </div>
  )
}

export default App
