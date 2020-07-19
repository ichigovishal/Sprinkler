import React, {useReducer} from 'react';

export default (reducer, initialValue, action) =>{
      const Context = React.createContext();
      const Provider = ({children})=>{
            var [state, dispach] = useReducer(reducer, initialValue);
            boundAction = {};
            for (let key in action){
                  boundAction[key] = action[key](dispach);
            }
            const context = {data: state, ...boundAction};
            return <Context.Provider value={context}>
                  {children}
                  </Context.Provider>
      }
      return {Context, Provider};
}

