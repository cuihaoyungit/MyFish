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
    var NumberView = (function (_super) {
        __extends(NumberView, _super);
        function NumberView(stageH) {
            var _this = _super.call(this) || this;
            _this.initUi(stageH);
            _this.height = stageH;
            return _this;
        }
        NumberView.prototype.initUi = function (stageH) {
            var data = RES.getRes("win_bean_m_json");
            var txtr = RES.getRes("win_bean_m_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.bean_m = new egret.MovieClip(mcFactory.generateMovieClipData("win_bean_m"));
            this.bean_m.x = 30;
            this.bean_m.y = stageH - 210;
            var rate = 1.6;
            this.bean_m.scaleX = this.bean_m.scaleY = rate;
            this.bean_m.addEventListener(egret.Event.COMPLETE, function () {
                this.bean_m.gotoAndStop(1);
                this.removeChild(this.bean_m);
            }, this);
            this.bean_m_value = new egret.BitmapText();
            this.bean_m_value.scaleX = this.bean_m_value.scaleY = rate * 0.7;
            this.bean_m_value.font = RES.getRes("win_num_fnt");
            this.bean_m_value.text = "0";
            this.bean_m_value.width = 200;
            this.bean_m_value.height = 50;
            this.bean_m_value.x = 100;
            this.bean_m_value.y = stageH - 120;
        };
        NumberView.prototype.showTheBean = function (goldnum) {
            var _this = this;
            if (goldnum > 0) {
                if (this.bean_m.parent)
                    this.removeChild(this.bean_m);
                this.bean_m.gotoAndStop(1);
                this.addChild(this.bean_m);
                this.bean_m.gotoAndPlay(0, 3);
                // if( this.bean_m_value.parent ) 
                this.addChildAt(this.bean_m_value, this.numChildren - 1);
                var y = this.bean_m_value.y = this.height - 120;
                egret.Tween.removeTweens(this.bean_m_value);
                this.bean_m_value.text = "" + goldnum;
                // this.addChild(this.bean_m_value); 
                egret.Tween.get(this.bean_m_value).to({ y: y - 30 }, 1000).call(function () {
                    _this.removeChild(_this.bean_m_value);
                });
            }
        };
        return NumberView;
    }(egret.Sprite));
    gamewidget.NumberView = NumberView;
    __reflect(NumberView.prototype, "gamewidget.NumberView");
})(gamewidget || (gamewidget = {}));
