import axiosClient from "../axios";

export const adminList = () => axiosClient.get('customers');
export const adminCreate = (data) => axiosClient.post('customers', data);
export const adminUpdate = (id, data) => axiosClient.put(`customers/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
});
export const adminsUpdateStatus = (id) => axiosClient.get(`customers-status/${id}`);
export const adminsDelete = (id) => axiosClient.delete(`customers/${id}`);
