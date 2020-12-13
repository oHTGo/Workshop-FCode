function setStatusSuccess(res, message) {
    let jsonResquest = { "status": "Successful" };
    if (message) {
        jsonResquest.message = message;
    }
    res.status(200).json(jsonResquest);
}

function setStatusFailure(res, message) {
    let jsonResquest = { "status": "Failed" };
    if (message) {
        jsonResquest.message = message;
    }
    res.status(500).json(jsonResquest);
    return "Failure";
}


function setStatusBadRequest(res, message) {
    let jsonResquest = { "status": "Bad Request" };
    if (message) {
        jsonResquest.message = message;
    }
    res.status(400).json(jsonResquest);
    return "BadRequest";
}

function setStatusUnauthorization(res, message) {
    let jsonResquest = { "status": "Unauthorized" };
    if (message) {
        jsonResquest.message = message;
    }
    res.status(401).json(jsonResquest);
    return "Unauthorization";
}

function setStatusForbiddance(res, message) {
    let jsonResquest = { "status": "Forbidden" };
    if (message) {
        jsonResquest.message = message;
    }
    res.status(403).json(jsonResquest);
    return "Forbiddance";
}

function setStatusNotFound(res, message) {
    let jsonResquest = { "status": "Not Found" };
    if (message) {
        jsonResquest.message = message;
    }
    res.status(404).json(jsonResquest);
    return "NotFound";
}

module.exports = {
    setStatusSuccess,
    setStatusFailure,
    setStatusUnauthorization,
    setStatusBadRequest,
    setStatusForbiddance,
    setStatusNotFound
}