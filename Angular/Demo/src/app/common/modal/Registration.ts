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

export interface FileUpload {
    "status": string;
}


export interface outSideAuthToken {
    "token": string;
}

export interface EmailToUsername {
    "username": string;
}

export interface Login {
    "refresh": string,
    "access": string,
    "username": string,
    "usertype": string

}

export interface  HistFileList{
"name": string,
"date": string,
"time": string,
"action": string,
"performed": string
}