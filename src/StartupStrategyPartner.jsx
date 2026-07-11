import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { saveMessage, getMessages } from "./supabase";

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

TECH & AI: Build only what customers pay you specifically to be better at — buy everything that's undifferentiated heavy lifting. Technical debt is a financing instrument, not a sin; the sin is not recording the loan. Architecture stage must match team stage — architecture ahead of team dies in orchestration, architecture behind team dies in merge conflicts and fear; fix with the next increment, not a rewrite. AI immersion check: are you personally using AI 10+ times a day, have you built or set up at least one agent for a recurring task? Founders who delegate AI adoption instead of getting immersed themselves make bad calls about it. If fundraising is on the 12-month horizon, run the Series A security checklist now — security debt found in diligence costs valuation. Watch for rewrite romance, résumé-driven architecture, vendor sprawl, and debt denial.

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


// ── Final brand palette — Midnight / Navy / Warm White ──────────────
const C = {
  // Foundations
  pageBg:      "#FAFAFA",   // bright clean white — maximum contrast, nothing heavy
  white:       "#FFFFFF",   // cards, agent bubbles
  warmAccent:  "#F5F0E8",   // action card background — warm tonal, no new hue

  // Primary brand
  midnight:    "#0D1129",   // near-black with deep blue depth — headlines
  navy:        "#1A2E8F",   // rich saturated navy — buttons, user bubbles, brand
  navyDark:    "#111E6B",   // hover
  navyTint:    "#E8ECFA",   // user bubble background — crisp, cool
  navyBorder:  "#C4CCF0",   // user bubble border

  // Text
  ink:         "#0D1129",   // same as midnight — body text
  muted:       "#6B7280",   // secondary text
  mutedLight:  "#9CA3AF",   // placeholders, meta

  // Borders
  border:      "#E5E7EB",   // default — clean neutral
  warmBorder:  "#DDD5C4",   // action card border — warm tonal

  // Semantic
  success:     "#22C55E",   // live indicator only
};

// Star divider — landing page only, never in UI chrome
const StarDivider = () => (
  <div style={{ display:"flex", alignItems:"center", gap:"14px",
    justifyContent:"center", margin:"14px 0" }}>
    <div style={{ height:"1px", flex:1, background:`${C.navy}20` }} />
    <svg width="10" height="10" viewBox="0 0 24 24" fill={C.navy} opacity="0.35">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
    <div style={{ height:"1px", flex:1, background:`${C.navy}20` }} />
  </div>
);

const LoadingDots = () => (
  <div style={{ display:"flex", gap:"6px", alignItems:"center", padding:"4px 2px" }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ width:"7px", height:"7px", borderRadius:"50%",
        background:C.navy, opacity:0.3,
        animation:"dotpulse 1.4s ease-in-out infinite",
        animationDelay:`${i*0.18}s` }} />
    ))}
  </div>
);

const formatMessage = (text, isUser) =>
  text.split("\n").map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height:"6px" }} />;
    const html = line.replace(
      /\*\*(.*?)\*\*/g,
      `<strong style="color:${isUser ? C.white : C.navy};font-weight:600">$1</strong>`
    );
    return (
      <p key={i} style={{ margin:"0 0 6px 0", lineHeight:"1.75",
        fontSize:"14px", color: isUser ? "rgba(255,255,255,0.94)" : C.ink,
        fontWeight:"400" }}
        dangerouslySetInnerHTML={{ __html: html }} />
    );
  });

// Splits last action sentence into a warm accent card
const renderAgentBubble = (text) => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const actionRe = /^(Do |Run |Find |Talk |Charge |Ask |Test |Try |Before |Send |Pick |Decide |Build |Ship |Read |Call |Write |Schedule )/;
  const last = sentences[sentences.length - 1]?.trim();
  const isAction = last && last.length < 150 && actionRe.test(last);
  const main = isAction ? sentences.slice(0, -1).join(" ") : text;
  const action = isAction ? last : null;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px", maxWidth:"82%" }}>
      <div style={{ padding:"14px 18px", background:C.white,
        border:`1px solid ${C.border}`,
        borderRadius:"4px 18px 18px 18px",
        boxShadow:"0 2px 12px rgba(13,17,41,0.06)" }}>
        {formatMessage(main, false)}
      </div>
      {action && (
        <div style={{ padding:"11px 15px",
          background:C.warmAccent,
          border:`1px solid ${C.warmBorder}`,
          borderLeft:`3px solid ${C.navy}`,
          borderRadius:"0 8px 8px 0" }}>
          <div style={{ fontSize:"9px", fontWeight:"700", color:C.navy,
            letterSpacing:"0.1em", textTransform:"uppercase",
            marginBottom:"4px", opacity:0.7 }}>
            Your next step
          </div>
          <p style={{ fontSize:"13px", color:C.ink, lineHeight:"1.65", margin:0 }}>
            {action}
          </p>
        </div>
      )}
    </div>
  );
};

