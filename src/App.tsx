
import './App.scss'
import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import { useQuiz } from './components/QuizContex.tsx';

function App() {
  const state = useQuiz();
  console.log(state)

  return (
    <>
      <Score />
      <Game /> 
       
    </>
  )
}

export default App
