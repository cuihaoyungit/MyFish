//
//
//
//
//
//  主要逻辑入口管理类
//
//
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
var base;
(function (base) {
    var GameApp = (function (_super) {
        __extends(GameApp, _super);
        function GameApp() {
            return _super.call(this) || this;
        }
        GameApp.prototype.initGame = function (stage) {
            this.gameStage = stage;
        };
        GameApp.prototype.exitGame = function () {
        };
        GameApp.isDebug = false; // 默认是调试，发布前重置false
        return GameApp;
    }(base.baseclass));
    base.GameApp = GameApp;
    __reflect(GameApp.prototype, "base.GameApp");
})(base || (base = {}));
