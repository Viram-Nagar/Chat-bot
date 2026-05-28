This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
client/.env.example
client/.gitignore
client/eslint.config.js
client/index.html
client/package.json
client/public/favicon.svg
client/public/icons.svg
client/README.md
client/src/App.css
client/src/App.jsx
client/src/assets/hero.png
client/src/assets/react.svg
client/src/assets/vite.svg
client/src/components/auth/LoginForm.jsx
client/src/components/auth/RegisterForm.jsx
client/src/components/chat/ChatWindow.jsx
client/src/components/chat/ConversationSidebar.jsx
client/src/components/chat/InputBar.jsx
client/src/components/chat/MessageBubble.jsx
client/src/components/chat/TypingIndicator.jsx
client/src/components/dashboard/BotCard.jsx
client/src/components/layout/Navbar.jsx
client/src/components/layout/ProtectedRoute.jsx
client/src/components/layout/PublicRoute.jsx
client/src/components/shared/Avatar.jsx
client/src/components/shared/ConfirmModal.jsx
client/src/components/shared/Loader.jsx
client/src/index.css
client/src/main.jsx
client/src/pages/ChatPage.jsx
client/src/pages/DashboardPage.jsx
client/src/pages/HistoryPage.jsx
client/src/pages/HomePage.jsx
client/src/pages/LoginPage.jsx
client/src/pages/ProfilePage.jsx
client/src/pages/RegisterPage.jsx
client/src/services/api.js
client/src/services/authService.js
client/src/services/chatService.js
client/src/services/socketService.js
client/src/store/authStore.js
client/src/store/chatStore.js
client/src/store/themeStore.js
client/src/utils/botConfig.js
client/src/utils/helpers.js
client/vite.config.js
server/.env.example
server/app.js
server/config/cloudinary.js
server/config/db.js
server/config/env.js
server/controllers/authController.js
server/controllers/chatController.js
server/controllers/historyController.js
server/middleware/authMiddleware.js
server/middleware/authValidation.js
server/middleware/errorHandler.js
server/middleware/rateLimiter.js
server/middleware/sanitize.js
server/middleware/validate.js
server/models/Conversation.js
server/models/Message.js
server/models/User.js
server/package.json
server/routes/authRoutes.js
server/routes/chatRoutes.js
server/routes/historyRoutes.js
server/server.js
server/services/aiService.js
server/services/botPersonalities.js
server/socket/socketHandler.js
server/utils/tokenHelper.js
```

# Files

## File: .gitignore
````
# ─── Dependencies ──────────────────────────────
node_modules/
.pnp
.pnp.js

# ─── Environment Variables ─────────────────────
.env
.env.local
.env.development
.env.production
.env.test

# ─── Build outputs ─────────────────────────────
dist/
build/
.next/
out/

# ─── Logs ──────────────────────────────────────
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# ─── OS files ──────────────────────────────────
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# ─── Editor ────────────────────────────────────
.vscode/
.idea/
*.swp
*.swo
*.sublime-project
*.sublime-workspace

# ─── Testing ───────────────────────────────────
coverage/
.nyc_output/

# ─── Misc ──────────────────────────────────────
.cache/
.parcel-cache/
*.tgz
*.tar.gz
````

## File: client/.env.example
````
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
````

## File: client/.gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
````

## File: client/eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
````

## File: client/index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/bot-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Chatbot Platform</title>
    <meta
      name="description"
      content="Your personal AI assistant for fitness, finance, science, wellness and coding"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````

## File: client/public/favicon.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
````

## File: client/public/icons.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
````

## File: client/README.md
````markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
````

## File: client/src/App.css
````css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
````

## File: client/src/App.jsx
````javascript
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

// Layout
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PublicRoute from "./components/layout/PublicRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const initialize = useAuthStore((s) => s.initialize);
  const initTheme = useThemeStore((s) => s.initTheme);

  useEffect(() => {
    initTheme();
    initialize();
  }, []);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#1f2937",
            color: "#f9fafb",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#f9fafb" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#f9fafb" },
          },
        }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:botType"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700">
                  404
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Page not found
                </p>
                <a
                  href="/"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { useAuthStore } from "./store/authStore";
// import { useThemeStore } from "./store/themeStore";

// // Layout
// import Navbar from "./components/layout/Navbar";
// import ProtectedRoute from "./components/layout/ProtectedRoute";
// import PublicRoute from "./components/layout/PublicRoute";

// // Pages
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage";
// import ChatPage from "./pages/ChatPage";
// import HistoryPage from "./pages/HistoryPage";

// const App = () => {
//   const initialize = useAuthStore((s) => s.initialize);
//   const initTheme = useThemeStore((s) => s.initTheme);

//   useEffect(() => {
//     initTheme();
//     initialize();
//   }, []);

//   return (
//     <BrowserRouter>
//       {/* Toast Notifications */}
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             borderRadius: "10px",
//             background: "#1f2937",
//             color: "#f9fafb",
//             fontSize: "14px",
//           },
//           success: {
//             iconTheme: { primary: "#10b981", secondary: "#f9fafb" },
//           },
//           error: {
//             iconTheme: { primary: "#ef4444", secondary: "#f9fafb" },
//           },
//         }}
//       />

//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
//         <Navbar />

//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />

//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <LoginPage />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path="/register"
//             element={
//               <PublicRoute>
//                 <RegisterPage />
//               </PublicRoute>
//             }
//           />

//           {/* Protected Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/chat/:botType"
//             element={
//               <ProtectedRoute>
//                 <ChatPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/history"
//             element={
//               <ProtectedRoute>
//                 <HistoryPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* 404 */}
//           <Route
//             path="*"
//             element={
//               <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
//                 <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700">
//                   404
//                 </h1>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Page not found
//                 </p>

//                 <a
//                   href="/"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
//                 >
//                   Go Home
//                 </a>
//               </div>
//             }
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
````

## File: client/src/assets/react.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: client/src/assets/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: client/src/components/auth/LoginForm.jsx
````javascript
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Bot } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      toast.success("Welcome back! 👋");
      navigate(from, { replace: true });
    } else {
      toast.error(result.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* ── Header ──────────────────────────────────── */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
          <Bot size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Sign in to continue to ChatAI
        </p>
      </div>

      {/* ── Form ────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail
                size={16}
                className={`${
                  errors.email
                    ? "text-red-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            </div>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`
                w-full pl-10 pr-4 py-2.5 text-sm
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                border rounded-xl outline-none
                transition-all duration-200
                ${
                  errors.email
                    ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500/30"
                    : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
                }
              `}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <span>⚠</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock
                size={16}
                className={`${
                  errors.password
                    ? "text-red-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`
                w-full pl-10 pr-11 py-2.5 text-sm
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                border rounded-xl outline-none
                transition-all duration-200
                ${
                  errors.password
                    ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500/30"
                    : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
                }
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <span>⚠</span> {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full flex items-center justify-center gap-2
            py-2.5 px-4 text-sm font-semibold
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:from-blue-600 hover:to-purple-700
            text-white rounded-xl
            shadow-md hover:shadow-lg
            transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            active:scale-[0.98]
          "
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* ── Divider ─────────────────────────────────── */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs text-gray-400 bg-white dark:bg-gray-900">
            New to ChatAI?
          </span>
        </div>
      </div>

      {/* ── Register Link ────────────────────────────── */}
      <Link
        to="/register"
        className="
          w-full flex items-center justify-center gap-2
          py-2.5 px-4 text-sm font-medium
          border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-800
          rounded-xl transition-all duration-200
        "
      >
        Create an account
      </Link>
    </div>
  );
};

export default LoginForm;
````

## File: client/src/components/chat/ChatWindow.jsx
````javascript
import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { getBotConfig } from "../../utils/botConfig";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import Loader from "../shared/Loader";

// ── Streaming cursor ─────────────────────────────────────────────
const StreamingCursor = () => (
  <span className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle animate-pulse" />
);

// ── Welcome screen ───────────────────────────────────────────────
const WelcomeScreen = ({ bot, onStarterClick }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <div
      className={`
        w-20 h-20 rounded-3xl bg-gradient-to-br ${bot.gradient}
        flex items-center justify-center text-4xl
        shadow-xl mb-5
      `}
    >
      {bot.emoji}
    </div>
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
      {bot.name}
    </h2>
    <p className={`text-sm font-semibold ${bot.text} mb-2`}>{bot.tagline}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
      {bot.description}
    </p>
    <div className="w-full max-w-md space-y-2.5">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
        Try one of these to get started
      </p>
      {bot.starters.map((starter) => (
        <button
          key={starter}
          onClick={() => onStarterClick(starter)}
          className={`
            w-full text-left px-4 py-3 rounded-xl text-sm
            ${bot.bgLight} ${bot.bgDark} border ${bot.border}
            text-gray-700 dark:text-gray-300
            hover:shadow-sm active:scale-[0.99]
            transition-all duration-150 flex items-start gap-2
          `}
        >
          <MessageSquare
            size={13}
            className={`mt-0.5 flex-shrink-0 ${bot.text}`}
          />
          {starter}
        </button>
      ))}
    </div>
  </div>
);

// ── Main ChatWindow ───────────────────────────────────────────────
const ChatWindow = ({ botType, onSendMessage }) => {
  const { messages, isTyping, isStreaming, isLoading } = useChatStore();
  const bottomRef = useRef(null);
  const bot = getBotConfig(botType);

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isStreaming]);

  if (!bot) return null;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader size="lg" color="blue" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Loading conversation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.length === 0 ? (
        <WelcomeScreen bot={bot} onStarterClick={onSendMessage} />
      ) : (
        <>
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              botType={botType}
              isStreaming={msg.isStreaming} // pass streaming flag
              StreamingCursor={StreamingCursor}
            />
          ))}

          {/* Typing indicator (before stream starts) */}
          {isTyping && !isStreaming && <TypingIndicator botType={botType} />}

          <div ref={bottomRef} className="h-1" />
        </>
      )}
    </div>
  );
};

export default ChatWindow;

// import { useEffect, useRef } from "react";
// import { MessageSquare } from "lucide-react";
// import { useChatStore } from "../../store/chatStore";
// import { getBotConfig } from "../../utils/botConfig";
// import MessageBubble from "./MessageBubble";
// import TypingIndicator from "./TypingIndicator";
// import Loader from "../shared/Loader";

// // ── Empty / Welcome state ────────────────────────────────────────
// const WelcomeScreen = ({ bot, onStarterClick }) => (
//   <div className="flex flex-col items-center justify-center h-full px-6 text-center">
//     {/* Bot avatar */}
//     <div
//       className={`
//         w-20 h-20 rounded-3xl bg-gradient-to-br ${bot.gradient}
//         flex items-center justify-center text-4xl
//         shadow-xl mb-5
//       `}
//     >
//       {bot.emoji}
//     </div>

//     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
//       {bot.name}
//     </h2>
//     <p className={`text-sm font-semibold ${bot.text} mb-2`}>{bot.tagline}</p>
//     <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
//       {bot.description}
//     </p>

//     {/* Starter questions */}
//     <div className="w-full max-w-md space-y-2.5">
//       <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
//         Try one of these to get started
//       </p>
//       {bot.starters.map((starter) => (
//         <button
//           key={starter}
//           onClick={() => onStarterClick(starter)}
//           className={`
//             w-full text-left px-4 py-3 rounded-xl text-sm
//             ${bot.bgLight} ${bot.bgDark}
//             border ${bot.border}
//             text-gray-700 dark:text-gray-300
//             hover:shadow-sm active:scale-[0.99]
//             transition-all duration-150
//             flex items-start gap-2
//           `}
//         >
//           <MessageSquare
//             size={13}
//             className={`mt-0.5 flex-shrink-0 ${bot.text}`}
//           />
//           {starter}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// // ── Main ChatWindow ───────────────────────────────────────────────
// const ChatWindow = ({ botType, onSendMessage }) => {
//   const { messages, isTyping, isLoading } = useChatStore();
//   const bottomRef = useRef(null);
//   const containerRef = useRef(null);
//   const bot = getBotConfig(botType);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, isTyping]);

//   if (!bot) return null;

//   // Loading saved conversation
//   if (isLoading) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader size="lg" color="blue" />
//           <p className="text-sm text-gray-400 dark:text-gray-500">
//             Loading conversation...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={containerRef}
//       className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
//     >
//       {messages.length === 0 ? (
//         /* Welcome screen */
//         <WelcomeScreen bot={bot} onStarterClick={onSendMessage} />
//       ) : (
//         <>
//           {/* Messages */}
//           {messages.map((msg) => (
//             <MessageBubble key={msg._id} message={msg} botType={botType} />
//           ))}

//           {/* Typing indicator */}
//           {isTyping && <TypingIndicator botType={botType} />}

//           {/* Scroll anchor */}
//           <div ref={bottomRef} className="h-1" />
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;
````

## File: client/src/components/chat/ConversationSidebar.jsx
````javascript
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Trash2,
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { getBotConfig } from "../../utils/botConfig";
import { formatDate, truncate } from "../../utils/helpers";
import toast from "react-hot-toast";

