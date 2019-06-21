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
    var AutoPlay = (function (_super) {
        __extends(AutoPlay, _super);
        function AutoPlay() {
            var _this = _super.call(this) || this;
            _this.isCheck = false;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        AutoPlay.prototype.onAddToStage = function (event) {
            this.create();
        };
        AutoPlay.prototype.create = function () {
            this.btOn = new egret.Bitmap();
            this.btOn.texture = RES.getRes("deposit_on_png");
            this.btOn.x = 0;
            this.btOn.y = 0;
            this.addChild(this.btOn);
            this.btOff = new egret.Bitmap();
            this.btOff.texture = RES.getRes("deposit_off_png");
            this.btOff.x = 0;
            this.btOff.y = 0;
            this.addChild(this.btOff);
            this.btOff.visible = false;
        };
        AutoPlay.prototype.status = function (status) {
            if (status == "on") {
                this.btOn.visible = true;
                this.btOff.visible = false;
            }
            else if (status == "off") {
                this.btOn.visible = false;
                this.btOff.visible = true;
            }
            else {
            }
            this.isCheck = !this.isCheck;
        };
        return AutoPlay;
    }(egret.Sprite));
    gamewidget.AutoPlay = AutoPlay;
    __reflect(AutoPlay.prototype, "gamewidget.AutoPlay");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=AutoPlay.js.map