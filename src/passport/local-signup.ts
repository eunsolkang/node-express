import User from '../models/User'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request } from 'express'
import { createCipher } from 'crypto';

passport.use(
    'local-signup',
    new LocalStrategy(
        {
            usernameField: 'user_id',
            passwordField: 'user_pw',
            passReqToCallback: false,
            session: false,
        },
        async ( user_id: String , user_pw : String,  next: any) => {
            try{
                
                const user = await User.findOne({ user_id })
                if (user) {
                    // next 함수는 첫 인자로 에러, 두 번째 인자로 유저를 받습니다.
                    return next('user exists!', false)
                }
                const newUser = new User();
                newUser.user_id = user_id;
                newUser.user_pw = newUser.generateHash(user_pw);

                await newUser.save();
                console.log(newUser);
                
                return next(null, newUser.toObject());
            }catch(error){
                next(error);
            }

        }
    )
);
