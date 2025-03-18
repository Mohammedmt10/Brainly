import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET } from "./config";

export function authMidleware(req : Request , res : Response, next : NextFunction) {
    const headers = req.headers['authorization'];
    if(headers) {
        const decoded = jwt.verify(headers , SECRET);
        if(decoded){
            //@ts-ignore
            req.userId = decoded.id
            next();
        } else {
            res.json({
                message : "Something went wrong"
            })
        }
    } else {
        res.json({
            message : "autorization not provided"
        })
    }
}