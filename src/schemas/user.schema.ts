import { object , string ,  TypeOf , z } from 'zod';

enum RoleEnumType {
    ADMIN = 'admin',
    USER = 'user'
};

export const createUserSchema = object({
    body: object({
        firstname:string({required_error:'First name is required'}),
        lastname:string({required_error:'Last name is required'}),
        email:string({required_error:'Email is required'}).email('Invalid email address'),
        password:string({required_error:'Password is required'})
                                                                .min(8,'Password must be more than 8 characters')
                                                                .max(32,'Password must be less than 32 characters'),
        passwordConfirm:string({required_error:'Confirm your password'}),
        role:z.optional(z.nativeEnum(RoleEnumType)),
    }).refine((data) => data.password === data.passwordConfirm,{
        path:['passwordConfirm'],
        message:'Passwords do not match',
    })
});


export const LoginUserSchema = object({
    body:object({
        email:string({required_error:'Email is required'}).email('Invalid email address'),
        password:string({required_error:'Password is required'}).min(8,'Password must be more than 8 characters')
    })
});

export type createUserInput = Omit <TypeOf<typeof createUserSchema>['body'],'passwordConfirm'>;
export type loginUserInput = TypeOf<typeof LoginUserSchema>['body'];