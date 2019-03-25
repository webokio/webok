exports.database = {
  host: 'localhost',
  port: 5432,
  database: 'webok',
  username: 'webok_user',
  password: 'webok_secret',
}

exports.auth = {
  secretKey: 'webok_auth_secret',
  accessTokenTTL: { hour: 1 },
  refreshTokenTTL: { weeks: 2 },
}
