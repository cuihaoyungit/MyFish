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
    var SoundModule = (function (_super) {
        __extends(SoundModule, _super);
        function SoundModule() {
            var _this = _super.call(this) || this;
            _this.isPlaySound = true;
            return _this;
        }
        // 兼容差
        SoundModule.prototype.playSound = function (e) {
            if (!this.isPlaySound)
                return;
            //获取加载到的 Sound 对象
            var sound = RES.getRes(e.name + "_mp3");
            //播放音乐
            var channel = sound.play(0, 1);
        };
        SoundModule.prototype.turnSound = function (isPlay) {
            this.isPlaySound = isPlay;
        };
        return SoundModule;
    }(base.baseclass));
    gamewidget.SoundModule = SoundModule;
    __reflect(SoundModule.prototype, "gamewidget.SoundModule");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=SoundModule.js.map