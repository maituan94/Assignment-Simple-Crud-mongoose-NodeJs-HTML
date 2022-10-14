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
        question: data.question
    }
}

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
        phone: data.phone
    }
}