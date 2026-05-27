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
