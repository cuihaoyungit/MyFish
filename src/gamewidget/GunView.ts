/**
* @description: 枪主视图类主视图类
* @author: LX 2017/03/12
* @version: 1.0
* @modify: 
* @Copyright: 
*/
declare function setupWebViewJavascriptBridge(callback: any);
module gamewidget {
    
    export class GunView extends egret.Sprite{

        protected lastTargetX: number; //最后一次发射的终点的x坐标
        protected lastTargetY: number; //最后一次发射的终点的y坐标
        protected lastBulletX: number; //最后一次发射的子弹的x坐标
        protected lastBulletY: number; //最后一次发射的子弹的x坐标 
        protected lastAngle: number; //最后一次发射子弹的方向角度

        protected base: egret.Bitmap; //基座
        protected betScore:gamewidget.BetScore;
        protected gun: egret.Bitmap; //枪
        protected winnum:gamewidget.NumberView;//获得豆
        // protected winnumfish:gamewidget.FishNumberView;//获得豆(显示在鱼上)
        protected shootTime: number; //发射间隔
        protected shot: egret.Bitmap //发射火花的图
        protected space: number; //子弹最远射程
        private isProduceFish = true;
        protected autoInt: Array<number> = []; // 自动索引
        public parent:Main;
        public stageW:number;
        public stageH:number;
        public startFishPos:number;
        public gameSound:gamewidget.SoundModule = gamewidget.SoundModule.getInstance();
        public gameApp:base.GameApp = base.GameApp.getInstance();
        
        public constructor(parent:Main,stageW:number,stageH:number) {
            super();
            this.parent = parent;
            this.stageW = stageW;
            this.stageH = stageH;
            this.startFishPos = stageH/7;
            this.initNative();
           
        }   

        /**
         *对面板进行显示初始化
        *
        */
        private server:gamewidget.ServerModel;
        private goldPay:gamewidget.GoldPay;
        public initUI(server:gamewidget.ServerModel){

            this.base = new egret.Bitmap(); 
            this.base.texture = RES.getRes("gun_base_png"); 
            this.addChild(this.base);

            this.gun = new egret.Bitmap();
            this.gun.texture = RES.getRes("gun_png")                    
            this.addChild(this.gun);

            this.shot = new egret.Bitmap();
            this.shot.texture = RES.getRes("shot_png"); 
            this.addChild(this.shot);


            this.betScore = new gamewidget.BetScore();
            this.betScore.initUI();
            this.addChild(this.betScore);

            // this.winnumfish = new gamewidget.FishNumberView();



            this.open(this.parent,this.stage);
            

            //金币数额
            this.goldPay = new gamewidget.GoldPay();
            this.addChildAt(this.goldPay,this.numChildren-1);
            this.goldPay.x = 10;
            this.goldPay.y = this.stageH - 80;

            this.winnum = new gamewidget.NumberView(this.stageH);//金币数额上方的添加金币特效
            this.addChildAt(this.winnum,this.numChildren-1);

            this.netview = new gamewidget.NetView();//鱼网的对象

            this.server = server;
            this.server.addEventListener(SocketEvent.SOCKET,this.getSocketDate,this);//注册服务器监听事件
            if(DEBUG){
                
                // this.server.testCreateSocket(null);//创建服务器连接
            }
          
        }

      
        public open($parent: any, stage: any):void {         
            
            this.width = this.stageW;
            this.height = this.stageH;
             
            let rate = 1.0;

            this.base.x = 543;
            this.base.y = this.height - this.base.height * rate;

            this.betScore.x = 543;
            this.betScore.y = this.height - this.base.height * rate;

            let gx = this.gun.width / 2;
            let gy = this.gun.height / 2 + 20;
            this.gun.anchorOffsetX = gx;
            this.gun.anchorOffsetY = gy;
            this.gun.x = 552 + gx;
            this.gun.y = this.height - this.gun.height * rate + gy + 15;            
            this.shot.anchorOffsetX = this.shot.width / 2;
            this.shot.anchorOffsetY = this.shot.height / 2;  

            this.base.scaleX = this.base.scaleY = rate;
            this.gun.scaleX = this.gun.scaleY = rate;
            this.shot.scaleX = this.shot.scaleY = rate;
            this.shot.alpha = 0;
            this.space = Math.sqrt( Math.pow( this.width , 2 ) +  Math.pow( this.height , 2 ) ); 
            
            this.lastAngle = 0;
            this.gunReady();

        }

////////////////////////////---- 自动发炮 ----/////////////////////////// 

