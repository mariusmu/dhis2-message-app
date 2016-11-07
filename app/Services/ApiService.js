import req from 'request-promise';

class ApiService {
    
    /**
     * Create option object for request
     * @param uri the uri to send request to
     * @param method the method to use in the request
     */
    createOptions(uri, method) {
        return {
            method: method,
            uri: uri,
            headers: {
                "Content-Type" : "application/json"
            },
            json: true
        }
    }

    /**
     * POST to Api as an unauthenticated user
     * @param json the json object to post
     * @param uri the uri to post to
     * @param b64 base64 authentication token
     */
    unauthenticatedPost(json, uri, b64) {
        let options = this.createOptions(uri, "POST");
        options.body = json;
        options.headers.Authorization = "Basic " + b64;
        return req(options);
    };

    /**
     * POST to Api as an authenticated client
     * @param json the json object to POST
     * @param uri the uri to post to
     * @param token the refresh token
     */
    authenticatedPost(json, uri, token) {
        let options = this.createOptions(uri, "POST");
        options.headers.token = token;
        options.body = JSON.stringify(json);
        return req(options);
    }
}

module.exports = new ApiService();