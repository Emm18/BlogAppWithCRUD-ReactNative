import axios from 'axios';

// using ngrok is free but the URL changes every 8 hours
export default axios.create({
    baseURL: 'ENTER NGROK URL'
});