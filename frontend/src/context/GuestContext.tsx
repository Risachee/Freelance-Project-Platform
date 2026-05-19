import React, { createContext, useContext,  } from "react";


type GuestContextType = {

}

const GuestContext = createContext<GuestContextType | undefined>(undefined)


export const GuestProvider = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <GuestContext.Provider
            value={{
                
            }}>
            {children}
        </GuestContext.Provider>
    )
}

export const useClients = () => {
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error('Error')
    }
    return context;
}