import superagent from 'superagent';
console.log(Promise);
for( let x in Promise ){
    console.log(x);

}
const methods = [
    'get',
    'head',
    'post',
    'put',
    'del',
    'options',
    'patch'
];

class _Api {

    constructor(opts) {

        this.opts = opts || {};

        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');

    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);

                if (params) {
                    request.query(params);
                }

                //if (this.opts.headers) {
                //    request.set(this.opts.headers);
                //}

                if (data) {
                    request.send(data);
                }

                request.end((err, { body } = {}) =>{
                    //console.log( 'body=' + body1 + ',error=' + err );

                    return err ? reject(body && err) : resolve(body)
                });
            })
        );

    }

}

const Api = _Api;

export default Api;
