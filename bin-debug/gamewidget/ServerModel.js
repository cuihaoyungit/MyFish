var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var gamewidget;
(function (gamewidget) {
    var ServerModel = (function (_super) {
        __extends(ServerModel, _super);
        function ServerModel() {
            var _this = _super.call(this) || this;
            _this.deviceType = -2;
            _this.gameParam = {
                port: 8888,
                ip: "ws://192.168.122.141",
                userId: 233669728,
                token: "5f97df0f6d1623b91bf0bdcc52ad5a66",
                chatRoomID: 40009,
                gameId: 31,
                gameRoomID: 31,
                DeviceType: 1,
                sub_channel: "5-2",
                MobileCode: "0705881d0f2cf29f83ee2aa422dc2e7d"
            };
            //切换状态
            _this.isInGameRoom = true;
            //===========================解析数据======================
            _this.myUser = user.UserModel.getInstance();
            return _this;
            //   this.initNative();
        }
        ServerModel.prototype.init = function () {
            this.socketevent = new SocketEvent(SocketEvent.SOCKET);
            this.nativieModel = new gamewidget.NativeModel();
            this.nativieModel.addEventListener(NativeEvent.NATIVE, this.getNativeAction, this);
            this.nativieModel.init();
        };
        /*
        "{
            "DeviceType":"1",
            "MobileCode":"435a48fb0db13e6c3344d7638bf3de0d",
            "chatRoomID":"602537",
            "gameId":"21",
            "gameRoomID":"21",
            "ip":"wss://gamefish.qiyuexiu.com",
            "port":"40003",
            "sub_channel":"3-10",
            "token":"398987825eb0b4fa4193a4ec200bf1b6",
            "userId":"604495"
        }"
        */
        //
        // Debug 模式下，从NativeModel中传递时间，可以在模拟的时候注意下参数
        //
        ServerModel.prototype.getNativeAction = function (nativeaction) {
            egret.log("收到native消息");
            this.testCreateSocket(nativeaction.strdata);
        };
        ServerModel.prototype.registerFunc = function (e) {
            e = e.data;
            switch (e.key) {
                default: break;
            }
        };
        ServerModel.prototype.destroy = function () {
        };
        ServerModel.prototype.exitLiveRoom = function (data) {
            if (true) {
                egret.log("向服务器发送断线请求");
            }
            this.requireCloseSocket();
        };
        ServerModel.prototype.exitGame = function (data) {
            this.destorySocket();
            this.connectTimer.killTimer();
        };
        //创建网络
        ServerModel.prototype.createWebSocket = function (e) {
            if (true) {
                egret.log("开始赋值");
                if (e.ip) {
                    this.gameParam.ip = e.ip;
                    if (true) {
                        egret.log('mobiStartGame: ' + e.ip);
                    }
                }
                if (e.port)
                    this.gameParam.port = e.port;
                if (e.gameRoomID)
                    this.gameParam.gameRoomID = e.gameRoomID;
                if (e.gameId)
                    this.gameParam.gameId = e.gameId;
                if (e.chatRoomID)
                    this.gameParam.chatRoomID = e.chatRoomID;
                if (e.DeviceType) {
                    this.gameParam.DeviceType = e.DeviceType;
                    this.deviceType = e.DeviceType;
                }
                if (e.sub_channel)
                    this.gameParam.sub_channel = e.sub_channel;
                if (e.MobileCode)
                    this.gameParam.MobileCode = e.MobileCode;
            }
            this.createSocket();
        };
        // 供外部临时测试调用
        ServerModel.prototype.testCreateSocket = function (e) {
            egret.log(e + "");
            this.parseTheData(e);
            // if( e.ip )
            // {
            //     this.gameParam.ip = e.ip;         
            //     egret.log( 'mobiStartGame: ' + e.ip );
            // }
            // if( e.port ) this.gameParam.port = e.port;
            // if( e.gameRoomID ) this.gameParam.gameRoomID = e.gameRoomID;
            // if( e.gameId ) this.gameParam.gameId = e.gameId;
            // if( e.chatRoomID ) this.gameParam.chatRoomID = e.chatRoomID;
            // if( e.DeviceType )
            // {
            //     this.gameParam.DeviceType = e.DeviceType;
            //     this.deviceType =  e.DeviceType;
            // }
            // if( e.sub_channel ) this.gameParam.sub_channel = e.sub_channel;
            // if( e.MobileCode ) this.gameParam.MobileCode = e.MobileCode;  
        };
        ServerModel.prototype.createSocket = function () {
            //创建 WebSocket 对象
            if (this.mySocket == null) {
            }
            this.mySocket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this.mySocket.type = egret.WebSocket.TYPE_STRING;
            //添加收到数据侦听，收到数据会调用此方法
            this.mySocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.mySocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.mySocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.mySocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.connectToServer();
            //初始化缓冲区
            this.buffer = new egret.ByteArray();
        };
        ServerModel.prototype.getWebSocket = function () {
            return this.mySocket;
        };
        ServerModel.prototype.destorySocket = function () {
            egret.log("销毁socket！");
            if (this.mySocket != null) {
                this.mySocket.close();
                this.connectTimer.killTimer();
                this.mySocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
                this.mySocket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
                this.mySocket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
                this.mySocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
                this.mySocket = null;
                this.buffer = null;
            }
        };
        ServerModel.prototype.connectToServer = function () {
            //连接服务器
            egret.log("连接中...");
            gamewidget.Toast.launch("连接中...");
            var bTest = true;
            if (bTest) {
                try {
                    var port = parseInt(this.gameParam.port);
                    this.mySocket.connectByUrl(this.gameParam.ip + ":" + port);
                    egret.log(this.gameParam.sub_channel);
                }
                catch (e) {
                    egret.log("连接出错" + e);
                    gamewidget.Toast.launch("连接出错");
                    gamewidget.NativeModel.nativeBridge.callHandler('j2n_exception', { 'data': "连接出错" + e }, function responseCallback(responseData) {
                        egret.log("j2n_exception");
                    });
                }
            }
            else {
                this.mySocket.connectByUrl(this.gameParam.ip + ":" + this.gameParam.port);
            }
        };
        //连接成功
        ServerModel.prototype.onSocketOpen = function () {
            egret.log("服务器连接成功");
            gamewidget.Toast.launch("服务器连接成功");
            this.connectTimer = new gamewidget.ConnectTimer();
            this.connectTimer.createTimer();
            this.connetFailedTimes = 0;
            this.connectTimer.setLastTime(null);
            this.login();
        };
        ServerModel.prototype.login = function () {
            egret.log("正在登录...");
            gamewidget.Toast.launch("正在登录...");
            this.sendLogin({
                userId: parseInt(this.gameParam.userId),
                token: this.gameParam.token,
                gameRoomID: parseInt(this.gameParam.gameRoomID),
                chatRoomID: parseInt(this.gameParam.chatRoomID),
                DeviceType: parseInt(this.gameParam.DeviceType),
                sub_channel: this.gameParam.sub_channel,
                MobileCode: this.gameParam.MobileCode
            });
        };
        // 主动断开
        ServerModel.prototype.closeSocket = function () {
            egret.log("主动断开连接");
            this.mySocket.close();
            this.connectTimer.killTimer();
        };
        //连接断开
        ServerModel.prototype.onSocketClose = function () {
            var _this = this;
            egret.log("连接断开");
            var t = egret.setTimeout(function () {
                _this.connectToServer();
                egret.clearTimeout(t);
            }, this, 2000);
            this.connetFailedTimes++;
        };
        ServerModel.prototype.reConnectToServer = function () {
            egret.log("开始重连服务端");
            this.destorySocket();
            this.createSocket();
            // this.connectToServer();
        };
        //错误通知
        ServerModel.prototype.onSocketError = function (e) {
            egret.log("连接异常");
            egret.log("error:: type: " + e.type);
            egret.log("error:: data: " + e.data);
        };
        //发送数据
        ServerModel.prototype.sendData = function (data) {
            data = JSON.stringify(data);
            if (!this.mySocket.connected)
                return;
            this.mySocket.writeUTF(data);
            this.mySocket.flush();
        };
        //处理心跳
        ServerModel.prototype.onTimerHeartBeat = function () {
            this.sendHeartBeat();
        };
        ///事件请求函数封装区
        ///--------------------------------------------------------------------------------
        //
        //发送登录
        ServerModel.prototype.sendLogin = function (data) {
            data["Msg"] = ServerModel.LOGIN_SERVER;
            this.sendData(data);
            if (true) {
                console.log("sendLogin:", data);
            }
        };
        //请求断线
        ServerModel.prototype.requireCloseSocket = function () {
            egret.log("2");
            var data = {};
            data["Msg"] = ServerModel.CLOSE_SOCKET;
            data["userId"] = parseInt(this.gameParam.userId);
            this.sendData(data);
            egret.log("断线请求已发送，断线用户ID：" + data["userId"]);
            egret.log("requireCloseSocket: /" + data["Msg"] + "/ at " + new Date().toTimeString());
        };
        ServerModel.prototype.switchState = function (state, gold, ispc) {
            if (state == 0) {
                if (!ispc) {
                    this.isInGameRoom = false;
                }
            }
            else if (state == 1) {
                this.isInGameRoom = true;
            }
            var data = {};
            data["Msg"] = ServerModel.CHANGE_STATE;
            data["userId"] = parseInt(this.gameParam.userId);
            data["type"] = state;
            data["_gold"] = gold;
            this.sendData(data);
        };
        //捕鱼
        ServerModel.prototype.catchFish = function (data) {
            if (this.isInGameRoom) {
                data["Msg"] = ServerModel.CATCH_FISHS;
                data["userId"] = parseInt(this.gameParam.userId);
                this.sendData(data);
            }
        };
        //发送心跳
        ServerModel.prototype.sendHeartBeat = function () {
            var data = {};
            data["Msg"] = ServerModel.HEART_BEATS;
            this.sendData(data);
            if (true) {
                // console.log("sendHeartBeat: /" + data["Msg"] + "/ at " + new Date().toTimeString());
            }
        };
        ServerModel.prototype.parseTheData = function (data) {
            this.gameParam = JSON.parse(data + "");
            // if (typeof(this.gameParam["gameRoomID"]) == "string") {
            //     this.gameParam["gameRoomID"] = parseInt(this.gameParam["gameRoomID"]);
            // }
            // if (typeof(this.gameParam["chatRoomID"]) == "string") {
            //     this.gameParam["chatRoomID"] = parseInt(this.gameParam["chatRoomID"]);
            // }
            // if (typeof(this.gameParam["gameId"]) == "string") {
            //     this.gameParam["gameId"] = parseInt(this.gameParam["gameId"]);
            // }
            // if (typeof(this.gameParam["DeviceType"]) == "string") {
            //     this.gameParam["DeviceType"] = parseInt(this.gameParam["DeviceType"]);
            // }
            // if (typeof(this.gameParam["sub_channel"]) == "string") {
            //     this.gameParam["sub_channel"] = this.gameParam["sub_channel"];
            // }
            // if (typeof(this.gameParam["MobileCode"]) == "string") {
            //     this.gameParam["MobileCode"] = this.gameParam["MobileCode"];
            // }
            // if (typeof(this.gameParam["port"]) == "string") {
            //     this.gameParam["port"] = parseInt(this.gameParam["port"]);
            // }
            // if (typeof(this.gameParam["ip"]) == "string") {
            //     this.gameParam["ip"] = this.gameParam["ip"];
            // }
            // if (typeof(this.gameParam["userId"]) == "string") {
            //     this.myUser.userId = parseInt(this.gameParam["userId"]);
            // }
            // if (typeof(this.gameParam["token"]) == "string") {
            //     this.myUser.token = this.gameParam["token"];    
            // }
            this.createSocket();
        };
        ///接收服务器消息数据
        //-------------------------------------------------------------------------------------
        //
        ServerModel.prototype.onReceiveMessage = function (e) {
            var msg = this.mySocket.readUTF(); //读取字符串
            var jsonData = JSON.parse(msg); //解析成json对象
            switch (jsonData.Msg) {
                case ServerModel.LOGIN_SERVER://登录成功
                    gamewidget.Toast.launch("登录成功");
                    egret.log("登录成功" + msg);
                    this.socketevent.strjson = msg; //建立msg数据包
                    this.dispatchEvent(this.socketevent); //发送数据包
                    if (this.HeartIntvel) {
                        egret.clearInterval(this.HeartIntvel);
                    }
                    this.HeartIntvel = egret.setInterval(this.onTimerHeartBeat, this, 6 * 1000);
                    break;
                case ServerModel.CLOSE_SOCKET:
                    console.log("收到断线请求返回，断线用户ID：" + jsonData["userId"]);
                    this.destorySocket();
                    break;
                case ServerModel.PRODUCE_FISH:
                    this.socketevent.strjson = msg; //建立msg数据包
                    this.dispatchEvent(this.socketevent); //发送数据包
                    break;
                case ServerModel.CATCH_FISHS:
                    this.socketevent.strjson = msg; //建立msg数据包
                    this.dispatchEvent(this.socketevent); //发送数据包
                    break;
                case ServerModel.CHANGE_STATE:
                    this.socketevent.strjson = msg;
                    this.dispatchEvent(this.socketevent);
                    break;
                default: break;
            }
        };
        ServerModel.LOGIN_SERVER = 30001; // 登录成功
        ServerModel.CLOSE_SOCKET = 20004; // 断开链接
        ServerModel.HEART_BEATS = 22; // 心跳包协议
        ServerModel.CHANGE_STATE = 20000; //切换
        ServerModel.ENTER_ROOM_RES = 20001; //进房间游戏返回值
        ServerModel.PRODUCE_FISH = 20002; //出鱼
        ServerModel.CATCH_FISHS = 20003; //捕鱼
        return ServerModel;
    }(egret.Sprite));
    gamewidget.ServerModel = ServerModel;
    __reflect(ServerModel.prototype, "gamewidget.ServerModel");
})(gamewidget || (gamewidget = {}));
