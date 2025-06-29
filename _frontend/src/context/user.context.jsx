import React, {createContext, useState, useContext} from "react";

//create the user context
export const UserContext = createContext();


//create a provider component
export const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value= {{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};


//custom hook to use the Usercontext
