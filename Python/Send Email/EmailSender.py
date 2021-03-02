from Google import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class EmailSender():
    def __init__(self,uid,pno,sub,rec,msg,otp):
        self.number = pno
        self.subject = sub
        self.receiver = rec
        self.masseage = msg
        self.otp = otp
        self.id = uid

    def sendingEmail(self):
                    
        CLIENT_SECRET_FILE = 'client_secret.json'
        API_NAME = 'gmail'
        API_VERSION = 'v1'
        SCOPES = ['https://mail.google.com/']


        # print(self.number) 
        # print(self.subject) 
        # print(self.receiver) 
        # print(self.masseage) 
        # print(self.otp)
        # print(self.id)

        service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

        emailMsg = 'Hello User .'+str(self.id)+'.\n'+str(self.masseage)+'.\t'+str(self.otp)+'.\n\n we can also Contact you on   .'+str(self.number)
        mimeMessage = MIMEMultipart()
        mimeMessage['to'] = str(self.receiver)
        mimeMessage['subject'] = str(self.subject)
        mimeMessage.attach(MIMEText(emailMsg, 'plain'))
        raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()

        message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()
    
    # if __name__ == '__main__':
    #     sendingEmail()

obj = EmailSender(1452143,9422997018,"Doc.Card Verification process","doc.card.royal.vision@gmail.com","Your OTP is",0000)
obj.sendingEmail()