        /**
         * 停止托管
         * @param param 参数
         */
        public stopAutoPlay(){
            IS_AUTO_SHOOT = false;
            this.stopAutoShoot();
        }

        /**
         * 开始托管
         * @param param 参数
         */
        public startAutoPlay(){
            IS_AUTO_SHOOT = true;
            if( this.autoInt.length > 0 ){
                this.stopAutoShoot();
            }
            this.startAutoShoot();
        }

        /**
         * 停止自动出炮
         * @param param 参数
         */
        protected stopAutoShoot(){
            this.autoInt.forEach((e)=>{
                egret.clearInterval(e);
            });
           // this.autoInt.splice( 0,this.autoInt.length );

        }
        
        /**
         * 开始自动出炮
         * @param param 参数
         */
        protected startAutoShoot(){
            let i = egret.setInterval(()=>{
                this.shootTheBullet( this.lastTargetX, this.lastTargetY );
            },this,300);
            
            this.autoInt.unshift(i);
        }
//////////////////////////////////////////////////////////////////////// 

////////////////////////////---- 出鱼 ----///////////////////////////
        private fishs:gamewidget.Fish[] = [];
        private fishcount:number = 0;
        public produceFish(position:number,lAndr:number,fishtype:number){//0为左1为右

            this.fishcount++;
            let nowtype = this.transType(fishtype)[0];
            let fspeed = this.transType(fishtype)[1];
            var theFish:gamewidget.Fish = gamewidget.Fish.produce(nowtype);
            theFish.setCount(this.fishcount);
            theFish.setType(fishtype);
            // egret.log("fishtype="+nowtype);
            if(lAndr==0){
                theFish.x = 0 - theFish.width;
                theFish.y = this.startFishPos*position;
                theFish.skewY = 180;
                this.addChildAt(theFish,10);
                this.fishs.push(theFish);
                egret.Tween.get(theFish).to({x:this.stageW+theFish.width,y:this.startFishPos*position},fspeed*1000,egret.Ease.sineIn).call(()=>{//鱼的速度
                this.fishs.splice(this.fishs.indexOf(theFish),1);
                this.removeChild(theFish);
            });
            }else if(lAndr==1){
                theFish.x = this.stageW + theFish.width;
                theFish.y = this.startFishPos*position;
                this.addChildAt(theFish,10);
                this.fishs.push(theFish);
                egret.Tween.get(theFish).to({x:0-theFish.width,y:this.startFishPos*position},fspeed*1000,egret.Ease.sineIn).call(()=>{//鱼的速度
                this.fishs.splice(this.fishs.indexOf(theFish),1);
                this.removeChild(theFish);
            });
            }
           
        }
    private pfishcount:number;
    private netview:gamewidget.NetView;//网的对象
         /**游戏碰撞检测*/
        private gameHitTest(bullet , bulletInt):void {

            var j:number;
            // var fishCount:number;
            var thefish:gamewidget.Fish;
            this.pfishcount = this.fishs.length;
             for(j=0;j<this.pfishcount;j++) {
                 thefish = this.fishs[j];
                if(thefish.$hitTest(bullet.x,bullet.y)){
                    
                    this.killBullet(bullet,bulletInt);
                    this.netview.open(bullet.x,bullet.y,this);//开网
                    //消除被打中的鱼
                    // egret.Tween.removeTweens(thefish);
                    // this.removeChild(thefish);
                    // this.fishs.splice(this.fishs.indexOf(thefish),1);
                    // fishCount--;
                    this.gameSound.playSound({name:"hit_fish_sound"});
                    // egret.log("属于"+thefish.getType()+"类鱼");
                    let data = {};
                    data["fishNo"] = thefish.getType();
                    data["bulletnum"] = BetScore.value;
                    data["hashcode"] = thefish.hashCode;
                    let x:number = parseInt(thefish.x.toFixed(0));
                    let y:number = parseInt(thefish.y.toFixed(0));
                    data["x"] = x;
                    data["y"] = y;
                    // this.goldPay.delGold(BetScore.value);//扣币
                    this.server.catchFish(data);
                    break;
                }
             }
                    

            
        }

//////////////////////////////////////////////////////////////////////// 

////////////////////////////---- 手动发炮 ----///////////////////////////

