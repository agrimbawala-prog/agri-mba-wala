import { z } from "zod";

const audienceValues = ["farmer", "labour", "tractor-owner", "service-provider"] as const;

const text = (minimum: number, maximum: number) => z.string().trim().min(minimum).max(maximum);

export const submissionSchema = z
  .object({
    kind: z.enum(["registration", "contact"]),
    audience: z.enum(audienceValues).optional(),
    name: text(2, 80),
    phone: z.string().trim().regex(/^[+0-9()\-\s]{10,20}$/, "Enter a valid phone number."),
    email: z.email("Enter a valid email address.").trim().toLowerCase(),
    district: z.string().trim().max(100).optional().or(z.literal("")),
    village: z.string().trim().max(100).optional().or(z.literal("")),
    subject: z.string().trim().max(140).optional().or(z.literal("")),
    message: text(10, 2000),
    consent: z.literal(true, "Consent is required before sending."),
    company: z.string().max(0).optional(),
  })
  .superRefine((data, context) => {
    if (data.kind === "registration" && !data.audience) {
      context.addIssue({ code: "custom", path: ["audience"], message: "Select how you want to participate." });
    }
    if (data.kind === "contact" && !data.subject) {
      context.addIssue({ code: "custom", path: ["subject"], message: "Tell us what you need help with." });
    }
  });

export type SubmissionInput = z.infer<typeof submissionSchema>;
export type SubmissionAudience = (typeof audienceValues)[number];
