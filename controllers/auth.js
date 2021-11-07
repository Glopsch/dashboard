require('dotenv').config();

// const User                  = require( '../models/User' ); //TODO change to non-DB usage
const bcryptjs              = require( 'bcryptjs' );
const jwt                   = require( 'jsonwebtoken' );
// const { validationResult }  = require( 'express-validator' );

const fs = require('fs');
const path = require('path');

const jwtSecret       = process.env.JWT_SECRET;
const tokenExpiration = "180d";


async function handleInitPost( req, res ) {
  
    try {
      if(fs.existsSync(path.join(__dirname, "../", "/data"))) {
        return res.status( 401 ).json( { message: 'password already set' } );
      }
    } catch(err) {
      console.log("data existance err:", err);
    }

    console.log(req.body);

    try {
      // const errors = validationResult( req );
  
      // if ( !errors.isEmpty() ) {
      //   return res.status( 400 ).json( {
      //     // send errors to front-end
      //     errors: errors.array(),
      //     message: 'Registration data failure',
      //   });
      // }
  
      const { initPw, newPw } = req.body;
  
      if(initPw === process.env.INIT_PW) {
        const hashedPassword  = await bcryptjs.hash( newPw, 11 );
        // console.log(hashedPassword);

        fs.writeFile(path.join(__dirname, "../", "/data"), hashedPassword, function(err) {
            if(err) {
              console.error(err);
              return;
            }
            console.log("pw saved");
            return res.status( 201 ).json( { message: 'password set' } );
        }); 
      } else {
        return res.status( 401 ).json( { message: 'wrong initPw' } );
      }
  
    } catch ( err ) {
      console.log( err );
      res.status( 500 ).json( { message: 'unknown init error'} );
    }
  }

async function handleLoginPost( req, res ) {
    try {

      // const errors = validationResult( req );

      // if ( !errors.isEmpty() ) {
      //   return res.status( 400 ).json({
      //     errors: errors.array(),
      //     message: 'Login data failure',
      //   });
      // }

      const { password } = req.body;
      console.log(password);

      if(fs.existsSync(path.join(__dirname, "../", "/data"))) {
        fs.readFile(path.join(__dirname, "../", "/data"), 'utf8' , (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data)

          const isMatch = bcryptjs.compareSync( password, data );
          console.log(isMatch);

          if ( !isMatch ) {
            console.log(":(");
            return res.status( 401 ).json( { message: 'wrong password' } );
          }

          const token = jwt.sign( { networkID: "my-network" }, jwtSecret, { expiresIn: tokenExpiration } );

          console.log(token);
          console.log("token generated");
          return res.json( { token } );
        })
      } else {
        return res.status( 401 ).json( { message: 'not initialised' } );
      }

    } catch ( err ) {
      console.log( err );
      return res.status( 500 ).json(
        { message: 'Login error' },
      );
    }
}

module.exports = {
    handleInitPost,
    handleLoginPost
};