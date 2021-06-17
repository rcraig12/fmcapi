# FMC Client 

Package for connecting to a Cisco Firepower Management Console and managing it using the API endpoints that it has available.

## Installation

`npm install fmcclient --save`

## Description

The client requires a .env file in the root of the main application. It expects 3 config items to be present.

```
FMC_HOST=_1.1.1.1_
FMC_USER=_username_
FMC_PASS=_password_
```

### example so far

Inside a nodejs express application I am using a MVC approach and the controller simply needs the following in order to kick off the client.

```
const fmcclient = require('fmcclient');

fmcclient.CheckAuth();
```

Please consult the cisco documentation for how to create an API user account on the Firepower Managment Console.

- [x] Write the authentication loop
- [ ] Manage objects
- [ ] Manage Groups
- [ ] Manage NAT addresses
- [ ] Manage ACL's

The above tasks are the main focus of this client. I do hope to take it further over time. But for now I have an immediate need to migrate an old Cisco FWSM to a Cisco Firepower Threat Defence firewall.

The above tasks will enable me to migrate the old firewall to the new firewall using a nodejs express application.

I may consider as time goes by to do this also for ASA based firewalls as well.