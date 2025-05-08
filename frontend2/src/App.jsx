import {BrowserRouter, Routes, Route} from "react-router-dom"
import FindMatch from "./components/find.jsx"
import Result from "./components/result.jsx"

function App() {


  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path="/"  element={<FindMatch/>} />
          <Route path="/result" element={<Result/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
