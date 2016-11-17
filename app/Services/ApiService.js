//import req from 'request-promise';
import cookie from 'react-cookie';
import 'whatwg-fetch'

class ApiService {
    
    /**
     * Create option object for request
     * @param uri the uri to send request to
     * @param method the method to use in the request
     * @param json boolean
     */
    createOptions(uri, method, json) {
        
        const contentType = json === true ? 'application/json' : 'application/x-www-form-urlencoded'
        return {
            credentials: 'same-origin',
            method: method,
            uri: uri,
            headers: {
                "Content-Type" : contentType
            },
            json: json
        }
    }


    // /**
    //  * POST to Api as an unauthenticated user
    //  * @param json the json object to post
    //  * @param uri the uri to post to
    //  * @param b64 base64 authentication token
    //  */
    // unauthenticatedPost(json, uri, b64) {
    //     let options = this.createOptions(uri, "POST", true);
    //     options.body = json;
    //     if(b64) options.headers.Authorization = "Basic " + b64;
    //     return req(options);
    // };

    // /**
    //  * POST to Api as an unauthenticated user
    //  * @param form object the form object to post
    //  * @param uri the uri to post to
    //  * @param b64 base64 authentication token
    //  */
    // unauthenticatedFormPost(form, uri, b64) {
    //     let options = this.createOptions(uri, "POST", false);
    //     options.form = form;
    //     if(b64) options.headers.Authorization = "Basic " + b64;
    //     return req(options);
    // };

    /**
     * POST to Api as an unauthenticated user
     * @param form object the form object to post
     * @param uri the uri to post to
     * @param b64 base64 authentication token
     */
    authenticatedFormPost(form, uri, token) {
        let options = this.createOptions(uri, "POST", false);
        options.body = form;
        if(token) options.headers.Authorization = "Bearer " + token
        return fetch(uri, options);
    };
    /**
     * POST to Api as an authenticated client
     * @param json the json object to POST
     * @param uri the uri to post to
     * @param token the refresh token
     */
    authenticatedPost(json, uri, token) {
        let options = this.createOptions(uri, "POST", true);
        if(token) options.headers.Authorization = "Bearer " + token;
        options.body = json;
        
        return fetch(uri, options);
    }

    authenticatedFilePost(file, uri, token) {
        let options = this.createOptions(uri, "POST", false);
        if(token) options.headers.Authorization = "Bearer " + token;
        options.headers['Content-Type'] = "multipart/form-data;boundary=--file"
        options.form = { file : file};
        
        return fetch(uri, options);
    }

    // /**
    //  * GET request to api as an unauthenticated user
    //  * @param uri the url to the endpoint
    //  */
    // unauthenticatedGet(uri) {
    //     let options = this.createOptions(uri, "GET", false);
    //     return req(options);
    // }

       /**
     * GET request to api as an unauthenticated user
     * @param uri the url to the endpoint
     */
    authenticatedGet(uri, token) {
        let options = this.createOptions(uri, "GET", false);
        if(token) options.headers.Authorization = "Bearer " + token;
        console.log(options);
        return fetch(uri, options);
    }
}

module.exports = new ApiService();