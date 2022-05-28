import axios from "axios";
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const request = async ({url, method, data}) => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);

    return axios({
        baseURL: BASE_URL, 
        method,
        url,
        data,
        headers: {'Authorization': 'Bearer ' + userInfo.tokens.access }
     }
    )
};
export default request;