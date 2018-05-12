import { observable, autorun, decorate, computed } from 'mobx';
import axios from 'axios';
import Constants from '../Constants';
import Dexie from 'dexie';
import _ from 'underscore';
import CryptoJS from 'crypto-js';

const db = new Dexie("UsersDB");
db.version(1).stores({ users: "++id,name,&email,encryptedSecretKey" });

export default class AuthStore {
  isLoading = false;
  isSuccess = false;
  isUserLoaded = false;
  users = [];
  accounts = [];

getUsers() {
    db.transaction('rw', db.users, async() => {
        const users = await db.users.toArray();
        
        this.users = users.map((item) => item.email)
        this.accounts = users;
        this.isUserLoaded = true;
        
    })
  }

  auth({ email, password }) {
    this.isLoading = true;
    this.isSuccess = false;

    const account = _.find(this.accounts, (item) => item.email == email)
    const bytes = CryptoJS.AES.decrypt(account.encryptedSecretKey.toString(), password);
    const result = bytes.toString();
    if(result) {
        // Login Success
        this.isLoading = false;
        this.isSuccess = true;

        window.sessionStorage.setItem("currentUser", email);
    } else {
        // Login Failed 
        this.isLoading = false;
        this.isSuccess = false;
    }
  }

  get isAuthorized() {
    return !this.isLoading && this.isSuccess;
  }

  get isRequireRegister() {
    return this.isUserLoaded && this.users.length === 0;
  }
}

decorate(AuthStore, {
    isLoading: observable,
    isSuccess: observable,
    users: observable,
    isAuthorized: computed,
    isRequireRegister: computed,
});