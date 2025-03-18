import express from 'express';
import mongoose, { mongo } from 'mongoose';
import { contentModel, linkModel, tagModel, userModel } from './db'
import z from 'zod'
import bcrypt, { hash } from 'bcrypt'
import {authMidleware} from './middleware'
import {random} from './utils'
import jwt from 'jsonwebtoken';
import { SECRET } from './config'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();

app.use(cors())
app.use(express.json())

app.post("/api/v1/signup" , async (req , res) => {

        const requiredBody = z.object({
            username: z.string().min(3).max(20),
            password: z.string().min(8).max(20).regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
        });

        const safeParsed = requiredBody.safeParse(req.body);

        if (safeParsed.success) {

            const user = safeParsed.data;

           try {
            const sameUser = await userModel.findOne({ username: user.username });

            if (sameUser) {
                res.status(403).json({
                    message: "User already exists"
                });
            }
            } catch(e) {
                res.json({
                    message : e
                })
            } 
            const hashedpassword = await bcrypt.hash(user.password, 5);

            try{
                console.log(user)
                const newUser = await userModel.create({
                    username: user.username,
                    password: hashedpassword
                });
                res.status(200).json({
                    msg: "You are now signed up"
                });
            } catch(e){
                res.json({
                    message : e,
                    message2 : "some error"
                })
            }


        } else {
            res.status(411).json({
                msg: "Input is invalid"
            });
        }
})

app.post("/api/v1/signin" , async (req , res) => {
    const requiredBody = z.object({
        username : z.string().min(1).max(20),
        password : z.string().min(3).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    })

    const safeParsed = requiredBody.safeParse(req.body);

    if(safeParsed.success) {
        
        const user = safeParsed.data
        try{
        const response = await userModel.findOne({username : user.username})
        
        if(response?.password) {
            const passwordCheck = await bcrypt.compare(user.password , response.password);
            if(passwordCheck) {
                const token = jwt.sign({
                    id : response._id
                } , SECRET)
                res.json({
                    token : token
                })
            }
        } else{
            res.status(403).json({
                message : "incorrect credentials"
            })
        }
    } catch(error){
        res.json({
            message : "some error",
            error : error
        })
        
    }
} else {
        res.json({
            message : "incorrect credentials"
        })
    }
})

app.post("/api/v1/content" , authMidleware , async (req , res) => {
    const link = req.body.link;
    const type = req.body.type;
    const tag = req.body.tag;
    const title = req.body.title

    if(tag) {
        const newTag = await tagModel.create({ title : tag})
    }

    await contentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId : req.userId,
    })
    res.json({
        message : "content added"
    })
})

app.get("/api/v1/content" , authMidleware , async (req , res) => {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = await contentModel.find({
            userId : userId
        }).populate("userId", "username");
    res.json({
        content : content
    })
    } catch(e) {
        res.json({
            message : e
        })
    }
})

app.delete("/api/v1/content" , authMidleware , async (req , res) => {
    const contentId = req.body.contentId;

    try {
    const deleteContent = await contentModel.deleteOne({
            id : contentId,
            //@ts-ignore
            userId : req.userId
        })
    if(deleteContent){
        res.json({
            message :deleteContent
        })
    } else {
        res.json({
            message :"something went wrong"
        })
    }
    } catch(e) {
        res.status(404).json({
            message : e
        })
    }
})

app.post("/api/v1/brain/share", authMidleware , async (req , res) => {
    // @ts-ignore
    const share = req.body.share;

    if(share){
        const hash = random(20);

        const existingLink = await linkModel.findOne({
            //@ts-ignore
            userId : req.userId
        })
        if(existingLink) {
            res.json({
                message : "link already exist",
                link : existingLink.hash
            })
            return ;
        }

        await linkModel.create({
        //@ts-ignore
        userId : req.userId,
        hash : hash
    })
        res.json({
            message : "updated the user id",
            link :   hash
        })

} else {
        await linkModel.deleteOne({
           //@ts-ignore
            userId: req.userId
        })
        res.json({
            message : "removed the link"
        })
    }

})

app.get("/api/v1/brain/:shareLink", async (req , res) =>{
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash : hash
    })

    if(!link) {
        res.json({
            message : 'incorrect link'
        });
        return;
    }

    const content = await contentModel.find({
        userId : link?.userId
    });

    const user = await userModel.findOne({
    _id : link?.userId
    })
    if(user) {
    res.status(200).json({
        userId : link.userId,
        username : user.username,
        content
    })
}

})

app.listen(process.env.PORT)