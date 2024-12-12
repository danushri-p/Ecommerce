
export default class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        Error.captureStackTrace(this);
        this.statusCode=statusCode;
    }
}
module.exports=ErrorHandler;
      
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        Error.captureStackTrace();
        this.statusCode=statusCode;
    }
}
module.exports = ErrorHandler;
