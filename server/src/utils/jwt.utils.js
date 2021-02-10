//imports
const jwt = require('jsonwebtoken');

//constants
const SECRET_SIGN = 'ja18k9kjd01kdj7dj1278j8k4d12bv';
const TOKEN_LIMIT = '1h';



module.exports =  {
  generateTokenForUser: (userId, isAdmin) => {
    return jwt.sign({
        userId: userId,
        isAdmin: isAdmin
        },
        SECRET_SIGN,
        {
            expiresIn: TOKEN_LIMIT
        }
    )
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, SECRET_SIGN);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
};