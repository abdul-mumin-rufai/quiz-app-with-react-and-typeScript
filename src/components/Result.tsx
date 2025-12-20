import { decode } from 'html-entities';
import { useQuiz } from './QuizContext';

function Result() {
    const { state } = useQuiz();


    return (
        <>
            {
                state.userAnswer == state.question?.correct_answer ?

                    <div className="result correct">&#10003; You answered correctly!</div>
                    :
                    <div className="result incorrect">&#x274C; Your answer is incorrectly! The correct answer was {decode (state.question?.correct_answer) }</div>

                
        }
        </>


    )
}

export default Result
