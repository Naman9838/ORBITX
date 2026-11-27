
import { useState } from "react";
import { auth } from "../services/firebase";
import Logincard from "./Logincard";

import {
  signInWithEmailAndPassword,
  signInAnonymously
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginBg = "/images/orbitx-login-bg.png";

  // Existing email/password login
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        console.log("Successful login", userCredential.user);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Login failed", error.message);

        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          setError("Incorrect email or password.");
        } else {
          setError("Unable to log in. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // New guest login function
  const handleGuestLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInAnonymously(auth);

      console.log("Guest login successful:", userCredential.user);

      navigate("/home");
    } catch (error) {
      console.error("Guest login failed:", error);

      if (error.code === "auth/operation-not-allowed") {
        setError("Guest access is not enabled. Please try again later.");
      } else {
        setError("Unable to enter as guest. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-5 py-10"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-slate-950/25" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        <Logincard>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-400/50 bg-slate-900/90 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-400/50 bg-slate-900/90 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition duration-300 hover:brightness-110 hover:shadow-amber-400/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              {/* Guest login button */}
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={loading}
                className="w-full rounded-xl border border-white/30 bg-slate-900/70 px-5 py-3.5 font-semibold text-white transition duration-300 hover:border-amber-300 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Explore as Guest"}
              </button>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Signup navigation */}
              <p className="text-center text-sm text-slate-300">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-semibold text-amber-300 transition hover:text-amber-200"
                >
                  Sign up
                </button>
              </p>

            </div>
          </form>
        </Logincard>
      </div>
    </div>
  );
};

export default Loginform;
