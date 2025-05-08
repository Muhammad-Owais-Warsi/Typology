import { useParams } from "react-router-dom"

export default function Result() {
  
  const { correct, error } = useParams();  
  return (
    <>
      <h1>Correct: {correct}</h1>
      <h1>Error: {error}</h1>
    </>
  )
}