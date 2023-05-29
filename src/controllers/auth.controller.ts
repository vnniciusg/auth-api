import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { Request , Response , NextFunction} from 'express'

import { createUser, findUniqueUser } from '../services/user.services'
import { createUserInput, loginUserInput } from '../schemas/user.schema'

import { signTokens } from '../services/user.services'
import { accessTokenCookieOptions , refreshTokenCookieOptions} from '../utils/cookie'

class authController {
    static async registerNewUser( req: Request <{},{},createUserInput> , res: Response ){
        try{
            const hashedPassword = await bcrypt.hash( req.body.password , 12 ) ;
            const fullName = req.body.firstname + " " + req.body.lastname;
            const newUser = await createUser ({
                ...req.body,
                password : hashedPassword,
                fullname : fullName,
            });
            
            res.status(201).json({newUser})

        }catch(error:any){
            if( error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    res.status(409).json({
                        status:"fail",
                        message: "Email already exists"
                    })
                }

            }
            
        }
    }

    static async loginUser( req: Request<{},{},loginUserInput> , res: Response , next : NextFunction){
        try{
            const user = await findUniqueUser({ email : req.body.email.toLowerCase()});           
            if( !user || !( await bcrypt.compare( req.body.password , user.password) )){
                res.status(400).json({message: 'Invalid Email or Password'})
            }

            const { access_token , refresh_token } = await signTokens(user);

            res.cookie('access_token', access_token, accessTokenCookieOptions)
               .cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
               .cookie('logged_in', 'true', {
                    ...accessTokenCookieOptions,
                    httpOnly: false
                })
               .status(200).json({
                     status: 'success',
                        access_token
                });     
        }catch(error:any){
            next(error);
        }
    }


    static async refreshTokenRenew () {

        //do later
    
    }

    static async logoutUser( req: Request , res: Response){
        // do later
    }
}


export default authController;