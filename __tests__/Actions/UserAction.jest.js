import ReduxMockStore from "redux-mock-store";
import { fetchAllUsers } from "../../app/Actions/user.action";
import fetchMock from "fetch-mock";
import ActionConstants from "../../app/Constants/ActionConstants";
import UserMock from "../../__test__mocks__/UserMock";
/**
 * Important!!!
 * If you have specified a token in the message action. then replace the mock call with the bearer like the one under
 * fetchMock.get("http://localhost:8082/api/messageConversations/qaStkTelMB0", 
    { status: 200, body : MessageMock.messageBody}, { headers: { Authorization: "Bearer 00236c7f-1c0a-46b3-ac17-e990644eddfa" } });
    .. or simply set the token to be null
 */

/**
 * Mock the api calls
 */
fetchMock.get("http://localhost:8082/api/users",
    { status: 200, body: UserMock });

const middleware = [];
const store = ReduxMockStore(middleware);

const reduxStore = store();

describe("User action", () => {
    it("Should fetch all users", (done) => {
       fetchAllUsers()(reduxStore.dispatch)
        .then(res => {
            setTimeout(() => {
                const lastAction = reduxStore.getActions()[0];
                expect(lastAction.type).toBe(ActionConstants.FETCH_USER_PORTION_OK);
                expect(lastAction.users).toBeDefined();
                done();
            });
        })
        .catch(err => {
            fail(err);
            done();
        });
    });
});
