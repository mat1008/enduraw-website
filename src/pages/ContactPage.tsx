import React, { useState } from 'react';
import '../styles/fancy.css';

const API_BASE_URL = 'http://localhost:3001';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      console.log('Envoi du formulaire de contact:', formData);
      
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Message envoyé avec succès');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', reason: '', message: '' });
      } else {
        console.error('Erreur serveur:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      
      // Fallback vers mailto si l'API échoue
      console.log('Utilisation du fallback mailto');
      const subject = encodeURIComponent(`${formData.reason} - new request`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nReason: ${formData.reason}\n\nMessage:\n${formData.message}`);
      const mailtoLink = `mailto:contact.enduraw@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fancy-bg text-white min-h-screen pt-16 relative">
      {/* Animated background orbs */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black mb-8 gradient-text-orange uppercase tracking-tight animate-float">
            Contact Us
          </h1>
          <p className="text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
            Ready to optimize your performance? Let's discuss how Enduraw can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="glass-card p-6">
              <div className="icon-container bg-gradient-to-br from-orange-500 to-red-500 mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold gradient-text-orange mb-2">Email</h3>
              <p className="text-gray-200">contact.enduraw@gmail.com</p>
            </div>
            <div className="glass-card p-6">
              <div className="icon-container bg-gradient-to-br from-blue-500 to-purple-500 mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="font-bold gradient-text-blue mb-2">Website</h3>
              <p className="text-gray-200">enduraw-data.com</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text-purple">Send us a message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-3 text-gray-200">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 glass-card border-white/20 focus:border-orange-400/50 focus:outline-none text-white placeholder-gray-400 transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-200">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 glass-card border-white/20 focus:border-orange-400/50 focus:outline-none text-white placeholder-gray-400 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-3 text-gray-200">Reason for Contact</label>
              <select 
                id="reason" 
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full p-4 glass-card border-white/20 focus:border-orange-400/50 focus:outline-none text-white transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                required
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Select a reason</option>
                <option value="Media" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Media</option>
                <option value="Pacing Plan" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Pacing Plan</option>
                <option value="Enduraw Performance Center" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Enduraw Performance Center</option>
                <option value="Testing" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Testing</option>
                <option value="Athlete Development" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Athlete Development</option>
                <option value="Other" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-3 text-gray-200">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-4 glass-card border-white/20 focus:border-orange-400/50 focus:outline-none text-white placeholder-gray-400 transition-all resize-none"
                placeholder="Tell us about your goals..."
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-gradient w-full text-lg py-4 px-6 inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
            
            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Message envoyé avec succès !</span>
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
  );
};

export default ContactPage;