const express = require("express");
const authControllerFB = require("../controller/authControllerFB");
const ensureAuthenticated = require("../middlewares/authFB.middleware");
const router = express.Router();

router.get("/", authControllerFB.indexLoginFb);
router.get("/login", authControllerFB.login);
router.get("/account", ensureAuthenticated.ensureAuthenticated, authControllerFB.account);
router.get("/auth/facebook", authControllerFB.authFb);
router.get("/auth/facebook/callback", authControllerFB.authFbCallBack);

module.exports = router;