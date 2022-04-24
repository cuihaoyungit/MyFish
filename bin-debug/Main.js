//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._pauseTime = 30;
        _this.bgChangeTime = BG_CHANG_TIME; //切换背景间隔时间
        _this.bgMoveTime = BG_MOVE_TIME; //背景移动过程时间
        _this.isPlaySound = true;
        _this.gameSound = gamewidget.SoundModule.getInstance();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var _this = this;
        this.loadSound();
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
            // egret.log("onPause");
            _this.bgView.isPause(true);
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
            //  egret.log("onResume");
            _this.bgView.isPause(false);
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.loadSound = function () {
        var sound = this._sound = new egret.Sound();
        ;
        //sound 加载完成监听
        // sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
        //     this.init();
        // }, this);
        sound.load("/resource/assets/games/fish/sound/change_sence.mp3");
    };
    //播放
    Main.prototype.soundplay = function () {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
    };
    //停止
    Main.prototype.soundstop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    Main.prototype.onComplete = function (e) {
        // console.log("播放完成");
        this.soundstop();
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("loading", 0, null)];
                    case 2:
                        _a.sent();
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        loadingView.show(this.stage, 1);
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        this.logutil = new gamewidget.LogUtils();
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        // this.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shot, this);
        //初始化提示框
        gamewidget.Toast.init(this.stage, RES.getRes("toast_bg_png"));
        this.bgView = new gamewidget.BgView();
        this.bgView.width = this.stageW;
        this.bgView.height = this.stageH;
        this.bgView.initUI(this.stageW, this.stageH);
        this.addChild(this.bgView);
        this.bgView.touchEnabled = true;
        this.bgView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shot, this);
        //初始化服务器
        this.server = new gamewidget.ServerModel();
        this.server.init();
        //初始化js桥
        // this.nativieModel = new gamewidget.NativeModel();
        // this.nativieModel.init();
        //初始化游戏界面
        egret.log("初始化游戏界面");
        this.gunview = new gamewidget.GunView(this, this.stageW, this.stageH);
        this.gunview.initUI(this.server);
        this.addChildAt(this.gunview, 4);
        //托管按钮
        this.autoplay = new gamewidget.AutoPlay();
        this.stage.addChild(this.autoplay);
        this.autoplay.x = this.stageW - this.autoplay.width - 10;
        this.autoplay.y = this.stageH - this.autoplay.height - 13;
        this.autoplay.touchEnabled = true;
        this.autoplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAutoPlayClick, this);
        this.autoplay.status("off");
        var buyButton = this.createBitmapByName("buy_png");
        buyButton.touchEnabled = true;
        buyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
        buyButton.x = this.stageW - buyButton.width - 150;
        buyButton.y = this.stageH - buyButton.height;
        // buyButton.anchorOffsetX = buyButton.width/2;
        // buyButton.anchorOffsetY = buyButton.height/2;
        buyButton.scaleX = 0.9;
        buyButton.scaleY = 0.9;
        this.addChild(buyButton);
        //声音控制按钮
        this.soundSwitch = new gamewidget.SoundSwitch();
        this.stage.addChild(this.soundSwitch);
        this.soundSwitch.x = 30;
        this.soundSwitch.y = 30;
        this.soundSwitch.touchEnabled = true;
        this.soundSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundSwitch, this);
        this.soundSwitch.status("on");
    };
    //发射子弹
    Main.prototype.shot = function (evt) {
        this.gunview.tapStart(evt);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    //点击自动发射
    Main.prototype.onAutoPlayClick = function (e) {
        this.gameSound.playSound({ name: "button" });
        var autoplay = e.currentTarget;
        if (autoplay.isCheck) {
            autoplay.status("on");
            this.gunview.startAutoPlay();
        }
        else {
            autoplay.status("off");
            this.gunview.stopAutoPlay();
        }
    };
    //点击跳转购买
    Main.prototype.onBuyClick = function (e) {
        this.gameSound.playSound({ name: "button" });
        gamewidget.NativeModel.nativeBridge.callHandler('j2n_PayButton', { 'data': '' }, function responseCallback(responseData) {
            egret.log("j2n_PayButton");
        });
    };
    //声音开关
    Main.prototype.onSoundSwitch = function (e) {
        this.gameSound.playSound({ name: "button" });
        var soundswitch = e.currentTarget;
        if (soundswitch.isCheck) {
            soundswitch.status("on");
            this.isPlaySound = true;
            this.gameSound.turnSound(true);
        }
        else {
            soundswitch.status("off");
            this.isPlaySound = false;
            this.gameSound.turnSound(false);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
