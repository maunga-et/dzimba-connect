import axiosInstance from "../api/axios"

export const createListing = (data) => {
    return axiosInstance.postForm('/listings/', data)
}

export const getListings = () => {
    return axiosInstance.get('/listings/')
}

export const getListingById = (id) => {
    return axiosInstance.get(`/listings/${id}/`)
}