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
