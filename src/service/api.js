import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL="https://college-seek-backend.onrender.com"; //Backend URL

const axiosInstance=axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers:{
        "Accept": "application/json, uform-data", 
        "Content-Type": "application/json"
    }
})


axiosInstance.interceptors.request.use(
    function(config){
        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)

const processResponse=(response)=>{
    if(response?.status===200){
        return { isSuccess: true, data: response.data };
    }
    else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };  
    }
}

const processError=(error)=>{
    if(error.response){//status code is not 200, but it is something different such as 500 from the backend
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if(error.request){//If, server does not sends any response back due to network error or, failure
        console.log("ERROR IN REQUEST: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else{//something happens in the setting up that triggers and error, so their might be no message from the server
        console.log("ERROR IN NETWORK: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API={};


for (const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        })
}

export {API};