# This is the Lowering dapp  

## To run locally

Run `npm i`

In development mode `npm run start`

In production mode `npm run build:serve`

## Wallet Connections

This dapp connects to both

- PolkadotJS browser extension.
- Metamask browser extension.

## Local run

### Run in Development mode

- On one terminal, run `npm run start`
- On another terminal, run `npx json-server --watch data/db.json --port 8000` (temporary step)

The above temporary step is to run a json-server and load up the proposal data. You can find the db [here](./data/db.json).

- To check available commands on the `makefile` run `make` or `make help` on the root folder of the repo
- To run any command run `make <desired command>`. For instance, to start the service, `make up`.
