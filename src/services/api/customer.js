import axiosClient from "../axios";

export const customerList = () => axiosClient.get('customers');
export const customerCreate = (data) => axiosClient.post('customers', data);
export const customerUpdate = (id, data) => axiosClient.put(`customers/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
});
export const customersUpdateStatus = (id) => axiosClient.get(`customers-status/${id}`);
export const customersDelete = (id) => axiosClient.delete(`customers/${id}`);
