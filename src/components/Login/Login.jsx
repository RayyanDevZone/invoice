import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { AuthContext } from "../../AuthContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { PasswordField, TextField } from "../ui/Field";

const Login = () => {
  const [mode, setMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/profile" },
      });
      if (error) {
        setError(error.message);
      } else if (!data.session) {
        setMessage("Check your email for a confirmation link, then sign in.");
        setMode("signIn");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate(redirectTo, { replace: true });
      }
    }

    setSubmitting(false);
  };

  const switchMode = () => {
    setMode(isSignUp ? "signIn" : "signUp");
    setError("");
    setMessage("");
  };

  return (
    <main className="flex-1 w-full box-border py-12 px-4 flex justify-center items-start">
      <Card className="max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isSignUp ? "Create your account" : "Sign in"}
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          {isSignUp
            ? "Save your business details once and reuse them on every invoice."
            : "Sign in to view and edit your business profile."}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder={isSignUp ? "At least 6 characters" : "Your password"}
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {message && <p className="text-sm font-medium text-brand-dark">{message}</p>}
          <Button type="submit" disabled={submitting} className="w-full mt-2">
            {submitting ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          {isSignUp ? "Already have an account?" : "New to BillEase?"}{" "}
          <button type="button" onClick={switchMode} className="font-semibold text-gray-900 hover:underline">
            {isSignUp ? "Sign in" : "Create an account"}
          </button>
        </p>
      </Card>
    </main>
  );
};

export default Login;
