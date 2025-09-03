import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials

import os
import smtplib

s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login("your_email_here", "app_password_here") # Change this to your email and app password
# Initialize Firebase

cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))
firebase_admin.initialize_app(cred)

class AuthService:
    def __init__(self, email, password):
        self.email = email
        self.password = password


    def register_user(self):
        try:
            # Register the user in Firebase Authentication
            user = auth.create_user(
                email=self.email,
                password=self.password
            )        

            # Send email verification
            verification_link = auth.generate_email_verification_link(user.email)   

            body = f"""
            Hello,

            Please click the link below to verify your email: 

            {verification_link}

            If you didn't request this, please ignore this email.

            Best regards,  

            The Memorable Team
            """    
            print(body)
            subject = 'Email Verification'
            mailtext='Subject:'+subject+'\n\n'+body
            s.sendmail("your_email_here", user.email, mailtext)

            return {"message": "User registered successfully", "email": user.email}
        except Exception as e:
            return {"error": "Registration failed: " + str(e)}


    def login_user(self):
        try:
            # Attempt to retrieve the user from Firebase Authentication
            user = auth.get_user_by_email(self.email)

            if not user.email_verified:
                return {"error": "Email not verified."}
            
            return {"message": "Login successful", "email": user.email}
    
        except auth.UserNotFoundError:
            return {"error": "User not found"}
        except Exception as e:
            return {"error": "Login failed: " + str(e)}