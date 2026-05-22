import { useState, useEffect } from 'react'

function JotformModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl" style={{ maxHeight: '90vh' }}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold shadow transition"
          aria-label="Close"
        >×</button>
        <iframe
          src={`https://form.jotform.com/261387102956158`}
          title="Citizens Non-Renewal Quote"
          allow="geolocation; microphone; camera"
          allowFullScreen
          style={{ width: '100%', height: '80vh', border: 'none', display: 'block', background: '#fff' }}
        />
      </div>
    </div>
  )
}

function App() {
  const [showJotform, setShowJotform] = useState(false)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">CitizensNonRenewal.com</h1>
            <p className="text-sm text-gray-600">Find Your Alternative Coverage</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:407-337-1135" className="hidden sm:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold transition">
              📞 407-337-1135
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🏠</div>
          <div className="absolute top-20 right-20 text-5xl">🛡️</div>
          <div className="absolute bottom-10 left-1/3 text-5xl">✓</div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="text-center md:text-left">
              <p className="text-blue-300 font-semibold mb-2 uppercase tracking-wider">Your Citizens Policy Ended?</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Citizens Insurance Non-Renewal? Don't Panic. We Can Help.
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Find affordable Florida home insurance alternatives in minutes. 50+ carriers, licensed since 1987.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => setShowJotform(true)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105 text-lg flex items-center justify-center gap-2"
                >
                  <span className="text-2xl">⚡</span>
                  Get Free Quotes Now
                </button>
                <a
                  href="tel:407-337-1135"
                  className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-8 rounded-xl shadow-lg transition text-center flex items-center justify-center gap-2"
                >
                  <span className="text-2xl">📞</span>
                  407-337-1135
                </a>
              </div>

              {/* Callout */}
              <div className="mt-6 bg-blue-100/20 border-l-4 border-yellow-400 p-4 rounded-r-lg max-w-lg">
                <p className="text-blue-100 text-sm">
                  <strong>✓ No Obligation</strong> • <strong>✓ Free Quotes</strong> • <strong>✓ No Spam</strong>
                </p>
              </div>
            </div>

            {/* Right: Info Box */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">What's Happening?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">📊</span>
                    <div>
                      <p className="font-semibold">600,000+ Floridians Affected</p>
                      <p className="text-sm text-blue-100">Citizens Insurance is closing its depopulation program</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">Non-Renewals Continue</p>
                      <p className="text-sm text-blue-100">Thousands receiving cancellation notices monthly</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">✓</span>
                    <div>
                      <p className="font-semibold">Solutions Available</p>
                      <p className="text-sm text-blue-100">50+ private carriers ready to help</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-blue-900 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
          <span>✓ Licensed Since 1987</span>
          <span>✓ A-Rated Carriers</span>
          <span>✓ Same-Day Quotes</span>
          <span>✓ Florida Specialists</span>
        </div>
      </section>

      {/* What's Happening Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Understanding Citizens Depopulation
          </h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Here's what you need to know about Citizens Insurance's situation and your options.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: What's Happening */}
            <div>
              <h4 className="text-xl font-bold text-blue-900 mb-4">The Situation</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Citizens Insurance is the "insurer of last resort" in Florida</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>With 600,000+ policies, they've stopped accepting new business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Depopulation program is canceling policies at rapid rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Non-renewals can happen with 30-60 days' notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Your mortgage company WILL be notified</span>
                </li>
              </ul>
            </div>

            {/* Right: Timeline */}
            <div>
              <h4 className="text-xl font-bold text-blue-900 mb-4">Timeline of Recent Events</h4>
              <ul className="space-y-4">
                <li className="border-l-4 border-yellow-400 pl-4">
                  <p className="font-semibold text-blue-900">2024-2025</p>
                  <p className="text-sm text-gray-600">Citizens stops accepting new policies</p>
                </li>
                <li className="border-l-4 border-yellow-400 pl-4">
                  <p className="font-semibold text-blue-900">Early 2025</p>
                  <p className="text-sm text-gray-600">Mass non-renewal notices issued</p>
                </li>
                <li className="border-l-4 border-yellow-400 pl-4">
                  <p className="font-semibold text-blue-900">Current</p>
                  <p className="text-sm text-gray-600">Thousands losing coverage monthly</p>
                </li>
                <li className="border-l-4 border-yellow-400 pl-4">
                  <p className="font-semibold text-blue-900">Your Timeline</p>
                  <p className="text-sm text-gray-600">Apply now — don't wait for the deadline!</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Your Options Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Your Options: Private Market Alternatives
          </h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            50+ carriers available to replace your Citizens policy — often at competitive rates.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Top Carriers */}
            <div>
              <h4 className="text-xl font-bold text-blue-900 mb-6">Top Carriers We Represent</h4>
              <div className="space-y-3">
                {[
                  { name: 'American Integrity', tag: 'Popular' },
                  { name: 'Heritage Insurance', tag: 'Coastal Specialist' },
                  { name: 'Slide Insurance', tag: 'Competitive Rates' },
                  { name: 'Universal Insurance', tag: 'Fast Processing' },
                  { name: 'Security First Insurance', tag: 'FL Native' },
                  { name: 'FedNat Insurance', tag: 'All Risk Options' },
                ].map((carrier) => (
                  <div key={carrier.name} className="bg-blue-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="font-semibold text-blue-900">{carrier.name}</p>
                    <p className="text-sm text-gray-600">{carrier.tag}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage Comparison */}
            <div>
              <h4 className="text-xl font-bold text-blue-900 mb-6">Typical Coverage & Pricing</h4>
              <div className="bg-blue-900 text-white p-6 rounded-lg">
                <ul className="space-y-4">
                  <li className="border-b border-blue-700 pb-3">
                    <p className="font-semibold">Homeowners Insurance</p>
                    <p className="text-sm text-blue-100">$800–$2,500/year depending on home value & location</p>
                  </li>
                  <li className="border-b border-blue-700 pb-3">
                    <p className="font-semibold">Windstorm/Hurricane Coverage</p>
                    <p className="text-sm text-blue-100">Usually included or available as endorsement</p>
                  </li>
                  <li className="border-b border-blue-700 pb-3">
                    <p className="font-semibold">Deductibles</p>
                    <p className="text-sm text-blue-100">$500–$5,000 options available</p>
                  </li>
                  <li>
                    <p className="font-semibold">Better Than Citizens?</p>
                    <p className="text-sm text-blue-100">Usually YES — better coverage, faster claims, same or lower cost</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Ready to compare your options?</p>
            <button
              onClick={() => setShowJotform(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition text-lg"
            >
              Get Free Quotes from Multiple Carriers →
            </button>
          </div>
        </div>
      </section>

      {/* Why Tomlinson & Co */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Why Tomlinson & Co?
          </h3>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <p className="text-2xl mb-2">🏛️</p>
                  <h4 className="font-bold text-blue-900">Licensed Since 1987</h4>
                  <p className="text-sm text-gray-600 mt-2">Over 35 years protecting Florida homeowners and businesses</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <p className="text-2xl mb-2">🏢</p>
                  <h4 className="font-bold text-blue-900">50+ Carrier Relationships</h4>
                  <p className="text-sm text-gray-600 mt-2">We shop all available options to find YOUR best fit</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <p className="text-2xl mb-2">📍</p>
                  <h4 className="font-bold text-blue-900">Local Experts</h4>
                  <p className="text-sm text-gray-600 mt-2">Altamonte Springs, FL location with deep Florida knowledge</p>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <p className="text-2xl mb-2">⚡</p>
                  <h4 className="font-bold text-blue-900">Fast Quotes</h4>
                  <p className="text-sm text-gray-600 mt-2">Get quotes in 2 minutes through our online form</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <p className="text-2xl mb-2">✓</p>
                  <h4 className="font-bold text-blue-900">No Obligation</h4>
                  <p className="text-sm text-gray-600 mt-2">Free quotes, no spam, no pressure to buy</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                  <p className="text-2xl mb-2">🤝</p>
                  <h4 className="font-bold text-blue-900">Ongoing Support</h4>
                  <p className="text-sm text-gray-600 mt-2">We manage your policy and handle claims for you</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-xl text-center">
            <p className="text-lg">
              <strong>Citizens Non-Renewal Specialists</strong> — We help hundreds of Floridians annually find replacement coverage quickly and affordably.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            Get Your Free Quotes in 2 Minutes
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Fill out our quick form below and we'll email you available quotes from our top-rated carriers.
          </p>
          <button
            onClick={() => setShowJotform(true)}
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-10 rounded-xl shadow-lg transition text-lg inline-block"
          >
            📝 Open Quote Form →
          </button>
          <p className="text-sm text-gray-500 mt-6">
            Quick application • 50+ carriers • Quotes in 2 minutes • No obligation
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Frequently Asked Questions
          </h3>

          <div className="space-y-6">
            <details className="bg-white p-6 rounded-lg shadow-md group cursor-pointer">
              <summary className="font-bold text-lg text-blue-900 flex items-center justify-between">
                When does my Citizens policy expire?
                <span className="text-2xl group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Check your Citizens policy renewal notice or call them at 1-877-CITIZENS (1-877-248-3767). Most non-renewals are effective 30-60 days after the notice date. Don't wait — apply now so your new coverage is active before Citizens cancels you.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-md group cursor-pointer">
              <summary className="font-bold text-lg text-blue-900 flex items-center justify-between">
                Will my mortgage company be notified?
                <span className="text-2xl group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Yes. When Citizens cancels your policy, they're required by law to notify your mortgage company. Your lender will expect you to have replacement coverage in place. That's why acting quickly is critical.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-md group cursor-pointer">
              <summary className="font-bold text-lg text-blue-900 flex items-center justify-between">
                How much will private insurance cost?
                <span className="text-2xl group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                It varies, but most homeowners find competitive rates with private carriers — sometimes cheaper than Citizens! Expect $800–$2,500/year depending on your home value, age, location, and coverage options. Get your free quotes to see actual pricing.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-md group cursor-pointer">
              <summary className="font-bold text-lg text-blue-900 flex items-center justify-between">
                What if I can't find coverage?
                <span className="text-2xl group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                With 50+ carriers, options exist for most homes. Our agents know which carriers will cover older homes, coastal properties, and difficult-to-place risks. Call us at 407-337-1135 if you've been declined elsewhere.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-md group cursor-pointer">
              <summary className="font-bold text-lg text-blue-900 flex items-center justify-between">
                How quickly can I get a quote?
                <span className="text-2xl group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Submit the form above and you'll get quotes via email within 2 minutes. For immediate assistance, call 407-337-1135 and speak with an agent directly.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-md group cursor-pointer">
              <summary className="font-bold text-lg text-blue-900 flex items-center justify-between">
                Is this service free?
                <span className="text-2xl group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                100% free. We earn a commission from insurance carriers when you buy a policy — you don't pay extra. No obligation to purchase.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Don't Let Citizens Leave You Uninsured
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Get your free quote now — same-day quotes available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowJotform(true)}
              className="bg-white text-blue-700 font-bold text-xl py-4 px-10 rounded-xl shadow-lg hover:bg-gray-100 transition"
            >
              Get Free Quotes →
            </button>
            <a
              href="tel:407-337-1135"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xl py-4 px-10 rounded-xl shadow-lg transition"
            >
              📞 407-337-1135
            </a>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            Licensed Florida Insurance Agency • Serving since 1987
          </p>
        </div>
      </section>

      {/* Sister Sites Bar */}
      <div className="bg-blue-900 py-3 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-blue-300 text-sm mr-2">Also from Tomlinson & Co:</span>
          <a href="https://hoinsurance.com" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-blue-200 transition">HOInsurance.com</a>
          <span className="text-blue-500 text-sm mx-2">·</span>
          <a href="https://floridauto.com" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-blue-200 transition">FloridAuto.com</a>
          <span className="text-blue-500 text-sm mx-2">·</span>
          <a href="https://buyabop.com" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-blue-200 transition">BuyaBOP.com</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-white mb-2">
            Citizens Insurance Non-Renewal Specialists
          </p>
          <p className="text-sm mb-2">
            Tomlinson & Co Agency • Altamonte Springs, FL<br/>
            📞 407-337-1135 • 📧 tt@usicna.com
          </p>
          <p className="text-xs mt-4">
            © {new Date().getFullYear()} Tomlinson & Co Inc. All rights reserved.<br/>
            Florida Insurance License #: See agency website for details
          </p>
          <p className="text-xs mt-2">
            <a href="/privacy-policy.html" className="text-gray-400 hover:text-white underline">Privacy Policy</a> • 
            <a href="/terms.html" className="text-gray-400 hover:text-white underline ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>

      {showJotform && <JotformModal onClose={() => setShowJotform(false)} />}
    </div>
  )
}

export default App
