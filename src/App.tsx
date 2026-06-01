import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import githubIcon from './assets/githubicon.png';
import dgisIcon from './assets/2gisicon.png';
import tukaPhoto from './assets/Tuka.webp';
import backgroundMusic from './assets/music.mp3';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date('2026-08-01T20:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleOpen = async () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (!audioRef.current) return;

    try {
      audioRef.current.muted = true;
      await audioRef.current.play();
      audioRef.current.muted = false;

      setIsPlaying(true);
    } catch (e) {
      console.log("Audio play failed:", e);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (e) {
      console.log("Toggle failed:", e);
    }
  };

  // const [submitted, setSubmitted] = useState(false);

  // const handleFormSubmit = (e: any) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100dvw',
              height: '100dvh',
              backgroundColor: '#f8f5f0',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Background spinning ornament */}
            <motion.img
              src="/ornament.webp"
              alt="spinning background ornament"
              className="ornament-spinning"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <h2 className="script-font">Зейнет Жас</h2>
              <h1 style={{ fontSize: '1.4rem', marginTop: '10px', fontWeight: '400', color: 'var(--gold)' }}> Өзбекбай Жанна</h1>
              <h2 className="script-font" style={{ lineHeight: 1.5 }}>&</h2>
              <h2 className="script-font">Сүндет той</h2>
              <h1 style={{ fontSize: '1.4rem', marginTop: '10px', fontWeight: '400', color: 'var(--gold)' }}>Санжар Ахмедияр</h1>
              <p style={{ marginTop: '20px', fontFamily: 'Lora', color: '#666', fontStyle: 'italic' }}>Шақыру билеті</p>

              <button
                onClick={handleOpen}
                className="submit-button"
                style={{ marginTop: '50px', padding: '15px 50px', fontSize: '1.6rem' }}
              >
                АШУ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="app-container">
        <audio
          ref={audioRef}
          src={backgroundMusic}
          loop
          preload="auto"
        />

        {/* Global Background Ornaments */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <motion.img 
            src="/ornament.webp" 
            style={{ position: 'absolute', top: '35%', left: '-20%', width: '60vmin', maxWidth: '400px', opacity: 0.1 }} 
            animate={{ rotate: 360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.img 
            src="/ornament.webp" 
            style={{ position: 'absolute', top: '55%', right: '-25%', width: '70vmin', maxWidth: '500px', opacity: 0.08 }} 
            animate={{ rotate: -360 }} 
            transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          />
          <motion.img 
            src="/ornament.webp" 
            style={{ position: 'absolute', top: '68%', left: '4%', width: '50vmin', maxWidth: '350px', opacity: 0.12 }} 
            animate={{ rotate: 360 }} 
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Header / Play Icon */}
        <motion.section
          className="section"
          style={{ paddingTop: '60px', paddingBottom: '20px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px 0' }}>
            <div
              onClick={togglePlay}
              style={{
                width: '45px',
                height: '45px',
                border: '2.5px solid var(--dark-brown)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              {isPlaying ? (
                <Pause size={22} fill="var(--dark-brown)" style={{ strokeWidth: 1.5 }} />
              ) : (
                <Play size={22} fill="var(--dark-brown)" style={{ marginLeft: '3px', strokeWidth: 1.5 }} />
              )}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h2 className="script-font">Зейнет Жас</h2>
             <h1 style={{ fontSize: '1.4rem', marginTop: '10px', fontWeight: '400', color: 'var(--gold)' }}> Өзбекбай Жанна</h1>
              <h2 className="script-font" style={{ lineHeight: 1.5 }}>&</h2>
             <h2 className="script-font">Сүндет той</h2>
            <h1 style={{ fontSize: '1.4rem', marginTop: '10px', fontWeight: '400', color: 'var(--gold)' }}>Санжар Ахмедияр</h1>
          </div>
        </motion.section>

        {/* Child Photo & Ornament */}
        <section className="section" style={{ padding: '0 20px', overflow: 'hidden' }}>
          <div className="child-photo-container">
            <motion.img
              src="/ornament.webp"
              alt="ornament"
              className="ornament-spinning"
              style={{ opacity: 0.35 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="child-photo-placeholder"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <img
                src={tukaPhoto}
                alt="Tuka"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>
          </div>
        </section>

        {/* Intro Text */}
        <motion.section
          className="section"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.3)', borderTop: '1px solid rgba(212,175,55,0.3)', margin: '0 20px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="script-font" style={{ fontSize: '2.6rem' }}>
            Құрметті ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер, дос-жарандар, әріптестер мен көршілер!
          </p>
        </motion.section>

        {/* Invitation Details */}
        <motion.section
          className="section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={{ margin: '20px 0', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-light)' }}>
            Сіздерді асқар тау әкеміз Өзбекбай мен аяулы анамыз Жаннаның зейнетке шығу тойы және ұлдарымыз Санжар мен Ахмедиярдың сүндет тойына арналған АҚ ДАСТАРХАНЫМЫЗДЫҢ ҚАДІРЛІ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!
          </p>

          <div style={{ margin: '40px 0' }}>
            <h3 className="script-font" style={{ fontSize: '2.6rem' }}>Той салтанаты:</h3>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-light)' }}>01 ТАМЫЗ 2026 ЖЫЛ</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>САҒАТ 20:00-ДЕ</p>
          </div>

          {/* Simple Calendar View Placeholder */}
          <div className="calendar-container" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,175,55,0.3)', color: 'var(--text-light)' }}>
            <p style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>ТАМЫЗ 2026</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', fontSize: '0.8rem' }}>
              {['ДС', 'СС', 'СР', 'БС', 'ЖМ', 'СБ', 'ЖБ'].map(d => <span key={d} style={{ fontWeight: 'bold', color: 'var(--gold)' }}>{d}</span>)}
              {Array.from({ length: 5 }).map((_, i) => <span key={`empty-${i}`} />)}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <span key={day} style={day === 1 ? { backgroundColor: 'var(--gold)', color: 'white', borderRadius: '50%', padding: '2px', fontWeight: 'bold' } : {}}>
                  {day}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Location */}
        <motion.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="script-font" style={{ fontSize: '2.6rem' }}>Мекен-жайымыз:</h3>
          <p style={{ margin: '15px 0', textTransform: 'uppercase', color: 'var(--text-light)' }}>
            Жетісай қаласы<br />
            <strong> "Aksumbe ball room" мейрамханасы</strong>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <motion.a
              href="https://2gis.kz/turkestan/search/Aksumbe%20ball%20room%20%D0%B6%D0%B5%D1%82%D1%8B%D1%81%D0%B0%D0%B9/firm/70000001059371754/68.291196%2C43.327275?m=68.617041%2C43.436904%2F8.2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
              whileHover={{ scale: 1.1 }}
            >
              <img src={dgisIcon} alt="2GIS" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              <span style={{ fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>2GIS</span>
            </motion.a>
          </div>
        </motion.section>

        {/* Countdown */}
        <motion.section
          className="section"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          <h3 className="script-font" style={{ fontSize: '2.6rem' }}>Той салтанатына дейін:</h3>
          <div className="countdown-timer">
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.days}</div>
              <div className="countdown-label">күн</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.hours}</div>
              <div className="countdown-label">сағат</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.minutes}</div>
              <div className="countdown-label">минут</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeLeft.seconds}</div>
              <div className="countdown-label">секунд</div>
            </div>
          </div>
        </motion.section>

        {/* Hosts */}
        <motion.section
          className="section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ padding: '120px 20px 140px', position: 'relative', overflow: 'hidden' }}
        >
          <motion.img
            src="/ornament.webp"
            alt="spinning background ornament"
            className="ornament-spinning"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 className="script-font" style={{ fontSize: '2.6rem', marginBottom: '10px' }}>Той иелері:</h3>
            <p className="script-font" style={{ fontSize: 'clamp(2rem, 9.5vw, 3.2rem)', color: 'var(--dark-brown)', whiteSpace: 'nowrap' }}>
              Өзбекбай & Жанна
            </p>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px auto', width: '250px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', position: 'relative', top: '2px' }}>
              <div style={{ position: 'absolute', left: '0', top: '-2px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--gold)' }}></div>
            </div>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--gold)', transform: 'rotate(45deg)', margin: '0 15px' }}></div>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', position: 'relative', top: '2px' }}>
              <div style={{ position: 'absolute', right: '0', top: '-2px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--gold)' }}></div>
            </div>
          </div>
      </div>
    </motion.section >


      {/* RSVP Form - Integrated with Google Forms but custom UI */ }
      {/* < motion.section
  className = "section rsvp-form"
  id = "rsvp"
  initial = {{ y: 50, opacity: 0 }
}
whileInView = {{ y: 0, opacity: 1 }}
        >
  <h3 className="script-font" style={{ fontSize: '2.6rem', marginBottom: '20px' }}>
    Тойға қатысуыңызды растауыңызды сұраймыз!
  </h3>

{
  !submitted ? (
    <>
      <p style={{ fontSize: '1rem', marginBottom: '30px', padding: '0 5%', fontWeight: '500' }}>
        Аты-жөніңіз (жұбыңызбен келетін болсаңыз, есімдеріңізді бірге жазуыңызды өтінеміз)
      </p>

      <form
        onSubmit={handleFormSubmit}
        style={{ maxWidth: '450px', margin: '0 auto' }}
      >
        <input
          type="text"
          name="entry.1323092507"
          className="form-input"
          placeholder="Есіміңіз"
          required
        />

        <div style={{ textAlign: 'left', margin: '30px 10%' }}>
          {[
            { label: 'Келемін', val: 'Келемін' },
            { label: 'Жұбыммен келемін', val: 'Жұбыммен келемін' },
            { label: 'Өкінішке орай, қатыса алмаймын', val: 'Өкінішке орай, қатыса алмаймын' }
          ].map((option, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', margin: '20px 0', fontSize: '1.2rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="entry.533510887"
                value={option.val}
                required
                style={{ width: '24px', height: '24px', marginRight: '15px', accentColor: 'var(--dark-brown)' }}
              />
              <span style={{ fontFamily: 'Lora, serif' }}>{option.label}</span>
            </label>
          ))}
        </div>

        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.05, backgroundColor: '#5c4434' }}
          whileTap={{ scale: 0.95 }}
        >
          Жіберу
        </motion.button>
      </form>
    </>
  ) : (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    style={{ padding: '40px 20px' }}
  >
    <h3 className="script-font" style={{ fontSize: '2.5rem', color: 'var(--gold)' }}>Рақмет!</h3>
    <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Жауабыңыз қабылданды.</p>
  </motion.div>
)
}
        </motion.section > */}

  {/* Footer */ }
  < footer className = "section" style = {{ borderTop: '1px solid rgba(212,175,55,0.3)', marginTop: '40px' }}>
          <p className="script-font" style={{ fontSize: '2.6rem' }}>Келіңіздер, тойымыздың қадірлі қонағы болыңыздар!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
            <motion.a
              href="https://github.com/zhannurr"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
            >
              <img src={githubIcon} alt="GitHub" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
            </motion.a>
          </div>
        </footer >
      </div >
    </>
  );
};

export default App;