import WebSocket from 'ws';

function WebSocketClient(){
	this.number = 0;	// Message number
	this.autoReconnectInterval = 5*1000;	// ms
}
WebSocketClient.prototype.open = function(url){
	this.url = url;
	this.instance = new WebSocket(this.url);
	this.instance.on('open',()=>{
		this.onopen();
	});
	this.instance.on('message',(data,flags)=>{
		this.number ++;
		this.onmessage(data,flags,this.number);
	});
	this.instance.on('close',(e)=>{
		switch (e.code){
		case 1000:	// CLOSE_NORMAL
			console.log("WebSocket: closed");
			break;
		default:	// Abnormal closure
			this.reconnect(e);
			break;
		}
		this.onclose(e);
	});
	this.instance.on('error',(e)=>{
		switch (e.code){
		case 'ECONNREFUSED':
			this.reconnect(e);
			break;
		default:
			this.onerror(e);
			break;
		}
	});
}
WebSocketClient.prototype.send = function(data,option){
	try{
		this.instance.send(data,option);
	}catch (e){
		this.instance.emit('error',e);
	}
}
WebSocketClient.prototype.reconnect = function(e){
	console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`,e);
        this.instance.removeAllListeners();
	var that = this;
	setTimeout(function(){
		console.log("WebSocketClient: reconnecting...");
		that.open(that.url);
	},this.autoReconnectInterval);
}
WebSocketClient.prototype.onopen = function(e){	console.log("WebSocketClient: open",arguments);	}
WebSocketClient.prototype.onmessage = function(data,flags,number){	console.log("WebSocketClient: message",arguments);	}
WebSocketClient.prototype.onerror = function(e){	console.log("WebSocketClient: error",arguments);	}
WebSocketClient.prototype.onclose = function(e){	console.log("WebSocketClient: closed",arguments);	}

export default class Websockets{
      constructor(url ,timeout = 3000, recieve_func){
            this.WebSocket = new WebSocketClient;
            this.recieve_func = recieve_func;
            this.url = url;
      }
      connection(){
            this.WebSocket.open(this.url);
            this.WebSocket.onerror = (err)=>{this.errorHandler(err)};
            this.recieve();
            this.WebSocket.onopen(this.onopen);
            this.WebSocket.onclose(this.onclose);
      }
      send(data){
            this.WebSocket.send(JSON.stringify(data));
      }
      recieve(){
            this.WebSocket.onmessage = this.recieve_func;
      }
      errorHandler(err){
            console.error(err);
            
      }
      onopen(message){
            console.log(`Connected.... ${message}`);
      }
      onclose(message){
            console.log(`Disconnect...${message}`);
      }

}
