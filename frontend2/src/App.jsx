import {BrowserRouter, Routes, Route} from "react-router-dom"
import FindMatch from "./components/find.jsx"
import Result from "./components/result.jsx"
import LandingPage from "./components/landing.jsx"
import Login from "./components/login.jsx"

function App() {


  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path="/"  element={<LandingPage/>} />
          <Route path="/find"  element={<FindMatch/>} />
          <Route path="/result" element={<Result/>}/>
          <Route path="/login" element={<Login/>} />
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
