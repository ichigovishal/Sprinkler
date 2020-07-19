import createDataContext from './createDataContext';
import jsonServer from '../api/server'

var is_done = true;

const reducer = (state, action)=>{
      switch(action.type){
            case 'get_data':
                  return action.data;
            default:
                  return state;
      }
}

const action = {get_data: (dispach)=>{
      return async (number)=>{
            
           if (is_done){
                 is_done = false;
            const response = await jsonServer.get(`http://test.yadavshome.xyz:81/api/sprinklerdata/${number}/?format=json`).
            catch(err => {
                  console.log(err.message); // "Request failed with status code 401"
                  console.log(err.response.status); // 401 "Unauthorized";
            }).finally(()=>{
                  
                  is_done = true;
                  
            });
            dispach({type: 'get_data', data : response.data});
           }
      }
},


}

export const {Context, Provider} = createDataContext(reducer, [], action);
    