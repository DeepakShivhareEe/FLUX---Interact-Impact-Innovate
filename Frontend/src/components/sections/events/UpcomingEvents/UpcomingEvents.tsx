import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Award, Mic2 } from 'lucide-react';
import ideathon from '@/assets/images/ideathon.webp';
import conferenceImg from '@/assets/images/conferenceImg.webp';
import sheLeadsBanner from '@/assets/images/she_leads_hero_banner.jpg';
import orientation from '@/assets/images/freshmen_orientation_poster.png';
const RAW_API_BASE = (import.meta.env as any).VITE_API_BASE_URL ?? (import.meta.env as any).VITE_API_BASE ?? '/api';
const API_BASE = (RAW_API_BASE || '/api').replace(/\/+$/, ''); // remove trailing slash

export interface UpcomingEventsSectionProps { }

export interface EventProps {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isUpcoming: boolean;
  location?: string;
  attendees?: number;
  category: 'Tech' | 'Design' | 'Business' | 'Innovation';
  prize?: string;
  featured?: boolean;
  registrationClosed?: boolean;
}

const events: EventProps[] = [
  {
    id: 1,
    title: 'ByteBrawl x Hacktoberfest (Winners Announced 🏆)',
    date: '26 - 29 October, 2026 (Concluded)',
    description:
      "High-intensity competitive coding showdown successfully concluded! Final round winners announced: 1st: 2 Pointer Approach (MMMUT), 2nd: Quarks (ITM), 3rd: Team nakshatra (MMMUT), with special honors to P² & Supic. Organized by FLUX, Department of CSE, MMMUT Gorakhpur.",
    imageUrl: conferenceImg,
    isUpcoming: false,
    location: 'Alan Turing Hall, MMMUT',
    attendees: 300,
    category: 'Innovation',
    prize: 'Trophies, Certificates & Swag',
    featured: true,
    registrationClosed: true,
  },
  {
    id: 2,
    title: 'She Leads',
    date: '12 - 13 September (Ended)',
    description:
      "An empowering leadership and tech summit designed to inspire, mentor, and connect tech innovators and future leaders. Event successfully concluded.",
    imageUrl: sheLeadsBanner,
    isUpcoming: false,
    location: 'MMMUT Gorakhpur',
    attendees: 300,
    category: 'Innovation',
    prize: 'Certificates & Swag',
    featured: false,
    registrationClosed: true,
  },
  {
    id: 3,
    title: 'FLUX Orientation',
    date: 'September 2025 (Completed)',
    description:
      "The FLUX Annual Orientation session successfully welcomed new members, introducing them to our society wings, technical projects, and upcoming hackathons.",
    imageUrl: orientation,
    isUpcoming: false,
    location: 'MMMUT Gorakhpur',
    attendees: 300,
    category: 'Tech',
    prize: '',
    featured: false,
    registrationClosed: true,
  }
];

