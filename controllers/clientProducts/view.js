export const viewSuccess = (res, message, data) => {
    res.status(200).json({
        status: 200,
        message,
        data,
    })
}

export const viewError = (res, status, message) => {
    res.status(status).json({
        status,
        message,
        data: null
    })
}