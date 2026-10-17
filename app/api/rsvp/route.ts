import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rsvpSchema } from "@/lib/rsvpSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse({
      name: String(body.name ?? ""),
      attendance: Boolean(body.attendance),
      guestCount: Number(body.guestCount),
      needsAccommodation: Boolean(body.needsAccommodation),
      dietary: String(body.dietary ?? ""),
      message: String(body.message ?? ""),
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json({ error: firstIssue?.message || "Dados inválidos." }, { status: 400 });
    }

    const { name, attendance, guestCount, needsAccommodation, dietary, message } = parsed.data;

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (!gmailUser || !gmailAppPassword || !notifyEmail) {
      throw new Error("Gmail SMTP não configurado.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    const statusText = attendance ? `confirmou ${guestCount} ${guestCount === 1 ? "pessoa" : "pessoas"}` : "não poderá estar presente";
    const accommodationText = attendance ? (needsAccommodation ? "Sim" : "Não") : "—";

    await transporter.sendMail({
      from: gmailUser,
      to: notifyEmail,
      subject: `Nova resposta RSVP — ${name}`,
      html: `<p><strong>${escapeHtml(name)}</strong> ${statusText}.</p><p>Precisa de alojamento: ${accommodationText}</p><p>Restrições: ${escapeHtml(dietary || "Nenhuma indicada")}</p><p>Mensagem: ${escapeHtml(message || "—")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível enviar a resposta. Tenta novamente." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}
