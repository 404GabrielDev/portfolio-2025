import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LoadingContextType {
    loadingPage: boolean;
    setLoadingPage: (value:boolean) => void;
    loadingComponents: boolean;
    setLoadingComponents: (value:boolean) => void;
}
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type GlobalProviderProps = {
    children: ReactNode;
}


export function GlobalProvider({children}:GlobalProviderProps) {
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingComponents, setLoadingComponents] = useState(false)
    return(
        <LoadingContext.Provider value={{loadingPage, setLoadingPage, loadingComponents, setLoadingComponents}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const UseLoading = () => {
    const context = useContext(LoadingContext);
    if(!context) {
        throw new Error("useLoading must be used within a GlobalProvider")
    }
    return context;
};