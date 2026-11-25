
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import Logincard from "./Logincard";
import SignupSpaceBackground from "./SignupSpaceBackground";

const Signupcard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
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

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (error.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition focus:border-[#D6B66F]/70 focus:ring-1 focus:ring-[#D6B66F]/30";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03050B] px-5 py-10">
      <SignupSpaceBackground />

      <div className="relative z-10 w-full max-w-md">
        <Logincard>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="text-center">
                <h2 className="text-xl font-medium tracking-wide text-white">
                  Create Account
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Begin your journey beyond Earth.
                </p>
              </div>

              <input
                type="email"
                placeholder="Enter your email address"
                className={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

              <input
                type="password"
                placeholder="Create a password"
                className={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <input
                type="password"
                placeholder="Confirm your password"
                className={inputStyle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-[#B98532] via-[#D6B66F] to-[#B98532] py-3 font-semibold tracking-wide text-[#080B12] transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-medium text-[#D6B66F] transition hover:text-[#F3D99A]"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </Logincard>
      </div>
    </main>
  );
};

export default Signupcard;
