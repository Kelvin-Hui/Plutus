const redis = require("redis");

const redisClient = redis.createClient(6379, "localhost");

module.exports = redisClient;

process.on("exit", function () {
    console.log("Exiting Redis Connections !");
    redisClient.quit();
});

process.on("SIGINT", function () {
    console.log("Exiting Redis Connections !");
    redisClient.quit();
});

process.on("SIGTERM", function () {
    console.log("Exiting Redis Connections !");
    redisClient.quit();
});

process.on("SIGUSR1", function () {
    console.log("Exiting Redis Connections !");
    redisClient.quit();
});

process.on("SIGUSR2", function () {
    console.log("Exiting Redis Connections !");
    redisClient.quit();
});

process.on("uncaughtException", function () {
    console.log("Exiting Redis Connections !");
    redisClient.quit();
});
