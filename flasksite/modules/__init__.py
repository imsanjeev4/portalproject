import modules
import sys
sys.path.append('/root/flasksite/modules/')
import db_connect
import hashlib
def register(first,last,email,password):
	enct_password = hashlib.md5(password).hexdigest()
	sql_check = """select email from register where email = '"""+email+"""';"""
	db_connect.cursor.execute(sql_check)
	db_count = db_connect.cursor.rowcount
	if db_count == 0:
		if(first and last and email and password !=''):
			sql = """INSERT INTO register(firstname,lastname,email,password)VALUES ('"""+first+"""','"""+last+"""','"""+email+"""','"""+enct_password+"""');"""
			db_connect.cursor.execute(sql)
			db_connect.db.commit()
			status ={'status':'true','msg':"Registration successfully completed !"}
	else:
		status ={'status':'false','msg':"Email already registered.Please use different email"}
	return status
	
def Signin(username,password):
	if(username and password !=''):
		enct_password = hashlib.md5(password).hexdigest()
		sql = """select email, password from register where email = '"""+username+"""' and password = '"""+enct_password+"""';"""
		db_connect.cursor.execute(sql)
		db_count = db_connect.cursor.rowcount
		db_connect.db.commit()
		if db_count > 0:
			status ={'status':'true','msg':"success"}
		else:
			status ={'status':'false','msg':"Invalid username or password"}
	else:
		status ={'status':'false','msg':"Username and password can't be empty"}
	return status

def services(username,services):
	if(username and services !=''):
		sql = """INSERT INTO services(username,services)VALUES ("""+username+""",'"""+services+"""');"""
		db_connect.cursor.execute(sql)
		db_connect.db.commit()
		status ={'status':'true','msg':"Services successfully selected !"}
	else:
		status ={'status':'false','msg':"Error occurred !"}
	return status

def GetInformation(username):
	if(username !=''):
		sql = """ select * from services where username='"""+username+"""';"""
		rows = db_connect.cursor.execute(sql)
		results = db_connect.cursor.fetchall()
		print results[0]
		db_connect.db.commit()

		
