import BackgroundMusic from "@/components/BackgroundMusic";
import BackToTop from "@/components/BackToTop";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import InvitationIntro from "@/components/InvitationIntro";
import PaperFilters from "@/components/PaperFilters";
import Parallax from "@/components/Parallax";
import RsvpForm from "@/components/RsvpForm";

const icons: Record<string, React.ReactNode> = {
  rings: <><circle cx="9" cy="14.5" r="5" /><circle cx="15" cy="14.5" r="5" /><path d="M12 3.5l1.6 2L12 7.5l-1.6-2z" /></>,
  glass: <path d="M5 4h14l-7 9zM12 13v7M8 20h8" />,
  dining: <path d="M6 3v7a2 2 0 0 0 4 0V3M8 3v18M17 3c-2.2 1.6-3 4.4-3 7.5h3V21" />,
  cake: <path d="M4 21h16M5 21v-6.5h14V21M5 14.5c2.3 2.2 4.6 2.2 7 0 2.4 2.2 4.7 2.2 7 0M12 10.5V7.5M12 7.5c-1.3-1-1.3-2.4 0-3.5 1.3 1.1 1.3 2.5 0 3.5" />,
  music: <path d="M9 18V5.5l10-2V16M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM19 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />,
};

const schedule = [
  { time: "11:00", label: "Cerimónia", note: "O momento em que dizemos «sim»", icon: "rings" },
  { time: "12:30", label: "Boas-vindas & cocktail", note: "Um brinde à chegada de todos", icon: "glass" },
  { time: "14:00", label: "Almoço", note: "À mesa, com quem mais amamos", icon: "dining" },
  { time: "17:30", label: "Bolo & brinde", note: "Um doce a condizer com o dia", icon: "cake" },
  { time: "19:00", label: "Festa", note: "Dançar até ao fim da noite", icon: "music" },
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
        <div className="note-paper" data-reveal data-scroll>
          <div className="note-dove" aria-hidden="true" />
          <h2 className="note-line">E agora,<br /><em>para sempre.</em></h2>
          <div className="note-body">
            <p>Uma caminhada cheia de amor trouxe-nos até aqui, e queremos dar o próximo passo ao lado de quem mais amamos.</p>
            <p>Com a bênção de Deus e o carinho das nossas famílias, vamos dizer «sim».</p>
            <p>Vai ser muito mais feliz se estiveres lá connosco.</p>
          </div>
          <span className="note-sign">Ana &amp; André</span>
        </div>
      </section>

      <section className="section photo-section">
        <div className="photo-frame" data-reveal data-scroll role="img" aria-label="Ana e André na praia ao pôr do sol">
          <div className="photo-frame-pic" />
        </div>
      </section>

      <section className="section save-section" aria-label="Guarda a data" data-scroll>
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

      <section className="section intro-section ceremony-section" id="detalhes">
        <div className="narrow" data-reveal>
          <p className="script-title">Entre flores e abraços</p>
          <div className="church-art" data-scroll role="img" aria-label="Desenho da igreja" />
          <div className="ceremony-info">
            <span className="ceremony-medal" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icons.rings}</svg>
            </span>
            <p className="kicker">Cerimónia</p>
            <h2>11h00</h2>
            <p><strong>Castro Verde</strong></p>
            <p>A localização exata será atualizada no convite formal.</p>
            <a className="text-link" href="https://maps.google.com/?q=Castro+Verde+Portugal" target="_blank" rel="noreferrer">Abrir mapa ↗</a>
          </div>
        </div>
      </section>

      <section className="celebration-band">
        <div className="celebration-photo" data-scroll>
          <div className="celebration-top">
            <span className="celebration-kicker">Celebração</span>
            <h2>Depois do <em>“sim”</em></h2>
          </div>
          <p>Seguimos juntos para o almoço, brindes, música e festa.</p>
        </div>
      </section>

      <section className="section venue-section" id="local">
        <div className="venue-photo" data-parallax="0.04" data-scroll role="img" aria-label="Monte Fernão Dias" />
        <div className="venue-card paper" data-reveal>
          <p className="kicker">Onde vai ser</p>
          <h2>Monte Fernão Dias</h2>
          <p>Castro Verde — um cenário tranquilo, aberto e luminoso, exatamente como imaginámos este dia.</p>
          <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Monte+Fern%C3%A3o+Dias+Castro+Verde" target="_blank" rel="noreferrer">Como chegar ↗</a>
        </div>
      </section>

      <section className="section schedule-section">
        <div className="section-heading" data-reveal>
          <p className="kicker">O nosso dia</p>
          <p className="script-title">Queremos celebrar contigo</p>
        </div>
        <div className="tl" data-scroll>
          {schedule.map(({ time, label, note, icon }, index) => (
            <div className="tl-row" key={time} data-reveal={index % 2 === 0 ? "left" : "right"}>
              <time className="tl-time">{time}</time>
              <span className="tl-medal" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icons[icon]}</svg>
              </span>
              <div className="tl-text">
                <h3>{label}</h3>
                <p>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section rsvp-section" id="rsvp">
        <div className="rsvp-box" data-reveal>
          <RsvpForm />
        </div>
      </section>

      <section className="closing" aria-label="Até breve">
        <div className="closing-frame" data-reveal data-scroll>
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
