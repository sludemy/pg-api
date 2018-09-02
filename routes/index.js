const { Router } = require('express');
const queries = require('./queries');

const router = Router();

router.use('/', queries);

// // this allows the queries page to bypass needing get('/monsters',
// router.use('/monsters', queries);

// // or for example, a channel_reads.js with auto redirect to /channel_reads:
// const channel_reads = require('./channel_reads');
// router.use('/channel_reads', channel_reads);

module.exports = router;