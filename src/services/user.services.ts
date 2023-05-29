import prisma from '../lib/prisma/prismadb'
import { Prisma  , User } from '@prisma/client'
import { signJwt } from '../utils/jwt';

export const dontShowFields = ['password','verified','verificationCode'];


export const createUser  = async (input : Prisma.UserCreateInput) =>{
    return (await prisma.user.create({
        data:input
    })) as User;
};

export const findUniqueUser = async (where:Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) => {
    return (await prisma.user.findUnique({
        where,
        select
    })) as User;
};

export const findByEmail = async ( email : string, select?: Prisma.UserSelect) =>{
    const where : Prisma.UserWhereUniqueInput = {email};
    return (await prisma.user.findUnique({
        where,
        select,
    })) as User;
}


export const signTokens = async (user: User) => {

    const access_token = await signJwt({sub : user},'accessTokenPrivateKey',{expiresIn : '10m'});
    const refresh_token = await signJwt({ sub : user } , 'refreshTokenPrivateKey', {expiresIn : '20m'})

    return { access_token , refresh_token};

}