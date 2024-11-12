export const checkValidData=(email,password,name)=>{
//for email validation use regex.
 const isEmailValid=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
 const isPasswordValid=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
 const isNameValid=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);


if(!isEmailValid) return "Email ID is not valid";
if(!isPasswordValid) return "Passworde is not valid";
if(!isNameValid) return "Name is not valid";

return null;
};