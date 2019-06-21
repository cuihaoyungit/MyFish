// TypeScript file
//
//
//  定时检测链接状态
//
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gamewidget;
(function (gamewidget) {
    var ConnectTimer = (function () {
        function ConnectTimer() {
        }
        ConnectTimer.prototype.killTimer = function () {
            if (this.timer)
                egret.clearInterval(this.timer);
            this.timer = null;
        };
        ConnectTimer.prototype.createTimer = function () {
            var _this = this;
            if (this.timer)
                return;
            var testTime = 5000;
            var gaptime = 2000;
            this.timer = egret.setInterval(function () {
                if (true) {
                    // egret.log( "断线检测中" );
                }
                if (!_this.lastTime)
                    return;
                var now = new Date().getTime();
                if (now - _this.lastTime > testTime && now - _this.lastTime <= testTime + gaptime) {
                    if (true) {
                        egret.log("疑似断线中，正在尝试联系服务端");
                    }
                    //ServerModel.getInstance().connectToServer();
                }
                else if (now - _this.lastTime > testTime + gaptime) {
                    if (true) {
                        egret.log("服务端已经断开，正在重连...");
                    }
                    //ServerModel.getInstance().reConnectToServer();
                    _this.killTimer();
                }
            }, this, 1000);
        };
        ConnectTimer.prototype.destory = function () {
        };
        ConnectTimer.prototype.setLastTime = function (lastTime) {
            this.lastTime = lastTime;
        };
        return ConnectTimer;
    }());
    gamewidget.ConnectTimer = ConnectTimer;
    __reflect(ConnectTimer.prototype, "gamewidget.ConnectTimer");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=ConnectTimer.js.map