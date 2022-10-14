import { provinces } from "../enum/index.js"
import { statusCode } from "../enum/index.js"

const getProvinces = (req, res) => {
    return res.status(statusCode.success).json({
        statusCode: statusCode.success,
        data: provinces
    })
}

export {
    getProvinces
}