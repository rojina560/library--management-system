import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

const PORT = config.port;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected To Mongodb Using Mongoose!");

    server = app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();