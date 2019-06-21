module gamewidget{
    export class SoundModule extends base.baseclass{
        private isPlaySound:boolean = true;

        public constructor(){
            super();
        }

        // 兼容差
        public playSound( e: any )
        {
            if(!this.isPlaySound) return;
            //获取加载到的 Sound 对象
            var sound:egret.Sound = RES.getRes( e.name + "_mp3" );
            //播放音乐
            var channel:egret.SoundChannel = sound.play(0,1);
        }

        public turnSound(isPlay:boolean)
        {
            this.isPlaySound = isPlay;
        }
    }
}