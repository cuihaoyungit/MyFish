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
     * 鱼
     */
    var Fish = (function (_super) {
        __extends(Fish, _super);
        function Fish(mc1, fishtype) {
            var _this = _super.call(this) || this;
            _this.addChild(mc1);
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            switch (fishtype) {
                case 3:
                    _this.scaleX = 1.8;
                    _this.scaleY = 1.8;
                    break;
                case 2:
                    _this.scaleX = 1.7;
                    _this.scaleY = 1.7;
                case 6:
                    _this.scaleX = 1.2;
                    _this.scaleY = 1.2;
                    break;
            }
            mc1.x = (_this.width - mc1.width) / 2;
            mc1.y = (_this.height - mc1.height) / 2;
            return _this;
        }
        /**
        /**生产*/
        Fish.produce = function (fishtype) {
            var theFish;
            var data = RES.getRes("fish_m_" + fishtype + "_json");
            var txtr = RES.getRes("fish_m_" + fishtype + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("fish_m_" + fishtype));
            mc1.gotoAndPlay(0, -1);
            theFish = new gamewidget.Fish(mc1, fishtype);
            return theFish;
        };
        /**回收*/
        Fish.reclaim = function (theFish) {
            // var textureName: string = theFighter.textureName;
            // if(gamewidget.Fish.cacheDict[textureName]==null)
            //     gamewidget.Fish.cacheDict[textureName] = [];
            // var dict:gamewidget.Fish[] = gamewidget.Fish.cacheDict[textureName];
            // if(dict.indexOf(theFighter)==-1)
            //     dict.push(theFighter);
        };
        Fish.prototype.getcount = function () {
            return this.count;
        };
        Fish.prototype.setCount = function (count) {
            this.count = count;
        };
        Fish.prototype.setType = function (type) {
            this.type = type;
        };
        Fish.prototype.getType = function () {
            return this.type;
        };
        Fish.cacheDict = {};
        Fish.mcFactory = {};
        return Fish;
    }(egret.Sprite));
    gamewidget.Fish = Fish;
    __reflect(Fish.prototype, "gamewidget.Fish");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=Fish.js.map