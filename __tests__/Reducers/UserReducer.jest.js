import UserReducer from '../../app/Reducers/user.reducer';
import ActionConstants from "../../app/Constants/ActionConstants";
import UserMock from "../../__test__mocks__/UserMock";

describe("User reducer", () => {
    it("Should assign the message to an object", (done) => {
        let returned = UserReducer({users: []}, { 
            type: ActionConstants.FETCH_USER_PORTION_OK,
            users: UserMock.users
        });
        expect(returned.users).toBeDefined();
        expect(returned.users[0].id).toBe("DXyJmlo9rge");
        done();
    });
});
