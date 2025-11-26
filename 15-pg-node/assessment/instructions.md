# Assessment: Link Shortener & Redirection App

## Overview

Expand the existing user management API into a **Link Shortener and Redirection Application**. Users will be able to create shortened URLs, track their links, and redirect visitors to the original URLs.

---

## Learning Objectives

- Create database tables with relationships (foreign keys)
- Implement CRUD operations for a new resource
- Follow MVC architecture conventions
- Generate unique short codes
- Handle URL redirection
- Work with related data across tables

---

## Part 1: Database Setup

### 1.1 Create the Links Table

Create a new file: `database/create-links-table.js`

The `links` table should have the following structure:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Requirements:**

- Import and use the database connection from `database/index.js`
- Execute the CREATE TABLE query
- Log the result
- Handle errors appropriately

**Relationship:**

- Each link belongs to ONE user (`user_id` foreign key)
- Each user can have MANY links (one-to-many relationship)
- When a user is deleted, their links are automatically deleted (`ON DELETE CASCADE`)

### 1.2 Update Database Initialization

Modify `database/status.js` to also create the links table on server start:

```javascript
import createLinksTable from "./create-links-table.js";

// After creating users table
await createLinksTable();
```

---

## Part 2: Database CRUD Operations

### 2.1 Create Links CRUD File

Create a new file: `database/links-crud.js`

Implement the following functions with parameterized queries:

#### Required Functions:

**1. `createLink(userId, originalUrl, shortCode)`**

- Insert a new link into the database
- Return the created link object

**2. `getAllLinks()`**

- Retrieve all links from the database
- Return array of links

**3. `getLinkByShortCode(shortCode)`**

- Find a link by its short code
- Return the link object or undefined

**4. `getLinksByUserId(userId)`**

- Get all links created by a specific user
- Return array of links for that user

**5. `updateLinkClickCount(shortCode)`**

- Increment the click_count by 1 for a specific link
- Return the updated link

**6. `deleteLink(id)`**

- Delete a link by its ID
- Return the deleted link object

**7. `updateLink(id, originalUrl)`**

- Update the original_url of a link
- Return the updated link

---

## Part 3: Controllers

### 3.1 Create Links Controller

Create a new file: `controllers/links.js`

Implement the following controller functions following the same pattern as `controllers/users.js`:

#### Required Controllers:

**1. `createLinkController(req, res)`**

- Extract `userId`, `originalUrl` from request body
- Generate a unique 6-character `shortCode` (use random alphanumeric)
- Validate required fields (return 400 if missing)
- Call `createLink()` from database layer
- Return 201 status with created link
- Handle errors with 500 status

**2. `getAllLinksController(req, res)`**

- Retrieve all links
- Return 200 with array of links
- Handle errors with 500 status

**3. `getLinksByUserController(req, res)`**

- Extract `userId` from request params
- Get all links for that user
- Return 200 with array of links
- Handle errors with 500 status

**4. `updateLinkController(req, res)`**

- Extract `id` from params and `originalUrl` from body
- Validate required fields
- Update the link
- Return 404 if link not found
- Return 200 with updated link
- Handle errors with 500 status

**5. `deleteLinkController(req, res)`**

- Extract `id` from params
- Delete the link
- Return 404 if link not found
- Return 200 with success message
- Handle errors with 500 status

**6. `redirectController(req, res)`**

- Extract `shortCode` from params
- Find link by short code
- Return 404 if not found
- Increment click count
- Redirect to original URL using `res.redirect(originalUrl)`
- Handle errors with 500 status

---

## Part 4: Routes

### 4.1 Update Routes File

Modify `routes/index.js` to add the following routes:

```javascript
// Import link controllers
import {
  createLinkController,
  getAllLinksController,
  getLinksByUserController,
  updateLinkController,
  deleteLinkController,
  redirectController,
} from "../controllers/links.js";

// Link CRUD routes
apiRoutes.post("/links", createLinkController);
apiRoutes.get("/links", getAllLinksController);
apiRoutes.get("/links/user/:userId", getLinksByUserController);
apiRoutes.put("/links/:id", updateLinkController);
apiRoutes.delete("/links/:id", deleteLinkController);

// Redirection route (should be at the end)
apiRoutes.get("/:shortCode", redirectController);
```

**Note:** The redirect route `/:shortCode` should be placed at the end to avoid conflicts with other routes.

---

## Part 5: Helper Functions

### 5.1 Create Utility File

Create a new file: `utils/shortcode-generator.js`

Implement a function to generate unique short codes:

```javascript
export function generateShortCode(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
```

