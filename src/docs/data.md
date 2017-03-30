
# Data

In order for data validation and cache to work.
You need to define the ``hash`` of the resources you're using.
These can be obtined using [emp](/).

## Remote resources
If the files are already hosted remotely and you have the URL
you can do:
```
emp data get <URL>
```
This command will download the resource, cache it and print the ``hash``
that you can use to populate your ``dataset`` section on your protocol.

This command also works for directories, however they need to be packaged
as ``.zip`` or ``.tar.gz``

## Local resources
If the file is not yet available remotely, you can get the ``hash`` 
with the following command:
```
emp data hash </path/to/resource>
```
This works both for files and directories.


