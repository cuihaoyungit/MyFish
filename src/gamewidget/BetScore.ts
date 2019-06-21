/**
* @description: 用户主视图类
* @author: LX 2017/03/12
* @version: 1.0
* @modify: 
* @Copyright: 
*/

module gamewidget{
    export class BetScore extends egret.Sprite{

        protected socreA: egret.Bitmap; 
        protected socreB: egret.Bitmap;  
        protected socre: egret.BitmapText; 
        protected socreBg: egret.Bitmap;
        protected scores: Array<number>; //注分数组
        protected vIndex: number; //注分索引
        public static value: number; //注分
        private gameSound:gamewidget.SoundModule = gamewidget.SoundModule.getInstance();

        public constructor() {
            super();
            this.scores = [5, 10, 20, 100 ,200];
            this.vIndex = 0;
            BetScore.value = this.scores[this.vIndex]

        }   

        /**
         *对面板进行显示初始化
        *
        */
        public initUI(){

            //分数背景图片
            this.socreBg = new egret.Bitmap();
            this.socreBg.texture = RES.getRes("gun_num_bg_png");
            this.socreBg.x = 35;
            this.socreBg.y = 10;
            this.addChild(this.socreBg); 

            //加减分数按钮
            this.socreA = new egret.Bitmap();
            this.socreA.texture = RES.getRes("score_-_png");
            this.socreA.x = 0;
            this.socreA.y = 0;
            this.socreA.touchEnabled = true;
            this.addChild(this.socreA);

            this.socreB = new egret.Bitmap();
            this.socreB.texture = RES.getRes("score_+_png");
            this.socreB.x = 130;
            this.socreB.y = 0;
            this.socreB.touchEnabled = true;
            this.addChild(this.socreB);
            

           
            
            this.socreA.addEventListener( egret.TouchEvent.TOUCH_TAP, this.subScore, this );
         
            
            this.socreB.addEventListener( egret.TouchEvent.TOUCH_TAP, this.addScore, this );

            //分数数字显示
            this.socre = new egret.BitmapText(); 
            this.socre.font = RES.getRes("gun_num_fnt");
            this.socre.text = BetScore.value + "";
            this.socre.x = this.socreBg.x;
            this.socre.y = this.socreBg.y;
            this.socre.height = this.socreBg.height;
            this.socre.width = this.socreBg.width;
            this.socre.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.socre.textAlign = egret.HorizontalAlign.CENTER;

            this.addChild(this.socre);



        }

        
        //加注
        protected addScore(e:egret.TouchEvent){
            e.preventDefault();
            this.gameSound.playSound({name:"button"});
             this.socreA.touchEnabled = true;
            if( this.vIndex < this.scores.length - 1 ){
                this.vIndex ++;
                BetScore.value = this.scores[ this.vIndex ];
                this.socre.text = BetScore.value + "";
            }
            if( this.vIndex  == this.scores.length - 1 ){
                this.socreB.touchEnabled = false;
            }
        }
 
        //减注
        protected subScore(e:egret.TouchEvent){
            e.preventDefault();
            this.gameSound.playSound({name:"button"});
             this.socreB.touchEnabled = true;
            if( this.vIndex > 0 ){
                this.vIndex --;
                BetScore.value = this.scores[ this.vIndex ];
                this.socre.text = BetScore.value + "";
            }
            
            if( this.vIndex  == 0 ){
                this.socreA.touchEnabled = false;
            }
        }



        /**
         * 面板关闭执行函数
         * @param param 参数
         */
        public close(param?: any):void {

        }

        /**
         * 销毁
         */
        public destroy():void {
            
            this.socre.font = null; 
            this.socreBg.texture = null;
            this.socre = null; 
            this.socreBg = null;
            this.scores= null;
        }

       


    }
}
