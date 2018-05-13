import { observable, autorun, decorate, computed } from 'mobx';
import axios from 'axios';
import Constants from '../Constants';
import _ from 'underscore';
import StellarSDK from 'stellar-sdk';

export default class ContractStore {
  isCreateLoading = false;
  isCreateSuccess = false;

  async create(email, password, customerId) {
    const generateKeyPair = StellarSDK.Keypair.random();
  }
}

decorate(ContractStore, {
    isCreateLoading: observable,
    isCreateSuccess: observable
});