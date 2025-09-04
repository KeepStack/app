class User:
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = password

#TODO: Add validation methods 
    def _validate_email(self):
        """ Validate email format """
        pass

    def _validate_password(self):
        """ Validate password strength """
        pass