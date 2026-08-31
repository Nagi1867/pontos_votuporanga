import axios from "axios";

let dev = 'http://localhost:8080'
let prod = 'https://pontos-votuporanga-1.onrender.com'

const api = axios.create({
    baseURL: dev,

})

export default api