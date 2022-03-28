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
    var NativeModel = (function (_super) {
        __extends(NativeModel, _super);
        function NativeModel() {
            var _this = _super.call(this) || this;
            _this.gameApp = base.GameApp.getInstance();
            _this.myUser = user.UserModel.getInstance();
            _this.nativeevent = new NativeEvent(NativeEvent.NATIVE);
            return _this;
            // this.init();
        }
        NativeModel.prototype.init = function () {
            var _this = this;
            if (true) {
                this.nativeevent.strdata = "{\"DeviceType\":\"1\",\"MobileCode\":\"435a48fb0db13e6c3344d7638bf3de0d\",\"chatRoomID\":\"602537\",\"gameId\":\"21\",\"gameRoomID\":\"21\",\"ip\":\"ws://192.168.122.141\",\"port\":\"8888\",\"sub_channel\":\"3-10\",\"token\":\"398987825eb0b4fa4193a4ec200bf1b6\",\"userId\":\"604495\"}";
                this.dispatchEvent(this.nativeevent);
            }
            if (base.GameApp.isDebug) {
                if (base.GameApp.isDebug) {
                    egret.log('TEST_MODLE ');
                }
                return;
            }
            if (!base.GameApp.isDebug) {
                //注册于oc交互的函数
                setupWebViewJavascriptBridge(function (bridge) {
                    //保存全局bridge
                    NativeModel.nativeBridge = bridge;
                    //注册startGame函数给native调用
                    bridge.registerHandler('n2j_StartGame', function (data, responseCallback) {
                        _this.mobiStartGame(data);
                        if (responseCallback)
                            responseCallback(data);
                    });
                    // 注册enterExitRoom函数给native调用
                    bridge.registerHandler('n2j_EnterExitLiveRoom', function (data, responseCallback) {
                        _this.mobiEnterExitLiveRoom(data);
                        if (responseCallback)
                            responseCallback(data);
                    });
                    //注册enterExitRoom函数给native调用
                    bridge.registerHandler('n2j_EnterExitApp', function (data, responseCallback) {
                        _this.mobiEnterExitApp(data);
                        if (responseCallback)
                            responseCallback(data);
                    });
                    //注册enterExitRoom函数给native调用
                    bridge.registerHandler('n2j_EnterExitGameRoom', function (data, responseCallback) {
                        egret.log("EnterExit" + 1551);
                        _this.mobiEnterExitGameRoom(data);
                        if (responseCallback)
                            responseCallback(data);
                    });
                    //更新金币余额
                    bridge.registerHandler('n2j_UpdateBeanValue', function (data, responseCallback) {
                        // GoldEggs.Toast.launch("n2j_UpdateBeanValue");
                        // this.gameApp.gameScene.goldPay.setGold(data);
                        if (responseCallback)
                            responseCallback(data);
                    });
                    //通知native加载完成
                    bridge.callHandler('j2n_LoadReady', { 'data': '' }, function responseCallback(responseData) {
                        //console.log("JS received response:", responseData)
                        egret.log("j2n_LoadReady");
                    });
                });
            }
            else {
                //  this.gameApp.gameServer.createWebSocket({});     
            }
        };
        NativeModel.prototype.mobiEndGame = function () {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_EndGame', { 'data': "" }, function responseCallback(responseData) {
                    console.log("JS received response:", responseData);
                });
            }
        };
        NativeModel.prototype.mobiEnterExitApp = function (data) {
            //  if( data == "1" )  // 重新链接
            //  {
            //      this.gameApp.gameServer.connectTimer.setLastTime(new Date().getTime());
            //  }
            //  else
            //  {
            //     this.gameApp.gameServer.connectTimer.setLastTime(0);                
            //  }
        };
        NativeModel.prototype.mobiEnterExitLiveRoom = function (data) {
            if (data == "0") {
                this.gameApp.gameServer.requireCloseSocket();
                this.gameApp.gameServer.exitGame({});
                egret.log("向服务器发送断线请求");
            }
        };
        NativeModel.prototype.mobiEnterExitGameRoom = function (data) {
            egret.log("EnterExit" + data);
            if (typeof (data) == "string") {
                // data = data.split("#");
                // this.gameApp.gameScene.goldPay.setGold( data[1]);
                if (data == "0") {
                    this.gameApp.gameServer.requireCloseSocket();
                }
                else {
                    this.gameApp.gameServer.reConnectToServer();
                }
            }
            // this.gameApp.gameServer.enterExitGame({ type: parseInt(data[0]),_gold: parseInt(data[1]), userId: this.myUser.userId });            
        };
        //游戏被调用开始
        NativeModel.prototype.mobiStartGame = function (data) {
            if (false) {
                // this.server.testCreateSocket(this.gameParam);
                // this.gameApp.gameServer.createWebSocket(this.gameParam);
                egret.log("从手机获得数据" + data);
                this.nativeevent.strdata = data + "";
                this.dispatchEvent(this.nativeevent);
            }
            // createWebSocket(this.gameParam);
        };
        //充值按钮 通知native
        NativeModel.prototype.payButton = function () {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_PayButton', {}, function responseCallback(responseData) {
                    egret.log("JS received response:", responseData);
                });
            }
        };
        // 砸蛋成功获取到礼物，通知native
        NativeModel.prototype.hitGoldEggSuccess = function (e) {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_HitGoldEggSuccess', { 'gift_id': e.gift_id, 'bagNum': e.bagNum, 'gold': e.gold }, function responseCallback(responseData) {
                    egret.log("JS received response:", responseData);
                });
            }
        };
        //更新积分 通知native
        NativeModel.prototype.updateScore = function (e) {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_UpdateScore', { 'score': e.score, 'target_after_IncomeGold': e.target_after_IncomeGold }, function responseCallback(responseData) {
                    if (base.GameApp.isDebug) {
                        egret.log("JS received response:", responseData);
                    }
                });
            }
        };
        //更新金币 通知native
        NativeModel.prototype.updateMoney = function (money) {
            if (false) {
                NativeModel.nativeBridge.callHandler('j2n_UpdateMoney', { 'money': money }, function responseCallback(responseData) {
                    console.log("JS received response:", responseData);
                });
            }
        };
        //登录成功 通知native
        NativeModel.prototype.loginSuccess = function () {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_LoginSuccess', { 'data': '' }, function responseCallback(responseData) {
                    console.log("JS received response:", responseData);
                });
            }
        };
        /**
         * 销毁
         */
        NativeModel.prototype.destroy = function () {
        };
        return NativeModel;
    }(egret.Sprite));
    gamewidget.NativeModel = NativeModel;
    __reflect(NativeModel.prototype, "gamewidget.NativeModel");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=NativeModel.js.map