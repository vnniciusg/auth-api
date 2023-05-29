import { CookieOptions } from "express";
import { validateEnv } from "../types/validateEnv";

const cookiesOptions : CookieOptions = {
    httpOnly: true,
    sameSite : 'lax',
}

if( validateEnv.NODE_ENV === 'production' ) cookiesOptions.secure = true;

export const accessTokenCookieOptions : CookieOptions = {
    ...cookiesOptions,
    expires : new Date(
        Date.now() + validateEnv.accessTokenExpiresIn * 60 * 1000,
    ),
    maxAge: validateEnv.accessTokenExpiresIn * 60 * 1000,
}

export const refreshTokenCookieOptions : CookieOptions = {
    ...cookiesOptions,
    expires : new Date(
        Date.now() + validateEnv.refreshTokenExpiresIn * 60 * 1000,
    ),
    maxAge: validateEnv.refreshTokenExpiresIn * 60 * 1000,
}