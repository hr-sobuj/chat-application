// internal import
const uploader = require('../../utilities/singleUploader');

function avatarUpload(req, res, next) {
    const upload = uploader(
        'avatars',
        ['image/jpg', 'image/png', 'image/jpeg'],
        1000000,
        // eslint-disable-next-line prettier/prettier
        'Only .jpg .png or .jpeg format allowed.',
    );

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

// export module
module.exports = avatarUpload;
