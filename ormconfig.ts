import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions  = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "!pass4sure",
    "database": "becdb",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
  }

  export default config