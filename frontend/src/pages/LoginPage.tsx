import { type FormEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { consumeSessionExpiredFlag } from "../api/fetch";
import { useAuth } from "../hooks/useAuth";
import type { LoginFieldErrors } from "../types/auth";
import "./LoginPage.css";

function validateForm(username: string, password: string): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    errors.username = "Username is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (consumeSessionExpiredFlag()) {
      setSessionNotice("Your session has expired. Please sign in again.");
    }
  }, []);

  const redirectPath =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <p className="login-card__subtitle">Checking session...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const errors = validateForm(username, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate(redirectPath, { replace: true });
    } catch {
      setSubmitError("Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-card__header">
          <span className="login-card__logo" aria-hidden="true">
            HL
          </span>
          <h1 className="login-card__title">Homelab Dashboard</h1>
          <p className="login-card__subtitle">Sign in to continue</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {sessionNotice && (
            <p className="login-form__notice" role="status">
              {sessionNotice}
            </p>
          )}

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className={`login-form__input ${fieldErrors.username ? "login-form__input--error" : ""}`}
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                if (fieldErrors.username) {
                  setFieldErrors((current) => ({ ...current, username: undefined }));
                }
              }}
              aria-invalid={Boolean(fieldErrors.username)}
              aria-describedby={fieldErrors.username ? "username-error" : undefined}
            />
            {fieldErrors.username && (
              <p className="login-form__error" id="username-error" role="alert">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={`login-form__input ${fieldErrors.password ? "login-form__input--error" : ""}`}
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((current) => ({ ...current, password: undefined }));
                }
              }}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            {fieldErrors.password && (
              <p className="login-form__error" id="password-error" role="alert">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {submitError && (
            <p className="login-form__submit-error" role="alert">
              {submitError}
            </p>
          )}

          <button
            className="login-form__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
