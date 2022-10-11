const getCustomers = (req, res) => {
    return res.status(200).json({
        statusCode: 200,
        message: {
            data: "Hello, I am your customer!"
        }
    })
}


export {
    getCustomers
}