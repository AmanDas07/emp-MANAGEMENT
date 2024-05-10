import { expressjwt } from "express-jwt";



export const requireSignin = expressjwt({
    secret: 'AUHSVCBUIBCIKASCBSIKCAACMHJBSCO',
    algorithms: ['HS256'],
})