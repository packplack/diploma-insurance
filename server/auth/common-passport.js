import passport from 'passport';

import dbConnection from '../db/connection';
import logger from '../init/bunyan-logger';



passport.serializeUser(function(profile, done) {
    logger.info(`AUTH. Serializing ${profile.type}. Profile data - ${JSON.stringify(profile)}.`);
    done(null, { id: profile.id, type: profile.type });
});
  
passport.deserializeUser(async function(profile, done) {
    logger.info(`AUTH. Deserializing ${profile.type}. Profile data - ${JSON.stringify(profile)}.`);

    const data = await dbConnection.query({    
        text: `SELECT * FROM ${profile.type}s WHERE id = $1`, 
        values: [profile.id]
    });

    if (data.rowCount) {
        done(null, data.rows[0]);
    }
});

export default passport;
