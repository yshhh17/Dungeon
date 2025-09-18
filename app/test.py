from app.auth import hash_password, verify_password
hashed = hash_password("mypasswoed")
print(verify_password("mypasswoed", hashed))
