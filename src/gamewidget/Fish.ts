module gamewidget{
    /**
     * 鱼
     */
    export class Fish extends egret.Sprite
        {
        private static cacheDict:Object = {};
        private fishsMc:egret.MovieClip;
        public static mcFactory: any = {};
        private  count:number;
        private  type:number;
		/**
        /**生产*/
        public static produce(fishtype:number):gamewidget.Fish
        {	
                var theFish:gamewidget.Fish;
                var data = RES.getRes("fish_m_"+fishtype+"_json");
                var txtr = RES.getRes("fish_m_"+fishtype+"_png");
                var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
                var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "fish_m_"+fishtype ) ); 
                mc1.gotoAndPlay(0,-1);
                theFish = new gamewidget.Fish(mc1,fishtype);
            return theFish;
        }
        /**回收*/
        public static reclaim(theFish:gamewidget.Fish):void
        {
			// var textureName: string = theFighter.textureName;
            // if(gamewidget.Fish.cacheDict[textureName]==null)
            //     gamewidget.Fish.cacheDict[textureName] = [];
            // var dict:gamewidget.Fish[] = gamewidget.Fish.cacheDict[textureName];
            // if(dict.indexOf(theFighter)==-1)
            //     dict.push(theFighter);
            
        }
   public  getcount (){
       return this.count;
   }
   public  setCount(count:number){
       this.count = count;
   }
   public setType(type:number){
       this.type = type;
   }
   public getType(){
       return this.type;
   }
        /**飞机位图*/
        private bmp:egret.Bitmap;


		//可视为飞机类型名
		public textureName:string;
        public constructor(mc1:egret.MovieClip,fishtype:number) {
            super();
            this.addChild(mc1);
			
            this.anchorOffsetX = this.width/2;
            this.anchorOffsetY = this.height/2;
            switch(fishtype){
                case 3:
                 this.scaleX = 1.8;
                 this.scaleY = 1.8;
                break;
                case 2:
                 this.scaleX = 1.7;
                 this.scaleY = 1.7;
                case 6:
                 this.scaleX = 1.2;
                 this.scaleY = 1.2;
                 break
            }
     
            mc1.x = (this.width-mc1.width)/2;
            mc1.y = (this.height-mc1.height)/2;
        
        }

    }
}