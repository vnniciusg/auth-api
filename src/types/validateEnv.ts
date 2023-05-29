import { cleanEnv , str , port , num } from "envalid";

export const validateEnv = cleanEnv(process.env, {

    //PORT
    PORT : port(),

    //DATABASE
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    DATABASE_URL :str(),

    //NODE STATUS
    NODE_ENV: str(),

    //TOKEN
    accessTokenPrivateKey: str(),
    accessTokenPublicKey: str(),
    refreshTokenPrivateKey: str(),
    refreshTokenPublicKey:  str(),
    
    accessTokenExpiresIn: num(),
    refreshTokenExpiresIn: num(),
})



export default validateEnv;