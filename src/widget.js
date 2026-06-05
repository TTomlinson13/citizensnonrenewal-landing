// Marissa Widget v2.0 — citizensnonrenewal.com
// T&C Insurance — Brand color: #e63946
// Features: redesigned UI, Google Maps geocoding, QuoteRUSH auto-submit, Telegram alert

(function () {
  const WIDGET_ID = 'marissa-cnr-widget';
  const API_ENDPOINT = 'https://hooks.citizensnonrenewal.com/api/chat';
  const QR_ENDPOINT = 'https://hooks.citizensnonrenewal.com/api/submit-lead';
  const TELEGRAM_ENDPOINT = 'https://hooks.citizensnonrenewal.com/api/notify';
  const GMAPS_GEOCODE = 'https://hooks.citizensnonrenewal.com/api/geocode';
  const BRAND = '#e63946';

  // ── Lead state ────────────────────────────────────────────────────────────
  const lead = { name: '', phone: '', email: '', address: '', zip: '', geo: null };
  let stage = 'greeting'; // greeting | name | phone | email | address | complete
  let isOpen = false;

  // ── Inject styles ─────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #${WIDGET_ID} * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

    /* Launcher bubble */
    #${WIDGET_ID}-launcher {
      position: fixed; bottom: 24px; right: 24px; z-index: 99998;
      width: 62px; height: 62px; border-radius: 50%;
      background: ${BRAND}; cursor: pointer;
      box-shadow: 0 4px 20px rgba(230,57,70,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
      border: none; outline: none;
    }
    #${WIDGET_ID}-launcher:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(230,57,70,0.55); }
    #${WIDGET_ID}-launcher .avatar-m {
      width: 40px; height: 40px; border-radius: 50%;
      background: #fff; color: ${BRAND};
      font-weight: 800; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
    }
    #${WIDGET_ID}-launcher .notif-dot {
      position: absolute; top: 4px; right: 4px;
      width: 14px; height: 14px; border-radius: 50%;
      background: #22c55e; border: 2px solid #fff;
    }

    /* Chat window */
    #${WIDGET_ID} {
      position: fixed; bottom: 98px; right: 24px; z-index: 99999;
      width: 360px; max-height: 580px;
      border-radius: 18px; overflow: hidden;
      box-shadow: 0 12px 48px rgba(0,0,0,0.22);
      display: flex; flex-direction: column;
      background: #f8f9fa;
      transform: scale(0.92) translateY(16px);
      opacity: 0; pointer-events: none;
      transition: transform .22s cubic-bezier(.34,1.56,.64,1), opacity .18s ease;
    }
    #${WIDGET_ID}.open {
      transform: scale(1) translateY(0);
      opacity: 1; pointer-events: all;
    }

    /* Header */
    #${WIDGET_ID} .w-header {
      background: ${BRAND};
      padding: 14px 16px 12px;
      display: flex; align-items: center; gap: 10px;
      position: relative;
    }
    #${WIDGET_ID} .w-header .avatar-m {
      width: 42px; height: 42px; border-radius: 50%;
      background: #fff; color: ${BRAND};
      font-weight: 800; font-size: 20px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    #${WIDGET_ID} .w-header .header-info { flex: 1; }
    #${WIDGET_ID} .w-header .header-name {
      color: #fff; font-weight: 700; font-size: 15px; line-height: 1.2;
    }
    #${WIDGET_ID} .w-header .header-sub {
      color: rgba(255,255,255,0.82); font-size: 11px; margin-top: 1px;
    }
    #${WIDGET_ID} .w-header .online-dot {
      width: 9px; height: 9px; border-radius: 50%;
      background: #22c55e; display: inline-block;
      margin-right: 4px; box-shadow: 0 0 0 2px rgba(34,197,94,0.3);
    }
    #${WIDGET_ID} .w-header .close-btn {
      background: rgba(255,255,255,0.18); border: none; cursor: pointer;
      width: 28px; height: 28px; border-radius: 50%;
      color: #fff; font-size: 16px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    #${WIDGET_ID} .w-header .close-btn:hover { background: rgba(255,255,255,0.32); }

    /* Badge bar */
    #${WIDGET_ID} .badge-bar {
      background: #fff; padding: 8px 12px;
      display: flex; gap: 6px; overflow-x: auto;
      border-bottom: 1px solid #eee;
      scrollbar-width: none;
    }
    #${WIDGET_ID} .badge-bar::-webkit-scrollbar { display: none; }
    #${WIDGET_ID} .badge {
      background: #fff0f1; color: ${BRAND};
      border: 1px solid rgba(230,57,70,0.25);
      border-radius: 20px; padding: 4px 10px;
      font-size: 11px; font-weight: 600; white-space: nowrap;
      cursor: pointer; transition: background .15s;
    }
    #${WIDGET_ID} .badge:hover { background: #ffd6d9; }

    /* Messages */
    #${WIDGET_ID} .w-messages {
      flex: 1; overflow-y: auto; padding: 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
      scroll-behavior: smooth;
    }
    #${WIDGET_ID} .w-messages::-webkit-scrollbar { width: 4px; }
    #${WIDGET_ID} .w-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

    /* Marissa bubble row */
    #${WIDGET_ID} .bubble-row {
      display: flex; align-items: flex-end; gap: 7px;
    }
    #${WIDGET_ID} .bubble-row .mini-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: ${BRAND}; color: #fff;
      font-weight: 800; font-size: 12px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    #${WIDGET_ID} .bubble {
      max-width: 78%; padding: 10px 13px;
      border-radius: 18px; font-size: 14px; line-height: 1.45;
      word-break: break-word;
    }
    #${WIDGET_ID} .bubble.marissa {
      background: #fff; color: #1a1a2e;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    #${WIDGET_ID} .bubble.user {
      background: ${BRAND}; color: #fff;
      border-bottom-right-radius: 4px;
      margin-left: auto;
    }
    #${WIDGET_ID} .bubble-row.user-row { flex-direction: row-reverse; }

    /* Typing indicator */
    #${WIDGET_ID} .typing-indicator {
      display: flex; align-items: center; gap: 4px; padding: 10px 13px;
      background: #fff; border-radius: 18px; border-bottom-left-radius: 4px;
      width: fit-content; box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    #${WIDGET_ID} .typing-indicator span {
      width: 7px; height: 7px; border-radius: 50%;
      background: #aaa; display: inline-block;
      animation: bounce 1.2s infinite;
    }
    #${WIDGET_ID} .typing-indicator span:nth-child(2) { animation-delay: .2s; }
    #${WIDGET_ID} .typing-indicator span:nth-child(3) { animation-delay: .4s; }
    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }

    /* Quick replies */
    #${WIDGET_ID} .quick-replies {
      display: flex; flex-wrap: wrap; gap: 7px;
      padding: 4px 12px 8px;
    }
    #${WIDGET_ID} .qr-btn {
      background: #fff; color: ${BRAND};
      border: 1.5px solid ${BRAND};
      border-radius: 20px; padding: 7px 14px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      transition: all .15s; white-space: nowrap;
    }
    #${WIDGET_ID} .qr-btn:hover { background: ${BRAND}; color: #fff; }

    /* Input bar */
    #${WIDGET_ID} .w-input-bar {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 12px 12px; background: #fff;
      border-top: 1px solid #eee;
    }
    #${WIDGET_ID} .w-input-bar input {
      flex: 1; border: 1.5px solid #e0e0e0;
      border-radius: 24px; padding: 9px 16px;
      font-size: 14px; outline: none;
      transition: border-color .15s; background: #f9f9f9;
    }
    #${WIDGET_ID} .w-input-bar input:focus { border-color: ${BRAND}; background: #fff; }
    #${WIDGET_ID} .w-input-bar input::placeholder { color: #aaa; }
    #${WIDGET_ID} .w-send-btn {
      width: 40px; height: 40px; border-radius: 50%;
      background: ${BRAND}; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; box-shadow: 0 2px 8px rgba(230,57,70,0.35);
      transition: transform .15s, box-shadow .15s;
    }
    #${WIDGET_ID} .w-send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(230,57,70,0.45); }
    #${WIDGET_ID} .w-send-btn svg { fill: #fff; }
  `;
  document.head.appendChild(style);

  // ── Build launcher ────────────────────────────────────────────────────────
  const launcher = document.createElement('button');
  launcher.id = `${WIDGET_ID}-launcher`;
  launcher.setAttribute('aria-label', 'Chat with Marissa');
  launcher.innerHTML = `
    <div class="avatar-m">M</div>
    <div class="notif-dot"></div>
  `;
  document.body.appendChild(launcher);

  // ── Build widget ──────────────────────────────────────────────────────────
  const widget = document.createElement('div');
  widget.id = WIDGET_ID;
  widget.innerHTML = `
    <div class="w-header">
      <div class="avatar-m">M</div>
      <div class="header-info">
        <div class="header-name">Marissa | T&amp;C Insurance • 60 Years</div>
        <div class="header-sub"><span class="online-dot"></span>Online now</div>
      </div>
      <button class="close-btn" id="${WIDGET_ID}-close">✕</button>
    </div>

    <div class="badge-bar">
      <span class="badge" data-msg="I got a Citizens nonrenewal notice">🏠 Citizens Nonrenewal?</span>
      <span class="badge" data-msg="Tell me about your 50+ carriers">🏢 50+ Carriers</span>
      <span class="badge" data-msg="I'd like a 15-minute callback">📞 15-Min Callback</span>
    </div>

    <div class="w-messages" id="${WIDGET_ID}-messages"></div>

    <div class="quick-replies" id="${WIDGET_ID}-qr">
      <button class="qr-btn" data-action="address">📍 Share address</button>
      <button class="qr-btn" data-action="call">📞 Call me now</button>
    </div>

    <div class="w-input-bar">
      <input type="text" id="${WIDGET_ID}-input" placeholder="Type your message…" autocomplete="off" />
      <button class="w-send-btn" id="${WIDGET_ID}-send" aria-label="Send">
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(widget);

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const messagesEl = document.getElementById(`${WIDGET_ID}-messages`);
  const inputEl    = document.getElementById(`${WIDGET_ID}-input`);
  const sendBtn    = document.getElementById(`${WIDGET_ID}-send`);
  const closeBtn   = document.getElementById(`${WIDGET_ID}-close`);
  const qrEl       = document.getElementById(`${WIDGET_ID}-qr`);

  // ── Open / close ──────────────────────────────────────────────────────────
  function openWidget() {
    isOpen = true;
    widget.classList.add('open');
    launcher.style.display = 'none';
    inputEl.focus();
  }
  function closeWidget() {
    isOpen = false;
    widget.classList.remove('open');
    launcher.style.display = 'flex';
  }
  launcher.addEventListener('click', openWidget);
  closeBtn.addEventListener('click', closeWidget);

  // ── Messages ──────────────────────────────────────────────────────────────
  function addBubble(text, role) {
    const isMarissa = role === 'marissa';
    const row = document.createElement('div');
    row.className = `bubble-row${isMarissa ? '' : ' user-row'}`;
    if (isMarissa) {
      row.innerHTML = `
        <div class="mini-avatar">M</div>
        <div class="bubble marissa">${text}</div>
      `;
    } else {
      row.innerHTML = `<div class="bubble user">${text}</div>`;
    }
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return row;
  }

  function addTyping() {
    const row = document.createElement('div');
    row.className = 'bubble-row';
    row.id = `${WIDGET_ID}-typing`;
    row.innerHTML = `
      <div class="mini-avatar">M</div>
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    `;
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function removeTyping() {
    const t = document.getElementById(`${WIDGET_ID}-typing`);
    if (t) t.remove();
  }

  // ── Conversation flow ─────────────────────────────────────────────────────
  const FLOW = {
    greeting: {
      ask: "Hi! I'm Marissa 👋 Did you receive a Citizens nonrenewal notice? I can help find you better coverage!",
      next: 'name',
      prompt: 'What\'s your name?',
    },
  };

  const STAGE_PROMPTS = {
    name:    "What's your name?",
    phone:   "Great! What's the best phone number to reach you?",
    email:   "And your email address?",
    address: "What's the property address you need coverage for? (or tap 📍 Share address)",
  };

  function marissaSay(text, delay = 600) {
    addTyping();
    setTimeout(() => {
      removeTyping();
      addBubble(text, 'marissa');
    }, delay);
  }

  function processStage(userText) {
    switch (stage) {
      case 'greeting':
        stage = 'name';
        marissaSay(STAGE_PROMPTS.name);
        break;
      case 'name':
        lead.name = userText;
        stage = 'phone';
        marissaSay(`Nice to meet you, ${lead.name}! 😊 ${STAGE_PROMPTS.phone}`);
        break;
      case 'phone':
        lead.phone = userText;
        stage = 'email';
        marissaSay(STAGE_PROMPTS.email);
        break;
      case 'email':
        lead.email = userText;
        stage = 'address';
        marissaSay(STAGE_PROMPTS.address);
        break;
      case 'address':
        lead.address = userText;
        stage = 'complete';
        handleAddressAndSubmit(userText);
        break;
      default:
        // Post-complete: relay to backend AI
        relayToAI(userText);
    }
  }

  // ── Geocoding ─────────────────────────────────────────────────────────────
  async function geocodeAddress(address) {
    try {
      const res = await fetch(`${GMAPS_GEOCODE}?address=${encodeURIComponent(address)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data; // { lat, lng, formatted_address, zip }
    } catch (e) {
      return null;
    }
  }

  // ── Submit to QuoteRUSH via backend ──────────────────────────────────────
  async function submitToQuoteRUSH() {
    try {
      const payload = {
        first_name: lead.name.split(' ')[0] || lead.name,
        last_name:  lead.name.split(' ').slice(1).join(' ') || '',
        phone:      lead.phone,
        email:      lead.email,
        address:    lead.address,
        zip:        lead.zip || '',
        source:     'citizensnonrenewal.com',
        tags:       ['citizens-nonrenewal', 'widget-lead'],
        geo:        lead.geo,
      };
      const res = await fetch(QR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  // ── Telegram alert via backend ────────────────────────────────────────────
  async function sendTelegramAlert() {
    try {
      const msg = `🔴 New CNR Widget Lead!\n👤 ${lead.name}\n📞 ${lead.phone}\n📧 ${lead.email}\n🏠 ${lead.address}${lead.zip ? ' ' + lead.zip : ''}\n🌐 Source: citizensnonrenewal.com`;
      await fetch(TELEGRAM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: '8347371539', text: msg }),
      });
    } catch (e) { /* silent */ }
  }

  // ── Handle address + submit ───────────────────────────────────────────────
  async function handleAddressAndSubmit(address) {
    marissaSay('Let me look that up… 🔍', 400);

    // Geocode
    const geo = await geocodeAddress(address);
    if (geo) {
      lead.geo = { lat: geo.lat, lng: geo.lng };
      lead.zip = geo.zip || lead.zip;
      if (geo.formatted_address) lead.address = geo.formatted_address;
    }

    // Submit lead
    const submitted = await submitToQuoteRUSH();
    await sendTelegramAlert();

    setTimeout(() => {
      addBubble(
        `✅ Got it! I'm pulling quotes from our 50+ carriers for <strong>${lead.address}</strong>.<br><br>` +
        `Expect a call within 15 minutes, ${lead.name}! You can also reach us at <strong>800-616-1418</strong>.`,
        'marissa'
      );
      qrEl.innerHTML = `
        <button class="qr-btn" onclick="window.open('tel:8006161418')">📞 Call 800-616-1418</button>
        <button class="qr-btn" onclick="window.open('https://app.usecanopy.com/c/tomlinson-and-co','_blank')">🔗 Sync My Policy</button>
      `;
    }, 1800);
  }

  // ── Relay to backend AI (post-complete freeform) ──────────────────────────
  async function relayToAI(userText) {
    addTyping();
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, lead }),
      });
      removeTyping();
      const data = await res.json();
      addBubble(data.response || "I'll have someone follow up with you shortly!", 'marissa');
    } catch (e) {
      removeTyping();
      addBubble("I'll have someone follow up with you shortly! You can also call us at 800-616-1418.", 'marissa');
    }
  }

  // ── Send handler ──────────────────────────────────────────────────────────
  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    addBubble(text, 'user');
    inputEl.value = '';
    setTimeout(() => processStage(text), 100);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

  // ── Badge bar clicks ──────────────────────────────────────────────────────
  document.querySelectorAll(`#${WIDGET_ID} .badge`).forEach(badge => {
    badge.addEventListener('click', () => {
      const msg = badge.getAttribute('data-msg');
      if (!isOpen) openWidget();
      addBubble(msg, 'user');
      setTimeout(() => processStage(msg), 100);
    });
  });

  // ── Quick reply buttons ───────────────────────────────────────────────────
  qrEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    if (action === 'call') {
      window.open('tel:8006161418');
    } else if (action === 'address') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          const geo = await geocodeAddress(`${latitude},${longitude}`);
          if (geo && geo.formatted_address) {
            inputEl.value = geo.formatted_address;
            handleSend();
          } else {
            inputEl.placeholder = 'Enter your address…';
            inputEl.focus();
          }
        }, () => {
          inputEl.placeholder = 'Enter your address…';
          inputEl.focus();
        });
      } else {
        inputEl.placeholder = 'Enter your address…';
        inputEl.focus();
      }
    }
  });

  // ── Init greeting ─────────────────────────────────────────────────────────
  setTimeout(() => {
    marissaSay("Hi! I'm Marissa 👋 Did you receive a Citizens nonrenewal notice? I can help find you better coverage!", 800);
    setTimeout(() => {
      marissaSay(STAGE_PROMPTS.name, 2200);
      stage = 'name';
    }, 3000);
  }, 500);

})();
