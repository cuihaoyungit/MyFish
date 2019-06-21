
/**
* @description: 用户主视图类
* @author: LX 2017/03/12
* @version: 1.0
* @modify: 
* @Copyright: 
*/

module gamewidget{
    export class BgView extends egret.Sprite{

        protected backgroundA: egret.Bitmap;
        protected backgroundB: egret.Bitmap;

        protected bob: egret.Bitmap;
        protected bgIndex: number = 1;
        protected changeTime: number = 2;
        private Pause:boolean = false;
        private bgImageContainer:egret.DisplayObjectContainer;  // 背景容器
        private stageW:number;
        private stageH:number;
        public gameSound:gamewidget.SoundModule = gamewidget.SoundModule.getInstance();
        public constructor() {
            super();
            this.startChange();
        }   

        /**
         *对面板进行显示初始化
        *
        */
        public initUI(stagew:number,stageh:number){

            // super.initUI();
            this.stageW = stagew;
            this.stageH = stageh;

            this.backgroundA = new egret.Bitmap();
            this.backgroundA.texture = RES.getRes( "background" + this.bgIndex + "_png" );
            this.backgroundA.width = stagew;
            this.backgroundA.height = stageh;
            this.addChildAt(this.backgroundA,0);

            this.bob = new egret.Bitmap();
            this.bob.texture = RES.getRes( "bob_png" );
            this.bob.height = stageh;
            this.bob.x = stagew -25;
            
            this.backgroundB = new egret.Bitmap();
            this.backgroundB.texture = RES.getRes( "background" + ( this.bgIndex + 1 ) + "_png" );       
            this.backgroundB.width = stagew;
            this.backgroundB.height = stageh;
            this.backgroundB.x = stagew;


            this.bgImageContainer = new egret.DisplayObjectContainer();
            this.addChild(this.bgImageContainer);
            this.bgImageContainer.width = stagew;
            this.bgImageContainer.height= stageh;
            
        }

        public isPause(isPause:boolean){
            this.Pause = isPause;
        }
        protected startChange(){
            egret.setInterval(()=>{
                // egret.log("start changesence");
                this.changeSence();
        },this, 1000 * 60 * 2);
        }

        protected changeSence():void {  
            
        //    if(this.Pause)
        //    {
        //        egret.log("skip the change");
        //    }
        //    else
           {
               this.gameSound.playSound({name:"change_sence"});
            var num = this.bgImageContainer.numChildren;
            for(let i=0; i<num; i++)
            {
                this.bgImageContainer.removeChildAt(0);
            }

            this.bgImageContainer.addChild(this.backgroundB);
            this.bgImageContainer.addChild(this.bob);

            // let temp_background = new egret.Bitmap();
            // temp_background.texture = RES.getRes( "background" + ( this.bgIndex + 1 ) + "_png" );       
            // temp_background.width = this.stageW;
            // temp_background.height = this.stageH;
            // this.bgImageContainer.addChild(temp_background);

           
           egret.Tween.get(this.backgroundA).to({ x: this.backgroundA.width * -1 },3000);

           egret.Tween.get(this.backgroundB).to({ x: 0 },3000);

           egret.Tween.get(this.bob).to({ x: -25 },3000).to({ x: -200 },500).call(
               ()=>{

                //    egret.log("start move bob");
                   this.backgroundA.texture = this.backgroundB.texture;
                   this.backgroundA.x = 0;
                   this.backgroundB.x = this.backgroundA.width;
                   this.bob.x = this.backgroundB.x - 25;

                   this.bgIndex = this.bgIndex == 4 ? 1 : this.bgIndex + 1;
                   let tempN = this.bgIndex == 4 ? 1 : this.bgIndex + 1;
                   
                   
                   
                   this.backgroundB.texture = RES.getRes( "background" + tempN + "_png" );
                   //this.removeChild(this.backgroundB);
                   //this.removeChild(this.bob);

               }
           );
           }


        }


    }
}