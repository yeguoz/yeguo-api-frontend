
export default function isEmailVerifyData(obj: any): obj is API.UserEmailRegisterLoginParams {
  return (  
    typeof obj === 'object' &&  
    obj !== null &&  
    'email' in obj && typeof obj.email === 'string' &&  
    'verifyCode' in obj && typeof obj.verifyCode === 'string'  
  );  
}