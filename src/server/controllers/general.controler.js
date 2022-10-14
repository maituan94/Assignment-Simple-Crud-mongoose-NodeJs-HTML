import { provinces } from "../enum/index.js"

const getProvinces = (req, res) => {
    return res.status(200).json({
        statusCode: 200,
        data: provinces
    })
}

export {
    getProvinces
}