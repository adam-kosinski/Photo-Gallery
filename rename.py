import os
import exifread
import json

names = []
dates = []

for i, filename in enumerate(os.listdir()):
    if(not filename.endswith(".jpg")):
        continue

    exif = exifread.process_file(open(filename, "rb"))
    original_date = str(exif['EXIF DateTimeOriginal'])
    date_string = original_date.split()[0].replace(":","-")

    n_same_date = dates.count(date_string)
    dates.append(date_string)

    if(n_same_date > 0):
        date_string += "_" + str(n_same_date)

    new_name = date_string + ".jpg"

    os.rename(filename, new_name)
    names.append(new_name)

    print(i, filename, new_name)

filenames_file = open("filenames.js", "w")
filenames_file.write(json.dumps(names))
