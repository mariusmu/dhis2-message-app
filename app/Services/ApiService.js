import "whatwg-fetch";

class ApiService {
    
    /**
     * Create option object for request
     * @param{String} uri the uri to send request to
     * @param{String} method the method to use in the request
     * @param{boolean} json boolean
     */
    createOptions(uri, method, json) {
        
        const contentType = json === true ? "application/json" : "application/x-www-form-urlencoded"
        return {
            credentials: "same-origin",
            method: method,
            uri: uri,
            headers: {
                "Content-Type" : contentType
            },
            json: json
        };
    }


    /**
     * POST to Api as an unauthenticated user
     * @param{Object} form object the form object to post
     * @param{String} uri the uri to post to
     * @param{String} b64 base64 authentication token
     * @return{Promise} fetch response
     */
    authenticatedFormPost(form, uri, token) {
        let options = this.createOptions(uri, "POST", false);
        options.body = form;
        if(token) {
            delete options.credentials;
            options.headers.Authorization = "Bearer " + token;
        }
        return fetch(uri, options);
    }

    /**
     * POST to Api as an authenticated client
     * @param{Object} json the json object to POST
     * @param{String} uri the uri to post to
     * @param{String} token the refresh token
     * @return{Promise} fetch response
     */
    authenticatedPost(json, uri, token) {
        let options = this.createOptions(uri, "POST", true);
        if(token) {
            delete options.credentials;
            options.headers.Authorization = "Bearer " + token;
        }
        options.body = json;
        
        return fetch(uri, options);
    }

    /**
     * POST a file to the Api as an authenticated client
     * @param{File} the file to POST
     * @param{String} uri the uri to post to
     * @param{String} token the refresh token
     * @return{Promise} fetch response
     */
    authenticatedFilePost(file, uri, token) {
        let options = this.createOptions(uri, "POST", false);
        if(token) {
            delete options.credentials;
            options.headers.Authorization = "Bearer " + token;
        }
        options.headers["Content-Type"] = "multipart/form-data;boundary=--file";
        options.form = { file : file};
        
        return fetch(uri, options);
    }

    /**
     * POST a delete request to an Api as an unauthenticated client
     * @param{String} uri the uri to post to
     * @return{Promise} fetch response
     */
    unauthenticatedDelete(uri) {
        return fetch(uri, {
            method: "DELETE"
        });
    }

    /**
     * GET request to api as an unauthenticated user
     * @param{String} uri the url to the endpoint
     * @return{Promise} fetch response
     */
    authenticatedGet(uri, token) {
        let options = this.createOptions(uri, "GET", true);
        if(token) {
            delete options.credentials;
            options.headers.Authorization = "Bearer " + token;
        }
        return fetch(uri, options);
    }
}

module.exports = new ApiService();