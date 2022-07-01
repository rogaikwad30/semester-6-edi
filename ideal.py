import pymongo
import datetime
import time

mongo_cli = pymongo.MongoClient("mongodb+srv://rohan123:rohan123@cluster0.pfqusy7.mongodb.net/?retryWrites=true&w=majority")


db = mongo_cli.test
# result_coll = "ideal_data"

import xlrd
 
loc = ("./xyz.xlsx")
 
wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
sheet.cell_value(0, 0)
totalRows = sheet.nrows
for i in range (2,totalRows):
    li = sheet.row_values(i)
    steps = li[0]
    t = li[1]
    x = li[2]
    y = li[3]
    z = li[4]

    db["ideal_datas"].insert_one({
        "x" : x,
        "y" : y,
        "z" : z,
        "steps" : steps,
        "LogTime_EP" :t
    })

    print(x,y,z)