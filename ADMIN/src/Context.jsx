import {createContext, useEffect, useState } from "react";


export const StoreContext = createContext()
export const StoreContextProvider = ({children})=>{

    const [adminToken, SetAdminToken] = useState("")

    useEffect(()=>{
        const storedToken = localStorage.getItem("admin_token")
        if(storedToken){
            SetAdminToken(storedToken)
        }
    },[adminToken])

    const contextVal = {
        adminToken,
        SetAdminToken
    }
    return(
        <StoreContext.Provider value={contextVal}>
            {children}
        </StoreContext.Provider>
    )
}