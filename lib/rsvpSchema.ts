import { z } from "zod";

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(1, "Indica o teu nome."),
    attendance: z.boolean(),
    guestCount: z.number().int(),
    needsAccommodation: z.boolean(),
    dietary: z.string().trim().max(1000).optional().default(""),
    message: z.string().trim().max(2000).optional().default(""),
  })
  .refine((data) => !data.attendance || (data.guestCount >= 1 && data.guestCount <= 10), {
    message: "Indica quantas pessoas vêm (1 a 10).",
    path: ["guestCount"],
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
