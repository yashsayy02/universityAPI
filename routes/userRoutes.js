const express = require("express")
const router = express.Router()

const {registerUser, authUser, bookSession, fetchPendingSessions} = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware")


router.route('/').post(registerUser);
router.route('/login').post(authUser);

router.route('/bookSession').put(protect, bookSession);
router.route('/pendingSession').get(protect, fetchPendingSessions)

module.exports = router