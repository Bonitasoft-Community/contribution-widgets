#Description

This is the Auto complete input text widget. 

This widget takes a list of suggested value in input. Then the user will have suggested value while typing in the input text field.

#Usage

Provide the list of available values following one of this format:
* A comma-separated list: "London, Paris, San Francisco". In that case, the displayed key and returned key has to be remain empty. 
* An array of object: "[{"id": "1", "label": "London"}, {"id": "2", "label": "Paris"}, {"id": "3", "label": "San Francisco"}]". In that case, the displayed key and returned key has to be provided. 

The selected value will be stored in the variable mapped to the attribute Value.

#Screenshot

![Exemple](/src/widgets/customAutoCompleteInput/images/img.png?raw=true "Exemple")
