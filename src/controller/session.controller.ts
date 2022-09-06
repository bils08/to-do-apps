import config from "config";
import { Request, Response } from "express";
import { createSession, findSession, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {

    const user = await validatePassword(req.body)

    if(!user) {
        return res.status(401).send("Wrong password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
        { ...user, session: session.user?._id },
        { expiresIn: config.get('accessTokenTtl') }
    );

    const refreshToken = signJwt(
        { ...user, session: session.user?._id },
        { expiresIn: config.get('accessTokenTtl') }
    );

    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id

    const session = await findSession({user: userId})

    return res.send(session);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession ({_id: sessionId}, { valid: false});
    
    return res.send({
        message: "You are logged out",
        accessToken: null,
        refreshToken: null,
    })
}