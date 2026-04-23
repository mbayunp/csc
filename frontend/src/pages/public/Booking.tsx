import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, ShieldCheck, AlertCircle, ChevronRight
} from 'lucide-react';
import { TimeSlot } from '../../components/booking/TimeSlot';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

import { useToast } from '../../components/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

interface Court {
  id: number;
  name: string;
  type: string;
  price_per_hour: number;
}

interface TimeSlotData {
  time: string;
  isBooked: boolean;
}

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State Management
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(1);
  
  // Input CS Manual
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  
  const [timeSlots, setTimeSlots] = useState<TimeSlotData[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Mock Courts (Will fetch from API eventually)
  const courts: Court[] = [
    { id: 1, name: 'Futsal A (Vinyl)', type: 'Futsal', price_per_hour: 120000 },
    { id: 2, name: 'Futsal B (Sintetis)', type: 'Futsal', price_per_hour: 100000 },
    { id: 3, name: 'Badminton Pro', type: 'Badminton', price_per_hour: 60000 },
    { id: 4, name: 'Basket Full Court', type: 'Basket', price_per_hour: 150000 },
  ];

  // Auto-select from URL
  useEffect(() => {
    window.scrollTo(0, 0);
    const courtIdParam = searchParams.get('court_id');
    const dateParam = searchParams.get('date');
    if (courtIdParam && !isNaN(Number(courtIdParam))) {
      setSelectedCourt(Number(courtIdParam));
    }
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  // Fetch Availability
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedCourt || !selectedDate) return;
      
      setSelectedTime(null);
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
  }, [selectedCourt, selectedDate]);

  // Kalkulasi Harga
  const currentCourtParams = useMemo(() => courts.find(c => c.id === selectedCourt), [selectedCourt, courts]);
  const totalPrice = currentCourtParams ? currentCourtParams.price_per_hour * duration : 0;

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  // Submit Booking
  const handleBookingSubmit = async () => {
    if (!selectedCourt || !selectedDate || !selectedTime) return;
    if (bookingStatus === 'submitting') return; // Double click guard
    
    setBookingStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          court_id: selectedCourt,
          date: selectedDate,
          start_time: selectedTime,
          duration: duration,
          customer_name: customerName || 'Tamu Web',
          phone: customerPhone || '-'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setBookingStatus('success');
        toast('Booking berhasil diamankan!', 'success');
        window.scrollTo(0, 0);
      } else {
        if (response.status === 409) {
           toast('Slot sudah terisi, silakan pilih jam lain', 'warning');
           setSelectedTime(null);
        } else {
           toast(result.message || 'Gagal melakukan booking', 'error');
        }
        throw new Error(result.message || 'Gagal melakukan booking');
      }
    } catch (error: any) {
      setBookingStatus('error');
      setErrorMessage(error.message);
      if (error.message.includes('available') || error.message.includes('terisi')) {
         // Trigger refresh effect by re-setting the state minimally to trigger the useEffect
         setSelectedDate(prev => prev); // This does not actually trigger a refresh if the value is the same.
         // Let's manually trigger a fetch by clearing and setting time slots, or changing state slightly
         setSelectedTime(null);
         // To properly refresh, we should call fetchAvailability again, but it's bound in useEffect. 
         // A common trick is to have a refresh trigger state:
      }
    }
  };

  const steps = [
    { label: 'Pilih Lapangan', isActive: true, isDone: !!selectedCourt },
    { label: 'Tentukan Waktu', isActive: !!selectedCourt, isDone: !!(selectedCourt && selectedDate && duration) },
    { label: 'Pilih Jadwal', isActive: !!(selectedCourt && selectedDate), isDone: !!selectedTime },
    { label: 'Konfirmasi', isActive: !!selectedTime, isDone: false }
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
            Permintaan booking Anda untuk <strong className="text-slate-900">{currentCourtParams?.name}</strong> pada <strong className="text-slate-900">{selectedDate}</strong> jam <strong className="text-slate-900">{selectedTime}</strong> telah diamankan.
          </p>
          <div className="bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-200/60 text-left">
            <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">Total Pembayaran</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{formatRupiah(totalPrice)}</p>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => {
                setBookingStatus('idle');
                setSelectedTime(null);
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
            
            <Card className="border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                  <MapPin size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Pilih Lapangan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourt(court.id)}
                    className={`
                      group text-left p-5 rounded-2xl border-2 transition-all duration-200 ease-out
                      ${selectedCourt === court.id 
                        ? 'border-green-500 bg-green-50 shadow-md ring-4 ring-green-500/10 scale-[1.02] z-10 relative' 
                        : 'border-slate-200 hover:border-green-400 hover:bg-slate-50 hover:shadow-sm'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-slate-900 text-lg group-hover:text-green-700 transition-colors">{court.name}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${selectedCourt === court.id ? 'bg-green-200 text-green-800' : 'bg-slate-100 text-slate-500'}`}>{court.type}</span>
                    </div>
                    <p className={`font-extrabold text-lg ${selectedCourt === court.id ? 'text-green-700' : 'text-green-600'}`}>{formatRupiah(court.price_per_hour)} <span className="text-sm font-medium opacity-70">/ jam</span></p>
                  </button>
                ))}
              </div>
            </Card>

            <Card className={`border-slate-200 shadow-sm transition-all duration-500 ${!selectedCourt ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Calendar size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Tentukan Waktu & Durasi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Pilih Tanggal</label>
                  <Input 
                    type="date" 
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="h-12 shadow-sm font-medium text-slate-900 border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Durasi Main</label>
                  <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 shadow-inner">
                    {[1, 2, 3].map((hours) => (
                      <button
                        key={hours}
                        onClick={() => setDuration(hours)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ease-out ${
                          duration === hours 
                            ? 'bg-white shadow-sm border-slate-200 text-indigo-600 scale-[1.02]' 
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                        }`}
                      >
                        {hours} Jam
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className={`relative min-h-[300px] border-slate-200 shadow-sm transition-all duration-500 ${!selectedDate || !selectedCourt ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <Clock size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Pilih Jam Mulai</h2>
              </div>
              
              {!selectedCourt ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 backdrop-blur-sm rounded-3xl animate-in fade-in">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="text-slate-400 w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-semibold text-lg">Silakan pilih lapangan terlebih dahulu</p>
                </div>
              ) : isLoadingSlots ? (
                <div className="absolute inset-0 bg-white/95 z-10 rounded-3xl p-6 md:p-8 animate-in fade-in">
                  <div className="flex gap-4 mb-8 mt-4">
                    <div className="h-5 w-24 bg-slate-200 animate-pulse rounded-md"></div>
                    <div className="h-5 w-28 bg-slate-200 animate-pulse rounded-md"></div>
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
                  <h3 className="text-xl font-black text-slate-900 mb-2">Jadwal Hari Ini Penuh</h3>
                  <p className="text-slate-500 mb-8 max-w-md font-medium">Wah, semua slot waktu pada tanggal ini telah dibooking. Jangan khawatir, coba cek ketersediaan di tanggal lain.</p>
                  <Button variant="primary" size="lg" onClick={() => document.querySelector<HTMLInputElement>('input[type="date"]')?.focus()} className="shadow-lg shadow-green-500/20">
                    Pilih Tanggal Lain
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-5 mb-8 mt-4 px-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="w-3.5 h-3.5 bg-white border-2 border-slate-300 rounded-full inline-block"></span> Tersedia</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="w-3.5 h-3.5 bg-slate-100 border-2 border-slate-300 rounded-full inline-block"></span> Dibooking</div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="w-3.5 h-3.5 bg-gradient-to-tr from-orange-400 to-yellow-400 border-2 border-white shadow-sm rounded-full inline-block relative"><span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-50"></span></span> Jam Ramai</div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
                    {timeSlots.map((slot, idx) => {
                      const isPopularHour = slot.time === '19:00' || slot.time === '20:00' || slot.time === '21:00';
                      return (
                        <TimeSlot
                          key={idx}
                          time={slot.time}
                          isBooked={slot.isBooked}
                          isSelected={selectedTime === slot.time}
                          isPopularHour={isPopularHour}
                          onSelect={setSelectedTime}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </Card>

          </div>

          <div className="xl:col-span-1">
            <BookingSummary
              courtName={currentCourtParams?.name}
              date={selectedDate}
              time={selectedTime}
              duration={duration}
              totalPrice={totalPrice}
              formatRupiah={formatRupiah}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              onSubmit={handleBookingSubmit}
              isSubmitting={bookingStatus === 'submitting'}
              isValid={!!selectedCourt && !!selectedDate && !!selectedTime}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;