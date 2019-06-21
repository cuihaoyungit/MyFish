// TypeScript file
//
//
//
// 充值区域的整体集合封装
//

module gamewidget
{

    export class GoldPay extends egret.Sprite
    {
        private goldIcon:egret.Bitmap;
        private money:egret.BitmapText;
        private gold:number;

        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        public init():void
        {

        }

        private onAddToStage(event:egret.Event)
        {
            this.create();
        } 

        public setGold(gold:number)
        {
            this.gold = gold;
            this.money.text = "" + gold;
        }
        public getGold(){
            return  this.gold;
        }
        public delGold(delgold:number,server:gamewidget.ServerModel){
            this.gold = this.gold - delgold;
            this.money.text = ""+(this.gold);
            server.nativieModel.updateMoney(this.gold);
        }
        public create():void
        {
            // var back = new egret.Shape();
            // back.graphics.beginFill(0xff0000, 0.0);
            // back.graphics.drawRect(0, 0, 300, 80);
            // back.graphics.endFill();
            // back.x = 0;
            // back.y = 0;
            // this.addChild(back);


            // 算出居中点
            let rect_w = this.width;
            let rect_h = this.height * 0.8;
            let rect_x = this.$getWidth()/2 - rect_w/2;
            let rect_y = this.$getHeight()/2 - rect_h/2;
            this.anchorOffsetX = this.$getWidth()/2;
            this.anchorOffsetY = this.$getHeight()/2;
            this.scaleX = 1.3;
            this.scaleY = 1.3;
            // let backShap = new egret.Shape();
            // backShap.graphics.beginFill(0x000000,0.35);
            // backShap.graphics.drawRoundRect( 40, rect_y, rect_w, rect_h, 80 )
            // backShap.graphics.endFill();
            // this.addChild(backShap);

            let bgbean = new egret.Bitmap();
            bgbean = this.createBitmapByName("bean_bg_png");
            this.addChild(bgbean);

    

            this.money = new egret.BitmapText();
            this.addChild(this.money);
            this.money.touchEnabled = false;
            this.money.font = RES.getRes("win_num_fnt"); 
            this.money.text = "0";      
            this.money.scaleX = this.money.scaleY =  0.8;      
            this.money.y = bgbean.height/4;
            this.money.x = bgbean.width/5;
        

            
        }


     


        private createBitmapByName(name: string) {
            let result = new egret.Bitmap();
            let texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }
    }




}
