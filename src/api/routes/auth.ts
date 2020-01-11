import express from "express";
import User from "../../models/User"
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/register', async(req, res) => {
    const { user_id, user_pw } = req.body;
    const newUser = await User.findOne({user_id : user_id});
    if ( !newUser ){ // 신규 유저라면 
        await new User({user_id : user_id, user_pw : user_pw }).save();
        res.send({
            status : 200,
            message : "success!"
        })
    }
    else{
        res.send({
            status : 409,
            message : "username exist!"
        })
    }
})

router.post('/login', async(req, res, next) =>{
    const secret : String = req.app.get('jwt-secret');
    
    const UserData = await User.findOne({user_id : req.body.user_id});

    if ( !UserData ){
        res.send({
            status : 200,
            message : "ID faild!"
        });
    }
    else {
        if ( UserData.user_pw !== req.body.user_pw){
            res.send({
                status : 200,
                message : "password faild!"
            });
        }
        else {
            try{
                const token = await jwt.sign(
                    {
                        _id : UserData._id,
                        user_id : UserData.user_id
                    },
                    secret, 
                    {
                        expiresIn: '7d',
                        issuer: 'velopert.com',
                        subject: 'userInfo'
                    }
                )
                res.send({
                    status : 200,
                    data : {
                        token : token
                    }
                });
            }catch(error){
                next(error);
            }
        }
    }

});

router.get('/check', async(req : any, res, next) => {
        const token : String = req.headers['x-access-token'] || req.query.token;
        if(!token) {
            return res.status(403).json({
                success: false,
                message: 'not logged in'
            })
        }
        try{
            const data =  await jwt.verify(token, req.app.get('jwt-secret'));
            res.send({
                status : 200,
                data : data
            });
        }catch(error){
            next(error);
        }
    
})
export default router;