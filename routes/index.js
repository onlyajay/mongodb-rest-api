const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_URI || 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-study?retryWrites=true';
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

router.get('/', function (req, res, next) {
    res.send('Hello world');
});

router.post('/data', async function (req, res, next) {
    const {startDate, endDate, minCount, maxCount} = req.body;

    if (!startDate || !endDate || !minCount || !maxCount) {
        return res.status(400).send({"code": 1, "msg": "Bad request."});
    }
    const db = await client.connect();
    db.db('getir-case-study').collection("records").aggregate([
        {
            $project: {
                "_id": 0, "key": 1,
                "createdAt": 1, "totalCount": {"$sum": "$counts"},
            }
        },
        {
            $match: {
                $and: [
                    {totalCount: {$gt: minCount, $lt: maxCount}},
                    {createdAt: {$gte: new Date(startDate), $lte: new Date(endDate)}}
                ]
            }
        },
    ]).toArray(function (err, result) {
        if (err) {
            res.status(500).send({"code": 1, "msg": "Error fetching records"});
        } else {
            res.send({"code": 0, "msg": "Success", "records": result});
        }
    });
});

module.exports = router;
