import { provinces } from "../enum/index.js"
import { statusCode } from "../enum/index.js"

/**
 * It returns a JSON object containing the status code and the data
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 * @returns An array of provinces
 */
const getProvinces = (req, res) => {
    return res.status(statusCode.success).json({
        statusCode: statusCode.success,
        data: provinces
    })
}

export {
    getProvinces
}
