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
    var GunView = (function (_super) {
        __extends(GunView, _super);
        function GunView(parent, stageW, stageH) {
            var _this = _super.call(this) || this;
            _this.isProduceFish = true;
            _this.autoInt = []; // 自动索引
            _this.gameSound = gamewidget.SoundModule.getInstance();
            _this.gameApp = base.GameApp.getInstance();
            //////////////////////////////////////////////////////////////////////// 
            ////////////////////////////---- 出鱼 ----///////////////////////////
            _this.fishs = [];
            _this.fishcount = 0;
            _this.parent = parent;
            _this.stageW = stageW;
            _this.stageH = stageH;
            _this.startFishPos = stageH / 7;
            _this.initNative();
            return _this;
        }
        GunView.prototype.initUI = function (server) {
            this.base = new egret.Bitmap();
            this.base.texture = RES.getRes("gun_base_png");
            this.addChild(this.base);
            this.gun = new egret.Bitmap();
            this.gun.texture = RES.getRes("gun_png");
            this.addChild(this.gun);
            this.shot = new egret.Bitmap();
            this.shot.texture = RES.getRes("shot_png");
            this.addChild(this.shot);
            this.betScore = new gamewidget.BetScore();
            this.betScore.initUI();
            this.addChild(this.betScore);
            // this.winnumfish = new gamewidget.FishNumberView();
            this.open(this.parent, this.stage);
            //金币数额
            this.goldPay = new gamewidget.GoldPay();
            this.addChildAt(this.goldPay, this.numChildren - 1);
            this.goldPay.x = 10;
            this.goldPay.y = this.stageH - 80;
            this.winnum = new gamewidget.NumberView(this.stageH); //金币数额上方的添加金币特效
            this.addChildAt(this.winnum, this.numChildren - 1);
            this.netview = new gamewidget.NetView(); //鱼网的对象
            this.server = server;
            this.server.addEventListener(SocketEvent.SOCKET, this.getSocketDate, this); //注册服务器监听事件
            if (true) {
                // this.server.testCreateSocket(null);//创建服务器连接
            }
        };
        GunView.prototype.open = function ($parent, stage) {
            this.width = this.stageW;
            this.height = this.stageH;
            var rate = 1.0;
            this.base.x = 543;
            this.base.y = this.height - this.base.height * rate;
            this.betScore.x = 543;
            this.betScore.y = this.height - this.base.height * rate;
            var gx = this.gun.width / 2;
            var gy = this.gun.height / 2 + 20;
            this.gun.anchorOffsetX = gx;
            this.gun.anchorOffsetY = gy;
            this.gun.x = 552 + gx;
            this.gun.y = this.height - this.gun.height * rate + gy + 15;
            this.shot.anchorOffsetX = this.shot.width / 2;
            this.shot.anchorOffsetY = this.shot.height / 2;
            this.base.scaleX = this.base.scaleY = rate;
            this.gun.scaleX = this.gun.scaleY = rate;
            this.shot.scaleX = this.shot.scaleY = rate;
            this.shot.alpha = 0;
            this.space = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
            this.lastAngle = 0;
            this.gunReady();
        };
        ////////////////////////////---- 自动发炮 ----/////////////////////////// 
        /**
         * 停止托管
         * @param param 参数
         */
        GunView.prototype.stopAutoPlay = function () {
            IS_AUTO_SHOOT = false;
            this.stopAutoShoot();
        };
        /**
         * 开始托管
         * @param param 参数
         */
        GunView.prototype.startAutoPlay = function () {
            IS_AUTO_SHOOT = true;
            if (this.autoInt.length > 0) {
                this.stopAutoShoot();
            }
            this.startAutoShoot();
        };
        /**
         * 停止自动出炮
         * @param param 参数
         */
        GunView.prototype.stopAutoShoot = function () {
            this.autoInt.forEach(function (e) {
                egret.clearInterval(e);
            });
            // this.autoInt.splice( 0,this.autoInt.length );
        };
        /**
         * 开始自动出炮
         * @param param 参数
         */
        GunView.prototype.startAutoShoot = function () {
            var _this = this;
            var i = egret.setInterval(function () {
                _this.shootTheBullet(_this.lastTargetX, _this.lastTargetY);
            }, this, 300);
            this.autoInt.unshift(i);
        };
        GunView.prototype.produceFish = function (position, lAndr, fishtype) {
            var _this = this;
            this.fishcount++;
            var nowtype = this.transType(fishtype)[0];
            var fspeed = this.transType(fishtype)[1];
            var theFish = gamewidget.Fish.produce(nowtype);
            theFish.setCount(this.fishcount);
            theFish.setType(fishtype);
            // egret.log("fishtype="+nowtype);
            if (lAndr == 0) {
                theFish.x = 0 - theFish.width;
                theFish.y = this.startFishPos * position;
                theFish.skewY = 180;
                this.addChildAt(theFish, 10);
                this.fishs.push(theFish);
                egret.Tween.get(theFish).to({ x: this.stageW + theFish.width, y: this.startFishPos * position }, fspeed * 1000, egret.Ease.sineIn).call(function () {
                    _this.fishs.splice(_this.fishs.indexOf(theFish), 1);
                    _this.removeChild(theFish);
                });
            }
            else if (lAndr == 1) {
                theFish.x = this.stageW + theFish.width;
                theFish.y = this.startFishPos * position;
                this.addChildAt(theFish, 10);
                this.fishs.push(theFish);
                egret.Tween.get(theFish).to({ x: 0 - theFish.width, y: this.startFishPos * position }, fspeed * 1000, egret.Ease.sineIn).call(function () {
                    _this.fishs.splice(_this.fishs.indexOf(theFish), 1);
                    _this.removeChild(theFish);
                });
            }
        };
        /**游戏碰撞检测*/
        GunView.prototype.gameHitTest = function (bullet, bulletInt) {
            var j;
            // var fishCount:number;
            var thefish;
            this.pfishcount = this.fishs.length;
            for (j = 0; j < this.pfishcount; j++) {
                thefish = this.fishs[j];
                if (thefish.$hitTest(bullet.x, bullet.y)) {
                    this.killBullet(bullet, bulletInt);
                    this.netview.open(bullet.x, bullet.y, this); //开网
                    //消除被打中的鱼
                    // egret.Tween.removeTweens(thefish);
                    // this.removeChild(thefish);
                    // this.fishs.splice(this.fishs.indexOf(thefish),1);
                    // fishCount--;
                    this.gameSound.playSound({ name: "hit_fish_sound" });
                    // egret.log("属于"+thefish.getType()+"类鱼");
                    var data = {};
                    data["fishNo"] = thefish.getType();
                    data["bulletnum"] = gamewidget.BetScore.value;
                    data["hashcode"] = thefish.hashCode;
                    var x = parseInt(thefish.x.toFixed(0));
                    var y = parseInt(thefish.y.toFixed(0));
                    data["x"] = x;
                    data["y"] = y;
                    // this.goldPay.delGold(BetScore.value);//扣币
                    this.server.catchFish(data);
                    break;
                }
            }
        };
        //////////////////////////////////////////////////////////////////////// 
        ////////////////////////////---- 手动发炮 ----///////////////////////////
        /**
         * 手指触摸桌面开始
         * @param param 参数
         */
        GunView.prototype.tapStart = function (e) {
            if (!IS_AUTO_SHOOT && this.shootTime) {
                //非自动托管时并存在上次触摸时间戳，50毫秒内不得发炮
                var now = new Date().getTime();
                if (now - this.shootTime < 50)
                    return;
            }
            //当前触摸时时间戳
            this.shootTime = new Date().getTime();
            this.tapTheGun(e); //转向
            this.gunReady(); //瞄准
            if (IS_AUTO_SHOOT)
                return; //托管状态下只瞄准 不主动发炮
            this.shootTheBullet(this.lastTargetX, this.lastTargetY); //发炮
        };
        /**
         * 取得手指点击的坐标
         * @param param 参数
         */
        GunView.prototype.tapTheGun = function (e) {
            var x = e.stageX, y = e.stageY;
            this.turnTheGun(x, y);
        };
        /**
         * 根据点击的坐标调整炮的角度
         * @param param 参数
         */
        GunView.prototype.turnTheGun = function (x, y) {
            var diff_x = x - this.gun.x, diff_y = y - this.gun.y;
            //返回角度,不是弧度
            var angle;
            if (diff_y >= 0) {
                if (diff_y == 0 && diff_x == 0) {
                    angle = 0;
                }
                else {
                    angle = diff_x < 0 ? -75 : 75;
                }
            }
            else {
                angle = 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
                angle = angle > 0 ? -1 * (90 - angle) : 90 + angle;
                angle = angle > 75 ? 75 : angle;
                angle = angle < -75 ? -75 : angle;
            }
            this.lastAngle = this.gun.rotation = angle;
        };
        /**
         * 瞄准目标
         * @param param 参数
         */
        GunView.prototype.gunReady = function () {
            this.getBulletPos();
            this.getShootTargetXY();
        };
        /**
         * 计算子弹坐标位置
         * @param param 参数
         */
        GunView.prototype.getBulletPos = function () {
            var angle = this.lastAngle;
            var ng = Math.abs(angle) * (2 * Math.PI) / 360;
            var r = 115; //发射炮弹半径
            var tempX = Math.sin(ng) * r, tempY = Math.cos(ng) * r;
            this.lastBulletX = angle > 0 ? this.gun.x + tempX : this.gun.x - tempX;
            this.lastBulletY = this.gun.y - tempY;
        };
        /**
         * 生成子弹
         * @param param 参数
         */
        GunView.prototype.setBulletPos = function (bullet) {
            this.shot.x = bullet.x = this.lastBulletX;
            this.shot.y = bullet.y = this.lastBulletY;
            bullet.rotation = this.shot.rotation = this.lastAngle;
            this.shot.alpha = 1;
        };
        /**
         * 计算子弹最终停止目标坐标（未碰到鱼儿的情况下）
         * @param param 参数
         */
        GunView.prototype.getShootTargetXY = function () {
            var angle = this.lastAngle;
            var ng = Math.abs(angle) * (2 * Math.PI) / 360;
            var tempX = Math.sin(ng) * this.space, tempY = Math.cos(ng) * this.space;
            this.lastTargetX = angle > 0 ? this.gun.x + tempX : this.gun.x - tempX;
            this.lastTargetY = this.gun.y - tempY;
        };
        //////////////////////////////////////////////////////////////////////// 
        ////////////////////////////---- 发炮过程 ----///////////////////////////
        /**
         * 发射子弹
         * @param param 参数
         */
        GunView.prototype.shootTheBullet = function (x, y) {
            var bullet = gamewidget.Bullet.produce("bullet_png", 0, 0);
            // this.bullet =  this.createBitmapByName("bullet_png");
            this.setBulletPos(bullet); //子弹就位
            this.parent.addChildAt(bullet, 6);
            //播放子弹声音
            this.gameSound.playSound({ name: "gun_shot" });
            //发炮！！！
            this.fireNow(x, y, bullet);
        };
        /**
         * 发炮！！！
         * @param param 参数
         */
        GunView.prototype.fireNow = function (x, y, bullet) {
            var _this = this;
            var bulletInt = egret.setInterval(function () {
                _this.touchEdge(bullet, _this.width, _this.height, bulletInt); //子弹碰到桌面边缘的检测
                // this.parent['testCatchAllFish']( bullet, bulletInt ) //子弹碰到鱼的检测   
                _this.gameHitTest(bullet, bulletInt);
            }, this, 100);
            this.fire(x, y, bullet);
        };
        /**
         * 开火！！！
         * @param param 参数
         */
        GunView.prototype.fire = function (x, y, bullet) {
            egret.Tween.get(bullet).to({ x: x, y: y }, this.space / 1000 * 1000);
            egret.Tween.get(this.shot).wait(200).to({ alpha: 0 }, 500);
        };
        /**
         * 开始张网抓鱼
         * @param param 参数
         */
        GunView.prototype.catchTheFish = function (hashCode, num, bullet, bulletInt) {
            // lxCore.MyEvent.applyFunc( SoundEvent.NAME, SoundEvent.PLAY_SOUND, { name: "hit_fish_sound" });   
            // let net = lxCore.App.ViewManagers.getAView("net",NetView,this.myController);
            // lxCore.App.ViewManagers.open( net, this, { x: bullet.x, y: bullet.y, index: hashCode, num: num  } );    
            //开网                                           
            // this.killBullet( bullet ,bulletInt); 
        };
        /**
         * 子弹碰到桌面边缘的检测
         * @param param 参数
         */
        GunView.prototype.touchEdge = function (bullet, w, h, bulletInt) {
            if (bullet.x < 0) {
                this.bounceBack(1, bullet, w, h, bulletInt);
            }
            else if (bullet.y < 0) {
                this.bounceBack(2, bullet, w, h, bulletInt);
            }
            else if (bullet.x > w) {
                this.bounceBack(3, bullet, w, h, bulletInt);
            }
            else if (bullet.y > h) {
                this.bounceBack(4, bullet, w, h, bulletInt);
            }
        };
        GunView.prototype.bounceBack = function (type, bullet, w, h, bulletInt) {
            var x1 = 0, y1 = 1;
            egret.Tween.removeTweens(bullet);
            var xn = bullet.x;
            var yn = bullet.y;
            var hu = (2 * Math.PI) / 360;
            var rotation = bullet.rotation;
            if (type == 1) {
                var gayn = (0 - xn) * Math.tan(Math.abs((Math.abs(rotation) - 90) * hu));
                bullet.y = rotation > -90 ? yn - gayn : yn + gayn;
                bullet.x = 0;
                var angle = bullet.rotation = Math.abs(rotation);
                angle = angle > 90 ? (180 - angle) : angle;
                var ng = Math.abs(angle) * (2 * Math.PI) / 360;
                var tempX = Math.sin(ng) * this.space, tempY = Math.cos(ng) * this.space;
                x1 = bullet.x + tempX;
                y1 = bullet.rotation <= 90 ? bullet.y - tempY : bullet.y + tempY;
            }
            else if (type == 2) {
                var gaxn = (0 - yn) * Math.tan(Math.abs(rotation) * hu);
                bullet.x = rotation > 0 ? xn - gaxn : xn + gaxn;
                bullet.y = 0;
                var angle = bullet.rotation = rotation > 0
                    ? rotation + 2 * (90 - rotation)
                    : rotation - 2 * (90 - Math.abs(rotation));
                angle = 180 - Math.abs(angle);
                var ng = Math.abs(angle) * hu;
                var tempX = Math.sin(ng) * this.space, tempY = Math.cos(ng) * this.space;
                x1 = bullet.rotation > 0 ? bullet.x + tempX : bullet.x - tempX;
                y1 = bullet.y + tempY;
            }
            else if (type == 3) {
                var gayn = (xn - w) * Math.tan((Math.abs(rotation - 90)) * hu);
                bullet.y = rotation > 90 ? yn - gayn : yn + gayn;
                bullet.x = w;
                var angle = bullet.rotation = -1 * rotation;
                angle = angle >= -90 ? Math.abs(angle) : 180 - Math.abs(angle);
                var ng = angle * hu;
                var tempX = Math.sin(ng) * this.space, tempY = Math.cos(ng) * this.space;
                x1 = bullet.x - tempX;
                y1 = bullet.rotation >= -90 ? bullet.y - tempY : bullet.y + tempY;
            }
            else if (type == 4) {
                var gaxn = (yn - h) * Math.tan((180 - Math.abs(rotation)) * hu);
                bullet.x = rotation > 0 ? xn - gaxn : xn + gaxn;
                bullet.y = h;
                var angle = bullet.rotation = rotation > 0
                    ? rotation - 2 * (rotation - 90)
                    : rotation + 2 * (Math.abs(rotation) - 90);
                var ng = Math.abs(angle) * (2 * Math.PI) / 360;
                var tempX = Math.sin(ng) * this.space, tempY = Math.cos(ng) * this.space;
                x1 = angle > 0 ? bullet.x + tempX : bullet.x - tempX;
                y1 = bullet.y - tempY;
            }
            egret.Tween.get(bullet).to({ x: x1, y: y1 }, this.space / 1000 * 1000);
        };
        /**
         * 清除子弹
         * @param param 参数
         */
        GunView.prototype.killBullet = function (bullet, bulletInt) {
            egret.Tween.removeTweens(bullet);
            this.parent.removeChild(bullet);
            egret.clearInterval(bulletInt);
        };
        GunView.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        //==========================转换鱼的种类==============================
        GunView.prototype.transType = function (type) {
            switch (type) {
                case 1:
                    return [4, 12];
                case 2:
                    return [8, 12];
                case 3:
                    return [9, 13];
                case 4:
                    return [10, 15];
                case 5:
                    return [7, 18];
                case 6:
                    return [5, 18];
                case 7:
                    return [11, 18];
                case 8:
                    return [1, 18];
                case 9:
                    return [12, 25];
                case 10:
                    return [6, 35];
                case 11:
                    return [2, 35];
                case 12:
                    return [3, 40];
            }
        };
        //======================================================================
        //===================接收服务器数据======================================
        GunView.prototype.getSocketDate = function (socketevent) {
            // egret.log("服务器接受事件");
            var jsonData = JSON.parse(socketevent.strjson);
            switch (jsonData.Msg) {
                case gamewidget.ServerModel.LOGIN_SERVER:
                    this.goldPay.setGold(jsonData["_gold"]);
                    break;
                case gamewidget.ServerModel.PRODUCE_FISH:
                    if (this.isProduceFish) {
                        for (var i = 1; i <= 5; i++) {
                            var fishtype = jsonData["seaway" + i + "left"];
                            if (fishtype > 0) {
                                // egret.log("left"+fishtype);
                                this.produceFish(i, 0, fishtype);
                            }
                        }
                        for (var j_1 = 1; j_1 <= 5; j_1++) {
                            var fishtype = jsonData["seaway" + j_1 + "right"];
                            if (fishtype > 0) {
                                // egret.log("right"+fishtype);
                                this.produceFish(j_1, 1, fishtype);
                            }
                        }
                    }
                    break;
                case gamewidget.ServerModel.CATCH_FISHS:
                    // egret.log("捉到了鱼");
                    var re = jsonData["re"];
                    egret.log("re=" + re);
                    if (0 == re) {
                        this.goldPay.delGold(gamewidget.BetScore.value, this.server); //扣币
                        var catch_gold = jsonData["catch_gold"];
                        //let catch_gold:number = 100000;
                        if (catch_gold > 0) {
                            var content = jsonData["warncontent"];
                            var userid = jsonData["userId"];
                            var fishNo = jsonData["fishNo"];
                            var _gold = jsonData["_gold"];
                            var score = jsonData["score"];
                            var targetincome = jsonData["target_after_IncomeGold"];
                            var hashcode = jsonData["hashcode"];
                            var fishx = jsonData["x"];
                            var fishy = jsonData["y"];
                            var thefish = void 0;
                            // egret.log("捉到了鱼,并获得了"+catch_gold);
                            this.winnum.showTheBean(catch_gold);
                            if (catch_gold < 500) {
                                var winnumfish = new gamewidget.FishNumberView();
                                winnumfish.showTheBean(this, catch_gold, fishx, fishy);
                                this.addChildAt(winnumfish, this.numChildren - 1);
                                this.gameSound.playSound({ name: "get_bean" });
                            }
                            else {
                                var caipan = new gamewidget.CaiPan();
                                caipan.open(this, { x: fishx, y: fishy, value: catch_gold });
                                this.addChildAt(caipan, this.numChildren - 1);
                                this.gameSound.playSound({ name: "big_bean" });
                            }
                            this.goldPay.setGold(_gold);
                            this.server.nativieModel.updateMoney(_gold);
                            this.pfishcount = this.fishs.length;
                            for (var j = 0; j < this.pfishcount; j++) {
                                thefish = this.fishs[j];
                                if (thefish.hashCode == hashcode) {
                                    //消除被打中的鱼
                                    egret.Tween.removeTweens(thefish);
                                    this.removeChild(thefish);
                                    this.fishs.splice(this.fishs.indexOf(thefish), 1);
                                    this.pfishcount--;
                                }
                            }
                        }
                    }
                    else {
                        gamewidget.Toast.launch(jsonData["warncontent"]);
                    }
                    break;
                case gamewidget.ServerModel.CHANGE_STATE:
                    var gold = jsonData["_gold"];
                    var type = jsonData["type"];
                    if (type == 1) {
                        this.goldPay.setGold(gold);
                    }
                    break;
            }
        };
        GunView.prototype.isPhone = function () {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var stros = egret.Capabilities.os;
            var bwinPc = stros == "Windows PC";
            var bMac = stros == "Mac OS";
            egret.log(stros);
            if (bwinPc || bMac) {
                return true;
            }
            else {
                return false;
            }
        };
        GunView.prototype.initNative = function () {
            var _this = this;
            var ispc = this.isPhone();
            setupWebViewJavascriptBridge(function (bridge) {
                bridge.registerHandler('n2j_EnterExitGameRoom', function (data, responseCallback) {
                    if (typeof (data) == "string") {
                        if (data == "0") {
                            _this.server.nativieModel.updateMoney(_this.goldPay.getGold());
                            _this.server.switchState(0, _this.goldPay.getGold(), ispc);
                            _this.stopAutoPlay();
                            _this.parent.autoplay.status("off");
                        }
                        else {
                            data = data.split("#");
                            if (data[0] == "1") {
                                egret.log("1");
                                _this.goldPay.setGold(data[1]);
                                _this.server.switchState(1, _this.goldPay.getGold(), ispc);
                            }
                            else if (data[0] == "0") {
                                _this.server.nativieModel.updateMoney(_this.goldPay.getGold());
                                _this.server.switchState(0, _this.goldPay.getGold(), ispc);
                                _this.stopAutoPlay();
                                _this.parent.autoplay.status("off");
                                _this.goldPay.setGold(data[1]);
                            }
                        }
                    }
                    if (responseCallback)
                        responseCallback(data);
                });
                // 注册enterExitRoom函数给native调用
                bridge.registerHandler('n2j_EnterExitLiveRoom', function (data, responseCallback) {
                    _this.server.nativieModel.updateMoney(_this.goldPay.getGold());
                    _this.server.requireCloseSocket();
                    _this.server.exitGame({});
                    if (responseCallback)
                        responseCallback(data);
                });
            });
        };
        return GunView;
    }(egret.Sprite));
    gamewidget.GunView = GunView;
    __reflect(GunView.prototype, "gamewidget.GunView");
})(gamewidget || (gamewidget = {}));
//# sourceMappingURL=GunView.js.map