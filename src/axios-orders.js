import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-react-47f0c.firebaseio.com/'
});

export default instance;