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

const LoadingDots = () => (
  <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8a97e", animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
    ))}
  </div>
);

const formatMessage = (text) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: "6px" }} />;
    const html = line
      .replace(/\*\*(.*?)\*\*/g, "<strong style='color:#e8ddd0;font-weight:500'>$1</strong>");
    return (
      <p key={i} style={{ margin: "0 0 6px 0", lineHeight: "1.7", fontSize: "13.5px" }}
        dangerouslySetInnerHTML={{ __html: html }} />
    );
  });
};

export default function StartupStrategyPartner() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

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
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .msg { animation: fadeUp .3s ease forwards; }
        textarea:focus { outline:none; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#2a2018; border-radius:2px; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#0d0b08", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", color:"#e8ddd0" }}>

        {/* Header */}
        <div style={{ borderBottom:"1px solid #1a1610", padding:"14px 24px", display:"flex", alignItems:"center", gap:"12px", background:"#0d0b08" }}>
          <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"linear-gradient(135deg,#c8a97e,#8b6d42)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontFamily:"'Cormorant Garamond',serif", fontWeight:"600", color:"#0d0b08", flexShrink:0 }}>SP</div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", fontWeight:"600", letterSpacing:"0.02em" }}>Startup Strategy Partner</div>
            <div style={{ fontSize:"10px", color:"#6b5d4e", fontWeight:"300", letterSpacing:"0.04em" }}>Based on "A Startup Guide: From Idea to Empire" · Matthias de Haan</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"5px", fontSize:"10px", color:"#4a7c59" }}>
            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#4a7c59" }} />Live
          </div>
        </div>

        <div style={{ flex:1, display:"flex", flexDirection:"column", maxWidth:"680px", width:"100%", margin:"0 auto", padding:"0 16px" }}>

          {!started ? (
            /* Landing */
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"40px 16px", gap:"28px" }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"38px", fontWeight:"500", lineHeight:"1.1", marginBottom:"12px", letterSpacing:"-0.01em" }}>
                  Your startup advisor.<br />
                  <span style={{ color:"#c8a97e", fontStyle:"italic" }}>Always on.</span>
                </div>
                <p style={{ fontSize:"13px", color:"#6b5d4e", maxWidth:"380px", lineHeight:"1.75", fontWeight:"300", margin:"0 auto" }}>
                  A thought partner for founders at every stage. Honest perspective, no generic advice, moves fast.
                </p>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", width:"100%", maxWidth:"420px" }}>
                {["Idea validation","Pricing","Fundraising","Team & hiring","Go-to-market","Scaling"].map((t) => (
                  <div key={t} style={{ background:"#111009", border:"1px solid #1a1610", borderRadius:"7px", padding:"9px 10px", fontSize:"11px", color:"#5a4d3e" }}>{t}</div>
                ))}
              </div>

              <button onClick={startSession} style={{ background:"#c8a97e", color:"#0d0b08", border:"none", borderRadius:"8px", padding:"13px 34px", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500", cursor:"pointer", letterSpacing:"0.02em" }}
                onMouseOver={(e) => e.target.style.background="#d4b98e"}
                onMouseOut={(e) => e.target.style.background="#c8a97e"}>
                Begin session
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div style={{ flex:1, overflowY:"auto", padding:"20px 0 12px", display:"flex", flexDirection:"column", gap:"16px" }}>
                {messages.map((msg, i) => (
                  <div key={i} className="msg" style={{ display:"flex", gap:"10px", flexDirection:msg.role==="user"?"row-reverse":"row", alignItems:"flex-start" }}>
                    {msg.role === "assistant" && (
                      <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:"linear-gradient(135deg,#c8a97e,#8b6d42)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontFamily:"'Cormorant Garamond',serif", fontWeight:"600", color:"#0d0b08", flexShrink:0, marginTop:"2px" }}>SP</div>
                    )}
                    <div style={{ maxWidth:"84%", padding:msg.role==="user"?"10px 14px":"12px 16px", borderRadius:msg.role==="user"?"14px 14px 3px 14px":"3px 14px 14px 14px", background:msg.role==="user"?"#181410":"#111009", border:`1px solid ${msg.role==="user"?"#251e14":"#1a1610"}`, color:msg.role==="user"?"#b8b0a4":"#cec4b6", fontWeight:"300" }}>
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="msg" style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                    <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:"linear-gradient(135deg,#c8a97e,#8b6d42)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontFamily:"'Cormorant Garamond',serif", fontWeight:"600", color:"#0d0b08", flexShrink:0, marginTop:"2px" }}>SP</div>
                    <div style={{ padding:"12px 16px", borderRadius:"3px 14px 14px 14px", background:"#111009", border:"1px solid #1a1610" }}>
                      <LoadingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{ borderTop:"1px solid #1a1610", padding:"14px 0 18px", display:"flex", gap:"8px", alignItems:"flex-end" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Share what's on your mind..."
                  rows={1}
                  style={{ flex:1, background:"#111009", border:"1px solid #1a1610", borderRadius:"10px", padding:"10px 14px", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"300", color:"#e8ddd0", resize:"none", minHeight:"42px", maxHeight:"120px", overflowY:"auto", lineHeight:"1.5", caretColor:"#c8a97e" }}
                />
                <button onClick={sendMessage} disabled={!input.trim() || loading}
                  style={{ width:"42px", height:"42px", borderRadius:"9px", background:input.trim()&&!loading?"#c8a97e":"#181410", border:`1px solid ${input.trim()&&!loading?"#c8a97e":"#1a1610"}`, cursor:input.trim()&&!loading?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={input.trim()&&!loading?"#0d0b08":"#3a2f20"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
