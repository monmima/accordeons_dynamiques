import os
 
'''
    For the given path, get the List of all files in the directory tree
    Code source: https://thispointer.com/python-how-to-get-list-of-files-in-directory-and-sub-directories/
    dirName = 'depot'; c'est l'endroit ou sont déposés les fichiers du site interne; si le nom du dossier est changé, il faut changer aussi la référence a son nom dans le présent fichier
'''
def getListOfFiles(dirName):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        else:
            allFiles.append(fullPath)

    allFiles.sort() # pour que tout soit dans l'ordre, même sous Linux
    return allFiles        
 
 
def main():
    
    dirName = 'depot'
    
    # Get the list of all files in directory tree at given path
    listOfFiles = getListOfFiles(dirName)

    # Open the .js file
    f = open("liste.js", "w")
    f.write("listeDeFichiers =  [\n")

    
    # Print the names of the files
    for elem in listOfFiles:
        elem = elem.replace("depot\\", "") # chemin Windows
        elem = elem.replace("depot/", "") # chemin Linux
        elem = elem.replace("\\", "/")

        if not elem.endswith(("Thumbs.db")):
            print(elem)
            f.write('    "' + elem + '"' + ",\n")
    
    # Close the file
    f.write("];")
    f.close()
 
    print ("****************")
    
    # # Get the list of all files in directory tree at given path
    # listOfFiles = list()
    # for (dirpath, dirnames, filenames) in os.walk(dirName):
    #     listOfFiles += [os.path.join(dirpath, file) for file in filenames]

        
        
    # # Print the files    
    # for elem in listOfFiles:
    #     print(elem)    
        
if __name__ == '__main__':
    main()

