import BackgroundMusic from "@/components/BackgroundMusic";
import BackToTop from "@/components/BackToTop";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import InvitationIntro from "@/components/InvitationIntro";
import PaperFilters from "@/components/PaperFilters";
import Parallax from "@/components/Parallax";
import PhotoCarousel from "@/components/PhotoCarousel";
import RsvpForm from "@/components/RsvpForm";

const ringsIcon = <><circle cx="9" cy="14.5" r="5" /><circle cx="15" cy="14.5" r="5" /><path d="M12 3.5l1.6 2L12 7.5l-1.6-2z" /></>;

const momentPhotos = [
  { src: "/images/silhueta.jpg", alt: "Silhueta de Ana e André junto ao mar", position: "42% 40%" },
  { src: "/images/abraco.jpg", alt: "Ana e André abraçados na praia", position: "80% 50%" },
  { src: "/images/passeio.jpg", alt: "Ana e André de mãos dadas na praia", position: "60% 60%" },
  { src: "/images/por-do-sol.jpg", alt: "Ana e André ao pôr do sol", position: "50% 50%" },
];

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
        <div className="photo-collage">
          <div className="photo-frame" data-reveal data-scroll role="img" aria-label="Ana e André na praia ao pôr do sol">
            <div className="photo-frame-pic" />
          </div>
          {[
            "a", "b", "c", "d",
          ].map((c, i) => (
            <figure className={`polaroid polaroid-${c}`} key={c} data-reveal={i % 2 === 0 ? "left" : "right"} role="img" aria-label="Ana e André">
              <span className="polaroid-pic" />
            </figure>
          ))}
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
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{ringsIcon}</svg>
            </span>
            <p className="kicker">Cerimónia</p>
            <h2>11h00</h2>
            <span className="flourish" aria-hidden="true" />
            <p><strong>Castro Verde</strong></p>
            <p>A localização exata será atualizada no convite formal.</p>
            <a className="text-link" href="https://maps.google.com/?q=Castro+Verde+Portugal" target="_blank" rel="noreferrer">Abrir mapa ↗</a>
          </div>
        </div>
      </section>

<section className="section venue-section" id="local">
        <div className="section-heading" data-reveal>
          <p className="kicker">Celebração</p>
          <p className="script-title">Depois do sim</p>
          <span className="flourish" aria-hidden="true" />
          <p className="venue-lead">Seguimos juntos para o almoço, brindes, música e festa.</p>
        </div>
        <div className="venue-photo" data-parallax="0.04" data-scroll role="img" aria-label="Monte Fernão Dias" />
        <div className="venue-card paper" data-reveal>
          <p className="kicker">Onde vai ser</p>
          <h2>Monte Fernão Dias</h2>
          <span className="flourish" aria-hidden="true" />
          <p>Castro Verde — um cenário tranquilo, aberto e luminoso, exatamente como imaginámos este dia.</p>
          <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Monte+Fern%C3%A3o+Dias+Castro+Verde" target="_blank" rel="noreferrer">Como chegar ↗</a>
        </div>
      </section>

      <section className="section schedule-section">
        <div className="section-heading" data-reveal>
          <p className="kicker">O nosso dia</p>
          <p className="script-title">Queremos celebrar contigo</p>
          <span className="flourish" aria-hidden="true" />
        </div>
        <div className="tl" data-scroll>
          {schedule.map(({ time, label, note, icon }, index) => (
            <div className="tl-row" key={time} data-reveal={index % 2 === 0 ? "left" : "right"}>
              <time className="tl-time">{time}</time>
              <span className="tl-medal" aria-hidden="true">
                <img src={`/images/timeline/${icon}.png`} alt="" width="64" height="64" loading="lazy" decoding="async" />
              </span>
              <div className="tl-text">
                <h3>{label}</h3>
                <p>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section moment-section" aria-label="Ana e André">
        <div className="section-heading" data-reveal>
          <p className="kicker">O nosso álbum</p>
          <p className="script-title">Só nós dois</p>
          <span className="flourish" aria-hidden="true" />
          <p className="venue-lead">Há momentos que o tempo não apaga.</p>
        </div>
        <div data-reveal className="carousel-wrap">
          <PhotoCarousel photos={momentPhotos} />
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
