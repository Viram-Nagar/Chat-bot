import { create } from "zustand";
import api from "../services/api";

export const useBotSettingsStore = create((set, get) => ({
  // key: botType, value: settings object
  settings: {},
  isLoading: false,

  // ─── Load all bot settings ──────────────────────────────────
  loadAllSettings: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/bot-settings");
      const map = {};
      res.data.settings.forEach((s) => {
        map[s.botType] = s;
      });
      set({ settings: map, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  // ─── Load single bot settings ───────────────────────────────
  loadBotSettings: async (botType) => {
    try {
      const res = await api.get(`/bot-settings/${botType}`);
      set((state) => ({
        settings: {
          ...state.settings,
          [botType]: res.data.settings,
        },
      }));
    } catch (_) {}
  },

  // ─── Update bot settings ────────────────────────────────────
  updateBotSettings: async (botType, data) => {
    const res = await api.put(`/bot-settings/${botType}`, data);
    set((state) => ({
      settings: {
        ...state.settings,
        [botType]: res.data.settings,
      },
    }));
    return res.data;
  },

  // ─── Reset bot settings ─────────────────────────────────────
  resetBotSettings: async (botType) => {
    await api.delete(`/bot-settings/${botType}/reset`);
    set((state) => {
      const updated = { ...state.settings };
      delete updated[botType];
      return { settings: updated };
    });
  },

  // ─── Submit feedback ────────────────────────────────────────
  submitFeedback: async (data) => {
    const res = await api.post("/bot-settings/feedback", data);
    return res.data;
  },

  // ─── Get settings for one bot (with defaults) ───────────────
  getSettings: (botType) => {
    return (
      get().settings[botType] || {
        botType,
        customName: null,
        customGreeting: null,
        responseStyle: "friendly",
        language: "english",
        isEnabled: true,
        averageRating: 0,
        totalRatings: 0,
      }
    );
  },
}));
