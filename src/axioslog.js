import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://logdaily-19fc9.firebaseio.com/'
});

export default instance;