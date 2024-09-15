import React, { createContext, useState, useEffect } from "react";
import axios from "axios"

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    const contextValue = { 
        token,
        setToken,
        url
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;