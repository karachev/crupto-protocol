export default class User {

    constructor(index, openId, secretId, module) {
        this.id = index;
        this.openId = openId;
        this.secretId = secretId;
        this.module = module;
    };

    getOpenId = ()=> {
        return this.openId
    };

    setOpenId = (newOpenId)=> {
        this.openId = newOpenId
    };

    getSecretId = ()=> {
        return this.secretId
    };

    setSecretId = (newSecretId)=> {
        this.secretId = newSecretId
    };

    calculateKey = (openID) => {
        let result = 0;
        let buf = 0;
        for (let i = 0; i < this.secretId.length; i++) {
            buf = (this.secretId[i] * openID[i]) % this.module;
            result += buf;
            result = result % this.module;
        }
        return String(result);
    };
}