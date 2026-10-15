import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Heart, Music2, VolumeX, Volume2, CalendarDays, MapPin, Clock3, Images,
  Flower2, Gift, Menu, X, ChevronDown, ExternalLink, Copy, Check, Send,
  Sparkles, Play, Pause, Camera, Mail, Navigation, PartyPopper
} from 'lucide-react';

const WEDDING = {
  bride: 'Thế Sang',
  groom: 'Hiền Lương',
  date: '2026-10-25T11:00:00+07:00',
  dateLabel: 'Chủ Nhật, ngày 25 tháng 10 năm 2026',
  lunar: 'Nhằm ngày 16 tháng 9 năm Bính Ngọ',
  reception: '11:00',
  ceremony: '11:30',
  venue: 'Tư Gia Nhà Trai',
  address: 'Ấp Nhơn Hòa 1 ,Xã Mỹ Hạnh ,Tỉnh Tây Ninh ,Việt Nam',
  mapUrl: 'https://maps.app.goo.gl/Q5kd5rXmUSFZU3tG9',
  bankName: 'Ngân hàng Quân ĐỘi MB BANK',
  bankAccount: '0325398833',
  accountName: 'PHAM THE SANG',
  transferNote: 'Mừng cưới Thế Sang và Hiền Lương'
};

const photos = [
  { src: '/NDT_1100.jpg', alt: 'Khoảnh khắc ngày cưới' },
  { src: '/NDT_1036.jpg', alt: 'Cô dâu chú rể bên nhau' },
  { src: '/NDT_0868.jpg', alt: 'Kỷ niệm tình yêu' },
  { src: '/NDT_0363.jpg', alt: 'Nụ cười hạnh phúc' },
  { src: '/NDT_0800.jpg', alt: 'Ngày mình chung đôi' },
  { src: '/NDT_0198.jpg', alt: 'Lễ cưới lãng mạn' }
];

function Lotus({ className = '' }) {
  return <svg className={className} viewBox="0 0 180 110" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round">
      <path d="M90 88 C63 63 68 35 90 12 C112 35 117 63 90 88Z" fill="currentColor" fillOpacity=".12"/>
      <path d="M88 87 C47 82 28 59 31 39 C58 43 79 61 88 87Z" fill="currentColor" fillOpacity=".10"/>
      <path d="M92 87 C133 82 152 59 149 39 C122 43 101 61 92 87Z" fill="currentColor" fillOpacity=".10"/>
      <path d="M86 89 C48 96 20 83 12 65 C42 61 69 72 86 89Z" fill="currentColor" fillOpacity=".08"/>
      <path d="M94 89 C132 96 160 83 168 65 C138 61 111 72 94 89Z" fill="currentColor" fillOpacity=".08"/>
      <path d="M44 92 Q90 105 136 92"/>
      <path d="M90 15 L90 87 M33 41 L85 84 M147 41 L95 84"/>
    </g>
  </svg>;
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return <div className="section-title">
    <span className="eyebrow"><Lotus />{eyebrow}<Lotus /></span>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
    <span className="title-flourish">✦　❀　✦</span>
  </div>;
}

