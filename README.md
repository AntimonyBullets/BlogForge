# ReactBlog

A full‑stack blog application built with React, Vite, Redux Toolkit, React Hook Form, and Appwrite (Auth, Database, and Storage). It features a rich text editor for content creation, protected routes, image upload/display, and a clean Tailwind UI.

## Features

- Authentication
	- Signup and Login with Appwrite Account sessions
	- Session detection on app load and persistent auth state via Redux
	- Auth‑aware routing using a lightweight `AuthLayout` guard

- Posts (CRUD)
	- Create and edit posts with a Rich Text Editor (TinyMCE)
	- Auto‑generated slugs from titles with live updates and validation
	- List all active posts and view single post pages
	- Update or delete posts (server‑side via Appwrite Databases)

- Rich Text Editing
	- TinyMCE editor integrated via React Hook Form `Controller`
	- Content saved as HTML and rendered safely with `html-react-parser`

- File Uploads & Media
	- Upload featured images to Appwrite Storage
	- Display images using `getFileView` URLs (no paid transformations required)

- UI/UX
	- Tailwind CSS styling
	- Reusable form components (Input, Select, RTE, Button)
	- Header/Footer layout and Post cards

- Routing
	- React Router v6+ with nested routes and `<Outlet />`
	- Guarded routes to restrict access based on auth state

- Dev Experience
	- Vite for fast HMR
	- ESLint with React Hooks rules

## Tech Stack / Libraries

- Runtime & Build
	- React ^19
	- Vite ^7

- State & Forms
	- @reduxjs/toolkit: Global auth state (`status`, `userData`)
	- react-redux: Store provider and hooks
	- react-hook-form: Form state/validation (`register`, `Controller`, `setValue`, `watch`)

- Routing
	- react-router-dom ^7: Routes, `Outlet`, navigation guards

- Editor & Content
	- @tinymce/tinymce-react: TinyMCE Rich Text Editor
	- html-react-parser: Render stored HTML content as React elements

- Backend (BaaS)
	- appwrite: Auth (Account), Database (Documents), Storage (Files)

- Styling
	- tailwindcss ^4 and @tailwindcss/vite plugin

- Tooling
	- eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh
	- @vitejs/plugin-react

## Project Structure (key parts)

```
src/
	appwrite/
		auth.js        # login, signup, session, get current user
		database.js    # create/update/delete/get posts
		storage.js     # file upload, view URLs
	components/
		AuthLayout.jsx # route guard based on auth status
		RTE.jsx        # TinyMCE wrapped with RHF Controller
		PostForm/      # create/edit post form with slug logic
	pages/
		Home.jsx, AddPost.jsx, EditPost.jsx, Post.jsx, Login.jsx, Signup.jsx
	store/
		authSlice.js   # login/logout reducers and state
```

## Notes

- TinyMCE: For cloud usage, obtain a free API key from Tiny Cloud and add it to the editor init. Self‑hosting is also possible.
- Appwrite Image Previews: Free plans block image transformations. This project uses `getFileView` to serve original images without transformations.
- Slug Handling: Slug auto‑updates from the title via `watch` + `setValue`. You can keep the slug editable by attaching `onInput` on the slug field.

## Scripts

- `npm run dev` – Start Vite dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

## Environment

Configure `src/config/config.js` with your Appwrite endpoint, project ID, database/collection IDs, and bucket ID.
