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
//
//
//
//
//
//
//
// 集中管理个人相关信息
//
//
var user;
(function (user) {
    var UserModel = (function (_super) {
        __extends(UserModel, _super);
        function UserModel() {
            var _this = _super.call(this) || this;
            _this.userId = 233669728;
            _this.token = "5f97df0f6d1623b91bf0bdcc52ad5a66";
            return _this;
        }
        UserModel.prototype.registerFunc = function (e) {
            e = e.data;
            switch (e.key) {
                default:
                    break;
            }
        };
        /**
         * 销毁
         */
        UserModel.prototype.destroy = function () {
        };
        return UserModel;
    }(base.baseclass));
    user.UserModel = UserModel;
    __reflect(UserModel.prototype, "user.UserModel");
})(user || (user = {}));
