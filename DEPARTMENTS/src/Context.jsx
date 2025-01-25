import React, { useState, useEffect, createContext } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [dept, setDept] = useState("")

    useEffect(() => {
        const storedToken = localStorage.getItem("dept_token");
        const storedDeptId = localStorage.getItem("dept_id");
        if (storedToken || storedDeptId) {
            setToken(storedToken);
            setDept(storedDeptId)
        }
    }, []);

    const contextVal = {
        token,
        setToken,
        dept,
        setDept
    };

    return (
        <StoreContext.Provider value={contextVal}>
            {children}
        </StoreContext.Provider>
    );
};
