import { Router } from 'express'
import passport from 'passport'

const router: Router = Router();

router.post(
    '/signup',
    passport.authenticate('local-signup', { session: false }),
    (req, res) => {
        // 생성된 유저를 확인!
        res.json({
            user: req.user,
        })
    },
)

export default router;