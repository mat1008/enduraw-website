import React from 'react';
import { Link } from 'react-router-dom';

const PhysiologicalTestingPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-dark-bg text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent-light font-semibold">← Back to Services</Link>
        </div>
        <header className="text-center mb-10 font-sans">
          <h1 className="text-5xl font-bold mb-2">Physiological Testing</h1>
          <p className="text-xl text-gray-300">To make you the best, we need data</p>
        </header>

        <div className="mb-8">
          <img
            src="/images/IMG_0001%20copie-fi35702592x2000.JPG"
            alt="Physiological testing lab setup"
            className="w-full h-[24rem] object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Our protocols</h2>
          <p className="text-gray-200 mb-3">
            Tests are a great way to understand your level and physiological profile. They will help
            us to train you better and provide you with the most personalized pacing plans possible.
          </p>
          <p className="text-gray-200">
            It's an essential investment, because all athletes are different, and it's easy to train
            badly if you don't define your thresholds.
          </p>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="bg-dark-secondary rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">VO2 MAX Protocol</h3>
            <p className="text-gray-300 mb-2">We measure:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>FC max</li>
              <li>VO2max</li>
              <li>Ventilatory thresholds 1 & 2</li>
              <li>MAS (Maximum Aerobic speed - VMA)</li>
              <li>Training zones</li>
              <li>Muscle oxygen</li>
              <li>Core Body Temp</li>
              <li>Lactate testing (optional)</li>
            </ul>
            <div className="mt-4 text-gray-300">
              <p>Protocol: Step test</p>
              <p>Location: Chamonix or Paris (some dates)</p>
              <p className="text-accent font-semibold">Price: 150€</p>
            </div>
          </div>

          <div className="bg-dark-secondary rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">Walking/Running Protocol</h3>
            <p className="text-gray-300 mb-2">The goal is, regarding the gradient, to calculate your:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Running economy</li>
              <li>Walking economy</li>
              <li>Poles economy</li>
            </ul>
            <p className="text-gray-200 mt-2">
              To precisely advise you on your pacing during a trail running race. We'll tell you
              when to walk, when to run and when to use the poles to optimize your energy expenditure
              and therefore your result at the finish line.
            </p>
            <div className="mt-4 text-gray-300">
              <p>We measure: VO2, VE, FC</p>
              <p>Protocol: Different gradient tests</p>
              <p>Location: Chamonix or Paris</p>
              <p className="text-accent font-semibold">Price: 50€</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">Are you interested?</h3>
          <p className="text-gray-300">Send us your Name, Surname, Email and the test you are interested in / questions.</p>
          <a href="mailto:joseph.mestrallet@gmail.com" className="inline-block mt-3 bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-lg font-semibold">Contact us</a>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Our sensors</h2>
          <p className="text-gray-400 mb-6">Soon an Enduraw article for each sensor (you can access the websites by clicking on the logos).</p>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://vo2master.com/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/vo2_master_-_dc_-_main_left_-_full_colour_-_transparent.png__664x0_q85_subsampling-2-fi35703783x310.png" alt="VO2master analyzer" className="h-12 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">VO2master analyzer</h4>
              <p className="text-gray-300 text-sm">VO2, VE, FeO2, EqO2</p>
              <p className="text-gray-400 text-xs">In partnership with Mauna.ai</p>
            </a>
            <a href="https://mauna.ai/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/ai_mauna_logo-fi35703946x130.png" alt="Mauna.ai" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Mauna.ai</h4>
              <p className="text-gray-300 text-sm">AI-driven performance insights</p>
            </a>
            <a href="https://www.polar.com/en/products/accessories/h10_heart_rate_sensor" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/polar-logo-fi35703774x170.png" alt="Polar H10" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Polar H10</h4>
              <p className="text-gray-300 text-sm">Heart Rate, RR, HRV</p>
            </a>
            <a href="https://trainred.com/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/TrainRed-logo-2-fi35703796x130.png" alt="Train.Red FYER" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Train.Red FYER</h4>
              <p className="text-gray-300 text-sm">Muscle oxygen (TSI, HbDiff)</p>
            </a>
            <a href="https://corebodytemp.com/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/Core-logo-fi35703773x100.png" alt="Core Body Temperature" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Core Body Temperature</h4>
              <p className="text-gray-300 text-sm">Body and skin temperature</p>
            </a>
            <a href="https://www.stryd.com/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/stryd-fi35703791x200.png" alt="Stryd Pod" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Stryd pod</h4>
              <p className="text-gray-300 text-sm">Cadence, GCT, flight time, stride length</p>
            </a>
            <a href="https://www.supersapiens.com/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/5e3782b4-f6d8-434b-a5ec-a6459473a619-fi35703631x150.png" alt="Supersapiens" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Supersapiens sensor</h4>
              <p className="text-gray-300 text-sm">Glucose level</p>
            </a>
            <a href="https://www.nixbiosensors.com/" target="_blank" rel="noreferrer" className="bg-dark-secondary rounded-lg p-6 flex flex-col items-center hover:bg-gray-700/40 transition-colors">
              <img src="/images/Nix-logo-fi35703775x110.png" alt="Nix patch" className="h-10 object-contain mb-3" loading="lazy" />
              <h4 className="text-lg font-semibold">Nix patch</h4>
              <p className="text-gray-300 text-sm">Sweat loss, Electrolytes loss</p>
            </a>
          </div>
          <p className="text-gray-400 mt-6">
            If you have any question on the sensors, please send us a message on LinkedIn!
          </p>
        </section>

        
      </div>
    </div>
  );
};

export default PhysiologicalTestingPage;
