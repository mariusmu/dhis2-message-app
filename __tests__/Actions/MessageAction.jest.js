import ReduxMockStore from "redux-mock-store";
import { fetchOneMessage, fetchAllConversations, postConversation } from "../../app/Actions/message.action";
import fetchMock from "fetch-mock";
import ActionConstants from "../../app/Constants/ActionConstants";
import MessageMock from "../../__test__mocks__/MessageMock";

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
fetchMock.get("http://localhost:8082/api/messageConversations/qaStkTelMB0",
    { status: 200, body: MessageMock.messageBody });

fetchMock.get("http://localhost:8082/api/messageConversations/qaStkTelMB0/messages",
    { status: 200, body: MessageMock.messages });

fetchMock.post("http://localhost:8082/api/messageConversations/qaStkTelMB0",
    { status: 201, body: { status: "OK" } });

const middleware = [];
const store = ReduxMockStore(middleware);
const reduxStore = store();

describe("Message action fetch one message", () => {
    it("It should fetch the message and distpatch", (done) => {
        fetchOneMessage("qaStkTelMB0")(reduxStore.dispatch)
            .then(() => {
                setTimeout(() => {
                    const lastAction = reduxStore.getActions()[0];
                    expect(lastAction.type).toBe(ActionConstants.FETCH_ONE_MESSAGE_OK);
                    expect(lastAction.message.subject).toBe("My CV");
                    done();
                }, 1000);

            })
            .catch(err => {
                fail(err);
                done();
            });

    });


});

describe("Message action fetch all conversations", () => {
    it("Should fetch all conversation for a post", (done) => {

        fetchAllConversations("qaStkTelMB0")(reduxStore.dispatch)
            .then(() => {
                setTimeout(() => {
                    const lastAction = reduxStore.getActions()[1];
                    expect(lastAction.type).toBe(ActionConstants.FETCH_CONVERSATIONS_OK);
                    done();
                }, 1000);

            })
            .catch(err => {
                console.log(err);
                fail(err);
                done();
            });

    });
});

describe("Message action post conversation", () => {
    it("Should post a conversation to the api, then dispatch", (done) => {
        postConversation("qaStkTelMB0", "Hello", false, [])(reduxStore.dispatch)
            .then(() => {
                setTimeout(() => {
                    const lastAction = reduxStore.getActions();
                    expect(lastAction[2].type).toBe(ActionConstants.CONVERSATION_POST_OK);
                    done();
                }, 1000);

            })
            .catch(err => {
                fail(err);
                done();
            });

    });
});

