/**
 * It takes a user object and returns a new object with only the properties we want to expose to the
 * client
 * @param data - The data that you want to convert to JSON.
 * @returns An object with the following properties:
 * id, firstName, lastName, gender, phone, email, homeNumber, address, state, isSendNews, question,
 * dateOfBirth
 */
export const userJsonReponse = (data) => {
    if (!data) return
    return {
        id: data._id || data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        homeNumber: data.homeNumber,
        address: data.address,
        state: data.state,
        isSendNews: data.isSendNews,
        question: data.question,
        dateOfBirth: data.dateOfBirth
    }
}

/**
 * It takes a data object and returns a new object with the same properties but with different names
 * @param data - The data object that is passed to the function.
 */
export const userCreateUpdateJson = (data) => {
    if (!data) return
    return {
        _id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        homeNumber: data.homeNumber,
        address: data.address,
        state: data.state,
        email: data.email,
        password: data.password,
        isSendNews: data.isSendNews,
        question: data.question,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth
    }
}
