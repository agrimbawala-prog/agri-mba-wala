"use client";

import { useActionState } from "react";

import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return (
    <form action={action} className="admin-login-form">
      <label>Username<input name="username" autoComplete="username" required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
      {state.error ? <p role="alert">{state.error}</p> : null}
      <button className="button button-solid" disabled={pending} type="submit">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
