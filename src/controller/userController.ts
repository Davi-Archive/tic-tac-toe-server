import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { StreamChat } from 'stream-chat'

const serverClient = new StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET)

//@Desc: get user info
//route: GET == /user/login
//@public
const getLogin = (req: Request, res: Response) => {
    res.status(200).json({ message: 'login dude, play' })
}

//@Desc: Login the user with username and password
//route: POST == /user/login
//@public
const postLogin = (req: Request, res: Response) => {
    res.status(200).json({ message: 'login dude, play' })
}

//@Desc: get created user info
//route: GET == /user/signup
//@public
const getSignup = (req: Request, res: Response) => {
    res.status(200).json({ message: 'login dude, play,signup' })
}

//@Desc: Create new user with POST Data
//route: POST == /user/signup
//@public
const postSignup = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, password } = req.body
        const userId = uuidv4()
        const hashedPassword = await bcrypt.hash(password, 10)
        const token = serverClient.createToken(userId)

        res.status(200).json({ token, userId, firstName, lastName, username, hashedPassword })
    } catch (error) {
        res.json(500).json(error)
    }
}

export {
    getLogin, postLogin, postSignup, getSignup
}