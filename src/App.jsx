import Icicle from "./components/Icicle"
import Navbar from "./components/Navbar"

function App() {
  const width = screen.width < 600 ? 480 : 928;
  const height =
    2 * window.innerHeight ||
    2 * document.documentElement.clientHeight ||
    2 * document.body.clientHeight;

  return <div>
    <Navbar />
    <Icicle width={width} height={height} />
  </div>
}

export default App
