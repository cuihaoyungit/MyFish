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
    var NetView = (function (_super) {
        __extends(NetView, _super);
        function NetView() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        /**
         *对面板进行显示初始化
        *
        */
        NetView.prototype.initUI = function () {
            this.net = new egret.Bitmap();
            this.net.texture = RES.getRes("net_png");
            this.net.anchorOffsetX = this.net.width / 2;
            this.net.anchorOffsetY = this.net.height / 2;
        };
        /**
         * view开启执行函数
         * @param param 参数
         * @param $parent 父view
         */
        NetView.prototype.open = function (px, py, parent) {
            this.net.x = px;
            this.net.y = py;
            // this.width = 100;
            // this.height = 100;
            // this.net.width = 100;
            // this.net.height = 100;
            this.net.scaleX = this.net.scaleY = 0.1;
            parent.addChild(this.net);
            // this.addChildAt(this.net);
            egret.Tween.get(this.net).to({ scaleX: 1, scaleY: 1 }, 100)
                .wait(200).to({ scaleX: 0.1, scaleY: 0 }, 100).call(function () {
                // this.removeChild(this.net);
            });
        };
        return NetView;
    }(egret.Sprite));
    gamewidget.NetView = NetView;
    __reflect(NetView.prototype, "gamewidget.NetView");
})(gamewidget || (gamewidget = {}));
