//创建链接的实现
var SocketIo = io('http://123.57.233.38:3000');
//SocketIo.connect();
userid = 0;
messagepass ='';
SocketIo.on('connect',function(data){
	
		//创建数据的侦听的实现
	SocketIo.on('logined',function(data){
		console.log('您好你已经成功的登入了'+data);
	});
	
	//欢迎的数据的变化的额实现方式和方法
	SocketIo.on('joinedus',function(data){
		console.log(data);
		userid = data.id; //获取当前的用户的ID
		//登入成功后
			
		messagepass = 'getmessage_'+userid+'';
		console.log(messagepass);
		//相关的用户的侦听的信息
		SocketIo.on(messagepass,function(data){
		
			var content = getMessage(data);
			$("#content").append(content);
		});

		//群聊的求情
		SocketIo.on('groups_'+userid,function(data){
			//点击了同意后加入 调用显示显示对话框
			$('#myModal').on('shown.bs.modal', function () {
				//显示弹窗并实现调用
 				SocketIo.emit('join',{'username':'fujing','userId':12});	
			})
			
		});
		
		//群聊的
		SocketIo.on('groupmessage_'+userid,function(data){
			//接收发过来的信息
			var content = getMessage(data); //群聊的信息到页面
			$("#content").append(content);
		});
		
		//私聊的实现
		SocketIo.on('ctoc_'+userid,function(data){
			//私聊的信息调用私聊的面板显示
			var content = getMessage(data);
			$("#content").append(content);
		});
		
		//更新当前的用户的数量
		SocketIo.on('nowusers_'+userid,function(data){
			var users = data.users;
			for(var i = 0; i<users.length; i++){
				
			}
		});
		
	});
	
});

function getMessage(obj){
	var text = '';
	   text +='<li class="odd">'+ 
              '<a class="user" href="#"><img class="img-responsive avatar_" src="images/avatar-1.png" alt=""><span class="user-name">'+obj.username+'</span></a>'+
               ' <div class="reply-content-box">'+
                	'<span class="reply-time">'+obj.times+'</span>'+
                    '<div class="reply-content pr">'+
                    	'<span class="arrow">&nbsp;</span>'+
                    	obj.content
                    +'</div>'
                '</div>'+
            '</li>';
    return text;        
}

function sendMessage(obj){
	var text = '';
	text += '<li class="even">'+
                '<a class="user" href="#"><img class="img-responsive avatar_" src="images/avatar-1.png" alt=""><span class="user-name">'+obj.username+'</span></a>'+
                '<div class="reply-content-box">'+
                	'<span class="reply-time">'+obj.times+'</span>'+
                    '<div class="reply-content pr">'+
                    	'<span class="arrow">&nbsp;</span>'+
                    	obj.content
                    +'</div>'+
                '</div>'+
            '</li>';
    return text;
}

//发送信息到服务器端
$(function(){
	//电价
	$("#sendmessage").click(function(){
		//获取文本框中的值
		var text_value = $("#sendcontent").val();
		var times = new Date().getFullYear();
		//发送信息
		var message = sendMessage({'content':text_value,'times':times}); //页面要追加的内容
		$("#content").append(message);
		//发送到服务器的
		SocketIo.emit('sendmessage',{'content':text_value,'userid':userid,'times':times});
	});
	
	//创建当前的登入的条件按钮呢
	
	$("#login").click(function(){
			var username = $("#username").val();
			var age = $("#age").val();
			var uid = $("#userid").val();
			SocketIo.emit('joinus',{'name':username,'age':age,'uid':uid});
	});
	
	//群聊
	
	$("#groups").click(function(){
		SocketIo.emit('speakToGroup',{'datas':'data','userId':userid}); //发送当前的群聊的请求
	});
	
});


