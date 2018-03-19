'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://lemazza:12r46a@ds117509.mlab.com:17509/huntersoftheweek' ||'mongodb://localhost/MoW-Capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/Test-MoW-Capstone';


exports.PORT = process.env.PORT || 8080;


exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';