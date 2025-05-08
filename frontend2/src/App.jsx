
import {BrowserRouter, Routes, Route} from "react-router-dom"
import FindMatch from "./components/find.jsx"
import Play from "./components/play.jsx"

function App() {


  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path="/"  element={<FindMatch/>} />
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
