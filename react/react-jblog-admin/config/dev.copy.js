/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/3/16 下午5:03
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/3/16 下午5:03
 */

const path = require('path');

module.exports = class InsertCopyWebpackPlugin {
    constructor(options) {

        let src = path.resolve(__dirname, '../src');

        this.copyPath = {};

        this.copyPath[`${src}/assets/images`] = 'static/images';

    }

    insert() {
        let array = [];

        Object.keys(this.copyPath).forEach(key => {
            const fromTo = (() => (array, from, to) => {
                let obj = {
                    from: from,
                    to: to
                };

                array.push(obj);
            })();
            Object.prototype.toString.call(this.copyPath[key]) === '[object Array]' ?
                [...this.copyPath[key]].forEach(value => {
                    fromTo(array, path.resolve(__dirname, key), value)
                }) :
                fromTo(array, path.resolve(__dirname, key), this.copyPath[key])
        });

        return array
    }
};
