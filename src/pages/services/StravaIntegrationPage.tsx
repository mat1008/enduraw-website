import React from 'react';
import { Link } from 'react-router-dom';
import PersonCard from '../../components/PersonCard';

const StravaIntegrationPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-dark-bg text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent-light font-semibold">← Back to Services</Link>
        </div>
        <header className="text-center mb-12 font-sans">
          <h1 className="text-5xl font-bold mb-2">Enduraw Report</h1>
          <p className="text-xl text-gray-300">A Strava Integration</p>
          <p className="text-lg text-gray-400 mt-2">The best sports algorithms for all your runs!</p>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <img
            src="/images/strava_logo-fi35603244x260.png"
            alt="Strava logo"
            className="h-40 object-contain"
            loading="lazy"
          />
          <img
            src="/images/logo_enduraw%20blanc-fi35471045x140.png"
            alt="Enduraw logo"
            className="h-40 object-contain"
            loading="lazy"
          />
        </div>

        {/* Problem statement + sample report side-by-side */}
        <section className="mb-12 grid gap-8 md:grid-cols-2 items-start">
          {/* Left: portrait sample screenshot */}
          <div className="order-2 md:order-1">
            <img
              src="/images/IMG_2313-fi35687493x330.PNG"
              alt="Enduraw Report sample screenshot"
              className="w-full rounded-lg border border-gray-800"
              loading="lazy"
            />
          </div>

          {/* Right: text */}
          <div className="order-1 md:order-2 space-y-4 text-gray-200">
            <p>
              You can't accelerate under 29 degrees? You thought you had a good pace, but with that
              100-meter bump, it's impossible to know? How much speed has the wind taken away from you
              on this race?
            </p>
            <p>That's to be expected. Outside conditions reduce your pace. 🥵 💨</p>
            <p>
              But it's impossible to know how much. Whether it's the wind, the elevation gain, the
              temperature or the altitude, it's impossible to know your true state of fitness.
            </p>
            <p>
              Enduraw has the solution! We're putting at your disposal the formulas we've developed
              with elite athletes to enable you to compare your training and more accurately estimate
              the intensity of your session. 📈
            </p>
            <p>
              After each outing, our integration will automatically update your activity with the
              paces adjusted to the conditions. Our API calls retrieve wind strength, outside
              temperature and your pace and altitude data a few seconds after the end of your run!
            </p>
            <p>
              So you get an instant report and the time you would have saved in normal conditions 🎉
            </p>
          </div>
        </section>

        <section className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="bg-dark-secondary rounded-lg p-6 text-center">
            <p className="text-4xl font-extrabold text-accent">1047</p>
            <p className="text-gray-400">users</p>
          </div>
          <div className="bg-dark-secondary rounded-lg p-6 text-center">
            <p className="text-4xl font-extrabold text-accent">72,861</p>
            <p className="text-gray-400">activities analyzed</p>
          </div>
        </section>

        {/* Moved the explanatory text next to the image above */}

        <div className="mb-12 text-center">
          <button
            className="inline-block bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            aria-label="Open Enduraw Report"
          >
            Click here for Enduraw Report!
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How does it work?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-200">
            <li>Click on the link above to go to the home page</li>
            <li>Create your Enduraw account</li>
            <li>Log in with your username and password</li>
            <li>You'll be taken to the Strava login page</li>
            <li>Log in using their secure page, which gives us access to your activities</li>
            <li>Once logged in, you will receive a validation e-mail</li>
            <li>
              On your first run, upload your activity to Strava; the Enduraw report magically
              appears!
            </li>
            <li className="text-yellow-300">⚠️ Don't change your description before the report updates</li>
            <li>Enjoy your runs ;)</li>
          </ol>
          <p className="text-sm text-gray-400 mt-4">PS: you can disable the report anytime</p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold">The tech behind</h3>
          <p className="text-gray-400">FAQ, feedbacks</p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold">Sponsors</h3>
          <p className="text-gray-400">Support us!</p>
        </section>

        <section className="mb-4">
          <h3 className="text-2xl font-bold mb-4">The builders</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <PersonCard
              fullName="Alodie Boissonnet"
              country="France 🇫🇷"
              job="Software Engineer"
              sports="Triathlon"
              credentials="X - Cambridge"
              imageUrl="/images/alodie2-fi35697586x210.png"
            />
            <PersonCard
              fullName="Joseph Mestrallet"
              country="France 🇫🇷"
              job="Performance Scientist"
              sports="Trail Running"
              credentials="X-HEC Berkeley ENSEA"
              imageUrl="/images/joseph-fi35687529x212.png"
            />
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default StravaIntegrationPage;
