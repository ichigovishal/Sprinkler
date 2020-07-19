import createDataContext from './createDataContext';
import jsonServer from '../api/server';

const covertDate = (data)=>{
    const [date , time] = String(data).split('T');
    const [year, month, day] = data.split("-");
    months = ["January" ,"February" ,"March","April","May","June","July","August","September","October","November","December"]
    return `${months[Number(month) -1]} ${day}, ${year} ${time.substring(0, time.length - 2)}`
}

const reducer = (state, action)=>{

      switch(action.type){

            case 'sync':
                  return action.data;
            default:
                  return state;
      }
 
}

const action = {sync : (dispach)=>{
      
      return async (date)=>{
            const {data} = await jsonServer.get(`http://test.yadavshome.xyz:81/api/sprinklerdata/?date=${date}`)
                 .catch(err => {
                   console.log(err.message); // "Request failed with status code 401"
                   console.log(err.response.status); // 401 "Unauthorized";
             }).finally(()=>{
                   
                   
                   
             });
            dispach({type: 'sync', data:{on_date: date 
                  ,time_data: data.map(dt=>{
                        const {time} = dt;
                        return {...dt, time: new Date(time)}
                   })
            }});
      }
}

}

export const {Context, Provider} = createDataContext(reducer,{time_data: [], on_date : ''}, action);
