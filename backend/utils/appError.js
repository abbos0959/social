class AppError extends Error{
  constructor (message,statusCode){
      super (message)
      this.statusCode=statusCode
      this.status=this.statusCode ===404 ?"failed" :"error"

      Error.captureStackTrace(this,this.constructor)
  }
}
module.exports=AppError