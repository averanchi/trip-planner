const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()));
            }
            const { email, password } = req.body;

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            // saving refreshToken in cookie, it will be used for authentication when user will refresh page or come back to our site after some time. 
            // We set maxAge to 30 days, because refreshToken will live 30 days. httpOnly: true means that this cookie will be available only on the server side, 
            // it won't be accessible from the client side (for example, from JavaScript), this is for security reasons.
            return res.json(userData);

        }
        catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);

        }
        catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);

        }
        catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link; // we get activation link from the request parameters, because in our router we defined this route as /activate/:link
            await userService.activate(activationLink); // we call activate method from userService and pass activation link to it
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);

        }
        catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }

}


module.exports = new UserController();