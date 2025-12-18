import { createContext, useContext, useReducer } from 'react';

type Status = "idle" | "fetching" | "ready" | "error"


export interface QuizQuestion {
    type: 'boolean' | 'multiple';
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizApiResponse {
    response_code: number,
    results: QuizQuestion[]
}

// state intialisation. ie how the context should look like.
interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}
interface QuizState {
    gameStatus: Status,
    question: QuizQuestion | null,  //fetch question before.
    userAnswer: string | null
    
};

type QuizAction =
    { type: "setStatus"; payload: Status } |
    { type: "setQuizQuestion"; payload: QuizQuestion } |
    { type: "setUserAnswer"; payload: string }

const initialState: QuizState = {
    gameStatus: "idle",
    question: null, //fetch question before
    userAnswer: null

}

// context intialisation. ie how the context should look like.
const quizContext = createContext<QuizContext>({
    state: initialState,
    dispatch: () => null
});


export function QuizProvider({ children }: { children: React.ReactElement }) {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <quizContext.Provider value={{ state, dispatch }}>
            {children}
        </quizContext.Provider>

    );
}

export function useQuiz() {
    return useContext(quizContext);
}

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
        case "setStatus":
            return { ...state, gameStatus: action.payload };

        case "setQuizQuestion":
            return { ...state, question: action.payload };
        case "setUserAnswer":
            return { ...state, userAnswer: action.payload };
        default:
            throw new Error("Unknown action");
    }
}
