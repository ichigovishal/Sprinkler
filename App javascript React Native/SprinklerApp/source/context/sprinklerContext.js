import createDataContext from './createDataContext';


const reducer = (state, action)=>{
      switch(action.type){
            case 'update':
                  return {...state ,...action.data};
            case 'update_control':
                  return {...state, control_state: action.data};
            default:
                  return state;
      }
 
}

const action = {update : (dispach)=>{
      return (data)=>{
       dispach({type: 'update', data});
      }
},update_control: (dispach)=>{
      return (data)=>{
       dispach({type: 'update_control', data});
      }

}}

export const {Context, Provider} = createDataContext(reducer, {state: 'False', control_state: {"last on": true}}, action);
