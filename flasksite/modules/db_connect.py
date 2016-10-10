import sys
sys.path.append('/root/flasksite/modules/')
import db_connect
import MySQLdb
db = MySQLdb.connect("localhost","root","hanu@123","portal" )
cursor = db.cursor()
# disconnect from server
#db.close()
