// /**
// * @description: 鱼主视图类
// * @author: LX 2017/03/12
// * @version: 1.0
// * @modify: 
// * @Copyright: 
// */
// module gamewidget {
//     export class FishsView extends egret.Sprite{
//         protected fishs:any ; //鱼的数据
//         protected liveFish: Array<Fish> ; //活鱼数组
//         protected stopFishOut: boolean ; //是否阻断鱼游出
//         protected colorFlilter: egret.ColorMatrixFilter;//滤镜对象
//         protected colorMatrix: Array<number> ;
//         public constructor($controller:lxCore.BaseController, key:string) {
//             super($controller, key);
//             lxCore.MyEvent.obj.addEventListener( GameEvent.NAME,this.registerFunc, this); 
//             lxCore.MyEvent.obj.addEventListener( TableEvent.NAME,this.registerFunc, this); 
//         }   
//         /**
//          *注册各种事件监听
//         *
//         */
//         protected registerFunc(e: any){
//             e = e.data;
//             switch (e.key) { 
//                 case GameEvent.GET_THE_FISH: 
// 					this.killFish(e.data); //捕到了一条鱼
// 					break; 
//                 case TableEvent.GAME_TURN_RESULT  :
//                     this.seaWayReq(e.data); //鱼轨出鱼数据
//                     break;  
//                 case GameEvent.ENTER_EXIT_APP:
//                     this.stopFishOut = e.data == "0" ? true : false; //阻止出鱼
//                     break;                                                                  
// 				default:
// 					break;
//             }
//         }
//         /**
//          *对面板进行显示初始化
//         *
//         */
//         public initUI(){
//             super.initUI();
//             this.fishs = {}; //鱼的数据
//             this.liveFish = []; //活鱼数组
//             this.stopFishOut = false; //是否阻断鱼游出
//             this.colorMatrix = [ 1,0,0,0,60, 0,1,0,0,60, 0,0,1,0,60, 0,0,0,1,0 ];
//             this.colorFlilter = new egret.ColorMatrixFilter( this.colorMatrix );
//         }
// ////////////////////////////---- 出鱼 ----///////////////////////////////
//         /**
//          * 根据轨道出鱼数据出鱼
//          * @param param 参数
//          */
//         protected seaWayReq( array: Array<Array<number>> ){
//             if(this.stopFishOut)return;            
//             array.forEach((e,i)=>{
//                 e.forEach((f,j)=>{
//                     if( f > 0 ){
//                        this.fishsGo( f, j == 0 ? 1 : -1 ); 
//                     }
//                 });
//             });
//         }
//         /**
//          * 鱼儿出发
//          * @param param 参数
//          */
//         protected fishsGo( fishNo: number, direction: number ){
//                 let fish = lxCore.App.ViewManagers.getAView( "fishs" + fishNo, Fish, this.myController );
//                 let index = fish.$hashCode;
//                 if( this.fishs[ "f" + index ] == null ) this.fishs[ "f" + index ] = fish;
//                 this.liveFish.push(this.fishs[ "f" + index ]);
//                 //为了重用和方便管理鱼对象，使用liveFish来保存正在游动的鱼
//                 //使用fishs来保存当前hash的鱼，同一hash值得鱼同时只能出现一条，被捕后则会回到对象池等待再次出现
//                 let y = Math.ceil(Math.random() * 12) * 35 + Math.ceil(Math.random() * 50);
//                 lxCore.App.ViewManagers.open( fish, this, { direction ,fishNum: fishNo, index: index, x: this.width, y } );   
//                 let randTime = Math.ceil(Math.random() * 1000) + 250;
//                 let t = egret.setTimeout(()=>{
//                     fish.startMove();
//                     egret.clearTimeout(t);
//                 },this,randTime);            
//         }
// //////////////////////////////////////////////////////////////////////// 
// ////////////////////////////---- 捕到鱼及清除鱼 ----//////////////////////
// /**
//          * 所有鱼的碰撞测试（子弹与鱼碰撞检测）
//          * @param param 参数
//          */
//         public testCatchAllFish( bullet ){
//             for( let i=0; i < this.liveFish.length; i++ ){
//                 if( bullet ){
//                     if( this.liveFish[i] ){  
//                         if( this.liveFish[i].hitTestPointFun( bullet.x, bullet.y, this.colorFlilter ) ){  
//                             return { hashCode: this.liveFish[i].hashCode, num: this.liveFish[i].num };
//                         }
//                     }
//                 }
//             }
//         }
//         /**
//          * 捕到一条鱼或鱼游出边界 将该鱼清除 放回鱼池
//          * @param param 参数
//          */
//         protected deleteFish(fish: Fish){
//             if( fish ) {
//                 let n = this.liveFish.indexOf( fish );
//                 if( n != -1 ){
//                     this.liveFish.splice(n,1);//从活鱼数组中删除
//                 }           
//             }
//         }
//         /**
//          * 捕到一条鱼后的操作
//          * @param param 参数
//          */
//         protected killFish(e: any){
//             let fish = this.fishs[ "f" + e.hashcode ];//取得这条鱼的对象
//             let bigBean = 5 * 10000; //判断本次获奖是否是是彩盘奖励
//             if( e.catch_gold < bigBean ){
//                 lxCore.MyEvent.applyFunc( SoundEvent.NAME, SoundEvent.PLAY_SOUND, { name: "get_bean" });   
//                 lxCore.MyEvent.applyFunc( GameEvent.NAME, GameEvent.GET_THE_FISH_EFFECT, { x: e.x, y: e.y,w:this.width, index: e.hashcode , num: e.fishNo, value: "加" + e.catch_gold } );
//             }else if( e.catch_gold >= bigBean ){
//                 lxCore.MyEvent.applyFunc( SoundEvent.NAME, SoundEvent.PLAY_SOUND, { name: "big_bean" });                       
//                 lxCore.MyEvent.applyFunc( GameEvent.NAME, GameEvent.GET_BIG_FISH_EFFECT,  { x: e.x, y: e.y,w:this.width, num: e.fishNo, value: Math.floor( e.catch_gold / 10000 ) + "万" }  );
//             }
//             if( fish ) {
//                 fish.killSelf(true); //将鱼返回对象池
//             }         
//         }
// //////////////////////////////////////////////////////////////////////// 
//         /**
//          * view开启执行函数
//          * @param param 参数
//          * @param $parent 父view
//          */
//         public open($parent: any, param?: any):void {         
//             super.open($parent);
//             this.width = param.width;
//             this.height = param.height;
//         }
//         /**
//          * 面板关闭执行函数
//          * @param param 参数
//          */
//         public close(param?: any):void {
//         }
//         /**
//          * 销毁
//          */
//         public destroy():void {
//             super.destroy();
//             this.colorFlilter = null;
//             this.colorMatrix  = null;
//             lxCore.MyEvent.obj.removeEventListener(GameEvent.NAME,this.registerFunc,this); 
//         }
//     }
// }
