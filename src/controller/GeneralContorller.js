import axios from "axios";
import store from '../store/index'
import {
    GET_USER_TOKEN
} from '@/store/storeConstants'
export class GeneralController {
    constructor() {
        this.token = store.getters[`auth/${GET_USER_TOKEN}`]; // Assign the user token in the constructor
    }
    async retrieveData(apiLink, formData, columnName) {
        return axios.post(apiLink, formData, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        })
            .then(response => {
                // Return response for chaining
                return response.data[columnName];
            })
            .catch(error => {
                return []
                throw error; // Rethrow to allow `.catch` in the component

            });
    }
    async retriveData(apiLink, columnName) {
        return axios.get(apiLink, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        })
            .then(response => {
                // Return response for chaining
                return response.data[columnName];
            })
            .catch(error => {
                return []
                throw error; // Rethrow to allow `.catch` in the component

            });
    }
    async retriveFile(apiLink, column) {
        return await axios.post(apiLink, column, {
            headers: {
                Authorization: 'Bearer ' + this.token,
            },
            responseType: 'blob' // Important to handle the file as binary
        }).then(response => {
            // Return response for chaining
            return response;
        })
            .catch(error => {
                return []
                throw error; // Rethrow to allow `.catch` in the component

            });
    }
    storeItem(apiLink, data) {
        return axios.post(apiLink, data, {
            headers: {
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                // Return response for chaining
                return response;
            })
            .catch(error => {
                throw error; // Rethrow to allow `.catch` in the component
            });
    }
    removeItem(apiLink, data) {
        return axios.post(apiLink, data, {
            headers: {
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                // Return response for chaining
                return response;
            })
            .catch(error => {
                throw error; // Rethrow to allow `.catch` in the component
            });

    }
    printLog(model, data) {
        const links = {
            FormDocuments: '/forms/form-documents/print',
            ProcedureDocuments: '/procedure/procedure-documents/print'
        };
        const link = links[model] || null;

        return axios.post(link, data, {
            headers: {
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                // Return response for chaining
                return response;
            })
            .catch(error => {
                throw error; // Rethrow to allow `.catch` in the component
            });
    }
    downloadFile(model, data) {
        const links = {
            FormDocuments: '/forms/form-documents/download',
            ProcedureDocuments: '/procedure/procedure-documents/download'
        };
        const link = links[model] || null;

        return axios.post(link, data, {
            headers: {
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob', // Important for file downloads

        })
            .then(response => {
                // Return response for chaining
                return response;
            })
            .catch(error => {
                throw error; // Rethrow to allow `.catch` in the component
            });
    }
    async retriveAnalytics(model, data) {
        const links = {
            FormDocuments: '/forms/form-documents/analytics',
            ProcedureDocuments: '/procedure/procedure-documents/analytics'
        };
        const apiLink = links[model] || null;
        return await axios.post(apiLink, data, {
            headers: {
                Authorization: 'Bearer ' + this.token,
            },
        }).then(response => {
            // Return response for chaining
            return response;
        })
            .catch(error => {
                return []
                throw error; // Rethrow to allow `.catch` in the component

            });
    }
}