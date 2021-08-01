const jwt = require('jsonwebtoken');
const reposne_utils = require('../http/response.utility');

const authorize_token = (req, res, next) => {
    const auth_token = req.headers.authorization;
    const token = auth_token && auth_token.replace('Bearer ', '');

    if (!token)
        return reposne_utils.send_response(req, res, 401, 'Unauthorized!', 'login', '');
    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, data) => {
        if (err)
            reposne_utils.send_response(req, res, 401, 'Unauthorized', 'login', '');
        req.animal_details = data;
        next();
    });
};

// To be removed
// const get_token = (req, res, next) => {
//     if (!req.body.animal_id)
//         return res.status(400).send({ status: 'error', data: 'Insufficient Data' });
//     const animal_id = { animal_id: req.body.animal_id };
//     const access_token = jwt.sign(animal_id, process.env.SECRET_JWT_KEY);

//     res.status(200).send({ status: 'success', data: { access_token } });
// };

module.exports = { authorize_token};
