import React, { useState, useEffect, useMemo, useRef, Component } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval, 
  startOfDay, 
  endOfDay, 
  parseISO,
  isWithinInterval,
  addWeeks,
  subWeeks,
  subDays,
  getHours,
  setHours,
  setMinutes
} from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Scissors, 
  Mail, 
  Plus, 
  Trash2, 
  Edit2, 
  ChevronRight, 
  ChevronLeft,
  Camera, 
  X, 
  CheckCircle2,
  Menu,
  User,
  Settings,
  Sparkles,
  Flower,
  LayoutGrid,
  List,
  Printer,
  Save,
  MessageSquare,
  Image as ImageIcon,
  Lock,
  Palette,
  Zap,
  Smile,
  Footprints,
  Gift,
  Hand,
  Phone,
  Check,
  Loader2,
  Upload,
  ChevronDown
} from 'lucide-react';
import { Service, BusinessHours, Appointment, SalonEvent, GalleryImage } from './types';
import { generateEmailDraft, generateServiceDescription } from './services/geminiService';
import { supabase, isSupabaseConfigured } from './supabase';
import { 
  sampleServices, 
  sampleGallery, 
  sampleEvents, 
  sampleHours, 
  sampleAppointments 
} from './sampleData';

const format12h = (time24: string) => {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
};

