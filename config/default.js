exports.database = {
  host: 'localhost',
  port: 5432,
  database: 'webok',
  username: 'webok_user',
  password: 'webok_secret',
}

exports.auth = {
  secretKey: 'webok_auth_secret',
  expiresIn: '2w',
}
