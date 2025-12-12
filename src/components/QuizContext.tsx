import { createContext, useContext, useState } from 'react';

interface QuizState {
    gameStatus: "idle" | "fetching" | "ready"
};

const initialState: QuizState = {
    gameStatus: "idle"
}
const quizContext = createContext<QuizState>(initialState);


export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState(initialState);

    return (
        <quizContext.Provider value={state}>
            {children}
        </quizContext.Provider>

    );
}

export function useQuiz() {
    return useContext(quizContext);
}
