import RegisterStore from './RegisterStore';
import AuthStore from './AuthStore';
import ContractStore from './ContractStore';

export default {
    register: new RegisterStore(),
    auth: new AuthStore(),
    contract: new ContractStore()
}