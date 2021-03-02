from Google import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json 
class EmailReader():

    global m
    def receivingEmail():
                    
        CLIENT_SECRET_FILE = 'client_secret.json'
        API_NAME = 'gmail'
        API_VERSION = 'v1'
        SCOPES = ['https://mail.google.com/']

        service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
        f = 0
        while f == 0:
            results = service.users().messages().list(userId='me', labelIds=['INBOX'], q = "is:unread").execute()
            messages = results.get('messages', [])
            if not messages:
                f = 0
            else:
                f = 1
                # print('Messages: ')
                message_count = 0
                for msg in messages:
                    m = service.users().messages().get(userId='me', id = msg['id']).execute()
                    message_count = message_count + 1
                    # print("You have " + str(message_count) + " unread messages. ")
                    email_data = m['payload']['headers']
                    for values in email_data:
                        name = values["name"]
                        # if name == "Subject":
                        #     print("Subject is " + values["value"])
                        if name == "From":
                            from_name = values["value"]
                            if from_name == "doc.card.royal.vision@gmail.com":
                                # print("you have a new msg from   " + from_name + " \n ")
                                data = (m['snippet']).split('.')
                                # print(data)
                                dictionary ={
                                    'flag' : 1,
                                    'id' : data[1],
                                    'otp' : int(str(data[3]).strip()),
                                    'msg' : data[2],
                                    'phoneNo' : int(data[5])
                                }
                                with open("sms.json", "w") as jsonFile:
                                    json.dump(dictionary, jsonFile) 
                                print("\n")
            for message in messages:
                service.users().messages().modify(userId = 'me', id=message['id'], body={'removeLabelIds':['UNREAD']}).execute()
                
            
                    

    
    if __name__ == '__main__':
        receivingEmail()

obj = EmailReader()