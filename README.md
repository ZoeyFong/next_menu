# A simple menu and a login form

## Visit the domain deployed by Vercel

[https://next-menu-zoey.vercel.app/](https://next-menu-zoey.vercel.app/)

## Fake users for testing

```json
 {
    username: "username",
    password: "password",
  }
```

or

```json
 {
    username: "zoey",
    password: "fong",
  }
```

## Getting Started

First, install dependencies:

```bash
pnpm i
```

Second, run the development server and visit [http://localhost:3000](http://localhost:3000)

```bash
pnpm dev
```

## Building

```bash
pnpm build
```

## Story

* A simple menu with several buttons in the homepage.
* Clicking one of the buttons will display a login form. 
* The form contains username input, password input, submit button and cancel button.
* Clicking submit should send the form data to a fake endpoint. 
* Clicking cancel should take you back to your previous menu. 
* Showing error message when the username or password is incorrect.

## Extra

* The `MenuItem` is able to be reusable by passing customized props, and can be extended more.
* Pass a JSON data structure to render a nested menu containing buttons and clicking some buttons in the menu will either display a new nested menu
* Use Jest for unit testing


