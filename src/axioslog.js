import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://logdaily-demo.firebaseio.com/ '
});

export default instance;