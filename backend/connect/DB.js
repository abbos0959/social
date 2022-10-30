const mongoose = require("mongoose");

const DB = async (req, res) => {
   try {
      await mongoose.connect(
         "mongodb+srv://Social:aUEWSHvvgdrDSw0a@cluster0.hmgeqnp.mongodb.net/Social?retryWrites=true&w=majority"
      );
      console.log("mongodb ulandi".yellow.bold.underline);
   } catch (error) {
      console.log("mongodb ulanmadi".red.bold, error);
      console.log(process.env.URL);
   }
};

module.exports = DB;
