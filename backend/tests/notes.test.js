import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import Note from "../src/models/notes.model.js";

chai.use(chaiHttp);
const expect = chai.expect;

// Create a Chai HTTP request object and keep it open for reuse
const notes = chai.request(app).keepOpen();

describe("Notes API", () => {
  // Run this function before each test case
  beforeEach(async () => {
    // Insert test data into the database
    await Note.insertMany([
      { title: "Note 1", content: "Content 1" },
      { title: "Note 2", content: "Content 2" },
    ]);
  });

  // Run this function after each test case
  afterEach(async () => {
    // Delete all test data from the database
    await Note.deleteMany({});
  });

  // TODO check expect "title" and "content" work properly

  describe("GET /notes", () => {
    it("should return all notes", async () => {
      const res = await notes.get("/");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(2);
    });

    it("should return a single note by ID", async () => {
      const existingNote = await Note.findOne();
      const res = await notes.get(`/${existingNote._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("title", existingNote.title);
    });

    it("should return a 404 error for a non-existent note ID", async () => {
      const nonExistentId = "nonExistentId";
      const res = await notes.get(`/${nonExistentId}`);
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should create a new note", async () => {
      const newNoteData = { title: "New Note", content: "New Content" };
      const res = await notes.post("/").send(newNoteData);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("title", newNoteData.title);
      expect(res.body).to.have.property("content", newNoteData.content);
    });

    it("should return a 400 error for invalid data", async () => {
      const invalidNoteData = { title: "", content: "" };
      const res = await notes.post("/").send(invalidNoteData);
      expect(res.status).to.equal(400);
    });
  });

  describe("PUT /:id", () => {
    it("should update a note by ID", async () => {
      const existingNote = await Note.findOne();
      const updatedNoteData = {
        title: "Updated Title",
        content: "Updated Content",
      };
      const res = await notes.put(`/${existingNote._id}`).send(updatedNoteData);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("title", updatedNoteData.title);
      expect(res.body).to.have.property("content", updatedNoteData.content);
    });

    it("should return a 404 error for a non-existent note ID", async () => {
      const nonExistentId = "nonExistentId";
      const updatedNoteData = {
        title: "Updated Title",
        content: "Updated Content",
      };
      const res = await notes.put(`/${nonExistentId}`).send(updatedNoteData);
      expect(res.status).to.equal(404);
    });

    it("should return a 400 error for invalid data", async () => {
      const existingNote = await Note.findOne();
      const invalidNoteData = { title: "", content: "" };
      const res = await notes.put(`/${existingNote._id}`).send(invalidNoteData);
      expect(res.status).to.equal(400);
    });
  });

  describe("DELETE /notes/:id", () => {
    it("should delete a note by ID", async () => {
      const existingNote = await Note.findOne();
      const res = await notes.delete(`/${existingNote._id}`);
      expect(res.status).to.equal(204);
      const deletedNote = await Note.findById(existingNote._id);
      expect(deletedNote).to.be.null;
    });

    it("should return a 404 error for a non-existent note ID", async () => {
      const nonExistentId = "nonExistentId";
      const res = await notes.delete(`/${nonExistentId}`);
      expect(res.status).to.equal(404);
    });
  });
});
