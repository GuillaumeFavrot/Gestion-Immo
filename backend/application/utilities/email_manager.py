#!/bin/python
import os
import smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class Email_manager:

    def create_email(receiver_email: str, email_subject: str, email_body: str, email_attachments: bool) -> MIMEMultipart:
        """Create a email with receipts attachments"""
        
        # Create a multipart message and set headers
        message = MIMEMultipart()
        message["From"] = "dev.mail.python.68@gmail.com"
        message["To"] = receiver_email
        message["Subject"] = email_subject
       
        # Add body to email
        body = email_body
        message.attach(MIMEText(body, "plain"))

        # Add all attachments in the documents output folder
        if email_attachments == True:
            print('Attachements', os.listdir("./documents_output"))
            for file in os.listdir("./documents_output"):
                
                filename = f"./documents_output/{file}"

                with open(filename, "rb") as attachment:
                    part = MIMEBase("application", "octet-stream")
                    part.set_payload(attachment.read())
                encoders.encode_base64(part)

                name = file.replace("_", " ")

                part.add_header(
                    "Content-Disposition",
                    f"attachment; filename= {name}",
                )
                message.attach(part)
    
        return message
    
    
    def send_email(message: MIMEMultipart) -> None:
        """Sends the email"""

        #Checks that the message argument is indeed of MIMEMultipart type
        if type(message) != MIMEMultipart:
            return False

        #Sets the test, port and context variables
        text = message.as_string()
        port = 465
        context = ssl.create_default_context()

        #Logs to the smtp server and sends the Email
        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            ##### Warning remove the code in plain sight and replace it with a call to an env var
            server.login(message['From'], "usdubhvvijmtoefi")
            server.sendmail(message['From'], message["To"], text)


    def clear_documents_output_folder() -> None:
        """Delete all leftover files from the output folder"""

        for file in os.listdir("./documents_output"):
            os.remove(f"./documents_output/{file}")