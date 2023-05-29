import { NextFunction , Request , Response} from 'express'


class userController{
    static async getProfileUser( req: Request , res: Response , next : NextFunction ){
        try{
            const user = res.locals.user;
            res.status(200).json({
                status: 'Success',
                data:{
                    user,
                }
            })
        }catch(err:any){
            next(err);
        }
    }
};


export default userController;