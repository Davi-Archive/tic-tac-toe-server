import express from "express";
import { getLogin, postLogin, postSignup, getSignup } from "../controller";
const router = express.Router()

router.route('/login')
.get(getLogin)
.post(postLogin)


router.route('/signup')
.get(getSignup)
.post(postSignup)

module.exports = router