        /**
         * 手指触摸桌面开始
         * @param param 参数
         */
        public tapStart( e: egret.TouchEvent ){
            if( !IS_AUTO_SHOOT && this.shootTime ){
                //非自动托管时并存在上次触摸时间戳，50毫秒内不得发炮
                let now = new Date().getTime();
                if( now - this.shootTime  < 50 ) return;
            }

            //当前触摸时时间戳
            this.shootTime = new Date().getTime();

            this.tapTheGun(e); //转向
            this.gunReady(); //瞄准
            if( IS_AUTO_SHOOT ) return; //托管状态下只瞄准 不主动发炮
            this.shootTheBullet( this.lastTargetX, this.lastTargetY ); //发炮

        }

        /**
         * 取得手指点击的坐标
         * @param param 参数
         */
        protected tapTheGun(e: egret.TouchEvent){

            let x = e.stageX , y = e.stageY;
            this.turnTheGun(x,y);
            
        }

        /**
         * 根据点击的坐标调整炮的角度
         * @param param 参数
         */
        protected turnTheGun( x: number, y:number ){
          
            let diff_x = x - this.gun.x ,
                diff_y = y - this.gun.y;
            //返回角度,不是弧度
            
            let angle: number;
            if( diff_y >= 0 ){
                if( diff_y == 0 && diff_x == 0 ){
                    angle = 0;
                }else{
                    angle = diff_x < 0 ? - 75 : 75;
                }   
            }else{
                angle = 360 * Math.atan( diff_y / diff_x ) / ( 2 * Math.PI );
                angle = angle > 0 ? -1 * ( 90 - angle ) : 90 + angle;
                angle = angle > 75 ? 75 : angle;
                angle = angle < -75 ? -75 : angle;
            }

            this.lastAngle =  this.gun.rotation = angle;
 
        }

        /**
         * 瞄准目标
         * @param param 参数
         */
        protected gunReady(){

            this.getBulletPos();
            this.getShootTargetXY();

        }

        /**
         * 计算子弹坐标位置
         * @param param 参数
         */

        protected getBulletPos(){

            let angle = this.lastAngle;
            let ng = Math.abs(angle) * ( 2 * Math.PI ) / 360;
            let r = 115;//发射炮弹半径
            let tempX = Math.sin(ng) * r , tempY = Math.cos(ng) * r 
            this.lastBulletX = angle > 0 ? this.gun.x + tempX : this.gun.x - tempX;
            this.lastBulletY = this.gun.y - tempY;  

        }

        /**
         * 生成子弹
         * @param param 参数
         */
        protected setBulletPos( bullet: egret.Bitmap ){

            this.shot.x = bullet.x = this.lastBulletX;
            this.shot.y = bullet.y = this.lastBulletY;
            
            bullet.rotation = this.shot.rotation = this.lastAngle;         
            this.shot.alpha = 1;

        }

        /**
         * 计算子弹最终停止目标坐标（未碰到鱼儿的情况下）
         * @param param 参数
         */
        protected getShootTargetXY(){

            let angle = this.lastAngle; 
            let ng = Math.abs(angle) * ( 2 * Math.PI ) / 360;
            
            let tempX = Math.sin(ng) * this.space , tempY = Math.cos(ng) * this.space;
            this.lastTargetX = angle > 0 ? this.gun.x + tempX : this.gun.x - tempX; 
            this.lastTargetY = this.gun.y - tempY; 

        }
//////////////////////////////////////////////////////////////////////// 

////////////////////////////---- 发炮过程 ----///////////////////////////
        