function Countdown() {
  const target = useMemo(() => new Date(WEDDING.date).getTime(), []);
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const values = left <= 0 ? [0,0,0,0] : [
    Math.floor(left / 86400000),
    Math.floor((left % 86400000) / 3600000),
    Math.floor((left % 3600000) / 60000),
    Math.floor((left % 60000) / 1000)
  ];
  return <div className="countdown" aria-label="Đếm ngược ngày cưới">
    {['Ngày','Giờ','Phút','Giây'].map((label, i) =>
      <div className="count-box" key={label}><strong>{String(values[i]).padStart(2,'0')}</strong><span>{label}</span></div>
    )}
  </div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'yes', guests: '2', message: '' });
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wish, setWish] = useState({ name: '', message: '' });
  const [wishes, setWishes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lotus-wedding-wishes') || '[]'); } catch { return []; }
  });
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('invitation-open', opened);
    return () => document.body.classList.remove('invitation-open');
  }, [opened]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) { setMusicOn(v => !v); return; }
    try {
      if (!musicOn) { await audio.play(); setMusicOn(true); }
      else { audio.pause(); setMusicOn(false); }
    } catch { setMusicOn(false); alert('Nhạc Nền Lỗi'); }
    const openInvitation = async () => {
  setOpened(true);

  const audio = audioRef.current;
  if (!audio) return;

  try {
    await audio.play();
    setMusicOn(true);
  } catch (error) {
    setMusicOn(false);
    console.log('Trình duyệt chưa cho phép tự phát nhạc:', error);
  }
};
  };

  const submitRsvp = (e) => {
    e.preventDefault();
    if (!rsvp.name.trim()) return;
    const saved = { ...rsvp, submittedAt: new Date().toISOString() };
    try {
      const all = JSON.parse(localStorage.getItem('lotus-wedding-rsvp') || '[]');
      localStorage.setItem('lotus-wedding-rsvp', JSON.stringify([...all, saved]));
    } catch {}
    setRsvpSent(true);
  };

  const submitWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.message.trim()) return;
    const next = [{ ...wish, id: Date.now() }, ...wishes].slice(0, 30);
    setWishes(next);
    try { localStorage.setItem('lotus-wedding-wishes', JSON.stringify(next)); } catch {}
    setWish({ name: '', message: '' });
  };

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(WEDDING.bankAccount);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { alert(`Số tài khoản: ${WEDDING.bankAccount}`); }
  };

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return <div className="site-shell">
    <audio ref={audioRef} loop preload="none" src="/nhac-nen.mp3" />
    <div className="petal-layer" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => <span key={i} className={`petal petal-${i % 6}`} style={{ left: `${(i * 17 + 3) % 100}%`, animationDelay: `${(i % 9) * -1.7}s`, animationDuration: `${12 + (i % 7) * 2}s` }} />)}
    </div>

    {!opened ? <main className="cover-screen">
      <div className="cover-card">
        <div className="cover-topline"><span>TRÂN TRỌNG KÍNH MỜI</span><span className="tiny-flower">❀</span></div>
        <div className="cover-art">
          <img src="/NDT_0308.jpg" alt="Ảnh cưới của cô dâu chú rể" />
          <div className="cover-vignette" />
          <div className="cover-lotus"><Lotus /></div>
        </div>
        <p className="cover-kicker">THE WEDDING OF</p>
        <h1>{WEDDING.bride}<span className="ampersand">&</span>{WEDDING.groom}</h1>
        <p className="cover-date">{WEDDING.dateLabel}</p>
        <div className="cover-divider"><span />❀<span /></div>
        <p className="cover-invite">Một hành trình mới bắt đầu<br/>bằng lời hẹn ước trăm năm.</p>
        
<button
  className="button button-primary cover-button"
  onClick={async () => {
    setOpened(true);

    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setMusicOn(true);
      }
    } catch (error) {
      setMusicOn(false);
      console.log('Không thể tự phát nhạc:', error);
    }
  }}
>
  <Mail size={17} />
  Mở thiệp mời
  <Heart size={15} />
