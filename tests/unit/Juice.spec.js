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

    it ('Set number of juices', () => {
        // arrange
        const numOfJuices = 2;
        // act
        store.dispatch('setNumberOfJuices', numOfJuices);
        // assert
        expect(store.getters.number_of_juices).to.be.equal(numOfJuices);
    });
});