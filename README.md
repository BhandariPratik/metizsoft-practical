
## Project Setup

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Run development server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:3000
```

---

## Authentication Flow

On the **Home Page (`/`)**, you will see the following buttons:

* Login
* Dashboard
* About Us

The **Dashboard** and **About Us** routes are protected routes created to demonstrate authentication flow.

### Without Authentication

If a user clicks on:

* Dashboard
* About Us

without logging in, they will be redirected to the **Login Page**.

---

## Login Credentials

Use the following credentials to log in:

```bash
Email: admin@gmail.com
Password: 123456
```

---

## After Login

After successful login:

* User is redirected to the **Dashboard**
* JWT token is stored in **HTTP-only cookies**
* Route protection is handled using **Next.js Proxy**

---

## Dashboard Features

The dashboard includes:

* User Listing
* Search functionality
* Sorting
* Pagination
* Loading state handling
* No data state handling

---

## Header Actions

### About Us

Redirects the user to the protected **About Us** page.

### Logout

Logs out the user and redirects them back to the **Login Page**.

---

## Route Structure

### Protected Routes

* `/dashboard`
* `/about`

### Public Routes

* `/`
* `/login`

---

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* JWT Authentication
* HTTP-only Cookies
* Next.js Proxy Route Protection
