# Roles And Affiliates

This project now stores the account role on the `users.role` column.

## Current roles

- `user`: default role for normal readers/customers.
- `affiliate`: assigned to anyone who is also registered in the `affiliates` table.

## Assignment rules

- New user registrations default to `user`.
- If the same email already exists in `affiliates`, the account is saved as `affiliate`.
- When a new affiliate is created, the app updates the matching user row by email and sets `users.role = 'affiliate'`.
- Existing affiliate-linked users are backfilled by Flyway migration `V10__add_user_roles.sql`.

## How to check

- Inspect `src/main/java/com/psoriasis/model/User.java`.
- Inspect `src/main/java/com/psoriasis/service/UserService.java`.
- Inspect `src/main/java/com/psoriasis/service/AffiliateService.java`.
- Inspect `src/main/resources/db/migration/V10__add_user_roles.sql`.

## Notes

- This change stores roles in the database and surfaces them in auth responses.
- There is not yet a full Spring Security role-gate on every route, so this is the role data foundation plus automatic affiliate tagging.