        /**
         * 发射子弹
         * @param param 参数
         */
        
        protected shootTheBullet( x: number, y: number ){
            var bullet:gamewidget.Bullet = gamewidget.Bullet.produce("bullet_png",0,0);

            // this.bullet =  this.createBitmapByName("bullet_png");
                   
            this.setBulletPos(bullet); //子弹就位
            this.parent.addChildAt(bullet,6);
            //播放子弹声音
            this.gameSound.playSound({name:"gun_shot"});
            //发炮！！！
            this.fireNow( x, y, bullet);
            
        }

        /**
         * 发炮！！！
         * @param param 参数
         */
        protected fireNow(x, y, bullet){

            let bulletInt = egret.setInterval(()=>{        
                this.touchEdge( bullet, this.width, this.height, bulletInt ); //子弹碰到桌面边缘的检测
                // this.parent['testCatchAllFish']( bullet, bulletInt ) //子弹碰到鱼的检测   
                this.gameHitTest(bullet,bulletInt);           
            },this,100);
            this.fire( x, y, bullet );
        }

        /**
         * 开火！！！
         * @param param 参数
         */
        protected fire( x, y, bullet ){
            egret.Tween.get( bullet ).to( { x , y }, this.space / 1000 * 1000 );
            egret.Tween.get( this.shot ).wait(200).to( { alpha: 0 }, 500 );
        }

        /**
         * 开始张网抓鱼
         * @param param 参数
         */
        public catchTheFish( hashCode, num, bullet, bulletInt){

            // lxCore.MyEvent.applyFunc( SoundEvent.NAME, SoundEvent.PLAY_SOUND, { name: "hit_fish_sound" });   
            // let net = lxCore.App.ViewManagers.getAView("net",NetView,this.myController);
            // lxCore.App.ViewManagers.open( net, this, { x: bullet.x, y: bullet.y, index: hashCode, num: num  } );    
            //开网                                           
            // this.killBullet( bullet ,bulletInt); 

        }

        /**
         * 子弹碰到桌面边缘的检测
         * @param param 参数
         */
        protected touchEdge(bullet,w,h,bulletInt){
           
            if( bullet.x < 0 ){           
                this.bounceBack(1,bullet,w,h,bulletInt);              
            }else if( bullet.y < 0){
                this.bounceBack(2,bullet,w,h,bulletInt);
            }else if( bullet.x > w ){
                this.bounceBack(3,bullet,w,h,bulletInt);
            }else if( bullet.y > h ){
                 this.bounceBack(4,bullet,w,h,bulletInt);          
            }
           
        }

