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
    var FishNumberView = (function (_super) {
        __extends(FishNumberView, _super);
        function FishNumberView() {
            return _super.call(this) || this;
            // this.height = 400;
            // this.width = 400;
        }
        FishNumberView.prototype.showTheBean = function (gparent, goldnum, x, y) {
            var _this = this;
            var rate = 1.6;
            this.x = x;
            this.y = y;
            this.bean_m_value = new egret.BitmapText();
            this.bean_m_value.scaleX = this.bean_m_value.scaleY = rate * 0.7;
            this.bean_m_value.font = RES.getRes("win_num_fnt");
            this.bean_m_value.text = "+" + goldnum;
            this.bean_m_value.x = 0;
            this.bean_m_value.y = 0;
            this.addChildAt(this.bean_m_value, this.numChildren - 1);
            var by = this.bean_m_value.y = 0;
            egret.Tween.get(this.bean_m_value).to({ y: by - 30 }, 1000).call(function () {
                _this.removeChild(_this.bean_m_value);
                gparent.removeChild(_this);
            });
            // this.beamtext = new egret.TextField();
            // this.addChild(this.beamtext);
            // this.beamtext.touchEnabled = false;
            // this.beamtext.text = "3000";            
            // this.beamtext.x = 0;
            // this.beamtext.y =0;
            // this.beamtext.$setWidth(200);
            // this.beamtext.textColor=0xffffff;
            // this.beamtext.textAlign = egret.VerticalAlign.CONTENT_JUSTIFY;
        };
        return FishNumberView;
    }(egret.Sprite));
    gamewidget.FishNumberView = FishNumberView;
    __reflect(FishNumberView.prototype, "gamewidget.FishNumberView");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=FishNumberView.js.map