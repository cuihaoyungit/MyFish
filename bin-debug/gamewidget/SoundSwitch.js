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
    var SoundSwitch = (function (_super) {
        __extends(SoundSwitch, _super);
        function SoundSwitch() {
            var _this = _super.call(this) || this;
            _this.isCheck = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        SoundSwitch.prototype.onAddToStage = function (event) {
            this.create();
        };
        SoundSwitch.prototype.create = function () {
            this.btOn = new egret.Bitmap();
            this.btOn.texture = RES.getRes("sound_on_png");
            this.btOn.x = 0;
            this.btOn.y = 0;
            this.addChild(this.btOn);
            this.btOff = new egret.Bitmap();
            this.btOff.texture = RES.getRes("sound_off_png");
            this.btOff.x = 0;
            this.btOff.y = 0;
            this.addChild(this.btOff);
            this.btOff.visible = false;
        };
        SoundSwitch.prototype.status = function (status) {
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
        return SoundSwitch;
    }(egret.Sprite));
    gamewidget.SoundSwitch = SoundSwitch;
    __reflect(SoundSwitch.prototype, "gamewidget.SoundSwitch");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=SoundSwitch.js.map