class RegistrationView{
    receicerRegistration: ReceicerRegistration | undefined;
}

export interface UserCreate {
    "id": string;
    "username": string;
}



export interface UserRegistrationViews{
    "email": "",
    "username": "",
    "password": "",
    "first_name": "",
    "last_name": ""
}

export interface SenderRegistration{
    "status": string;
}

export interface SenderKey{
    "status": string;
}

export interface ReceicerRegistration{
    "status": string;
}

export interface EmailVerificationAtRegistaration {
    "status": string;
    "otp": string;
}

export interface SmsVerificationAtRegistaration {
    "status": string;
    "otp": string;
}

export interface FileDownload {
    "path": string;
}

