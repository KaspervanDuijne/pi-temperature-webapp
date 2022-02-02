const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/play', function(req, res, next) {
//   res.sendFile('game.html', { root: './public' });
// });

router.get("/", function(req, res, next) {
    res.sendFile("index.html", { root: "./client" });
});

module.exports = router;