        protected bounceBack(type,bullet,w,h,bulletInt){

            let x1:number = 0, y1:number = 1;          
            egret.Tween.removeTweens( bullet );  

            let xn:number = bullet.x;    
            let yn:number = bullet.y;
            let hu:number = ( 2 * Math.PI ) / 360;
            let rotation:number = bullet.rotation;

            if( type == 1){   

                let gayn = ( 0 - xn ) * Math.tan( Math.abs(( Math.abs( rotation ) - 90 ) * hu ) );
                bullet.y = rotation > -90 ? yn - gayn : yn + gayn;
                bullet.x = 0;
                let angle = bullet.rotation =  Math.abs(rotation);

                angle = angle > 90 ? ( 180 - angle ) : angle;
                let ng = Math.abs(angle) * ( 2 * Math.PI ) / 360;              
                let tempX = Math.sin(ng) * this.space , tempY = Math.cos(ng) * this.space;
                x1 = bullet.x + tempX; 
                y1 = bullet.rotation <= 90 ? bullet.y - tempY : bullet.y + tempY;
                
    
            }else if( type == 2 ){

                let gaxn = ( 0 - yn ) * Math.tan( Math.abs( rotation ) * hu );
                bullet.x = rotation > 0 ? xn - gaxn : xn + gaxn;
                bullet.y = 0;

                let angle = bullet.rotation = rotation > 0 
                    ? rotation + 2 * ( 90 - rotation)
                    : rotation - 2 * ( 90 - Math.abs(rotation)); 

                angle = 180 - Math.abs(angle);
                
                let ng = Math.abs(angle) * hu;              
                let tempX = Math.sin(ng) * this.space , tempY = Math.cos(ng) * this.space;
                x1 = bullet.rotation > 0 ? bullet.x + tempX : bullet.x - tempX ; 
                y1 = bullet.y + tempY;
                

            }else if( type == 3 ){
                
                let gayn = ( xn - w ) * Math.tan( ( Math.abs( rotation  - 90 ) ) * hu );
                bullet.y = rotation > 90 ? yn - gayn : yn + gayn;
                bullet.x = w;

                let angle = bullet.rotation = -1 *  rotation ;
                angle = angle >= -90 ? Math.abs(angle) : 180 - Math.abs(angle);
                let ng = angle * hu;              
                let tempX = Math.sin(ng) * this.space , tempY = Math.cos(ng) * this.space;
                x1 = bullet.x - tempX ; 
                y1 = bullet.rotation >= -90 ? bullet.y - tempY : bullet.y + tempY;


            }else if( type == 4 ){

                let gaxn = ( yn - h ) * Math.tan( (180 - Math.abs( rotation )) * hu );
                bullet.x = rotation > 0 ? xn - gaxn : xn + gaxn;
                bullet.y = h;

                let angle = bullet.rotation = rotation > 0 
                    ? rotation - 2 * ( rotation - 90 )
                    : rotation + 2 * ( Math.abs(rotation) - 90 ) ; 
                let ng = Math.abs(angle) * ( 2 * Math.PI ) / 360;              
                let tempX = Math.sin(ng) * this.space , tempY = Math.cos(ng) * this.space;
                x1 = angle > 0 ? bullet.x + tempX : bullet.x - tempX ; 
                y1 = bullet.y - tempY;


            }
             
            egret.Tween.get( bullet ).to( { x:x1 , y:y1 }, this.space / 1000 * 1000 );

        }
        /**
         * 清除子弹
         * @param param 参数
         */
        protected killBullet( bullet,bulletInt){
            egret.Tween.removeTweens( bullet );
            this.parent.removeChild(bullet);
            egret.clearInterval( bulletInt );  
        }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
        }
    //==========================转换鱼的种类==============================
            private transType(type:number){
            switch(type){
                case 1:
                return [4,12];
                case 2:
                return [8,12];
                case 3:
                return [9,13];
                case 4:
                return [10,15];
                case 5:
                return [7,18];
                case 6:
                return [5,18];
                case 7:
                return [11,18];
                case 8:
                return [1,18];
                case 9:
                return [12,25];
                case 10:
                return [6,35];
                case 11:
                return [2,35];
                case 12:
                return [3,40];
                
            }
        }
    //======================================================================
    //===================接收服务器数据======================================
    public getSocketDate(socketevent:SocketEvent){
        // egret.log("服务器接受事件");
        var jsonData = JSON.parse( socketevent.strjson );
        switch(jsonData.Msg) 
        {
            case ServerModel.LOGIN_SERVER:
            this.goldPay.setGold(jsonData["_gold"]);
            break;
            case ServerModel.PRODUCE_FISH:
            if(this.isProduceFish){
                for(let i=1;i<=5;i++){
                    let fishtype:number = jsonData["seaway"+i+"left"];
                    if(fishtype>0){
                        // egret.log("left"+fishtype);
                        this.produceFish(i,0,fishtype);
                        }
                }
                for(let j=1;j<=5;j++){
                        let fishtype:number = jsonData["seaway"+j+"right"];
                        if(fishtype>0){
                            // egret.log("right"+fishtype);
                            this.produceFish(j,1,fishtype);
                        }
                }
            }

            break;
            case ServerModel.CATCH_FISHS:
                // egret.log("捉到了鱼");
                let re:number = jsonData["re"];
                egret.log("re="+re);
                if(0==re){//0表示协议成功
                    this.goldPay.delGold(BetScore.value,this.server);//扣币
                    let catch_gold:number = jsonData["catch_gold"];
                    //let catch_gold:number = 100000;
                    if(catch_gold>0){
                        let content:String = jsonData["warncontent"];
                        let userid:number = jsonData["userId"];
                        let fishNo:number = jsonData["fishNo"];
                        let _gold:number = jsonData["_gold"];
                        let score:number = jsonData["score"];
                        let targetincome:number = jsonData["target_after_IncomeGold"];
                        let hashcode:number = jsonData["hashcode"];
                        let fishx:number = jsonData["x"];
                        let fishy:number = jsonData["y"];
                        let thefish:gamewidget.Fish;
                        // egret.log("捉到了鱼,并获得了"+catch_gold);
                        this.winnum.showTheBean(catch_gold);
                        if(catch_gold<500){
                            let winnumfish = new gamewidget.FishNumberView();
                            winnumfish.showTheBean(this,catch_gold,fishx,fishy);
                            this.addChildAt(winnumfish,this.numChildren-1);
                            this.gameSound.playSound({name:"get_bean"});
                        }else{
                            let caipan = new gamewidget.CaiPan();
                            caipan.open(this,{x:fishx,y:fishy,value:catch_gold});
                            this.addChildAt(caipan,this.numChildren-1);
                            this.gameSound.playSound({name:"big_bean"});
                        }

                        this.goldPay.setGold(_gold);
                        this.server.nativieModel.updateMoney(_gold);
                        this.pfishcount = this.fishs.length;
                        for(var j=0;j<this.pfishcount;j++) {
                            thefish = this.fishs[j];
                            if(thefish.hashCode==hashcode){
                            //消除被打中的鱼
                            egret.Tween.removeTweens(thefish);
                            this.removeChild(thefish);
                            this.fishs.splice(this.fishs.indexOf(thefish),1);
                            this.pfishcount--;
                            }
                        }
                    }
                }else{
                    gamewidget.Toast.launch(jsonData["warncontent"]);
                }
            break;
            case ServerModel.CHANGE_STATE:
                let gold:number = jsonData["_gold"];
                let type:number = jsonData["type"];
                if(type==1){
                    this.goldPay.setGold(gold);
                }
            break;
        }


    }
    private isPhone(){
        var sUserAgent = navigator.userAgent.toLowerCase();  
        var  stros = egret.Capabilities.os;
        var bwinPc = stros== "Windows PC";
        var bMac = stros== "Mac OS";
        egret.log(stros);
        if(bwinPc||bMac){
            return true;
        }else{
            return false;
        }
    }


