import modules
import sys
sys.path.append('/root/flasksite/modules/')
import db_connect
#test = modules.services('saaa')
#test = modules.register('sanjeev','kumar','sanjeev@hanusoftware.com','hanu@123')
test = modules.GetInformation('sanjeev@gmail.com')
print test
