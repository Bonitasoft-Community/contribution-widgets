#Description

This is the File Upload widget. 

This widget allows to upload, edit and download files.

#Usage

Map a form variable to the attribute "New File" to store the file uploaded by the widget. This variable will map to File Contract input. 

Map a process document variable to the attribute "Existing file" to provide the existing file. Example: {{context.myDoc_ref}}

Map a form variable to the attribute "Deleted" to store the decision whether or not the current file should be deleted. This variable will map to a Boolean Contract input.

#Screenshot

Widget with no file uploaded:
![Exemple](/src/widgets/customFileUpload/images/img1.png?raw=true "Exemple")

Widget with a file already present:
![Exemple](/src/widgets/customFileUpload/images/img2.png?raw=true "Exemple")