        private initNative(){
            var ispc = this.isPhone();
        setupWebViewJavascriptBridge((bridge) =>{
                bridge.registerHandler('n2j_EnterExitGameRoom', (data, responseCallback)=> {
                    if (typeof( data ) == "string") {
                        if(data=="0"){
                            this.server.nativieModel.updateMoney(this.goldPay.getGold());
                            this.server.switchState(0,this.goldPay.getGold(),ispc);
                            this.stopAutoPlay();
                            this.parent.autoplay.status("off");
                        }else{
                            data = data.split("#");
                            if(data[0]=="1"){
                            egret.log("1");
                            this.goldPay.setGold(data[1]);
                            this.server.switchState(1,this.goldPay.getGold(),ispc);
                            }else if(data[0]=="0"){
                            this.server.nativieModel.updateMoney(this.goldPay.getGold());
                            this.server.switchState(0,this.goldPay.getGold(),ispc);
                            this.stopAutoPlay();
                            this.parent.autoplay.status("off");
                            this.goldPay.setGold(data[1]);
                            }

                    }
                        
                    }
                    if(responseCallback) responseCallback(data);
                });

                        // 注册enterExitRoom函数给native调用
                bridge.registerHandler('n2j_EnterExitLiveRoom', (data, responseCallback)=> {
                        this.server.nativieModel.updateMoney(this.goldPay.getGold());
                        this.server.requireCloseSocket();
                        this.server.exitGame({});
                        if(responseCallback) responseCallback(data);
                });  
        });
    }


}

}
