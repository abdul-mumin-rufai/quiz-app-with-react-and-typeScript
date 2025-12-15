import { createContext, useContext, useReducer } from 'react';

type Status = "idle" | "fetching" | "ready"


// context intialisation. ie how the context should look like.
interface QuizContext{
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

interface QuizState {
    gameStatus: Status
};

type QuizAction =
    | { type: "setStatus"; payload: Status }

const initialState: QuizState = {
    gameStatus: "idle"
}

// context intialisation. ie how the context should look like.
const quizContext = createContext<QuizContext>({
    state: initialState,
    dispatch: ()=> null
});


export function QuizProvider({ children }: { children: React.ReactElement }) {
    const [state, dispatch] = useReducer(QuizReducer,initialState);

    return (
        <quizContext.Provider value={{state, dispatch}}>
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
            return {...state, gameStatus:action.payload};
        default:
            throw new Error("Unknown action");
    }
}
  