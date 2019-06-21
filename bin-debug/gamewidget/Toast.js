/**
 * Created by egret on 2016/1/26.
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
    var Toast = (function (_super) {
        __extends(Toast, _super);
        function Toast(msg, w, h, preToast) {
            var _this = _super.call(this) || this;
            if (preToast) {
                preToast.fadeOut();
            }
            _this.preToast = preToast;
            // var shape:egret.Shape = new egret.Shape();
            // shape.graphics.beginFill(0x000000,0.35);
            // shape.graphics.drawRoundRect( 0, 0, w/2, 40, 50 )
            // shape.graphics.endFill();
            // this.addChild(shape);
            var bg = new egret.Bitmap(Toast._txtrToastBg);
            _this.addChild(bg);
            var tx = new eui.Label();
            tx.multiline = true;
            tx.size = 25;
            tx.bold = true;
            tx.textColor = 0xFFF9F0;
            tx.stroke = 1;
            tx.strokeColor = 0x532D03;
            tx.text = msg;
            tx.fontFamily = "微软雅黑";
            tx.textAlign = egret.HorizontalAlign.CENTER;
            tx.width = bg.$getWidth();
            // tx.x = this.$getWidth()/2;
            tx.y = _this.$getHeight() / 2;
            _this.addChild(tx);
            _this.x = w / 2 - _this.$getWidth() / 2;
            _this.y = h / 2 - _this.$getHeight() / 2;
            _this.alpha = 0;
            egret.Tween.get(_this)
                .to({ alpha: 1 }, 800, egret.Ease.quintOut)
                .wait(1600)
                .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(function () {
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            });
            return _this;
        }
        Toast.init = function (cont, txtrToastBg) {
            this._cont = cont;
            this._txtrToastBg = txtrToastBg;
        };
        Toast.launch = function (msg) {
            if (this._cont) {
                var toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight, this._lastToast);
                this._cont.addChild(toast);
                this._lastToast = toast;
            }
        };
        Toast.prototype.fadeOut = function () {
            var _this = this;
            if (this.preToast) {
                this.preToast.fadeOut();
            }
            egret.Tween.get(this)
                .to({ y: this.y - 30 }, 80, egret.Ease.quintIn)
                .to({ y: this.y - 60 }, 1000, egret.Ease.quintIn).call(function () {
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            });
        };
        return Toast;
    }(egret.DisplayObjectContainer));
    gamewidget.Toast = Toast;
    __reflect(Toast.prototype, "gamewidget.Toast");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=Toast.js.map