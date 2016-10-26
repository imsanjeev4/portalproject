from azure import *
from azure.servicemanagement import *


#def azure_sbs(subscription_id,certificate_path):

	#subscription_id = '1ff7ccc1-0974-4685-92ab-b564dffcb1c1'
	#certificate_path = '/dat/portalproject/flasksite/mycert.pem'
#	sms = ServiceManagementService(subscription_id, certificate_path)
#	return sms
#call = azure_sbs('1ff7ccc1-0974-4685-92ab-b564dffcb1c1','/data/portalproject/flasksite/mycert.pem')
#print call
#result = sms.list_locations()
#for location in result:
#    print(location.name)

#-----Location get ------------------
def azure_location(subscription_id,certificate_path):
	try:
		sms = ServiceManagementService(subscription_id, certificate_path)
		result = sms.list_locations()
		location_list = []
		for location in result:
			location_name = location.name
			location_list.append(location_name)
		return location_list
	except Exception as e:
		print(e)


	
#call = azure_location('1ff7ccc1-0974-4685-92ab-b564dffcb1c1','/data/portalproject/flasksite/mycert.pem')
#call = azure_location()
#print call

#-----------------End--------------------	

#-------------Create Cloud Services -------------------
def create_cloud_services(subscription_id,certificate_path,name,label,desc,location):
#def create_cloud_services(subscription_id,certificate_path):
	try:
		sms = ServiceManagementService(subscription_id, certificate_path)
		print name,label,desc,location
		#name = 'sanjeevmyhost'
		#label = 'sanjeevlabel'
		#desc = 'myservices'
		#location = 'Central US'
		create = sms.create_hosted_service(name, label, desc, location)
		return create
	except Exception as e:
		print(e)
	
#create_val = create_cloud_services('1ff7ccc1-0974-4685-92ab-b564dffcb1c1','/data/portalproject/flasksite/mycert.pem')
create_val = create_cloud_services('1ff7ccc1-0974-4685-92ab-b564dffcb1c1','/data/portalproject/flasksite/mycert.pem','hanservice','hannuhost','mydesc','West US')

print create_val

#--------------------End-------------------------------

