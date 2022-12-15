"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const user_1 = require("../src/models/user");
/**
 * Eliminación de todos los usuarios
 */
beforeEach(async () => {
    await user_1.User.deleteMany();
});
/**
 *
 */
describe('POST /notes', () => {
    it('Should successfully insert a new note', async () => {
        await request(user_1.User).post('/notes').send({
            title: "Note",
            body: "This is a note",
            color: "red",
        }).expect(201);
    });
});
