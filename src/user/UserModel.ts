

//
//
//
//
//
//
//
// 集中管理个人相关信息
//
//
module user{


    export class UserModel extends base.baseclass
    {
        public userId:number =233669728;
        public token:string ="5f97df0f6d1623b91bf0bdcc52ad5a66";
        public gold:string; // 余额
        public roomId:string;
        public gameId:string;

        
        public constructor()
        {
            super();           
        }


        private registerFunc(e: any)
        {
            e = e.data
            switch (e.key)
            {
                              
				default:
					break;
            }
        }


        /**
         * 销毁
         */
        public destroy():void
        {
        }
    }


}