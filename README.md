# NZ Veterinary Locum Network - Frontend

<table>
<tr>
<td>

<h4>About This Project</h4>

In order to market themselves and look for jobs, there hasn't been a website created exclusively for veterinary locums in New Zealand.
<br></br>
This project intends to develop a platform where veterinary locums can create profiles and introduce themselves and companies can post job vacancies for locums.
We resolve the current communication issue by facilitating direct communication between veterinarian offices and locum tenens.

<h4>Why is this problem valuable to address?</h4>

There is still no infrastructure that enables veterinary locums to openly promote themselves outside of a recruitment agency,
making it very difficult for locums and clinics to connect without third-party intervention (recruitment agency).
If new veterinary locums don't already have personal relationships with clinics, finding one can be very challenging.
They have no platform to view and identify the clinics that require them. Currently, a Facebook group is the only location locums may access information.
My aim is to have all doctors' information in a beautiful,
understandable style so that they don't have to wade through several Facebook postings to figure out which locum is reliable and reachable for a clinic.

<h4>Goals</h4>
With this project, I intend to make it easier for veterinary clinics and locums to organize employment on their own without the use 
of a recruitment firm by centralizing lists of available jobs and veterinary locums.
The NZ Veterinary Locum Network will be the only platform to keep track of veterinary locum's profiles that are visible to the public online, 
filling a specialized need for a distinct sector on the website rather than specialized Facebook groups.

</td>
</tr>
</table>

## Screenshots

![](https://github.com/applescan/NZ-Locum-Frontend/blob/main/src/images/Capstone%20cover.png)

## Demo

Here is a working live demo : https://nz-locum-network.netlify.app/

## Figma

- Software Architecture and Task Timeline: https://www.figma.com/file/kqeMSGwcqMYjBFViLUcspq/NZ-Veterinary-Locum?node-id=0%3A1&t=IdnttLOPOBcoOuM0-0
- Wireframe designs: https://www.figma.com/file/kqeMSGwcqMYjBFViLUcspq/NZ-Veterinary-Locum?node-id=2%3A2&t=IdnttLOPOBcoOuM0-0

## Project Structure

The project follows a modular architecture:

```
src/
  ├── api/                  # API service layer
  │   ├── apiClient.js      # Base API client with interceptors
  │   ├── clinicsService.js # Clinic-specific API calls
  │   ├── doctorsService.js # Doctor-specific API calls
  │   ├── jobsService.js    # Job-specific API calls
  │   └── index.js          # API exports
  │
  ├── components/           # UI components
  │   ├── common/           # Reusable UI elements
  │   │   ├── Button/       # Button component
  │   │   ├── Card/         # Card component
  │   │   ├── Form/         # Form component
  │   │   ├── Input/        # Input component
  │   │   ├── Loading/      # Loading component
  │   │   ├── Select/       # Select component
  │   │   ├── TextArea/     # TextArea component
  │   │   └── index.js      # Common component exports
  │   │
  │   ├── layout/           # Layout components
  │   │   ├── Container/    # Container component
  │   │   ├── Footer/       # Footer component
  │   │   ├── Layout/       # Main layout wrapper
  │   │   ├── Navbar/       # Navigation bar
  │   │   ├── PageHeader/   # Page header with background
  │   │   └── index.js      # Layout component exports
  │   │
  │   ├── features/         # Feature-specific components
  │   └── pages/            # Page components
  │
  ├── context/              # React context providers
  │   └── Context.jsx       # Application context
  │
  ├── hooks/                # Custom React hooks
  │   ├── useApi.js         # API request hook
  │   ├── useAuth.js        # Authentication hook
  │   ├── useForm.js        # Form handling hook
  │   └── index.js          # Hooks exports
  │
  ├── images/               # Image assets
  │
  ├── styles/               # Global styles
  │   ├── variables.css     # CSS variables
  │   ├── reset.css         # CSS reset
  │   ├── utilities.css     # Utility classes
  │   └── index.css         # Main stylesheet
  │
  ├── utils/                # Utility functions
  │   └── validation.js     # Form validation utilities
  │
  ├── App.js                # Main application component
  └── index.js              # Application entry point
```

## Component Library

The application uses a custom component library built with consistent styling and behavior:

- **Button**: Customizable button with various styles
- **Card**: Container component for content
- **Form**: Form handling component with validation
- **Input**: Text input field with validation
- **Loading**: Loading spinner for async operations
- **Select**: Dropdown selection component
- **TextArea**: Multiline text input component

## API Layer

The API layer is structured to provide a clean interface for making requests:

- **apiClient.js**: Base client with interceptors for auth and error handling
- **Service files**: Specialized services for different entity types
- **useApi hook**: Custom hook for making API calls with loading/error states

## Styling System

The application uses a systematic approach to styling:

- **CSS Variables**: Global variables for colors, spacing, etc.
- **Reset CSS**: Normalized styling across browsers
- **Utility Classes**: Helper classes for common styling patterns
- **Component-specific CSS**: Scoped styles for individual components

### Built with

• Axios
• Bootstrap
• CSS
• Canva
• Figma
• React
• MUI
• MDB Bootstrap
• Express.js
• JavaScript
• MongoDB
• Node.js

### User Guide

How to run on your own system using NZ Veterinary Locum online back-end server:

- Copy/fork this repository to your github/local drive
- In the folder, run the command `npm install`
- In the folder, run the command `npm start`
- Once running, open a browser and open `http://localhost:3000`
- If everything was successful, the page will show up.

How to run on your own system using localhost:

- Copy/fork this repository to your github/local drive
- In the folder, run the command `npm install`
- Change all the links for all axios and fetch request to "http://localhost:4000/url/path". Url and path respective to each route you're trying to access
- In the folder, run the command `npm start`
- Once running, open a browser and open `http://localhost:3000`
- If everything was successful, the page will show up.

### Bug / Feature Request

- Known limitations: When you register a user, any uploaded image that's larger than 1 Mb will not go through, this is because the TSL certificate from the cloud server is built with an older version of security policies, your browser won't allow a large file to be sent. The console log will show that it's a CORS issue.. More information regarding TSL certificate can be found here https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html
- If you're running the backend in your local, there should be no problem with CORS and uploading image larger than 1mb.
- If you discover more bug (the website was unable to process the query and/or returned undesirable results), kindly open an issue [here](https://github.com/applescan/NZ-Veterinary-Locum-Frontend/issues/new) by mentioning your search term and the desired outcome.

## Author

- Website - https://applescan.github.io/Portfolio-Website/

## License

MIT © Felicia Fel