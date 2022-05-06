import React, {createContext} from 'react';

export const AuthContext = createContext({}); //tiene que tener un estado den todo momento?

export const AuthProvider = ({children}) => {

    return (
        <AuthContext.Provider value="Tus perritos Lu">{children}</AuthContext.Provider>
    );
};