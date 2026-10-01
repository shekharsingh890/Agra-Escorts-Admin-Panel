import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/Firebase";
import Logo from "../../assets/Logo.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { firebaseAuthErrorMessages } from "../../utils/Helper";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userId', uid);
      toast.success("Login successful!");
      navigate("/contact");
    } catch (error) {
      console.error('Login error:', error);
      if (error && typeof error === "object" && "code" in error) {
        const code = (error as { code: string }).code;
        toast.error(firebaseAuthErrorMessages[code] || "Something went wrong. Please try again.");
        return;
      }
      toast.error("Failed to login! Please try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full flex flex-col items-center gap-8 max-w-md bg-white rounded-2xl p-8 shadow-lg">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="h-16 w-auto object-contain" />

        {/* Header */}
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" disabled={isSubmitting} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" autoComplete="current-password" placeholder="••••••••" disabled={isSubmitting} className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;