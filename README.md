# Invoice-manager
Invoice Manger - upload invoice and parse to structure automatically 

Hosted on Heroku [Check it out](https://invoice-management-2021.herokuapp.com/api/v1)
## Feature
- Users can upload invoices, and this application would parse it to sturcuted fromat.
- Users can add tage to processed invoices
## Tech Stack and libraries
- Node.js
- express.js
- mocha
- postgres
- Sequelize
- Swgger

## Authenication
use cookie as authenication strategy. 
## API doc
I hosted api doc via swagger.

Please check [here](https://invoice-management-2021.herokuapp.com/api-docs/)
## Schema Design
TBD

## How to Run
### Prerequisite
- Node v12.18.4
- Postgres
- Linux platform
- yarn
### Step
1. copy `.env.example` to `.env`
2. setup `.env` enviorment variable
3. Run `yarn install`
4. Run `yarn run start`
## Future Work
- [ ] setup redis to save session
- [ ] setup queue to process in the backgroud
- [ ] process the upload stream on the fly, instead of saving in memory first
- [ ] unit test coverage
- [ ] integration with cicle ci
