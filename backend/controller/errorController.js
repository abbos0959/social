const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 404;

   err.status = err.status || "failedcha";
   err.message = err.message || "not found";

   if (process.env.NODE_ENV === "DEVELOPMENT") {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,

         // error: err,
      });
   } else if (process.env.NODE_ENV === "PRODUCTION") {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
         //   hato: err.stack
      });
   } else if (err.name === "CastError") {
      const message = `bunday id mavjud emas ${err.path}`;

      err = new AppError(message, 400);
   }
   if (err.code === 11000) {
      const message = `dublicat ${Object.keys(err.keyValue)} entered`;
      err = new AppError(message, 404);
   }

   next();
};
