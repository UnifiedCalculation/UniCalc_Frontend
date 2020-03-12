import axios from 'axios';


export async function loginUser(username, password, callback) {
    axios.post('/user/login', { username, password })
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
    .catch(error => console.log(error));
}