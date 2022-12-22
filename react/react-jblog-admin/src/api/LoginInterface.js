import BaseModule from './BaseModule';

class LoginInterface extends BaseModule {
    constructor() {
        super();
        this.baseUrl = process.env.api.common_url
    }

    /*获取验证码*/
    getCode() {
        return this.get(`${this.baseUrl}/api/admin/getCode?=${Math.random()}`)
    }

    /*登陆*/
    login(data = {}) {
        return this.post(`${this.baseUrl}/api/admin/login`, data);
    }

    /*注册*/
    register(data = {}) {
        return this.post(`${this.baseUrl}/api/admin/register`, data)
    }

    // 修改密码
    resetPassword(data = {}) {
        return this.patch(`${this.baseUrl}/api/admin/master`, data)
    }

    // 获取公钥
    getPublicKey() {
        return this.get(`${this.baseUrl}/api/admin/key`)
    }
}

export default new LoginInterface()
