// TypeScript file
//
//
//  定时检测链接状态
//

module gamewidget{
    export class ConnectTimer 
    {
        private timer: number;
        private lastTime: number;
        
        public constructor()
        {
            
        }


        public killTimer()
        {
            if(this.timer)
            egret.clearInterval( this.timer );
            this.timer = null;
        }

        public createTimer()
        {
            if(this.timer) return;

            let testTime = 5000;
            let gaptime = 2000;

            this.timer = egret.setInterval(()=>{
                
                if(DEBUG){
                    // egret.log( "断线检测中" );
                }
                
                if( !this.lastTime ) return;
                let now = new Date().getTime();

                if( now - this.lastTime > testTime && now - this.lastTime <= testTime + gaptime )
                {

                    if(DEBUG)
                    {
                        egret.log( "疑似断线中，正在尝试联系服务端" );
                    }

                    //ServerModel.getInstance().connectToServer();
                }
                else 
                if( now - this.lastTime > testTime + gaptime )
                {

                    if(DEBUG)
                    {
                        egret.log( "服务端已经断开，正在重连..." );
                    }

                    //ServerModel.getInstance().reConnectToServer();
                    this.killTimer();
                }

            }, this, 1000 )
        }

        public destory(){
            
        }

        public setLastTime(lastTime: number)
        {
            this.lastTime = lastTime;
        }
    }

}