const EventCard: React.FC<{ event: EventProps; index: number; showRegister?: boolean }> = ({ event, index, showRegister }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Registration modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech': return 'from-white to-gray-300';
      case 'Innovation': return 'from-gray-200 to-gray-400';
      case 'Design': return 'from-gray-300 to-gray-500';
      case 'Business': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  // Client-side validation
  const validateForm = () => {
    if (!name.trim() || !branch.trim() || !year.trim() || !rollNo.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage('Please enter a valid phone number (digits only).');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          name,
          branch,
          year,
          rollNo,
          phone,
          email
        })
      });
      if (!res.ok) {
        let data: any = null;
        try {
          data = await res.json();
        } catch (_) {
          data = null;
        }
        let message = data?.message || data?.error || null;
        if (!message) {
          if (res.status === 409) {
            message = 'It looks like this entry already exists for this event.';
          } else if (res.status === 400 || res.status === 422) {
            message = 'Invalid submission. Please check your form fields and try again.';
          } else if (res.status >= 500) {
            message = 'Server error. Please try again later.';
          } else {
            message = `Request failed with status ${res.status}.`;
          }
        }
        throw new Error(message);
      }
      setSuccessMessage('Registration successful! We will contact you via email or phone.');
      setName('');
      setBranch('');
      setYear('');
      setRollNo('');
      setPhone('');
      setEmail('');
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage('');
      }, 1500);
    } catch (err: any) {
      let friendly = 'Registration failed. Please try again.';
      if (err instanceof TypeError || /Failed to fetch/i.test(String(err.message || ''))) {
        friendly = 'Unable to connect to the server. Please check your network or try again later.';
      } else if (err.message) {
        friendly = err.message;
      }
      setErrorMessage(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        whileHover={{
          scale: 1.015,
          boxShadow: '0 25px 50px rgba(255,255,255,0.08)'
        }}
        transition={{ duration: 0.4 }}
        className="card-outline relative bg-gradient-to-br from-gray-900/95 to-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-xl"
      >
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            background: isHovered
              ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12))'
              : 'transparent'
          }}
          transition={{ duration: 0.5 }}
          style={{ padding: '2px' }}
        >
          <div className="h-full w-full bg-gradient-to-br from-gray-900/95 to-gray-800/90 rounded-3xl" />
        </motion.div>
        <div className="relative z-10 p-6 md:p-8">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <motion.div
              className="relative group/image lg:col-span-2"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] w-full bg-black">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.9 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(event.category)} shadow-lg`}>
                    {event.category}
                  </span>
                </div>
                {event.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-white to-gray-300 shadow-lg flex items-center gap-1">
                      <Award size={12} />
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-white leading-tight"
                    animate={isHovered ? {
                      textShadow: '0 0 20px rgba(255,255,255,0.3)'
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {event.title}
                  </motion.h3>
                </div>
              </div>
            </motion.div>

            <div className="space-y-5 lg:col-span-3 flex flex-col justify-center">
              <motion.p
                className="text-gray-300 text-base leading-relaxed"
                animate={isHovered ? { opacity: 1 } : { opacity: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                {event.description}
              </motion.p>

              {event.title?.toLowerCase().includes('ideathon') && (
                <button
                  onClick={() => navigate('/ideathon')}
                  className="inline-flex items-center gap-2 px-4 py-2 max-md:px-5 max-md:py-2.5 max-md:min-h-[44px] bg-white hover:bg-gray-200 text-black rounded-full font-semibold shadow-lg mt-1 w-fit"
                >
                  View Detail
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {event.title?.toLowerCase().includes('she lead') && (
                <button
                  onClick={() => navigate('/she-leads')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 max-md:min-h-[44px] bg-white hover:bg-zinc-100 text-black rounded-full font-semibold shadow-md border border-rose-200/40 hover:scale-105 active:scale-95 transition-all duration-200 mt-1 w-fit"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-rose-500" />
                </button>
              )}

              {event.title?.toLowerCase().includes('bytebrawl') && (
                <button
                  onClick={() => navigate('/events/bytebrawl-hacktoberfest')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 max-md:min-h-[44px] bg-white hover:bg-zinc-100 text-black rounded-full font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-200 mt-1 w-fit"
                >
                  <span>Explore Event</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {showRegister && (
                <div className="pt-1 flex flex-wrap gap-3">
                  {event.registrationClosed ? (
                    <button
                      className="inline-flex items-center gap-2 px-5 py-2.5 max-md:min-h-[44px] bg-white/10 text-rose-300 border border-rose-500/30 rounded-full font-semibold shadow-lg cursor-not-allowed text-sm"
                      disabled
                    >
                      Registrations Closed
                    </button>
                  ) : event.title?.toLowerCase().includes('bytebrawl') ? (
                    <button
                      onClick={() => navigate('/events/bytebrawl-hacktoberfest/register')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 max-md:min-h-[44px] bg-white hover:bg-gray-200 text-black rounded-full font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer text-sm"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : event.date === 'Coming Soon' ? (
                    <button
                      className="inline-flex items-center gap-2 px-5 py-2.5 max-md:min-h-[44px] bg-gray-500 cursor-not-allowed text-white rounded-full font-semibold shadow-lg text-sm"
                      disabled
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 max-md:min-h-[44px] bg-white hover:bg-gray-200 text-black rounded-full font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-5 h-5 text-white/80" />
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="text-white font-semibold text-sm">{event.date}</p>
                  </div>
                </motion.div>
                {event.location && (
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="w-5 h-5 text-white/80" />
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider">Location</p>
                      <p className="text-white font-semibold text-sm">{event.location}</p>
                    </div>
                  </motion.div>
                )}
                {event.attendees && (
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Users className="w-5 h-5 text-white/80" />
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider">Expected</p>
                      <p className="text-white font-semibold text-sm">{event.attendees}+ Attendees</p>
                    </div>
                  </motion.div>
                )}
                {event.prize && (
                  <motion.div
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Award className="w-5 h-5 text-white/80" />
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider">Prize Pool</p>
                      <p className="text-white font-semibold text-sm">{event.prize}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: isHovered ? [-6, -12, -6] : [0, -4, 0],
                opacity: isHovered ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
                scale: isHovered ? [1, 1.6, 1] : [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.form
              className="relative z-10 w-full max-w-lg bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              onSubmit={submitRegistration}
            >
              <h3 className="text-xl font-bold mb-1">Register for: <span className="font-semibold text-white">{event.title}</span></h3>
              <p className="text-sm text-gray-400 mb-5">Fill the form and submit. We will save your info for this event.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Roll No." value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              {errorMessage && <p className="text-sm text-red-400 mt-3">{errorMessage}</p>}
              {successMessage && <p className="text-sm text-green-400 mt-3">{successMessage}</p>}
              <div className="mt-5 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-5 py-2 rounded-full bg-white hover:bg-gray-200 text-black font-semibold transition-colors disabled:opacity-50">
                  {loading ? 'Registering...' : 'Submit'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const UpcomingEvents: React.FC<UpcomingEventsSectionProps> = () => {
  const upcomingEvents = events.filter(event => event.isUpcoming);
  return (
    <section id="upcoming-events" className="py-20 px-4 relative bg-transparent min-h-screen">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight text-white"
          >
            Upcoming Events
          </motion.h2>
          <p className="text-gray-500 text-sm md:text-base tracking-wide">
            Mark your calendars for these exciting events
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
        </motion.div>
        <div className="space-y-12 md:space-y-16">
          <AnimatePresence>
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id ?? index} event={event} index={index} showRegister={index < 2} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
