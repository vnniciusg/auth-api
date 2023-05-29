import { NextFunction , Request , Response} from 'express'
import Logger from '../lib/winston/logger';

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
        }catch(error:any){
            Logger.error('something went wrong when displaying the users profile',error)
            next(error);
        }
    }
};


export default userController;