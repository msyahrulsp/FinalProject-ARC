const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "inipassword",
    database: "wikidatabase",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM wiki;";

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const content_title = req.body.content_title;
    const content = req.body.content;
    const last_updated = req.body.last_updated;

    const sqlInsert = "INSERT INTO wiki (content_title, content, last_updated) VALUES (?, ?, ?);";
    db.query(sqlInsert, [content_title, content, last_updated], (err, result) => {
        if (err) console.log(err);
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM wiki WHERE id = ?;";

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const last_updated = req.body.last_updated;
    const sqlUpdate = "UPDATE wiki SET content = ?, last_updated = ? WHERE id = ?;";

    db.query(sqlUpdate, [content, last_updated, id], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});