import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { StreamChat } from 'stream-chat'
import dotenv from 'dotenv'
dotenv.config()

const serverClient = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET)


//@Desc: get user info
//route: GET == /user/login
//@public
const getLogin = (req: Request, res: Response) => {
    res.status(200).json({ message: 'login dude, play' })
}

//@Desc: Login the user with username and password
//route: POST == /user/login
//@public
const postLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const { users } = await serverClient.queryUsers({ username: username })
        if (users.length === 0) return res.status(404).json({ message: 'User not found' })

        const passwordMatch = await bcrypt.compare(password, users[0].password)
        const token = serverClient.createToken(users[0].id)
        if (passwordMatch) {
            res.status(200).json({
                token,
                firstName: users[0].firstName,
                lastName: users[0].firstName,
                username,
                userId: users[0].id
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }

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
        const createUser = await serverClient.upsertUser({
            id: userId,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword
        });

        return res.status(200).json({ token, userId, firstName, lastName, username, hashedPassword });

    } catch (error) {
        res.json(500).json(error)
    }
}

export {
    getLogin, postLogin, postSignup, getSignup
}