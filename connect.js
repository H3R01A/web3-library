const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./bookcollection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the items table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY,
          title TEXT,
          description TEXT,
          walletAddress TEXT,
          timestamp DATE,
          likes INTEGER
        )`,
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Created items table.");
  

        // Clear the existing data in the products table
        db.run(`DELETE FROM items`, (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("All rows deleted from items");
  
          // Insert new data into the products table
          const values1 = [
            "Wheel of Time",
            "Book about the dragon",
            "bc1qfaf3rkq3kf9k6mf33g42z93pl57a3l4nfn9gp1",
            `${Date.now()}`,
            0
          ];
          const values2 = [
           "Quantum",
            "Book about quantum computing",
            "bc1qfaf3rkq3kf9k6mf33g42z93pl57a3l4nfn9gp2",
            `${Date.now()}`,
            0
          ];
  
          const values3 = [
            "Halo",
            "History of Master Chief",
            "bc1qfaf3rkq3kf9k6mf33g42z93pl57a3l4nfn9gp3",
            `${Date.now()}`,
            0
          ];
  
          const insertSql = `INSERT INTO items(title, description, walletAddress, timestamp, likes) VALUES(?, ?, ?, ?, ?)`;
  
          db.run(insertSql, values1, function (err) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
          });
  
          db.run(insertSql, values2, function (err) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
          });
  
          db.run(insertSql, values3, function (err) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
          });
  
          //   Close the database connection after all insertions are done
          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log("Closed the database connection.");
          });
        });
      }
    );
  });
