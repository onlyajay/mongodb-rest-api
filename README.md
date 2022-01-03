# mongodb-rest-api

## Installation

Mongodb rest api requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and start the server.

```sh
cd mongodb-rest-api
npm i
npm run start

OR

PORT=<port> MONGODB_URI=<db-name> node ./bin/www
```

## API Details

### Get data
```http
POST /data
```
#### Body params
| Parameter | Type      | Description                      |
|:----------|:----------|:---------------------------------|
| `startDate`    | `string`  | **Required**.         |
| `endDate` | `string` | **Required**. |
| `minCount` | `integer` | **Required**.  |
| `maxCount` | `integer` | **Required**.  |

#### Responses

```javascript
{
    "code": integer, 
    "msg": String,
    "records": object[]
}
```