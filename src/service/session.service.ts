import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SchemaDocument, } from "../models/session.model"
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: String, userAgent: String) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export async function findSession(query: FilterQuery<SchemaDocument>) {
    return SessionModel.findOne(query).lean();
}

export async function updateSession(query: FilterQuery<SchemaDocument>, update: UpdateQuery<SchemaDocument>) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({refreshToken}:{refreshToken:string}) {
    const {decoded} = verifyJwt(refreshToken)

    if (!decoded || !get(decoded, 'session')) false

    const session = await SessionModel.findById(get(decoded, "_id"))

    if (!session || !session?.valid) false;

    const user = await findUser({_id: session?.user});

    if (!user) false;

    const accessToken = signJwt(
        { ...user, session: session?.user?._id },
        { expiresIn: config.get('accessTokenTtl') }
    );

    return accessToken;
}