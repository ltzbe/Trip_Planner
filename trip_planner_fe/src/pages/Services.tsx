import '../css/services.css'

function Services() {
  return (
    <div className="services-container">
      <main className="services-main">
        <h1>Unsere Services</h1>
        <h2>Dein Trip, dein Plan, dein Abenteuer</h2>
        <p>
          Mit unserem Tripplaner wird deine Reiseplanung super easy und stressfrei. 
          Egal, ob du einen Roadtrip mit Freunden, einen Solo-Trip oder einen Familienurlaub planst 
          – wir haben die Tools, die du brauchst, um die perfekte Route zu gestalten. Hier ist, was wir dir bieten:
        </p>
        <ol>
          <li>
            <span className="highlight">Smarte Routenplanung</span><br />
            Gib dein Start- und Zielort ein, und unser Tripplaner erstellt dir die optimale Route – schnell, übersichtlich und auf deine Bedürfnisse zugeschnitten. Ob kürzeste Strecke oder die schönste Aussicht, du hast die Wahl!
          </li>
          <li>
            <span className="highlight">Tankstellen, Restaurants & Hotels entlang der Route</span><br />
            Kein Suchen mehr nach dem nächsten Stopp! Wir zeigen dir Tankstellen, Restaurants und Hotels direkt auf deiner Route. Von gemütlichen Cafés über günstige Tankstellen bis hin zu comfy Unterkünften – alles, was du unterwegs brauchst, auf einen Blick.
          </li>
          <li>
            <span className="highlight">Wetter-Check für deine Orte</span><br />
            Bleib auf dem Laufenden! Unser Tripplaner zeigt dir die aktuelle Wettervorhersage für deine ausgewählten Orte, damit du weißt, ob du die Sonnenbrille oder den Regenschirm einpacken musst.
          </li>
        </ol>
        <h2>Bereit für deine Reise?</h2>
        <p>
          Mit unserem Tripplaner hast du alles, was du für einen gelungenen Trip brauchst: eine smarte Route, die besten Stops und den Wetter-Check. Servas, pack die Koffer und los geht’s!
        </p>
      </main>
    </div>
  );
}

export default Services;