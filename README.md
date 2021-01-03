# ALPHA Bank - Online Banking System

**This repository is 1 out of 4 repositories that work together to create a full online banking system. Read more to understand the project architecture**

## To get started

1. Clone all 4 repositories below in a directory:
    1. [Management Server](https://github.com/aalmusaw/BankingSystemMgmtServer)
    1. [Authentication Server](https://github.com/aalmusaw/BankingSystemAuthServer)
    1. [Customer Banking Server](https://github.com/aalmusaw/BankingSystemCustomerServer)
    1. [Angular (Frontend) Application](https://github.com/aalmusaw/BankingSystemFrontend)
1. Create a MongoDB **database** with the following initially-empty **collections**:
    1. `account_num`
    1. `customer`
    1. `merchant`
    1. `refreshToken`
    1. `user`
1. Install NodeJS from [here](https://nodejs.org/en/download/) if you have not already.
1. In the first 3, navigate to the local repositories and run `npm install` so that node package manager installs the dependencies.
1. Populate the .env files with values:
    1. `DB_CONNECTION_URI=` where the right-hand side is the URI of the database that stores your application collections.
    1. `ACCESS_TOKEN_SECRET=` where the right-hand side is a very secure key (please generate it randomly and make sure it is large). *This **MUST** be the same across all backend repositories.*
    1. `REFRESH_TOKEN_SECRET=` same as above.
1. Install angular if you have not. Details are [here](https://angular.io/guide/setup-local).
1. Register the first customer, set them up with a banking account, then give them login credentials:
    1. Run the management server by navigating to the local repository and running `npm run devStart`.
    1. Use VSCode's [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or [Postman's REST client](https://www.postman.com/product/rest-client/) to make API requests.
    1. Refer to the file **client.rest** in the local repositories for examples on how to make the above requests.
1. Run the customer and authentication servers by spawning instances of terminals/cmd and running `npm run devStart`.
1. Finally, run the fontend application by navigating to the angular app and running `ng serve --open`.
1. Log in with the credentials you registered using the management server. 
1. Using the frontend UI, you may reset your password, pay bills, transfer to other customers using email, and review your transaction history.
 
 
## Architecture
The overall architecture of the banking system for the hypothetical company, ALPHA, is illustrated by the following diagram.

[![arch.png](https://i.postimg.cc/SxLTPmWs/arch.png)](https://postimg.cc/K1zDkSpS)


Here, we are using a microservices architecture whereby we use three RESTful-like backend servers, one database server, and a client.



