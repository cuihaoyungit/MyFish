module gamewidget{
    export class LogUtils extends egret.Sprite{
        public constructor(){
            super();
        }
        public  showlog(content:String){
            if(true){
                 egret.log(content);
            }
           
        }
    }
}