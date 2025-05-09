import { useLocation } from "react-router-dom";

export default function Result() {
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const correct = queryParams.get("correct");
  const error = queryParams.get("error");

  
  
  return (
    <>
      {
        correct && error ? (
          <div>
            <h1>Correct: {correct}</h1>
            <h1>Error: {error}</h1>
          </div>
        ) : (
          <h1>Loading...</h1>
        )
      }
    </>
  );
}
