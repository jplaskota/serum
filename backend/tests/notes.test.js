import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index.js";
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
      { title: "be_test_note_1", content: "content_to_note_1" },
      { title: "be_test_note_2", content: "content_to_note_2" },
    ]);
  });

  // Run this function after each test case
  afterEach(async () => {
    // Delete all test data from the database
    const filter = {
      $or: [
        { title: "be_test_note_1", content: "content_to_note_1" },
        { title: "be_test_note_2", content: "content_to_note_2" },
      ],
    };

    await Note.deleteMany(filter);
  });

  describe("GET /notes", () => {
    it("should return all notes", async () => {
      const res = await notes.get("/notes");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

    it("should return a single note by ID", async () => {
      const existingNote = await Note.findOne();
      const res = await notes.get(`/notes/id/${existingNote._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("title", existingNote.title);
    });

    it("should return a single note by text", async () => {
      const existingNote = await Note.findOne();
      const res = await notes.get(`/notes/text/${existingNote.title}`);
      expect(res.status).to.equal(200);
      const hasExpectedTitle = res.body.some(
        (note) => note.title === existingNote.title
      );
      expect(hasExpectedTitle).to.be.true;
    });

    it("should return a 404 error for a non-existent note ID", async () => {
      const nonExistentId = "nonExistentId";
      const res = await notes.get(`/notes/id/${nonExistentId}`);
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should create a new note", async () => {
      const newNoteData = { title: "New Note", content: "New Content" };
      const res = await notes.post("/notes").send(newNoteData);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("title", newNoteData.title);
      expect(res.body).to.have.property("content", newNoteData.content);
    });

    it("should return a 400 error for invalid data", async () => {
      const invalidNoteData = { title: "", content: "" };
      const res = await notes.post("/notes").send(invalidNoteData);
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
      const res = await notes
        .put(`/notes/${existingNote._id}`)
        .send(updatedNoteData);
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
      const res = await notes
        .put(`/notes/${nonExistentId}`)
        .send(updatedNoteData);
      expect(res.status).to.equal(404);
    });

    it("should return a 400 error for invalid data", async () => {
      const existingNote = await Note.findOne();
      const invalidNoteData = { title: "", content: "" };
      const res = await notes
        .put(`/notes/${existingNote._id}`)
        .send(invalidNoteData);
      expect(res.status).to.equal(400);
    });
  });

  describe("DELETE /notes/:id", () => {
    it("should delete a note by ID", async () => {
      const existingNote = await Note.findOne();
      const res = await notes.delete(`/notes/${existingNote._id}`);
      expect(res.status).to.equal(204);
      const deletedNote = await Note.findById(existingNote._id);
      expect(deletedNote).to.be.null;
    });

    it("should return a 404 error for a non-existent note ID", async () => {
      const nonExistentId = "nonExistentId";
      const res = await notes.delete(`/notes${nonExistentId}`);
      expect(res.status).to.equal(404);
    });
  });
});

// TODO Bun tests
