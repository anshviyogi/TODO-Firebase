// Redux Context API

import React,{createContext,useContext,useReducer} from "react"

// This is the data layer
export const StateContent = createContext()

// Build a provider
// InitialState - how the data layer looks in the beginning

export const StateProvider = ({reducer,initialState,children}) =>{
    return(
<StateContent.Provider value={useReducer(reducer,initialState)}>
    {children}
    {/**Go in the index.js file and there App.js in this children */}
</StateContent.Provider>
)
}

// This is how we use it inside a component
export const useStateValue = ()=> useContext(StateContent)