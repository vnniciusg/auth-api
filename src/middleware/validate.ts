import { Request , Response , NextFunction} from 'express';
import { AnyZodObject , ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => ( req:Request , res:Response , next : NextFunction) =>{
    try{
        schema.parse({
            params: req.params,
            query : req.query,
            body : req.body
        });

        next();
    }catch(err){
        if( err instanceof ZodError){
            return res.status(400).json({status:'something goes wrong', errors : err.errors});
        };

        next();
    }
};