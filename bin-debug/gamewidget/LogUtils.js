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
    var LogUtils = (function (_super) {
        __extends(LogUtils, _super);
        function LogUtils() {
            return _super.call(this) || this;
        }
        LogUtils.prototype.showlog = function (content) {
            if (true) {
                egret.log(content);
            }
        };
        return LogUtils;
    }(egret.Sprite));
    gamewidget.LogUtils = LogUtils;
    __reflect(LogUtils.prototype, "gamewidget.LogUtils");
})(gamewidget || (gamewidget = {}));
