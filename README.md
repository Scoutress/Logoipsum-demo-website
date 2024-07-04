# Tasks left:

- BUG - In services page you need to press twice on category to make it "active".

---

## React part

- Service card. OnClick navigate to categories
- Search functionality
- Service card Save as favorite with localStorage (useLocalStorage hook)
- Login / Register functionality. After typing username, password and pressing Login button, save info with useContext and localStorage. Redirect to main page with updated topbar while logged in.

---

## Node.js part

- Create RESTful API with Express.js.
- Need API:

1. Categories
   GET /categories: gets all categories.
   POST /categories: creates new category.
2. Business
   GET /businesses: gets all companies.
   GET /businesses/category/:category: gets all companies, belonging to the specified category.
   GET /businesses/:id: Gets a specific company by ID.
   POST /businesses: Adds a new company to the list. Ensure all required fields are provided.
   PUT /businesses/:id: Updates an existing company. Check if the company with the specified ID exists before updating.
3. Orders
   GET /bookings/user/:email: Gets all orders related to a specific user's email. postal address.
   POST /bookings: Creates a new order. Ensure all fields are provided.
   GET /businesses/:businessId/bookings/date/:date: Receives all orders for a specific company on the specified date.
   DELETE /bookings/:id: Deletes a specific order.

- Error handling: Implement a comprehensive error handling system to clearly report missing data, invalid operations, and failed actions.
- Data check: Ensuring that all input data conforms to expected formats and constraints before processing.
- Add User schema with appropriate fields.
- Use authentication methods and secure the required APIs.
- Split routes into different files e.g. routes/bookingRoutes.js.
- Integrate ESlint and meet all ESlint requirements.

---

## Typescript part

- Integrate Typescript support.
- Refactor all code from Javascript to Typescript.
- Connect the /categories and /businesses APIs to the front-end application.
- Merge /login and /register APIs with login and registration forms. (Print the registration form if there is none).
- (Optional) Add error and success messages. For example when invalid data is entered.
- Make a dynamic route for one business page.
- By clicking on Avatar (user) in the dropdown menu.
- Sidebar modal form opening after pressing the "Book Appointment" button.
- Open My bookings on the route by selecting the "My booking" option from the dropdown menu.
- Integrate Formik and yup libraries into React application:
  -- Login form.
  -- Register form.
- Integrate the React-query library into a React application.

---

## Test part

- Integrate Jest and React Testing Library libraries into a React application.
- Write tests that cover at least 50% code coverage.

---

## Deploy part

- Deploy app with Heroku.
