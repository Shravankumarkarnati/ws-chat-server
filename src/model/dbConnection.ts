import mongoose from "mongoose";

export const dbConnect = (url: string) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const dbConnection = mongoose.connection;

  dbConnection.on(
    "error",
    console.error.bind(console, "Database Connection Error: ")
  );

  dbConnection.on("open", () => {
    console.log("Database Connection Success");
  });

  return dbConnection;
};