Use this function in your `createLinkController`.

---

## Part 6: Testing with Bruno

### 6.1 Create Bruno API Documentation

Create the following Bruno files in `bruno/node-pg-api/`:

1. **Create link.bru**

```
POST http://localhost:8888/api/links
Body: { "userId": 1, "originalUrl": "https://www.google.com" }
```

2. **Get all links.bru**

```
GET http://localhost:8888/api/links
```

3. **Get links by user.bru**

```
GET http://localhost:8888/api/links/user/1
```

4. **Update link.bru**

```
PUT http://localhost:8888/api/links/1
Body: { "originalUrl": "https://www.github.com" }
```

5. **Delete link.bru**

```
DELETE http://localhost:8888/api/links/1
```

6. **Test redirect.bru**

```
GET http://localhost:8888/api/ABC123
(Replace ABC123 with actual short code)
```

---

## Part 7: Testing Requirements

Test your implementation using curl or Bruno:

### Test Scenarios:

1. **Create a user** (if not exists)
2. **Create multiple links** for that user
3. **Get all links** - verify they appear
4. **Get links by user ID** - verify filtering works
5. **Test redirect** - visit `http://localhost:8888/api/{shortCode}` in browser
6. **Check click count** - verify it increments after each redirect
7. **Update a link** - change the original URL
8. **Delete a link** - verify it's removed
9. **Test error cases**:
   - Create link with missing fields (should return 400)
   - Redirect with invalid short code (should return 404)
   - Update non-existent link (should return 404)

---

## Bonus Challenges (Optional)

### Level 1: Enhanced Features

- Add link expiration date (`expires_at` column)
- Check if link is expired before redirecting
- Add custom short codes (let users choose their own)
- Validate URLs (check if they start with http:// or https://)

### Level 2: Analytics

- Create a `clicks` table to track each click with timestamp and IP address
- Add endpoint to get click analytics for a link
- Show clicks per day/week/month

### Level 3: Advanced

- Add link categories/tags
- Implement link search functionality
- Add rate limiting (max links per user)
- Create a simple HTML frontend for creating/managing links

---

## Submission Checklist

- [ ] `database/create-links-table.js` created
- [ ] `database/links-crud.js` with all 7 functions
- [ ] `controllers/links.js` with all 6 controllers
- [ ] `routes/index.js` updated with link routes
- [ ] `utils/shortcode-generator.js` created
- [ ] All Bruno API documentation files created
- [ ] Server starts without errors
- [ ] All routes tested and working
- [ ] Error handling implemented (400, 404, 500)
- [ ] Redirects work correctly in browser
- [ ] Click count increments properly

---

## Expected File Structure

```
15-pg-node/
├── controllers/
│   ├── users.js
│   └── links.js          ← NEW
├── database/
│   ├── index.js
│   ├── status.js         ← MODIFIED
│   ├── create-user-table.js
│   ├── create-links-table.js  ← NEW
│   ├── users-crud.js
│   └── links-crud.js     ← NEW
├── routes/
│   └── index.js          ← MODIFIED
├── utils/
│   └── shortcode-generator.js  ← NEW
├── bruno/node-pg-api/
│   ├── (existing files)
│   ├── Create link.bru   ← NEW
│   ├── Get all links.bru ← NEW
│   ├── Get links by user.bru ← NEW
│   ├── Update link.bru   ← NEW
│   ├── Delete link.bru   ← NEW
│   └── Test redirect.bru ← NEW
└── index.js
```

---

## Grading Criteria

| Criteria                                               | Points  |
| ------------------------------------------------------ | ------- |
| Database table created correctly with foreign key      | 15      |
| All CRUD functions implemented                         | 25      |
| All controllers implemented with proper error handling | 25      |
| Routes configured correctly                            | 10      |
| Redirect functionality works                           | 10      |
| Click count tracking works                             | 5       |
| Bruno documentation complete                           | 5       |
| Code follows existing conventions                      | 5       |
| **Total**                                              | **100** |

---

## Tips for Success

1. **Follow the existing pattern** - Look at how users are implemented
2. **Test incrementally** - Don't write everything at once
3. **Use console.log()** - Debug your code step by step
4. **Check the database** - Use a PostgreSQL client to verify data
5. **Read error messages** - They tell you what's wrong
6. **Ask for help** - If stuck for more than 30 minutes
7. **Commit often** - Save your progress with git

---

## Resources

- Express.js Documentation: https://expressjs.com/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Node.js pg Library: https://node-postgres.com/
- HTTP Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

---

Good luck! 🚀
