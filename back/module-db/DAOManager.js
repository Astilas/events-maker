const pool = require('./config');

class DAOManager {
  constructor(type, Cruds) {
    this.pool = pool;
    this.type = type;

    Object.values(Cruds).forEach((method) => {
      this[method.name] = method;
    });
  }

  async createTableIfNotExist(payload) {
    const query = this.getCreateQuery(payload);
    await this.makeQuery(query);
    if (this.type !== 'rates' && this.type !== 'cryptos' && this.type !== 'instruments') {
      const query2 = this.getCreateIndexQuery(payload);
      await this.makeQuery(query2);
    }
  }

  getCreateQuery(payload) {
    let query;

    switch (this.type) {
      case 'events': {
        query = {
          text: `CREATE TABLE IF NOT EXISTS "events" ( 
            id serial NOT NULL PRIMARY KEY,
            title VARCHAR(60) NOT NULL,
            category VARCHAR(260) NOT NULL,
            date DATE NOT NULL,
            hour VARCHAR(20) NOT NULL,
            unix_time BIGINT NOT NULL,
            description VARCHAR(260) NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
          )`,
        };
        break;
      }
      case 'users': {
        query = {
          text: `CREATE TABLE IF NOT EXISTS "users" (
            id serial NOT NULL PRIMARY KEY,
            username VARCHAR(60) NOT NULL,
            password VARCHAR(60) NOT NULL
          )`,
        };
        break;
      }
      default: {
        throw new Error(`Unknown type: ${this.type}`);
      }
    }
    return query;
  }

  async makeQueries(queries) {
    if (queries.length === 0) {
      return;
    }
    try {
      await this.pool.query(queries[0]);
    } catch (e) {
      this.broker.logger.error(String(e));
    }
    return this.makeQueries(queries.slice(1));
  }

  async makeQuery(query) {
    try {
      await this.pool.query(query);
    } catch (e) {
      this.broker.logger.error(String(e));
    }
  }

  async getQuery(query) {
    try {
      const res = await this.pool.query(query);
      if (res.rowCount) {
        return res.rows;
      }
      return [];
    } catch (e) {
      this.broker.logger.error(String(e));
    }
  }
}

module.exports = DAOManager;
