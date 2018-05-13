import { observable, autorun, decorate, computed } from 'mobx';
import axios from 'axios';
import Constants from '../Constants';
import Dexie from 'dexie';

const db = new Dexie("UsersDB");
db.version(1).stores({ users: "++id,name,&email,encryptedSecretKey" });

export default class RegisterStore {
  isLoading = false;
  isSuccess = false;

  callApi({ name, email, password }) {
    this.isLoading = true;
    this.isSuccess = false;

    return axios.post(Constants.SERVER_URL + '/api/register', {
        email,
        name,
        password
      })
      .then((response) => {
        
        db.users
            .where("email")
            .anyOf(email)
            .delete()
            .then((result) => {
                db.users.add({
                    name: name,
                    email: email,
                    encryptedSecretKey: response.data.encryptedSecretKey
                }).then((result) => {
                    console.log("Users Saved:", email)
                }).catch(error => {
                    console.error(error)
                })
            });
        
        this.isLoading = false;
        this.isSuccess = true;
      })
      .catch((error) => {
        this.isLoading = false;
        this.isSuccess = false;

        console.error(error)
      });
  }
  get isRegisterSuccess() {
    return !this.isLoading && this.isSuccess;
  }
}

decorate(RegisterStore, {
    isLoading: observable,
    isSuccess: observable,
    isRegisterSuccess: computed
});