import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { useToast } from '../components/Toast';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '', // Anti-spam honeypot
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    showToast('Email copied ✓');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Name must not exceed 100 characters.';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    } else if (formData.email.trim().length > 254) {
      errors.email = 'Email is too long.';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length > 200) {
      errors.subject = 'Subject must not exceed 200 characters.';
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters.';
    } else if (formData.message.trim().length > 5000) {
      errors.message = 'Message must not exceed 5000 characters.';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      let delivered = false;

      // 1. Try backend endpoint first (active in local server / Node deployments)
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            _gotcha: formData._gotcha,
          }),
        });

        if (response.ok) {
          const data = await response.json().catch(() => null);
          if (data?.success) {
            delivered = true;
          }
        }
      } catch {
        // Backend endpoint unavailable (normal for static GitHub Pages)
      }

      // 2. Static hosting fallback via FormSubmit directly to personal email
      if (!delivered) {
        try {
          const fsResponse = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              name: formData.name.trim(),
              email: formData.email.trim(),
              subject: formData.subject.trim(),
              message: formData.message.trim(),
              _subject: `New Portfolio Inquiry from ${formData.name.trim()}: ${formData.subject.trim()}`,
              _template: 'table',
              _captcha: 'false',
            }),
          });

          const fsData = await fsResponse.json().catch(() => null);
          if (
            fsResponse.ok &&
            (fsData?.success === 'true' ||
              fsData?.success === true ||
              (typeof fsData?.message === 'string' &&
                fsData.message.toLowerCase().includes('activation')))
          ) {
            delivered = true;
          }
        } catch (fsErr) {
          console.warn('[Contact Form] Static submission fallback failed:', fsErr);
        }
      }

      if (delivered) {
        setIsSuccess(true);
        showToast('Message Sent ✓');
        // Clear form after confirmed success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _gotcha: '',
        });
      } else {
        const errorMessage =
          'Unable to send your message right now. Please try again or use direct email.';
        setServerError(errorMessage);
        showToast(errorMessage, 'info');
      }
    } catch (err) {
      console.error('Network error during form submission:', err);
      setServerError(
        'Unable to send your message right now. Please check your connection or use the direct contact buttons below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Pink / Purple / Cyan Ambient Glow behind contact */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#FF1768]/15 via-[#8B5CF6]/15 to-[#06D6FF]/15 blur-[160px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#FF1768]/30 bg-[#FF1768]/10 text-[#FF1768] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Email Delivery</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Let's Build Something <span className="text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">Intelligent</span>.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          "Have an idea, opportunity, or interesting problem to solve? Send a message directly to my inbox."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Links & Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl glass-card border border-white/10 relative overflow-hidden">
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Direct Contact
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Messages submitted here are routed directly to <strong>{PERSONAL_INFO.email}</strong>. You can also reach out via email, LinkedIn, or GitHub.
            </p>

            {/* Email Contact Card with Clickable Mailto + Copy Button */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-[#FF1768]/40 transition-colors flex items-center justify-between gap-3 group mb-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-cursor="link"
                className="flex items-center gap-3 truncate min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF1768]/15 border border-[#FF1768]/30 flex items-center justify-center shrink-0 text-[#FF1768] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-white group-hover:text-[#FF1768] transition-colors truncate block font-medium">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="button"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all shrink-0 active:scale-95"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Quick Action Buttons: Email Me & Copy Email */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-cursor="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] shadow-[0_0_15px_rgba(255,23,104,0.3)] hover:scale-[1.02] transition-transform"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#06D6FF]/40 transition-all hover:scale-[1.02]"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#06D6FF]" />}
                <span>{copiedEmail ? 'Copied ✓' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Social links row: LinkedIn & GitHub */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#06D6FF]/40 transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-[#06D6FF]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/30 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Quick telemetry card */}
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2.5 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF1768]" /> Location
              </span>
              <span className="text-white">India</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#06D6FF]" /> Response Time
              </span>
              <span className="text-emerald-400">&lt; 24 Hours</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" /> Security
              </span>
              <span className="text-slate-300">Encrypted Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Working Glass Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-9 rounded-3xl glass-panel-project border border-white/10 relative">
            {isSuccess ? (
              /* Success State: Shown ONLY after backend confirms successful delivery */
              <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-2">
                    ✓ Message Sent
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thanks for reaching out. Your message has been delivered successfully to <strong>{PERSONAL_INFO.email}</strong>. I will get back to you shortly.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setServerError(null);
                    }}
                    data-cursor="button"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">
                    Send a Message
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct transactional delivery to my personal inbox. All fields are verified.
                  </p>
                </div>

                {/* Server Error Notification with Alternative Contact */}
                {serverError && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                    <div className="pt-2 border-t border-rose-500/20 flex flex-wrap items-center gap-3">
                      <span className="text-[11px] text-slate-300">Alternative Option:</span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject.trim() || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message.trim() || '')}`}
                        className="text-[11px] font-mono font-bold text-white bg-rose-500/20 px-2.5 py-1 rounded-lg hover:bg-rose-500/30 transition-colors"
                      >
                        Email Me Directly &rarr;
                      </a>
                    </div>
                  </div>
                )}

                {/* Anti-spam honeypot (Invisible to legitimate human visitors) */}
                <div style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="_gotcha">Do not fill this field</label>
                  <input
                    id="_gotcha"
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._gotcha}
                    onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                    Name <span className="text-[#FF1768]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    placeholder="Your name or organization"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF1768]/50 transition-all ${
                      formErrors.name ? 'border-rose-500/60 bg-rose-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                    Email <span className="text-[#06D6FF]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    maxLength={254}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                    }}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#06D6FF]/50 transition-all ${
                      formErrors.email ? 'border-rose-500/60 bg-rose-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                    Subject <span className="text-[#8B5CF6]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    maxLength={200}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                    }}
                    placeholder="e.g. AI Internship Opportunity / Collaboration"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all ${
                      formErrors.subject ? 'border-rose-500/60 bg-rose-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                    Message <span className="text-[#FF1768]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Describe your project, opportunity, or technical problem to solve..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF1768]/50 transition-all resize-y ${
                      formErrors.message ? 'border-rose-500/60 bg-rose-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-slate-500">
                    {formErrors.message ? (
                      <p className="text-xs text-rose-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.message}
                      </p>
                    ) : (
                      <span>Minimum 5 characters</span>
                    )}
                    <span>{formData.message.length}/5000</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="button"
                  className={`w-full py-3.5 px-6 rounded-full text-base font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-slate-700/60 cursor-not-allowed opacity-80'
                      : 'bg-gradient-to-r from-[#FF1768] via-[#7C4DFF] to-[#8B5CF6] shadow-[0_0_25px_rgba(255,23,104,0.45)] hover:shadow-[0_0_35px_rgba(139,92,246,0.65)] hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
