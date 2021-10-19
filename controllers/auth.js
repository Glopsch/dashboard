// require('dotenv').config();

// const User                  = require( '../models/User' ); //TODO change to non-DB usage
// const bcryptjs              = require( 'bcryptjs' );
// const jwt                   = require( 'jsonwebtoken' );
// const { validationResult }  = require( 'express-validator' );
// const secret                = process.env.JWT_SECRET; //??? how to set this in image?

//const tokenExpiration        = '180d'; //specified as https://github.com/vercel/ms

async function handleInitPost( req, res ) {
    /*
    try {
      // console.log(req);
      const errors = validationResult( req );
  
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          // send errors to front-end
          errors: errors.array(),
          message: 'Registration data failure',
        });
      }
  
      const { username, initialPassword, password } = req.body;
  
      const candidate = await User.findOne( { username: username } ) //TODO change to non-DB usage
  
      if( candidate ) {
        return res.status( 400 ).json( { message: 'User with such username already exists' } );
      }
      const hashedPassword  = await bcryptjs.hash( password, 11 );
  
  
      const templateIDs = templateIDsString.split(',');
  
      const user = new User( { //TODO change to non-DB usage
        username,
        initialPassword, 
        password: hashedPassword
      } );
  
      await user.save();
      return res.status( 201 ).json( { message: 'User was created' } );
  
    } catch ( err ) {
      console.log( err );
      res.status( 500 ).json( { message: 'Register error, please try again...'} );
    }
    */
  }

async function handleLoginPost( req, res ) {
    /*
    try {

      const errors = validationResult( req );

      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json({
          errors: errors.array(),
          message: 'Login data failure',
        });
      }

      const { username, password } = req.body;

      const user = await User.findOne( { username }); //TODO change to non-DB usage...

      if ( !user ) {
        return res.status( 400 ).json( { message: 'User with such username doesn\'t exist' } );
      }

      const isMatch = await bcryptjs.compare( password, user.password );

      if ( !isMatch ) {
        return res.status( 400 ).json( { message: 'Wrong username or password' } );
      }

      const token = jwt.sign( { userID: user.id }, secret, { expiresIn: tokenExpiration } );

      return res.json( { token, userID: user.id } );


    } catch ( err ) {
      console.log( err );
      return res.status( 500 ).json(
        { message: 'Login error' },
      );
    }

*/
}

module.exports = {
    handleInitPost,
    handleLoginPost
};