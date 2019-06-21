module gamewidget
{
    /**
     * 子弹，利用对象池
     */
    export class Bullet extends egret.Bitmap
    {
        private static cacheDict:Object = {};
   
        /**生产*/
        public static produce(textureName:string,aimX:number,aimY:number):gamewidget.Bullet
        {

            if(gamewidget.Bullet.cacheDict[textureName]==null)
                gamewidget.Bullet.cacheDict[textureName] = [];
            var dict:gamewidget.Bullet[] = gamewidget.Bullet.cacheDict[textureName];
            var bullet:gamewidget.Bullet;
            if(dict.length>0) {
                bullet = dict.pop();
            } 
           bullet = new gamewidget.Bullet(RES.getRes(textureName),textureName,aimX,aimY);
            
            return bullet;
        }
        /**回收*/
        public static reclaim(bullet:gamewidget.Bullet):void
        {
             var textureName: string = bullet.textureName;
            if(gamewidget.Bullet.cacheDict[textureName]==null)
                gamewidget.Bullet.cacheDict[textureName] = [];
            var dict:gamewidget.Bullet[] = gamewidget.Bullet.cacheDict[textureName];
            if(dict.indexOf(bullet)==-1)
                dict.push(bullet);
        }

        public textureName:string;//可视为子弹类型名
        public aimX:number;
        public aimY:number;
        public angle:number;

        public constructor(texture:egret.Texture,textureName: string,aimX:number,aimY:number) {
            super(texture);
            this.textureName = textureName;
            // this.aimX = aimX;
            // this.aimY = aimY;
            this.anchorOffsetX = this.width/2;
            this.anchorOffsetY = this.height/2;

            // let dX = this.aimX - START_POINT.x;
            // let dY = this.aimY - START_POINT.y;
            // this.angle = Math.atan(dX/dY);
            // this.angle = 360 * Math.atan( dX / dY ) / ( 2 * Math.PI );
            // egret.log("aimX="+this.aimX+" aimY="+this.aimY+" dx="+dX+" dy="+dY+" angle="+this.angle);
            // this.rotation = -45*this.angle;
            
		}
    }
}