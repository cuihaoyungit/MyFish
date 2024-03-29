var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* @description:  基础类
* @author: newk
* @version: 1.0
* @modify:
* @Copyright:
*/
var base;
(function (base) {
    var baseclass = (function () {
        function baseclass() {
        }
        /**
         * 获取一个单例
         * 被继承类，当某一个对象再全周期内只需要启动一次时可以继承此类
         * 通过类的静态属性_instance是否存在属性来判断对象是否已经被建立
         * 如果该类已经有一个对象则直接返回_instance值，也就是单例对象
         * 否则新建一个对象并储存到_instance内再返回这个新对象
         * 由于构造参数要对应，目前只能用判断参数长度的方法来按数量传入参数
         * 建议单例类的构造函数不要使用参数，在对象创建以后通过对象的init方法来初始化对象内部
         * @returns {any}
         */
        baseclass.getInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var Class = this;
            if (!Class._instance) {
                var argsLen = args.length;
                if (argsLen == 0) {
                    Class._instance = new Class();
                }
                else if (argsLen == 1) {
                    Class._instance = new Class(args[0]);
                }
                else if (argsLen == 2) {
                    Class._instance = new Class(args[0], args[1]);
                }
                else if (argsLen == 3) {
                    Class._instance = new Class(args[0], args[1], args[2]);
                }
                else if (argsLen == 4) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3]);
                }
                else if (argsLen == 5) {
                    Class._instance = new Class(args[0], args[1], args[2], args[3], args[4]);
                }
            }
            return Class._instance;
        };
        return baseclass;
    }());
    base.baseclass = baseclass;
    __reflect(baseclass.prototype, "base.baseclass");
})(base || (base = {}));
