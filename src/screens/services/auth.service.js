import axiosInstance from "../api/axios"

const register = (data) => {
    return axiosInstance.post('/accounts/register/', data)
}

const login = (data) => {
    return axiosInstance.post('/accounts/token/', data)
}

const me = () => {
    return axiosInstance.get('/accounts/me/')
}

const updateMe = () => {
    return axiosInstance.patch('/accounts/me/')
}

export {
    register,
    login,
    me,
    updateMe
}