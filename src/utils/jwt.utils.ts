import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(
    object: Object, options?: jwt.SignOptions | undefined
) {
    console.log(object);
    console.log(options);
    return jwt.sign(object, privateKey, {
        ...(options),
        algorithm: 'RS256'
    });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return{
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error:any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decode: null
        };
    }
}