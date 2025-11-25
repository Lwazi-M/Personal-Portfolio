import Lanyard from './Lanyard'
import './App.css'

function App() {
  return (
    <div className="App">
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  )
}

export default App