

# 📚 Library Management System application
this is a backend project for managment a library. its build using techonology of mongodb,mongoose,express.js,typescript and zod.  this project is included in proper schema validation,business logic enforcement , use of aggregation pipeliine,mongoose static and instance method, use of mongoose middleware like pre,post method, and filtering.this project followed mcv(model-veiw-controller )pattern.

### deployed live link:[https://library-management-system-5-n2um.onrender.com]

### Technology used
-**Mongodb**-NoSQL database
-**Mongoose** - ODM (Object Data Modeling) interact with mongodb
-**zod** - for schema validation
- **Typescript** 

- **Express.js** - framework for node.js 
- **ts-node-dev** - runs the typescript project by auto-reload during development

- **dotenv** - used for .env variable managment




## 📁 Folder Structure

```plaintext
library-management-system/
│
├── src/                     # Source code folder
│   ├── app/                 # Express app and config
│   │   ├── config/          # Configuration files (e.g. environment, constants)
│   │   ├── controllers/     # Route controllers / business logic
│   │   ├── models/          # Mongoose models / schemas
│   │   ├── routes/          # Express route definitions
│   │   └── utils/           # Utility/helper functions
│   │
│   ├── server.ts            # Main entry point to start the server
│   └── app.ts               # Express app initialization
│
├── dist/                    # Compiled JavaScript output folder (from TypeScript)
├── node_modules/            # Installed npm packages
├── .env                     # Environment variables file (not committed)
├── .gitignore               # Files/folders to ignore in git
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── README.md                # Project documentation
└── ...


### Explanation

- **src/**: All TypeScript source code lives here.
- **app/**: Organizes core backend logic (routes, controllers, models).
- **server.ts**: Starts the Express server and connects to the database.
- **dist/**: Compiled output after running `tsc`.
- `.env`: Secrets and configuration (should be added to `.gitignore`).
- `package.json`: Lists dependencies and build/start scripts.
- `tsconfig.json`: TypeScript compiler settings.

---