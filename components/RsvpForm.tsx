"use client";

import { FormEvent, useState } from "react";
import { rsvpSchema } from "@/lib/rsvpSchema";

type FieldErrors = { name?: string; guestCount?: string };

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [needsAccommodation, setNeedsAccommodation] = useState<"yes" | "no">("no");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const payload = {
      name,
      attendance: attendance === "yes",
      guestCount: attendance === "yes" ? guestCount : 0,
      needsAccommodation: attendance === "yes" && needsAccommodation === "yes",
      dietary,
      message,
    };

    const parsed = rsvpSchema.safeParse(payload);
    if (!parsed.success) {
      const issues = parsed.error.flatten().fieldErrors;
      setFieldErrors({ name: issues.name?.[0], guestCount: issues.guestCount?.[0] });
      return;
    }

    setFieldErrors({});
    setState("sending");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a resposta.");
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="success-card">
        <p className="script-title">Obrigado ♡</p>
        <h2>{attendance === "yes" ? "Presença confirmada" : "Resposta recebida"}</h2>
        <p>
          {attendance === "yes"
            ? "Estamos muito felizes por poder contar convosco neste dia."
            : "Obrigado por nos dizerem. Vamos sentir a vossa falta."}
        </p>
        {attendance === "yes" && needsAccommodation === "yes" && (
          <p className="muted">Registámos também que precisam de alojamento.</p>
        )}
        <a className="button primary" href="/ana-andre-2027.ics" download>Adicionar ao calendário</a>
      </div>
    );
  }

  return (
    <div className="rsvp-card">
      <form className="rsvp-form" onSubmit={onSubmit} noValidate>
        <label className={fieldErrors.name ? "field has-error" : "field"}>
          <span>Nome(s) <span className="required-mark">*</span></span>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="O teu nome ou o da família" />
          {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
        </label>

        <fieldset>
          <legend>Confirmam a presença? <span className="required-mark">*</span></legend>
          <div className="choice-grid">
            <label className={attendance === "yes" ? "choice active" : "choice"}>
              <input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} />
              <span>Sim, estaremos presentes</span>
            </label>
            <label className={attendance === "no" ? "choice active" : "choice"}>
              <input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} />
              <span>Infelizmente não podemos</span>
            </label>
          </div>
        </fieldset>

        {attendance === "yes" && (
          <>
            <label className={fieldErrors.guestCount ? "field has-error" : "field"}>
              <span>Número de pessoas <span className="required-mark">*</span></span>
              <input
                type="number"
                min={1}
                max={10}
                value={guestCount}
                onChange={(event) => setGuestCount(Number(event.target.value))}
              />
              {fieldErrors.guestCount && <p className="field-error">{fieldErrors.guestCount}</p>}
            </label>

            <fieldset>
              <legend>Precisam de alojamento?</legend>
              <p className="field-help">Esta informação ajuda-nos a perceber quantos convidados precisam de opções de estadia.</p>
              <div className="choice-grid compact">
                <label className={needsAccommodation === "yes" ? "choice active" : "choice"}>
                  <input type="radio" name="accommodation" value="yes" checked={needsAccommodation === "yes"} onChange={() => setNeedsAccommodation("yes")} />
                  <span>Sim</span>
                </label>
                <label className={needsAccommodation === "no" ? "choice active" : "choice"}>
                  <input type="radio" name="accommodation" value="no" checked={needsAccommodation === "no"} onChange={() => setNeedsAccommodation("no")} />
                  <span>Não</span>
                </label>
              </div>
            </fieldset>

            <label className="field">
              <span>Restrições alimentares <small>(opcional)</small></span>
              <textarea value={dietary} onChange={(event) => setDietary(event.target.value)} placeholder="Ex.: vegetariano, alergia a frutos secos..." rows={3} />
            </label>
          </>
        )}

        <label className="field">
          <span>Mensagem aos noivos <small>(opcional)</small></span>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Deixa-nos uma mensagem..." rows={4} />
        </label>

        {state === "error" && <p className="form-error" role="alert">{error}</p>}

        <button className="button primary full" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "A enviar..." : "Confirmar resposta"}
        </button>
      </form>
    </div>
  );
}
