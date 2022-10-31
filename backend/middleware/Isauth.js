const jwt = require("jsonwebtoken");
const userModel = require("../model/User");
const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");

//token bor yoki  yo'qligini tekshirish
exports.Isauthentication = catchErrorAsync(async (req, res, next) => {
   const { token } = req.cookies;

   if (!token) {
      return next(new AppError("Iltimos avval Ro`yhatdan o`ting", 401));
   }
   const decodeData = jwt.verify(token, "secret");

   if (!decodeData) {
      return next(new AppError("bunday IDli user mavjud emas", 401));
   }
   req.user = await userModel.findById(decodeData.id);

   next();
});

// role bo`yicha kirish
exports.authoriseRoles = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return next(new AppError(`Bunday role mavjud emas`, 403));
      }
      next();
   };
};
