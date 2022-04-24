var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var gamewidget;
(function (gamewidget) {
    /**
     * 子弹，利用对象池
     */
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(texture, textureName, aimX, aimY) {
            var _this = _super.call(this, texture) || this;
            _this.textureName = textureName;
            // this.aimX = aimX;
            // this.aimY = aimY;
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
            // let dX = this.aimX - START_POINT.x;
            // let dY = this.aimY - START_POINT.y;
            // this.angle = Math.atan(dX/dY);
            // this.angle = 360 * Math.atan( dX / dY ) / ( 2 * Math.PI );
            // egret.log("aimX="+this.aimX+" aimY="+this.aimY+" dx="+dX+" dy="+dY+" angle="+this.angle);
            // this.rotation = -45*this.angle;
        }
        /**生产*/
        Bullet.produce = function (textureName, aimX, aimY) {
            if (gamewidget.Bullet.cacheDict[textureName] == null)
                gamewidget.Bullet.cacheDict[textureName] = [];
            var dict = gamewidget.Bullet.cacheDict[textureName];
            var bullet;
            if (dict.length > 0) {
                bullet = dict.pop();
            }
            bullet = new gamewidget.Bullet(RES.getRes(textureName), textureName, aimX, aimY);
            return bullet;
        };
        /**回收*/
        Bullet.reclaim = function (bullet) {
            var textureName = bullet.textureName;
            if (gamewidget.Bullet.cacheDict[textureName] == null)
                gamewidget.Bullet.cacheDict[textureName] = [];
            var dict = gamewidget.Bullet.cacheDict[textureName];
            if (dict.indexOf(bullet) == -1)
                dict.push(bullet);
        };
        Bullet.cacheDict = {};
        return Bullet;
    }(egret.Bitmap));
    gamewidget.Bullet = Bullet;
    __reflect(Bullet.prototype, "gamewidget.Bullet");
})(gamewidget || (gamewidget = {}));
