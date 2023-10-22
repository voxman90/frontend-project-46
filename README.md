### Hexlet tests and linter status:
[![Actions Status](https://github.com/voxman90/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/voxman90/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/4323dafe0d47b940e765/maintainability)](https://codeclimate.com/github/voxman90/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4323dafe0d47b940e765/test_coverage)](https://codeclimate.com/github/voxman90/frontend-project-46/test_coverage)
# Instruction

[![asciicast](https://asciinema.org/a/7SjxF2pvHjUWkWtPe6Ls3eZDU.svg)](https://asciinema.org/a/7SjxF2pvHjUWkWtPe6Ls3eZDU)

  Timecodes: 
-  00:01 - Install the program in the preferred directory with the command ``npm link @hexlet/code``
-  00:10 - The help can be displayed by entering the command ``gendiff -h``
-  00:20 - The programme displays the difference between two JSON files in text format. The programme takes as input two relative or absolute paths to the files whose data is to be compared. Own properties that have different values or do not exist in another object are marked **-** for the first object and **+** for the second object, in other cases it displays the key and value pair.

# Parameters

[![asciicast](https://asciinema.org/a/lRSGdf9udWVxIO5Cxp2SFnczI.svg)](https://asciinema.org/a/lRSGdf9udWVxIO5Cxp2SFnczI)

The programme accepts as input two absolute or relative addresses to a file, as well as an option of selecting a formatter. Supported file formats: yaml, json. Formatter (default): stylish. The result of this formatter can be viewed on asciinema.

# Other formatters: plain

[![asciicast](https://asciinema.org/a/OYav4ezm181tCL653vtS0jrkL.svg)](https://asciinema.org/a/OYav4ezm181tCL653vtS0jrkL)

The programme also allows you to output the difference in a plain format. To do this, use the ``--format`` option with the value ``plain``.

# Other formatters: JSON

[![asciicast](https://asciinema.org/a/OYav4ezm181tCL653vtS0jrkL.svg)](https://asciinema.org/a/OYav4ezm181tCL653vtS0jrkL)

The programme also allows to output the difference in JSON format. To do this, use the ``--format`` option with the value ``json``.
