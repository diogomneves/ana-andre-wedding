import BackgroundMusic from "@/components/BackgroundMusic";
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
      <InvitationIntro />
      <Parallax />

      <section className="hero" id="inicio">
        <div className="botanical botanical-left" data-parallax="0.22" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="botanical botanical-right" data-parallax="-0.18" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="hero-wash hero-wash-blue" data-parallax="0.3" aria-hidden="true" />
        <div className="hero-wash hero-wash-gold" data-parallax="0.15" aria-hidden="true" />

        <div className="hero-copy reveal" data-parallax="0.08">
          <p className="eyebrow">14 maio 2027 · Castro Verde</p>
          <h1>Ana <span>&amp;</span> André</h1>
          <p className="hero-text">Há dias que merecem ficar guardados para sempre.</p>
          <div className="hero-actions">
            <a className="button ghost" href="/ana-andre-2027.ics" download>Adicionar ao calendário</a>
          </div>
        </div>

        <div className="hero-art reveal" data-parallax="-0.05" aria-hidden="true">
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />
          <div className="hero-date-card">
            <span>save the date</span>
            <strong>14</strong>
            <small>maio · 2027</small>
          </div>
          <div className="hero-landscape">
            <span className="landscape-layer landscape-sky" data-parallax="0.05" />
            <span className="landscape-layer landscape-hill-a" data-parallax="0.1" />
            <span className="landscape-layer landscape-hill-b" data-parallax="0.04" />
            <span className="landscape-layer landscape-field" />
          </div>
        </div>
      </section>

      <section className="section countdown-section" aria-labelledby="countdown-title">
        <div data-reveal>
          <p className="kicker">Até ao grande dia</p>
          <h2 id="countdown-title">Contagem decrescente</h2>
          <Countdown target="2027-05-14T11:00:00+01:00" />
        </div>
        <Calendar year={2027} month={5} day={14} time="11h00" />
      </section>

      <section className="section intro-section">
        <div className="watercolor-band" data-parallax="0.2" aria-hidden="true" />
        <div className="narrow" data-reveal data-parallax="-0.04">
          <p className="script-title">Queremos celebrar contigo</p>
          <p className="lead">
            É com enorme alegria que te convidamos a fazer parte deste dia. Entre a paisagem de Castro Verde,
            flores, abraços e muita festa, queremos criar memórias que fiquem para sempre.
          </p>
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
        <article className="paper-card paper" data-reveal="right" data-parallax="0.03">
          <p className="kicker">Celebração</p>
          <h2>Depois do “sim”</h2>
          <p>Seguimos juntos para o almoço, brindes, música e festa.</p>
          <p className="muted">Mais informações serão adicionadas assim que estiverem fechadas.</p>
        </article>
      </section>

      <section className="section schedule-section">
        <div className="section-heading" data-reveal>
          <p className="kicker">O nosso dia</p>
          <h2>Programa</h2>
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

      <section className="section venue-section" id="local">
        <div className="venue-photo" data-parallax="0.04" role="img" aria-label="Fotografia do local da cerimónia" />
        <div className="venue-card paper" data-reveal>
          <p className="kicker">Onde vai ser</p>
          <h2>Monte Fernão Dias</h2>
          <p>Castro Verde — um cenário tranquilo, aberto e luminoso, exatamente como imaginámos este dia.</p>
          <a className="button primary" href="https://www.google.com/maps/search/?api=1&query=Monte+Fern%C3%A3o+Dias+Castro+Verde" target="_blank" rel="noreferrer">Como chegar</a>
        </div>
      </section>

      <section className="section accommodation-section" id="alojamento">
        <div className="accommodation-card" data-reveal>
          <p className="kicker">Alojamento</p>
          <h2>Precisas de ficar por Castro Verde?</h2>
          <p>
            Na confirmação de presença podes indicar se precisas de alojamento. Assim conseguimos perceber quantos convidados
            necessitam de estadia e partilhar as opções mais adequadas mais perto da data.
          </p>
          <a className="text-link" href="#rsvp">Indicar na confirmação →</a>
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
          <div className="closing-copy">
            <p className="closing-kicker" style={{ "--i": 0 } as React.CSSProperties}>Mal podemos esperar</p>
            <p className="closing-line" style={{ "--i": 1 } as React.CSSProperties}>
              As melhores histórias<br />celebram-se <em>juntos.</em>
            </p>
            <span className="closing-ornament" style={{ "--i": 2 } as React.CSSProperties} aria-hidden="true">
              <i />
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" /></svg>
              <i />
            </span>
            <strong style={{ "--i": 3 } as React.CSSProperties}>Até breve</strong>
            <span className="closing-names" style={{ "--i": 4 } as React.CSSProperties}>Ana &amp; André</span>
            <span className="closing-date" style={{ "--i": 5 } as React.CSSProperties}>14 · 05 · 2027</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-names">Ana & André</p>
        <p>14 · 05 · 2027 · Castro Verde</p>
      </footer>
    </main>
  );
}
