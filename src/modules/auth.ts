import jwt from 'jsonwebtoken';

const jwtCheck =  (async(req, res, next) => {
    const token : String = req.headers['x-access-token'] || req.query.token;
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }
    try{
        req.decode =  await jwt.verify(token, req.app.get('jwt-secret'));
        next();
    }catch(error){
        next(error);
    }

});

export default jwtCheck;

