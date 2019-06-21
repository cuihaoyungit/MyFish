/**
 * Created by egret on 2016/1/26.
 */

module gamewidget
{
    export class Toast extends egret.DisplayObjectContainer 
    {
        public static init(cont:egret.DisplayObjectContainer, txtrToastBg:egret.Texture):void {
            this._cont = cont;
            this._txtrToastBg = txtrToastBg;
        }
        
        public static launch(msg:string):void {
            if (this._cont) {
                var toast:Toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight, this._lastToast);
                this._cont.addChild(toast);
                this._lastToast = toast;
            }
        }

        private static _txtrToastBg:egret.Texture;
        private static _cont:egret.DisplayObjectContainer;
        private static _lastToast:Toast;
        private preToast:Toast;

        constructor (msg:string, w:number, h:number, preToast:Toast) {
            super();

            if (preToast) {
                preToast.fadeOut();
            }
            this.preToast = preToast;
            
            // var shape:egret.Shape = new egret.Shape();
            // shape.graphics.beginFill(0x000000,0.35);
            // shape.graphics.drawRoundRect( 0, 0, w/2, 40, 50 )
            // shape.graphics.endFill();
            // this.addChild(shape);

            var bg:egret.Bitmap = new egret.Bitmap(Toast._txtrToastBg);
            this.addChild(bg);

            var tx:eui.Label = new eui.Label();
            tx.multiline = true;
            tx.size = 25;
            tx.bold = true;
            tx.textColor = 0xFFF9F0;
            tx.stroke = 1;
            tx.strokeColor = 0x532D03;
            tx.text = msg;
            tx.fontFamily = "微软雅黑";
            tx.textAlign = egret.HorizontalAlign.CENTER;
            tx.width = bg.$getWidth();
            // tx.x = this.$getWidth()/2;
            tx.y = this.$getHeight()/2;
            this.addChild(tx);
            

            this.x = w/2 - this.$getWidth()/2;
            this.y = h/2 - this.$getHeight()/2;
            
            this.alpha = 0;
            
            egret.Tween.get(this)
                .to({alpha: 1}, 800, egret.Ease.quintOut)
                //.to( { scaleX: 1.2, scaleY: 1.2 }, 100, egret.Ease.quintOut )
                //.call( ()=>{ console.log( "tween tween tween" ); } ) 
                //.to( { scaleX: 1.0, scaleY: 1.0 }, 300, egret.Ease.quintIn )
                .wait(1600)
                .to({alpha: 0}, 1200, egret.Ease.quintIn).call(() => {      /*  y: this.y - 50, */
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                });
        }

        public fadeOut():void {
            if (this.preToast) {
                this.preToast.fadeOut();
            }

            egret.Tween.get(this)
                .to({y: this.y-30}, 80, egret.Ease.quintIn)
                .to({y: this.y-60}, 1000, egret.Ease.quintIn).call(() => {      /*  y: this.y - 50, */
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                });
        }
    }
}
