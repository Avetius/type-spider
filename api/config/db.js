module.exports = {
  dev: {
    db: {
      dbType: 'postgres',
      username: 'postgres',
      password: 'pic16f84a',
      hostname: 'localhost',
      dbName: 'home_spider',
    },
    port: '5432',
  },
  heroku: {
    db: {
      dbType: 'postgres',
      username: 'lrqprruuezrsex',
      password: '299dcb6ffa314c95698e8a873b4010b67af6d2e74c6da579bdbbf3c4ee43601d',
      hostname: 'ec2-79-125-118-221.eu-west-1.compute.amazonaws.com',
      dbName: 'd290e5v255hhl5',
    },
    port: '5432',
  },
};
