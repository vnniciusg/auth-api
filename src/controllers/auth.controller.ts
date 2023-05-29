import { Request , Response , NextFunction, CookieOptions} from 'express'
import bcrypt from 'bcryptjs'
import { createUser, findByEmail } from '../services/user.services'
import { createUserInput, loginUserInput } from '../schemas/user.schema'
import { signTokens } from '../services/user.services'
import { validateEnv } from '../types/validateEnv'
import { Prisma } from '@prisma/client'


const cookiesOptions : CookieOptions = {
    httpOnly: true,
    sameSite : 'lax',
}

if( validateEnv.NODE_ENV === 'production' ) cookiesOptions.secure = true;

const accessTokenCookieOptions : CookieOptions = {
    ...cookiesOptions,
    expires : new Date(
        Date.now() + validateEnv.accessTokenExpiresIn * 60 * 1000,
    ),
    maxAge: validateEnv.accessTokenExpiresIn * 60 * 1000,
}

const refreshTokenCookieOptions : CookieOptions = {
    ...cookiesOptions,
    expires : new Date(
        Date.now() + validateEnv.refreshTokenExpiresIn * 60 * 1000
    ),
    maxAge: validateEnv.refreshTokenExpiresIn * 60 * 1000,
}

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
            const { email , password } = req.body;
            const user = await findByEmail(email);
            
            if( !user || !( await bcrypt.compare( password , user.password) )){
                res.status(400).json({message: 'Invalid Email or Password'})
            }

            const { access_token , refresh_token } = await signTokens(user);

            res.cookie('access_token', access_token , accessTokenCookieOptions);
            res.cookie('refresh_token',refresh_token) , refreshTokenCookieOptions;
            res.cookie('logged_in' , true , {
                ...accessTokenCookieOptions,
                httpOnly:false
            })
            res.status(200).json({
                status : 'success',
                access_token,
            });         
        }catch(error:any){
            next(error);
        }
    }


    static async refreshTokenRenew () {
    
    }

    static async logoutUser( req: Request , res: Response){

    }
}


export default authController;