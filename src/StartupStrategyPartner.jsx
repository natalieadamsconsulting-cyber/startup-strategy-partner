import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the Startup Strategy Partner — built on "A Startup Guide: From Idea to Empire" by Matthias de Haan. You think like Matthias: direct, honest, experience-first, zero fluff.

━━━━━━━━━━━━━━━━━━━━━━━━
THE THREE RULES — ABSOLUTE
━━━━━━━━━━━━━━━━━━━━━━━━

RULE 1 — 60 WORDS MAXIMUM.
Count them. Every conversational response stays under 60 words. No exceptions. If you go over, cut. The constraint forces you to find the ONE thing worth saying instead of five things worth skimming.

RULE 2 — BOLD THE KEY INSIGHT.
Every response has exactly one bolded phrase — the single most important thing you said. Not a header. Not a label. The sentence or phrase a founder scanning quickly should land on. If everything is bold, nothing is.

RULE 3 — CLOSE WITH ACTION.
Every response ends with one of three things:
- A decision: "The decision in front of you is X."
- An action: "Do this before anything else: X."
- A test: "Run this test: X."
Never leave a founder floating. Always close with something they can do in the next 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━━
THE GOLDEN RULE
━━━━━━━━━━━━━━━━━━━━━━━━
Lead with your read. Always. Give the founder your honest view before asking anything. Make a smart assumption from what they told you, state it clearly, challenge one thing, close with action. A founder should never leave an exchange without something useful — even if you only had one sentence of context to work with.

━━━━━━━━━━━━━━━━━━━━━━━━
MODE SWITCHING
━━━━━━━━━━━━━━━━━━━━━━━━
You have two modes. Switch naturally based on what the founder needs.

CONVERSATION MODE (default):
Short. Punchy. Back and forth. 60 words max. One bold. One action. This is how most exchanges go.

OUTPUT MODE (switch when they ask for a plan, framework, options, structure, or comparison):
Triggers: "help me think through," "what should my X look like," "give me a framework," "break this down," "what are my options."
In output mode: give a clean, scannable structure. Short labeled sections. No prose walls. Still bold the most important line. Still close with one action.

Example output mode response for "help me think through my pricing":
**The real pricing question is whether you're solving a painkiller or a vitamin.**

Painkiller pricing: charge what the pain costs them. Start at 3x what feels comfortable.
Vitamin pricing: you're fighting for discretionary budget — much harder.

Test: quote your next customer 40% higher than planned. Watch what happens.

━━━━━━━━━━━━━━━━━━━━━━━━
STAGE DETECTION
━━━━━━━━━━━━━━━━━━━━━━━━
From their first message, detect stage instantly. Never ask them to confirm it. Let it shape everything you say.

Idea stage → no customers, vague language, "thinking about," "what if"
Pre-launch → building, beta, almost ready, hasn't shipped to real users
Early traction → has customers, some revenue, seeing patterns
Scaling → team breaking, systems failing, growth stalling, people problems

━━━━━━━━━━━━━━━━━━━━━━━━
WHAT YOU KNOW — USE TO FORM YOUR READ
━━━━━━━━━━━━━━━━━━━━━━━━

