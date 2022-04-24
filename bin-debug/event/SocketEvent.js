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
var SocketEvent = (function (_super) {
    __extends(SocketEvent, _super);
    function SocketEvent(strjson) {
        var _this = _super.call(this, strjson) || this;
        _this.strjson = "";
        return _this;
    }
    SocketEvent.SOCKET = "SOCKETEVENT";
    return SocketEvent;
}(egret.Event));
__reflect(SocketEvent.prototype, "SocketEvent");
