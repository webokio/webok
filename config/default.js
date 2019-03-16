exports.database = {
  host: 'localhost',
  port: 5432,
  database: 'webok',
  username: 'webok_user',
  password: 'webok_secret',
}

exports.auth = {
  secretOrPrivateKey: 'webok_secret',
  signOptions: {
    expiresIn: '2w',
  },
}
