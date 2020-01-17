import { Router } from 'express'
import passport from 'passport'
import User from '../../models/User'
import { validateBody } from '../../modules/validateBody';
import { getToken } from '../../modules/getToken'

const router: Router = Router();

router.post(
    '/signup',
    validateBody,
    passport.authenticate('local-signup', { session: false }),
    getToken
)
router.post(
    '/signin',
    validateBody,
    passport.authenticate('local-signin', { session: false }),
    getToken
    
)
router.post(
    '/private',
    passport.authenticate('jwt', {session : false}),
    (req, res, next) => {
        res.send({
            status : 200,
            data : req.user
        })
    }
)

router.get('/users', async(req, res, next) => {
    try{
        const users =  await User.find({});
        res.send({
            status : 500,
            data : users
        });
    }catch(error){
        next(error);
    }
    
});
router.delete('/users', async(req, res, next) => {
    try{
        const users =  await User.remove({});
        res.send({
            status : 500,
            data : users
        });
    }catch(error){
        next(error);
    }
    
});

export default router;