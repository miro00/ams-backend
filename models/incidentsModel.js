module.exports = {
  get: (db, callback) => {
    // Получение всех инцидентов
    db.query(`SELECT * FROM incident`, callback);
  },

  getById: (db, id, callback) => {
    // Получение инцидента по id
    db.query(
      `
      SELECT * FROM incident
      WHERE id_incident = ?
      `,
      [id],
      callback
    );
  },

  create: (db, data, callback) => {
    // Создание инцидента
    db.query(
      `
      INSERT INTO incident SET 
      incident_code = ?,
      clients_id = ?,
      incident_complaint = ?
    `,
      [data.incident_code, data.clients_id, data.incident_complaint],
      callback
    );
  },

  update: (db, data, id, callback) => {
    // Обновление инцидента
    db.query(
      `
      UPDATE incident SET 
      incident_code = ?,
      clients_id = ?,
      incident_complaint = ?,
      WHERE id_incident = ?
      `,
      [data.incident_code, data.clients_id, data.incident_complaint, id],
      callback
    );
  },

  delete: (db, id, callback) => {
    // Удаление инцидента
    db.query(
      `
      DELETE FROM incident
      WHERE id_incident = ?
      `,
      [id],
      callback
    );
  },
};
