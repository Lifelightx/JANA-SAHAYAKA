import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext()

export const StoreContextProvider = ({children})=>{
    const url = "http://localhost:5000"
    const [complaints, setComplaints] = useState([]) // Fixed typo in variable name
    const [token, setToken] = useState("")

    // Move token check to useEffect to avoid infinite re-renders
    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if(storedToken){
            setToken(storedToken)
        }
    }, [token])

    const contextValue = {
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}