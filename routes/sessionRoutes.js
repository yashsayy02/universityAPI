const express = require("express")
const {createSession, fetchSessions} = require("../controllers/sessionControllers")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

router.route('/createSession').post(createSession);
router.route("/fetchSessions").get(protect, fetchSessions);

module.exports = router;