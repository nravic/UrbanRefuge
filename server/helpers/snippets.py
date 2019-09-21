# Code snippets for Urban Refuge data cleanup
import csv
def latlong_split(csv_toread):
    csv_reader = csv.DictReader(open(csv_toread, encoding='utf-8'))
