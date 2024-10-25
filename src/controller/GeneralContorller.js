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
        let returnData = []
        try {
            const response = await axios.get(apiLink, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            });
            returnData = response.data[columnName];
        } catch (error) {
            console.error('Error fetching for ' + columnName + ':', error);
            returnData = [];
        }
        return returnData
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