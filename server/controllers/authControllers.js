import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc -> register new user
// @desc route POST -> api/auth/register
//function to register new user
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // finding existence of user
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: `${email} already exist in Database`
            })
        } else {
            let hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await User.create({
                username,
                email,
                password: hashedPassword
            })
            // now after createduser if else to check if it created or not
            if (createdUser) {
                return res.status(201).json({
                    id: createdUser._id,
                    username: createdUser.username,
                    email: createdUser.email,
                    message: "Account Created Successfully please login"
                })
            } else {
                return res.status(400).json({ message: "Invalid user data" })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

// function that will going to take id and generate token
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//@desc login user
//@desc route POST -> api/auth/login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user by Email
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, userExist.password)
            if (isPasswordMatch) {
                return res.json({
                    _id: userExist._id,
                    username: userExist.username,
                    email: userExist.email,
                    token: generateToken(userExist._id)
                })
            } else {
                return res.status(401).json({
                    message: "Invalid Email or Password"
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}