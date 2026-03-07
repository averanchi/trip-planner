const userService = require('../service/user-service');


class UserController {
    async registration(req, res, next) {
        try {


            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            // saving refreshToken in cookie, it will be used for authentication when user will refresh page or come back to our site after some time. 
            // We set maxAge to 30 days, because refreshToken will live 30 days. httpOnly: true means that this cookie will be available only on the server side, 
            // it won't be accessible from the client side (for example, from JavaScript), this is for security reasons.
            return res.json({ userData });

        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();