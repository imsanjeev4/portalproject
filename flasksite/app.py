import flask
from flask import Flask,request,session,url_for,redirect
from flask import render_template
app = Flask(__name__)
import modules,json
from flask import jsonify
import modules
import sys
sys.path.append('/root/flasksite/modules/')
import db_connect
#from modules import db_connect
app.secret_key = 'F12Zr47j\3yX R~X@H!jmM]Lwf/,?KT'

@app.route('/')
def index():
    #sumSessionCounter()
    return render_template("index.html")
   # msg1 = {"msg":'hi sanjeev'}
   # return render_template("internal.html",msg=msg1)

@app.route('/hma/portal/Signin/',methods=['GET', 'POST'])
def Signin():
    email = str(request.form.get('email'))
    #-------Set Session value------	
    session['name'] = email	
    password = str(request.form.get('password'))
    status = modules.Signin(email,password)
    #return render_template('login.html')
    return flask.Response(json.dumps(status), mimetype="application/json")

#def services('/sanjeev/offc1/services/', methods=['GET','POST']):
#	service = str(request.form.get('val'))

@app.route('/hma/portal/register/',methods=['GET', 'POST'])
def register():
    first = str(request.form.get('firstname'))
    last = str(request.form.get('lastname'))
    email = str(request.form.get('email'))
    password = str(request.form.get('password'))
    status = modules.register(first,last,email,password)
    return flask.Response(json.dumps(status), mimetype="application/json")

@app.route('/internal.html')
def home():
    #sumSessionCounter()
    #-------Get Session value------	
    session_get=session.get('name')
    if session_get == None:
    	return render_template("index.html")
    else:	
    	msg1 = [{"msg":'hi','msg_val':'sanjeev'}]
    	#msg1 = ['msg','hi','msg_val','sanjeev']
    	#return render_template("internal.html",msg=msg1)
    	return render_template("internal.html",msg=msg1,session_val=session_get)

@app.route('/logout')
def logout():
   # remove the name from the session if it is there
   session.pop('name', None)
   return redirect(url_for('index'))

@app.route('/hma/portal/services/')
def services():
    username = flask.request.args.get('username')
    values = flask.request.args.get('services')
    print '111111111'+str(values)
    if services is None:
        return flask.abort(404, "Usage /hma/portal/sevices/")
    service_list = values.split(",") # change string in list of checkbox values
    print '2222'+str(service_list)
    status = modules.services(username,values)

    return flask.Response(json.dumps(status), mimetype='application/json')
@app.route('/tab-page.html')
def tab():
    #sumSessionCounter()
    return render_template("tab-page.html")

if __name__ == '__main__':
    app.run()
