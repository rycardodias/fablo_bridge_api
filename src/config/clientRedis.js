const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

client.on("connect", function () {
    console.log("You are now connected");
});

client.on("quit", function () {
    console.log("You are now disconnected");
})

client.on("exit", function(){
    client.quit();
});

client.connect()

module.exports = client;