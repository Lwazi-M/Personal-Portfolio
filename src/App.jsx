import Lanyard from './Lanyard'
import Overlay from './Overlay'
import './App.css'

function App() {
  return (
    <div className="App">
      {/* UPDATED CAMERA POSITION: [X, Y, Z]
        X: 20 (Moved further right -> pushes Lanyard to the LEFT)
        Y: 0  (Centered vertically)
        Z: 15 (Moved closer -> makes Lanyard BIGGER)
      */}
      <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
      <Overlay />
    </div>
  )
}

export default App