"use client";

import { type FormEvent, useState } from "react";

import { submissionSchema, type SubmissionInput } from "@/lib/submission-schema";
import type { MarketingCopy } from "@/lib/marketing-content";

type InquiryFormProps = {
  kind: "registration" | "contact";
  copy: MarketingCopy["form"];
};

type FieldErrors = Record<string, string>;

export function InquiryForm({ kind, copy }: InquiryFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const candidate = {
      kind,
      audience: String(form.get("audience") || "") || undefined,
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      district: String(form.get("district") || ""),
      village: String(form.get("village") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
      consent: form.get("consent") === "on",
      company: String(form.get("company") || ""),
    };
    const parsed = submissionSchema.safeParse(candidate);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) nextErrors[String(issue.path[0] || "form")] = issue.message;
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as { errors?: FieldErrors };
      if (!response.ok) {
        setErrors(body.errors ?? {});
        setStatus("error");
        return;
      }
      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const fieldError = (name: string) => errors[name];
  const fieldId = (name: string) => `${kind}-${name}`;

  return (
    <form className="inquiry-form" noValidate onSubmit={submit}>
      <div className="honeypot" aria-hidden="true"><label htmlFor={fieldId("company")}>Company</label><input id={fieldId("company")} name="company" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <FormField label={copy.name} error={fieldError("name")} htmlFor={fieldId("name")}><input id={fieldId("name")} name="name" autoComplete="name" required /></FormField>
        <FormField label={copy.phone} error={fieldError("phone")} htmlFor={fieldId("phone")}><input id={fieldId("phone")} name="phone" inputMode="tel" autoComplete="tel" required /></FormField>
        <FormField label={copy.email} error={fieldError("email")} htmlFor={fieldId("email")}><input id={fieldId("email")} name="email" type="email" autoComplete="email" required /></FormField>
        {kind === "registration" ? (
          <FormField label={copy.audience} error={fieldError("audience")} htmlFor={fieldId("audience")}><select id={fieldId("audience")} name="audience" defaultValue="" required><option value="" disabled>—</option>{copy.audiences.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></FormField>
        ) : (
          <FormField label={copy.subject} error={fieldError("subject")} htmlFor={fieldId("subject")}><input id={fieldId("subject")} name="subject" required /></FormField>
        )}
        <FormField label={copy.district} error={fieldError("district")} htmlFor={fieldId("district")}><input id={fieldId("district")} name="district" autoComplete="address-level1" /></FormField>
        <FormField label={copy.village} error={fieldError("village")} htmlFor={fieldId("village")}><input id={fieldId("village")} name="village" autoComplete="address-level2" /></FormField>
      </div>
      <FormField label={copy.message} error={fieldError("message")} htmlFor={fieldId("message")}><textarea id={fieldId("message")} name="message" rows={4} required /></FormField>
      <label className="consent-field"><input name="consent" type="checkbox" required /><span>{copy.consent}</span></label>
      {fieldError("consent") ? <p className="field-error">{fieldError("consent")}</p> : null}
      <button className="button button-solid form-submit" disabled={status === "sending"} type="submit">{status === "sending" ? copy.sending : kind === "registration" ? copy.submitRegistration : copy.submitContact}</button>
      <p className={`form-status ${status === "success" ? "form-status-success" : status === "error" ? "form-status-error" : ""}`} aria-live="polite">{status === "success" ? copy.success : status === "error" ? errors.form ?? copy.error : ""}</p>
    </form>
  );
}

function FormField({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return <label className="form-field" htmlFor={htmlFor}><span>{label}</span>{children}{error ? <small className="field-error">{error}</small> : null}</label>;
}

export type { SubmissionInput };
