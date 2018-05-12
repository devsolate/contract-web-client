import RegisterStore from './RegisterStore';
import AuthStore from './AuthStore';

export default {
    register: new RegisterStore(),
    auth: new AuthStore()
}