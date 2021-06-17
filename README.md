+ FMC API Client 

Package for connecting to a Cisco FMC and managing it using the API endpoints it has available.

+  Installation

`npm install fmcapi --save'

+  Description

The client requires a .env file in the root of the main application. It expects 3 config items to be present.

```
FMC_HOST=_1.1.1.1_
FMC_USER=_username_
FMC_PASS=_password_
```

Please consult the cisco documentation for how to create an API user account on the Firepower Managment Console.
