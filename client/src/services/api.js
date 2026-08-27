import axios from "axios";

let dev = 'http://localhost:8080'
let prod = 'postgresql://gabriel:fXH4u4vkPFZesMLoiJKx1GlXPwTYvzC4@dpg-da73dbou01pc73drcns0-a/ecoponto'

const api = axios.create({
    baseURL: prod,

})

export default api