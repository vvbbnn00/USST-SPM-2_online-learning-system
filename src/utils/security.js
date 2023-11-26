const bcrypt = require('bcryptjs');

export function doBcrypt(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function doCompare(password, hash) {
    return bcrypt.compareSync(password, hash);
}
