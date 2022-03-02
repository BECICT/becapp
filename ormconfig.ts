import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// const config: PostgresConnectionOptions  = {
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "postgres",
//     "password": "!pass4sure",
//     "database": "becdb",
//     "entities": ["dist/**/*.entity{.ts,.js}"],
//     "synchronize": true
//   }


  const config: PostgresConnectionOptions  = {
    "type": "postgres",
    "host": "ec2-107-20-153-39.compute-1.amazonaws.com",
    "port": 5432,
    "username": "aqhriwzpitrdse",
    "password": "9522e990cf3efe039ab0fc3c642359090f283c09530f3cef4db0429af2fd886b",
    "database": "d2ua3vsvk3m0o7",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": false,
    ssl: {
      rejectUnauthorized: false,
  }
  }

  export default config