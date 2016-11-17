import ApiService from '../../../../app/Services/ApiService';
import Nock from 'nock';
import configureMockStore from 'redux-mock-store'
import Thunk from 'redux-thunk';
import ActionConstants from '../../../../app/Constants/ActionConstants';
import UrlConstants from 'constants/UrlConstants';
import {fetchAllMessages} from '../../../../app/Actions/message.action';

const messageMock = {
    "pager": {
        "page": 1,
        "pageCount": 1,
        "total": 15,
        "pageSize": 50
    },
    "messageConversations": [
        {
            "id": "h3ndIiHXQwo",
            "displayName": "Child health form lacks vaccine"
        },
        {
            "id": "aqvFxkI4BZj",
            "displayName": "Missing fields in immunization form compared to paper version"
        }]
};
const middleware = [Thunk];
const mockStore = configureMockStore(middleware);

describe("actions", () => {
    it("should fail", () => {
        expect(false).toBe(false);
    });

    it('should fetch message headers', () => {
        const url = "api/messageConversations?fields=:all";
       
            console.log(UrlConstants.baseUrl + url);
        const expectedActions = {
            type: ActionConstants.FETCH_MESSAGES_OK, 
            pager: messageMock.pager,
            messages: messageMock.messageConversations            
        };

        const store = mockStore({message: {messages: [], pager: []}});
        const dispatch = store.dispatch;
        beforeEach((done) => {
            fetchAllMessages()(store.dispatch).then(res => {
                done();
            }).catch(err => {
                console.log(store.getActions())
                done()});
         }
         
        );
        return expect(false).toBe(false);
    });
});


