const request = require('supertest');
const app = require('../app');

test('should fetch records based on below body', async () => {
    const res = await request(app).post('/data')
        .send({
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        })
    expect(res.statusCode).toEqual(200)
    expect(res.body.code).toEqual(0)
    expect(res.body.msg).toEqual('Success')
})