import axios from 'axios';

export default axios.create({
    baseURL: `https://blockchain.info/rawaddr/`,
    crossdomain: true
});