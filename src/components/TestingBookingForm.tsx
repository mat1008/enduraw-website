import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const testingBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  testingType: z.string().min(1, 'Please select a testing protocol'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  experience: z.string().optional(),
  goals: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional()
});

type TestingBookingFormData = z.infer<typeof testingBookingSchema>;

interface TestingBookingFormProps {
  onSubmitSuccess?: () => void;
}

const TestingBookingForm: React.FC<TestingBookingFormProps> = ({ onSubmitSuccess }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const testingOptions = [
    { value: '', label: 'Select testing protocol' },
    { value: 'vo2max', label: 'VO₂ Max Protocol (€150)' },
    { value: 'run-walk', label: 'Run/Walk Protocol (€50)' },
    { value: 'combined', label: 'Combined Protocol (€180)' },
    { value: 'custom', label: 'Custom Protocol - Contact for pricing' }
  ];

  const timeSlots = [
    { value: '', label: 'Preferred time' },
    { value: '08:00', label: '8:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const experienceLevels = [
    { value: '', label: 'Your experience level' },
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' },
    { value: 'elite', label: 'Elite/Professional' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TestingBookingFormData>({
    resolver: zodResolver(testingBookingSchema)
  });

  const onSubmit = async (data: TestingBookingFormData) => {
    // Check honeypot field - if filled, it's likely spam
    if (data.honeypot && data.honeypot.trim() !== '') {
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `
Testing Session Booking Request - Chamonix

Contact Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Testing Details:
Protocol: ${testingOptions.find(opt => opt.value === data.testingType)?.label || data.testingType}
Preferred Date: ${data.preferredDate || 'Flexible'}
Preferred Time: ${timeSlots.find(slot => slot.value === data.preferredTime)?.label || 'Not specified'}

Athlete Profile:
Experience Level: ${experienceLevels.find(exp => exp.value === data.experience)?.label || 'Not specified'}
Goals: ${data.goals || 'Not specified'}

Additional Message:
${data.message || 'No additional message provided.'}

Please contact this person to schedule their testing session in Chamonix.
          `.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || 'Failed to send booking request');
      }

      setSubmitStatus('success');
      reset();
      onSubmitSuccess?.();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send booking request. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full group-hover:scale-125 group-hover:rotate-45 transition-all duration-500 animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-10 h-10 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full group-hover:scale-150 group-hover:-rotate-45 transition-all duration-700 animate-pulse delay-500"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide">
            <span className="relative z-10">🧪 Book Your Testing Session</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Professional physiological testing in the heart of Chamonix
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
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
                Your testing session request has been sent! We'll contact you within 24 hours to confirm your appointment.
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

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Email *
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
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
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
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

          {/* Testing Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="testingType" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Testing Protocol *
              </label>
              <select
                id="testingType"
                {...register('testingType')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              >
                {testingOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.testingType && (
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errors.testingType.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Experience Level
              </label>
              <select
                id="experience"
                {...register('experience')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              >
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value} className="bg-gray-900 text-white">
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Scheduling Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="preferredDate" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Preferred Date <span className="text-gray-500">(Wednesdays only)</span>
              </label>
              <input
                type="date"
                id="preferredDate"
                {...register('preferredDate')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="preferredTime" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
                Preferred Time
              </label>
              <select
                id="preferredTime"
                {...register('preferredTime')}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              >
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value} className="bg-gray-900 text-white">
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Goals and Additional Info */}
          <div className="space-y-2">
            <label htmlFor="goals" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
              Training Goals & Objectives
            </label>
            <textarea
              id="goals"
              rows={3}
              {...register('goals')}
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15 resize-vertical"
              placeholder="What are you training for? (e.g., UTMB, marathon, general fitness, etc.)"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-bold text-gray-300 uppercase tracking-wide">
              Additional Information
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15 resize-vertical"
              placeholder="Any medical conditions, previous testing experience, or special requirements..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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
                  <span>🧪 Book Testing Session</span>
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
              By submitting this form, you agree to be contacted about your testing session.
              <br />
              <span className="text-blue-400 font-medium">We'll respond within 24 hours with availability and confirmation!</span>
            </p>
            <div className="mt-4 inline-flex items-center space-x-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/20">
              <span className="text-blue-400 text-xs font-bold">📅 Wednesdays Only</span>
              <span className="text-gray-400">•</span>
              <span className="text-purple-400 text-xs font-bold">🕐 8AM - 6PM</span>
              <span className="text-gray-400">•</span>
              <span className="text-green-400 text-xs font-bold">💯 Expert Analysis</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestingBookingForm;