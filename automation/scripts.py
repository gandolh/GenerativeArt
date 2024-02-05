import os
import json

# rename the static assets to an format that can be used in the web
def replace(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files + dirs:
            # Replace spaces with underscores in the file/directory name
            new_name = file.replace(' ', '_').lower()
            new_name = new_name.replace('_-_', '_')
            
            old_path = os.path.join(root, file)
            new_path = os.path.join(root, new_name)

            os.rename(old_path, new_path)
            # print(f'Renamed: {old_path} -> {new_path}')


# create json for the structure of animations (first layer of subdirectories 
# are the categories, second layer are the animations)
def create_directory_structure_dict(folder_path):
    structure_dict = {}

    # Iterate through all directories in the specified folder
    for root, dirs, files in os.walk(folder_path):
        current_dir = os.path.relpath(root, folder_path)
        if current_dir == '.':
            continue
        # Split the relative path into a list of directory names
        dir_names = current_dir.split(os.path.sep)

        # Only consider the first layer of directories
        first_layer_dir = dir_names[0]

        # Check if the first layer directory is not in the structure_dict
        if first_layer_dir not in structure_dict:
            # Add the first layer directory to the dictionary with an empty list for subdirectories
            structure_dict[first_layer_dir] = []

        # Iterate through the second layer of directories and append them to the list
        for second_layer_dir in dir_names[1:]:
            structure_dict[first_layer_dir].append({'name': second_layer_dir, 'path': os.path.join(current_dir)})

    return structure_dict



if __name__ == "__main__":
    # Specify the folder path here
    folder_path = 'D:\projects\my_github\Random_Casualtiess_Portfolio\GenerativeArt'
    # do renaming
    # replace(folder_path)

    #get animations json
    json_string = json.dumps(create_directory_structure_dict(folder_path), indent=2)
    with open("./animations.json", 'w') as json_file:
        json_file.write(json_string)