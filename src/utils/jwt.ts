import jwt , { SignOptions } from 'jsonwebtoken';
import { validateEnv } from '../types/validateEnv';


export const signJwt = async (
    payload : Object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options: SignOptions //fix that later??
    )=> {
        const privateKey = validateEnv[keyName];
        const token = await jwt.sign(payload, privateKey);
        return token ;
};   


export const verifyJwt = <Token>(
    token: string ,
    keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): Token | null => {
    try{
        const publicKey = validateEnv[keyName];
        const decoded = jwt.verify( token , publicKey ) as Token;
        return decoded;
    }catch(error){
        return null;
    }
};