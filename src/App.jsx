import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, MapPin, Phone, Star } from 'lucide-react'
import Header from './components/Header.jsx'
import MenuSection from './components/MenuSection.jsx'
import GallerySection from './components/GallerySection.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import { cafe } from './data.js'

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.mapsQuery)}`

function App() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: cafe.name,
          telephone: cafe.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Shop No. 3, Pentagon Tower, Lane No. 1, behind Cummins College Road, Raichandani, Karvenagar',
            addressLocality: 'Pune',
            addressRegion: 'Maharashtra',
            postalCode: '411052',
            addressCountry: 'IN',
          },
        })}
      </script>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-content">
            <h1>BIG FLAVOURS.<br /><em>ROWDY VIBES.</em></h1>
            <p className="hero-description">
              Your favourite spot for ramen, momos, boba tea, and delicious bites in Karve Nagar, Pune.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#menu">Explore the menu <ArrowRight size={18} /></a>
              <a className="button button-ghost" href={directionsUrl} target="_blank" rel="noreferrer">
                Get directions <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-notes">
              <div className="hero-note"><span className="note-icon"><span>₹</span></span><span><strong>₹200–₹400</strong><small>Price range provided</small></span></div>
              <span className="hero-note-divider" />
              <div className="hero-note"><span className="note-icon"><Star size={17} /></span><span><strong>5.0 <small className="review-count">/ 63 reviews*</small></strong><small>Rating needs verification</small></span></div>
            </div>
          </div>
          <a href="#menu" className="hero-scroll" aria-label="Scroll to menu"><span>SCROLL FOR THE GOOD STUFF</span><ArrowDown size={15} /></a>
          <div className="hero-stamp" aria-hidden="true"><span>GOOD<br />FOOD</span><span className="stamp-spark">✳</span><span>GOOD<br />MOOD</span></div>
        </section>

        <div className="verification-strip">
          <Star size={15} />
          <span>*Rating and review count are supplied details and have not been independently verified.</span>
          <a href="#reviews">More about reviews <ArrowRight size={14} /></a>
        </div>

        <MenuSection />

        <section className="about-section" id="about">
          <div className="about-photo">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1100&q=82"
              alt="Illustrative photograph of a warmly lit restaurant interior"
              loading="lazy"
            />
            <span className="about-photo-caption">YOUR NEXT FAVOURITE HANGOUT</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow"><span>02</span> THE ROWDY SIDE OF PUNE</p>
            <h2>YOUR HANGOUT<br />SPOT IN <em>KARVE NAGAR.</em></h2>
            <p className="about-description">
              Good food hits different when you share it. Rowdy Cafe is a welcoming spot to catch up, kick back, and find something delicious to dig into.
            </p>
            <p className="about-description">
              Swing by with your people, take a breather between plans, or call ahead to find out what’s cooking today.
            </p>
            <a className="text-link" href={directionsUrl} target="_blank" rel="noreferrer">Find your way here <ArrowUpRight size={17} /></a>
            <div className="about-doodle" aria-hidden="true">COME HUNGRY <span>↗</span></div>
          </div>
        </section>

        <GallerySection />

        <section className="review-section" id="reviews">
          <div className="review-decoration" aria-hidden="true">“</div>
          <div className="review-copy">
            <p className="eyebrow"><span>04</span> THE WORD ON THE STREET</p>
            <h2>GOOD TIMES<br />SPEAK <em>LOUDER.</em></h2>
            <p className="review-context">
              Cafe-provided rating: <strong>5.0 / 5 from 63 reviews.</strong> This figure has not been independently verified; confirm before publishing as a live rating.
            </p>
            <div className="review-rating"><span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span><span>5.0 <small>/ 63 reviews*</small></span></div>
            <p className="review-disclaimer">*Provided information, not verified. No individual reviews or customer quotations are reproduced here.</p>
          </div>
          <div className="review-highlights">
            <p className="eyebrow">REVIEW THEMES TO CONFIRM</p>
            <div className="review-tags">
              {['Ramen', 'Momos', 'Boba tea', 'Friendly staff', 'Value for money', 'Good service', 'Cozy atmosphere'].map((theme) => (
                <span key={theme}>{theme}<span aria-hidden="true">✳</span></span>
              ))}
            </div>
            <p className="review-disclaimer">These are suggested themes from the supplied brief—not verified review excerpts.</p>
            <a className="button button-outline review-button" href={directionsUrl} target="_blank" rel="noreferrer">
              Search Rowdy Cafe on Maps <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-topline">
            <p className="eyebrow"><span>05</span> YOUR TABLE’S WAITING</p>
            <span className="contact-dot">PUNE, INDIA <span>●</span></span>
          </div>
          <div className="contact-layout">
            <div className="contact-details">
              <h2>LET’S<br /><em>MEET UP.</em></h2>
              <p className="contact-intro">Questions, cravings, or need a little help finding us? We’re right here.</p>
              <a className="contact-detail" href={directionsUrl} target="_blank" rel="noreferrer">
                <span className="detail-icon"><MapPin size={19} /></span>
                <span><small>FIND THE CAFE</small><strong>{cafe.address}</strong></span>
                <ArrowUpRight size={17} />
              </a>
              <a className="contact-detail" href={cafe.phoneLink}>
                <span className="detail-icon"><Phone size={19} /></span>
                <span><small>GIVE US A CALL</small><strong>{cafe.phone}</strong></span>
                <ArrowUpRight size={17} />
              </a>
              <div className="contact-detail hours-detail">
                <span className="detail-icon"><Clock3 size={19} /></span>
                <span><small>HOURS (PLEASE CONFIRM)</small><strong>Daily until 11:00 PM</strong><em>Opening time not confirmed. Call ahead.</em></span>
              </div>
              <div className="price-note"><span>₹</span> Price range provided: ₹200–₹400 per person. Please confirm current prices with the cafe.</div>
              <div className="contact-ctas">
                <a className="button button-primary" href={cafe.phoneLink}>Call now <Phone size={16} /></a>
                <a className="button button-outline" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="contact-right">
              <div className="map-frame">
                <iframe
                  title="Map showing the area around Rowdy Cafe Karve Nagar, Pune"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(cafe.mapsQuery)}&t=k&z=17&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a href={directionsUrl} className="map-overlay-link" target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={15} /></a>
              </div>
              <div className="enquiry-panel">
                <div className="enquiry-heading">
                  <span>NOT SURE WHAT TO ORDER?</span>
                  <strong>Ask us anything.</strong>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="order-band" aria-label="Ordering">
          <div><p className="eyebrow">CRAVING SOMETHING GOOD?</p><h2>GIVE US A RING.</h2></div>
          <p>Call the cafe to check what’s available, get current prices, and ask about placing an order.</p>
          <a className="button button-light" href={cafe.phoneLink}>Call to enquire <Phone size={17} /></a>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
