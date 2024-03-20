# Faiths Lodge Resource Directory

## Description

This application serves as a comprehensive directory for grief support resources, designed to assist employees and volunteers in finding appropriate grief support resources for grieving parents. It features a geographical map with pins indicating the locations of various support resources and a list of organizations that can be filtered by loss, service, and faith affiliation. The app supports multiple user roles including regular users, administrators, and a root user with immutable credentials to ensure secure access management. Administrators have the capability to manage users, including the creation and deletion of all user types (excluding the root user), and the editing of user admin privileges. All users have the ability to enter an organizations details, edit those details, and delete an organization. They also have the ability to create, modify, and delete all service and loss types. There is the ability to verify organizations for accurate data entry in the form of a verification badge that can be applied and removed through the edit organization functionality. This project is intended to be hosted on Heroku or some other cloud service provider. This project is the property of ©Faiths Lodge, dedicated to providing accessible support for those in need.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v18.x)
-   npm (comes with Node.js)

## Installation

1. **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd faiths_lodge_group
    ```

2. **Install dependencies**
    ```bash
    npm i
    ```
3. **Create a `.env` file** at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=<INSERT CUSTOM STRING OF CHARACTERS OR THE EX IN DOCS>
USER_AGENT=<INSERT THE NAME FROM THE DOCS>
```
EXAMPLE `.env` file
```plaintext
SERVER_SESSION_SECRET=GjtNcBQpFday4FdxQy-*4kW33JRQm3wJXXqD9-nCbjwJsn@VmxCtLL
USER_AGENT="Example Resource Directory"
```

## Running the App locally
1. **Create and Connect Database**
- Create a database with the name as defined in the database.sql file.
- Copy the contents of database.sql and run the database table creation queries only.
- ***Do not insert example data into DB by running example INSERT statements***
2. **Run Server**
    ```
    npm run server
    ```
3.  **In another terminal window**
    ```
    npm run client
    ```
## Usage

### Server Setup
The server is set up in `server.js` and configured to listen on port 5001. It includes middleware for parsing JSON and URL-encoded data and routes for handling API requests related to image uploading.

### React Frontend

Vite manages the URL for the client. Access client in browser at URL defined after client run command.
## Features
Map visualization of grief support resources.
Role-based access control for regular users, admins, and a root user.
Admin capabilities to manage users and resources.
Resource management including editing and updating support information.

## Dependencies
- React for frontend development.
- Express for the backend server.
- Multer for handling image uploads.
- PostgreSQL (pg) for database management.
- Vite for bundling and development server.
- Leaflet for map visualization.
- Material UI for front-end components
- ***For a full list of dependencies, refer to the package.json file.***

## Third-party APIs
- This project uses the **Nominatim** API, which is a free api for the public to use as long as utilization requirements are adhered to as defined in: https://operations.osmfoundation.org/policies/nominatim/


## Configuration
This app requires configuration of environment variables for database connections and other sensitive information. Ensure these are set up correctly in your .env file before running the app.

## Contributing
This project was started by Prime Digital Academy 'Peridot' cohort members in March 2024.
Future contributions expected from volunteers and/or hired software developers.

## License
This project is the property of ©Faiths Lodge.