// --- Components ---

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState;
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      try {
        const parsedError = JSON.parse(this.state.error.message);
        if (parsedError.error) {
          errorMessage = `Firestore Error: ${parsedError.error} during ${parsedError.operationType} on ${parsedError.path}`;
        }
      } catch (e) {
        errorMessage = this.state.error.message || String(this.state.error);
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-stone-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-stone-900 mb-4">Application Error</h2>
            <p className="text-stone-600 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Navbar = ({ activeTab, setActiveTab, isOwner, onLogout }: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  isOwner: boolean,
  onLogout: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['home', 'about', 'booking', 'merchandise', 'events', 'try-it-out'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => {
          setActiveTab('home');
          setIsOpen(false);
          if (window.location.pathname !== '/') {
            window.history.pushState({}, '', '/');
          }
        }}
      >
        <img 
          src="https://drive.google.com/thumbnail?id=1V7IZqzcW35uSkQnGwEiKCz-PK6l0gfkc&sz=w1000" 
          alt="HoneyBeeYou Logo" 
          className="w-12 h-12 rounded-full border-2 border-bee-purple"
          referrerPolicy="no-referrer"
        />
        <span className="text-2xl font-serif font-bold tracking-tight rainbow-text">Hunny, bee you!</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-bee-white/70">
        {navLinks.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (window.location.pathname !== '/') {
                window.history.pushState({}, '', '/');
              }
            }}
            className={`hover:text-bee-purple transition-colors relative ${activeTab === tab ? 'text-bee-purple' : ''}`}
          >
            {tab === 'try-it-out' ? 'Try It Out' : tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="nav-underline" 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bee-purple" 
              />
            )}
          </button>
        ))}
        {isOwner && (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-bee-blue text-bee-blue hover:bg-bee-blue hover:text-bee-white transition-all"
          >
            <Lock size={16} />
            Logout
          </button>
        )}
      </div>
      
      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-bee-purple hover:bg-bee-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bee-black border-t border-bee-white/10 shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsOpen(false);
                  if (window.location.pathname !== '/') {
                    window.history.pushState({}, '', '/');
                  }
                }}
                className={`text-left text-lg font-serif py-2 border-b border-bee-white/5 transition-colors ${activeTab === tab ? 'text-bee-purple' : 'text-bee-white/70'}`}
              >
                {tab === 'try-it-out' ? 'Try It Out' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            {isOwner && (
              <button 
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-bee-blue text-bee-blue transition-all mt-4 font-bold uppercase tracking-widest text-xs"
              >
                <Lock size={16} />
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const [showSavvyModal, setShowSavvyModal] = useState(false);
  
  return (
    <footer className="bg-bee-black text-bee-white/50 py-12 px-6 border-t border-bee-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://picsum.photos/seed/honeybee/200/200" 
              alt="HoneyBeeYou Logo" 
              className="w-10 h-10 rounded-full border-2 border-bee-purple"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-serif font-bold rainbow-text">Hunny, bee you!</span>
          </div>
          <p className="text-sm leading-relaxed">
            Where Self Expression meets expert craft. Hunny, bee you! Studio provides custom hair and nails, pedicures, tanning, makeup, and event updos. If you want artistry, precision and a style that's unmistakably you, you're in the right chair.
          </p>
        </div>
        <div>
          <h4 className="text-bee-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
          <div className="space-y-3 text-sm">
            <p>Alexis Tucker</p>
            <p>1627 West Park Ave. </p>
            <p>Taylorville, IL. 62568</p>
            <p className="text-bee-purple">alexistucker220@gmail.com</p>
            <p>(217) 820-0675</p>
          </div>
        </div>
        <div>
          <h4 className="text-bee-white font-bold uppercase tracking-widest text-xs mb-6">Hours</h4>
          <div className="space-y-3 text-sm">
            <p>Tue - Fri: 9am - 6pm</p>
            <p>Sat: 10am - 4pm</p>
            <p className="text-bee-blue">Sun - Mon: Closed</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-bee-white/5 text-center text-[10px] uppercase tracking-[0.2em]">
        Site developed and maintained by © 2026 <button onClick={() => setShowSavvyModal(true)} className="text-bee-purple hover:underline cursor-pointer">Savvy IT</button>
      </div>

      <AnimatePresence>
        {showSavvyModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bee-black/80 backdrop-blur-sm" 
              onClick={() => setShowSavvyModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-bee-black rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-bee-white/10 text-center"
            >
              <h3 className="text-2xl font-serif text-bee-purple mb-6">Savvy IT</h3>
              <div className="space-y-4 text-bee-white/70 font-sans normal-case tracking-normal">
                <p className="flex items-center justify-center gap-3">
                  <Mail size={16} className="text-bee-purple" />
                  Savvy_i_t@outlook.com
                </p>
                <p className="flex items-center justify-center gap-3">
                  <Phone size={16} className="text-bee-purple" />
                  (217) 986-0863
                </p>
              </div>
              <button 
                onClick={() => setShowSavvyModal(false)}
                className="mt-8 rainbow-bg text-bee-black px-6 py-2 rounded-xl font-bold w-full hover:scale-[1.02] transition-transform"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

// --- Calendar Components ---

const CalendarView = ({ 
  appointments, 
  events, 
  hours 
}: { 
  appointments: Appointment[], 
  events: SalonEvent[], 
  hours: BusinessHours[] 
}) => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const next = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const prev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const getEventsForDay = (day: Date) => {
    const apts = appointments.filter(a => isSameDay(parseISO(a.date), day));
    const evts = events.filter(e => isSameDay(parseISO(e.date), day));
    return { appointments: apts, events: evts };
  };

  const getBusinessHoursForDay = (day: Date) => {
    const dayName = format(day, 'EEEE');
    return hours.find(h => h.day === dayName);
  };

  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-serif">{format(currentDate, view === 'day' ? 'MMMM d, yyyy' : 'MMMM yyyy')}</h2>
      <div className="flex items-center bg-bee-white/5 rounded-xl p-1">
        <button onClick={prev} className="p-2 hover:bg-bee-white/5 rounded-lg transition-all text-bee-white/50 hover:text-bee-white"><ChevronLeft size={18} /></button>
        <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-xs font-bold uppercase tracking-widest hover:bg-bee-white/5 rounded-lg transition-all text-bee-white/50 hover:text-bee-white">Today</button>
        <button onClick={next} className="p-2 hover:bg-bee-white/5 rounded-lg transition-all text-bee-white/50 hover:text-bee-white"><ChevronRight size={18} /></button>
      </div>
    </div>
    <div className="flex bg-bee-white/5 rounded-xl p-1">
      {(['month', 'week', 'day'] as const).map(v => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${view === v ? 'rainbow-bg text-bee-black shadow-md' : 'text-bee-white/50 hover:bg-bee-white/5'}`}
        >
          {v}
        </button>
      ))}
    </div>
    </div>
  );

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 border-t border-l border-bee-white/10">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="p-4 text-center text-[10px] font-bold uppercase tracking-widest text-bee-white/30 border-r border-b border-bee-white/10 bg-bee-white/5">
            {d}
          </div>
        ))}
        {calendarDays.map((day, i) => {
          const { appointments: dayApts, events: dayEvts } = getEventsForDay(day);
          const dayHours = getBusinessHoursForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={i} 
              className={`min-h-[120px] p-2 border-r border-b border-bee-white/10 transition-colors ${!isCurrentMonth ? 'bg-bee-white/5' : 'bg-bee-black'} ${isToday ? 'bg-bee-yellow/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold ${isToday ? 'w-6 h-6 rainbow-bg text-bee-black rounded-full flex items-center justify-center' : isCurrentMonth ? 'text-bee-white' : 'text-bee-white/20'}`}>
                  {format(day, 'd')}
                </span>
                {dayHours?.is_closed && isCurrentMonth && (
                  <span className="text-[8px] font-bold uppercase text-bee-red">Closed</span>
                )}
              </div>
              <div className="space-y-1">
                {dayEvts.map(e => (
                  <div key={e.id} className="text-[9px] p-1 bg-bee-purple/10 text-bee-purple rounded border border-bee-purple/20 truncate font-medium">
                    Event: {e.title}
                  </div>
                ))}
                {dayApts.map(a => (
                  <div key={a.id} className="text-[9px] p-1 bg-bee-yellow/10 text-bee-yellow rounded border border-bee-yellow/20 truncate font-medium">
                    {format12h(a.time)} {a.client_name} - {a.services?.join(', ')} ({a.duration}m)
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate);
    const weekDays = eachDayOfInterval({ start: startDate, end: addDays(startDate, 6) });
    const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-bee-white/10">
            <div className="p-4 border-r border-bee-white/10 bg-bee-white/5"></div>
            {weekDays.map(day => (
              <div key={day.toString()} className={`p-4 text-center border-r border-bee-white/10 ${isSameDay(day, new Date()) ? 'bg-bee-purple/5' : 'bg-bee-white/5'}`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30">{format(day, 'EEE')}</div>
                <div className={`text-lg font-serif ${isSameDay(day, new Date()) ? 'text-bee-purple font-bold' : 'text-bee-white'}`}>{format(day, 'd')}</div>
              </div>
            ))}
          </div>
          <div className="relative">
            {timeSlots.map(hour => (
              <div key={hour} className="grid grid-cols-8 border-b border-bee-white/5 h-20">
                <div className="p-2 text-[10px] font-bold text-bee-white/30 text-right border-r border-bee-white/10 pr-4">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </div>
                {weekDays.map(day => {
                  const { appointments: dayApts, events: dayEvts } = getEventsForDay(day);
                  const dayHours = getBusinessHoursForDay(day);
                  const isClosed = dayHours?.is_closed;
                  
                  const hourApts = dayApts.filter(a => {
                    const aptHour = parseInt(a.time.split(':')[0]);
                    return aptHour === hour;
                  });

                  const hourEvts = dayEvts.filter(e => {
                    const evtHour = parseInt(e.time.split(':')[0]);
                    return evtHour === hour;
                  });

                  return (
                    <div key={day.toString()} className={`border-r border-bee-white/5 relative p-1 ${isClosed ? 'bg-bee-white/5' : ''}`}>
                      {hourEvts.map(e => (
                        <div key={e.id} className="mb-1 p-2 bg-bee-purple/10 text-bee-purple rounded-lg border border-bee-purple/20 text-[10px] font-bold shadow-sm">
                          {e.title}
                        </div>
                      ))}
                      {hourApts.map(a => (
                        <div key={a.id} className="mb-1 p-2 bg-bee-blue/10 text-bee-blue rounded-lg border border-bee-blue/20 text-[10px] font-bold shadow-sm">
                          {a.client_name} - {a.services?.join(', ')} ({a.duration}m)
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8);
    const { appointments: dayApts, events: dayEvts } = getEventsForDay(currentDate);
    const dayHours = getBusinessHoursForDay(currentDate);

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 p-6 rounded-3xl bg-bee-white/5 border border-bee-white/10 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-serif font-bold text-bee-purple">{format(currentDate, 'EEEE, MMMM do')}</h3>
            <p className="text-sm text-bee-white/70">
              {dayHours?.is_closed ? 'Salon is Closed' : `Open: ${dayHours?.open_time} - ${dayHours?.close_time}`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-serif text-bee-purple">{dayApts.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-bee-white/50">Appointments</div>
          </div>
        </div>

        <div className="space-y-4">
          {timeSlots.map(hour => {
            const hourApts = dayApts.filter(a => parseInt(a.time.split(':')[0]) === hour);
            const hourEvts = dayEvts.filter(e => parseInt(e.time.split(':')[0]) === hour);
            
            return (
              <div key={hour} className="flex gap-6 group">
                <div className="w-16 pt-2 text-right text-[10px] font-bold text-bee-white/30 uppercase tracking-widest">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </div>
                <div className="flex-1 min-h-[80px] pb-4 border-b border-bee-white/5">
                  <div className="grid grid-cols-1 gap-2">
                    {hourEvts.map(e => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={e.id} 
                        className="p-4 bg-bee-purple/20 border border-bee-purple/30 rounded-2xl flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-bee-purple">{e.title}</div>
                          <div className="text-xs text-bee-purple/70">{format12h(e.time)} • {e.capacity} spots</div>
                        </div>
                        <Sparkles className="text-bee-purple/50" size={20} />
                      </motion.div>
                    ))}
                    {hourApts.map(a => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={a.id} 
                        className="p-4 bg-bee-white/5 border border-bee-white/10 rounded-2xl shadow-sm flex justify-between items-center hover:border-bee-purple/30 transition-colors"
                      >
                        <div>
                          <div className="font-bold text-bee-white">{a.client_name}</div>
                          <div className="text-xs text-bee-white/50">
                            {a.services?.join(', ')} • {format12h(a.time)} • {a.duration} mins
                          </div>
                          {a.notes && (
                            <div className="text-[10px] text-bee-purple/70 mt-1 italic">
                              Note: {a.notes}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-2 text-bee-white/30 hover:text-bee-purple transition-colors"><Mail size={16} /></button>
                          <div className="w-8 h-8 bg-bee-white/10 rounded-full flex items-center justify-center text-bee-purple">
                            <Scissors size={14} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {hourApts.length === 0 && hourEvts.length === 0 && (
                      <div className="h-full flex items-center text-bee-white/10 text-xs italic group-hover:text-bee-white/20 transition-colors">
                        No bookings scheduled
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in duration-500">
      {renderHeader()}
      <div className="glass rounded-[32px] overflow-hidden border border-bee-white/10">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>
    </div>
  );
};

// --- Pages ---

const TryItOutPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    
    // Simulate AI transformation with a delay and a filter
    setTimeout(() => {
      let appliedFilter = '';
      const p = prompt.toLowerCase();
      
      if (p.includes('blonde')) appliedFilter = 'sepia(0.5) brightness(1.2) saturate(1.5) hue-rotate(-10deg)';
      else if (p.includes('red')) appliedFilter = 'hue-rotate(320deg) saturate(2) brightness(0.9)';
      else if (p.includes('blue')) appliedFilter = 'hue-rotate(180deg) saturate(1.5)';
      else if (p.includes('pink')) appliedFilter = 'hue-rotate(280deg) saturate(1.5)';
      else if (p.includes('purple')) appliedFilter = 'hue-rotate(240deg) saturate(1.5)';
      else if (p.includes('dark') || p.includes('black')) appliedFilter = 'brightness(0.5) contrast(1.2)';
      else if (p.includes('bright') || p.includes('light')) appliedFilter = 'brightness(1.5)';
      else appliedFilter = 'contrast(1.1) saturate(1.1)';

      setFilter(appliedFilter);
      setResult(image);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif mb-4 rainbow-text">Try It Out</h2>
        <p className="text-bee-white/50 uppercase tracking-widest text-xs font-bold">Visualize Your Next Transformation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="glass rounded-[40px] p-8 border border-bee-white/10">
            <h3 className="text-2xl font-serif text-bee-purple mb-6">1. Upload Your Photo</h3>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-dashed border-bee-white/10 flex flex-center justify-center bg-bee-white/5 group hover:border-bee-purple/50 transition-all">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex flex-col items-center justify-center text-bee-white/30">
                  <Camera size={48} className="mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest">Click to Upload or Take Photo</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="glass rounded-[40px] p-8 border border-bee-white/10">
            <h3 className="text-2xl font-serif text-bee-purple mb-6">2. Describe Your Dream Look</h3>
            <div className="space-y-4">
              <textarea 
                placeholder="e.g., Platinum blonde bob, honey brown highlights with beach waves, or a sleek pixie cut..."
                className="w-full h-32 p-4 rounded-2xl bg-bee-white/5 border border-bee-white/10 text-bee-white outline-none focus:border-bee-purple transition-all resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button 
                onClick={handleTryOn}
                disabled={!image || !prompt || loading}
                className="w-full rainbow-bg text-bee-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Sparkles className="animate-spin" size={20} />
                    Processing Magic...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    See the Transformation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="glass rounded-[40px] p-8 border border-bee-white/10 flex flex-col">
          <h3 className="text-2xl font-serif text-bee-purple mb-6">3. Your Result</h3>
          <div className="flex-1 rounded-3xl overflow-hidden border border-bee-white/10 bg-bee-white/5 flex items-center justify-center relative">
            {result ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full"
              >
                <img 
                  src={result} 
                  alt="AI Result" 
                  className="w-full h-full object-cover"
                  style={{ filter: filter }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ) : (
              <div className="text-center p-8 text-bee-white/20">
                <Sparkles size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">Your AI Transformation will appear here</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-bee-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-bee-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-bee-purple font-bold uppercase tracking-widest text-xs">Mixing the colors...</p>
                </div>
              </div>
            )}
          </div>
          {result && (
            <button 
              onClick={() => {
                // In a real app, we'd render the canvas to a data URL with filters applied
                alert("Download feature coming soon! This preview uses real-time filters.");
              }}
              className="mt-6 w-full py-3 rounded-xl border border-bee-white/10 text-bee-white/50 font-bold uppercase tracking-widest text-[10px] hover:bg-bee-white/5 transition-all"
            >
              Download Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceCategory: React.FC<{ category: string, services: Service[] }> = ({ category, services }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 border border-bee-white/10 rounded-3xl overflow-hidden bg-bee-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex justify-between items-center hover:bg-bee-white/5 transition-colors text-left"
      >
        <h3 className="text-2xl font-serif text-bee-white">{category}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-bee-purple" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {services.map((service) => (
                <div key={service.id} className="p-6 rounded-2xl bg-bee-black/30 border border-bee-white/5 hover:border-bee-purple/30 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-serif font-bold text-bee-white group-hover:text-bee-purple transition-colors">{service.name}</h4>
                    <span className="text-bee-purple font-bold">{service.price}</span>
                  </div>
                  <p className="text-sm text-bee-white/50 mb-3 leading-relaxed">{service.description}</p>
                  <span className="text-[10px] text-bee-white/30 uppercase tracking-widest">{service.duration} mins</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutPage = () => {
  const categories = [
    { name: 'Haircuts & Styling', icon: <Scissors className="w-8 h-8" /> },
    { name: 'Hair Treatments & Care', icon: <Sparkles className="w-8 h-8" /> },
    { name: 'Hair Color', icon: <Palette className="w-8 h-8" /> },
    { name: 'Specialty Color and Lightening', icon: <Zap className="w-8 h-8" /> },
    { name: 'Nail Services', icon: <Hand className="w-8 h-8" /> },
    { name: 'Facial and Skin Care', icon: <Smile className="w-8 h-8" /> },
    { name: 'Foot & Spa Treatments', icon: <Footprints className="w-8 h-8" /> },
    { name: 'Beauty Add-Ons & Event Services', icon: <Gift className="w-8 h-8" /> }
  ];

  return (
    <div className="pt-32 pb-24">
      <section className="px-6 max-w-5xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-5xl font-serif mb-6 rainbow-text">Hi, I'm Alexis!</h2>
            <p className="text-lg text-bee-white/70 leading-relaxed mb-6">
              Welcome to Hunny, bee you! Studio. I'm Alexis Tucker, and I'm passionate about helping you express your true self through expert hair and nail artistry. 
            </p>
            <p className="text-lg text-bee-white/70 leading-relaxed">
              Whether you're looking for a bold new color, a relaxing pedicure, or the perfect look for your special day, I'm here to make it happen. My studio is a place where creativity meets precision, and where every client leaves feeling like their most authentic self. Let's create something beautiful together!
            </p>
          </div>
        </div>
      </section>

      <section>
        <GalleryPage images={sampleGallery} />
      </section>

      <section className="px-6 max-w-6xl mx-auto mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4 text-bee-purple">Our Expertise</h2>
          <p className="text-bee-white/50 uppercase tracking-widest text-xs font-bold">8 Dedicated Service Categories</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-bee-white/5 border border-bee-white/10 hover:border-bee-purple/50 transition-all group text-center"
            >
              <div className="w-16 h-16 bg-bee-purple/20 rounded-2xl flex items-center justify-center text-bee-purple mx-auto mb-6 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-xl font-serif text-bee-white mb-2 leading-tight">{cat.name}</h3>
              <div className="w-12 h-1 bg-bee-purple/30 mx-auto rounded-full group-hover:w-24 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MerchandisePage = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bee-white/5 border border-bee-white/10 p-12 md:p-24 rounded-[60px] backdrop-blur-xl"
      >
        <div className="w-24 h-24 bg-bee-purple/20 rounded-full flex items-center justify-center text-bee-purple mx-auto mb-8">
          <Sparkles size={48} />
        </div>
        <h2 className="text-5xl md:text-7xl font-serif mb-8 rainbow-text">Coming Soon!</h2>
        <p className="text-xl md:text-2xl text-bee-white/70 leading-relaxed max-w-2xl mx-auto">
          You will soon be able to purchase amazing things here, but until then you are welcome to stop by the salon to pick up anything you need.
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <div className="h-1 w-12 bg-bee-purple rounded-full" />
          <div className="h-1 w-12 bg-bee-blue rounded-full" />
          <div className="h-1 w-12 bg-bee-purple rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

const GalleryPage = ({ images = [] }: { images?: GalleryImage[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(500);

  // Force use of sampleGallery to ensure only the 8 requested images are shown
  const displayImages = sampleGallery;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setRadius(160);
      } else if (width < 768) {
        setRadius(240);
      } else if (width < 1024) {
        setRadius(380);
      } else if (width < 1440) {
        setRadius(450);
      } else {
        setRadius(550);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 20, restDelta: 0.001 });

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="py-24 px-6 text-center bg-bee-black">
        <h2 className="text-5xl font-serif mb-4 rainbow-text">Gallery</h2>
        <p className="text-bee-white/50">No images yet. Check back soon!</p>
      </div>
    );
  }

  const angleStep = 360 / displayImages.length;

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-bee-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-24 text-center z-30 pointer-events-none px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif mb-4 rainbow-text"
          >
            Gallery
          </motion.h2>
          <p className="text-bee-white/50 uppercase tracking-widest text-[10px] md:text-xs font-bold">Scroll to Spin the Collection</p>
        </div>

        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '4000px' }}>
          <motion.div 
            style={{ 
              rotateY: smoothRotation,
              rotateX: -5,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-[180px] h-[250px] sm:w-[240px] sm:h-[320px] md:w-[350px] md:h-[480px] lg:w-[400px] lg:h-[550px]"
          >
            {displayImages.map((image, i) => {
              const angle = i * angleStep;
              return (
                <div
                  key={image.id}
                  className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-bee-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-bee-black group cursor-pointer"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'visible',
                  }}
                >
                  <img 
                    src={image.url} 
                    alt={image.caption || "Gallery Image"} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bee-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-6 md:p-10">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-bee-purple font-bold uppercase tracking-widest text-[8px] md:text-[10px] mb-1 md:mb-2">Hunny Artistry</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-bee-purple/10 rounded-full blur-[100px] md:blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
      </div>
    </div>
  );
};

const OwnerDashboard = ({ 
  appointments, 
  services, 
  hours, 
  onUpdate 
}: { 
  appointments: Appointment[], 
  services: Service[], 
  hours: BusinessHours[],
  onUpdate: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  const [schedulingApt, setSchedulingApt] = useState<Appointment | null>(null);
  const [scheduleData, setScheduleData] = useState({ date: '', time: '' });
  const [alternativeApt, setAlternativeApt] = useState<Appointment | null>(null);
  const [altData, setAltData] = useState({ date: '', time: '' });

  const filteredAppointments = appointments.filter(a => a.status === activeTab);

  const handleApprove = async (apt: Appointment) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', apt.id);
      
      if (error) throw error;

      // Send confirmation email to both client and owner
      const emailData = {
        subject: 'Appointment Confirmed! - Hunny, bee you!',
        html: `
          <h1>Your Appointment is Confirmed!</h1>
          <p>Hi ${apt.client_name},</p>
          <p>Your appointment for ${apt.services.join(', ')} has been approved for ${apt.date} at ${format12h(apt.time)}.</p>
          <p>We look forward to seeing you!</p>
        `
      };

      await Promise.all([
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: apt.client_email, ...emailData })
        }),
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            to: 'alexistucker220@gmail.com', 
            subject: `CONFIRMED: ${apt.client_name} - ${apt.date}`,
            html: `<p>Appointment confirmed for ${apt.client_name} on ${apt.date} at ${format12h(apt.time)}.</p>`
          })
        })
      ]);

      onUpdate();
    } catch (err) {
      console.error("Error approving appointment:", err);
    }
  };

  const handleDeny = async (apt: Appointment) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', apt.id);
      
      if (error) throw error;
      onUpdate();
    } catch (err) {
      console.error("Error denying appointment:", err);
    }
  };

  const handleOfferAlternative = async () => {
    if (!alternativeApt) return;
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          status: 'alternative_offered',
          alternative_date: altData.date,
          alternative_time: altData.time
        })
        .eq('id', alternativeApt.id);
      
      if (error) throw error;

      // Send alternative offer email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: alternativeApt.client_email,
          subject: 'Alternative Time Offered - Hunny, bee you!',
          html: `
            <h1>Alternative Time Offered</h1>
            <p>Hi ${alternativeApt.client_name},</p>
            <p>We couldn't make your requested time work, but we'd love to see you on <strong>${altData.date} at ${format12h(altData.time)}</strong> instead.</p>
            <p>Please let us know if this works for you!</p>
          `
        })
      });

      setAlternativeApt(null);
      onUpdate();
    } catch (err) {
      console.error("Error offering alternative:", err);
    }
  };

  const handleSchedule = async () => {
    if (!schedulingApt) return;
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          status: 'confirmed',
          date: scheduleData.date,
          time: scheduleData.time
        })
        .eq('id', schedulingApt.id);
      
      if (error) throw error;

      // Send confirmation email to both client and owner
      const emailData = {
        subject: 'Appointment Scheduled! - Hunny, bee you!',
        html: `
          <h1>Your Appointment is Scheduled!</h1>
          <p>Hi ${schedulingApt.client_name},</p>
          <p>Your appointment for ${schedulingApt.services.join(', ')} has been scheduled for <strong>${scheduleData.date} at ${format12h(scheduleData.time)}</strong>.</p>
          <p>We look forward to seeing you!</p>
        `
      };

      await Promise.all([
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: schedulingApt.client_email, ...emailData })
        }),
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            to: 'alexistucker220@gmail.com', 
            subject: `SCHEDULED: ${schedulingApt.client_name} - ${scheduleData.date}`,
            html: `<p>You scheduled ${schedulingApt.client_name} for ${scheduleData.date} at ${format12h(scheduleData.time)}.</p>`
          })
        })
      ]);

      setSchedulingApt(null);
      onUpdate();
    } catch (err) {
      console.error("Error scheduling appointment:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-serif rainbow-text">Booking Requests</h2>
        <div className="flex bg-bee-white/5 rounded-xl p-1">
          {(['pending', 'confirmed', 'cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'rainbow-bg text-bee-black shadow-lg' : 'text-bee-white/50 hover:bg-bee-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAppointments.length === 0 ? (
          <div className="glass rounded-[32px] p-12 text-center border border-bee-white/10">
            <Sparkles className="mx-auto mb-4 text-bee-white/10" size={48} />
            <p className="text-bee-white/30 font-serif italic">No {activeTab} requests at the moment.</p>
          </div>
        ) : (
          filteredAppointments.map(apt => (
            <motion.div 
              layout
              key={apt.id}
              className="glass rounded-[32px] p-8 border border-bee-white/10 hover:border-bee-purple/30 transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rainbow-bg rounded-full flex items-center justify-center text-bee-black font-bold text-xl">
                      {apt.client_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-bee-white">{apt.client_name}</h3>
                      <p className="text-xs text-bee-white/50 uppercase tracking-widest">{apt.client_email} • {apt.client_phone}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {apt.services.map(s => (
                      <span key={s} className="px-3 py-1 bg-bee-purple/10 text-bee-purple rounded-full text-[10px] font-bold uppercase tracking-widest border border-bee-purple/20">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-bee-white/5 p-4 rounded-2xl border border-bee-white/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30 block mb-1">Requested Date</span>
                      <p className="text-sm font-bold text-bee-purple">
                        {apt.date_option === 'soonest' && 'Soonest Available'}
                        {apt.date_option === 'specific' && apt.date}
                        {apt.date_option === 'range' && `${apt.date_range_start} to ${apt.date_range_end}`}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30 block mb-1">Requested Time</span>
                      <p className="text-sm font-bold text-bee-purple">
                        {apt.time_option === 'soonest' && 'Soonest Available'}
                        {apt.time_option === 'specific' && format12h(apt.time)}
                        {apt.time_option === 'range' && `${format12h(apt.time_range_start || '')} to ${format12h(apt.time_range_end || '')}`}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30 block mb-1">Total Price</span>
                      <p className="text-sm font-bold text-bee-yellow">${apt.total_price}</p>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="p-4 bg-bee-blue/5 rounded-2xl border border-bee-blue/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bee-blue/50 block mb-1">Notes</span>
                      <p className="text-sm text-bee-white/70 italic">"{apt.notes}"</p>
                    </div>
                  )}

                  {apt.image_urls && apt.image_urls.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30 block">Attached Pictures</span>
                      <div className="flex flex-wrap gap-2">
                        {apt.image_urls.map((url, i) => (
                          <img 
                            key={i} 
                            src={url} 
                            alt={`Attachment ${i + 1}`} 
                            className="w-20 h-20 object-cover rounded-xl border border-bee-white/10"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {!apt.is_for_self && (
                    <div className="flex items-center gap-2 text-xs text-bee-yellow font-bold uppercase tracking-widest">
                      <User size={14} /> Appointment for: {apt.other_person_name}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                  {apt.status === 'pending' && (
                    <>
                      {apt.date_option === 'specific' && apt.time_option === 'specific' ? (
                        <>
                          <button 
                            onClick={() => handleApprove(apt)}
                            className="w-full py-3 rounded-xl bg-bee-purple text-bee-black font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 size={16} /> Approve
                          </button>
                          <button 
                            onClick={() => {
                              setAlternativeApt(apt);
                              setAltData({ date: apt.date, time: apt.time });
                            }}
                            className="w-full py-3 rounded-xl border border-bee-purple text-bee-purple font-bold uppercase tracking-widest text-[10px] hover:bg-bee-purple/10 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit2 size={16} /> Offer Alternative
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => {
                            setSchedulingApt(apt);
                            setScheduleData({ 
                              date: apt.date || apt.date_range_start || '', 
                              time: apt.time || apt.time_range_start || '' 
                            });
                          }}
                          className="w-full py-3 rounded-xl bg-bee-blue text-bee-white font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                          <CalendarIcon size={16} /> Schedule
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeny(apt)}
                        className="w-full py-3 rounded-xl border border-bee-white/10 text-bee-white/30 font-bold uppercase tracking-widest text-[10px] hover:bg-bee-red/10 hover:text-bee-red hover:border-bee-red/30 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} /> Deny
                      </button>
                    </>
                  )}
                  {apt.status === 'confirmed' && (
                    <div className="text-center p-4 bg-bee-green/10 rounded-2xl border border-bee-green/20">
                      <CheckCircle2 className="text-bee-green mx-auto mb-2" size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bee-green">Confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Scheduling Modal */}
      <AnimatePresence>
        {schedulingApt && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bee-black/80 backdrop-blur-sm" 
              onClick={() => setSchedulingApt(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-bee-black rounded-[40px] p-10 max-w-md w-full shadow-2xl border border-bee-white/10"
            >
              <h3 className="text-3xl font-serif text-bee-purple mb-6">Schedule Appointment</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-bee-white/30">Set Final Date</label>
                  <input 
                    type="date" 
                    className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 focus:border-bee-purple outline-none transition-all text-bee-white"
                    value={scheduleData.date}
                    onChange={e => setScheduleData({ ...scheduleData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-bee-white/30">Set Final Time</label>
                  <input 
                    type="time" 
                    className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 focus:border-bee-purple outline-none transition-all text-bee-white"
                    value={scheduleData.time}
                    onChange={e => setScheduleData({ ...scheduleData, time: e.target.value })}
                  />
                </div>
                <button 
                  onClick={handleSchedule}
                  className="w-full rainbow-bg text-bee-black py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-xl"
                >
                  Confirm & Notify Client
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Alternative Offer Modal */}
      <AnimatePresence>
        {alternativeApt && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bee-black/80 backdrop-blur-sm" 
              onClick={() => setAlternativeApt(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-bee-black rounded-[40px] p-10 max-w-md w-full shadow-2xl border border-bee-white/10"
            >
              <h3 className="text-3xl font-serif text-bee-purple mb-6">Offer Alternative</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-bee-white/30">Alternative Date</label>
                  <input 
                    type="date" 
                    className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 focus:border-bee-purple outline-none transition-all text-bee-white"
                    value={altData.date}
                    onChange={e => setAltData({ ...altData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-bee-white/30">Alternative Time</label>
                  <input 
                    type="time" 
                    className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 focus:border-bee-purple outline-none transition-all text-bee-white"
                    value={altData.time}
                    onChange={e => setAltData({ ...altData, time: e.target.value })}
                  />
                </div>
                <button 
                  onClick={handleOfferAlternative}
                  className="w-full border border-bee-purple text-bee-purple py-4 rounded-xl font-bold hover:bg-bee-purple/10 transition-all shadow-xl"
                >
                  Send Alternative Offer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SecuredOwnerPage = ({ onLogin, isOwner, services, appointments, events, gallery, hours }: { onLogin: () => void, isOwner: boolean, services: Service[], appointments: Appointment[], events: SalonEvent[], gallery: GalleryImage[], hours: BusinessHours[] }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1627WParkAve') {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  if (isOwner) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <OwnerDashboard 
          appointments={appointments} 
          services={services} 
          hours={hours}
          onUpdate={() => {
            // Real-time subscription will handle the update, 
            // but we could also trigger a manual fetch if needed.
          }}
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-bee-black rounded-[40px] p-10 border border-bee-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rainbow-bg rounded-full flex items-center justify-center text-bee-black mx-auto mb-4 shadow-lg">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-serif text-bee-purple">Secured Owner Area</h2>
          <p className="text-bee-white/50 text-sm mt-2">Enter the owner password to proceed</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-bee-white/30">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 focus:border-bee-purple outline-none transition-all text-bee-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-bee-blue text-xs font-bold">{error}</p>}

          <button 
            className="w-full rainbow-bg text-bee-black py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-xl"
          >
            Enter Area
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const HomePage = ({ onBook }: { onBook: () => void }) => (
  <div className="pt-24">
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://drive.google.com/thumbnail?id=1V7IZqzcW35uSkQnGwEiKCz-PK6l0gfkc&sz=w2000" 
          alt="Salon Interior" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bee-black/20 to-bee-black" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://drive.google.com/thumbnail?id=1V7IZqzcW35uSkQnGwEiKCz-PK6l0gfkc&sz=w1000" 
            alt="HoneyBeeYou Logo" 
            className="w-32 h-32 rounded-full border-4 border-bee-purple mx-auto mb-8 shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <span className="text-bee-purple font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Welcome to Hunny, bee you!</span>
          <h1 className="text-6xl md:text-7xl font-serif leading-tight mb-8">
            Where Self Expression <br />
            meets <span className="italic rainbow-text">expert craft</span>.
          </h1>
          <p className="text-lg text-bee-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Hunny, bee you! Studio provides custom hair and nails, pedicures, tanning, makeup, and event updos. If you want artistry, precision and a style that's unmistakably you, you're in the right chair.
          </p>
          <button 
            onClick={() => {
              if ((window as any).Bookings) {
                (window as any).Bookings.buttonModal({
                  url: "https://hunnybeeyousalon.zohobookings.com/portal-embed#/4766616000000051056?hide_event_details=true",
                  text: "Book A Session",
                  color: "#5646A5",
                  textColor: "#ffffff",
                  position: "bottom-right"
                });
              }
            }}
            className="bg-[#171717] text-white px-6 py-[10px] rounded-[6px] text-[15px] font-medium hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto cursor-pointer border-none"
          >
            Book Now
          </button>
        </motion.div>
      </div>
    </section>

    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <Scissors className="text-bee-purple" />, title: "Expert Styling", desc: "Our experts are masters of their craft, ensuring you leave feeling like royalty." },
          { icon: <Sparkles className="text-bee-purple" />, title: "Premium Products", desc: "We use only the finest honey-infused and organic products for your hair." },
          { icon: <Clock className="text-bee-purple" />, title: "Timely Service", desc: "Your time is precious. We value punctuality and dedicated attention." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-8 rounded-3xl bg-bee-white/5 border border-bee-white/10 hover:border-bee-purple/30 transition-all"
          >
            <div className="w-12 h-12 bg-bee-white/10 rounded-2xl flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-bee-purple">{item.title}</h3>
            <p className="text-bee-white/70 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const ServicesPage = ({ services }: { services: Service[] }) => (
  <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-serif mb-4 rainbow-text">Our Menu</h2>
      <p className="text-bee-white/50 uppercase tracking-widest text-xs font-bold">Sweet Treatments for Every Crown</p>
    </div>
    
    <div className="space-y-8">
      {services.map((service, i) => (
        <motion.div 
          key={service.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl bg-bee-white/5 border border-bee-white/10 group hover:border-bee-purple/30 transition-colors"
        >
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-serif font-bold text-bee-white group-hover:text-bee-purple transition-colors">{service.name}</h3>
            <p className="text-bee-white/50 text-sm mt-1 max-w-md">{service.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs font-bold uppercase tracking-tighter text-bee-purple">
              <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-serif font-light text-bee-purple">${service.price}</span>
            <div className="text-[10px] uppercase tracking-widest text-bee-white/30 mt-1">Starting at</div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
const BookingPage = () => {
  useEffect(() => {
    const initBooking = () => {
      if ((window as any).Bookings) {
        (window as any).Bookings.inlineEmbed({
          url: "https://hunnybeeyousalon.zohobookings.com/portal-embed#/4766616000000051056?hide_event_details=true",
          parent: "#inline-container",
          height: "600px"
        });
      } else {
        setTimeout(initBooking, 500);
      }
    };
    initBooking();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif mb-4 rainbow-text">Book Your Session</h2>
        <p className="text-bee-white/50 uppercase tracking-widest text-xs font-bold">Secure Your Spot in the Hive</p>
      </div>
      <div className="glass rounded-[40px] overflow-hidden border border-bee-white/10 shadow-2xl min-h-[600px]">
        <div id="inline-container"></div>
      </div>
    </div>
  );
};

const EventsPage = ({ events }: { events: SalonEvent[] }) => {
  const [registering, setRegistering] = useState<string | null>(null);
  const [regData, setRegData] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registering) return;
    try {
      const { error } = await supabase.from('event_registrations').insert({
        event_id: registering,
        ...regData,
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;

      // Update registration count on event
      const event = events.find(ev => ev.id === registering);
      if (event) {
        await supabase.from('salon_events').update({
          registration_count: (event.registration_count || 0) + 1
        }).eq('id', registering);
      }

      setSuccess(true);
      setTimeout(() => {
        setRegistering(null);
        setSuccess(false);
        setRegData({ name: '', email: '' });
      }, 2000);
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif mb-4 rainbow-text">Salon Events</h2>
        <p className="text-bee-white/50 uppercase tracking-widest text-xs font-bold">Workshops, Mixers & Pop-ups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-bee-white/5 rounded-3xl overflow-hidden border border-bee-white/10 shadow-sm hover:border-bee-purple/30 transition-all">
            <div className="h-48 bg-bee-white/10 relative">
              <div className="absolute inset-0 flex items-center justify-center text-bee-purple opacity-10">
                <Flower size={120} />
              </div>
              <div className="absolute bottom-4 left-6 bg-bee-black px-4 py-2 rounded-xl shadow-sm border border-bee-white/10">
                <div className="text-xs font-bold text-bee-purple uppercase tracking-widest">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-3 text-bee-white">{event.title}</h3>
              <p className="text-bee-white/50 text-sm mb-6 leading-relaxed">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-bee-white/30 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> {event.time} • {event.capacity} spots
                </div>
                <button 
                  onClick={() => setRegistering(event.id)}
                  className="bg-bee-white/10 text-bee-white px-6 py-2 rounded-full text-sm font-bold hover:bg-bee-purple hover:text-bee-black transition-all"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {registering && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-bee-black/80 backdrop-blur-sm" onClick={() => setRegistering(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-bee-black rounded-[32px] p-10 max-w-md w-full shadow-2xl border border-bee-white/10"
          >
            {success ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-bee-green mx-auto mb-4" />
                <h3 className="text-2xl font-serif mb-2 text-bee-purple">You're In!</h3>
                <p className="text-bee-white/50">We've added you to the guest list.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-serif mb-6 text-bee-purple">Event Registration</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30">Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 outline-none focus:border-bee-purple text-bee-white"
                      value={regData.name}
                      onChange={e => setRegData({ ...regData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-bee-white/30">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full p-4 rounded-xl bg-bee-white/5 border border-bee-white/10 outline-none focus:border-bee-purple text-bee-white"
                      value={regData.email}
                      onChange={e => setRegData({ ...regData, email: e.target.value })}
                    />
                  </div>
                  <button className="w-full rainbow-bg text-bee-black py-4 rounded-xl font-bold mt-4 hover:scale-[1.02] transition-all">Confirm Spot</button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [events, setEvents] = useState<SalonEvent[]>([]);
  const [hours, setHours] = useState<BusinessHours[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    const initFloatingButton = () => {
      if ((window as any).Bookings) {
        (window as any).Bookings.buttonModal({
          url: "https://hunnybeeyousalon.zohobookings.com/portal-embed#/4766616000000051056?hide_event_details=true",
          text: "Book A Session",
          color: "#5646A5",
          textColor: "#ffffff",
          position: "bottom-right"
        });
      } else {
        setTimeout(initFloatingButton, 500);
      }
    };
    initFloatingButton();

    const fetchData = async () => {
      // Add a safety timeout to ensure we don't hang on "getting ready"
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.warn("Data fetching timed out. Falling back to sample data.");
          setServices(sampleServices);
          setGallery(sampleGallery);
          setEvents(sampleEvents);
          setHours(sampleHours);
          setAppointments(sampleAppointments);
          setLoading(false);
        }
      }, 10000); // 10 second timeout

      if (!isSupabaseConfigured) {
        clearTimeout(timeoutId);
        console.warn("Supabase not configured. Using sample data (Demo Mode).");
        setServices(sampleServices);
        setGallery(sampleGallery);
        setEvents(sampleEvents);
        setHours(sampleHours);
        setAppointments(sampleAppointments);
        setLoading(false);
        return;
      }

      try {
        const [
          { data: servicesData, error: servicesError },
          { data: galleryData, error: galleryError },
          { data: eventsData, error: eventsError },
          { data: hoursData, error: hoursError },
          { data: appointmentsData, error: appointmentsError }
        ] = await Promise.all([
          supabase.from('services').select('*').order('name'),
          supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
          supabase.from('salon_events').select('*').order('date'),
          supabase.from('business_hours').select('*'),
          supabase.from('appointments').select('*')
        ]);

        if (servicesError) throw servicesError;
        if (galleryError) throw galleryError;
        if (eventsError) throw eventsError;
        if (hoursError) throw hoursError;
        if (appointmentsError) throw appointmentsError;

        if (servicesData) setServices(servicesData);
        if (galleryData) setGallery(galleryData);
        if (eventsData) setEvents(eventsData);
        if (hoursData) setHours(hoursData);
        if (appointmentsData) setAppointments(appointmentsData);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        if (err instanceof Error && (err.message.includes('Supabase URL') || err.message.includes('apiKey'))) {
          setConfigError(err.message);
        } else {
          // For other errors, fallback to sample data so the app is usable
          setServices(sampleServices);
          setGallery(sampleGallery);
          setEvents(sampleEvents);
          setHours(sampleHours);
          setAppointments(sampleAppointments);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscriptions
    let appointmentsSub: any;
    if (isSupabaseConfigured) {
      try {
        appointmentsSub = supabase
          .channel('appointments-changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, payload => {
            if (payload.eventType === 'INSERT') {
              setAppointments(prev => [...prev, payload.new as Appointment]);
            } else if (payload.eventType === 'UPDATE') {
              setAppointments(prev => prev.map(a => a.id === payload.new.id ? payload.new as Appointment : a));
            } else if (payload.eventType === 'DELETE') {
              setAppointments(prev => prev.filter(a => a.id !== payload.old.id));
            }
          })
          .subscribe();
      } catch (err) {
        console.warn("Could not set up real-time subscriptions:", err);
      }
    }

    return () => {
      if (appointmentsSub) {
        supabase.removeChannel(appointmentsSub);
      }
    };
  }, []);

  if (configError) {
    return (
      <div className="h-screen w-screen bg-bee-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-bee-blue/20 rounded-full flex items-center justify-center text-bee-blue mb-6">
          <Settings size={32} />
        </div>
        <h2 className="text-2xl font-serif text-bee-white mb-4">Configuration Required</h2>
        <p className="text-bee-white/50 max-w-md mb-8">{configError}</p>
        <div className="bg-bee-white/5 p-6 rounded-2xl border border-bee-white/10 text-left text-sm font-mono text-bee-purple">
          <p className="mb-2 text-bee-white/30 uppercase text-[10px] font-bold tracking-widest">Setup Steps:</p>
          <p>1. Open Settings menu</p>
          <p>2. Add VITE_SUPABASE_URL</p>
          <p>3. Add VITE_SUPABASE_ANON_KEY</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen w-screen bg-bee-black flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-bee-purple mb-4"
        >
          <Flower size={48} />
        </motion.div>
        <p className="rainbow-text font-serif text-xl">Hunny, we're getting ready...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bee-black text-bee-white selection:bg-bee-purple selection:text-bee-black">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOwner={isOwner} 
          onLogout={() => setIsOwner(false)} 
        />

        {!isSupabaseConfigured && (
          <div className="fixed bottom-0 left-0 right-0 z-[100] bg-bee-purple text-bee-black py-2 px-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest shadow-2xl">
            <div className="flex items-center gap-2">
              <Settings size={14} />
              <span>Demo Mode: Using sample data. Configure Supabase in Settings to enable real-time features.</span>
            </div>
            <button 
              onClick={() => setConfigError('Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.')}
              className="underline hover:opacity-80"
            >
              Setup Now
            </button>
          </div>
        )}

        <main>
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HomePage onBook={() => setActiveTab('booking')} />
              </motion.div>
            )}
            {activeTab === 'about' && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AboutPage />
              </motion.div>
            )}
            {activeTab === 'merchandise' && (
              <motion.div key="merchandise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MerchandisePage />
              </motion.div>
            )}
            {activeTab === 'booking' && (
              <motion.div key="booking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BookingPage />
              </motion.div>
            )}
            {activeTab === 'try-it-out' && (
              <motion.div key="try-it-out" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TryItOutPage />
              </motion.div>
            )}
            {activeTab === 'calendar' && (
              <motion.div key="calendar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CalendarView appointments={appointments} events={events} hours={hours} />
              </motion.div>
            )}
            {activeTab === 'events' && (
              <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EventsPage events={events} />
              </motion.div>
            )}
            {activeTab === 'owner' && (
              <motion.div key="owner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SecuredOwnerPage 
                  onLogin={() => setIsOwner(true)} 
                  isOwner={isOwner}
                  services={services}
                  appointments={appointments}
                  events={events}
                  gallery={gallery}
                  hours={hours}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
