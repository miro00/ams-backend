const express = require("express");
const db = require("./models/db/connection");

const app = express();

const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  req.db = db
  next()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const incidentsRouter = require('./routes/incidents')

app.use("/api/incidents", incidentsRouter)

// app.get("/api/incident", (req, res) => {
//   const sql = `SELECT * FROM incident
//     LEFT JOIN clients ON incident.clients_id = clients.id_client
//     LIMIT 50
//   `;
//   db.query(sql, (err, result) => {
//     res.send(result);
//   });
// });

app.get("/api/sorting", (req, res) => {
  const sql = "SELECT * FROM sorting";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.get("/api/incident/sort?", (req, res) => {
  const keyAPI = Object.keys(req.query)[0];
  const queryAPI = Object.values(req.query)[0];
  const sql = `
    SELECT * FROM sorting 
    WHERE sorting_url = '${keyAPI}'
  `;
  db.query(sql, (err) => {
    if (err) return res.send(err);
    // if (err) return res.sendStatus(404)
    db.query(
      `
      SELECT incident.*,
      ${keyAPI}.*
      FROM incident
      LEFT JOIN ${keyAPI} ON ${keyAPI}.id_${keyAPI.slice(0, -1)} = ${queryAPI}
      WHERE incident.${keyAPI}_id = ${queryAPI}
    `, (err, result) => {
        if (err) return console.error(err)
        res.send(result);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`✔ Сервер запущен на порту: ${port}`);
});
