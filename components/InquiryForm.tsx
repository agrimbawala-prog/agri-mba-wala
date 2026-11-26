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
    <form className="grid gap-2" noValidate onSubmit={submit}>
      <div className="hidden" aria-hidden="true"><label htmlFor={fieldId("company")}>Company</label><input id={fieldId("company")} name="company" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid grid-cols-2 gap-2 max-[600px]:grid-cols-1">
        <FormField label={copy.name} error={fieldError("name")} htmlFor={fieldId("name")}><input id={fieldId("name")} name="name" autoComplete="name" required /></FormField>
        <FormField label={copy.phone} error={fieldError("phone")} htmlFor={fieldId("phone")}><input id={fieldId("phone")} name="phone" inputMode="tel" autoComplete="tel" required /></FormField>
        <FormField label={copy.email} error={fieldError("email")} htmlFor={fieldId("email")}><input id={fieldId("email")} name="email" type="email" autoComplete="email" required /></FormField>
        {kind === "registration" ? (
          <FormField label={copy.audience} error={fieldError("audience")} htmlFor={fieldId("audience")}><select id={fieldId("audience")} name="audience" defaultValue="" required><option value="" disabled>—</option>{copy.audiences.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></FormField>
        ) : (
          <fieldset className="col-span-2 flex flex-wrap gap-1.5 border-0 p-0 max-[600px]:col-span-1">
            <legend className="mb-0.5 w-full text-[13px] font-semibold text-[#10210F]">{copy.subject}</legend>
            {copy.subjectOptions.map((option) => <label key={option} className="relative flex min-h-11 flex-1 basis-[150px] cursor-pointer items-center justify-center border border-[#B8C4B3] px-2.5 text-center text-[12px] font-bold text-[#10210F] has-[:checked]:border-[#1B5E20] has-[:checked]:bg-[#1B5E20] has-[:checked]:text-white max-[600px]:basis-full max-[600px]:justify-start">
              <input className="absolute opacity-0" name="subject" type="radio" value={option} required /><span>{option}</span>
            </label>)}
            {fieldError("subject") ? <small className="basis-full text-[12px] text-[#B42318]">{fieldError("subject")}</small> : null}
          </fieldset>
        )}
        <FormField label={copy.district} error={fieldError("district")} htmlFor={fieldId("district")}><input id={fieldId("district")} name="district" autoComplete="address-level1" /></FormField>
        <FormField label={copy.village} error={fieldError("village")} htmlFor={fieldId("village")}><input id={fieldId("village")} name="village" autoComplete="address-level2" /></FormField>
      </div>
      <FormField label={copy.message} error={fieldError("message")} htmlFor={fieldId("message")}><textarea className="min-h-[120px] resize-y" id={fieldId("message")} name="message" rows={4} required /></FormField>
      <label className="flex items-start gap-2 text-[12px] leading-[1.45] text-[#4F5F4E]"><input className="mt-0.5 h-[18px] w-[18px] appearance-none border border-[#B8C4B3] checked:border-[#1B5E20] checked:bg-[#1B5E20] checked:shadow-[inset_0_0_0_4px_#fff]" name="consent" type="checkbox" required /><span>{copy.consent}</span></label>
      {fieldError("consent") ? <p className="text-[12px] text-[#B42318]">{fieldError("consent")}</p> : null}
      <button className="ml-auto min-h-11 min-w-0 border border-[#1B5E20] bg-[#1B5E20] px-3 py-2 text-[13px] font-bold text-white hover:bg-[#14391A] disabled:cursor-not-allowed disabled:opacity-50 max-[600px]:ml-0 max-[600px]:w-full" disabled={status === "sending"} type="submit">{status === "sending" ? copy.sending : kind === "registration" ? copy.submitRegistration : copy.submitContact}</button>
      <p className={`min-h-[18px] text-[12px] ${status === "success" ? "text-[#1B5E20]" : status === "error" ? "text-[#B42318]" : ""}`} aria-live="polite">{status === "success" ? copy.success : status === "error" ? errors.form ?? copy.error : ""}</p>
    </form>
  );
}

function FormField({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-1 text-[13px] font-semibold text-[#10210F]" htmlFor={htmlFor}><span>{label}</span>{children && <span className="[&>input]:h-11 [&>input]:w-full [&>input]:border [&>input]:border-[#B8C4B3] [&>input]:bg-white [&>input]:px-3 [&>input]:text-[14px] [&>input]:font-normal [&>input]:text-[#10210F] [&>select]:h-11 [&>select]:w-full [&>select]:border [&>select]:border-[#B8C4B3] [&>select]:bg-white [&>select]:px-3 [&>select]:text-[14px] [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-[#B8C4B3] [&>textarea]:bg-white [&>textarea]:px-3 [&>textarea]:text-[14px] [&>textarea]:font-normal [&>textarea]:text-[#10210F] [&>textarea]:focus:border-[#1B5E20] [&>input]:focus:border-[#1B5E20] [&>input]:focus:outline-2 [&>input]:focus:outline-offset-0 [&>input]:focus:outline-[#1B5E20] [&>select]:focus:border-[#1B5E20] [&>select]:focus:outline-2 [&>select]:focus:outline-offset-0 [&>select]:focus:outline-[#1B5E20]">{children}</span>}{error ? <small className="text-[12px] text-[#B42318]">{error}</small> : null}</label>;
}

export type { SubmissionInput };
