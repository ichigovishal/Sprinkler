import pkg from 'mysql';
import { resolve } from 'path';
import { rejects } from 'assert';
//import Promise from 'promise';
const { createConnection } = pkg;

class File{
      constructor(name){
            this.file = require('fs');
            this.name = __dirname + '/' + name;
      }

      write(data){
            this.file.appendFile(this.name, data, function (err, file) {
                  if (err) throw err;
                });
      }
      read(){
            return this.file.readFile(this.name);
      }
}

export let MySQL = {
      connection_detail: {},
      mysql : NaN,
      start: ()=>{
            MySQL.mysql = createConnection(MySQL.connection_detail)
      },
            
      get_data: (query)=>{
            return new Promise((resolve, rejects)=>{
                  MySQL.mysql.query(query, (err, rows, fields)=>{
                        if (err){
                          rejects(err);
                        }
                        resolve(rows);
                  });
            }) 
      },



}


class base_models{
      constructor(verbose='', maxlength=NaN, blank=false, defaultValue=NaN){
            this.var_name;
            this.model;
            this.verbose = verbose;
            this.maxlength = maxlength;
            this.blank = blank;
            this.defaultValue = defaultValue;
      }
      get all(){
            return MySQL.get_data(`SELECT ${this.var_name} FROM ${this.model}`);
       }
       sortBy(key, val){
            let value = typeof val == 'boolean' ? (val ? 1 : 0) : val;
            value = typeof value == 'string' ? ("'" + value + "'") : value;
            return MySQL.get_data(`SELECT ${this.var_name} FROM ${this.model} WHERE ${key} = ${value};`);
       }
       recent(len=1){
       }
       update(new_value, condition){// `name = 'vishal' `
       var condition_up = ''
       var index = 0;
       Object.keys(condition).forEach(key=>{
            index ++;
            let value = typeof condition[key] == 'boolean' ? (condition[key] ? 1 : 0) : condition[key];
            value = typeof value == 'string' ? ("'" + value + "'") : value;
            condition_up = condition_up + key + ' = ' + value;
            if(index != Object.keys(condition).length)
                condition_up = condition_up + ' AND ';

       })
            function isInt(n) {
                  return n % 1 === 0;
            };
                  if (this.type == 'int'){
                        if (typeof new_value == 'number'){
                              if (!isInt(new_value)) throw `Value of ${this.var_name} is not ${this.type}.`;
                        }else throw `Value of ${this.var_name} is not ${this.type}.`;
                           
                  }else if(this.type == 'double'){
                        console.log(typeof new_value);
                        if (typeof new_value == 'number'){
                              
                        }else throw `Value of ${this.var_name} is not ${this.type}.`;
                        
                  }else if(this.type == 'tinyint(1)'){
                        if (typeof new_value != 'boolean') throw `Value of ${this.var_name} is not ${this.type}.`;
                        new_value = new_value ? 1 : 0;
                  }
                  else if(this.type == 'datetime(6)'){

                  }else throw `${this.type} is not add in check system. Please add it.`;
            
            return MySQL.get_data(`UPDATE ${this.model} SET ${this.var_name} = ${new_value} WHERE ${condition_up};`)
       }
      
}

export const models = {
      BoolField : class BoolField extends base_models{
            constructor(verbose='', maxlength=NaN, blank=false, defaultValue=NaN){
                  super(verbose='', maxlength=NaN, blank=false, defaultValue=NaN);
                  this.type = 'tinyint(1)';
                  
            }
      },
      IntField : class IntField extends base_models{
            constructor(verbose='', maxlength=NaN, blank=false, defaultValue=NaN){
                  super(verbose='', maxlength=NaN, blank=false, defaultValue=NaN);
                  this.type = 'int';
                  
            }
      },
      DoubleField : class  DoubleField extends base_models{
            constructor(verbose='', maxlength=NaN, blank=false, defaultValue=NaN){
                  super(verbose='', maxlength=NaN, blank=false, defaultValue=NaN);
                  this.type = 'double';
                  
            }
      },
      DateTimeField : class  DateTimeField extends base_models{
            constructor(verbose='', maxlength=NaN, blank=false, defaultValue=NaN){
                  super(verbose='', maxlength=NaN, blank=false, defaultValue=NaN);
                  this.type = 'datetime(6)';
                  
            }
      }
}

export class Model{
      constructor(){
            this.objects = {
                  all: ()=>{
                        return MySQL.get_data(`SELECT * FROM ${this.model_name}`);
                  },
                  sortBy: (key, value)=>{
                        value = typeof value == 'boolean' ? (value ? 1 : 0) : value;
                        value = typeof value == 'string' ? ("'" + value + "'") : value;
                        return MySQL.get_data(`SELECT * FROM ${this.model_name} WHERE ${key} = ${value};`);
                   },
                  recent: (len=1)=>{
                  },
                  add: (obj)=>{
                        function isInt(n) {
                              return n % 1 === 0;
                        };
                        const fields = Object.getOwnPropertyNames(this);
                        Object.keys(obj).forEach(key=>{
                              if (fields.includes(key)){
                                    if (eval("this."+key+".type") == 'int'){
                                          if (typeof obj[key] == 'number'){
                                                if (!isInt(obj[key])) throw `Value of ${key} is not ${eval("this."+key+".type")}.`;
                                          }else throw `Value of ${key} is not ${eval("this."+key+".type")}.`;
                                             
                                    }else if(eval("this."+key+".type") == 'double'){
                                          if (typeof obj[key] == 'number'){
                                          }else throw `Value of ${key} is not ${eval("this."+key+".type")}.`;
                                          
                                    }else if(eval("this."+key+".type") == 'tinyint(1)'){
                                          if (typeof obj[key] != 'boolean') throw `Value of ${key} is not ${eval("this."+key+".type")}.`;
                                          obj[key] = obj[key] ? 1 : 0;
                                    }else if(eval("this."+key+".type") == 'datetime(6)'){
                                          obj[key] = "'" + obj[key] + "'";     
                                    }else throw `${eval("this."+key+".type")} is not add in check system. Please add it.`;
                              }
                        })
                        return {...obj, save:()=>{
                              var col = '';
                              var val = '';
                              
                              Object.keys(obj).forEach(item=>{
                                   col = col + item + ',';
                              })
                              Object.values(obj).forEach(item=>{
                                    val = val + item + ',';
                              })
                              col = col.substring(0, col.length - 1);
                              val = val.substring(0, val.length - 1);
                              return MySQL.get_data(`INSERT INTO ${this.model_name}(${col}) VALUES (${val});`);   
                        }}

                  }
            }
            
      }
      apply(){
            this.model_name = this.constructor.name;
            Object.getOwnPropertyNames(this).forEach(element => {
                  if(element != 'model_name' && element != 'objects' && element != 'model_name'){
                        eval('this.'+element+'.var_name = element;');
                        eval('this.'+element+'.model = this.model_name;');
                  }
            });
      }
}



export const checkModel = (arr)=>{
      arr.forEach(element => {
            const buffer = new element;
            const name_of_table = buffer.constructor.name;
            MySQL.get_data(`show columns from ${name_of_table};`).then((data)=>{
                  const fields = Object.getOwnPropertyNames(buffer);
                  data.forEach(({Field, Type}) => {
                        if(fields.includes(Field)){
                              if (eval("buffer."+Field+".type") != Type) throw `${Type} of ${Field} from ${name_of_table} missmatch from database's type ${eval("buffer."+Field+".type")}`;
                        }
                        else throw `${Field} is not add in ${name_of_table} model.`;
                  })
            }).catch(err=>{
                  console.error(err);
            });      
      });
}


