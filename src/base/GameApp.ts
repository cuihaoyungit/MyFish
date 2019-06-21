


//
//
//
//
//
//  主要逻辑入口管理类
//
//

module base
{

    export class GameApp extends base.baseclass
    {
        public static isDebug: boolean = false;         // 默认是调试，发布前重置false

        public gameStage: egret.Stage;                  // 游戏主视图
        public price: number;
        
        // public gameScene: GoldEggs.GameScene;

        public gameServer:gamewidget.ServerModel;
        


        public constructor()
        {
            super();
        }

        public initGame(stage: egret.Stage): void 
        {
            this.gameStage = stage;
               
        }

        public exitGame(): void 
        {

        }










    }




















}


















