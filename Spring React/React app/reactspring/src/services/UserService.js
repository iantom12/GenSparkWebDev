import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/api/users';
axios.create({
    baseURL: "http://localhost:8080/api/users",
    headers: {
      "Content-type": "application/json",
    }
});

class UserService {

    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }
    deleteUser(id){
      return axios.delete(`${USERS_REST_API_URL}/delete/${id}`);
    }
    getUserId(id){
      return axios.get(`${USERS_REST_API_URL}/get/${id}`);
    }
    createUser(user) {
        return axios.post(`${USERS_REST_API_URL}/create`, user,{
          headers: {
            'Access-Control-Allow-Origin': '*'
        }    });
    }
    updateUser(id, user) {
        return axios.put(`${USERS_REST_API_URL}/update/${id}`, user,{
          headers: {
            'Access-Control-Allow-Origin': '*'
          }    });
      }
    }



export default new UserService();

