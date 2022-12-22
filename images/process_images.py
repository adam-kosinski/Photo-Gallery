import os
import exifread
import json
from PIL import Image, ImageOps

names = []
dates = []

for i, filename in enumerate(os.listdir()):
    if not(filename.endswith(".jpg") or filename.endswith(".jpeg")):
        continue

    exif = exifread.process_file(open(filename, "rb"))
    original_date = str(exif['EXIF DateTimeOriginal'])
    date_string = original_date.split()[0].replace(":","-")

    n_same_date = dates.count(date_string)
    dates.append(date_string)

    if n_same_date > 0:
        date_string += "_" + str(n_same_date)

    new_name = date_string + ".jpg"

    os.rename(filename, new_name)
    names.append(new_name)

    print("Rename:", i, filename, new_name)


    # # add resized version to the small/ directory if it isn't already there
    # # TODO figure out how not to make the image look super ugly in the process
    # if not filename in os.listdir("small"):
    #     print("Creating small version for", filename)
    #     img = Image.open(filename)
    #     small_img = img.copy()
    #     small_img = ImageOps.exif_transpose(small_img) # keep correct rotation
    #     small_img = small_img.resize((375,500))
    #     small_img.save("small/" + filename)


filenames_file = open("filenames.js", "w")
filenames_file.write("let filenames = ")
filenames_file.write(json.dumps(names))