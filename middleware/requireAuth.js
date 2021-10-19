// const jwt         = require('jsonwebtoken');
// const secret      = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
//   let token = req.headers['x-access-token'] || req.headers['authorization']; // express headers are auto converted to lowercase

//   if (token) {
//     if (token.startsWith('Bearer ')) {
//       token = token.slice(7, token.length);
//     }
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         console.log("token denied");
//         return res.status( 401 ).json({
//           success: false,
//           message: 'Authentication invalid'
//         });
//       } else {
//         req.decoded = decoded;
//         // console.log("token accepted");
//         next();
//       }
//     });
//   } else {
//     console.log("token denied");
//     return res.status( 401 ).json({
//       success: false,
//       message: 'No authentication token supplied'
//     });
//   }
    console.log("passed reqAuth middleware");
    next();
};

module.exports = {
  requireAuth
}
