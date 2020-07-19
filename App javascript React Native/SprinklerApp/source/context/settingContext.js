import createDataContext from './createDataContext';
import jsonServer from '../api/server';

const reducer = (state, action)=>{

      switch(action.type){
            case 'update':
                  return {...state ,...action.data};
            case 'sync':
                  return {...state ,...action.data};
            default:
                  return state;
      }
 
}

const action = {update : (dispach)=>{
      return (data)=>{
       dispach({type: 'update', data});
      }
},
sync : (dispach)=>{
      
      return async ()=>{
            const {data} = await jsonServer.get(`http://test.yadavshome.xyz:81/api/sprinklerdata/1/?format=json`)
                 .catch(err => {
                   console.log(err.message); // "Request failed with status code 401"
                   console.log(err.response.status); // 401 "Unauthorized";
             }).finally(()=>{
                   
                   
                   
             });
            dispach({type: 'sync', data: data[0]});
      }
}

}

export const {Context, Provider} = createDataContext(reducer,{}, action);