</button>

        <span className="cover-bottom">WITH LOVE, ALWAYS</span>
      </div>
    </main> : <>
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Về đầu trang"><Lotus/><span>{WEDDING.bride} <i>&</i> {WEDDING.groom}</span></button>
        <nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}>
          {[['home','Trang chủ'],['story','Chuyện chúng mình'],['gallery','Album ảnh'],['event','Ngày vui'],['rsvp','Xác nhận']].map(([id,label]) =>
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          )}
        </nav>
        <div className="header-actions">
          <button className="icon-button music-button" onClick={toggleMusic} aria-label={musicOn ? 'Tắt nhạc' : 'Bật nhạc'}>{musicOn ? <Volume2/> : <Music2/>}</button>
          <button className="icon-button menu-button" onClick={() => setMobileMenu(v => !v)} aria-label="Mở menu">{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" role="img" aria-label="Ảnh cưới lãng mạn" />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="hero-kicker"><span/> OUR WEDDING DAY <span/></span>
            <p className="hero-intro">Cùng viết tiếp câu chuyện yêu thương</p>
            <h1>{WEDDING.bride}<span>&</span>{WEDDING.groom}</h1>
            <div className="hero-lotus"><Lotus/></div>
            <p className="hero-date">{WEDDING.dateLabel}</p>
            <p className="hero-lunar">{WEDDING.lunar}</p>
            <button className="button button-light" onClick={() => scrollTo('event')}>THAM DỰ NGÀY VUI <ChevronDown size={16}/></button>
          </div>
          <div className="hero-side-note">TÌNH YÊU NỞ HOA · 2026</div>
        </section>

        <section className="welcome section-pad">
          <div className="welcome-flower"><Lotus/></div>
          <SectionTitle eyebrow="LỜI NGỎ" title="Trân trọng kính mời" subtitle="Sự hiện diện của bạn là niềm hạnh phúc lớn lao đối với chúng mình."/>
          <p className="welcome-copy">Sau những ngày tháng cùng nhau sẻ chia niềm vui, những ước mơ và cả những điều bình dị nhất, chúng mình quyết định nắm tay nhau bước vào một hành trình mới. Với tất cả yêu thương, chúng mình mong được đón bạn đến chung vui trong ngày đặc biệt này.</p>
          <div className="signature"><span>Thân mến,</span><strong>{WEDDING.bride} & {WEDDING.groom}</strong></div>
          <div className="family-grid">
            <div><span>NHÀ GÁI</span><h3>Gia đình cô dâu</h3><p>Ông: Nguyễn Văn Xum </p><p>Bà: Nguyễn Thị Hiền </p><p>Địa chỉ: 2/154 Ấp Tân Lập ,Xã Xuân Thới Sơn ,TP.HCM</p></div>
            <div className="family-heart"><Heart/></div>
            <div><span>NHÀ TRAI</span><h3>Gia đình chú rể</h3><p>Ông: Phạm Thế Thắng</p><p>Bà: Nguyễn Thị Phương</p><p>Địa chỉ:ẤP Nhơn Hòa 1 ,Xã Mỹ Hạnh ,Tỉnh Tây Ninh</p></div>
          </div>
        </section>

        <section className="story section-pad" id="story">
          <SectionTitle eyebrow="OUR STORY" title="Chuyện chúng mình" subtitle="Mỗi khoảnh khắc đều là một cánh hoa trong khu vườn tình yêu."/>
          <div className="story-layout">
            <div className="story-photo story-photo-large"><img src={"/NDT_0830.jpg"} alt={"/NDT_0830.jpg"}/><span className="photo-caption">The beginning of us</span></div>
            <div className="story-timeline">
              <article className="timeline-item"><span className="timeline-dot">01</span><div><small>NGÀY ĐẦU GẶP GỠ</small><h3>Một ánh nhìn, một nụ cười</h3><p>Từ một cuộc gặp gỡ bình thường, chúng mình tìm thấy một người khiến những ngày bình thường trở nên thật đặc biệt.</p></div></article>
              <article className="timeline-item"><span className="timeline-dot">02</span><div><small>NGÀY MÌNH THÀNH ĐÔI</small><h3>Chọn nhau mỗi ngày</h3><p>Cùng trưởng thành, cùng mơ ước và học cách yêu thương nhau bằng những điều giản dị nhất.</p></div></article>
              <article className="timeline-item"><span className="timeline-dot">03</span><div><small>LỜI HẸN ƯỚC</small><h3>Ngày chung một mái nhà</h3><p>Và hôm nay, chúng mình muốn cùng bạn chứng kiến khoảnh khắc mở ra chương mới của cuộc đời.</p></div></article>
            </div>
          </div>
        </section>

        <section className="countdown-section section-pad">
          <div className="countdown-overlay" />
          <div className="countdown-content">
            <span className="eyebrow light-eyebrow"><Lotus/> SAVE THE DATE <Lotus/></span>
            <h2>Đếm ngược đến ngày hạnh phúc</h2>
            <p>{WEDDING.dateLabel}</p>
            <Countdown/>
            <span className="countdown-note">Chúng mình mong được gặp bạn!</span>
          </div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <SectionTitle eyebrow="OUR MEMORIES" title="Album ảnh cưới" subtitle="Lưu giữ những khoảnh khắc dịu dàng trên hành trình của hai đứa."/>
          <div className="gallery-grid">
            {photos.map((photo, i) => <button className={`gallery-item gallery-item-${i + 1}`} key={photo.src} onClick={() => setActivePhoto(i)} aria-label={`Xem ảnh ${i + 1}`}>
              <img src={photo.src} alt={photo.alt} loading="lazy"/><span className="gallery-hover"><Camera/><small>XEM KHOẢNH KHẮC</small></span>
            </button>)}
          </div>
          <p className="gallery-footnote"><Sparkles size={14}/> Hành trình chụp ảnh của chúng mình sẽ tiếp tục thật nhiều ảnh</p>
        </section>
        <div className="event-photo">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4703.832243331612!2d106.45415899999999!3d10.875461999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDUyJzMxLjciTiAxMDbCsDI3JzE1LjAiRQ!5e1!3m2!1sen!2s!4v1791996628316!5m2!1sen!2s"
    title="Bản đồ địa điểm tổ chức"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
        <section className="event section-pad" id="event">
          <SectionTitle eyebrow="JOIN OUR CELEBRATION" title="Ngày vui của chúng mình" subtitle="Sự có mặt của bạn sẽ làm ngày vui thêm trọn vẹn."/>
          <div className="event-card">
            
            <div className="event-info">
              <span className="event-label">WEDDING RECEPTION</span>
              <h3>Tiệc mừng thành hôn</h3>
              <div className="event-detail"><CalendarDays/><div><strong>{WEDDING.dateLabel}</strong><span>{WEDDING.lunar}</span></div></div>
              <div className="event-detail"><Clock3/><div><strong>Đón khách: {WEDDING.reception}</strong><span>Khai tiệc: {WEDDING.ceremony}</span></div></div>
              <div className="event-detail"><MapPin/><div><strong>{WEDDING.venue}</strong><span>{WEDDING.address}</span></div></div>
              <a className="button button-primary map-button" href={WEDDING.mapUrl} target="_blank" rel="noreferrer"><Navigation size={16}/> Xem bản đồ <ExternalLink size={14}/></a>
            </div>
          </div>
          <div className="event-note"><Flower2/><span>Địa điểm cực nhiều hạnh phúc</span></div>
        </section>

        <section className="rsvp section-pad" id="rsvp">
          <div className="rsvp-decor rsvp-decor-left"><Lotus/></div><div className="rsvp-decor rsvp-decor-right"><Lotus/></div>
          <SectionTitle eyebrow="KINDLY RSVP" title="Bạn sẽ đến chung vui chứ?" subtitle="Hãy cho chúng mình biết để chuẩn bị đón tiếp bạn chu đáo nhất nhé."/>
          {!rsvpSent ? <form className="rsvp-form" onSubmit={submitRsvp}>
            <label>Họ và tên của bạn<input value={rsvp.name} onChange={e => setRsvp({...rsvp, name:e.target.value})} placeholder="Nhập họ tên..." required/></label>
            <label>Bạn có thể tham dự không?<select value={rsvp.attendance} onChange={e => setRsvp({...rsvp, attendance:e.target.value})}><option value="yes">Có, mình sẽ đến!</option><option value="no">Rất tiếc, mình không thể đến</option><option value="maybe">Mình sẽ xác nhận sau</option></select></label>
            <label>Số người tham dự<select value={rsvp.guests} onChange={e => setRsvp({...rsvp, guests:e.target.value})}><option value="1">1 người</option><option value="2">Tôi Và Người thương</option><option value="3">3 người</option><option value="4">4 người</option><option value="5+">5 người trở lên</option></select></label>
            <label>Lời nhắn gửi đến cô dâu chú rể<textarea rows="3" value={rsvp.message} onChange={e => setRsvp({...rsvp, message:e.target.value})} placeholder="Gửi đôi lời yêu thương..."/></label>
            <button className="button button-primary form-submit" type="submit"><Send size={16}/> GỬI XÁC NHẬN</button>
           
          </form> : <div className="success-message"><span><Check/></span><h3>Cảm ơn bạn thật nhiều!</h3><p>Chúng mình đã ghi nhận phản hồi trên thiết bị này. Hẹn gặp bạn trong ngày vui nhé.</p><button className="text-button" onClick={() => setRsvpSent(false)}>Chỉnh sửa phản hồi</button></div>}
        </section>

        <section className="wishes section-pad">
          <SectionTitle eyebrow="LOVE NOTES" title="Gửi lời chúc yêu thương" subtitle="Mỗi lời chúc là một món quà nhỏ mà chúng mình luôn trân quý."/>
          <form className="wish-form" onSubmit={submitWish}>
            <input aria-label="Tên người gửi lời chúc" placeholder="Tên của bạn" value={wish.name} onChange={e => setWish({...wish,name:e.target.value})} required/>
            <textarea aria-label="Lời chúc" placeholder="Viết lời chúc của bạn..." rows="3" value={wish.message} onChange={e => setWish({...wish,message:e.target.value})} required/>
            <button className="button button-outline" type="submit"><Heart size={16}/> GỬI LỜI CHÚC</button>
          </form>
          <div className="wishes-list">{wishes.length ? wishes.map(item => <article className="wish-card" key={item.id}><Heart size={17}/><div><strong>{item.name}</strong><p>{item.message}</p></div></article>) : <div className="empty-wishes"><Flower2/><p>Hãy là người đầu tiên gửi lời chúc cho chúng mình nhé!</p></div>}</div>
          
        </section>

        <section className="gift-section section-pad" id="gift">
          <SectionTitle eyebrow="A LITTLE GIFT" title="Mừng cưới online" subtitle="Sự hiện diện của bạn đã là món quà quý giá. Nếu thuận tiện, bạn có thể gửi lời chúc qua thông tin bên dưới."/>
          <div className="gift-card">
            <div className="gift-icon"><Gift/></div>
            <p className="gift-script">With love & gratitude</p>
            <h3>Gửi quà mừng cưới</h3>
            <div className="bank-placeholder"><div className="qr-placeholder"><img src="/maqr.jpg" alt="Mã QR ngân hàng mừng cưới" className="maqr"/></div><div className="bank-details"><span>NGÂN HÀNG</span><strong>{WEDDING.bankName}</strong><span>CHỦ TÀI KHOẢN</span><strong>{WEDDING.accountName}</strong><span>SỐ TÀI KHOẢN</span><div className="account-row"><strong>{WEDDING.bankAccount}</strong><button className="copy-button" onClick={copyAccount} aria-label="Sao chép số tài khoản">{copied ? <Check/> : <Copy/>}{copied ? 'Đã sao chép' : 'Sao chép'}</button></div><span>NỘI DUNG CHUYỂN KHOẢN</span><strong>{WEDDING.transferNote}</strong></div></div>
            <p className="gift-thanks">Cảm ơn bạn đã gửi yêu thương đến chúng mình ♡</p>
          </div>
        </section>

        <section className="closing">
          <div className="closing-photo"/>
          <div className="closing-content"><Lotus/><p>Two hearts, one beautiful journey.</p><h2>Hẹn gặp bạn<br/>trong ngày hạnh phúc!</h2><span>{WEDDING.bride} & {WEDDING.groom}</span><small>25 · 10 · 2026</small></div>
        </section>
      </main>

      <footer className="site-footer"><Lotus/><p>Được tạo nên bằng tình yêu</p><span>{WEDDING.bride} & {WEDDING.groom} · 2026</span><button className="back-top" onClick={() => scrollTo('home')}>LÊN ĐẦU TRANG ↑</button></footer>
      <div className="floating-controls">
        <button className="floating-music" onClick={toggleMusic} aria-label={musicOn ? 'Tắt nhạc' : 'Bật nhạc'}>{musicOn ? <Volume2/> : <VolumeX/>}<span>{musicOn ? 'Đang phát' : 'Nhạc nền'}</span></button>
        <button className="floating-rsvp" onClick={() => scrollTo('rsvp')}><Heart size={16}/> RSVP</button>
      </div>
    </>}

    {activePhoto !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh" onClick={() => setActivePhoto(null)}>
      <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Đóng ảnh"><X/></button>
      <button className="lightbox-prev" onClick={e => {e.stopPropagation();setActivePhoto((activePhoto + photos.length - 1) % photos.length)}} aria-label="Ảnh trước">‹</button>
      <img src={photos[activePhoto].src} alt={photos[activePhoto].alt} onClick={e => e.stopPropagation()}/>
      <button className="lightbox-next" onClick={e => {e.stopPropagation();setActivePhoto((activePhoto + 1) % photos.length)}} aria-label="Ảnh tiếp">›</button>
      <span className="lightbox-count">{activePhoto + 1} / {photos.length}</span>
    </div>}
  </div>;
}

export default App;
