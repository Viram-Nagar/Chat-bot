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
