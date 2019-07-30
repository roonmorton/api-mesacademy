module.exports = {
    send: (res, result, myinfo, message, err = null) => {
        if (err) {
            res.status(400);
            res.send({
                info: err.message,
                message: message || '',
                code: 1,
                data: []
            });
        } else {
            var info = result.info || myinfo;
            delete result.info;
            res.send({
                info: info || '',
                message: message || '',
                code: 0,
                data: result
            });
        }
    }
};