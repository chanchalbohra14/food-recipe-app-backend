import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const myDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSEURI);
    console.log("process env", process.env.MONGOOSEURI);
    console.log(
      `mongobd connection ,${conn.connection.host}/${process.env.MONGOOSEURI}`
    );
  } catch (error) {
    process.exit(1);
  }
};
export default myDb;
