//创建聊天的服务的设引入socket.io
	var http = require('http');
	var httpserver = http.createServer(function(req,res){
		
	});
	
	//创建用户表
	var users = ['29','179','231'];
	var g2g = []; //群聊的用户的数组
	httpserver.listen(3000);
	var sockets = require('socket.io')(httpserver);
	sockets.on('connection',function(socket){
		
	console.log(socket.id);
	
	socket.send('now get the message!');
	//创建链接的服务的操作的实现
	socket.on('data',function(data){ 
		
	});
	
	//扩展一个方法来处理时候已经存在
	Function.prototype.isHad = function(value,data){
		var length = data.length;
		if(length == 0) return true;
		for(var i =0; i< length ; i++){
			if(data[i] == value) return true; //存在当前的数组中
		}
		return false; //如果不存在则表当前的值不存在这个数组中
	}
	
	//创建姓名加入到聊天中
	socket.on('join',function(data){
		//判断当前的用户是否已经存在当前的群聊的
		var userid = data.userId;
		var isin = isHad(userId,g2g);
		if(isin == false){
			g2g.push(userid);
		}
	});
	
	//发送聊天的内容群聊的
	
	socket.on('sendmessage',function(data){
		
		var userid = data.userid;
		var content = 'Hello: '+userid+'&nbsp;&nbsp; your sad that is  '+data.content;
		var times = data.times;
		for(var i=0;i < users.length;i++){
			var uids = users[i];
			if(uids != userid){
				var mess = 'getmessage_'+uids;
				socket.broadcast.emit(mess,{'content':content,'times':times,'userid':uids}); //广播事件当前链接改socket的全部的用户都能接收到相关的信息
			}
		}
	});
	
	//断开链接
	
	socket.on('disconnect',function(data){
		
	});
	
	//加入大群聊里面 返回当前的用户的信息
	socket.on('joinus',function(data){
		var userid = users[data.uid];
		socket.emit('joinedus',{'name':data.username,'age':data.age,'id':userid,'users':users}); //返回当前的用户的列表的信息
	});
	
	//退出群聊
	
	socket.on('outus',function(data){
		var userid = data.userId;
		//移除当前的用户并推送信息到其他的用户
		for(var i = 0; i<users.length;i++){
			if(users[i] == userid){
				users.splice(i,1); //删除当前的用户
			}
		}
		//推送相关的信息到用户
		for(var j=0;j<users.length;j++){
			var mess = 'nowusers_'+uids;
			socket.broadcast.emit(mess,{'users':uids}); //更新当前的用户列表
		}
	
	});
	
	//私聊
	socket.on('ctoc',function(data){
		var userid = data.userId;
		var mess = 'ctoc_'+userId;
		socket.broadcast.emit(mess,{'content':data.content,'times':data.times,'userid':userId}); //定向的广播私聊的设置
	});
	
	//实现定向的群聊的功能的实现 group-to-group
	socket.on('gtog',function(data){
		//当前的发送
		var userid = data.userId;
		var users = data.users; //要求群聊的人
		var content = data.username +'发起了群聊！';
		for(var i=0;i < users.length;i++){
			var uids = users[i];
			if(uids != userid){
				var mess = 'groups_'+uids; //群聊的实现
				socket.broadcast.emit(mess,{'content':content,'userid':uids}); //发起群聊通知
			}
		}
	});
	
	//群聊的发布信息的实现
	
	socket.on('speakToGroup',function(data){
		var userid = data.userId;
		var times = data.times;
		
		for(var i=0;i < g2g.length;i++){
			var uids = g2g[i];
			if(uids != userid){
				var mess = 'groupmessage_'+uids;
				socket.broadcast.emit(mess,{'content':content,'times':times,'userid':uids}); //群聊的信息的实现
			}
		}
	});
})
