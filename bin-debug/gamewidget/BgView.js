/**
* @description: 用户主视图类
* @author: LX 2017/03/12
* @version: 1.0
* @modify:
* @Copyright:
*/
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
    var BgView = (function (_super) {
        __extends(BgView, _super);
        function BgView() {
            var _this = _super.call(this) || this;
            _this.bgIndex = 1;
            _this.changeTime = 2;
            _this.Pause = false;
            _this.gameSound = gamewidget.SoundModule.getInstance();
            _this.startChange();
            return _this;
        }
        /**
         *对面板进行显示初始化
        *
        */
        BgView.prototype.initUI = function (stagew, stageh) {
            // super.initUI();
            this.stageW = stagew;
            this.stageH = stageh;
            this.backgroundA = new egret.Bitmap();
            this.backgroundA.texture = RES.getRes("background" + this.bgIndex + "_png");
            this.backgroundA.width = stagew;
            this.backgroundA.height = stageh;
            this.addChildAt(this.backgroundA, 0);
            this.bob = new egret.Bitmap();
            this.bob.texture = RES.getRes("bob_png");
            this.bob.height = stageh;
            this.bob.x = stagew - 25;
            this.backgroundB = new egret.Bitmap();
            this.backgroundB.texture = RES.getRes("background" + (this.bgIndex + 1) + "_png");
            this.backgroundB.width = stagew;
            this.backgroundB.height = stageh;
            this.backgroundB.x = stagew;
            this.bgImageContainer = new egret.DisplayObjectContainer();
            this.addChild(this.bgImageContainer);
            this.bgImageContainer.width = stagew;
            this.bgImageContainer.height = stageh;
        };
        BgView.prototype.isPause = function (isPause) {
            this.Pause = isPause;
        };
        BgView.prototype.startChange = function () {
            var _this = this;
            egret.setInterval(function () {
                // egret.log("start changesence");
                _this.changeSence();
            }, this, 1000 * 60 * 2);
        };
        BgView.prototype.changeSence = function () {
            var _this = this;
            //    if(this.Pause)
            //    {
            //        egret.log("skip the change");
            //    }
            //    else
            {
                this.gameSound.playSound({ name: "change_sence" });
                var num = this.bgImageContainer.numChildren;
                for (var i = 0; i < num; i++) {
                    this.bgImageContainer.removeChildAt(0);
                }
                this.bgImageContainer.addChild(this.backgroundB);
                this.bgImageContainer.addChild(this.bob);
                // let temp_background = new egret.Bitmap();
                // temp_background.texture = RES.getRes( "background" + ( this.bgIndex + 1 ) + "_png" );       
                // temp_background.width = this.stageW;
                // temp_background.height = this.stageH;
                // this.bgImageContainer.addChild(temp_background);
                egret.Tween.get(this.backgroundA).to({ x: this.backgroundA.width * -1 }, 3000);
                egret.Tween.get(this.backgroundB).to({ x: 0 }, 3000);
                egret.Tween.get(this.bob).to({ x: -25 }, 3000).to({ x: -200 }, 500).call(function () {
                    //    egret.log("start move bob");
                    _this.backgroundA.texture = _this.backgroundB.texture;
                    _this.backgroundA.x = 0;
                    _this.backgroundB.x = _this.backgroundA.width;
                    _this.bob.x = _this.backgroundB.x - 25;
                    _this.bgIndex = _this.bgIndex == 4 ? 1 : _this.bgIndex + 1;
                    var tempN = _this.bgIndex == 4 ? 1 : _this.bgIndex + 1;
                    _this.backgroundB.texture = RES.getRes("background" + tempN + "_png");
                    //this.removeChild(this.backgroundB);
                    //this.removeChild(this.bob);
                });
            }
        };
        return BgView;
    }(egret.Sprite));
    gamewidget.BgView = BgView;
    __reflect(BgView.prototype, "gamewidget.BgView");
})(gamewidget || (gamewidget = {}));
