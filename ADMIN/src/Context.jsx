import {createContext, useEffect, useState } from "react";


export const StoreContext = createContext()
export const StoreContextProvider = ({children})=>{

    const [adminToken, SetAdminToken] = useState("")
    const url = "https://jana-sahayaka.onrender.com"
    useEffect(()=>{
        const storedToken = localStorage.getItem("admin_token")
        if(storedToken){
            SetAdminToken(storedToken)
        }
    },[adminToken])

    const contextVal = {
        adminToken,
        SetAdminToken,
        url
    }
    return(
        <StoreContext.Provider value={contextVal}>
            {children}
        </StoreContext.Provider>
    )
}