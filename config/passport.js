
import passportJwt from 'passport-jwt';
import { prisma } from '../lib/prisma.js'
import { configDotenv } from 'dotenv';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export default function (passport) {

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;

    passport.use(
        new JwtStrategy(opts, async(jwt_payload, done)=> {
            try {
                const user = await prisma.users.findUnique({
                    where: {
                        id: jwt_payload.id
                    }
                });

                if(user){
                    return done(null, user);
                }

                return done(null, false);
            } catch(error){
                return done(error,false);
            }
        })
    )
}