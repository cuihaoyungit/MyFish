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

class Main extends egret.DisplayObjectContainer {
        /**@private*/
        private stageW:number;
        /**@private*/
        private stageH:number;
        private _sound: egret.Sound;
        private _channel: egret.SoundChannel;
        private _pauseTime: number = 30;
        private bgChangeTime:number = BG_CHANG_TIME;//切换背景间隔时间
        private bgMoveTime:number = BG_MOVE_TIME;//背景移动过程时间
        private isPlaySound:boolean = true;
         public gameSound:gamewidget.SoundModule = gamewidget.SoundModule.getInstance();
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    private onAddToStage(event: egret.Event) {
        this.loadSound();
        
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            // egret.log("onPause");
            this.bgView.isPause(true);
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            //  egret.log("onResume");
             this.bgView.isPause(false);
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }
    private loadSound(): void {
        var sound: egret.Sound = this._sound = new egret.Sound();;
        //sound 加载完成监听
        // sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
        //     this.init();
        // }, this);

        sound.load("/resource/assets/games/fish/sound/change_sence.mp3");
    }
        //播放
    private soundplay():void {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
    }
    //停止
    private soundstop():void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            
            this._channel.stop();
            this._channel = null;
        }
    }
    //播放完成
    private onComplete(e:egret.Event):void {
        // console.log("播放完成");
        this.soundstop();
    }
    private async runGame() {

        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("loading", 0, null);
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            loadingView.show(this.stage,1);
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private netview:gamewidget.NetView;
    public autoplay:gamewidget.AutoPlay;
    private soundSwitch:gamewidget.SoundSwitch;
    
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private gunbaseH:number;
    private gunview:gamewidget.GunView;
    public nativieModel:gamewidget.NativeModel;
    private logutil:gamewidget.LogUtils;
    private server:gamewidget.ServerModel;
    private bgView:gamewidget.BgView;
    private createGameScene() {
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
        this.bgView.initUI(this.stageW,this.stageH);
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
        this.gunview = new gamewidget.GunView(this,this.stageW,this.stageH);
        this.gunview.initUI(this.server);
        this.addChildAt(this.gunview,4);


        //托管按钮
        this.autoplay = new gamewidget.AutoPlay();
        this.stage.addChild(this.autoplay);
        this.autoplay.x = this.stageW-this.autoplay.width-10;
        this.autoplay.y = this.stageH-this.autoplay.height-13;
        this.autoplay.touchEnabled = true;
        this.autoplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAutoPlayClick, this);
        this.autoplay.status("off");

        var buyButton:egret.Bitmap = this.createBitmapByName("buy_png");
        buyButton.touchEnabled = true;
        buyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
        buyButton.x = this.stageW-buyButton.width-150;
        buyButton.y = this.stageH-buyButton.height;
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

    }


   //发射子弹
   private shot(evt:egret.TouchEvent){
        
        this.gunview.tapStart(evt);
   }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


//点击自动发射
    private onAutoPlayClick(e: egret.TouchEvent){
        this.gameSound.playSound({name:"button"});
         let autoplay:gamewidget.AutoPlay = e.currentTarget;
            if(autoplay.isCheck)
            {
                autoplay.status("on");
                this.gunview.startAutoPlay();
            }
            else
            {
                autoplay.status("off");
                this.gunview.stopAutoPlay();
            }
    }
    //点击跳转购买
    private onBuyClick(e:egret.TouchEvent){
        this.gameSound.playSound({name:"button"});
        gamewidget.NativeModel.nativeBridge.callHandler('j2n_PayButton', {'data':''}, function responseCallback(responseData) {
                        egret.log("j2n_PayButton");
                    });

    }
    //声音开关
    private onSoundSwitch(e:egret.TouchEvent){
        this.gameSound.playSound({name:"button"});
        let soundswitch:gamewidget.SoundSwitch = e.currentTarget;
        if(soundswitch.isCheck){
            soundswitch.status("on");
            this.isPlaySound = true;
            this.gameSound.turnSound(true);
        }else{
            soundswitch.status("off");
            this.isPlaySound = false;
            this.gameSound.turnSound(false);
        }
    }

     
}