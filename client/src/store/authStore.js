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
