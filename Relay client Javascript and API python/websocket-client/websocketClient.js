import {MySQL, Model, checkModel, models} from './sprinkler_mysql.js';
import Websockets from './sprinkler_websocker.js';

MySQL.connection_detail = {
      host: "db1",
      user: "add here",
      password: "add here",
      database: 'add here',
      port: '3306',
}
try{
      MySQL.start();
}
catch(err){
      console.log(err);
}


class action_actions extends Model{
      constructor(){
            super();
            this.id = new models.IntField();
            this.type = new models.IntField();
            this.sprinkler_port = new models.IntField();
            this.approximation_total_interval = new models.IntField();
            this.minimum_moisture_level = new models.DoubleField();
            this.check_after_hours = new models.IntField();
            this.time_after_which_shutdown = new models.IntField();
            this.state = new models.BoolField();
            this.is_done = new models.BoolField();
            this.apply();
      }

}

class API_sprinklerdata extends Model{
      constructor(){
            super();
            this.time = new models.DateTimeField();
            this.sprinkler_port = new models.IntField();
            this.status_of_sprinkler = new models.BoolField();
            this.approximation_total_interval = new models.IntField();
            this.last_on  = new models.IntField();
            this.moisture_reading = new models.DoubleField();
            this.was_closed_overtime = new models.BoolField();
            this.minimum_moisture_level = new models.DoubleField();
            this.time_after_which_shutdown = new models.IntField();
            this.check_after_hours = new models.IntField();
            this.on_since = new models.IntField();
            this.apply();
      }
}
const action = new action_actions();
const api = new API_sprinklerdata();

function recieve(val,flags,number){
      try{
      const data = JSON.parse(val);
      if ("recivied" in data){
            const id = data["id"];
            action.is_done.update(true, {id}).then(()=>{
                  console.log(data);
            }).catch(err=>{
                  console.error(err);
            });
      }
      else if ("data" in data){
            const info = data["data"];
            const saved_mod = api.objects.add(info);
            saved_mod.save().catch(err=>{
                  const {code} = err;
                  if (code != 'ER_DUP_ENTRY')
                        console.error(err);
            })
      }
      else{
            console.log(`Not fit in condition, responce: ${JSON.stringify(data)}`);
      }
}
      catch(err){
            console.error((err));
}
}

try{
      
      checkModel([action_actions, API_sprinklerdata])
}
catch(err){
      console.error(err)
}



const socket = new Websockets("ws://192.168.32.117:8080/",3000, recieve)

socket.connection();

const timeout = setInterval(()=>{
            action.objects.sortBy("is_done", false).then(data=>{
                  if (data.length != 0){
                        const dt = {...data[0]};
                        socket.send(dt);
                  }
            }).catch(err=>{
                  //console.error(err);
            })
}, 5000)

