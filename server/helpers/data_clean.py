import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import csv
import os
import uuid

#os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "~/documents/keys/ur-firebase.json"
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app()

db = firestore.client()

csv_toread = "san_jose.csv"
csv_reader = csv.DictReader(open(csv_toread, encoding='utf-8'))
collection = {}

for row in csv_reader:
    data = {}
    data = dict(row)
    collection[data['Name']] = data

# test batch upload
# import all data (batch)

batch = db.batch()
refs = []
for i in collection:
    data = collection[i]
    data_ref = db.collection('san_jose').document(str(uuid.uuid4()))
    batch.set(data_ref, data)

batch.commit()
