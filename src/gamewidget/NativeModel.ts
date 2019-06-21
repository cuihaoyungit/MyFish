/**
* @description: 用户数据类
* @author: LX 2017/03/12
* @version: 1.0
* @modify: 
* @Copyright: 
*/
declare function setupWebViewJavascriptBridge(callback: any);
module gamewidget{
    export class NativeModel extends egret.Sprite{

        //参数
        //private gameParam:JSON;
        private gameParam:any;
        public static nativeBridge;
        public gameApp:base.GameApp = base.GameApp.getInstance();
        public myUser:user.UserModel = user.UserModel.getInstance();
        private server:gamewidget.ServerModel;

        public constructor(){
            super();
            // this.init();
            
        }
        private nativeevent:NativeEvent = new NativeEvent(NativeEvent.NATIVE);
        
        public init(){
            if(DEBUG){
                this.nativeevent.strdata = "{\"DeviceType\":\"1\",\"MobileCode\":\"435a48fb0db13e6c3344d7638bf3de0d\",\"chatRoomID\":\"602537\",\"gameId\":\"21\",\"gameRoomID\":\"21\",\"ip\":\"wss://gamefish.qiyuexiu.com\",\"port\":\"40003\",\"sub_channel\":\"3-10\",\"token\":\"398987825eb0b4fa4193a4ec200bf1b6\",\"userId\":\"604495\"}";
                this.dispatchEvent(this.nativeevent);
            }
           
            if(base.GameApp.isDebug){
                if (base.GameApp.isDebug) {
                    egret.log( 'TEST_MODLE ' );
                } 
                return;
            }




            if(!base.GameApp.isDebug) 
            {
                //注册于oc交互的函数
                setupWebViewJavascriptBridge((bridge) =>{
                    //保存全局bridge
                    NativeModel.nativeBridge = bridge;
                    //注册startGame函数给native调用
                    bridge.registerHandler('n2j_StartGame', (data, responseCallback)=> {
                        this.mobiStartGame(data);
                        if(responseCallback) responseCallback(data);
                    });
                    // 注册enterExitRoom函数给native调用
                    bridge.registerHandler('n2j_EnterExitLiveRoom', (data, responseCallback)=> {
                        
                        this.mobiEnterExitLiveRoom(data);
                        if(responseCallback) responseCallback(data);
                    });                    
                    
                    //注册enterExitRoom函数给native调用
                    bridge.registerHandler('n2j_EnterExitApp', (data, responseCallback)=> {
                        
                        this.mobiEnterExitApp(data);
                        if(responseCallback) responseCallback(data);
                    });
                    
                    //注册enterExitRoom函数给native调用
                    bridge.registerHandler('n2j_EnterExitGameRoom', (data, responseCallback)=> {
                        egret.log("EnterExit"+1551);
                        this.mobiEnterExitGameRoom(data);
                        if(responseCallback) responseCallback(data);
                    });

                    //更新金币余额
                    bridge.registerHandler('n2j_UpdateBeanValue', (data, responseCallback)=> {       
                        
                        // GoldEggs.Toast.launch("n2j_UpdateBeanValue");
                        // this.gameApp.gameScene.goldPay.setGold(data);
                    
                        if(responseCallback) responseCallback(data);
                    });

                    //通知native加载完成
                    bridge.callHandler('j2n_LoadReady', {'data':''}, function responseCallback(responseData) {
                        //console.log("JS received response:", responseData)
                        egret.log("j2n_LoadReady");
                    });
                    
                });
             }
             else
             {
                //  this.gameApp.gameServer.createWebSocket({});     
             } 

        }

        private mobiEndGame( ) {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_EndGame', { 'data': "" }, function responseCallback(responseData) {
                    console.log("JS received response:", responseData);
                });
            }
        }

        private mobiEnterExitApp( data:any ) {
            //  if( data == "1" )  // 重新链接
            //  {
            //      this.gameApp.gameServer.connectTimer.setLastTime(new Date().getTime());
            //  }
            //  else
            //  {
            //     this.gameApp.gameServer.connectTimer.setLastTime(0);                
            //  }
        }

        private mobiEnterExitLiveRoom( data:any ) {
            if( data == "0" )
            {
                this.gameApp.gameServer.requireCloseSocket();
                this.gameApp.gameServer.exitGame({});
                egret.log( "向服务器发送断线请求" );
                
            } 
        }

        private mobiEnterExitGameRoom( data:any ) {
            egret.log("EnterExit"+data);
            if (typeof( data ) == "string") {
                // data = data.split("#");
                // this.gameApp.gameScene.goldPay.setGold( data[1]);
                
                if(data=="0"){
                     this.gameApp.gameServer.requireCloseSocket();
                }else{
                    this.gameApp.gameServer.reConnectToServer();
                }
            } 

            // this.gameApp.gameServer.enterExitGame({ type: parseInt(data[0]),_gold: parseInt(data[1]), userId: this.myUser.userId });            
        }
       
        //游戏被调用开始
        private mobiStartGame( data:any ) {
            
        
            if(RELEASE){
                // this.server.testCreateSocket(this.gameParam);
                // this.gameApp.gameServer.createWebSocket(this.gameParam);
                egret.log("从手机获得数据"+data);
                this.nativeevent.strdata =  data+"";
                this.dispatchEvent(this.nativeevent);
            }
            
            // createWebSocket(this.gameParam);
        }


        //充值按钮 通知native
        public payButton():void {

            if (!base.GameApp.isDebug)
            {
                NativeModel.nativeBridge.callHandler('j2n_PayButton', {}, function responseCallback(responseData) {
                    egret.log("JS received response:", responseData);
                });
            }
        }

        // 砸蛋成功获取到礼物，通知native
        public hitGoldEggSuccess(e:any):void
        {
            if (!base.GameApp.isDebug)
            {
                NativeModel.nativeBridge.callHandler('j2n_HitGoldEggSuccess', {'gift_id':e.gift_id, 'bagNum':e.bagNum,'gold':e.gold}, function responseCallback(responseData) {
                    egret.log("JS received response:", responseData);
                });
            }
        }

        //更新积分 通知native
        public updateScore(e:any):void {
            
            if (!base.GameApp.isDebug) {
                
                NativeModel.nativeBridge.callHandler('j2n_UpdateScore', { 'score': e.score , 'target_after_IncomeGold': e.target_after_IncomeGold }, function responseCallback(responseData) {
                    if(base.GameApp.isDebug){
                        egret.log("JS received response:", responseData);
                    }
                    
                });
            }

        }

        //更新金币 通知native
        public updateMoney(money:number):void {

            if (RELEASE) {
                NativeModel.nativeBridge.callHandler('j2n_UpdateMoney', { 'money': money }, function responseCallback(responseData) {
                    console.log("JS received response:", responseData);
                });
            }

        }
            //登录成功 通知native
        public loginSuccess():void {
            if (!base.GameApp.isDebug) {
                NativeModel.nativeBridge.callHandler('j2n_LoginSuccess', {'data':''}, function responseCallback(responseData) {
                    console.log("JS received response:", responseData);
                });
            }
        }

        /**
         * 销毁
         */
        public destroy():void {
        }

    }
}