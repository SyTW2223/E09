import Vuex from 'vuex';
import { juiceModel } from '@/store/modules/juiceModel';
import { expect } from "chai";

describe('Juice model', () => {
    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                juiceModel
            }
        })
    });

    it ('Set juice', () => {
        // arrange
        const juice = {
            userName: 'exampleUser',
            text: 'exampleText',
            date: 'exampleDate',
            _id: '',
            likes: [],
        }
        // act
        store.dispatch('setJuice', juice);
        // assert
        expect(store.getters.userName).to.equal('exampleUser');
        expect(store.getters.text).to.equal('exampleText');
        expect(store.getters.date).to.equal('exampleDate');
    });

    it ('Set new juice', () => {
        // arrange
        const newJuice = true;
        // act
        store.dispatch('setNewJuice', newJuice);
        // assert
        expect(store.getters.newJuice).to.be.true;
    });

    it ('Set delete message', () => {
        // arrange
        const deleteMsg = true;
        // act
        store.dispatch('setDeleteMsg', deleteMsg);
        // assert
        expect(store.getters.deleteMsg).to.be.true;
    });

    it ('Set juice page', () => {
        // arrange
        const juicePage = true;
        // act
        store.dispatch('setJuicePage', juicePage);
        // assert
        expect(store.getters.juicePage).to.be.true;
    });

    it('Set juices', () => {
        // arrange
        const juices = [
            {
                userName: 'exampleUser',
                text: 'exampleText',
                date: 'exampleDate',
                _id: '',
                likes: [],
            },
            {
                userName: 'exampleUser2',
                text: 'exampleText2',
                date: 'exampleDate2',
                _id: '',
                likes: [],
            }
        ]
        // act
        store.dispatch('setJuices', juices);
        // assert
        expect(store.getters.juices).to.be.deep.equal(juices);
    });

    it ('Set liked page', () => {
        // arrange
        const likedPage = true;
        // act
        store.dispatch('setLikedPage', likedPage);
        // assert
        expect(store.getters.likedPage).to.be.true;
    });

    it ('Set following page', () => {
        // arrange
        const followingPage = true;
        // act
        store.dispatch('setFollowingPage', followingPage);
        // assert
        expect(store.getters.followingPage).to.be.true;
    });

    it ('Set number of juices', () => {
        // arrange
        const numOfJuices = 2;
        // act
        store.dispatch('setNumberOfJuices', numOfJuices);
        // assert
        expect(store.getters.number_of_juices).to.be.equal(numOfJuices);
    });

    it ('Set juice id', () => {
        // arrange
        const juice_id = '1234';
        // act
        store.dispatch('setJuiceId', juice_id);
        // assert
        expect(store.getters.juice_id).to.be.equal('1234');
    });

    it ('Set likes', () => {
        // arrange
        const likes = ["user1"];
        // act
        store.dispatch('setLikes', likes);
        // assert
        expect(store.getters.likes).to.eql(["user1"]);
    });

    it ('Set user name', () => {
        // arrange
        const name = "user1";
        // act
        store.dispatch('setUserName', name);
        // assert
        expect(store.getters.userName).to.eql("user1");
    });

    it ('Set text', () => {
        // arrange
        const text = "Test text";
        // act
        store.dispatch('setText', text);
        // assert
        expect(store.getters.text).to.eql("Test text");
    });

    it ('Set date', () => {
        // arrange
        const date = "10/10/2010 10:10";
        // act
        store.dispatch('setDate', date);
        // assert
        expect(store.getters.date).to.eql("10/10/2010 10:10");
    });

    it ('Set info', () => {
        // arrange
        const info = {
           userName: "user1",
           text: "Test text",
           date: "10/10/2010 10:10"
        }
        // act
        store.dispatch('setInfo', info);
        // assert
        expect(store.getters.info).to.eql({
            userName: "user1",
            text: "Test text",
            date: "10/10/2010 10:10"
        });
    });

    it ('Set default juice', () => {
        // act
        store.dispatch('setDefaultJuice');
        // assert
        expect(store.getters.userName).to.be.equal('');
        expect(store.getters.text).to.be.equal('');
        expect(store.getters.date).to.be.equal('');
        expect(store.getters.juice_id).to.be.equal('');
        expect(store.getters.likes).to.eql([]);
        expect(store.getters.juices).to.eql([]);
        expect(store.getters.newJuice).to.be.equal(false);
        expect(store.getters.juicePage).to.be.equal(false);
        expect(store.getters.deleteMsg).to.be.equal(false);
        expect(store.getters.likedPage).to.be.equal(false);
        expect(store.getters.number_of_juices).to.be.equal(0);
        expect(store.getters.info).to.be.equal(null);
    });
});