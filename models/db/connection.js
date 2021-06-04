const dbConfig = require("../../config/db.config");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

db.connect((err) => {
  if (err)
    return console.error(`❌ Ошибка подключения к базе: \n${err.message}`);

  console.log(`✔ Подключение к серверу MySQL успешно установлено`);
});

module.exports = db;