export default function StartupStrategyPartner() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [started, setStarted]   = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [attachment, setAttachment] = useState(null); // { name, mediaType, kind, base64 }
  const [attachError, setAttachError] = useState(null);
  const messagesEndRef           = useRef(null);
  const inputRef                 = useRef(null);
  const fileInputRef             = useRef(null);
  const { user }                 = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  // Resume a previous conversation on login, if one exists
  useEffect(() => {
    if (!user || historyLoaded) return;
    (async () => {
      const history = await getMessages(user.id);
      if (history.length > 0) {
        setMessages(history.map(m => ({ role: m.role, content: m.content })));
        setStarted(true);
      }
      setHistoryLoaded(true);
    })();
  }, [user, historyLoaded]);

  const startSession = () => {
    setStarted(true);
    setMessages([{ role:"assistant", content:
      "Welcome — I'm your strategy partner, built on the methodology of The Founder's Field Manual.\n\nNo scripts. No generic advice. Just sharp thinking, specific to your situation.\n\n**What's going on? Tell me what you're building — or trying to figure out.**"
    }]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // How many recent messages get sent to the model as context. Full history
  // still lives in Supabase and in the UI — this only bounds what we pay to
  // resend to the API on every turn, so token cost doesn't grow forever as
  // a user's total conversation history grows across logins.
  const MAX_HISTORY_MESSAGES = 24;

  // File attachments — kept deliberately small since images/PDFs cost far
  // more tokens than text. Supported Claude content-block types only.
  const MAX_ATTACHMENT_MB = 5;
  const ALLOWED_TYPES = {
    "image/png":"image", "image/jpeg":"image", "image/gif":"image", "image/webp":"image",
    "application/pdf":"document",
    "text/plain":"document", "text/csv":"document", "text/markdown":"document",
  };
  const EXT_FALLBACK = { ".txt":"text/plain", ".csv":"text/csv", ".md":"text/markdown" };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    setAttachError(null);

    let mediaType = file.type;
    if (!ALLOWED_TYPES[mediaType]) {
      const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
      if (EXT_FALLBACK[ext]) mediaType = EXT_FALLBACK[ext];
    }
    const kind = ALLOWED_TYPES[mediaType];
    if (!kind) {
      setAttachError("That file type isn't supported. Use an image, PDF, or plain text file.");
      return;
    }
    if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
      setAttachError(`Files must be under ${MAX_ATTACHMENT_MB}MB to keep response costs down.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1] || "";
      setAttachment({ name:file.name, mediaType, kind, base64 });
    };
    reader.onerror = () => setAttachError("Couldn't read that file. Please try again.");
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => { setAttachment(null); setAttachError(null); };

  const sendMessage = async () => {
    if ((!input.trim() && !attachment) || loading) return;

    const text = input.trim();
    // What we store/display/resend as history — plain text only, so an
    // attachment never gets re-uploaded to the model on later turns.
    const displayText = attachment
      ? `${text}${text ? "\n\n" : ""}📎 ${attachment.name}`
      : text;
    const userMsg     = { role:"user", content:displayText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    // The rich content block — sent to the API for THIS turn only.
    const richContent = attachment
      ? [
          { type:"text", text: text || `Please review this file: ${attachment.name}` },
          attachment.kind === "image"
            ? { type:"image", source:{ type:"base64", media_type:attachment.mediaType, data:attachment.base64 } }
            : { type:"document", source:{ type:"base64", media_type:attachment.mediaType, data:attachment.base64 } }
        ]
      : displayText;

    const apiMessages = newMessages.slice(-MAX_HISTORY_MESSAGES).map(m => ({ role:m.role, content:m.content }));
    if (attachment) apiMessages[apiMessages.length - 1] = { role:"user", content:richContent };

    setInput("");
    setAttachment(null);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          model:"claude-sonnet-5",
          max_tokens:400,
          system:SYSTEM_PROMPT,
          // Automatic prompt caching: reuses the cached system prompt +
          // older turns (10% of input price) instead of paying full price
          // to resend them every message.
          cache_control:{ type:"ephemeral" },
          messages:apiMessages,
        }),
      });
      const data = await res.json();
      const assistantContent = data.content?.[0]?.text || "Something went wrong. Please try again.";
      setMessages(prev => [...prev, {
        role:"assistant",
        content: assistantContent
      }]);
      if (user) {
        saveMessage(user.id, "user", userMsg.content);
        saveMessage(user.id, "assistant", assistantContent);
      }
    } catch {
      setMessages(prev => [...prev, {
        role:"assistant",
        content:"Something went wrong. Please try again."
      }]);
    }
    setLoading(false);
  };

  const handleKey = e => {
    if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes dotpulse { 0%,100%{opacity:.12;transform:scale(.7)} 50%{opacity:.5;transform:scale(1)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .msg { animation: fadeUp .3s cubic-bezier(.22,.68,0,1.2) forwards; }
        textarea:focus { outline:none; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:4px; }
        * { box-sizing:border-box; }
      `}</style>

      <div style={{ minHeight:"100vh", background:C.pageBg,
        fontFamily:"'Inter',sans-serif", display:"flex",
        flexDirection:"column", color:C.ink }}>

        {/* ── Header — wordmark only ── */}
        <header style={{ borderBottom:`1px solid ${C.border}`,
          padding:"13px 28px", display:"flex", alignItems:"center",
          gap:"14px", background:C.white,
          boxShadow:"0 1px 8px rgba(13,17,41,0.06)" }}>

          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"14px",
              fontWeight:"700", color:C.midnight, letterSpacing:"0.05em",
              textTransform:"uppercase", lineHeight:"1" }}>
              The Founder's
            </div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"14px",
              fontWeight:"700", color:C.navy, letterSpacing:"0.05em",
              textTransform:"uppercase", lineHeight:"1.15" }}>
              Field Manual
            </div>
          </div>

          <div style={{ width:"1px", height:"28px", background:C.border }} />

          <div style={{ fontSize:"10px", color:C.mutedLight,
            letterSpacing:"0.06em", textTransform:"uppercase", fontWeight:"500" }}>
            Strategy Partner
          </div>

          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center",
            gap:"6px", fontSize:"10px", color:C.muted,
            letterSpacing:"0.05em", textTransform:"uppercase", fontWeight:"500" }}>
            <div style={{ width:"6px", height:"6px", borderRadius:"50%",
              background:C.success,
              boxShadow:`0 0 6px ${C.success}60` }} />
            Live
          </div>
        </header>

        {/* ── Content ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column",
          maxWidth:"720px", width:"100%", margin:"0 auto", padding:"0 24px" }}>

          {!started ? (
            /* ── Landing ── */
            <div style={{ flex:1, display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center",
              textAlign:"center", padding:"52px 16px 44px" }}>

              {/* Eyebrow */}
              <div style={{ fontSize:"10px", fontWeight:"600", color:C.navy,
                letterSpacing:"0.18em", textTransform:"uppercase",
                marginBottom:"18px", opacity:0.6 }}>
                The Founder's Field Manual
              </div>

              {/* Headline */}
              <div style={{ fontFamily:"'Oswald',sans-serif",
                fontSize:"clamp(48px,8.5vw,78px)", fontWeight:"700",
                color:C.midnight, textTransform:"uppercase",
                lineHeight:"0.92", letterSpacing:"0.01em",
                marginBottom:"4px" }}>
                Build Smarter.
              </div>
              <div style={{ fontFamily:"'Oswald',sans-serif",
                fontSize:"clamp(48px,8.5vw,78px)", fontWeight:"700",
                color:C.navy, textTransform:"uppercase",
                lineHeight:"0.92", letterSpacing:"0.01em",
                marginBottom:"22px" }}>
                Move Faster.
              </div>

              <StarDivider />

              {/* Value prop */}
              <p style={{ fontSize:"15px", color:C.ink, lineHeight:"1.8",
                maxWidth:"420px", marginBottom:"6px",
                fontWeight:"400", letterSpacing:"-0.01em" }}>
                A strategy partner that thinks alongside you — challenging your
                assumptions, pressure-testing your ideas, and giving you
                something concrete to act on.
              </p>
              <p style={{ fontSize:"13px", color:C.muted, lineHeight:"1.65",
                maxWidth:"340px", marginBottom:"32px" }}>
                From first idea to exit. No scripts. No generic advice. Ever.
              </p>

              {/* Stage pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px",
                justifyContent:"center", maxWidth:"460px",
                marginBottom:"36px" }}>
                {["Idea stage","Pre-launch","Early traction","Scaling"].map(t => (
                  <div key={t} style={{ background:C.navyTint,
                    border:`1px solid ${C.navyBorder}`,
                    borderRadius:"20px", padding:"6px 16px",
                    fontSize:"11px", color:C.navy,
                    letterSpacing:"0.05em", textTransform:"uppercase",
                    fontWeight:"600" }}>{t}</div>
                ))}
              </div>

              {/* CTA — navy, full saturation, the one place it lives */}
              <button onClick={startSession} style={{
                background:C.navy, color:C.white, border:"none",
                padding:"15px 52px", fontSize:"13px",
                fontFamily:"'Oswald',sans-serif", fontWeight:"600",
                cursor:"pointer", letterSpacing:"0.12em",
                textTransform:"uppercase", borderRadius:"8px",
                marginBottom:"36px",
                boxShadow:`0 4px 20px ${C.navy}35`,
                transition:"all .2s" }}
                onMouseOver={e => {
                  e.currentTarget.style.background = C.navyDark;
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 6px 24px ${C.navy}45`;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = C.navy;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 20px ${C.navy}35`;
                }}>
                Start the conversation
              </button>

              {/* Matthias — quiet credibility */}
              <div style={{ paddingTop:"20px",
                borderTop:`1px solid ${C.border}`,
                width:"100%", maxWidth:"340px" }}>
                <p style={{ fontSize:"11px", color:C.mutedLight,
                  lineHeight:"1.8", letterSpacing:"0.01em" }}>
                  Built on lessons from real companies, real failures, real exits.<br/>
                  <span style={{ color:C.muted, fontWeight:"500" }}>
                    Matthias de Haan — Founder · Operator · Builder
                  </span>
                </p>
              </div>
            </div>

          ) : (
            /* ── Chat ── */
            <>
              <div style={{ flex:1, overflowY:"auto",
                padding:"28px 0 16px", display:"flex",
                flexDirection:"column", gap:"20px" }}>

                {messages.map((msg, i) => (
                  <div key={i} className="msg" style={{ display:"flex", gap:"10px",
                    flexDirection:msg.role==="user"?"row-reverse":"row",
                    alignItems:"flex-start" }}>

                    {/* Avatar — FFM wordmark */}
                    {msg.role==="assistant" && (
                      <div style={{ width:"30px", height:"30px",
                        background:C.navy, borderRadius:"8px",
                        display:"flex", alignItems:"center",
                        justifyContent:"center", flexShrink:0,
                        marginTop:"2px",
                        boxShadow:`0 2px 8px ${C.navy}30` }}>
                        <span style={{ fontFamily:"'Oswald',sans-serif",
                          fontSize:"8px", fontWeight:"700",
                          color:"rgba(255,255,255,0.9)",
                          letterSpacing:"0.06em" }}>FFM</span>
                      </div>
                    )}

                    {/* Bubbles */}
                    {msg.role==="user" ? (
                      <div style={{ maxWidth:"80%", padding:"12px 16px",
                        background:C.navy,
                        border:`1px solid ${C.navyDark}`,
                        borderRadius:"18px 18px 4px 18px" }}>
                        {formatMessage(msg.content, true)}
                      </div>
                    ) : (
                      renderAgentBubble(msg.content)
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="msg" style={{ display:"flex", gap:"10px",
                    alignItems:"flex-start" }}>
                    <div style={{ width:"30px", height:"30px",
                      background:C.navy, borderRadius:"8px",
                      display:"flex", alignItems:"center",
                      justifyContent:"center", flexShrink:0,
                      marginTop:"2px",
                      boxShadow:`0 2px 8px ${C.navy}30` }}>
                      <span style={{ fontFamily:"'Oswald',sans-serif",
                        fontSize:"8px", fontWeight:"700",
                        color:"rgba(255,255,255,0.9)",
                        letterSpacing:"0.06em" }}>FFM</span>
                    </div>
                    <div style={{ padding:"14px 18px", background:C.white,
                      border:`1px solid ${C.border}`,
                      borderRadius:"4px 18px 18px 18px",
                      boxShadow:"0 2px 12px rgba(13,17,41,0.06)" }}>
                      <LoadingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Input ── */}
              <div style={{ borderTop:`1px solid ${C.border}`,
                padding:"14px 0 22px", display:"flex",
                flexDirection:"column" }}>

                {attachment && (
                  <div style={{ display:"inline-flex", alignItems:"center",
                    gap:"8px", background:C.navyTint,
                    border:`1px solid ${C.navyBorder}`,
                    borderRadius:"8px", padding:"6px 10px",
                    marginBottom:"8px", fontSize:"12px", color:C.navy,
                    alignSelf:"flex-start", maxWidth:"100%" }}>
                    <span style={{ overflow:"hidden", textOverflow:"ellipsis",
                      whiteSpace:"nowrap" }}>📎 {attachment.name}</span>
                    <button onClick={removeAttachment} title="Remove attachment"
                      style={{ background:"none", border:"none", cursor:"pointer",
                        color:C.navy, fontSize:"14px", fontWeight:"700",
                        lineHeight:1, padding:0 }}>×</button>
                  </div>
                )}
                {attachError && (
                  <p style={{ fontSize:"11px", color:"#B91C1C", marginBottom:"8px" }}>
                    {attachError}
                  </p>
                )}

                <div style={{ display:"flex", gap:"10px", alignItems:"flex-end" }}>
                  <input type="file" ref={fileInputRef}
                    accept="image/png,image/jpeg,image/gif,image/webp,application/pdf,text/plain,text/csv,text/markdown,.md"
                    onChange={handleFileSelect}
                    style={{ display:"none" }} />
                  <button onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    title={`Attach an image, PDF, or text file (max ${MAX_ATTACHMENT_MB}MB)`}
                    style={{ width:"48px", height:"48px",
                      background:C.white, border:`1.5px solid ${C.border}`,
                      borderRadius:"12px",
                      cursor:loading?"default":"pointer",
                      display:"flex", alignItems:"center",
                      justifyContent:"center", flexShrink:0,
                      transition:"all .2s" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21.44 11.05l-9.19 9.19a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48"
                        stroke={C.muted} strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <textarea ref={inputRef} value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="What's the decision in front of you?"
                    rows={1}
                    style={{ flex:1, background:C.white,
                      border:`1.5px solid ${C.border}`,
                      borderRadius:"12px", padding:"12px 16px",
                      fontSize:"14px", fontFamily:"'Inter',sans-serif",
                      fontWeight:"400", color:C.ink, resize:"none",
                      minHeight:"48px", maxHeight:"120px",
                      overflowY:"auto", lineHeight:"1.6",
                      caretColor:C.navy,
                      transition:"border-color .2s, box-shadow .2s",
                      boxShadow:"0 1px 4px rgba(13,17,41,0.05)" }}
                    onFocus={e => {
                      e.target.style.borderColor = C.navy;
                      e.target.style.boxShadow = `0 0 0 3px ${C.navy}12`;
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = C.border;
                      e.target.style.boxShadow = "0 1px 4px rgba(13,17,41,0.05)";
                    }}
                  />
                  <button onClick={sendMessage}
                    disabled={(!input.trim()&&!attachment)||loading}
                    style={{ width:"48px", height:"48px",
                      background:(input.trim()||attachment)&&!loading ? C.navy : C.navyTint,
                      border:`1.5px solid ${(input.trim()||attachment)&&!loading ? C.navy : C.navyBorder}`,
                      borderRadius:"12px",
                      cursor:(input.trim()||attachment)&&!loading?"pointer":"default",
                      display:"flex", alignItems:"center",
                      justifyContent:"center", flexShrink:0,
                      transition:"all .2s",
                      boxShadow:(input.trim()||attachment)&&!loading
                        ? `0 4px 14px ${C.navy}35` : "none" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                        stroke={(input.trim()||attachment)&&!loading ? C.white : C.mutedLight}
                        strokeWidth="2.2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
