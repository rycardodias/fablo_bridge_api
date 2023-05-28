const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

client.on("connect", function () {
    console.log("You are now connected");
});

client.connect()

module.exports = client;