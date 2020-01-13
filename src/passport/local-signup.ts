import User from '../models/User'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request } from 'express'
import { createCipher } from 'crypto';

passport.use(
    'local-signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true,
            session: false,
        },
        async (req: Request, email: string, user_pw: string, next: any) => {
            try{
                const user = await User.findOne({ email })
                if (user) {
                    // next 함수는 첫 인자로 에러, 두 번째 인자로 유저를 받습니다.
                    return next('user exists!', false)
                }
                const { user_id } = req.body;
                const newUser = new User();
                newUser.email = email;
                newUser.user_id = user_id;
                newUser.user_pw = newUser.generateHash(user_pw);

                await newUser.save();
                console.log(newUser.toObject());
                
                return next(null, newUser.toObject());
            }catch(error){
                next(error);
            }

        }
    )
);
