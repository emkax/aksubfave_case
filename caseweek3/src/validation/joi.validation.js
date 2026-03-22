import Joi from "joi";

class InputValidation{
    static userRegistrationValidator(body){
        const userRegitrationSchema = Joi.object({
            username:Joi.string().required(),
            email:Joi.string().email({ tlds: { allow: false } }).required(),
            password:Joi.string()
                .pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
                .message({
                    'string.pattern.base' : 'Password must contain atleast 1 capital number and 1 number'
                }).required(),
            dateOfBirth:Joi.date().required()
        })
        const {error,value} = userRegitrationSchema.validate(body,{abortEarly: false});

        if (error){
            throw new Error(`Registration validation failed: ${error.details[0].message}`);
        }else{
            return value;
        }
    } 
    static userLoginValidator(body){
        const userLoginSchema = Joi.object({
            email:Joi.string().email({ tlds: { allow: false } }).required(),
            password:Joi.string().required()
        })
        
        const {error,value} = userLoginSchema.validate(body,{abortEarly: false});

        if (error){
            throw new Error(`Login validation failed: ${error.details[0].message}`);
        }else{
            return value;
        }
    }
}

export default InputValidation;