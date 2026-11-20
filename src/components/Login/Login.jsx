import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { client } from "../../utils/neon";
import { AuthContext } from "../../AuthContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { PasswordField, TextField } from "../ui/Field";

// Neon Auth returns this when the account exists but the email isn't confirmed.
const EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED";

const Login = () => {
  // "signIn" | "signUp" | "verify" (enter the 6-digit code sent by email)
  const [mode, setMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/profile";

  if (!loading && user) {
    return <Navigate to={redirectTo} replace />;
  }

  const isSignUp = mode === "signUp";
  const isVerify = mode === "verify";

  const startVerification = () => {
    setMode("verify");
    setCode("");
    setError("");
    setMessage(`We emailed a 6-digit code to ${email}. Enter it below to confirm your account.`);
  };

  const signIn = async () => {
    const { error } = await client.auth.signIn.email({ email, password });
    if (!error) {
      navigate(redirectTo, { replace: true });
    } else if (error.code === EMAIL_NOT_VERIFIED) {
      // Signing in with an unverified email sends a fresh code.
      startVerification();
    } else {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      if (isVerify) {
        // Confirms the email and signs the user in.
        const { error } = await client.auth.emailOtp.verifyEmail({ email, otp: code.trim() });
        if (error) {
          setError(error.message);
        } else {
          navigate(redirectTo, { replace: true });
        }
      } else if (isSignUp) {
        const { data, error } = await client.auth.signUp.email({ email, password, name: email.split("@")[0] });
        if (error) {
          setError(error.message);
        } else if (data?.token) {
          navigate(redirectTo, { replace: true });
        } else {
          // Account created; Neon Auth has emailed a verification code.
          startVerification();
        }
      } else {
        await signIn();
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }

    setSubmitting(false);
  };

  const resendCode = async () => {
    setError("");
    setSubmitting(true);
    const { error } = await client.auth.emailOtp.sendVerificationOtp({ email, type: "email-verification" });
    if (error) setError(error.message);
    else setMessage(`A new code is on its way to ${email}.`);
    setSubmitting(false);
  };

  const switchMode = () => {
    setMode(isSignUp ? "signIn" : "signUp");
    setError("");
    setMessage("");
  };

  const title = isVerify ? "Confirm your email" : isSignUp ? "Create your account" : "Sign in";
  const subtitle = isVerify
    ? "One last step before you can use BillEase."
    : isSignUp
      ? "Save your business details once and reuse them on every invoice."
      : "Sign in to view and edit your business profile.";
  const submitLabel = isVerify ? "Confirm" : isSignUp ? "Create account" : "Sign in";

  return (
    <main className="flex-1 w-full box-border py-12 px-4 flex justify-center items-start">
      <Card className="max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">{subtitle}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isVerify ? (
            <TextField
              label="Verification code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          ) : (
            <>
              <TextField
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PasswordField
                label="Password"
                name="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder={isSignUp ? "At least 8 characters" : "Your password"}
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {message && <p className="text-sm font-medium text-brand-dark">{message}</p>}
          <Button type="submit" disabled={submitting} className="w-full mt-2">
            {submitting ? "Please wait..." : submitLabel}
          </Button>
        </form>
        {isVerify ? (
          <p className="text-sm text-gray-500 mt-6 text-center">
            Didn't get it?{" "}
            <button type="button" onClick={resendCode} disabled={submitting} className="font-semibold text-gray-900 hover:underline">
              Send a new code
            </button>
            {" · "}
            <button type="button" onClick={() => { setMode("signIn"); setMessage(""); setError(""); }} className="font-semibold text-gray-900 hover:underline">
              Back
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-500 mt-6 text-center">
            {isSignUp ? "Already have an account?" : "New to BillEase?"}{" "}
            <button type="button" onClick={switchMode} className="font-semibold text-gray-900 hover:underline">
              {isSignUp ? "Sign in" : "Create an account"}
            </button>
          </p>
        )}
      </Card>
    </main>
  );
};

export default Login;
