const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const CONNECTION_URL =
  "mongodb://Mihir:Mihir%401234@cluster0-shard-00-00.kvs47.mongodb.net:27017,cluster0-shard-00-01.kvs47.mongodb.net:27017,cluster0-shard-00-02.kvs47.mongodb.net:27017/Timezone?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

let db = mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log(err);
    }
  }
);
