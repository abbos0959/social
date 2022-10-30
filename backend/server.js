const app = require("./middleware/app");
require("dotenv").config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`SERVER ISHLADI ${PORT}`.blue.bold);
});
