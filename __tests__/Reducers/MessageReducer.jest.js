import MessageReducer from '../../app/Reducers/message.reducer';
import ActionConstants from "../../app/Constants/ActionConstants";
import MessageMock from "../../__test__mocks__/MessageMock";
import InitialState from "../../app/Reducers/InitialState";

let firstReturned = null;

describe("Message reducer", () => {
    it("Should assign the message to an object", (done) => {
        let returned = MessageReducer({messages: []}, { 
            type: ActionConstants.FETCH_ONE_MESSAGE_OK,
            message: MessageMock.messageBody
        });
        firstReturned = returned;
        expect(returned.messages).toBeDefined();
        expect(returned.messages[0].id).toBe("qaStkTelMB0");
        done();
    });
});

describe("Message reducer", () => {
    it("Should assign conversations to the above message", (done) => {
        let returned = MessageReducer(firstReturned, { 
            type: ActionConstants.FETCH_CONVERSATIONS_OK,
            messages: MessageMock.messages
        });
        expect(returned.messages).toBeDefined();
        done();
    });
});

describe("Message reducer", () => {
    it("Should assign an conversation post error", (done) => {
        let returned = MessageReducer(firstReturned, { 
            type: ActionConstants.CONVERSATION_POST_ERROR,
            error: JSON.stringify({error : "Test"})
        });

        expect(returned.conversation_post_error).toBeDefined();
        expect(returned.conversation_post_error).toEqual(JSON.stringify({error: "Test"}));
        done();
    });
});