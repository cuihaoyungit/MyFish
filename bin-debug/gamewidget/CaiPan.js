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
    var CaiPan = (function (_super) {
        __extends(CaiPan, _super);
        function CaiPan() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        /**
         *对面板进行显示初始化
        *
        */
        CaiPan.prototype.initUI = function () {
            this.caiPan = new egret.Bitmap();
            this.caiPan.texture = RES.getRes("pan_png");
            this.addChild(this.caiPan);
            this.tag = new egret.Bitmap();
            this.tag.texture = RES.getRes("tag_png");
            this.tag.y = this.caiPan.height * .6;
            this.tag.x = (this.caiPan.width - this.tag.width) / 2;
            this.bean = new egret.BitmapText();
            this.bean.font = RES.getRes("pan_num_fnt");
            this.bean.y = this.tag.y + 8;
            this.bean.height = 40;
            this.bean.width = 180;
            this.bean.x = (this.caiPan.width - this.bean.width) / 2;
            this.bean.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.bean.textAlign = egret.HorizontalAlign.CENTER;
        };
        /**
         * view开启执行函数
         * @param param 参数
         * @param $parent 父view
         */
        CaiPan.prototype.open = function (parent, param) {
            // this.fish = lxCore.App.ViewManagers.getAView( "fishs" + param.num, Fish, this.myController );
            // lxCore.App.ViewManagers.open( this.fish, this, { direction:1 ,fishNum: param.num, index: -1, fishx: this.caiPan.width , fishy: this.caiPan.height, notMove: true } );   
            var _this = this;
            this.addChild(this.tag);
            var textvalue = param.value + "";
            this.bean.text = textvalue;
            this.addChild(this.bean);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x = param.x;
            if (param.x + this.width / 2 > param.w) {
                this.x = param.x - this.width / 2;
            }
            else if (param.x - this.width / 2 < 0) {
                this.x = param.x + this.width / 2;
            }
            this.y = param.y;
            this.alpha = .1;
            egret.Tween.get(this).to({ alpha: 1 }, 200)
                .wait(800).to({ alpha: 0.1 }, 200).call(function () {
                parent.removeChild(_this);
            });
        };
        /**
         * 面板关闭执行函数
         * @param param 参数
         */
        CaiPan.prototype.close = function (param) {
            this.removeChild(this.tag);
            this.removeChild(this.bean);
        };
        /**
         * 销毁
         */
        CaiPan.prototype.destroy = function () {
            this.caiPan = null;
            this.tag = null;
            this.caiPan.texture = null;
            this.tag.texture = null;
            this.bean.font = null;
            this.bean = null;
        };
        return CaiPan;
    }(egret.Sprite));
    gamewidget.CaiPan = CaiPan;
    __reflect(CaiPan.prototype, "gamewidget.CaiPan");
})(gamewidget || (gamewidget = {}));
