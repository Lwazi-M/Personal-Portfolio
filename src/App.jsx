import Lanyard from './Lanyard'
import Overlay from './Overlay'
import './App.css'

function App() {
  return (
    <div className="App">
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      <Overlay />
    </div>
  )
}

export default App