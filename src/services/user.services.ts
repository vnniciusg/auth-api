import prisma from '../lib/prisma/prismadb'
import { Prisma  , User } from '@prisma/client'

export const dontShowFields = ['password','verified','verificationCode'];


export const createUser  = async (input : Prisma.UserCreateInput) =>{
    return (await prisma.user.create({
        data:input
    })) as User;
};

export const findUniqueUser =async (where:Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) => {
    return (await prisma.user.findUnique({
        where,
        select
    })) as User;
};
