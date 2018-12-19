import primeNumbers from './primesNumbers.json';

export default class BlomScheme {

    constructor(size) {
        this.size = size;
        this.secrMatrix = [];
        this.openIds = {};

        const indexPrime = Math.floor(Math.random() * (primeNumbers.length-1));

        this.module = primeNumbers[indexPrime];

        this.secrMatrix = [];

        for (let i = 0; i < this.size; i++) {
            this.secrMatrix[i] = [];
        }

        for (let i = 0; i < this.size; i++) {
            for (let j = i; j < this.size; j++) {
                this.secrMatrix[i][j] = this.randomNumber();
                if (i !== j) {
                    this.secrMatrix[j][i] = this.secrMatrix[i][j];
                }
            }
        }
    }

    randomNumber = ()=> {
        return Math.floor(Math.random() * (this.module-1));
    };

    getModule = ()=> {
        return this.module;
    };

    getOpentId = username => {
        const result = [];
        for (let i = 0; i < this.size; i++) {
            result[i] = this.randomNumber();
        }
        this.openIds[username] = result;
        return result;
    };

    getSecret = (openID)=> {
        const result = [];
        let temp;
        let buf
        for (let i = 0; i < this.size; i++) {
            result[i] = 0;
            for (let j = 0; j < this.size; j++) {
                buf = this.secrMatrix[i][j] * openID[j];
                result[i] += buf;
                result[i] = result[i] % this.module;
            }
        }
        return result;
    };

}