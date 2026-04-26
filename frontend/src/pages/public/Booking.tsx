import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, ShieldCheck, AlertCircle, Activity, Grid
} from 'lucide-react';
import { TimeSlot } from '../../components/booking/TimeSlot';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

import { useToast } from '../../components/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

interface TimeSlotData {
  time: string;
  isBooked: boolean;
}

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Hierarchy State Machine
  const [courts, setCourts] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Input CS Manual
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  const [timeSlots, setTimeSlots] = useState<TimeSlotData[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const refreshTrigger = useMemo(() => Date.now(), [bookingStatus]);

  // Derived Sports Data from API
  const sportsData: { sport: string, courts: any[] }[] = useMemo(() => {
    const grouped = courts.reduce((acc, court) => {
      const sportName = court.type.charAt(0).toUpperCase() + court.type.slice(1);
      if (!acc[sportName]) acc[sportName] = [];
      acc[sportName].push(court);
      return acc;
    }, {} as Record<string, any[]>);

    return Object.keys(grouped).map(sport => ({
      sport,
      courts: grouped[sport]
    }));
  }, [courts]);

  useEffect(() => {
    fetch(`${API_URL}/courts/`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCourts(data.data.filter((c: any) => c.is_active));
        }
      })
      .catch(err => console.error('Failed to fetch courts', err));
  }, []);

  // Handle Sport Selection
  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport);
    setSelectedCourt(null);
    setSelectedSlots([]);
  };

  // Handle Court Selection
  const handleCourtSelect = (courtId: number) => {
    setSelectedCourt(courtId);
    setSelectedSlots([]);
  };

  // Auto-select from URL
  useEffect(() => {
    window.scrollTo(0, 0);
    const courtIdParam = searchParams.get('court_id');
    const dateParam = searchParams.get('date');
    if (courtIdParam && !isNaN(Number(courtIdParam)) && courts.length > 0) {
      const courtId = Number(courtIdParam);
      const c = courts.find(c => c.id === courtId);
      if (c) {
        setSelectedSport(c.type.charAt(0).toUpperCase() + c.type.slice(1));
        setSelectedCourt(courtId);
      }
    }
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams, courts]);

  // Fetch Availability
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedCourt || !selectedDate) return;

      setSelectedSlots([]);
      setIsLoadingSlots(true);
      setErrorMessage('');

      try {
        const response = await fetch(`${API_URL}/bookings/availability?court_id=${selectedCourt}&date=${selectedDate}`);
        const result = await response.json();

        if (response.ok) {
          setTimeSlots(result.data);
        } else {
          throw new Error(result.message || 'Gagal memuat jadwal');
        }
      } catch (error: any) {
        setErrorMessage(error.message);
        setTimeSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchAvailability();
  }, [selectedCourt, selectedDate, refreshTrigger]);

  // Kalkulasi Harga & Payload
  const currentCourtParams = useMemo(() => {
    return courts.find(c => c.id === selectedCourt) || null;
  }, [courts, selectedCourt]);

  const duration = selectedSlots.length;
  const totalPrice = currentCourtParams ? currentCourtParams.price_per_hour * duration : 0;

  // Sort selected slots chronologically to get start time
  const sortedSelectedSlots = useMemo(() => {
    return [...selectedSlots].sort((a, b) => parseInt(a.split(':')[0]) - parseInt(b.split(':')[0]));
  }, [selectedSlots]);

  const startTime = sortedSelectedSlots.length > 0 ? sortedSelectedSlots[0] : null;

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  // Smart Disable Logic for Past Time
  const isPastTime = (time: string) => {
    if (selectedDate !== new Date().toISOString().split('T')[0]) return false;
    const hour = parseInt(time.split(':')[0], 10);
    return hour <= new Date().getHours();
  };

  // Smart Multi-Slot Selection Logic
  const handleSlotClick = (time: string) => {
    const isBooked = timeSlots.find(s => s.time === time)?.isBooked || isPastTime(time);
    if (isBooked) return;

    if (selectedSlots.length === 0) {
      setSelectedSlots([time]);
      return;
    }

    const clickedHour = parseInt(time.split(':')[0], 10);
    const selectedHours = selectedSlots.map(s => parseInt(s.split(':')[0], 10)).sort((a, b) => a - b);

    // If clicking an already selected slot
    if (selectedSlots.includes(time)) {
      if (clickedHour === selectedHours[0] || clickedHour === selectedHours[selectedHours.length - 1]) {
        // If it's at the edge, remove it
        setSelectedSlots(selectedSlots.filter(s => s !== time));
      } else {
        // If it's in the middle, reset selection
        setSelectedSlots([time]);
      }
      return;
    }

    const minHour = selectedHours[0];
    const maxHour = selectedHours[selectedHours.length - 1];

    if (clickedHour === minHour - 1 || clickedHour === maxHour + 1) {
      setSelectedSlots([...selectedSlots, time]);
    } else {
      setSelectedSlots([time]); // Reset if not consecutive
    }
  };

  // Submit Booking
  const handleBookingSubmit = async () => {
    if (!selectedCourt || !selectedDate || selectedSlots.length === 0) return;
    if (bookingStatus === 'submitting') return; // Double click guard

    setBookingStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          court_id: selectedCourt,
          date: selectedDate,
          start_time: startTime, // The first slot
          duration: duration,
          customer_name: customerName || 'Tamu Web',
          phone: customerPhone || '-'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setBookingResult(result.data);
        setBookingStatus('success');
        toast('Booking berhasil diamankan!', 'success');
        window.scrollTo(0, 0);
      } else {
        if (response.status === 409) {
          toast('Slot sudah terisi, silakan pilih jam lain', 'warning');
          setSelectedSlots([]);
        } else {
          toast(result.message || 'Gagal melakukan booking', 'error');
        }
        throw new Error(result.message || 'Gagal melakukan booking');
      }
    } catch (error: any) {
      setBookingStatus('error');
      setErrorMessage(error.message);
      if (error.message.includes('available') || error.message.includes('terisi')) {
        setSelectedSlots([]);
      }
    }
  };

  const steps = [
    { label: 'Pilih Olahraga', isActive: true, isDone: !!selectedSport },
    { label: 'Pilih Lapangan', isActive: !!selectedSport, isDone: !!selectedCourt },
    { label: 'Pilih Jadwal', isActive: !!selectedCourt, isDone: selectedSlots.length > 0 },
    { label: 'Konfirmasi', isActive: selectedSlots.length > 0, isDone: false }
  ];

  if (bookingStatus === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-20">
        <Card className="max-w-lg w-full text-center border-green-200 p-10 md:p-14 shadow-2xl shadow-green-100">
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20"></div>
            <ShieldCheck className="w-14 h-14 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Booking Berhasil!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed font-medium">
            Permintaan booking Anda untuk <strong className="text-slate-900">{currentCourtParams?.name}</strong> pada <strong className="text-slate-900">{bookingResult?.date || selectedDate}</strong> jam <strong className="text-slate-900">{bookingResult?.start_time?.substring(0,5) || startTime}</strong> selama <strong className="text-slate-900">{bookingResult?.duration || duration} Jam</strong> telah diamankan.
          </p>
          <div className="bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-200/60 text-left">
            <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">Total Pembayaran</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{formatRupiah(Number(bookingResult?.total_price) || totalPrice)}</p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setBookingStatus('idle');
                setBookingResult(null);
                setSelectedSlots([]);
              }}
              variant="secondary"
              fullWidth
            >
              Booking Lagi
            </Button>
            <Button
              onClick={() => navigate('/lapangan')}
              variant="outline"
              fullWidth
            >
              Kembali ke Daftar Lapangan
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Time Slot Grouping
  const pagiSlots = timeSlots.filter(s => parseInt(s.time.split(':')[0]) < 12);
  const siangSlots = timeSlots.filter(s => parseInt(s.time.split(':')[0]) >= 12 && parseInt(s.time.split(':')[0]) < 18);
  const malamSlots = timeSlots.filter(s => parseInt(s.time.split(':')[0]) >= 18);

  const renderSlotGroup = (title: string, slots: TimeSlotData[]) => {
    if (slots.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{title}</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
          {slots.map((slot, idx) => {
            const isPopularHour = slot.time === '18:00' || slot.time === '19:00' || slot.time === '20:00' || slot.time === '21:00';
            const disabled = slot.isBooked || isPastTime(slot.time);
            return (
              <TimeSlot
                key={idx}
                time={slot.time}
                isBooked={disabled}
                isSelected={selectedSlots.includes(slot.time)}
                isPopularHour={isPopularHour}
                onSelect={handleSlotClick}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const currentSportObj = sportsData.find(s => s.sport === selectedSport);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">

      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-36 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-green-500/20 to-transparent blur-3xl rounded-full"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">Amankan Lapangan Anda.</h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">Sistem booking real-time anti bentrok. Pilih lapangan, tentukan waktu, langsung main.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 w-full">

        {errorMessage && bookingStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-8 flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={24} className="text-red-500" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 hidden md:flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center flex-1 ${idx !== steps.length - 1 ? 'border-r border-slate-100 pr-4 mr-4' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 transition-colors duration-300 ${step.isDone ? 'bg-green-500 text-white' : step.isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {step.isDone ? <ShieldCheck size={16} /> : idx + 1}
              </div>
              <span className={`font-semibold ${step.isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 space-y-8">

            {/* 1. Sport Selection */}
            <Card className="border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Activity size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Pilih Olahraga</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sportsData.map((sport) => (
                  <button
                    key={sport.sport}
                    onClick={() => handleSportSelect(sport.sport)}
                    className={`
                      group text-center py-4 px-5 rounded-2xl border-2 transition-all duration-200 ease-out
                      ${selectedSport === sport.sport
                        ? 'border-blue-500 bg-blue-50 shadow-md ring-4 ring-blue-500/10 scale-[1.02] z-10 relative'
                        : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50 hover:shadow-sm'}
                    `}
                  >
                    <span className={`font-bold text-lg ${selectedSport === sport.sport ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-600'}`}>{sport.sport}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* 2. Court Selection */}
            {selectedSport && (
              <Card className="border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                    <Grid size={24} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">Pilih Lapangan</h2>
                </div>

                {/* Court Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                  {currentSportObj?.courts.map((court: any) => (
                    <button
                      key={court.id}
                      onClick={() => handleCourtSelect(court.id)}
                      className={`
                        group text-left p-5 rounded-2xl border-2 transition-all duration-200 ease-out
                        ${selectedCourt === court.id
                          ? 'border-green-500 bg-green-50 shadow-md ring-4 ring-green-500/10 scale-[1.02] z-10 relative'
                          : 'border-slate-200 hover:border-green-400 hover:bg-slate-50 hover:shadow-sm'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-slate-900 text-lg group-hover:text-green-700 transition-colors">{court.name}</span>
                      </div>
                      <p className={`font-extrabold text-lg ${selectedCourt === court.id ? 'text-green-700' : 'text-green-600'}`}>{formatRupiah(court.price_per_hour)} <span className="text-sm font-medium opacity-70">/ jam</span></p>
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {/* 3. Date Selection */}
            {selectedCourt && (
              <Card className="border-slate-200 shadow-sm transition-all duration-500 animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Calendar size={24} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">Pilih Tanggal</h2>
                </div>
                <div>
                  <Input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="h-12 shadow-sm font-medium text-slate-900 border-slate-300 max-w-sm"
                  />
                </div>
              </Card>
            )}

            {/* 4. Time Slot Selection */}
            <Card className={`relative min-h-[300px] border-slate-200 shadow-sm transition-all duration-500 ${!selectedDate || !selectedCourt ? 'hidden' : 'opacity-100 animate-in slide-in-from-bottom-4'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                    <Clock size={24} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">Pilih Jam Mulai (Bisa pilih &gt; 1 slot)</h2>
                </div>
              </div>

              {isLoadingSlots ? (
                <div className="absolute inset-0 bg-white/95 z-10 rounded-3xl p-6 md:p-8 animate-in fade-in">
                  <div className="flex gap-4 mb-8 mt-4">
                    <div className="h-5 w-24 bg-slate-200 animate-pulse rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {[...Array(15)].map((_, i) => (
                      <div key={i} className="py-7 rounded-xl bg-slate-100 animate-pulse border border-slate-200"></div>
                    ))}
                  </div>
                </div>
              ) : timeSlots.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center h-full">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100 shadow-sm">
                    <Calendar className="text-red-400 w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Jadwal Hari Ini Penuh / Berlalu</h3>
                  <p className="text-slate-500 mb-8 max-w-md font-medium">Wah, semua slot waktu pada tanggal ini telah dibooking atau berlalu. Coba cek ketersediaan di tanggal lain.</p>
                  <Button variant="primary" size="lg" onClick={() => document.querySelector<HTMLInputElement>('input[type="date"]')?.focus()} className="shadow-lg shadow-green-500/20">
                    Pilih Tanggal Lain
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-5 mb-8 mt-4 px-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="w-3.5 h-3.5 bg-white border-2 border-slate-300 rounded-full inline-block"></span> Tersedia</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="w-3.5 h-3.5 bg-slate-100 border-2 border-slate-300 rounded-full inline-block"></span> Dibooking / Lewat</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="w-3.5 h-3.5 bg-gradient-to-tr from-orange-400 to-yellow-400 border-2 border-white shadow-sm rounded-full inline-block relative"><span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-50"></span></span> Jam Ramai</div>
                  </div>

                  {renderSlotGroup("🌅 Pagi", pagiSlots)}
                  {renderSlotGroup("☀️ Siang", siangSlots)}
                  {renderSlotGroup("🌙 Malam", malamSlots)}
                </>
              )}
            </Card>

          </div>

          <div className="xl:col-span-1">
            <BookingSummary
              courtName={currentCourtParams?.name}
              date={selectedDate}
              time={startTime}
              duration={duration}
              totalPrice={totalPrice}
              formatRupiah={formatRupiah}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              onSubmit={handleBookingSubmit}
              isSubmitting={bookingStatus === 'submitting'}
              isValid={!!selectedCourt && !!selectedDate && selectedSlots.length > 0}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;