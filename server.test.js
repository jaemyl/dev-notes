const fetch = require("node-fetch")

describe("server", () => {
  it("POST /save Goe's birthday", async () => {
    const note = {
      date: "2004-10-12",
      entry: "Geo's birth moment"
    };
    const response = await fetch("http://localhost:3000/save", {
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(note)
    });
    const json = await response.json();
    expect(json.ok).toBe(1);
  });

  it("POST /save Jaimie's birthday", async () => {
    const note = {
      date: "2001-12-15",
      entry: "Jaimie's birth moment"
    };
    const response = await fetch("http://localhost:3000/save", {
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(note)
    });
    const json = await response.json();
    expect(json.ok).toBe(1);
  });

  it("GET /load/2004-10-12", async () => {
    const response = await fetch("http://localhost:3000/load/2004-10-12");
    const note = await response.json();
    expect(note.date).toEqual("2004-10-12");
  });

  it("GET /load/2001-12-15", async () => {
    const response = await fetch("http://localhost:3000/load/2001-12-15");
    const note = await response.json();
    expect(note.date).toEqual("2001-12-15");
  });

  it("GET /loadAll", async () => {
    const response = await fetch("http://localhost:3000/loadAll");
    const notes = await response.json();
    expect(notes).toHaveLength(2);
  });
});
