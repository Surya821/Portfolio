import os
import shutil

# Paths
proj_img_path = r"d:\Full_Stack_Projects\personal-portfolio\client\src\assets\ProjImg"

# Projects and their patterns
moves = {
    "Farmlens": ["Farmlens"],
    "Edemy": ["Edemy"],
    "InsiderJobs": ["job-"],
    "QuickChat": ["desktop", "chat", "login", "profile", "signup"],
    "FoodDelivery": ["Fhome", "Fmenu", "Fcontact"],
    "MovieApp": ["Mhome", "Mfavorite", "Msearch"],
    "ECommerce": ["Ehome", "Eproduct", "Ecart"],
    "MLProjects": ["email-classifier", "face_detection", "breast-cancer"]
}

# Ensure folders exist
for folder in moves.keys():
    folder_path = os.path.join(proj_img_path, folder)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

# Move files
files = [f for f in os.listdir(proj_img_path) if os.path.isfile(os.path.join(proj_img_path, f))]

for filename in files:
    if filename == "dummy.txt": continue # ignore dummy files
    
    moved = False
    for folder, patterns in moves.items():
        for pattern in patterns:
            if pattern in filename:
                src = os.path.join(proj_img_path, filename)
                dst = os.path.join(proj_img_path, folder, filename)
                print(f"Moving {filename} to {folder}")
                shutil.move(src, dst)
                moved = True
                break
        if moved: break

# Clean up any dummy files
for folder in moves.keys():
    dummy = os.path.join(proj_img_path, folder, "dummy.txt")
    if os.path.exists(dummy):
        os.remove(dummy)

print("Done organizing project images.")
