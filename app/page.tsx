import BackgroundMusic from "@/components/BackgroundMusic";
import BackToTop from "@/components/BackToTop";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import InvitationIntro from "@/components/InvitationIntro";
import PaperFilters from "@/components/PaperFilters";
import Parallax from "@/components/Parallax";
import RsvpForm from "@/components/RsvpForm";

const schedule = [
  ["11:00", "Cerimónia"],
  ["12:30", "Boas-vindas & cocktail"],
  ["14:00", "Almoço"],
  ["17:30", "Bolo & brinde"],
  ["19:00", "Festa"],
];

export default function HomePage() {
  return (
    <main>
      <PaperFilters />
      <BackgroundMusic />
      <BackToTop />
      <InvitationIntro />
      <Parallax />

      <section className="section note-section" id="inicio">
        <div className="note-paper" data-reveal>
          <p className="note-kicker">Nós casamos</p>
          <p className="note-line">Há dias que merecem<br />ficar guardados <em>para sempre.</em></p>
          <span className="note-sign" aria-hidden="true">Ana &amp; André</span>
        </div>
      </section>

      <section className="section photo-section">
        <div className="photo-frame" data-reveal role="img" aria-label="Ana e André na praia ao pôr do sol">
          <div className="photo-frame-pic" />
        </div>
      </section>

      <section className="section save-section" aria-label="Guarda a data">
        <div className="save-date" data-reveal>
          <p className="save-kicker">Guarda a data</p>
          <strong className="save-day">14</strong>
          <span className="save-month">maio</span>
          <span className="save-year">2027</span>
          <p className="save-line">Há um dia<br /><em>que já é nosso.</em></p>
        </div>
      </section>

      <section className="section countdown-section" aria-labelledby="countdown-title">
        <Calendar year={2027} month={5} day={14} time="11h00" />
        <div className="countdown-block" data-reveal>
          <p className="countdown-caption" id="countdown-title">Cada vez falta menos</p>
          <Countdown target="2027-05-14T11:00:00+01:00" />
          <a className="button ghost calendar-add" href="/ana-andre-2027.ics" download>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            Adicionar ao calendário
          </a>
        </div>
      </section>

      <section className="section schedule-section">
        <div className="section-heading" data-reveal>
          <p className="kicker">O nosso dia</p>
          <p className="script-title">Queremos celebrar contigo</p>
        </div>
        <div className="timeline">
          {schedule.map(([time, label], index) => (
            <div className="timeline-row" key={time} data-reveal={index % 2 === 0 ? "left" : "right"} style={{ "--d": `${index * 0.12}s` } as React.CSSProperties}>
              <time>{time}</time>
              <span className="timeline-dot" aria-hidden="true" />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section intro-section">
        <div className="narrow" data-reveal>
          <p className="script-title">Entre flores e abraços</p>
          <div className="church-art" role="img" aria-label="Desenho da igreja" />
        </div>
      </section>

      <section className="section details-grid" id="detalhes">
        <article className="paper-card paper" data-reveal="left" data-parallax="-0.03">
          <p className="kicker">Cerimónia</p>
          <h2>11h00</h2>
          <p><strong>Castro Verde</strong></p>
          <p>A localização exata será atualizada no convite formal.</p>
          <a className="text-link" href="https://maps.google.com/?q=Castro+Verde+Portugal" target="_blank" rel="noreferrer">Abrir mapa ↗</a>
        </article>
      </section>

      <section className="celebration-band">
        <div className="celebration-photo">
          <div className="celebration-top">
            <span className="celebration-kicker">Celebração</span>
            <h2>Depois do <em>“sim”</em></h2>
          </div>
          <p>Seguimos juntos para o almoço, brindes, música e festa.</p>
        </div>
      </section>

      <section className="section venue-section" id="local">
        <div className="venue-photo" data-parallax="0.04" role="img" aria-label="Monte Fernão Dias" />
        <div className="venue-card paper" data-reveal>
          <p className="kicker">Onde vai ser</p>
          <h2>Monte Fernão Dias</h2>
          <p>Castro Verde — um cenário tranquilo, aberto e luminoso, exatamente como imaginámos este dia.</p>
          <a className="button primary" href="https://www.google.com/maps/search/?api=1&query=Monte+Fern%C3%A3o+Dias+Castro+Verde" target="_blank" rel="noreferrer">Como chegar</a>
        </div>
      </section>

      <section className="section rsvp-section" id="rsvp">
        <div className="rsvp-box" data-reveal>
          <RsvpForm />
        </div>
      </section>

      <section className="closing" aria-label="Até breve">
        <div className="closing-frame" data-reveal>
          <div className="closing-photo" role="img" aria-label="Ana e André" />
          <div className="closing-copy closing-top">
            <p className="closing-kicker" style={{ "--i": 0 } as React.CSSProperties}>Mal podemos esperar</p>
            <p className="closing-line" style={{ "--i": 1 } as React.CSSProperties}>
              As melhores histórias<br />celebram-se <em>juntos.</em>
            </p>
            <span className="closing-ornament" style={{ "--i": 2 } as React.CSSProperties} aria-hidden="true">
              <i />
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" /></svg>
              <i />
            </span>
          </div>
          <div className="closing-copy closing-bottom">
            <strong style={{ "--i": 3 } as React.CSSProperties}>Até breve</strong>
            <span className="closing-names" style={{ "--i": 4 } as React.CSSProperties}>Ana &amp; André</span>
            <span className="closing-date" style={{ "--i": 5 } as React.CSSProperties}>14 · 05 · 2027</span>
          </div>
        </div>
      </section>
    </main>
  );
}
