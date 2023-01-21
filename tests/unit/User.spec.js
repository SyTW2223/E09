import Vuex from 'vuex';
import { userModel } from "@/store/modules/userModel";
import { expect } from "chai";

describe('User model', () => {

    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                userModel
            }
        })
    });

    it ('Set user', () => {
        // arrange
        const user = {
            name: 'exampleUser',
            email: 'example@email.com',
            password: 'examplePassword123',
            _id: '',
            following: [],
        }
        // act
        store.dispatch('setUser', user);
        // assert
        expect(store.getters.name).to.equal('exampleUser');
        expect(store.getters.email).to.equal('example@email.com');
        expect(store.getters.password).to.equal('examplePassword123');
    });

    it ('Set logged user', () => {
        // arrange
        const loggedUser = {
            name: 'exampleLoggedUser2',
            email: 'exampleLogged@email.com',
            password: 'exampleLoggedPassword123',
            _id: '',
            following: [],
        }
        // act
        store.dispatch('setLoggedUser', loggedUser);
        // assert
        expect(store.getters.loggedUser).to.be.deep.equal(loggedUser);
    });

    it ('Set error', () => {
        // arrange
        const error = 'exampleError';
        // act
        store.dispatch('setError', error);
        // assert
        expect(store.getters.error).to.be.equal('exampleError');
        expect(store.getters.error).to.be.not.equal('notExampleError');
    });

    it('Set success', () => {
        // arrange
        const success = 'exampleSuccess';
        // act
        store.dispatch('setSuccess', success);
        // assert
        expect(store.getters.success).to.be.equal("exampleSuccess");
        expect(store.getters.success).to.be.not.equal("notExampleSuccess");
    });

    it('Set email', () => {
        // arrange
        const email = 'exampleEmail@email.com';
        // act
        store.dispatch('setEmail', email);
        // assert
        expect(store.getters.email).to.be.equal("exampleEmail@email.com");
        expect(store.getters.email).to.be.not.equal("notExampleEmail@email.com");
    });

    it('Set password', () => {
        // arrange
        const password = 'examplePassword';
        // act
        store.dispatch('setPassword', password);
        // assert
        expect(store.getters.password).to.be.equal("examplePassword");
        expect(store.getters.password).to.be.not.equal("notExamplePassword");
    });

    it('Set followers', () => {
        // arrange
        const followers = 99;
        // act
        store.dispatch('setFollowers', followers);
        // assert
        expect(store.getters.followers).to.be.equal(99);
        expect(store.getters.followers).to.be.not.equal(100);
    });

    it('Sign in', () => {
        // arrange
        const user = {
            email: 'exampleEmail@gmail.com',
            password: 'examplePassword'
        }
        // act
        store.dispatch('signIn', user);
        // assert
        expect(store.getters.email).to.be.equal("exampleEmail@gmail.com");
        expect(store.getters.password).to.be.equal("examplePassword");
    });

    it('Sign up', () => {
        // arrange
        const user = {
            name: 'exampleName',
            email: 'exampleEmail@email.com',
            password: 'examplePassword'
        }
        // act
        store.dispatch('signUp', user);
        // assert
        expect(store.getters.name).to.be.equal("exampleName");
        expect(store.getters.email).to.be.equal("exampleEmail@email.com");
        expect(store.getters.password).to.be.equal("examplePassword");
    });
});