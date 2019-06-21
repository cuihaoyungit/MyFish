// TypeScript file
//
//
//
// 充值区域的整体集合封装
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
var gamewidget;
(function (gamewidget) {
    var GoldPay = (function (_super) {
        __extends(GoldPay, _super);
        function GoldPay() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GoldPay.prototype.init = function () {
        };
        GoldPay.prototype.onAddToStage = function (event) {
            this.create();
        };
        GoldPay.prototype.setGold = function (gold) {
            this.gold = gold;
            this.money.text = "" + gold;
        };
        GoldPay.prototype.getGold = function () {
            return this.gold;
        };
        GoldPay.prototype.delGold = function (delgold, server) {
            this.gold = this.gold - delgold;
            this.money.text = "" + (this.gold);
            server.nativieModel.updateMoney(this.gold);
        };
        GoldPay.prototype.create = function () {
            // var back = new egret.Shape();
            // back.graphics.beginFill(0xff0000, 0.0);
            // back.graphics.drawRect(0, 0, 300, 80);
            // back.graphics.endFill();
            // back.x = 0;
            // back.y = 0;
            // this.addChild(back);
            // 算出居中点
            var rect_w = this.width;
            var rect_h = this.height * 0.8;
            var rect_x = this.$getWidth() / 2 - rect_w / 2;
            var rect_y = this.$getHeight() / 2 - rect_h / 2;
            this.anchorOffsetX = this.$getWidth() / 2;
            this.anchorOffsetY = this.$getHeight() / 2;
            this.scaleX = 1.3;
            this.scaleY = 1.3;
            // let backShap = new egret.Shape();
            // backShap.graphics.beginFill(0x000000,0.35);
            // backShap.graphics.drawRoundRect( 40, rect_y, rect_w, rect_h, 80 )
            // backShap.graphics.endFill();
            // this.addChild(backShap);
            var bgbean = new egret.Bitmap();
            bgbean = this.createBitmapByName("bean_bg_png");
            this.addChild(bgbean);
            this.money = new egret.BitmapText();
            this.addChild(this.money);
            this.money.touchEnabled = false;
            this.money.font = RES.getRes("win_num_fnt");
            this.money.text = "0";
            this.money.scaleX = this.money.scaleY = 0.8;
            this.money.y = bgbean.height / 4;
            this.money.x = bgbean.width / 5;
        };
        GoldPay.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        return GoldPay;
    }(egret.Sprite));
    gamewidget.GoldPay = GoldPay;
    __reflect(GoldPay.prototype, "gamewidget.GoldPay");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=GoldPay.js.map