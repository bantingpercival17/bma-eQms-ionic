import axios from "axios";
import store from '../store/index'
import {
    GET_USER_TOKEN
} from '@/store/storeConstants'
export class GeneralController {
    constructor() {
        this.token = store.getters[`auth/${GET_USER_TOKEN}`]; // Assign the user token in the constructor
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
}