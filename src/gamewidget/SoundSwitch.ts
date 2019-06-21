

module gamewidget
{

    export class SoundSwitch extends egret.Sprite
    {

        public isCheck:boolean = true;
        private btOn:egret.Bitmap;
        private btOff:egret.Bitmap;


        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);   
        }

        private onAddToStage(event:egret.Event)
        {
            this.create();
        }


        private create():void
        {
            this.btOn = new egret.Bitmap();
            this.btOn.texture = RES.getRes("sound_on_png");
            this.btOn.x = 0;
            this.btOn.y = 0;
            this.addChild(this.btOn);


            this.btOff = new egret.Bitmap();
            this.btOff.texture = RES.getRes("sound_off_png");
            this.btOff.x = 0;
            this.btOff.y = 0;
            this.addChild(this.btOff);
            this.btOff.visible = false;
        }

        public status(status:string)
        {
            if(status=="on")
            {
                this.btOn.visible = true;
                this.btOff.visible= false;
            }
            else if(status == "off")
            {
                this.btOn.visible = false;
                this.btOff.visible= true;
            }
            else
            {

            }
            this.isCheck = !this.isCheck;
        }
    }




}
