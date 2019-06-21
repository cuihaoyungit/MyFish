module gamewidget{
    export class NumberView extends egret.Sprite{
        private bean_m_value:egret.BitmapText;
        private bean_m: egret.MovieClip;
        public constructor (stageH:number){
            super();
            this.initUi(stageH);
            this.height = stageH;
        }
        private initUi(stageH:number){
            let data = RES.getRes( "win_bean_m_json" );
            let txtr = RES.getRes( "win_bean_m_png" );
            let mcFactory = new egret.MovieClipDataFactory( data, txtr );
            this.bean_m = new egret.MovieClip( mcFactory.generateMovieClipData( "win_bean_m" ) );
            this.bean_m.x = 30;
            this.bean_m.y = stageH-210;  
            let rate = 1.6;
            this.bean_m.scaleX = this.bean_m.scaleY = rate;

            this.bean_m.addEventListener(egret.Event.COMPLETE, function (){
                this.bean_m.gotoAndStop(1);
                this.removeChild( this.bean_m );
            }, this); 

            this.bean_m_value = new egret.BitmapText();
            this.bean_m_value.scaleX = this.bean_m_value.scaleY = rate * 0.7;
            this.bean_m_value.font = RES.getRes("win_num_fnt"); 
            this.bean_m_value.text = "0"
            this.bean_m_value.width = 200;
            this.bean_m_value.height = 50;
            this.bean_m_value.x = 100;
            this.bean_m_value.y = stageH-120;     
        }
        public showTheBean(goldnum:number){
            if( goldnum>0 ){
                if( this.bean_m.parent ) this.removeChild( this.bean_m );
                this.bean_m.gotoAndStop(1);
                this.addChild( this.bean_m );
                this.bean_m.gotoAndPlay(0,3);

                // if( this.bean_m_value.parent ) 
                this.addChildAt(this.bean_m_value,this.numChildren-1);

                let y = this.bean_m_value.y = this.height - 120;
                egret.Tween.removeTweens(this.bean_m_value);

                this.bean_m_value.text =  ""+goldnum;
                
                // this.addChild(this.bean_m_value); 
                
                egret.Tween.get(this.bean_m_value).to({ y: y - 30 },1000).call(()=>{
                    this.removeChild( this.bean_m_value );
                });
            }
        }
    }
}