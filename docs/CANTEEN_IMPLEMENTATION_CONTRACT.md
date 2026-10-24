# Kantin Digital Implementation Contract

## MVP workflow
- Merchant owns products and availability through a merchant-scoped `CANTEEN_VENDOR` or `COOP_OPERATOR` assignment.
- Students see active products and submit a preorder using `PAY_AT_PICKUP`.
- Order states: `SUBMITTED -> ACCEPTED -> READY -> COMPLETED`, or `CANCELLED` before completion.
- Stock decrement and order creation occur in one database transaction through `place_canteen_order`.
- Students see only their orders; merchants see only orders for their merchant.

## Security
- Server validates product ownership, active availability, integer quantities, stock, and price snapshots.
- Merchant status transitions are authorized by merchant scope, not account type or client UI.
- Order history exposes no other student's identity or orders to students.
- No payment gateway or payment credential is used in this MVP.
