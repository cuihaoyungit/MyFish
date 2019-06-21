module gamewidget{
    export class NetView extends egret.Sprite{

        protected net: egret.Bitmap;
        public constructor() {
            super();
            this.initUI();
        }

        /**
         *对面板进行显示初始化
        *
        */
        public initUI(){

            this.net = new egret.Bitmap();
            this.net.texture = RES.getRes("net_png");
            this.net.anchorOffsetX = this.net.width / 2;
            this.net.anchorOffsetY = this.net.height / 2;
            
        }

        /**
         * view开启执行函数
         * @param param 参数
         * @param $parent 父view
         */
        public open(px:number,py:number,parent:egret.DisplayObjectContainer):void { 

            this.net.x = px;
            this.net.y = py;
            // this.width = 100;
            // this.height = 100;
            // this.net.width = 100;
            // this.net.height = 100;
            this.net.scaleX = this.net.scaleY = 0.1;
            parent.addChild(this.net);
            // this.addChildAt(this.net);
        
            egret.Tween.get(this.net).to( { scaleX: 1, scaleY: 1 },100 )
                .wait(200).to({ scaleX: 0.1, scaleY:0 },100).call(()=>{
                    // this.removeChild(this.net);
                 });


        }

    
       
    
    }

}