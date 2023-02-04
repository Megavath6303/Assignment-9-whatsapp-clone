import React , { createContext , useContex, useReducer } from "react"
export const StateContext = createContext()

export const StateProvider = ({ reducer,initialState,children }) => {
    <StateContext.Provider value={useReducer(reducer , initialState)}>
        {children}
    </StateContext.Provider>
}

export const useStateValue = () => useContex(StateContext)