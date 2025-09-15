import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

const AthleteSupportPage: React.FC = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToObserve = document.querySelectorAll('[id^="animate-"]');
    elementsToObserve.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      console.log('Envoi du formulaire athlete support:', formData);
      
      const response = await fetch(`${API_BASE_URL}/api/athlete-support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Demande athlete support envoyée avec succès');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Erreur serveur:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur envoi demande athlete support:', error);
      
      // Fallback vers mailto si l'API échoue
      console.log('Utilisation du fallback mailto');
      const subject = encodeURIComponent(`Athletes Support - Nouvelle demande de ${formData.name}`);
      const body = encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nObjectifs et demande:\n${formData.message}`);
      const mailtoLink = `mailto:contact.enduraw@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-bg text-white min-h-screen pt-16 relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div 
          id="animate-title"
          className={`transform transition-all duration-1000 ease-out ${
            animatedElements.has('animate-title')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-wide bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse text-center">
            Athletes Support
          </h1>
        </div>
        
        {/* Subtitle */}
        <div 
          id="animate-subtitle"
          className={`text-center mb-16 transform transition-all duration-1000 delay-300 ${
            animatedElements.has('animate-subtitle')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative group inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="bg-dark-secondary/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">You have the fire</span>, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">we have the spark.</span><br />
                <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black">Unleash your potential.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Text */}
        <div 
          id="animate-intro"
          className={`transform transition-all duration-1000 delay-500 mb-12 ${
            animatedElements.has('animate-intro')
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          <div className="bg-dark-secondary/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full group-hover:scale-125 group-hover:rotate-45 transition-all duration-500"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-green-400/30 to-teal-500/30 rounded-full group-hover:scale-150 group-hover:-rotate-45 transition-all duration-700"></div>
            
            <div className="text-lg text-gray-200 space-y-6 leading-relaxed relative z-10">
              <p className="group-hover:text-white transition-colors duration-300">
                Being an accomplished athlete does not only rely on a good training plan.
              </p>
              <p className="group-hover:text-white transition-colors duration-300">
                At <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">Enduraw</span>, we support a holistic vision of performance, from training optimization to detailed sleep analysis.
              </p>
              <p className="group-hover:text-white transition-colors duration-300">
                Thanks to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">data-driven insights</span>, we hyper-personalize your training to bring you into a new dimension.
              </p>
              <p className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                No matter what you aim for, we know you want to do it at your best. And so do we!
              </p>
            </div>
          </div>
        </div>

        {/* The keys section */}
        <div 
          id="animate-keys-section"
          className={`space-y-12 transform transition-all duration-1000 delay-700 ${
            animatedElements.has('animate-keys-section')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide relative">
              The keys we can bring you
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Training Analysis",
                content: "Analysis of your training sessions and monitoring",
                icon: "📊",
                color: "from-blue-400 to-cyan-400"
              },
              {
                title: "Historical Profiling", 
                content: "Profiling from your historical training and racing data",
                icon: "📈",
                color: "from-purple-400 to-pink-400"
              },
              {
                title: "Performance Factors",
                content: "Races comparisons and determination of key performance factors",
                icon: "🏆",
                color: "from-green-400 to-teal-400"
              },
              {
                title: "Nutrition Guidance",
                content: "Nutrition over training and races alongside advices on best practice for endurance athletes",
                icon: "🥗",
                color: "from-orange-400 to-red-400"
              },
              {
                title: "Refueling Strategy",
                content: "Bring the keys to an improved refueling using the right electrolytes and water sources",
                icon: "💧",
                color: "from-cyan-400 to-blue-400"
              },
              {
                title: "Sleep Analysis",
                content: "Sleep Monitoring and analysis to get the best recovery",
                icon: "💤",
                color: "from-indigo-400 to-purple-400"
              }
            ].map((service, index) => (
              <div 
                key={index}
                id={`animate-service-${index}`}
                className={`bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center relative group overflow-hidden transform transition-all duration-1000 ${
                  animatedElements.has(`animate-service-${index}`)
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-20 opacity-0 scale-95'
                } hover:scale-105 hover:-rotate-1 hover:shadow-2xl`}
                style={{ transitionDelay: `${800 + index * 150}ms` }}
              >
                {/* 3D Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover:from-white/10 group-hover:to-white/20 transition-all duration-500 rounded-2xl"></div>
                <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} opacity-20 blur-lg group-hover:opacity-40 group-hover:blur-xl transition-all duration-500 rounded-2xl`}></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-white/30 rounded-full group-hover:scale-125 group-hover:rotate-180 transition-all duration-700"></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                
                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {service.title}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white/60 transition-all duration-500"></div>
                  <p className="text-lg text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {service.content}
                  </p>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent group-hover:bg-gradient-to-t group-hover:from-white/5 group-hover:to-white/10 transition-all duration-500 rounded-2xl pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div 
          id="animate-contact-section"
          className={`mt-20 transform transition-all duration-1000 delay-1200 ${
            animatedElements.has('animate-contact-section')
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-20 opacity-0 scale-95'
          }`}
        >
          <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 p-10 rounded-3xl border border-orange-400/30 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500"></div>
            <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-orange-400/30 to-red-500/30 rounded-full blur-xl group-hover:scale-125 transition-all duration-500"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full blur-lg group-hover:scale-110 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide">
                  Ready to train like a pro?
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                {/* Left Column - Principles */}
                <div className="space-y-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/20 group/principle hover:scale-105 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/principle:scale-110 transition-transform duration-300">
                        <span className="text-2xl">🧠</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-red-300 mb-3">"Smart Training"</h3>
                        <p className="text-gray-200 leading-relaxed">
                          <span className="font-bold text-red-400">"No pain no gain"</span> doesn't read as literally as we thought. 
                          Evaluating training load via biological and mechanical markers, we analyze your training to give you a better understanding of your physiological responses.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/20 group/principle hover:scale-105 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/principle:scale-110 transition-transform duration-300">
                        <span className="text-2xl">💤</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-300 mb-3">"Recovery First"</h3>
                        <p className="text-gray-200 leading-relaxed">
                          <span className="font-bold text-green-400">Recovery matters</span> even more than training alone. 
                          Adaptation drives progression, achieved through proper refueling and sleep that data can help master.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/20 group/principle hover:scale-105 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/principle:scale-110 transition-transform duration-300">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-300 mb-3">"Precision Pacing"</h3>
                        <p className="text-gray-200 leading-relaxed">
                          <span className="font-bold text-purple-400">Pacing Strategy</span> is unique and can be fine-tuned from your training data and past races. 
                          Together, we'll find the best scenario: when to walk, when to eat, when to control, or when to push it!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Contact Form */}
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 relative group/form overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover/form:from-white/10 group-hover/form:to-white/20 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Start Your Journey
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative group/input">
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 group-hover/input:bg-white/25"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="relative group/input">
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 group-hover/input:bg-white/25"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="relative group/input">
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">
                          Your Goals & Objectives *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-vertical transition-all duration-300 group-hover/input:bg-white/25"
                          placeholder="Tell us about your athletic goals, current training, and how we can help you achieve peak performance..."
                        />
                      </div>
                      
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 uppercase tracking-wide relative group/button overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300 origin-left"></div>
                          <span className="relative z-10 flex items-center gap-2">
                            {isLoading ? (
                              <>
                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                <span>Envoi en cours...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit Request</span>
                                <svg className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                      
                      {/* Messages de statut */}
                      {submitStatus === 'success' && (
                        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                          <div className="flex items-center justify-center gap-2 text-green-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Demande envoyée avec succès !</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-2">Nous vous répondrons dans les plus brefs délais.</p>
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
                          <div className="flex items-center justify-center gap-2 text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Erreur lors de l'envoi</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-2">Veuillez réessayer ou nous contacter directement.</p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30">
                <p className="text-lg text-gray-200 italic mb-4">
                  "There is consensus in the scientific community: pushing your body in training is not sufficient to perform at your peak."
                </p>
                <div className="inline-flex items-center space-x-4 text-sm">
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full font-semibold">Data-Driven Approach</span>
                  <span className="text-gray-400">•</span>
                  <span className="px-3 py-1 bg-red-400/20 text-red-400 rounded-full font-semibold">Personalized Plans</span>
                  <span className="text-gray-400">•</span>
                  <span className="px-3 py-1 bg-pink-400/20 text-pink-400 rounded-full font-semibold">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteSupportPage;