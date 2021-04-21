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
    "usertype": string,
    "otp": string,
    "email": string,
    "detail": string,
    "name": string

}

export interface  HistFileList{
"name": string,
"date": string,
"time": string,
"action": string,
"performed": string
}

export interface  CardImg{
    "front_side": string,
    "back_side": string

}

export interface  NotifyCount{
    "count": string

}

export interface  NotifyList{
    "name": string,
    "date": string,
    "time" : string,
    "path": string,
    "from" : string
}

export interface  FileToReceiver{
    "status": string;
}

export interface GetDocFromUser {
    "otp": string
}
