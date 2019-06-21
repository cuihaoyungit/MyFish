module gamewidget{
    export class FishNumberView extends egret.Sprite{
        private bean_m_value:egret.BitmapText;
        private beamtext:egret.TextField;
        public constructor (){
            super();
            
            // this.height = 400;
            // this.width = 400;
        }
        public showTheBean(gparent:egret.Sprite,goldnum:number,x:number,y:number){
            let rate = 1.6;
            this.x = x;
            this.y = y;
            this.bean_m_value = new egret.BitmapText();
            this.bean_m_value.scaleX = this.bean_m_value.scaleY = rate * 0.7;
            this.bean_m_value.font = RES.getRes("win_num_fnt"); 
            this.bean_m_value.text = "+"+goldnum
            this.bean_m_value.x = 0;
            this.bean_m_value.y = 0;  
    

            this.addChildAt(this.bean_m_value,this.numChildren-1);

            let by = this.bean_m_value.y = 0;            
            egret.Tween.get(this.bean_m_value).to({ y: by - 30 },1000).call(()=>{
                    this.removeChild( this.bean_m_value );
                    gparent.removeChild(this);
             });
            


            // this.beamtext = new egret.TextField();
            // this.addChild(this.beamtext);
            // this.beamtext.touchEnabled = false;
            // this.beamtext.text = "3000";            
            // this.beamtext.x = 0;
            // this.beamtext.y =0;
            // this.beamtext.$setWidth(200);
            // this.beamtext.textColor=0xffffff;
            // this.beamtext.textAlign = egret.VerticalAlign.CONTENT_JUSTIFY;

        }
    }
}