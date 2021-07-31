# Orders Service
Service that recieves API requests of making orders
## Http Endpoints
- `POST /sell-shares`
- `GET /health_check`
## Outbound RPC
- `account-transactions.request_reservation`
## Publish Events
- `order_created_event`
## Subscribe Events
- `order_placed_event` from `market service`