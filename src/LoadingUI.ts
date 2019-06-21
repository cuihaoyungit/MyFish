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

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
        protected loading: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        protected loadingNum: egret.TextField = new egret.TextField();
        protected loadingBg: egret.Bitmap = new egret.Bitmap();
        protected loadingBar: egret.Bitmap = new egret.Bitmap();
        protected loadingMask: egret.Rectangle;
        protected backgroundImg: egret.Bitmap;
    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        // this.textField = new egret.TextField();
        // this.addChild(this.textField);
        // this.textField.y = 300;
        // this.textField.width = 480;
        // this.textField.height = 100;
        // this.textField.textAlign = "center";

            this.backgroundImg = new egret.Bitmap();
            this.backgroundImg.texture = RES.getRes("loading_bg_png");     
            this.loadingBg.texture = RES.getRes("loadingBg_png");
            this.loadingBar.texture = RES.getRes("loadingBar_png");         
            this.loadingNum.text = "0%";
            this.loadingMask = new egret.Rectangle( 0, 0, 0, this.loadingBar.height );
            this.loadingBar.mask = this.loadingMask;
            this.loadingNum.y = - 60;
            this.loadingNum.x = ( this.loadingBg.width - this.loadingNum.width ) / 2; 

            this.loading.addChild( this.loadingBg );
            this.loading.addChild( this.loadingBar );
            this.loading.addChild( this.loadingNum );
    }

    public onProgress(loaded: number, total: number): void {
        // this.textField.text = `Loading...${loaded}/${total}`;
            this.loadingNum.text = Math.floor(loaded / total * 100)  + "%";
            this.loadingMask = new egret.Rectangle( 0, 0, ( loaded / total ) * this.loadingBar.width , this.loadingBar.height );
            this.loadingBar.mask = this.loadingMask;
            if(loaded==100){
                this.hide();
            }

    }
    public show( stage: egret.Stage, scalse ){

           stage.addChild( this.backgroundImg );
           stage.addChild( this.loading );
           let rate = scalse || 1;

           this.backgroundImg.width = stage.stageWidth;
           this.backgroundImg.height = stage.stageHeight;
           this.loading.scaleX = rate;
           this.loading.scaleY = rate;
           this.loading.x = ( stage.stageWidth - this.loadingBg.width * rate ) / 2;
           this.loading.y = this.backgroundImg.height * 0.75 ;
          

        }

    private hide(){
           if( this.loading.parent ) {
               this.loading.parent.removeChild( this.backgroundImg );
               this.loading.parent.removeChild( this.loading );
           }    
    }

    
    
    public destory(){

            this.loadingBg.texture = null;
            this.loadingBar.texture = null;
            this.backgroundImg.texture = null;
            this.backgroundImg = null;
            this.loadingBg = null;
            this.loadingBar = null;
            this.loadingNum = null; 
            this.loadingMask = null;
            this.loading = null;
            
        
        }
}
