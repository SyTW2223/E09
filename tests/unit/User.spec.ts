import { userModel } from "@/store/modules/userModel";
import { expect } from "chai";

describe('User models mutations', () => {
    it('Set user data', () => {
        // Mock state
        const state = {
            loggedUser: null,
            error: null,
            success: null,
            name: 'exampleUser',
            email: 'exampleUser@exampleEmail.com',
            password: 'examplePassword123',
            id: '',
            following: [],
            followers: 0
        }
        // Aply mutation
        userModel.mutations.SET_USER(userModel.state, state);
        // Assert result
        expect(userModel.state.name).to.be.eq('exampleUser');
    });
});