// ── Delete confirm modal ─────────────────────────────────────────
const DeleteModal = ({ onConfirm, onCancel, isAll }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 dark:border-gray-700">
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={22} className="text-red-500" />
      </div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white text-center mb-1">
        {isAll ? "Clear all conversations?" : "Delete this conversation?"}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          {isAll ? "Clear All" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

// ── Main sidebar ─────────────────────────────────────────────────
const ConversationSidebar = ({ botType }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // id or "all"

  const {
    conversations,
    currentConversationId,
    isSidebarOpen,
    toggleSidebar,
    startNewChat,
    loadConversations,
    loadConversation,
    deleteConversation,
    clearAllConversations,
  } = useChatStore();

  useEffect(() => {
    loadConversations({ botType });
  }, [botType]);

  // Filter conversations by botType + search
  const filtered = conversations.filter((c) => {
    const matchBot = botType ? c.botType === botType : true;
    const matchSearch = search
      ? c.title.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchBot && matchSearch;
  });

  const handleSelectConversation = async (conv) => {
    try {
      await loadConversation(conv._id);
      navigate(`/chat/${conv.botType}?conv=${conv._id}`);
    } catch {
      toast.error("Failed to load conversation");
    }
  };

  const handleNewChat = () => {
    startNewChat();
    navigate(`/chat/${botType}`);
  };

  const handleDelete = async () => {
    try {
      if (deleteTarget === "all") {
        await clearAllConversations();
        toast.success("All conversations cleared");
        navigate(`/chat/${botType}`);
      } else {
        await deleteConversation(deleteTarget);
        toast.success("Conversation deleted");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleteTarget(null);
    }
  };

  const bot = getBotConfig(botType);

  return (
    <>
      {/* ── Delete Modal ──────────────────────────────── */}
      {deleteTarget && (
        <DeleteModal
          isAll={deleteTarget === "all"}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────── */}
      <aside
        className={`
          flex flex-col h-full
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 flex-shrink-0
          ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
          {/* New chat button */}
          <button
            onClick={handleNewChat}
            className={`
              w-full flex items-center gap-2 px-3 py-2.5
              bg-gradient-to-r ${bot?.gradient || "from-blue-500 to-purple-600"}
              text-white text-sm font-semibold rounded-xl
              hover:shadow-md active:scale-[0.98] transition-all
            `}
          >
            <Plus size={16} />
            New Chat
          </button>

          {/* Search */}
          <div className="relative mt-2">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="
                w-full pl-8 pr-3 py-2 text-xs
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-xl outline-none
                text-gray-700 dark:text-gray-300
                placeholder-gray-400 dark:placeholder-gray-500
                focus:border-blue-400 dark:focus:border-blue-600
                transition-colors
              "
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-none">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {search ? "No results found" : "No conversations yet"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {search ? "Try a different search" : "Start a new chat above"}
              </p>
            </div>
          ) : (
            <div className="px-2 space-y-0.5">
              {filtered.map((conv) => {
                const convBot = getBotConfig(conv.botType);
                const isActive = conv._id === currentConversationId;

                return (
                  <div
                    key={conv._id}
                    className={`
                      group relative flex items-start gap-2.5 px-3 py-2.5
                      rounded-xl cursor-pointer transition-all duration-150
                      ${
                        isActive
                          ? `${convBot?.bgLight || "bg-blue-50"} ${convBot?.bgDark || "dark:bg-blue-900/20"} ${convBot?.border || "border-blue-200"} border`
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                      }
                    `}
                    onClick={() => handleSelectConversation(conv)}
                  >
                    {/* Bot emoji */}
                    <span className="text-base flex-shrink-0 mt-0.5">
                      {convBot?.emoji}
                    </span>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-semibold truncate ${
                          isActive
                            ? convBot?.text || "text-blue-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {truncate(conv.title, 40)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {formatDate(conv.updatedAt)}
                      </p>
                    </div>

                    {/* Delete btn */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(conv._id);
                      }}
                      className="
                        opacity-0 group-hover:opacity-100
                        p-1 rounded-lg
                        hover:bg-red-100 dark:hover:bg-red-900/30
                        text-gray-400 hover:text-red-500
                        transition-all flex-shrink-0
                      "
                      title="Delete conversation"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="p-3 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setDeleteTarget("all")}
              className="
                w-full flex items-center justify-center gap-2
                py-2 px-3 text-xs font-medium
                text-red-500 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
                rounded-xl transition-colors
              "
            >
              <Trash2 size={13} />
              Clear all conversations
            </button>
          </div>
        )}
      </aside>

      {/* ── Sidebar toggle button ─────────────────────── */}

      <button
        onClick={toggleSidebar}
        className={`
    absolute top-1/2 -translate-y-1/2 z-20
    w-5 h-10 flex items-center justify-center
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-r-lg shadow-sm
    text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
    hover:bg-gray-50 dark:hover:bg-gray-700
    transition-all duration-300
  `}
        style={{
          left: isSidebarOpen ? "256px" : "0px",
          transition: "left 0.3s ease",
        }}
        title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </>
  );
};

export default ConversationSidebar;

// <button
//         onClick={toggleSidebar}
//         className="
//           absolute top-1/2 -translate-y-1/2 z-20
//           w-5 h-10 flex items-center justify-center
//           bg-white dark:bg-gray-800
//           border border-gray-200 dark:border-gray-700
//           rounded-r-lg shadow-sm
//           text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
//           hover:bg-gray-50 dark:hover:bg-gray-700
//           transition-all duration-200
//         "
//         style={{ left: isSidebarOpen ? "256px" : "0px" }}
//         title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
//       >
//         {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
//       </button>
````

## File: client/src/components/chat/InputBar.jsx
````javascript
import { useState, useRef, useEffect } from "react";
import { Send, Square, Paperclip } from "lucide-react";
import { getBotConfig } from "../../utils/botConfig";

const InputBar = ({ onSend, isStreaming, isTyping, botType, disabled }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const bot = getBotConfig(botType);
  const MAX_CHARS = 2000;

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || isTyping || disabled) return;
    onSend(trimmed);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter (not Shift+Enter)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const remaining = MAX_CHARS - message.length;
  const isNearLimit = remaining < 200;
  const canSend =
    message.trim().length > 0 && !isTyping && !isStreaming && !disabled;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3">
      {/* ── Char counter (only near limit) ───────────── */}
      {isNearLimit && (
        <div className="flex justify-end mb-1">
          <span
            className={`text-xs ${
              remaining < 50
                ? "text-red-500"
                : "text-orange-400 dark:text-orange-500"
            }`}
          >
            {remaining} characters remaining
          </span>
        </div>
      )}

      {/* ── Input container ───────────────────────────── */}
      <div
        className={`
          flex items-end gap-3 px-4 py-3
          bg-gray-50 dark:bg-gray-800
          rounded-2xl border
          transition-all duration-200
          ${
            disabled
              ? "border-gray-200 dark:border-gray-700 opacity-60"
              : `border-gray-200 dark:border-gray-700
                 focus-within:border-${bot?.id === "fitness" ? "green" : bot?.id === "finance" ? "blue" : bot?.id === "science" ? "purple" : bot?.id === "wellness" ? "teal" : "orange"}-400
                 dark:focus-within:border-${bot?.id === "fitness" ? "green" : bot?.id === "finance" ? "blue" : bot?.id === "science" ? "purple" : bot?.id === "wellness" ? "teal" : "orange"}-600
                 focus-within:ring-2
                 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30`
          }
        `}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setMessage(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled
              ? "Select a bot to start chatting..."
              : `Message ${bot?.name || "AI"}... (Enter to send, Shift+Enter for new line)`
          }
          disabled={disabled}
          rows={1}
          className="
            flex-1 resize-none bg-transparent outline-none
            text-sm text-gray-800 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            leading-relaxed max-h-40 overflow-y-auto
            scrollbar-none
          "
        />

        {/* Send button */}
        <button
          onClick={isTyping ? undefined : handleSend}
          disabled={!canSend && !isTyping}
          className={`
            flex-shrink-0 w-9 h-9 rounded-xl
            flex items-center justify-center
            transition-all duration-200
            ${
              canSend || isTyping
                ? `bg-gradient-to-br ${bot?.gradient || "from-blue-500 to-purple-600"}
                   text-white shadow-sm hover:shadow-md active:scale-95`
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
          title={isTyping ? "AI is responding..." : "Send message (Enter)"}
        >
          {isTyping ? (
            <Square size={13} className="fill-current" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </div>

      {/* ── Hint ─────────────────────────────────────── */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default InputBar;
````

## File: client/src/components/chat/MessageBubble.jsx
````javascript
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { getBotConfig } from "../../utils/botConfig";
import { formatTime, copyToClipboard } from "../../utils/helpers";
import { useAuthStore } from "../../store/authStore";
import Avatar from "../shared/Avatar";

// ── Code block ───────────────────────────────────────────────────
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="relative my-2 rounded-xl overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
        <span className="text-xs text-gray-400 font-mono">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="px-4 py-3 bg-gray-900 text-gray-100 text-xs font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ── Parse code blocks ─────────────────────────────────────────────
const parseContent = (content) => {
  const parts = [];
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex)
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    parts.push({
      type: "code",
      language: match[1] || "",
      content: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length)
    parts.push({ type: "text", content: content.slice(lastIndex) });
  return parts.length > 0 ? parts : [{ type: "text", content }];
};

// ── Format text ───────────────────────────────────────────────────
const FormattedText = ({ text }) => {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, li) => {
        if (!line.trim()) return <br key={li} />;
        const isBullet = /^[-•*]\s/.test(line);
        const isNumbered = /^\d+\.\s/.test(line);
        const formatLine = (str) =>
          str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**"))
              return (
                <strong key={i} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            if (part.startsWith("`") && part.endsWith("`"))
              return (
                <code
                  key={i}
                  className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono"
                >
                  {part.slice(1, -1)}
                </code>
              );
            return part;
          });
        if (line.startsWith("### "))
          return (
            <p key={li} className="font-bold text-base mt-2">
              {formatLine(line.slice(4))}
            </p>
          );
        if (line.startsWith("## "))
          return (
            <p key={li} className="font-bold text-lg mt-2">
              {formatLine(line.slice(3))}
            </p>
          );
        if (isBullet)
          return (
            <div key={li} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
              <span>{formatLine(line.replace(/^[-•*]\s/, ""))}</span>
            </div>
          );
        if (isNumbered) {
          const [num, ...rest] = line.split(/\.\s/);
          return (
            <div key={li} className="flex items-start gap-2">
              <span className="font-semibold opacity-70 flex-shrink-0 text-xs mt-0.5">
                {num}.
              </span>
              <span>{formatLine(rest.join(". "))}</span>
            </div>
          );
        }
        return <p key={li}>{formatLine(line)}</p>;
      })}
    </div>
  );
};

// ── Streaming cursor ──────────────────────────────────────────────
const StreamingCursor = () => (
  <span className="inline-block w-0.5 h-4 bg-gray-500 dark:bg-gray-400 ml-0.5 align-middle animate-pulse" />
);

// ── Main MessageBubble ────────────────────────────────────────────
const MessageBubble = ({ message, botType, isStreaming = false }) => {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const bot = getBotConfig(botType);
  const isUser = message.role === "user";
  const parts = parseContent(message.content || "");

  const handleCopyMessage = async () => {
    const ok = await copyToClipboard(message.content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── User bubble ───────────────────────────────────────────────
  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2.5 message-appear group">
        <button
          onClick={handleCopyMessage}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {copied ? (
            <Check size={13} className="text-green-500" />
          ) : (
            <Copy size={13} className="text-gray-400" />
          )}
        </button>
        <div className="flex flex-col items-end gap-1 max-w-[75%]">
          <div
            className={`px-4 py-3 rounded-2xl rounded-br-md ${bot?.userBubble || "bg-blue-500 text-white"} shadow-sm text-sm leading-relaxed`}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 pr-1">
            {formatTime(message.createdAt)}
          </span>
        </div>
        <Avatar user={user} size="sm" className="flex-shrink-0 mb-5" />
      </div>
    );
  }

  // ── AI bubble ─────────────────────────────────────────────────
  return (
    <div className="flex items-end gap-2.5 message-appear group">
      {/* Bot avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex-shrink-0 mb-5
          bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
          flex items-center justify-center text-sm shadow-sm
          ${isStreaming ? "animate-pulse" : ""}
        `}
      >
        {bot?.emoji || "🤖"}
      </div>

      <div className="flex flex-col gap-1 max-w-[75%]">
        {/* Bot name + streaming badge */}
        <div className="flex items-center gap-2 pl-1">
          <span
            className={`text-xs font-semibold ${bot?.text || "text-gray-500"}`}
          >
            {bot?.name}
          </span>
          {isStreaming && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl rounded-bl-md
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            shadow-sm text-sm leading-relaxed
            text-gray-800 dark:text-gray-200
            ${message.isError ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" : ""}
          `}
        >
          {/* Empty streaming state */}
          {isStreaming && !message.content && (
            <div className="flex items-center gap-1.5">
              <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          )}

          {/* Content */}
          {message.content && (
            <>
              {parts.map((part, i) =>
                part.type === "code" ? (
                  <CodeBlock
                    key={i}
                    code={part.content}
                    language={part.language}
                  />
                ) : (
                  <FormattedText key={i} text={part.content} />
                ),
              )}
              {/* Blinking cursor while streaming */}
              {isStreaming && <StreamingCursor />}
            </>
          )}
        </div>

        {/* Timestamp + copy (only when done) */}
        {!isStreaming && (
          <div className="flex items-center gap-2 pl-1">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {formatTime(message.createdAt)}
            </span>
            <button
              onClick={handleCopyMessage}
              className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {copied ? (
                <Check size={11} className="text-green-500" />
              ) : (
                <Copy size={11} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

// import { useState } from "react";
// import { Copy, Check, User } from "lucide-react";
// import { getBotConfig } from "../../utils/botConfig";
// import { formatTime, copyToClipboard } from "../../utils/helpers";
// import { useAuthStore } from "../../store/authStore";
// import Avatar from "../shared/Avatar";

// // ── Code block with copy ─────────────────────────────────────────
// const CodeBlock = ({ code, language }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     const ok = await copyToClipboard(code);
//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <div className="relative my-2 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-600">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
//         <span className="text-xs text-gray-400 font-mono">
//           {language || "code"}
//         </span>
//         <button
//           onClick={handleCopy}
//           className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
//         >
//           {copied ? (
//             <>
//               <Check size={12} className="text-green-400" />
//               <span className="text-green-400">Copied!</span>
//             </>
//           ) : (
//             <>
//               <Copy size={12} />
//               Copy
//             </>
//           )}
//         </button>
//       </div>
//       {/* Code */}
//       <pre className="px-4 py-3 bg-gray-900 text-gray-100 text-xs font-mono overflow-x-auto leading-relaxed">
//         <code>{code}</code>
//       </pre>
//     </div>
//   );
// };

// // ── Parse message content (code blocks + text) ───────────────────
// const parseContent = (content) => {
//   const parts = [];
//   const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
//   let lastIndex = 0;
//   let match;

//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     // Text before code block
//     if (match.index > lastIndex) {
//       parts.push({
//         type: "text",
//         content: content.slice(lastIndex, match.index),
//       });
//     }
//     // Code block
//     parts.push({
//       type: "code",
//       language: match[1] || "",
//       content: match[2].trim(),
//     });
//     lastIndex = match.index + match[0].length;
//   }

//   // Remaining text
//   if (lastIndex < content.length) {
//     parts.push({ type: "text", content: content.slice(lastIndex) });
//   }

//   return parts.length > 0 ? parts : [{ type: "text", content }];
// };

// // ── Format text (bold, inline code, newlines) ────────────────────
// const FormattedText = ({ text }) => {
//   const lines = text.split("\n");

//   return (
//     <div className="space-y-1">
//       {lines.map((line, li) => {
//         if (!line.trim()) return <br key={li} />;

//         // Bullet points
//         const isBullet = /^[-•*]\s/.test(line);
//         const isNumbered = /^\d+\.\s/.test(line);

//         const formatLine = (str) => {
//           const parts = str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
//           return parts.map((part, i) => {
//             if (part.startsWith("**") && part.endsWith("**")) {
//               return (
//                 <strong key={i} className="font-semibold">
//                   {part.slice(2, -2)}
//                 </strong>
//               );
//             }
//             if (part.startsWith("`") && part.endsWith("`")) {
//               return (
//                 <code
//                   key={i}
//                   className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono"
//                 >
//                   {part.slice(1, -1)}
//                 </code>
//               );
//             }
//             return part;
//           });
//         };

//         if (isBullet) {
//           return (
//             <div key={li} className="flex items-start gap-2">
//               <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
//               <span>{formatLine(line.replace(/^[-•*]\s/, ""))}</span>
//             </div>
//           );
//         }

//         if (isNumbered) {
//           const [num, ...rest] = line.split(/\.\s/);
//           return (
//             <div key={li} className="flex items-start gap-2">
//               <span className="font-semibold opacity-70 flex-shrink-0 text-xs mt-0.5">
//                 {num}.
//               </span>
//               <span>{formatLine(rest.join(". "))}</span>
//             </div>
//           );
//         }

//         // Heading lines
//         if (line.startsWith("### ")) {
//           return (
//             <p key={li} className="font-bold text-base mt-2">
//               {formatLine(line.slice(4))}
//             </p>
//           );
//         }
//         if (line.startsWith("## ")) {
//           return (
//             <p key={li} className="font-bold text-lg mt-2">
//               {formatLine(line.slice(3))}
//             </p>
//           );
//         }

//         return <p key={li}>{formatLine(line)}</p>;
//       })}
//     </div>
//   );
// };

// // ── Main MessageBubble ────────────────────────────────────────────
// const MessageBubble = ({ message, botType }) => {
//   const { user } = useAuthStore();
//   const [copied, setCopied] = useState(false);
//   const bot = getBotConfig(botType);
//   const isUser = message.role === "user";
//   const parts = parseContent(message.content);

//   const handleCopyMessage = async () => {
//     const ok = await copyToClipboard(message.content);
//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   if (isUser) {
//     return (
//       <div className="flex items-end justify-end gap-2.5 message-appear group">
//         {/* Copy button */}
//         <button
//           onClick={handleCopyMessage}
//           className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//           title="Copy message"
//         >
//           {copied ? (
//             <Check size={13} className="text-green-500" />
//           ) : (
//             <Copy size={13} className="text-gray-400" />
//           )}
//         </button>

//         <div className="flex flex-col items-end gap-1 max-w-[75%]">
//           {/* Bubble */}
//           <div
//             className={`
//               px-4 py-3 rounded-2xl rounded-br-md
//               ${bot?.userBubble || "bg-blue-500 text-white"}
//               shadow-sm text-sm leading-relaxed
//             `}
//           >
//             <p className="whitespace-pre-wrap break-words">{message.content}</p>
//           </div>
//           {/* Timestamp */}
//           <span className="text-xs text-gray-400 dark:text-gray-500 pr-1">
//             {formatTime(message.createdAt)}
//           </span>
//         </div>

//         {/* User avatar */}
//         <Avatar user={user} size="sm" className="flex-shrink-0 mb-5" />
//       </div>
//     );
//   }

//   // ── AI message ────────────────────────────────────────────────
//   return (
//     <div className="flex items-end gap-2.5 message-appear group">
//       {/* Bot avatar */}
//       <div
//         className={`
//           w-8 h-8 rounded-full flex-shrink-0 mb-5
//           bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
//           flex items-center justify-center text-sm shadow-sm flex-shrink-0
//         `}
//       >
//         {bot?.emoji || "🤖"}
//       </div>

//       <div className="flex flex-col gap-1 max-w-[75%]">
//         {/* Bot name */}
//         <span
//           className={`text-xs font-semibold ${bot?.text || "text-gray-500"} pl-1`}
//         >
//           {bot?.name}
//         </span>

//         {/* Bubble */}
//         <div
//           className={`
//             px-4 py-3 rounded-2xl rounded-bl-md
//             bg-white dark:bg-gray-800
//             border border-gray-100 dark:border-gray-700
//             shadow-sm text-sm leading-relaxed
//             text-gray-800 dark:text-gray-200
//             ${message.isError ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" : ""}
//           `}
//         >
//           {parts.map((part, i) =>
//             part.type === "code" ? (
//               <CodeBlock key={i} code={part.content} language={part.language} />
//             ) : (
//               <FormattedText key={i} text={part.content} />
//             ),
//           )}
//         </div>

//         {/* Timestamp + copy */}
//         <div className="flex items-center gap-2 pl-1">
//           <span className="text-xs text-gray-400 dark:text-gray-500">
//             {formatTime(message.createdAt)}
//           </span>
//           <button
//             onClick={handleCopyMessage}
//             className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//           >
//             {copied ? (
//               <Check size={11} className="text-green-500" />
//             ) : (
//               <Copy size={11} />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;
````

## File: client/src/components/chat/TypingIndicator.jsx
````javascript
import { getBotConfig } from "../../utils/botConfig";

const TypingIndicator = ({ botType }) => {
  const bot = getBotConfig(botType);

  return (
    <div className="flex items-end gap-2.5 message-appear">
      {/* Bot avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex-shrink-0
          bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
          flex items-center justify-center text-sm shadow-sm
        `}
      >
        {bot?.emoji || "🤖"}
      </div>

      {/* Bubble */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
        </div>
      </div>

      {/* Bot name */}
      <span className="text-xs text-gray-400 dark:text-gray-500 mb-1">
        {bot?.name} is typing...
      </span>
    </div>
  );
};

export default TypingIndicator;
````

## File: client/src/components/dashboard/BotCard.jsx
````javascript
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";

const BotCard = ({ bot }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/${bot.id}`)}
      className="
        group relative bg-white dark:bg-gray-800
        rounded-2xl border border-gray-100 dark:border-gray-700
        hover:border-transparent hover:shadow-2xl
        transition-all duration-300 cursor-pointer
        hover:-translate-y-1 overflow-hidden
      "
    >
      {/* ── Top gradient bar ──────────────────────── */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${bot.gradient}`} />

      <div className="p-6">
        {/* ── Header ────────────────────────────────── */}
        <div className="flex items-start justify-between mb-4">
          {/* Bot avatar */}
          <div
            className={`
              w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.gradient}
              flex items-center justify-center text-2xl
              shadow-md group-hover:shadow-lg
              group-hover:scale-110 transition-all duration-300
            `}
          >
            {bot.emoji}
          </div>

          {/* Arrow icon */}
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              bg-gray-100 dark:bg-gray-700
              group-hover:bg-gradient-to-br group-hover:${bot.gradient}
              transition-all duration-300
            `}
          >
            <ArrowRight
              size={14}
              className="
                text-gray-400 dark:text-gray-500
                group-hover:text-white
                group-hover:translate-x-0.5
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* ── Bot info ──────────────────────────────── */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
          {bot.name}
        </h3>
        <p className={`text-xs font-semibold ${bot.text} mb-3`}>
          {bot.tagline}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
          {bot.description}
        </p>

        {/* ── Starter questions ─────────────────────── */}
        <div className="space-y-2 mb-5">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Try asking...
          </p>
          {bot.starters.slice(0, 3).map((starter) => (
            <div
              key={starter}
              className={`
                flex items-start gap-2 px-3 py-2 rounded-lg
                ${bot.bgLight} ${bot.bgDark} ${bot.border} border
                text-xs text-gray-600 dark:text-gray-300
                group-hover:border-opacity-60 transition-colors
              `}
            >
              <MessageSquare
                size={11}
                className={`mt-0.5 flex-shrink-0 ${bot.text}`}
              />
              <span>{starter}</span>
            </div>
          ))}
        </div>

        {/* ── CTA button ────────────────────────────── */}
        <button
          className={`
            w-full py-2.5 rounded-xl text-sm font-semibold
            bg-gradient-to-r ${bot.gradient}
            text-white shadow-sm
            hover:shadow-md active:scale-[0.98]
            transition-all duration-200
            flex items-center justify-center gap-2
          `}
        >
          Start Chatting
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default BotCard;
````

## File: client/src/components/layout/Navbar.jsx
````javascript
import { Link, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  LogOut,
  User,
  History,
  LayoutDashboard,
  Bot,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import Avatar from "../shared/Avatar";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ─────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Bot size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChatAI
            </span>
          </Link>

          {/* ── Right Side ───────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Nav Links */}
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>

                <Link
                  to="/history"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                >
                  <History size={15} />
                  History
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <Avatar user={user} size="sm" />
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                      {user?.name}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <User size={15} />
                          Profile Settings
                        </Link>

                        <Link
                          to="/history"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors sm:hidden"
                        >
                          <History size={15} />
                          Chat History
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut size={15} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
````

## File: client/src/components/layout/ProtectedRoute.jsx
````javascript
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Loader from "../shared/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
````

## File: client/src/components/layout/PublicRoute.jsx
````javascript
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
````

## File: client/src/components/shared/Avatar.jsx
````javascript
import { getInitials, stringToColor } from "../../utils/helpers";

const Avatar = ({ user, size = "md", className = "" }) => {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const colorClass = stringToColor(user?.name || "User");

  if (user?.avatar?.url) {
    return (
      <img
        src={user.avatar.url}
        alt={user.name}
        className={`
          ${sizes[size]} rounded-full object-cover
          ring-2 ring-white dark:ring-gray-800
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizes[size]} ${colorClass}
        rounded-full flex items-center justify-center
        text-white font-semibold select-none
        ring-2 ring-white dark:ring-gray-800
        ${className}
      `}
    >
      {getInitials(user?.name)}
    </div>
  );
};

export default Avatar;
````

## File: client/src/components/shared/ConfirmModal.jsx
````javascript
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmClass = "bg-red-500 hover:bg-red-600 text-white",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          <X size={15} />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={22} className="text-red-500" />
          </div>

          {/* Text */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white text-center mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 flex items-center justify-center gap-2 ${confirmClass}`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
````

## File: client/src/components/shared/Loader.jsx
````javascript
const Loader = ({ size = "md", color = "blue", fullScreen = false }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    white: "border-white",
  };

  const spinner = (
    <div
      className={`
        ${sizes[size]} ${colors[color]}
        rounded-full border-t-transparent animate-spin
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
};

export default Loader;
````

## File: client/src/index.css
````css
@import "tailwindcss";

@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  --font-sans: "Inter", system-ui, sans-serif;
}

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 9999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  .dark ::-webkit-scrollbar-thumb {
    background: #374151;
  }

  .dark ::-webkit-scrollbar-thumb:hover {
    background: #4b5563;
  }
}

@layer utilities {
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  .chat-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .dark .glass {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .message-appear {
    animation: messageAppear 0.3s ease-out forwards;
  }

  @keyframes messageAppear {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .typing-dot {
    animation: typingBounce 1.4s infinite ease-in-out;
  }

  .typing-dot:nth-child(1) {
    animation-delay: 0s;
  }
  .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typingBounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-6px);
    }
  }
}
````

## File: client/src/main.jsx
````javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
````

## File: client/src/pages/ChatPage.jsx
````javascript
import { useEffect, useCallback, useRef } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  ArrowLeft,
  LayoutDashboard,
  Plus,
  PanelLeftOpen,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { getBotConfig } from "../utils/botConfig";
import { useAuthStore } from "../store/authStore";
import {
  getSocket,
  joinConversation,
  leaveConversation,
  isSocketConnected,
} from "../services/socketService";
import ConversationSidebar from "../components/chat/ConversationSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import InputBar from "../components/chat/InputBar";
import toast from "react-hot-toast";
import { useState } from "react";

// ── Chat Header ──────────────────────────────────────────────────
const ChatHeader = ({
  bot,
  isSidebarOpen,
  toggleSidebar,
  onNewChat,
  isConnected,
}) => (
  <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
    <div className="flex items-center gap-3">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <PanelLeftOpen size={18} />
      </button>

      <Link
        to="/dashboard"
        className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <ArrowLeft size={16} />
      </Link>

      {/* Bot info */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex-shrink-0 bg-gradient-to-br ${bot?.gradient} flex items-center justify-center text-lg shadow-sm`}
        >
          {bot?.emoji}
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
            {bot?.name}
          </h1>
          <p className={`text-xs ${bot?.text} font-medium`}>{bot?.tagline}</p>
        </div>
      </div>

      {/* Connection status */}
      <div
        className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${isConnected ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
      >
        {isConnected ? (
          <>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              Live
            </span>
          </>
        ) : (
          <>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            <span className="text-xs font-medium text-red-500 dark:text-red-400">
              Offline
            </span>
          </>
        )}
      </div>
    </div>

    {/* Right */}
    <div className="flex items-center gap-2">
      <button
        onClick={onNewChat}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
      >
        <Plus size={13} />
        New Chat
      </button>
      <Link
        to="/dashboard"
        className="sm:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <LayoutDashboard size={16} />
      </Link>
    </div>
  </header>
);

// ── Main ChatPage ────────────────────────────────────────────────
const ChatPage = () => {
  const { botType } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const convId = searchParams.get("conv");
  const [isConnected, setIsConnected] = useState(isSocketConnected());
  const listenersRef = useRef(false);

  const {
    setCurrentBot,
    startNewChat,
    sendMessage,
    loadConversation,
    toggleSidebar,
    isSidebarOpen,
    isTyping,
    isStreaming,
    currentConversationId,
    onMessageSaved,
    onAiTypingStart,
    onAiChunk,
    onAiDone,
    onAiError,
  } = useChatStore();

  const { user } = useAuthStore();
  const bot = getBotConfig(botType);

  // ── Guard invalid bot ────────────────────────────────────────
  useEffect(() => {
    if (!bot) {
      navigate("/dashboard");
      return;
    }
    setCurrentBot(botType);
  }, [botType]);

  // ── Load conversation from URL ───────────────────────────────
  useEffect(() => {
    if (convId && bot) {
      loadConversation(convId).catch(() => {
        toast.error("Conversation not found");
        navigate(`/chat/${botType}`);
      });
    }
  }, [convId]);

  // ── Join socket room when conversation changes ───────────────
  useEffect(() => {
    if (currentConversationId) {
      joinConversation(currentConversationId);
    }
  }, [currentConversationId]);

  // ── Setup socket listeners ONCE ──────────────────────────────
  useEffect(() => {
    if (listenersRef.current) return;
    const socket = getSocket();
    if (!socket) return;

    listenersRef.current = true;

    // Connection state
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    // Message flow
    socket.on("message_saved", onMessageSaved);
    socket.on("ai_typing_start", onAiTypingStart);
    socket.on("ai_chunk", onAiChunk);
    socket.on("ai_done", onAiDone);
    socket.on("ai_error", (data) => {
      onAiError(data);
      toast.error(data.message || "AI error occurred");
    });

    // Generic error
    socket.on("error", (data) => {
      toast.error(data.message || "Something went wrong");
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_saved");
      socket.off("ai_typing_start");
      socket.off("ai_chunk");
      socket.off("ai_done");
      socket.off("ai_error");
      socket.off("error");
      listenersRef.current = false;

      if (currentConversationId) {
        leaveConversation(currentConversationId);
      }
    };
  }, []);

  // ── Handlers ─────────────────────────────────────────────────
  const handleSend = useCallback(
    async (message) => {
      const result = await sendMessage(message);
      if (result && !result.success) {
        toast.error(result.message || "Failed to send message");
      }
    },
    [sendMessage],
  );

  const handleNewChat = useCallback(() => {
    startNewChat();
    navigate(`/chat/${botType}`);
  }, [botType]);

  if (!bot) return null;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="relative flex h-full">
        <ConversationSidebar botType={botType} />
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          bot={bot}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onNewChat={handleNewChat}
          isConnected={isConnected}
        />

        <ChatWindow botType={botType} onSendMessage={handleSend} />

        <InputBar
          onSend={handleSend}
          isTyping={isTyping}
          isStreaming={isStreaming} // ← pass streaming
          botType={botType}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default ChatPage;

// import { useEffect, useCallback } from "react";
// import {
//   useParams,
//   useSearchParams,
//   useNavigate,
//   Link,
// } from "react-router-dom";
// import { ArrowLeft, LayoutDashboard, Plus, PanelLeftOpen } from "lucide-react";
// import { useChatStore } from "../store/chatStore";
// import { getBotConfig } from "../utils/botConfig";
// import { useAuthStore } from "../store/authStore";
// import ConversationSidebar from "../components/chat/ConversationSidebar";
// import ChatWindow from "../components/chat/ChatWindow";
// import InputBar from "../components/chat/InputBar";
// import toast from "react-hot-toast";

// // ── Chat Header ──────────────────────────────────────────────────
// const ChatHeader = ({
//   bot,
//   currentConversationId,
//   isSidebarOpen,
//   toggleSidebar,
//   onNewChat,
//   user,
// }) => (
//   <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
//     <div className="flex items-center gap-3">
//       {/* Sidebar toggle (mobile) */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//       >
//         <PanelLeftOpen size={18} />
//       </button>

//       {/* Back to dashboard */}
//       <Link
//         to="/dashboard"
//         className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//         title="Back to Dashboard"
//       >
//         <ArrowLeft size={16} />
//       </Link>

//       {/* Bot info */}
//       <div className="flex items-center gap-3">
//         <div
//           className={`
//             w-9 h-9 rounded-xl flex-shrink-0
//             bg-gradient-to-br ${bot?.gradient}
//             flex items-center justify-center text-lg shadow-sm
//           `}
//         >
//           {bot?.emoji}
//         </div>
//         <div>
//           <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
//             {bot?.name}
//           </h1>
//           <p className={`text-xs ${bot?.text} font-medium`}>{bot?.tagline}</p>
//         </div>
//       </div>

//       {/* Active indicator */}
//       <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
//         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//         <span className="text-xs font-medium text-green-600 dark:text-green-400">
//           Online
//         </span>
//       </div>
//     </div>

//     {/* Right actions */}
//     <div className="flex items-center gap-2">
//       {/* New chat */}
//       <button
//         onClick={onNewChat}
//         className="
//           flex items-center gap-1.5 px-3 py-1.5
//           text-xs font-semibold
//           border border-gray-200 dark:border-gray-700
//           text-gray-600 dark:text-gray-300
//           hover:bg-gray-50 dark:hover:bg-gray-800
//           rounded-xl transition-all
//         "
//       >
//         <Plus size={13} />
//         New Chat
//       </button>

//       {/* Dashboard link (mobile) */}
//       <Link
//         to="/dashboard"
//         className="
//           sm:hidden p-2 rounded-xl
//           text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
//           hover:bg-gray-100 dark:hover:bg-gray-800
//           transition-all
//         "
//       >
//         <LayoutDashboard size={16} />
//       </Link>
//     </div>
//   </header>
// );

// // ── Main ChatPage ────────────────────────────────────────────────
// const ChatPage = () => {
//   const { botType } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const convId = searchParams.get("conv");

//   const {
//     setCurrentBot,
//     startNewChat,
//     sendMessage,
//     loadConversation,
//     toggleSidebar,
//     isSidebarOpen,
//     isTyping,
//     currentConversationId,
//   } = useChatStore();

//   const { user } = useAuthStore();
//   const bot = getBotConfig(botType);

//   // ── Guard: invalid bot type ──────────────────────
//   useEffect(() => {
//     if (!bot) {
//       navigate("/dashboard");
//       return;
//     }
//     setCurrentBot(botType);
//   }, [botType]);

//   // ── Load conversation from URL param ────────────
//   useEffect(() => {
//     if (convId && bot) {
//       loadConversation(convId).catch(() => {
//         toast.error("Conversation not found");
//         navigate(`/chat/${botType}`);
//       });
//     }
//   }, [convId]);

//   // ── Send message handler ─────────────────────────
//   const handleSend = useCallback(
//     async (message) => {
//       const result = await sendMessage(message);
//       if (!result.success) {
//         toast.error(result.message || "Failed to send message");
//       }
//     },
//     [sendMessage],
//   );

//   // ── New chat handler ─────────────────────────────
//   const handleNewChat = useCallback(() => {
//     startNewChat();
//     navigate(`/chat/${botType}`);
//   }, [botType]);

//   if (!bot) return null;

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 overflow-hidden">
//       {/* ── Sidebar container ─────────────────────── */}
//       <div className="relative flex h-full">
//         <ConversationSidebar botType={botType} />
//       </div>

//       {/* ── Main chat area ────────────────────────── */}
//       <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-gray-850">
//         {/* Header */}
//         <ChatHeader
//           bot={bot}
//           currentConversationId={currentConversationId}
//           isSidebarOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//           onNewChat={handleNewChat}
//           user={user}
//         />

//         {/* Messages */}
//         <ChatWindow botType={botType} onSendMessage={handleSend} />

//         {/* Input */}
//         <InputBar
//           onSend={handleSend}
//           isTyping={isTyping}
//           botType={botType}
//           disabled={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
````

## File: client/src/pages/DashboardPage.jsx
````javascript
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  History,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { BOT_LIST, getBotConfig } from "../utils/botConfig";
import { formatDate } from "../utils/helpers";
import BotCard from "../components/dashboard/BotCard";
import Avatar from "../components/shared/Avatar";

// ── Stats Bar ────────────────────────────────────────────────────
const StatsBar = ({ conversations, user }) => {
  const totalMessages = conversations.reduce(
    (sum, c) => sum + (c.messageCount || 0),
    0,
  );

  // Most used bot
  const botCounts = conversations.reduce((acc, c) => {
    acc[c.botType] = (acc[c.botType] || 0) + 1;
    return acc;
  }, {});
  const topBot = Object.entries(botCounts).sort((a, b) => b[1] - a[1])[0];
  const topBotConfig = topBot ? getBotConfig(topBot[0]) : null;

  const stats = [
    {
      icon: <MessageSquare size={18} className="text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      label: "Total Chats",
      value: conversations.length,
    },
    {
      icon: <TrendingUp size={18} className="text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      label: "Messages Sent",
      value: totalMessages,
    },
    {
      icon: <Sparkles size={18} className="text-purple-500" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      label: "Favourite Bot",
      value: topBotConfig ? `${topBotConfig.emoji} ${topBotConfig.name}` : "—",
    },
    {
      icon: <Clock size={18} className="text-orange-500" />,
      bg: "bg-orange-50 dark:bg-orange-900/20",
      label: "Member Since",
      value: formatDate(user?.createdAt || new Date()),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700"
        >
          <div
            className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}
          >
            {stat.icon}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

// ── Recent Conversations ──────────────────────────────────────────
const RecentConversations = ({ conversations }) => {
  if (!conversations.length) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Recent Conversations
        </h2>
        <Link
          to="/history"
          className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors"
        >
          View all
          <History size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {conversations.slice(0, 6).map((conv) => {
          const bot = getBotConfig(conv.botType);
          if (!bot) return null;
          return (
            <Link
              key={conv._id}
              to={`/chat/${conv.botType}?conv=${conv._id}`}
              className="
                flex items-start gap-3 p-4
                bg-white dark:bg-gray-800
                rounded-xl border border-gray-100 dark:border-gray-700
                hover:border-gray-200 dark:hover:border-gray-600
                hover:shadow-md transition-all duration-200
              "
            >
              {/* Bot emoji */}
              <div
                className={`
                  w-10 h-10 rounded-xl flex-shrink-0
                  bg-gradient-to-br ${bot.gradient}
                  flex items-center justify-center text-lg
                `}
              >
                {bot.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-xs font-semibold ${bot.text}`}>
                    {bot.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {formatDate(conv.updatedAt)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {conv.title}
                </p>
                {conv.lastMessage && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────
const DashboardPage = () => {
  const { user } = useAuthStore();
  const { conversations, loadConversations } = useChatStore();

  useEffect(() => {
    loadConversations();
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Welcome Header ──────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar user={user} size="lg" />
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {getGreeting()} 👋
              </p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h1>
            </div>
          </div>

          <Link
            to="/history"
            className="
              hidden sm:flex items-center gap-2 px-4 py-2
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-sm font-medium text-gray-600 dark:text-gray-300
              rounded-xl hover:shadow-sm transition-all
            "
          >
            <History size={15} />
            Chat History
          </Link>
        </div>

        {/* ── Stats ───────────────────────────────────── */}
        <StatsBar conversations={conversations} user={user} />

        {/* ── Recent conversations ─────────────────────── */}
        <RecentConversations conversations={conversations} />

        {/* ── Bot Grid ────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} className="text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Choose Your AI Assistant
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {BOT_LIST.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
````

## File: client/src/pages/HistoryPage.jsx
````javascript
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  History,
  Search,
  Filter,
  Trash2,
  MessageSquare,
  Calendar,
  ChevronRight,
  SlidersHorizontal,
  X,
  RefreshCw,
} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { getBotConfig, BOT_LIST } from "../utils/botConfig";
import { formatDate } from "../utils/helpers";
import ConfirmModal from "../components/shared/ConfirmModal";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";

// ── Filter bar ───────────────────────────────────────────────────
const FilterBar = ({
  activeBot,
  onBotChange,
  search,
  onSearchChange,
  onClear,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search conversations..."
          className="
            w-full pl-10 pr-4 py-2.5 text-sm
            bg-gray-50 dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            rounded-xl outline-none
            text-gray-800 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            focus:border-blue-400 dark:focus:border-blue-600
            focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30
            transition-all
          "
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Bot filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
          <SlidersHorizontal size={13} />
          <span>Filter:</span>
        </div>

        {/* All */}
        <button
          onClick={() => onBotChange("")}
          className={`
            flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold
            transition-all duration-150
            ${
              !activeBot
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }
          `}
        >
          All
        </button>

        {BOT_LIST.map((bot) => (
          <button
            key={bot.id}
            onClick={() => onBotChange(bot.id)}
            className={`
              flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
              transition-all duration-150
              ${
                activeBot === bot.id
                  ? `bg-gradient-to-r ${bot.gradient} text-white shadow-sm`
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
            `}
          >
            <span>{bot.emoji}</span>
            <span>{bot.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ── Conversation card ────────────────────────────────────────────
const ConversationCard = ({ conversation, onOpen, onDelete }) => {
  const bot = getBotConfig(conversation.botType);
  if (!bot) return null;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Top color bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${bot.gradient}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Bot avatar */}
          <div
            className={`
              w-11 h-11 rounded-xl flex-shrink-0
              bg-gradient-to-br ${bot.gradient}
              flex items-center justify-center text-xl shadow-sm
            `}
          >
            {bot.emoji}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className={`text-xs font-bold ${bot.text}`}>
                  {bot.name}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 leading-snug">
                  {conversation.title}
                </h3>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => onDelete(conversation._id)}
                  className="
                    p-1.5 rounded-lg text-gray-300 dark:text-gray-600
                    hover:text-red-500 dark:hover:text-red-400
                    hover:bg-red-50 dark:hover:bg-red-900/20
                    transition-all opacity-0 group-hover:opacity-100
                  "
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Last message preview */}
            {conversation.lastMessage && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                {conversation.lastMessage}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare size={11} />
                  <span>{conversation.messageCount || 0} messages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={11} />
                  <span>{formatDate(conversation.updatedAt)}</span>
                </div>
              </div>

              {/* Open button */}
              <button
                onClick={() => onOpen(conversation)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5
                  bg-gradient-to-r ${bot.gradient}
                  text-white text-xs font-semibold rounded-lg
                  hover:shadow-md active:scale-[0.98]
                  transition-all duration-150
                `}
              >
                Open
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Empty state ──────────────────────────────────────────────────
const EmptyState = ({ hasFilters, onReset }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-4">
      <History size={28} className="text-gray-300 dark:text-gray-600" />
    </div>
    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
      {hasFilters ? "No matching conversations" : "No conversations yet"}
    </h3>
    <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mb-6">
      {hasFilters
        ? "Try adjusting your search or filter to find what you're looking for."
        : "Start chatting with any of your AI assistants to see your history here."}
    </p>
    {hasFilters ? (
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <X size={14} />
        Clear Filters
      </button>
    ) : (
      <a
        href="/dashboard"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
      >
        Start Chatting
        <ChevronRight size={14} />
      </a>
    )}
  </div>
);

// ── Main HistoryPage ──────────────────────────────────────────────
const HistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeBotFilter, setActiveBotFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    conversations,
    totalConversations,
    isLoading,
    loadConversations,
    deleteConversation,
    clearAllConversations,
    loadConversation,
  } = useChatStore();

  // Load on mount + filter change
  useEffect(() => {
    loadConversations({ botType: activeBotFilter || undefined });
  }, [activeBotFilter]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadConversations({ botType: activeBotFilter || undefined });
    setIsRefreshing(false);
  };

  // Open conversation
  const handleOpen = useCallback(async (conversation) => {
    try {
      await loadConversation(conversation._id);
      navigate(`/chat/${conversation.botType}?conv=${conversation._id}`);
    } catch {
      toast.error("Failed to load conversation");
    }
  }, []);

  // Delete single
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget === "all") {
        await clearAllConversations();
        toast.success("All conversations cleared");
      } else {
        await deleteConversation(deleteTarget);
        toast.success("Conversation deleted");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Client-side search filter
  const filtered = conversations.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q)
    );
  });

  const hasFilters = !!search || !!activeBotFilter;

  // Group by date
  const grouped = filtered.reduce((acc, conv) => {
    const date = new Date(conv.updatedAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let label;
    if (date.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else if (date > new Date(today.setDate(today.getDate() - 7))) {
      label = "This Week";
    } else {
      label = "Older";
    }

    if (!acc[label]) acc[label] = [];
    acc[label].push(conv);
    return acc;
  }, {});

  const groupOrder = ["Today", "Yesterday", "This Week", "Older"];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Page header ──────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <History size={20} className="text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Chat History
              </h1>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {totalConversations} conversation
              {totalConversations !== 1 ? "s" : ""} total
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                size={15}
                className={isRefreshing ? "animate-spin" : ""}
              />
            </button>

            {/* Clear all */}
            {conversations.length > 0 && (
              <button
                onClick={() => setDeleteTarget("all")}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              >
                <Trash2 size={13} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* ── Filter bar ─────────────────────────────── */}
        <FilterBar
          activeBot={activeBotFilter}
          onBotChange={setActiveBotFilter}
          search={search}
          onSearchChange={setSearch}
        />

        {/* ── Content ──────────────────────────────── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader size="lg" color="blue" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Loading conversations...
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onReset={() => {
              setSearch("");
              setActiveBotFilter("");
            }}
          />
        ) : (
          <div className="space-y-8">
            {groupOrder.map((label) => {
              const group = grouped[label];
              if (!group?.length) return null;
              return (
                <div key={label}>
                  {/* Group label */}
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {label}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {group.length}
                    </span>
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {group.map((conv) => (
                      <ConversationCard
                        key={conv._id}
                        conversation={conv}
                        onOpen={handleOpen}
                        onDelete={(id) => setDeleteTarget(id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Confirm Modal ──────────────────────────── */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title={
          deleteTarget === "all"
            ? "Clear all conversations?"
            : "Delete this conversation?"
        }
        message={
          deleteTarget === "all"
            ? "All your conversations will be permanently deleted. This cannot be undone."
            : "This conversation and all its messages will be permanently deleted."
        }
        confirmText={deleteTarget === "all" ? "Clear All" : "Delete"}
      />
    </main>
  );
};

export default HistoryPage;
````

## File: client/src/pages/HomePage.jsx
````javascript
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  History,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { BOT_LIST } from "../utils/botConfig";

// ── Hero Section ───────────────────────────────────────────────
const HeroSection = ({ isAuthenticated }) => (
  <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 pb-20">
    {/* Background gradient */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60" />
    </div>

    <div className="relative max-w-5xl mx-auto px-6 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
        <Sparkles size={14} />
        Powered by Claude AI
        <Sparkles size={14} />
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
        Your Personal{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          AI Assistants
        </span>
        <br />
        for Every Goal
      </h1>

      <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Five specialized AI chatbots — fitness, finance, science, wellness, and
        coding. Get expert guidance in every area of your life, available 24/7.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="
            flex items-center gap-2 px-8 py-3.5
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:from-blue-600 hover:to-purple-700
            text-white font-semibold rounded-2xl
            shadow-lg hover:shadow-xl
            transition-all duration-200 text-sm
            active:scale-[0.98]
          "
        >
          {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
          <ArrowRight size={16} />
        </Link>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="
              flex items-center gap-2 px-8 py-3.5
              border border-gray-200 dark:border-gray-700
              text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-800
              font-semibold rounded-2xl text-sm
              transition-all duration-200
            "
          >
            Sign In
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Social proof */}
      <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-400 dark:text-gray-500">
        {[
          {
            icon: <Star size={14} className="text-yellow-400" />,
            text: "4.9/5 rating",
          },
          {
            icon: <Zap size={14} className="text-blue-400" />,
            text: "Instant responses",
          },
          {
            icon: <Shield size={14} className="text-green-400" />,
            text: "Secure & private",
          },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5">
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Bot Cards Section ───────────────────────────────────────────
const BotShowcase = ({ isAuthenticated }) => (
  <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Your AI Team
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Each bot is a specialist trained with deep domain expertise and a
          unique personality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOT_LIST.map((bot) => (
          <Link
            key={bot.id}
            to={isAuthenticated ? `/chat/${bot.id}` : "/register"}
            className="
              group relative bg-white dark:bg-gray-800
              rounded-2xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-transparent hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Gradient top bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${bot.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Bot emoji */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.gradient} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
            >
              {bot.emoji}
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {bot.name}
            </h3>
            <p className={`text-xs font-semibold ${bot.text} mb-3`}>
              {bot.tagline}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              {bot.description}
            </p>

            {/* Sample starters */}
            <div className="space-y-1.5">
              {bot.starters.slice(0, 2).map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-2 text-xs text-gray-400 dark:text-gray-500"
                >
                  <ChevronRight size={12} className="mt-0.5 flex-shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`mt-4 flex items-center gap-1 text-xs font-semibold ${bot.text} group-hover:gap-2 transition-all`}
            >
              Chat now <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ── Features Section ────────────────────────────────────────────
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap size={22} className="text-yellow-500" />,
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      title: "Lightning Fast",
      desc: "Get AI responses in under 2 seconds. No waiting, no delays — just instant expert answers whenever you need them.",
    },
    {
      icon: <History size={22} className="text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      title: "Full Chat History",
      desc: "Every conversation is saved automatically. Pick up exactly where you left off, across any device.",
    },
    {
      icon: <Shield size={22} className="text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      title: "Secure by Design",
      desc: "Your data is protected with JWT auth, encrypted cookies, and rate limiting. Your privacy is our priority.",
    },
    {
      icon: <Bot size={22} className="text-purple-500" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      title: "Expert Personalities",
      desc: "Each bot has a unique system prompt crafted by domain experts — not generic AI, but specialized intelligence.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why ChatAI?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Built for real people with real goals. Not just another chatbot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA Section ─────────────────────────────────────────────────
const CTASection = ({ isAuthenticated }) => (
  <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-3xl mx-auto px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Ready to meet your AI team?
      </h2>
      <p className="text-blue-100 text-lg mb-8">
        Start chatting for free. No credit card required.
      </p>
      <Link
        to={isAuthenticated ? "/dashboard" : "/register"}
        className="
          inline-flex items-center gap-2
          px-8 py-3.5 bg-white
          text-blue-600 font-bold rounded-2xl
          hover:bg-blue-50 shadow-xl
          transition-all duration-200 text-sm
          active:scale-[0.98]
        "
      >
        {isAuthenticated ? "Open Dashboard" : "Start for Free"}
        <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

// ── Footer ───────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Bot size={14} className="text-white" />
        </div>
        <span className="text-white font-bold">ChatAI</span>
      </div>
      <p className="text-sm text-center">
        © {new Date().getFullYear()} ChatAI. Built with MERN Stack + Claude AI.
      </p>
      <div className="flex items-center gap-4 text-sm">
        <span className="hover:text-white cursor-pointer transition-colors">
          Privacy
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          Terms
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          Contact
        </span>
      </div>
    </div>
  </footer>
);

// ── Main HomePage ────────────────────────────────────────────────
const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="overflow-hidden">
      <HeroSection isAuthenticated={isAuthenticated} />
      <BotShowcase isAuthenticated={isAuthenticated} />
      <FeaturesSection />
      <CTASection isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
};

export default HomePage;
````

## File: client/src/pages/LoginPage.jsx
````javascript
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex">
      {/* ── Left Panel (decorative) ─────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
              5 Specialized AI Assistants
            </span>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Your personal AI squad is waiting
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              From crushing fitness goals to mastering finances — get expert
              guidance across every area of your life.
            </p>
          </div>

          {/* Bot showcase */}
          <div className="space-y-3">
            {[
              {
                emoji: "💪",
                name: "FitBot",
                desc: "Workout & Nutrition plans",
              },
              {
                emoji: "💰",
                name: "FinBot",
                desc: "Budget & Investment advice",
              },
              {
                emoji: "🔬",
                name: "SciBot",
                desc: "Physics, Chemistry, Biology",
              },
              {
                emoji: "🧘",
                name: "ZenBot",
                desc: "Mental wellness & mindfulness",
              },
              { emoji: "👨‍💻", name: "CodeBot", desc: "Programming & DSA help" },
            ].map((bot) => (
              <div
                key={bot.name}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
              >
                <span className="text-2xl">{bot.emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{bot.name}</p>
                  <p className="text-blue-200 text-xs">{bot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ──────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
````

## File: client/src/pages/ProfilePage.jsx
````javascript
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Shield,
  Check,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { useChatStore } from "../store/chatStore";
import { authService } from "../services/authService";
import Avatar from "../components/shared/Avatar";
import ConfirmModal from "../components/shared/ConfirmModal";
import toast from "react-hot-toast";

// ── Schemas ──────────────────────────────────────────────────────
const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Section wrapper ───────────────────────────────────────────────
const Section = ({ title, subtitle, icon: Icon, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <Icon size={16} className="text-blue-500" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── Avatar uploader ───────────────────────────────────────────────
const AvatarSection = ({ user, onUpdate }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (f.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      toast.error("Only JPG, PNG, or WebP allowed");
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await authService.updateProfile(formData);
      onUpdate(res.user);
      setPreview(null);
      setFile(null);
      toast.success("Avatar updated!");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-100 dark:ring-blue-900/30"
          />
        ) : (
          <div className="w-20 h-20">
            <Avatar user={user} size="xl" />
          </div>
        )}
        {/* Camera overlay */}
        <button
          onClick={() => fileRef.current?.click()}
          className="
            absolute -bottom-1 -right-1
            w-7 h-7 bg-blue-500 hover:bg-blue-600
            rounded-full flex items-center justify-center
            shadow-lg transition-colors
          "
        >
          <Camera size={13} className="text-white" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Info + actions */}
      <div className="flex-1 text-center sm:text-left">
        <p className="text-base font-bold text-gray-900 dark:text-white mb-0.5">
          {user?.name}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">
          {user?.email}
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Change Photo
          </button>
          {file && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all disabled:opacity-60"
            >
              {isUploading ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Check size={12} />
              )}
              {isUploading ? "Uploading..." : "Save Photo"}
            </button>
          )}
          {file && (
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          JPG, PNG, or WebP — max 2MB
        </p>
      </div>
    </div>
  );
};

// ── Input field ───────────────────────────────────────────────────
const Field = ({ label, error, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label}
    </label>
    {children}
    {hint && !error && (
      <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">{hint}</p>
    )}
    {error && (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <AlertTriangle size={11} /> {error.message}
      </p>
    )}
  </div>
);

const inputClass = (hasError) => `
  w-full px-4 py-2.5 text-sm rounded-xl border outline-none
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  transition-all duration-200
  ${
    hasError
      ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-500/20"
      : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20"
  }
`;

// ── Main ProfilePage ──────────────────────────────────────────────
const ProfilePage = () => {
  const { user, updateUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { clearAllConversations } = useChatStore();

  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPw, setIsSavingPw] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeletingData, setIsDeletingData] = useState(false);

  // ── Profile form ─────────────────────────────────
  const {
    register: regProfile,
    handleSubmit: handleProfile,
    formState: { errors: profileErrors, isDirty: profileDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "" },
  });

  // ── Password form ─────────────────────────────────
  const {
    register: regPw,
    handleSubmit: handlePw,
    reset: resetPw,
    formState: { errors: pwErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // ── Save profile ─────────────────────────────────
  const onSaveProfile = async (data) => {
    setIsSavingProfile(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      const res = await authService.updateProfile(formData);
      updateUser(res.user);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // ── Change password ──────────────────────────────
  const onChangePassword = async (data) => {
    setIsSavingPw(true);
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      resetPw();
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setIsSavingPw(false);
    }
  };

  // ── Clear all data ────────────────────────────────
  const handleClearData = async () => {
    setIsDeletingData(true);
    try {
      await clearAllConversations();
      toast.success("All conversation data cleared");
    } catch {
      toast.error("Failed to clear data");
    } finally {
      setIsDeletingData(false);
      setDeleteModal(false);
    }
  };

  // ── Theme change also persists to backend ─────────
  const handleThemeToggle = async () => {
    toggleTheme();
    const newTheme = theme === "light" ? "dark" : "light";
    try {
      const formData = new FormData();
      formData.append("theme", newTheme);
      const res = await authService.updateProfile(formData);
      updateUser(res.user);
    } catch (_) {}
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── Page title ──────────────────────────── */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile & Settings
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Manage your account preferences and security
          </p>
        </div>

        {/* ── Avatar section ──────────────────────── */}
        <Section
          title="Your Photo"
          subtitle="This will be displayed on your profile"
          icon={Camera}
        >
          <AvatarSection user={user} onUpdate={updateUser} />
        </Section>

        {/* ── Profile info ────────────────────────── */}
        <Section
          title="Personal Information"
          subtitle="Update your name and email"
          icon={User}
        >
          <form
            onSubmit={handleProfile(onSaveProfile)}
            className="space-y-4"
            noValidate
          >
            {/* Name */}
            <Field label="Full Name" error={profileErrors.name}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User size={15} className="text-gray-400" />
                </div>
                <input
                  {...regProfile("name")}
                  type="text"
                  placeholder="Your full name"
                  className={`${inputClass(!!profileErrors.name)} pl-10`}
                />
              </div>
            </Field>

            {/* Email (read-only) */}
            <Field
              label="Email Address"
              hint="Email cannot be changed after registration"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={15} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="
                    w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border
                    bg-gray-50 dark:bg-gray-900
                    border-gray-200 dark:border-gray-700
                    text-gray-400 dark:text-gray-500
                    cursor-not-allowed outline-none
                  "
                />
              </div>
            </Field>

            {/* Save */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={isSavingProfile || !profileDirty}
                className="
                  flex items-center gap-2 px-5 py-2.5
                  bg-blue-500 hover:bg-blue-600
                  disabled:bg-gray-200 dark:disabled:bg-gray-700
                  disabled:text-gray-400 dark:disabled:text-gray-500
                  text-white text-sm font-semibold rounded-xl
                  transition-all disabled:cursor-not-allowed
                  active:scale-[0.98]
                "
              >
                {isSavingProfile ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {isSavingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Section>

        {/* ── Appearance ──────────────────────────── */}
        <Section
          title="Appearance"
          subtitle="Choose your preferred theme"
          icon={Sun}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-yellow-50 border border-yellow-100"
                  }
                `}
              >
                {theme === "dark" ? (
                  <Moon size={18} className="text-blue-400" />
                ) : (
                  <Sun size={18} className="text-yellow-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {theme === "dark"
                    ? "Easy on eyes in low light"
                    : "Bright and clean interface"}
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={handleThemeToggle}
              className={`
                relative w-12 h-6 rounded-full transition-colors duration-300
                ${theme === "dark" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}
              `}
            >
              <div
                className={`
                  absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md
                  transition-transform duration-300
                  ${theme === "dark" ? "translate-x-6" : "translate-x-0.5"}
                `}
              />
            </button>
          </div>
        </Section>

        {/* ── Change password ──────────────────────── */}
        <Section
          title="Change Password"
          subtitle="Use a strong password with letters and numbers"
          icon={Lock}
        >
          <form
            onSubmit={handlePw(onChangePassword)}
            className="space-y-4"
            noValidate
          >
            {/* Current password */}
            <Field label="Current Password" error={pwErrors.currentPassword}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={15} className="text-gray-400" />
                </div>
                <input
                  {...regPw("currentPassword")}
                  type={showCurrentPw ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass(!!pwErrors.currentPassword)} pl-10 pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showCurrentPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            {/* New password */}
            <Field label="New Password" error={pwErrors.newPassword}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={15} className="text-gray-400" />
                </div>
                <input
                  {...regPw("newPassword")}
                  type={showNewPw ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass(!!pwErrors.newPassword)} pl-10 pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            {/* Confirm new password */}
            <Field
              label="Confirm New Password"
              error={pwErrors.confirmPassword}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={15} className="text-gray-400" />
                </div>
                <input
                  {...regPw("confirmPassword")}
                  type={showConfirmPw ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass(!!pwErrors.confirmPassword)} pl-10 pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            {/* Save */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={isSavingPw}
                className="
                  flex items-center gap-2 px-5 py-2.5
                  bg-blue-500 hover:bg-blue-600
                  text-white text-sm font-semibold rounded-xl
                  transition-all disabled:opacity-60 disabled:cursor-not-allowed
                  active:scale-[0.98]
                "
              >
                {isSavingPw ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Shield size={15} />
                )}
                {isSavingPw ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </Section>

        {/* ── Danger zone ──────────────────────────── */}
        <Section
          title="Danger Zone"
          subtitle="Irreversible actions — proceed with caution"
          icon={AlertTriangle}
        >
          <div className="space-y-4">
            {/* Clear chat history */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                  Clear Chat History
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                  Permanently delete all your conversations and messages. This
                  cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setDeleteModal(true)}
                className="
                  flex-shrink-0 flex items-center gap-1.5 px-3 py-2
                  text-xs font-semibold
                  text-red-500 dark:text-red-400
                  border border-red-200 dark:border-red-800
                  hover:bg-red-100 dark:hover:bg-red-900/30
                  rounded-xl transition-colors
                "
              >
                <Trash2 size={13} />
                Clear History
              </button>
            </div>
          </div>
        </Section>

        {/* ── Account info ─────────────────────────── */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 pb-6">
          Member since{" "}
          {new Date(user?.createdAt || Date.now()).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" · "}
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* ── Confirm modal ─────────────────────────── */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleClearData}
        isLoading={isDeletingData}
        title="Clear all chat history?"
        message="All your conversations and messages will be permanently deleted. This action cannot be undone."
        confirmText="Clear History"
      />
    </main>
  );
};

export default ProfilePage;
````

## File: client/src/pages/RegisterPage.jsx
````javascript
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex">
      {/* ── Left Panel (form) ───────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <RegisterForm />
      </div>

      {/* ── Right Panel (decorative) ────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
              Free to get started
            </span>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Everything you need, powered by AI
            </h2>
            <p className="text-pink-100 text-lg leading-relaxed">
              Join thousands of users who supercharge their daily life with
              personalized AI assistance.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              {
                icon: "⚡",
                title: "Instant AI Responses",
                desc: "Get expert answers in seconds, not hours",
              },
              {
                icon: "🧠",
                title: "5 Specialized Bots",
                desc: "Each bot is an expert in its domain",
              },
              {
                icon: "💬",
                title: "Full Chat History",
                desc: "Access all your past conversations anytime",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Your data is encrypted and protected",
              },
              {
                icon: "🌙",
                title: "Dark Mode Support",
                desc: "Easy on the eyes, day and night",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
              >
                <span className="text-xl mt-0.5">{feature.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {feature.title}
                  </p>
                  <p className="text-pink-200 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
````

## File: client/src/services/authService.js
````javascript
import api from "./api";

export const authService = {
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  updateProfile: async (formData) => {
    const response = await api.put("/auth/update-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.put("/auth/change-password", data);
    return response.data;
  },
};
````

## File: client/src/services/chatService.js
````javascript
import api from "./api";

export const chatService = {
  sendMessage: async ({ botType, conversationId, message }) => {
    const response = await api.post("/chat/send", {
      botType,
      conversationId: conversationId || undefined,
      message,
    });
    return response.data;
  },

  getAllConversations: async (params = {}) => {
    const response = await api.get("/history/conversations", { params });
    return response.data;
  },

  getConversationById: async (id) => {
    const response = await api.get(`/history/conversations/${id}`);
    return response.data;
  },

  deleteConversation: async (id) => {
    const response = await api.delete(`/history/conversations/${id}`);
    return response.data;
  },

  clearAllConversations: async () => {
    const response = await api.delete("/history/conversations");
    return response.data;
  },
};
````

## File: client/src/services/socketService.js
````javascript
import { io } from "socket.io-client";

// Uses env variable — works for both dev and prod
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

let socket = null;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.warn("⚠️ Socket connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔌 Socket disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const sendMessageSocket = (payload) => {
  if (!socket?.connected) return false;
  socket.emit("send_message", payload);
  return true;
};

export const joinConversation = (conversationId) => {
  if (!socket?.connected) return;
  socket.emit("join_conversation", conversationId);
};

export const leaveConversation = (conversationId) => {
  if (!socket?.connected) return;
  socket.emit("leave_conversation", conversationId);
};

export const isSocketConnected = () => socket?.connected || false;

// import { io } from "socket.io-client";

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// let socket = null;

// // ─── Connect ────────────────────────────────────────────────────
// export const connectSocket = (token) => {
//   if (socket?.connected) return socket;

//   socket = io(SOCKET_URL, {
//     auth: { token },
//     withCredentials: true,
//     transports: ["websocket", "polling"],
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
//     timeout: 20000,
//   });

//   socket.on("connect", () => {
//     console.log("🔌 Socket connected:", socket.id);
//   });

//   socket.on("connect_error", (err) => {
//     console.error("❌ Socket connection error:", err.message);
//   });

//   socket.on("disconnect", (reason) => {
//     console.log("🔌 Socket disconnected:", reason);
//   });

//   return socket;
// };

// // ─── Disconnect ─────────────────────────────────────────────────
// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// // ─── Get instance ───────────────────────────────────────────────
// export const getSocket = () => socket;

// // ─── Emit helpers ───────────────────────────────────────────────
// export const sendMessageSocket = (payload) => {
//   if (!socket?.connected) return false;
//   socket.emit("send_message", payload);
//   return true;
// };

// export const joinConversation = (conversationId) => {
//   if (!socket?.connected) return;
//   socket.emit("join_conversation", conversationId);
// };

// export const leaveConversation = (conversationId) => {
//   if (!socket?.connected) return;
//   socket.emit("leave_conversation", conversationId);
// };

// // ─── Check connection ────────────────────────────────────────────
// export const isSocketConnected = () => socket?.connected || false;
````

## File: client/src/store/authStore.js
````javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";
import { connectSocket, disconnectSocket } from "../services/socketService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      // ─── Register ────────────────────────────────────────────
      register: async (data) => {
        set({ isLoading: true });
        try {
          const res = await authService.register(data);
          localStorage.setItem("token", res.token);

          // Connect socket after register
          connectSocket(res.token);

          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error.message };
        }
      },

      // ─── Login ───────────────────────────────────────────────
      login: async (data) => {
        set({ isLoading: true });
        try {
          const res = await authService.login(data);
          localStorage.setItem("token", res.token);

          // Connect socket after login
          connectSocket(res.token);

          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error.message };
        }
      },

      // ─── Logout ──────────────────────────────────────────────
      logout: async () => {
        try {
          await authService.logout();
        } catch (_) {}

        // Disconnect socket
        disconnectSocket();

        // Reset chat store
        const { useChatStore } = await import("./chatStore");
        useChatStore.getState().reset();

        localStorage.removeItem("token");

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // ─── Initialize ──────────────────────────────────────────
      initialize: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          set({ isInitialized: true });
          return;
        }
        try {
          const res = await authService.getMe();

          // Reconnect socket on page reload
          connectSocket(token);

          set({
            user: res.user,
            token,
            isAuthenticated: true,
            isInitialized: true,
          });
        } catch (_) {
          localStorage.removeItem("token");
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isInitialized: true,
          });
        }
      },

      // ─── Update user ─────────────────────────────────────────
      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { authService } from "../services/authService";

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,
//       isLoading: false,
//       isInitialized: false,

//       // ─── Register ────────────────────────────────────────────
//       register: async (data) => {
//         set({ isLoading: true });
//         try {
//           const res = await authService.register(data);
//           localStorage.setItem("token", res.token);
//           set({
//             user: res.user,
//             token: res.token,
//             isAuthenticated: true,
//             isLoading: false,
//           });
//           return { success: true };
//         } catch (error) {
//           set({ isLoading: false });
//           return { success: false, message: error.message };
//         }
//       },

//       // ─── Login ───────────────────────────────────────────────
//       login: async (data) => {
//         set({ isLoading: true });
//         try {
//           const res = await authService.login(data);
//           localStorage.setItem("token", res.token);
//           set({
//             user: res.user,
//             token: res.token,
//             isAuthenticated: true,
//             isLoading: false,
//           });
//           return { success: true };
//         } catch (error) {
//           set({ isLoading: false });
//           return { success: false, message: error.message };
//         }
//       },

//       // ─── Logout ──────────────────────────────────────────────
//       logout: async () => {
//         try {
//           await authService.logout();
//         } catch (_) {}
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         });
//       },

//       // ─── Initialize (check token on app load) ────────────────
//       initialize: async () => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           set({ isInitialized: true });
//           return;
//         }
//         try {
//           const res = await authService.getMe();
//           set({
//             user: res.user,
//             token,
//             isAuthenticated: true,
//             isInitialized: true,
//           });
//         } catch (_) {
//           localStorage.removeItem("token");
//           set({
//             user: null,
//             token: null,
//             isAuthenticated: false,
//             isInitialized: true,
//           });
//         }
//       },

//       // ─── Update User ─────────────────────────────────────────
//       updateUser: (userData) => {
//         set({ user: { ...get().user, ...userData } });
//       },
//     }),
//     {
//       name: "auth-storage",
//       partialize: (state) => ({
//         user: state.user,
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     },
//   ),
// );
````

## File: client/src/store/chatStore.js
````javascript
import { create } from "zustand";
import { chatService } from "../services/chatService";
import {
  sendMessageSocket,
  isSocketConnected,
} from "../services/socketService";

export const useChatStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────────
  messages: [],
  conversations: [],
  currentConversationId: null,
  currentBotType: null,
  isTyping: false,
  isStreaming: false, // NEW
  streamingMessageId: null, // NEW
  isLoading: false,
  isSidebarOpen: true,
  totalConversations: 0,

  // ─── Set bot ─────────────────────────────────────────────────
  setCurrentBot: (botType) => {
    set({
      currentBotType: botType,
      currentConversationId: null,
      messages: [],
      isStreaming: false,
      streamingMessageId: null,
    });
  },

  // ─── New chat ─────────────────────────────────────────────────
  startNewChat: () => {
    set({
      currentConversationId: null,
      messages: [],
      isStreaming: false,
      streamingMessageId: null,
    });
  },

  // ─── Send message (socket-first, HTTP fallback) ──────────────
  sendMessage: async (message) => {
    const { currentBotType, currentConversationId } = get();
    if (!currentBotType || !message.trim()) return;

    // Optimistic user message
    const tempId = `temp-user-${Date.now()}`;
    const tempUserMsg = {
      _id: tempId,
      role: "user",
      content: message.trim(),
      createdAt: new Date().toISOString(),
      isTemp: true,
    };

    set((state) => ({
      messages: [...state.messages, tempUserMsg],
      isTyping: true,
    }));

    // ── Try socket first ────────────────────────────────────
    const socketSent = sendMessageSocket({
      botType: currentBotType,
      conversationId: currentConversationId || undefined,
      message: message.trim(),
    });

    if (socketSent) {
      // Socket will handle the rest via event listeners
      // (see setupSocketListeners in ChatPage)
      return { success: true, method: "socket" };
    }

    // ── HTTP fallback ───────────────────────────────────────
    console.warn("⚠️ Socket not connected — falling back to HTTP");
    try {
      const res = await chatService.sendMessage({
        botType: currentBotType,
        conversationId: currentConversationId,
        message: message.trim(),
      });

      set((state) => ({
        messages: [
          ...state.messages.filter((m) => m._id !== tempId),
          res.userMessage,
          res.aiMessage,
        ],
        currentConversationId: res.conversationId,
        isTyping: false,
      }));

      get().loadConversations();
      return { success: true, method: "http" };
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== tempId),
        isTyping: false,
      }));
      return { success: false, message: error.message };
    }
  },

  // ─── Socket event handlers ────────────────────────────────────

  // Called when user message is confirmed saved
  onMessageSaved: ({ conversationId, userMessage }) => {
    set((state) => ({
      messages: [...state.messages.filter((m) => !m.isTemp), userMessage],
      currentConversationId: conversationId,
    }));
  },

  // Called when AI starts typing
  onAiTypingStart: ({ conversationId }) => {
    // Add placeholder streaming message
    const streamingPlaceholder = {
      _id: `streaming-${Date.now()}`,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      isStreaming: true,
    };

    set({
      isTyping: false,
      isStreaming: true,
      streamingMessageId: streamingPlaceholder._id,
      messages: [...get().messages, streamingPlaceholder],
    });
  },

  // Called on each streamed chunk
  onAiChunk: ({ chunk, messageId }) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.isStreaming ? { ...msg, content: msg.content + chunk } : msg,
      ),
    }));
  },

  // Called when streaming is complete
  onAiDone: ({ fullContent, messageId, createdAt, conversationId }) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.isStreaming
          ? {
              ...msg,
              _id: messageId,
              content: fullContent,
              createdAt,
              isStreaming: false,
            }
          : msg,
      ),
      isStreaming: false,
      streamingMessageId: null,
      currentConversationId: conversationId,
    }));

    // Refresh sidebar
    get().loadConversations();
  },

  // Called on AI error during stream
  onAiError: ({ message, messageId }) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.isStreaming
          ? {
              ...msg,
              _id: messageId,
              content: message || "Something went wrong. Please try again.",
              isStreaming: false,
              isError: true,
            }
          : msg,
      ),
      isStreaming: false,
      streamingMessageId: null,
      isTyping: false,
    }));
  },

  // ─── Load conversation history ────────────────────────────────
  loadConversation: async (conversationId) => {
    set({ isLoading: true });
    try {
      const res = await chatService.getConversationById(conversationId);
      set({
        messages: res.messages,
        currentConversationId: conversationId,
        currentBotType: res.conversation.botType,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // ─── Load all conversations ───────────────────────────────────
  loadConversations: async (params) => {
    try {
      const res = await chatService.getAllConversations(params);
      set({
        conversations: res.conversations,
        totalConversations: res.total,
      });
    } catch (_) {}
  },

  // ─── Delete conversation ──────────────────────────────────────
  deleteConversation: async (id) => {
    await chatService.deleteConversation(id);
    const { currentConversationId } = get();
    set((state) => ({
      conversations: state.conversations.filter((c) => c._id !== id),
      ...(currentConversationId === id && {
        currentConversationId: null,
        messages: [],
      }),
    }));
  },

  // ─── Clear all conversations ──────────────────────────────────
  clearAllConversations: async () => {
    await chatService.clearAllConversations();
    set({
      conversations: [],
      messages: [],
      currentConversationId: null,
      totalConversations: 0,
    });
  },

  // ─── Toggle sidebar ───────────────────────────────────────────
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  // ─── Reset (called on logout) ─────────────────────────────────
  reset: () => {
    set({
      messages: [],
      conversations: [],
      currentConversationId: null,
      currentBotType: null,
      isTyping: false,
      isStreaming: false,
      streamingMessageId: null,
      isLoading: false,
    });
  },
}));

// import { create } from "zustand";
// import { chatService } from "../services/chatService";

// export const useChatStore = create((set, get) => ({
//   // ─── State ───────────────────────────────────────────────────
//   messages: [],
//   conversations: [],
//   currentConversationId: null,
//   currentBotType: null,
//   isTyping: false,
//   isLoading: false,
//   isSidebarOpen: true,
//   totalConversations: 0,

//   // ─── Set Current Bot ─────────────────────────────────────────
//   setCurrentBot: (botType) => {
//     set({
//       currentBotType: botType,
//       currentConversationId: null,
//       messages: [],
//     });
//   },

//   // ─── Start New Chat ──────────────────────────────────────────
//   startNewChat: () => {
//     set({
//       currentConversationId: null,
//       messages: [],
//     });
//   },

//   // ─── Send Message ────────────────────────────────────────────
//   sendMessage: async (message) => {
//     const { currentBotType, currentConversationId } = get();
//     if (!currentBotType || !message.trim()) return;

//     // Optimistic user message
//     const tempUserMsg = {
//       _id: `temp-${Date.now()}`,
//       role: "user",
//       content: message.trim(),
//       createdAt: new Date().toISOString(),
//       isTemp: true,
//     };

//     set((state) => ({
//       messages: [...state.messages, tempUserMsg],
//       isTyping: true,
//     }));

//     try {
//       const res = await chatService.sendMessage({
//         botType: currentBotType,
//         conversationId: currentConversationId,
//         message: message.trim(),
//       });

//       // Replace temp message + add AI response
//       set((state) => ({
//         messages: [
//           ...state.messages.filter((m) => !m.isTemp),
//           res.userMessage,
//           res.aiMessage,
//         ],
//         currentConversationId: res.conversationId,
//         isTyping: false,
//       }));

//       // Refresh sidebar conversations
//       get().loadConversations();

//       return { success: true };
//     } catch (error) {
//       // Remove temp message on error
//       set((state) => ({
//         messages: state.messages.filter((m) => !m.isTemp),
//         isTyping: false,
//       }));
//       return { success: false, message: error.message };
//     }
//   },

//   // ─── Load Conversation History ────────────────────────────────
//   loadConversation: async (conversationId) => {
//     set({ isLoading: true });
//     try {
//       const res = await chatService.getConversationById(conversationId);
//       set({
//         messages: res.messages,
//         currentConversationId: conversationId,
//         currentBotType: res.conversation.botType,
//         isLoading: false,
//       });
//     } catch (error) {
//       set({ isLoading: false });
//       throw error;
//     }
//   },

//   // ─── Load All Conversations (sidebar) ────────────────────────
//   loadConversations: async (params) => {
//     try {
//       const res = await chatService.getAllConversations(params);
//       set({
//         conversations: res.conversations,
//         totalConversations: res.total,
//       });
//     } catch (_) {}
//   },

//   // ─── Delete Conversation ─────────────────────────────────────
//   deleteConversation: async (id) => {
//     await chatService.deleteConversation(id);
//     const { currentConversationId } = get();

//     set((state) => ({
//       conversations: state.conversations.filter((c) => c._id !== id),
//       // Reset chat if deleting current
//       ...(currentConversationId === id && {
//         currentConversationId: null,
//         messages: [],
//       }),
//     }));
//   },

//   // ─── Clear All ───────────────────────────────────────────────
//   clearAllConversations: async () => {
//     await chatService.clearAllConversations();
//     set({
//       conversations: [],
//       messages: [],
//       currentConversationId: null,
//       totalConversations: 0,
//     });
//   },

//   // ─── Toggle Sidebar ──────────────────────────────────────────
//   toggleSidebar: () => {
//     set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
//   },

//   // ─── Reset ───────────────────────────────────────────────────
//   reset: () => {
//     set({
//       messages: [],
//       conversations: [],
//       currentConversationId: null,
//       currentBotType: null,
//       isTyping: false,
//       isLoading: false,
//     });
//   },
// }));
````

## File: client/src/store/themeStore.js
````javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",

      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      },

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle("dark", theme === "dark");
      },

      initTheme: () => {
        const theme = get().theme;
        document.documentElement.classList.toggle("dark", theme === "dark");
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
````

## File: client/src/utils/botConfig.js
````javascript
export const BOT_CONFIG = {
  fitness: {
    id: "fitness",
    name: "FitBot",
    tagline: "Your Personal Fitness Coach",
    description:
      "Get personalized workout plans, nutrition advice, and health tips to crush your fitness goals.",
    emoji: "💪",
    icon: "Dumbbell",
    gradient: "from-green-400 to-emerald-600",
    gradientDark: "from-green-500 to-emerald-700",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-950",
    border: "border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    button: "bg-green-500 hover:bg-green-600",
    ring: "ring-green-500",
    text: "text-green-600 dark:text-green-400",
    userBubble: "bg-green-500 text-white",
    starters: [
      "Create a beginner workout plan for weight loss",
      "What should I eat before a morning workout?",
      "How many calories should I eat to build muscle?",
      "Give me a 7-day diet plan for fat loss",
    ],
  },

  finance: {
    id: "finance",
    name: "FinBot",
    tagline: "Your Smart Finance Advisor",
    description:
      "Master budgeting, saving strategies, and make informed financial decisions with AI guidance.",
    emoji: "💰",
    icon: "TrendingUp",
    gradient: "from-blue-400 to-indigo-600",
    gradientDark: "from-blue-500 to-indigo-700",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    button: "bg-blue-500 hover:bg-blue-600",
    ring: "ring-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    userBubble: "bg-blue-500 text-white",
    starters: [
      "Help me create a monthly budget on ₹30,000 salary",
      "How should I start investing with ₹5000/month?",
      "What's the 50/30/20 budgeting rule?",
      "How can I save for an emergency fund?",
    ],
  },

  science: {
    id: "science",
    name: "SciBot",
    tagline: "Your Science Learning Companion",
    description:
      "Explore Physics, Chemistry, and Biology through interactive explanations and step-by-step problem solving.",
    emoji: "🔬",
    icon: "FlaskConical",
    gradient: "from-purple-400 to-violet-600",
    gradientDark: "from-purple-500 to-violet-700",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-950",
    border: "border-purple-200 dark:border-purple-800",
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    button: "bg-purple-500 hover:bg-purple-600",
    ring: "ring-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    userBubble: "bg-purple-500 text-white",
    starters: [
      "Explain Newton's laws of motion with examples",
      "How does photosynthesis work?",
      "What is the periodic table and how to read it?",
      "Solve this problem: A car travels 60km/h for 2 hours...",
    ],
  },

  wellness: {
    id: "wellness",
    name: "ZenBot",
    tagline: "Your Mental Wellness Companion",
    description:
      "Find calm, manage stress, and build healthy habits with mindfulness guidance and emotional support.",
    emoji: "🧘",
    icon: "Heart",
    gradient: "from-teal-400 to-cyan-600",
    gradientDark: "from-teal-500 to-cyan-700",
    bgLight: "bg-teal-50",
    bgDark: "dark:bg-teal-950",
    border: "border-teal-200 dark:border-teal-800",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
    button: "bg-teal-500 hover:bg-teal-600",
    ring: "ring-teal-500",
    text: "text-teal-600 dark:text-teal-400",
    userBubble: "bg-teal-500 text-white",
    starters: [
      "I'm feeling stressed about work. Help me.",
      "Teach me a quick 5-minute meditation",
      "How can I improve my sleep quality?",
      "Give me tips to build a healthy morning routine",
    ],
  },

  code: {
    id: "code",
    name: "CodeBot",
    tagline: "Your Programming Mentor",
    description:
      "Get expert help with coding, debugging, DSA problems, and system design from your AI dev mentor.",
    emoji: "👨‍💻",
    icon: "Code2",
    gradient: "from-orange-400 to-red-500",
    gradientDark: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50",
    bgDark: "dark:bg-orange-950",
    border: "border-orange-200 dark:border-orange-800",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    button: "bg-orange-500 hover:bg-orange-600",
    ring: "ring-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    userBubble: "bg-orange-500 text-white",
    starters: [
      "Explain the difference between var, let, and const",
      "How do I reverse a linked list in JavaScript?",
      "Debug my React useEffect code",
      "Explain Big O notation with examples",
    ],
  },
};

export const BOT_LIST = Object.values(BOT_CONFIG);

export const getBotConfig = (botType) => BOT_CONFIG[botType] || null;
````

## File: client/src/utils/helpers.js
````javascript
// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  // Less than 1 minute
  if (diff < 60 * 1000) return "Just now";

  // Less than 1 hour
  if (diff < 60 * 60 * 1000) {
    const mins = Math.floor(diff / (60 * 1000));
    return `${mins}m ago`;
  }

  // Less than 24 hours
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}h ago`;
  }

  // Less than 7 days
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}d ago`;
  }

  // Older - show date
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

// Format time for messages
export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Truncate text
export const truncate = (text, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

// Get user initials for avatar
export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Validate email
export const isValidEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

// Generate a color from string (for avatars)
export const stringToColor = (str) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Sleep utility
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
````

## File: client/vite.config.js
````javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
````

## File: server/config/cloudinary.js
````javascript
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
````

## File: server/config/db.js
````javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
````

## File: server/config/env.js
````javascript
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "ANTHROPIC_API_KEY"];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missing.join(", ")}`,
    );
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
};

module.exports = { validateEnv };
````

## File: server/controllers/chatController.js
````javascript
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { callClaudeAPI } = require("../services/aiService");
const { getValidBotTypes } = require("../services/botPersonalities");
const { AppError } = require("../middleware/errorHandler");

// @desc    Send message and get AI response
// @route   POST /api/chat/send
// @access  Protected
const sendMessage = async (req, res, next) => {
  try {
    const { botType, conversationId, message } = req.body;

    // Validate bot type
    const validBotTypes = getValidBotTypes();
    if (!validBotTypes.includes(botType)) {
      return next(
        new AppError(
          `Invalid bot type. Valid types: ${validBotTypes.join(", ")}`,
          400,
        ),
      );
    }

    if (!message || message.trim().length === 0) {
      return next(new AppError("Message cannot be empty", 400));
    }

    if (message.length > 2000) {
      return next(new AppError("Message too long. Max 2000 characters.", 400));
    }

    let conversation;

    // Get or create conversation
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        userId: req.user._id,
      });

      if (!conversation) {
        return next(new AppError("Conversation not found", 404));
      }
    } else {
      // Create new conversation
      // Auto-generate title from first message (first 60 chars)
      const title =
        message.length > 60 ? message.substring(0, 60) + "..." : message;

      conversation = await Conversation.create({
        userId: req.user._id,
        botType,
        title,
      });
    }

    // Get recent conversation history (last 20 messages for context)
    const history = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // Reverse to get chronological order
    const chronologicalHistory = history.reverse();

    // Save user message
    const userMessage = await Message.create({
      conversationId: conversation._id,
      userId: req.user._id,
      role: "user",
      content: message.trim(),
    });

    // Call Claude API
    let aiResponse;
    try {
      aiResponse = await callClaudeAPI(
        botType,
        chronologicalHistory,
        message.trim(),
      );
    } catch (aiError) {
      // Save error message to DB
      const errorMsg = await Message.create({
        conversationId: conversation._id,
        userId: req.user._id,
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
        isError: true,
      });

      return res.status(503).json({
        success: false,
        message: "AI service temporarily unavailable",
        conversationId: conversation._id,
        userMessage: {
          _id: userMessage._id,
          role: "user",
          content: message.trim(),
          createdAt: userMessage.createdAt,
        },
        aiMessage: {
          _id: errorMsg._id,
          role: "assistant",
          content: errorMsg.content,
          isError: true,
          createdAt: errorMsg.createdAt,
        },
      });
    }

    // Save AI response
    const aiMessage = await Message.create({
      conversationId: conversation._id,
      userId: req.user._id,
      role: "assistant",
      content: aiResponse.content,
      tokens: aiResponse.outputTokens,
    });

    // Update conversation metadata
    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: aiResponse.content.substring(0, 100),
      $inc: { messageCount: 2 },
    });

    res.status(200).json({
      success: true,
      conversationId: conversation._id,
      botType,
      userMessage: {
        _id: userMessage._id,
        role: "user",
        content: userMessage.content,
        createdAt: userMessage.createdAt,
      },
      aiMessage: {
        _id: aiMessage._id,
        role: "assistant",
        content: aiMessage.content,
        createdAt: aiMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage };
````

## File: server/controllers/historyController.js
````javascript
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { AppError } = require("../middleware/errorHandler");

// @desc    Get all conversations for current user
// @route   GET /api/history/conversations
// @access  Protected
const getAllConversations = async (req, res, next) => {
  try {
    const { botType, page = 1, limit = 20 } = req.query;

    const filter = {
      userId: req.user._id,
      isArchived: false,
    };

    if (botType) filter.botType = botType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [conversations, total] = await Promise.all([
      Conversation.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Conversation.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      conversations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single conversation with messages
// @route   GET /api/history/conversations/:id
// @access  Protected
const getConversationById = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      return next(new AppError("Conversation not found", 404));
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      conversation,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a conversation
// @route   DELETE /api/history/conversations/:id
// @access  Protected
const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      return next(new AppError("Conversation not found", 404));
    }

    // Delete all messages in conversation
    await Message.deleteMany({ conversationId: conversation._id });

    // Delete conversation
    await Conversation.findByIdAndDelete(conversation._id);

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear all conversations
// @route   DELETE /api/history/conversations
// @access  Protected
const clearAllConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id });
    const conversationIds = conversations.map((c) => c._id);

    await Message.deleteMany({ conversationId: { $in: conversationIds } });
    await Conversation.deleteMany({ userId: req.user._id });

    res.status(200).json({
      success: true,
      message: "All conversations cleared",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllConversations,
  getConversationById,
  deleteConversation,
  clearAllConversations,
};
````

## File: server/middleware/authMiddleware.js
````javascript
const { verifyToken } = require("../utils/tokenHelper");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header first, then cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === "logged_out") {
      return res.status(401).json({
        success: false,
        message: "You are not logged in. Please log in to get access.",
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token no longer exists.",
      });
    }

    if (!currentUser.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your token has expired. Please log in again.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = { protect };
````

## File: server/middleware/authValidation.js
````javascript
const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

const changePasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: "Current password is required" })
    .min(1, "Current password is required"),
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(6, "Password must be at least 6 characters"),
});

module.exports = { registerSchema, loginSchema, changePasswordSchema };
````

## File: server/middleware/rateLimiter.js
````javascript
const rateLimit = require("express-rate-limit");

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes limiter (strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Chat routes limiter
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: {
    success: false,
    message: "Too many messages sent. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter, chatLimiter };
````

## File: server/middleware/validate.js
````javascript
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    // Zod validation error
    if (err.errors) {
      const messages = err.errors.map((e) => e.message).join(", ");
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }
    next(err);
  }
};

module.exports = validate;
````

## File: server/models/Conversation.js
````javascript
const mongoose = require("mongoose");

const BOT_TYPES = ["fitness", "finance", "science", "wellness", "code"];

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    botType: {
      type: String,
      enum: BOT_TYPES,
      required: [true, "Bot type is required"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      default: "New Conversation",
    },
    messageCount: {
      type: Number,
      default: 0,
    },
    lastMessage: {
      type: String,
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for fast queries
conversationSchema.index({ userId: 1, createdAt: -1 });
conversationSchema.index({ userId: 1, botType: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
````

## File: server/models/Message.js
````javascript

````

## File: server/routes/chatRoutes.js
````javascript
const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const { chatLimiter } = require("../middleware/rateLimiter");

router.post("/send", protect, chatLimiter, sendMessage);

module.exports = router;
````

## File: server/routes/historyRoutes.js
````javascript
const express = require("express");
const router = express.Router();
const {
  getAllConversations,
  getConversationById,
  deleteConversation,
  clearAllConversations,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/conversations", protect, getAllConversations);
router.get("/conversations/:id", protect, getConversationById);
router.delete("/conversations/:id", protect, deleteConversation);
router.delete("/conversations", protect, clearAllConversations);

module.exports = router;
````

## File: server/services/aiService.js
````javascript
const { getBotPersonality } = require("./botPersonalities");

// ─── Standard (non-streaming) call ─────────────────────────────
const callClaudeAPI = async (botType, conversationHistory, userMessage) => {
  const bot = getBotPersonality(botType);
  if (!bot) throw new Error(`Invalid bot type: ${botType}`);

  const messages = [
    ...conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: bot.systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Claude API error: ${errorData.error?.message || "Unknown error"}`,
    );
  }

  const data = await response.json();
  return {
    content: data.content[0].text,
    inputTokens: data.usage?.input_tokens || 0,
    outputTokens: data.usage?.output_tokens || 0,
  };
};

// ─── Streaming call (yields chunks via callback) ────────────────
const callClaudeAPIStream = async (
  botType,
  conversationHistory,
  userMessage,
  onChunk, // callback(chunk: string)
  onDone, // callback(fullText: string, tokens: number)
  onError, // callback(error: Error)
) => {
  const bot = getBotPersonality(botType);
  if (!bot) {
    onError(new Error(`Invalid bot type: ${botType}`));
    return;
  }

  const messages = [
    ...conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: userMessage },
  ];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1024,
        stream: true, // ← streaming
        system: bot.systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Claude API error: ${errorData.error?.message || "Unknown error"}`,
      );
    }

    // Read SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";
    let outputTokens = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);

          // Text delta chunk
          if (
            parsed.type === "content_block_delta" &&
            parsed.delta?.type === "text_delta"
          ) {
            const text = parsed.delta.text || "";
            fullText += text;
            onChunk(text); // stream to client
          }

          // Usage info
          if (parsed.type === "message_delta" && parsed.usage) {
            outputTokens = parsed.usage.output_tokens || 0;
          }
        } catch (_) {
          // Skip malformed SSE lines
        }
      }
    }

    onDone(fullText, outputTokens);
  } catch (err) {
    onError(err);
  }
};

module.exports = { callClaudeAPI, callClaudeAPIStream };

// const { getBotPersonality } = require("./botPersonalities");

// const callClaudeAPI = async (botType, conversationHistory, userMessage) => {
//   const bot = getBotPersonality(botType);

//   if (!bot) {
//     throw new Error(`Invalid bot type: ${botType}`);
//   }

//   // Build messages array for Claude
//   // conversationHistory = array of { role, content } from DB (last 20 messages)
//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     {
//       role: "user",
//       content: userMessage,
//     },
//   ];

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": process.env.ANTHROPIC_API_KEY,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-3-5-haiku-20241022",
//       max_tokens: 1024,
//       system: bot.systemPrompt,
//       messages: messages,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     console.error("Claude API Error:", errorData);
//     throw new Error(
//       `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//     );
//   }

//   const data = await response.json();

//   return {
//     content: data.content[0].text,
//     inputTokens: data.usage?.input_tokens || 0,
//     outputTokens: data.usage?.output_tokens || 0,
//   };
// };

// module.exports = { callClaudeAPI };
````

## File: server/services/botPersonalities.js
````javascript
const BOT_PERSONALITIES = {
  fitness: {
    name: "FitBot",
    emoji: "💪",
    color: "green",
    systemPrompt: `You are FitBot, an expert AI fitness coach with 15+ years of experience in personal training, sports nutrition, and health coaching. 

Your expertise includes:
- Personalized workout plans (strength, cardio, HIIT, yoga, calisthenics)
- Diet and nutrition advice tailored to fitness goals
- Recovery strategies and injury prevention
- Motivation and accountability coaching
- Supplement guidance and healthy lifestyle tips

Communication style:
- Energetic, motivating, and encouraging
- Use fitness emojis occasionally (💪🏋️‍♂️🏃‍♀️🥗)
- Give specific, actionable advice
- Always ask about the user's fitness level and goals before giving plans
- Include sets, reps, duration when giving workout plans
- Format workout plans clearly with bullet points or numbered lists

Important: Always recommend consulting a doctor before starting intense exercise programs. Do not provide medical diagnoses.`,
  },

  finance: {
    name: "FinBot",
    emoji: "💰",
    color: "blue",
    systemPrompt: `You are FinBot, a knowledgeable AI financial advisor with expertise in personal finance, budgeting, and wealth building.

Your expertise includes:
- Personal budgeting strategies (50/30/20 rule, zero-based budgeting)
- Debt management and elimination strategies
- Saving and emergency fund building
- Basic investment concepts (index funds, SIPs, compound interest)
- Expense tracking and financial goal setting
- Credit score improvement tips
- Tax-saving strategies (general guidance)

Communication style:
- Professional yet approachable
- Use financial emojis occasionally (💰📈💳🏦)
- Break down complex financial concepts simply
- Use real examples with numbers when explaining concepts
- Create simple budget tables when needed
- Always encourage building emergency funds first

Important: Provide general financial education only. Always recommend consulting a certified financial advisor for personalized investment decisions. Do not guarantee returns.`,
  },

  science: {
    name: "SciBot",
    emoji: "🔬",
    color: "purple",
    systemPrompt: `You are SciBot, an enthusiastic AI science tutor with deep knowledge in Physics, Chemistry, and Biology for students from middle school through university level.

Your expertise includes:
- Physics: mechanics, thermodynamics, electromagnetism, optics, modern physics
- Chemistry: organic, inorganic, physical chemistry, periodic table, reactions
- Biology: cell biology, genetics, human anatomy, ecology, evolution
- Mathematics related to science (formulas, calculations, graphs)
- Exam preparation and concept clarity
- Scientific method and experimental design

Communication style:
- Enthusiastic and encouraging for learners
- Use science emojis occasionally (🔬⚛️🧬🧪)
- Explain concepts from simple to complex (ELI5 first, then detailed)
- Always provide real-world examples and analogies
- Show step-by-step solutions for numerical problems
- Use formatted equations and formulas clearly
- Ask the student's grade/level to tailor explanations

Important: Encourage curiosity and critical thinking. Make science fun and relatable.`,
  },

  wellness: {
    name: "ZenBot",
    emoji: "🧘",
    color: "teal",
    systemPrompt: `You are ZenBot, a compassionate AI mental wellness companion trained in mindfulness, stress management, and emotional well-being support.

Your expertise includes:
- Stress and anxiety management techniques
- Mindfulness and meditation guidance (guided sessions)
- Sleep hygiene improvement strategies
- Emotional intelligence and self-awareness
- Work-life balance tips
- Breathing exercises and relaxation techniques
- Journaling prompts and positive psychology practices
- Building healthy daily routines and habits

Communication style:
- Warm, calm, empathetic, and non-judgmental
- Use wellness emojis occasionally (🧘🌿💙🌸)
- Speak gently and with compassion
- Validate feelings before offering advice
- Offer grounding exercises when someone seems stressed
- Celebrate small wins and progress

Important: You are a supportive companion, NOT a therapist or doctor. For serious mental health concerns, depression, or crisis situations, always recommend professional help and provide crisis resources (like iCall India: 9152987821 or Vandrevala Foundation: 1860-2662-345).`,
  },

  code: {
    name: "CodeBot",
    emoji: "👨‍💻",
    color: "orange",
    systemPrompt: `You are CodeBot, an expert AI programming mentor with 20+ years of full-stack development experience across multiple technologies.

Your expertise includes:
- Languages: JavaScript, Python, Java, C++, TypeScript, Go, Rust
- Frontend: React, Vue, Angular, HTML/CSS, Tailwind
- Backend: Node.js, Express, Django, FastAPI, Spring Boot
- Databases: MongoDB, PostgreSQL, MySQL, Redis
- DevOps: Docker, Git, CI/CD, cloud deployment
- Data Structures & Algorithms (DSA) for interviews
- Code debugging and optimization
- System design and architecture
- Best practices, design patterns, and clean code principles

Communication style:
- Technical but clear and beginner-friendly
- Use code emojis occasionally (👨‍💻💻🚀⚡)
- Always provide working code examples with proper formatting
- Explain code line by line when needed
- Suggest best practices and common pitfalls
- For DSA: explain the approach first, then code, then time/space complexity
- Format all code in proper code blocks with language specified

Important: Write production-quality, clean, well-commented code. Encourage understanding over copy-pasting.`,
  },
};

const getBotPersonality = (botType) => {
  return BOT_PERSONALITIES[botType] || null;
};

const getValidBotTypes = () => Object.keys(BOT_PERSONALITIES);

module.exports = {
  BOT_PERSONALITIES,
  getBotPersonality,
  getValidBotTypes,
};
````

## File: server/socket/socketHandler.js
````javascript
const { verifyToken } = require("../utils/tokenHelper");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { callClaudeAPIStream } = require("../services/aiService");
const { getValidBotTypes } = require("../services/botPersonalities");

// ─── Auth middleware for Socket.io ──────────────────────────────
const socketAuth = async (socket, next) => {
  try {
    // Token from handshake auth or cookie
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.cookie
        ?.split(";")
        .find((c) => c.trim().startsWith("jwt="))
        ?.split("=")[1];

    if (!token || token === "logged_out") {
      return next(new Error("Authentication required"));
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(new Error("User not found or inactive"));
    }

    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};

// ─── Main socket handler ────────────────────────────────────────
const setupSocketHandlers = (io) => {
  // Apply auth middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.user.name} [${socket.id}]`);

    // Join user's personal room
    socket.join(`user:${socket.user._id}`);

    // ── Handle: send_message ──────────────────────────────────
    socket.on("send_message", async (payload) => {
      try {
        const { botType, conversationId, message } = payload;

        // ── Validation ─────────────────────────────────────
        const validBotTypes = getValidBotTypes();
        if (!validBotTypes.includes(botType)) {
          socket.emit("error", { message: "Invalid bot type" });
          return;
        }

        if (!message || message.trim().length === 0) {
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        if (message.length > 2000) {
          socket.emit("error", {
            message: "Message too long. Max 2000 characters.",
          });
          return;
        }

        const trimmedMessage = message.trim();

        // ── Get or create conversation ──────────────────────
        let conversation;

        if (conversationId) {
          conversation = await Conversation.findOne({
            _id: conversationId,
            userId: socket.user._id,
          });

          if (!conversation) {
            socket.emit("error", { message: "Conversation not found" });
            return;
          }
        } else {
          const title =
            trimmedMessage.length > 60
              ? trimmedMessage.substring(0, 60) + "..."
              : trimmedMessage;

          conversation = await Conversation.create({
            userId: socket.user._id,
            botType,
            title,
          });
        }

        // ── Get conversation history ────────────────────────
        const history = await Message.find({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();

        const chronologicalHistory = history.reverse();

        // ── Save user message ───────────────────────────────
        const userMessage = await Message.create({
          conversationId: conversation._id,
          userId: socket.user._id,
          role: "user",
          content: trimmedMessage,
        });

        // ── Emit: user message confirmed ────────────────────
        socket.emit("message_saved", {
          conversationId: conversation._id,
          userMessage: {
            _id: userMessage._id,
            role: "user",
            content: userMessage.content,
            createdAt: userMessage.createdAt,
          },
        });

        // ── Emit: AI typing started ─────────────────────────
        socket.emit("ai_typing_start", {
          conversationId: conversation._id,
          botType,
        });

        // ── Accumulate for DB save ──────────────────────────
        let aiMessageId = null;
        let fullAiContent = "";

        // Create a placeholder AI message document first
        const placeholderMsg = await Message.create({
          conversationId: conversation._id,
          userId: socket.user._id,
          role: "assistant",
          content: "", // will update
        });
        aiMessageId = placeholderMsg._id;

        // ── Stream AI response ──────────────────────────────
        await callClaudeAPIStream(
          botType,
          chronologicalHistory,
          trimmedMessage,

          // onChunk — emit each token
          (chunk) => {
            socket.emit("ai_chunk", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              chunk,
            });
          },

          // onDone — save full response to DB
          async (fullText, outputTokens) => {
            fullAiContent = fullText;

            // Update placeholder with full content
            await Message.findByIdAndUpdate(aiMessageId, {
              content: fullText,
              tokens: outputTokens,
            });

            // Update conversation metadata
            await Conversation.findByIdAndUpdate(conversation._id, {
              lastMessage: fullText.substring(0, 100),
              $inc: { messageCount: 2 },
            });

            // Emit: streaming complete
            socket.emit("ai_done", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              fullContent: fullText,
              createdAt: new Date().toISOString(),
            });

            console.log(
              `✅ Stream done for ${socket.user.name} — ${fullText.length} chars`,
            );
          },

          // onError — emit error to client
          async (err) => {
            console.error("❌ Streaming error:", err.message);

            // Update placeholder with error message
            await Message.findByIdAndUpdate(aiMessageId, {
              content: "I encountered an error. Please try again.",
              isError: true,
            });

            socket.emit("ai_error", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              message: "AI service error. Please try again.",
            });
          },
        );
      } catch (err) {
        console.error("❌ Socket send_message error:", err);
        socket.emit("error", {
          message: "Something went wrong. Please try again.",
        });
      }
    });

    // ── Handle: join_conversation ──────────────────────────────
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conv:${conversationId}`);
      console.log(`📌 ${socket.user.name} joined conv: ${conversationId}`);
    });

    // ── Handle: leave_conversation ─────────────────────────────
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conv:${conversationId}`);
    });

    // ── Handle: typing_indicator ───────────────────────────────
    socket.on("user_typing", ({ conversationId, isTyping }) => {
      socket.to(`conv:${conversationId}`).emit("user_typing", {
        userId: socket.user._id,
        name: socket.user.name,
        isTyping,
      });
    });

    // ── Disconnect ─────────────────────────────────────────────
    socket.on("disconnect", (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.user.name} — ${reason}`);
    });
  });
};

module.exports = { setupSocketHandlers };
````

## File: server/utils/tokenHelper.js
````javascript
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const sendTokenCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("jwt", token, cookieOptions);
};

const clearTokenCookie = (res) => {
  res.cookie("jwt", "logged_out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

module.exports = {
  generateToken,
  verifyToken,
  sendTokenCookie,
  clearTokenCookie,
};
````

## File: client/src/services/api.js
````javascript
import axios from "axios";
import toast from "react-hot-toast";

// ── Base URL ─────────────────────────────────────────────────────
// In dev: vite proxy handles /api → localhost:5000
// In prod: VITE_API_URL must be set to your Render URL
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ─── Request Interceptor ────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      const isAuthRoute =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";
      if (!isAuthRoute) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 429) {
      toast.error("Too many requests. Please slow down.");
    }

    return Promise.reject({ message, status: error.response?.status });
  },
);

export default api;

// import axios from "axios";
// import toast from "react-hot-toast";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const api = axios.create({
//   baseURL: `${API_URL}/api`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 30000,
// });

// // ─── Request Interceptor ────────────────────────────────────────
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // ─── Response Interceptor ───────────────────────────────────────
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || error.message || "Something went wrong";

//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       const isAuthRoute =
//         window.location.pathname === "/login" ||
//         window.location.pathname === "/register";

//       if (!isAuthRoute) {
//         toast.error("Session expired. Please login again.");
//         window.location.href = "/login";
//       }
//     }

//     if (error.response?.status === 429) {
//       toast.error("Too many requests. Please slow down.");
//     }

//     return Promise.reject({ message, status: error.response?.status });
//   },
// );

// export default api;

// import axios from "axios";
// import toast from "react-hot-toast";

// const api = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 30000,
// });

// // ─── Request Interceptor ────────────────────────────────────────
// api.interceptors.request.use(
//   (config) => {
//     // Attach token from localStorage if present
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // ─── Response Interceptor ───────────────────────────────────────
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || error.message || "Something went wrong";

//     // Auto logout on 401
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Don't toast on login/register pages
//       const isAuthRoute =
//         window.location.pathname === "/login" ||
//         window.location.pathname === "/register";

//       if (!isAuthRoute) {
//         toast.error("Session expired. Please login again.");
//         window.location.href = "/login";
//       }
//     }

//     // Rate limit message
//     if (error.response?.status === 429) {
//       toast.error("Too many requests. Please slow down.");
//     }

//     return Promise.reject({ message, status: error.response?.status });
//   },
// );

// export default api;
````

## File: server/controllers/authController.js
````javascript
const User = require("../models/User");
const {
  generateToken,
  sendTokenCookie,
  clearTokenCookie,
} = require("../utils/tokenHelper");
const { AppError } = require("../middleware/errorHandler");

// ─── Helper: get cloudinary safely ──────────────────────────────
const getCloudinary = () => {
  try {
    return require("../config/cloudinary");
  } catch {
    return null;
  }
};

// ─── @desc    Register new user
// ─── @route   POST /api/auth/register
// ─── @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    // Generate token
    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    // Remove password from response
    const userObj = user.toJSON();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Register error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        success: false,
        message,
      });
    }

    next(error);
  }
};

// ─── @desc    Login user
// ─── @route   POST /api/auth/login
// ─── @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user + include password
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// ─── @desc    Logout user
// ─── @route   POST /api/auth/logout
// ─── @access  Protected
const logout = async (req, res, next) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get current user
// ─── @route   GET /api/auth/me
// ─── @access  Protected
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Update profile
// ─── @route   PUT /api/auth/update-profile
// ─── @access  Protected
const updateProfile = async (req, res, next) => {
  try {
    const { name, theme } = req.body;
    const updateData = {};

    if (name && name.trim()) updateData.name = name.trim();
    if (theme && ["light", "dark"].includes(theme)) {
      updateData.theme = theme;
    }

    // Handle avatar upload
    if (req.file) {
      // Delete old avatar from Cloudinary
      if (req.user.avatar?.public_id) {
        try {
          const cloudinary = getCloudinary();
          if (cloudinary) {
            await cloudinary.uploader.destroy(req.user.avatar.public_id);
          }
        } catch (err) {
          console.warn("Could not delete old avatar:", err.message);
        }
      }

      updateData.avatar = {
        public_id: req.file.filename || req.file.public_id,
        url: req.file.path || req.file.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

// ─── @desc    Change password
// ─── @route   PUT /api/auth/change-password
// ─── @access  Protected
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      token,
    });
  } catch (error) {
    console.error("Change password error:", error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
};

// const User = require("../models/User");
// const {
//   generateToken,
//   sendTokenCookie,
//   clearTokenCookie,
// } = require("../utils/tokenHelper");
// const { AppError } = require("../middleware/errorHandler");
// const cloudinary = require("../config/cloudinary");

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// const register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return next(new AppError("Email already registered", 400));
//     }

//     // Create user
//     const user = await User.create({ name, email, password });

//     // Generate token and send cookie
//     const token = generateToken(user._id);
//     sendTokenCookie(res, token);

//     res.status(201).json({
//       success: true,
//       message: "Account created successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists + get password
//     const user = await User.findOne({ email }).select("+password");
//     if (!user || !(await user.comparePassword(password))) {
//       return next(new AppError("Invalid email or password", 401));
//     }

//     // Update last login
//     user.lastLogin = new Date();
//     await user.save({ validateBeforeSave: false });

//     // Generate token
//     const token = generateToken(user._id);
//     sendTokenCookie(res, token);

//     // Remove password from response
//     user.password = undefined;

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Logout user
// // @route   POST /api/auth/logout
// // @access  Protected
// const logout = async (req, res, next) => {
//   try {
//     clearTokenCookie(res);
//     res.status(200).json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// // @access  Protected
// const getMe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update profile
// // @route   PUT /api/auth/update-profile
// // @access  Protected
// const updateProfile = async (req, res, next) => {
//   try {
//     const { name, theme } = req.body;
//     const updateData = {};

//     if (name) updateData.name = name;
//     if (theme) updateData.theme = theme;

//     // Handle avatar upload
//     if (req.file) {
//       // Delete old avatar from cloudinary
//       if (req.user.avatar?.public_id) {
//         await cloudinary.uploader.destroy(req.user.avatar.public_id);
//       }

//       updateData.avatar = {
//         public_id: req.file.filename,
//         url: req.file.path,
//       };
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Change password
// // @route   PUT /api/auth/change-password
// // @access  Protected
// const changePassword = async (req, res, next) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(req.user._id).select("+password");

//     if (!(await user.comparePassword(currentPassword))) {
//       return next(new AppError("Current password is incorrect", 401));
//     }

//     user.password = newPassword;
//     await user.save();

//     const token = generateToken(user._id);
//     sendTokenCookie(res, token);

//     res.status(200).json({
//       success: true,
//       message: "Password changed successfully",
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   changePassword,
// };
````

## File: server/middleware/errorHandler.js
````javascript
// ─── Custom error class ─────────────────────────────────────────
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── Global error handler middleware ────────────────────────────
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.error("🔴 ERROR:", err);
  } else {
    console.error("🔴 ERROR:", message);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { errorHandler, AppError };

// const errorHandler = (err, req, res, next) => {
//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Internal Server Error";

//   // Mongoose CastError (invalid ObjectId)
//   if (err.name === "CastError") {
//     statusCode = 400;
//     message = `Invalid ${err.path}: ${err.value}`;
//   }

//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     statusCode = 400;
//     const field = Object.keys(err.keyValue)[0];
//     message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
//   }

//   // Mongoose validation error
//   if (err.name === "ValidationError") {
//     statusCode = 400;
//     message = Object.values(err.errors)
//       .map((val) => val.message)
//       .join(", ");
//   }

//   // JWT errors
//   if (err.name === "JsonWebTokenError") {
//     statusCode = 401;
//     message = "Invalid token";
//   }

//   if (err.name === "TokenExpiredError") {
//     statusCode = 401;
//     message = "Token expired";
//   }

//   if (process.env.NODE_ENV === "development") {
//     console.error("🔴 ERROR:", err);
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// };

// // Custom error class
// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// module.exports = { errorHandler, AppError };
````

## File: server/middleware/sanitize.js
````javascript
// Combined sanitizer: MongoDB injection + XSS protection
// Fully compatible with Express 5 (does NOT touch req.query)
// Replaces: express-mongo-sanitize + xss-clean

// ─── XSS: strip dangerous HTML tags and attributes ──────────────
const xssClean = (value) => {
  if (typeof value === "string") {
    return (
      value
        // Remove script tags and content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        // Remove all HTML tags
        .replace(/<[^>]+>/g, "")
        // Remove javascript: protocol
        .replace(/javascript:/gi, "")
        // Remove on* event handlers
        .replace(/on\w+\s*=/gi, "")
        // Remove data: URIs
        .replace(/data:/gi, "")
        // Remove vbscript:
        .replace(/vbscript:/gi, "")
        .trim()
    );
  }
  return value;
};

// ─── MongoDB: remove $ and . keys ──────────────────────────────
const mongoClean = (value) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    Object.keys(value).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
      } else {
        mongoClean(value[key]);
        // Also XSS-clean string values inside objects
        if (typeof value[key] === "string") {
          value[key] = xssClean(value[key]);
        }
      }
    });
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === "string") {
        value[index] = xssClean(item);
      } else {
        mongoClean(item);
      }
    });
  }

  return value;
};

// ─── Main middleware ────────────────────────────────────────────
const sanitize = (req, res, next) => {
  // Clean request body
  if (req.body) {
    mongoClean(req.body);
  }

  // Clean URL params
  if (req.params) {
    mongoClean(req.params);
  }

  // ⚠️ NEVER touch req.query in Express 5
  // Express 5 made req.query a read-only getter property
  // Both xss-clean and express-mongo-sanitize crash here

  next();
};

module.exports = sanitize;

// // Custom MongoDB sanitizer — compatible with Express 5
// // Replaces express-mongo-sanitize which crashes on Express 5
// // because Express 5 made req.query a read-only getter

// const sanitizeValue = (value) => {
//   // Only process plain objects
//   if (value && typeof value === "object" && !Array.isArray(value)) {
//     Object.keys(value).forEach((key) => {
//       // Remove keys starting with $ (MongoDB operators like $gt, $where)
//       // Remove keys containing . (dot notation attacks)
//       if (key.startsWith("$") || key.includes(".")) {
//         delete value[key];
//       } else {
//         // Recursively sanitize nested objects
//         sanitizeValue(value[key]);
//       }
//     });
//   }

//   // Sanitize arrays too
//   if (Array.isArray(value)) {
//     value.forEach((item) => sanitizeValue(item));
//   }

//   return value;
// };

// const mongoSanitize = (req, res, next) => {
//   // Sanitize request body (POST/PUT data)
//   if (req.body) {
//     sanitizeValue(req.body);
//   }

//   // Sanitize URL params (:id etc)
//   if (req.params) {
//     sanitizeValue(req.params);
//   }

//   // ⚠️ DO NOT touch req.query
//   // Express 5 made req.query a read-only getter
//   // Attempting to modify it causes:
//   // "Cannot set property query of #<IncomingMessage> which has only a getter"

//   next();
// };

// module.exports = mongoSanitize;
````

## File: server/models/User.js
````javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password"));

  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
````

## File: server/package.json
````json
{
  "name": "chatbot-server",
  "version": "1.0.0",
  "description": "AI Chatbot Platform Backend",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cloudinary": "^1.41.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-rate-limit": "^8.5.2",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.6.2",
    "multer": "^2.1.1",
    "multer-storage-cloudinary": "^4.0.0",
    "socket.io": "^4.8.3",
    "xss-clean": "^0.1.4",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
````

## File: server/server.js
````javascript
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const { validateEnv } = require("./config/env");
const connectDB = require("./config/db");
const app = require("./app");
const { setupSocketHandlers } = require("./socket/socketHandler");

validateEnv();
connectDB();

const PORT = process.env.PORT || 5000;

// ─── Allowed origins ────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

// ─── HTTP server ────────────────────────────────────────────────
const httpServer = http.createServer(app);

// ─── Socket.io ──────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

setupSocketHandlers(io);

// ─── Listen ─────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode`);
  console.log(`📡 API:    http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
  console.log(`🔌 Socket: ws://localhost:${PORT}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}\n`);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
  httpServer.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM shutting down...");
  httpServer.close(() => console.log("✅ Done"));
});

// require("dotenv").config();
// const http = require("http");
// const { Server } = require("socket.io");
// const { validateEnv } = require("./config/env");
// const connectDB = require("./config/db");
// const app = require("./app");
// const { setupSocketHandlers } = require("./socket/socketHandler");

// // Validate env
// validateEnv();

// // Connect DB
// connectDB();

// const PORT = process.env.PORT || 5000;

// // ─── Create HTTP server ─────────────────────────────────────────
// const httpServer = http.createServer(app);

// // ─── Attach Socket.io ───────────────────────────────────────────
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   pingTimeout: 60000,
//   pingInterval: 25000,
// });

// // ─── Socket handlers ────────────────────────────────────────────
// setupSocketHandlers(io);

// // ─── Start server ───────────────────────────────────────────────
// httpServer.listen(PORT, () => {
//   console.log(
//     `\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
//   );
//   console.log(`📡 API:    http://localhost:${PORT}/api`);
//   console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
//   console.log(`🔌 Socket: ws://localhost:${PORT}\n`);
// });

// // ─── Graceful shutdown ──────────────────────────────────────────
// process.on("unhandledRejection", (err) => {
//   console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
//   httpServer.close(() => process.exit(1));
// });

// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM received. Shutting down gracefully...");
//   httpServer.close(() => console.log("✅ Process terminated"));
// });

// require("dotenv").config();
// const { validateEnv } = require("./config/env");
// const connectDB = require("./config/db");
// const app = require("./app");

// // Validate environment variables
// validateEnv();

// // Connect to MongoDB
// connectDB();

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(
//     `\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
//   );
//   console.log(`📡 API URL: http://localhost:${PORT}/api`);
//   console.log(`❤️  Health: http://localhost:${PORT}/api/health\n`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// // Handle SIGTERM
// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM received. Shutting down gracefully...");
//   server.close(() => {
//     console.log("✅ Process terminated");
//   });
// });
````

## File: client/package.json
````json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@tailwindcss/vite": "^4.3.0",
    "axios": "^1.7.9",
    "lucide-react": "^0.469.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^7.15.1",
    "socket.io-client": "^4.8.3",
    "tailwindcss": "^4.3.0",
    "zod": "^3.24.1",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "vite": "^8.0.12"
  }
}
````

## File: client/src/components/auth/RegisterForm.jsx
````javascript
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Bot,
  Check,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

// ── Validation schema ────────────────────────────────────────────
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Password strength — defined OUTSIDE component ────────────────
const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const checks = [
    { label: "6+ characters", pass: password.length >= 6 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];

  const passed = checks.filter((c) => c.pass).length;
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
  ];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < passed ? colors[passed] : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`flex items-center gap-1 text-xs transition-colors ${
              check.pass
                ? "text-green-500 dark:text-green-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            <Check size={11} />
            {check.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Input field — defined OUTSIDE component ───────────────────────
// ⚠️ KEY FIX: this was previously defined INSIDE RegisterForm
// which caused remount on every render → focus loss
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  rightElement,
  autoComplete,
  registration, // pass register() result as prop
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Icon
          size={16}
          className={
            error ? "text-red-400" : "text-gray-400 dark:text-gray-500"
          }
        />
      </div>
      <input
        {...registration}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`
          w-full pl-10 ${rightElement ? "pr-11" : "pr-4"} py-2.5 text-sm
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          border rounded-xl outline-none transition-all duration-200
          ${
            error
              ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500/30"
              : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
          }
        `}
      />
      {rightElement && (
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
    {error && (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <span>⚠</span> {error.message}
      </p>
    )}
  </div>
);

// ── Main RegisterForm ─────────────────────────────────────────────
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (result.success) {
      toast.success("Account created! Welcome to ChatAI 🎉");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* ── Header ──────────────────────────────────── */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
          <Bot size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Join ChatAI and meet your AI assistants
        </p>
      </div>

      {/* ── Form ────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <InputField
          label="Full Name"
          name="name"
          placeholder="John Doe"
          icon={User}
          autoComplete="name"
          registration={register("name")}
          error={errors.name}
        />

        {/* Email */}
        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          autoComplete="email"
          registration={register("email")}
          error={errors.email}
        />

        {/* Password */}
        <div>
          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={Lock}
            autoComplete="new-password"
            registration={register("password")}
            error={errors.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <PasswordStrength password={password} />
        </div>

        {/* Confirm Password */}
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          icon={Lock}
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        {/* Terms */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-1">
          By creating an account, you agree to our{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full flex items-center justify-center gap-2
            py-2.5 px-4 text-sm font-semibold
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:from-blue-600 hover:to-purple-700
            text-white rounded-xl shadow-md hover:shadow-lg
            transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            active:scale-[0.98]
          "
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* ── Divider ─────────────────────────────────── */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs text-gray-400 bg-white dark:bg-gray-900">
            Already have an account?
          </span>
        </div>
      </div>

      {/* ── Login link ───────────────────────────────── */}
      <Link
        to="/login"
        className="
          w-full flex items-center justify-center gap-2
          py-2.5 px-4 text-sm font-medium
          border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-800
          rounded-xl transition-all duration-200
        "
      >
        Sign in instead
      </Link>
    </div>
  );
};

export default RegisterForm;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   Bot,
//   Check,
// } from "lucide-react";
// import { useAuthStore } from "../../store/authStore";
// import toast from "react-hot-toast";

// const registerSchema = z
//   .object({
//     name: z
//       .string()
//       .min(1, "Name is required")
//       .min(2, "Name must be at least 2 characters")
//       .max(50, "Name cannot exceed 50 characters")
//       .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
//     email: z
//       .string()
//       .min(1, "Email is required")
//       .email("Please enter a valid email"),
//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(6, "Password must be at least 6 characters")
//       .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//       .regex(/[0-9]/, "Must contain at least one number"),
//     confirmPassword: z.string().min(1, "Please confirm your password"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// // Password strength indicator
// const PasswordStrength = ({ password }) => {
//   if (!password) return null;

//   const checks = [
//     { label: "6+ characters", pass: password.length >= 6 },
//     { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
//     { label: "Number", pass: /[0-9]/.test(password) },
//   ];

//   const passed = checks.filter((c) => c.pass).length;
//   const strength = passed === 0 ? 0 : passed === 1 ? 1 : passed === 2 ? 2 : 3;
//   const colors = [
//     "bg-red-400",
//     "bg-orange-400",
//     "bg-yellow-400",
//     "bg-green-400",
//   ];
//   const labels = ["Weak", "Fair", "Good", "Strong"];

//   return (
//     <div className="mt-2 space-y-2">
//       {/* Strength bar */}
//       <div className="flex gap-1">
//         {[0, 1, 2].map((i) => (
//           <div
//             key={i}
//             className={`h-1 flex-1 rounded-full transition-all duration-300 ${
//               i < strength ? colors[strength] : "bg-gray-200 dark:bg-gray-700"
//             }`}
//           />
//         ))}
//       </div>
//       {/* Checks */}
//       <div className="flex flex-wrap gap-x-4 gap-y-1">
//         {checks.map((check) => (
//           <span
//             key={check.label}
//             className={`flex items-center gap-1 text-xs transition-colors ${
//               check.pass
//                 ? "text-green-500 dark:text-green-400"
//                 : "text-gray-400 dark:text-gray-500"
//             }`}
//           >
//             <Check size={11} />
//             {check.label}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// const RegisterForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const { register: registerUser, isLoading } = useAuthStore();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//     defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
//   });

//   const password = watch("password");

//   const onSubmit = async (data) => {
//     const result = await registerUser({
//       name: data.name,
//       email: data.email,
//       password: data.password,
//     });
//     if (result.success) {
//       toast.success("Account created! Welcome to ChatAI 🎉");
//       navigate("/dashboard");
//     } else {
//       toast.error(result.message || "Registration failed");
//     }
//   };

//   // Reusable input field renderer
//   const InputField = ({
//     label,
//     name,
//     type = "text",
//     placeholder,
//     icon: Icon,
//     rightElement,
//     autoComplete,
//   }) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
//         {label}
//       </label>
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//           <Icon
//             size={16}
//             className={
//               errors[name] ? "text-red-400" : "text-gray-400 dark:text-gray-500"
//             }
//           />
//         </div>
//         <input
//           {...register(name)}
//           type={type}
//           autoComplete={autoComplete}
//           placeholder={placeholder}
//           className={`
//             w-full pl-10 ${rightElement ? "pr-11" : "pr-4"} py-2.5 text-sm
//             bg-white dark:bg-gray-800
//             text-gray-900 dark:text-white
//             placeholder-gray-400 dark:placeholder-gray-500
//             border rounded-xl outline-none transition-all duration-200
//             ${
//               errors[name]
//                 ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500/30"
//                 : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20"
//             }
//           `}
//         />
//         {rightElement && (
//           <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
//             {rightElement}
//           </div>
//         )}
//       </div>
//       {errors[name] && (
//         <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
//           <span>⚠</span> {errors[name].message}
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <div className="w-full max-w-md">
//       {/* ── Header ──────────────────────────────────── */}
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
//           <Bot size={28} className="text-white" />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Create your account
//         </h1>
//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           Join ChatAI and meet your AI assistants
//         </p>
//       </div>

//       {/* ── Form ────────────────────────────────────── */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//         {/* Name */}
//         <InputField
//           label="Full Name"
//           name="name"
//           placeholder="John Doe"
//           icon={User}
//           autoComplete="name"
//         />

//         {/* Email */}
//         <InputField
//           label="Email address"
//           name="email"
//           type="email"
//           placeholder="you@example.com"
//           icon={Mail}
//           autoComplete="email"
//         />

//         {/* Password */}
//         <div>
//           <InputField
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="••••••••"
//             icon={Lock}
//             autoComplete="new-password"
//             rightElement={
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             }
//           />
//           <PasswordStrength password={password} />
//         </div>

//         {/* Confirm Password */}
//         <InputField
//           label="Confirm Password"
//           name="confirmPassword"
//           type={showConfirm ? "text" : "password"}
//           placeholder="••••••••"
//           icon={Lock}
//           autoComplete="new-password"
//           rightElement={
//             <button
//               type="button"
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//             >
//               {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           }
//         />

//         {/* Terms */}
//         <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-1">
//           By creating an account, you agree to our{" "}
//           <span className="text-blue-500 hover:underline cursor-pointer">
//             Terms of Service
//           </span>{" "}
//           and{" "}
//           <span className="text-blue-500 hover:underline cursor-pointer">
//             Privacy Policy
//           </span>
//         </p>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="
//             w-full flex items-center justify-center gap-2
//             py-2.5 px-4 text-sm font-semibold
//             bg-gradient-to-r from-blue-500 to-purple-600
//             hover:from-blue-600 hover:to-purple-700
//             text-white rounded-xl
//             shadow-md hover:shadow-lg
//             transition-all duration-200
//             disabled:opacity-60 disabled:cursor-not-allowed
//             active:scale-[0.98]
//           "
//         >
//           {isLoading ? (
//             <>
//               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               Creating account...
//             </>
//           ) : (
//             <>
//               Create Account
//               <ArrowRight size={16} />
//             </>
//           )}
//         </button>
//       </form>

//       {/* ── Divider ─────────────────────────────────── */}
//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200 dark:border-gray-700" />
//         </div>
//         <div className="relative flex justify-center">
//           <span className="px-3 text-xs text-gray-400 bg-white dark:bg-gray-900">
//             Already have an account?
//           </span>
//         </div>
//       </div>

//       {/* ── Login Link ───────────────────────────────── */}
//       <Link
//         to="/login"
//         className="
//           w-full flex items-center justify-center gap-2
//           py-2.5 px-4 text-sm font-medium
//           border border-gray-200 dark:border-gray-700
//           text-gray-700 dark:text-gray-300
//           hover:bg-gray-50 dark:hover:bg-gray-800
//           rounded-xl transition-all duration-200
//         "
//       >
//         Sign in instead
//       </Link>
//     </div>
//   );
// };

// export default RegisterForm;
````

## File: server/app.js
````javascript
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("./middleware/sanitize");
const xss = require("xss-clean"); // ← FIX 1
const { generalLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// ─── Security Middleware ────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ─── CORS ───────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ─── Body Parsers ───────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ─── Data Sanitization ─────────────────────────────────────────
app.use(mongoSanitize);
// app.use(xss()); // ← FIX 1

// ─── Rate Limiting ─────────────────────────────────────────────
app.use("/api", generalLimiter);

// ─── Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

// ─── Health Check ───────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Chatbot API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler (Express 5 compatible) ────────────────────────  ← FIX 2
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────
app.use(errorHandler);

module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const cookieParser = require("cookie-parser");
// const mongoSanitize = require("express-mongo-sanitize");
// const { generalLimiter } = require("./middleware/rateLimiter");
// const { errorHandler } = require("./middleware/errorHandler");

// // Route imports
// const authRoutes = require("./routes/authRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const historyRoutes = require("./routes/historyRoutes");

// const app = express();

// // ─── Security Middleware ────────────────────────────────────────
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   }),
// );

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // ─── Body Parsers ───────────────────────────────────────────────
// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(cookieParser());

// // ─── Data Sanitization ─────────────────────────────────────────
// app.use(mongoSanitize());

// // ─── Rate Limiting ─────────────────────────────────────────────
// app.use("/api", generalLimiter);

// // ─── Routes ────────────────────────────────────────────────────
// app.use("/api/auth", authRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/history", historyRoutes);

// // ─── Health Check ──────────────────────────────────────────────
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "🚀 Chatbot API is running",
//     environment: process.env.NODE_ENV,
//     timestamp: new Date().toISOString(),
//   });
// });

// // ─── 404 Handler ───────────────────────────────────────────────
// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // ─── Global Error Handler ──────────────────────────────────────
// app.use(errorHandler);

// module.exports = app;
````

## File: server/routes/authRoutes.js
````javascript
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../middleware/authValidation");

// ─── Multer + Cloudinary ─────────────────────────────────────────
let upload;
try {
  const multer = require("multer");
  const { CloudinaryStorage } = require("multer-storage-cloudinary");
  const cloudinary = require("../config/cloudinary");

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "chatbot_avatars",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 300, height: 300, crop: "fill" }],
    },
  });

  upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
  });
} catch (err) {
  console.warn("⚠️ Multer/Cloudinary not configured:", err.message);
  const multer = require("multer");
  upload = multer();
}

// ─── Public routes ──────────────────────────────────────────────
router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);

// ─── Protected routes ───────────────────────────────────────────
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, upload.single("avatar"), updateProfile);
router.put(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  changePassword,
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   changePassword,
// } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { authLimiter } = require("../middleware/rateLimiter");

// // ─── Multer + Cloudinary (only for profile update) ──────────────
// let upload;
// try {
//   const multer = require("multer");
//   const { CloudinaryStorage } = require("multer-storage-cloudinary");
//   const cloudinary = require("../config/cloudinary");

//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "chatbot_avatars",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [{ width: 300, height: 300, crop: "fill" }],
//     },
//   });

//   upload = multer({
//     storage,
//     limits: { fileSize: 2 * 1024 * 1024 },
//   });
// } catch (err) {
//   console.warn("⚠️ Multer/Cloudinary not configured:", err.message);
//   // Fallback: no file upload
//   const multer = require("multer");
//   upload = multer();
// }

// // ─── Public routes ──────────────────────────────────────────────
// router.post("/register", authLimiter, register);
// router.post("/login", authLimiter, login);

// // ─── Protected routes ───────────────────────────────────────────
// router.post("/logout", protect, logout);
// router.get("/me", protect, getMe);
// router.put("/update-profile", protect, upload.single("avatar"), updateProfile);
// router.put("/change-password", protect, changePassword);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   changePassword,
// } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { authLimiter } = require("../middleware/rateLimiter");
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // Cloudinary storage for avatars
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "chatbot_avatars",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     transformation: [{ width: 300, height: 300, crop: "fill" }],
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
// });

// // Public routes
// router.post("/register", authLimiter, register);
// router.post("/login", authLimiter, login);

// // Protected routes
// router.post("/logout", protect, logout);
// router.get("/me", protect, getMe);
// router.put("/update-profile", protect, upload.single("avatar"), updateProfile);
// router.put("/change-password", protect, changePassword);

// module.exports = router;
````
