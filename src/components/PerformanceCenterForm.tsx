import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const performanceCenterSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  trainingCamp: z.string().min(1, 'Please select a training camp'),
  message: z.string().optional(),
  honeypot: z.string().optional()
});

type PerformanceCenterFormData = z.infer<typeof performanceCenterSchema>;

interface PerformanceCenterFormProps {
  onSubmitSuccess?: () => void;
}

const PerformanceCenterForm: React.FC<PerformanceCenterFormProps> = ({ onSubmitSuccess }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const trainingCampOptions = [
    { value: '', label: 'Select a training camp' },
    { value: 'stage1', label: '1st IMMERSIVE STAGE (Oct 3rd-7th)' },
    { value: 'stage2', label: '2nd IMMERSIVE STAGE (Oct 9th-12th)' },
    { value: 'stage3', label: '3rd IMMERSIVE STAGE (Oct 15th-19th)' },
    { value: 'stage4', label: '4th IMMERSIVE STAGE (Oct 20th-24th)' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PerformanceCenterFormData>({
    resolver: zodResolver(performanceCenterSchema)
  });

  const onSubmit = async (data: PerformanceCenterFormData) => {
    // Check honeypot field - if filled, it's likely spam
    if (data.honeypot && data.honeypot.trim() !== '') {
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/training-camp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          trainingCamp: data.trainingCamp,
          message: data.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Failed to send request');
      }

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        reset();
        onSubmitSuccess?.();
      } else {
        throw new Error(result.error || 'Failed to send request');
      }
    } catch (error) {
      console.error('Erreur envoi training camp:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send request. Please try again.');
    }
  };

  return (
    <div className="glass-card p-8 relative group overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-2xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full group-hover:scale-125 group-hover:rotate-45 transition-all duration-500"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-green-400/30 to-teal-500/30 rounded-full group-hover:scale-150 group-hover:-rotate-45 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 gradient-text-orange uppercase tracking-wide animate-float">
            <span className="relative z-10">Request Your Training Camp</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Join elite athletes in the heart of Chamonix for the ultimate performance experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-4"></div>
        </div>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-300 font-medium">
                Your training camp request has been sent successfully! We'll contact you within 24 hours.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-6 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-300 font-medium">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field - invisible to users but visible to bots */}
          <div style={{ display: 'none' }}>
            <label htmlFor="honeypot">Leave this field empty</label>
            <input
              type="text"
              id="honeypot"
              {...register('honeypot')}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                placeholder="Your first name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.firstName.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                placeholder="Your last name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.lastName.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Email *
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                placeholder="+33 1 23 45 67 89"
              />
              {errors.phone && (
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Training Camp Selection */}
          <div className="space-y-2">
            <label htmlFor="trainingCamp" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
              Preferred Training Camp *
            </label>
            <select
              id="trainingCamp"
              {...register('trainingCamp')}
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
            >
              {trainingCampOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                  {option.label}
                </option>
              ))}
            </select>
            {errors.trainingCamp && (
              <p className="text-sm text-red-400 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.trainingCamp.message}</span>
              </p>
            )}
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
              Additional Message <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-white/15 resize-vertical"
              placeholder="Tell us about your goals, experience level, or any special requirements..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <span className="relative z-10 flex items-center justify-center space-x-3 uppercase tracking-wide">
              {submitStatus === 'loading' ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <span>Send Training Camp Request</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>

          {/* Additional Info */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-400 leading-relaxed">
              By submitting this form, you agree to be contacted about the Enduraw Performance Center training camps.
              <br />
              <span className="text-orange-400 font-medium">We'll respond within 24 hours!</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerformanceCenterForm;