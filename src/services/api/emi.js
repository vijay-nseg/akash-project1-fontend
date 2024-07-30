import axiosClient from "../axios";

export const emiList = () => axiosClient.get('emi');
export const emiCreate = (data) => axiosClient.post('emi', data);
export const emiUpdate = (id, data) => axiosClient.put(`emi/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
    }
});
export const emisUpdateStatus = (id) => axiosClient.get(`emi-status/${id}`);
export const emisDelete = (id) => axiosClient.delete(`emi/${id}`);
