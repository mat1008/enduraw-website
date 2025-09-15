import React from 'react';
import { Link } from 'react-router-dom';
import PersonCard from '../../components/PersonCard';

const RaceBriefingPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-dark-bg text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent-light font-semibold">← Back to Services</Link>
        </div>
        <header className="text-center mb-10 font-sans">
          <h1 className="text-5xl font-bold mb-2">Race Briefing</h1>
          <p className="text-xl text-gray-300">Enduraw provides race briefings for the best athletes in the world.</p>
          <p className="text-lg text-gray-400">Why not you?</p>
        </header>

        <section className="mb-8 space-y-4 text-gray-200">
          <p>
            Race day is a leap into the unknown! You don't control the weather like you do in
            training. You don't know the race route and its elevation gain by heart. You're
            wondering about your nutrition.
          </p>
          <p>Enduraw is there for you!</p>
          <p>
            Over the past two years, we've developed a unique expertise in working with elite
            athletes to provide them with the best possible briefing and enable them to optimize
            their performances. In top-level sport, every second counts, every heartbeat is
            important. You need to adapt your pace precisely to get the best energy expenditure.
          </p>
          <p>
            We are convinced that you need these algorithms to perform, whether you want to run a
            marathon in under 3h30 or finish a trail race. To each his own challenge.
          </p>
        </section>

        <section className="mb-8 grid md:grid-cols-2 gap-6">
          <div className="bg-dark-secondary rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">🗼 Road Race</h3>
            <p className="text-gray-300 mb-2">We take into account:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Your level</li>
              <li>The course elevation gain</li>
              <li>The wind</li>
              <li>The temperature</li>
              <li>Your race strategy</li>
            </ul>
            <p className="mt-3 text-gray-300">To calculate:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Your final time</li>
              <li>Your split pace kilometer by kilometer</li>
              <li>A nutrition plan</li>
            </ul>
          </div>
          <div className="bg-dark-secondary rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">🏔 Trail Race</h3>
            <p className="text-gray-300 mb-2">We take into account:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Your UTMB/ITRA INDEX</li>
              <li>The course elevation gain</li>
              <li>The wind</li>
              <li>The temperature</li>
              <li>The technicality</li>
              <li>The speed drift</li>
              <li>Your race strategy</li>
            </ul>
            <p className="mt-3 text-gray-300">To calculate:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Your final time</li>
              <li>Your split pace kilometer by kilometer</li>
              <li>A nutrition plan</li>
              <li>Where to walk</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 text-center">
          <button className="inline-block bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-lg font-semibold">Discover the product</button>
          <p className="text-gray-400 mt-2">Available in English, Spanish, French • Discounts for 3 or more briefing plans</p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">They trust us!</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-200">
            <PersonCard
              fullName="Petter Engdahl"
              age={29}
              country="Sweden 🇸🇪"
              sports="Trail, Ultra Trail"
              achievements="CCC: win, record • Transvulcania win • MMB: 3rd"
              variant="athlete"
            />
            <PersonCard
              fullName="Ruth Croft"
              country="New Zealand 🇳🇿"
              sports="Trail, Ultra Trail"
              achievements="UTMB 2023 • UTMB 2024"
              variant="athlete"
            />
            <PersonCard
              fullName="Duncan Périllat"
              country="France 🇫🇷"
              sports="Marathon, Ultra Trail"
              achievements="Rotterdam Marathon • UTMB 2023"
              variant="athlete"
            />
            <PersonCard
              fullName="Solange Jésus"
              country="Portugal 🇵🇹"
              sports="Road Marathon"
              achievements="Paris Marathon: 9th • World championship • NYC Marathon"
              variant="athlete"
            />
            <PersonCard
              fullName="Guillaume Adam"
              country="France 🇫🇷"
              sports="Road Marathon"
              achievements="NYC Marathon"
              variant="athlete"
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-2">To go further!</h3>
          <p className="text-gray-300 mb-3">For top-athletes aiming for international titles or world records we have a tailor made solution.</p>
          <p className="text-gray-200 font-semibold mb-2">The future of sport is all about hyper-customization</p>
          <p className="text-gray-200 mb-3">That's why we're using several premium features to help you reach the top:</p>
          <ul className="list-disc list-inside text-gray-200 space-y-1">
            <li>Your Strava analysis to fine-tune the algorithms</li>
            <li>Physiological protocol (walking/running, use of poles)</li>
            <li>Heart rate response prediction during exercise (WIP)</li>
            <li>Estimation of your sweat profile to adapt hydration</li>
            <li>Gram-by-gram nutritional strategy</li>
            <li>Competitors analysis and matchmaking with pace groups (marathon)</li>
            <li>Race strategy</li>
            <li>Real-time monitoring of physiological constants</li>
            <li>FKT preparation</li>
          </ul>
          <p className="text-gray-300 mt-3">Our job is to give you the data you need to make trade-offs.</p>
          <p className="text-accent mt-2">If you are interested, drop me a message here.</p>
        </section>

        
      </div>
    </div>
  );
};

export default RaceBriefingPage;
