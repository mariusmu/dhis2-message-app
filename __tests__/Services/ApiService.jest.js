import fetchMock from 'fetch-mock';
import ApiService from '../../app/Services/ApiService';

fetchMock.get("http://test.no", { hello: "Hei" }, { headers: { Authorization: "Bearer 1234" } });
fetchMock.delete("http://test.no", 200);
fetchMock.get("http://test.no", { hello: "Another token" }, { headers: { Authorization: "Bearer AAFF" } });
fetchMock.post("http://test.no", 200, { headers: { Authorization: "Bearer 1234" } });

class TestHelper {
    testAuthenticatedGet(exp, status, uri, token) {
        describe("ApiService authenticated get", () => {
            it("Should return " + JSON.stringify(exp), (done) => {
                ApiService.authenticatedGet(uri, token)
                    .then(res => {
                        expect(res.status).toBe(status);
                        res.json()
                            .then(parse => {
                                expect(parse).toEqual(exp);
                                done();
                            })
                            .catch(err => {
                                fail("Error parsing");
                                done();
                            });

                    })
                    .catch(err => {
                        fail("Error fetching");
                    });

            });
        });
    }

    testUnauthenticatedDelete(status, uri) {
        describe("Should respond to delete request", () => {
            it("Should return 200", (done) => {
                ApiService.unauthenticatedDelete("http://test.no")
                    .then(res => {
                        expect(res.status).toBe(status);
                        done();
                    })
                    .catch(err => {
                        fail(err, "Status code 200", "Could not delete");
                        done();
                    });
            })
        });
    }

    testAuthenticatedPost(exp, status, uri, obj, token) {
        let oldFetch = window.fetch;


        describe("ApiService AuthenticatedPost", () => {
            it("Should successfully post", (done) => {
                ApiService.authenticatedPost(obj, uri, token)
                    .then(res => {
                        expect(res.status).toBe(200);
                        done();
                    })
                    .catch(err => {
                        fail(err, JSON.stringify(obj), "Could not post an object");
                        done();
                    })
            });
        })
    }
}

const helper = new TestHelper();


helper.testAuthenticatedGet({ hello: "Hei" }, 200, "http://test.no", "1234");
helper.testAuthenticatedGet({ hello: "Another token" }, 200, "http://test.no", "AAFF");
helper.testUnauthenticatedDelete(200, "http://test.no");
helper.testAuthenticatedPost({hello: "Hei marius"}, 200, "http://test.no", {hello: "Hei marius"}, "1234")