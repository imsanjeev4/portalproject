import datetime
import delorean
dt= datetime.dateime.now()
d1=delorean.Delorean(dt,timezone='US/Pacific')
d1.shift('UTC').datetime()