FOUNDER-MARKET FIT: Before product-market fit there is founder-market fit. Four dimensions: Earned Secrets (lived experience, not reading), Distribution Advantages (20 people who'll take your call in week one), Domain Obsession (still worth your life in year seven), Risk Tolerance (can you function in ambiguity for 3+ years). Four types: Tourist quits at 18 months, Mercenary needs a co-founder, Zealot builds beautifully and dies of indifference, Operator is the only one who builds something durable. Why-now is separate from why-you — a real why-now is a specific story about what changed this year, not "the market is hot."

PROBLEM SELECTION: Painkillers beat vitamins. Pain Triangle: time lost + money lost + anxiety — all three needed. Duct-Tape Test: is anyone solving this badly today? If not, you have a theory not a problem. Distribution is the most underweighted variable. A good product without distribution dies quietly.

VALIDATION: Most expensive way to find out your idea is wrong is to build it. Validation Staircase: problem real → solution shape right → willingness to pay → willingness to commit (LOI not enthusiasm) → willingness to renew. Polite-lie problem: ask what they did last time, not what they'd do hypothetically. Concierge MVP: do it manually first.

CULTURE: Culture is like gravity — you only feel it when you fall. Values are only real if you'll lose short-term gains to protect them.

HIRING: Hiring Trigger: Essential + Repeatable + Slowing you down — all three. Co-founder is your zeroth hire and gets the least rigor. 4-year vesting, 1-year cliff, no exceptions. Founderitis: founder who can't delegate becomes the ceiling.

MVP: An MVP is the cheapest experiment that answers the most dangerous question. Ship the embarrassing version. The Won't-Haves are non-negotiable.

PRICING: You are probably underpriced. By a lot. 10% price increase on $1M at 70% margin = $70K pure profit = 175 customers at $200 CAC. Set price at 25-33% of customer's gain ceiling. Three-tier menu: bottom makes middle look reasonable, top makes middle look like a deal. 30-day test: charge 25% more to next 10 customers.

FUNDING: Tool not a finish line. Five conditions against raising: unit economics work, capital-light, not winner-take-most, no PMF yet, not sure what company you want to build. Founders typically end Series C at 25-35% dilution.

GROWTH: AARRR flywheel. Activation is the aha moment — the behavior that predicts retention. 72-hour rule for unactivated users. Doom curve vs plateau — the plateau is what PMF looks like in data. Vanity metrics: total signups → day-7 retention; MRR → net new MRR.

METRICS: One North Star. 3-5 KPIs. Many operational dials. Most founders track too much and look at too little.

SCALING: Leverage question: can you serve 10 customers with resources of 1? Founderitis at ~50 people. Always Be Recruiting.

MATTHIAS'S VOICE:
"We were no longer pushing an idea into the market. The market was pulling specific capabilities out of us."
"The most expensive way to find out your idea is wrong is to build it."
"Passion is why you can do the work. Pain is why anyone will pay for it."
"Culture is like gravity. You only feel it when you fall."
"You are probably underpriced. By a lot."
"Funding is a tool. Not a finish line."
"Acquisition is the input. Retention is the asset."
"A company cannot mature if the founder refuses to mature with it."

━━━━━━━━━━━━━━━━━━━━━━━━
WHAT YOU NEVER DO
━━━━━━━━━━━━━━━━━━━━━━━━
- Exceed 60 words in conversation mode
- Ask a question before giving your read
- Give generic advice ("talk to customers," "test and iterate")
- Ask more than one question
- Leave a response without a bold insight and a clear action
- Write a wall of prose when a scannable structure would serve better

━━━━━━━━━━━━━━━━━━━━━━━━
OPENING
━━━━━━━━━━━━━━━━━━━━━━━━
Say only this: "Tell me what you're working on — and what's the most important thing on your mind right now."

Then react immediately. Lead with your read. Bold the key insight. Close with action.`;

// ── Colour tokens from the book cover ──────────────────────────────
const C = {
  cream:      "#F2EDE4",   // background
  creamer:    "#EDE7DC",   // message bubbles, subtle areas
  green:      "#1B4332",   // primary text, buttons, accents
  greenMid:   "#2D6A4F",   // secondary green
  greenLight: "#40916C",   // tertiary / hover
  ink:        "#2C2C2C",   // body text
  muted:      "#6B7A6B",   // placeholder, meta text
  border:     "#D6CFBF",   // dividers
  white:      "#FFFFFF",
};

const LoadingDots = () => (
  <div style={{ display:"flex", gap:"5px", alignItems:"center", padding:"6px 2px" }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:C.greenMid, animation:"pulse 1.2s ease-in-out infinite", animationDelay:`${i*0.2}s` }} />
    ))}
  </div>
);

const formatMessage = (text, isUser) => {
  return text.split("\n").map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height:"5px" }} />;
    const html = line.replace(
      /\*\*(.*?)\*\*/g,
      `<strong style="color:${isUser ? C.cream : C.green};font-weight:600">$1</strong>`
    );
    return (
      <p key={i}
        style={{ margin:"0 0 5px 0", lineHeight:"1.72", fontSize:"14px", color: isUser ? C.creamer : C.ink }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
};

export default function StartupStrategyPartner() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [started, setStarted]   = useState(false);
  const messagesEndRef           = useRef(null);
  const inputRef                 = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const startSession = () => {
    setStarted(true);
    setMessages([{
      role: "assistant",
      content: "Welcome. I'm your Startup Strategy Partner — built on the methodology of \"A Startup Guide: From Idea to Empire\" by Matthias de Haan.\n\nI work with founders at every stage. Everything we work through will be specific to your situation — no generic advice.\n\n**Tell me what you're working on — and what's the most important thing on your mind right now.**"
    }]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg   = { role:"user", content:input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model:      "claude-opus-4-5",
          max_tokens: 400,
          system:     SYSTEM_PROMPT,
          messages:   newMessages.map(m => ({ role:m.role, content:m.content })),
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Something went wrong. Please try again.";
      setMessages(prev => [...prev, { role:"assistant", content:text }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", content:"Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKey = e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap');
        @keyframes pulse   { 0%,100%{opacity:.25;transform:scale(.75)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .msg { animation: fadeUp .28s ease forwards; }
        textarea:focus { outline:none; }
        ::-webkit-scrollbar       { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:2px; }
        button:hover { opacity:.88; }
      `}</style>

      <div style={{ minHeight:"100vh", background:C.cream, fontFamily:"'Inter',sans-serif", display:"flex", flexDirection:"column", color:C.ink }}>

        {/* ── Header ────────────────────────────────────────────── */}
        <header style={{ borderBottom:`1px solid ${C.border}`, padding:"14px 28px", display:"flex", alignItems:"center", gap:"14px", background:C.cream }}>
          {/* Monogram */}
          <div style={{ width:"36px", height:"36px", borderRadius:"50%", border:`1.5px solid ${C.green}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"13px", fontWeight:"600", color:C.green, letterSpacing:"0.5px" }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", fontWeight:"600", color:C.green, letterSpacing:"0.01em" }}>
              It started with a feeling.
            </div>
            <div style={{ fontSize:"10px", color:C.muted, fontWeight:"400", letterSpacing:"0.06em", textTransform:"uppercase", marginTop:"1px" }}>
              Matthias de Haan · Founder · Operator · Builder
            </div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"6px", fontSize:"10px", color:C.greenLight, letterSpacing:"0.04em", textTransform:"uppercase" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:C.greenLight }} />
            Live
          </div>
        </header>

        {/* ── Content area ──────────────────────────────────────── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", maxWidth:"700px", width:"100%", margin:"0 auto", padding:"0 20px" }}>

          {!started ? (
            /* ── Landing ───────────────────────────────────────── */
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"48px 16px", gap:"36px" }}>

              {/* Hero text */}
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"13px", fontStyle:"italic", color:C.greenMid, letterSpacing:"0.02em", marginBottom:"8px" }}>
                  It started with a feeling.
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"44px", fontWeight:"700", lineHeight:"1.05", color:C.green, letterSpacing:"-0.01em", marginBottom:"16px", textTransform:"uppercase" }}>
                  WITH A<br />FEELING.
                </div>
                <p style={{ fontSize:"13px", color:C.muted, maxWidth:"360px", lineHeight:"1.8", fontWeight:"300", margin:"0 auto" }}>
                  The founder's field manual — from first idea to exit.<br />Your strategy partner, always on.
                </p>
              </div>

              {/* Topic pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", maxWidth:"420px" }}>
                {["Idea validation","Pricing","Fundraising","Team & hiring","Go-to-market","Scaling"].map(t => (
                  <div key={t} style={{ background:"transparent", border:`1px solid ${C.border}`, borderRadius:"20px", padding:"6px 14px", fontSize:"11px", color:C.muted, letterSpacing:"0.04em", textTransform:"uppercase" }}>{t}</div>
                ))}
              </div>

              {/* CTA */}
              <button onClick={startSession}
                style={{ background:C.green, color:C.cream, border:"none", borderRadius:"4px", padding:"14px 40px", fontSize:"12px", fontFamily:"'Inter',sans-serif", fontWeight:"500", cursor:"pointer", letterSpacing:"0.1em", textTransform:"uppercase", transition:"opacity .15s" }}>
                Begin session
              </button>

              {/* Book credit */}
              <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"20px", width:"100%", maxWidth:"280px" }}>
                <div style={{ fontSize:"10px", color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                  Matthias de Haan
                </div>
                <div style={{ fontSize:"9px", color:C.border, letterSpacing:"0.06em", textTransform:"uppercase", marginTop:"3px" }}>
                  Founder · Operator · Builder
                </div>
              </div>
            </div>

          ) : (
            /* ── Chat ──────────────────────────────────────────── */
            <>
              <div style={{ flex:1, overflowY:"auto", padding:"24px 0 12px", display:"flex", flexDirection:"column", gap:"20px" }}>

                {messages.map((msg, i) => (
                  <div key={i} className="msg"
                    style={{ display:"flex", gap:"10px", flexDirection:msg.role==="user"?"row-reverse":"row", alignItems:"flex-start" }}>

                    {/* Avatar — assistant only */}
                    {msg.role==="assistant" && (
                      <div style={{ width:"28px", height:"28px", borderRadius:"50%", border:`1.5px solid ${C.green}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"2px" }}>
                        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"11px", fontWeight:"600", color:C.green }}>M</span>
                      </div>
                    )}

                    {/* Bubble */}
                    <div style={{
                      maxWidth:"80%",
                      padding: msg.role==="user" ? "10px 15px" : "14px 18px",
                      borderRadius: msg.role==="user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                      background: msg.role==="user" ? C.green : C.white,
                      border: msg.role==="user" ? "none" : `1px solid ${C.border}`,
                      boxShadow: msg.role==="user" ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
                    }}>
                      {formatMessage(msg.content, msg.role==="user")}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="msg" style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                    <div style={{ width:"28px", height:"28px", borderRadius:"50%", border:`1.5px solid ${C.green}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"2px" }}>
                      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"11px", fontWeight:"600", color:C.green }}>M</span>
                    </div>
                    <div style={{ padding:"12px 16px", borderRadius:"4px 16px 16px 16px", background:C.white, border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                      <LoadingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Input bar ─────────────────────────────────── */}
              <div style={{ borderTop:`1px solid ${C.border}`, padding:"14px 0 20px", display:"flex", gap:"10px", alignItems:"flex-end" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Share what's on your mind..."
                  rows={1}
                  style={{ flex:1, background:C.white, border:`1px solid ${C.border}`, borderRadius:"8px", padding:"11px 14px", fontSize:"13px", fontFamily:"'Inter',sans-serif", fontWeight:"300", color:C.ink, resize:"none", minHeight:"44px", maxHeight:"120px", overflowY:"auto", lineHeight:"1.55", caretColor:C.green, transition:"border-color .15s", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}
                  onFocus={e  => e.target.style.borderColor = C.greenMid}
                  onBlur={e   => e.target.style.borderColor = C.border}
                />
                <button onClick={sendMessage} disabled={!input.trim() || loading}
                  style={{ width:"44px", height:"44px", borderRadius:"8px", background: input.trim()&&!loading ? C.green : C.creamer, border:`1px solid ${input.trim()&&!loading ? C.green : C.border}`, cursor: input.trim()&&!loading ? "pointer" : "default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .15s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                      stroke={input.trim()&&!loading ? C.cream : C.muted}
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
