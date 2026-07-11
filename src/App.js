import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { saveUser } from './supabase';
import StartupStrategyPartner from './StartupStrategyPartner';

// ── Detect ?plan=early in the URL ───────────────────────────────────
function isEarlyAdopter() {
  return new URLSearchParams(window.location.search).get('plan') === 'early';
}

// ── Landing page shown to logged-out visitors ──────────────────────
function LandingPage({ onLogin, onSignUp }) {
  const early = isEarlyAdopter();
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAFA",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #E5E7EB",
        padding: "13px 28px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "white",
        boxShadow: "0 1px 8px rgba(13,17,41,0.06)"
      }}>
        <div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: "#0D1129",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: "1"
          }}>The Founder's</div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: "#1A2E8F",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: "1.15"
          }}>Field Manual</div>
        </div>
        <div style={{ width: "1px", height: "28px", background: "#E5E7EB" }} />
        <div style={{ fontSize: "10px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Strategy Partner
        </div>
        {/* Login button in header */}
        <button onClick={onLogin} style={{
          marginLeft: "auto",
          background: "transparent",
          border: "1.5px solid #1A2E8F",
          color: "#1A2E8F",
          padding: "8px 20px",
          fontSize: "11px",
          fontFamily: "'Oswald', sans-serif",
          fontWeight: "600",
          cursor: "pointer",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "6px",
          transition: "all .2s"
        }}
          onMouseOver={e => { e.currentTarget.style.background = "#1A2E8F"; e.currentTarget.style.color = "white"; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A2E8F"; }}
        >
          Log In
        </button>
      </header>

      {/* Hero */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "52px 24px 40px"
      }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: "10px",
          fontWeight: "600",
          color: "#1A2E8F",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "18px",
          opacity: 0.7
        }}>
          The Founder's Field Manual
        </div>

        {/* Headline */}
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(48px, 8.5vw, 78px)",
          fontWeight: "700",
          color: "#0D1129",
          textTransform: "uppercase",
          lineHeight: "0.92",
          letterSpacing: "0.01em",
          marginBottom: "4px"
        }}>Build Smarter.</div>
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(48px, 8.5vw, 78px)",
          fontWeight: "700",
          color: "#1A2E8F",
          textTransform: "uppercase",
          lineHeight: "0.92",
          letterSpacing: "0.01em",
          marginBottom: "22px"
        }}>Move Faster.</div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", justifyContent: "center", margin: "12px 0", width: "100%", maxWidth: "480px" }}>
          <div style={{ height: "1px", flex: 1, background: "rgba(26,46,143,0.15)" }} />
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#1A2E8F" opacity="0.4">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <div style={{ height: "1px", flex: 1, background: "rgba(26,46,143,0.15)" }} />
        </div>

        {/* Value prop */}
        <p style={{
          fontSize: "15px",
          color: "#1A1A2E",
          lineHeight: "1.8",
          maxWidth: "420px",
          marginBottom: "6px",
          fontWeight: "400",
          letterSpacing: "-0.01em"
        }}>
          A strategy partner that thinks alongside you — challenging your assumptions,
          pressure-testing your ideas, and giving you something concrete to act on.
        </p>
        <p style={{
          fontSize: "13px",
          color: "#6B7280",
          lineHeight: "1.65",
          maxWidth: "340px",
          marginBottom: "32px"
        }}>
          From first idea to exit. No scripts. No generic advice. Ever.
        </p>

        {/* Stage pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "460px", marginBottom: "36px" }}>
          {["Idea stage", "Pre-launch", "Early traction", "Scaling"].map(t => (
            <div key={t} style={{
              background: "#EEF0F8",
              border: "1px solid #C4CCF0",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "11px",
              color: "#1A2E8F",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: "600"
            }}>{t}</div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "36px" }}>
          {/* Primary — Start Free Trial */}
          <button onClick={onSignUp} style={{
            background: "#1A2E8F",
            color: "white",
            border: "none",
            padding: "15px 40px",
            fontSize: "13px",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(26,46,143,0.35)",
            transition: "all .2s"
          }}
            onMouseOver={e => { e.currentTarget.style.background = "#111E6B"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#1A2E8F"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {early ? "Get Early Access — $1/mo" : "Start Free Trial"}
          </button>

          {/* Secondary — Log In */}
          <button onClick={onLogin} style={{
            background: "transparent",
            color: "#1A2E8F",
            border: "1.5px solid #1A2E8F",
            padding: "15px 40px",
            fontSize: "13px",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: "8px",
            transition: "all .2s"
          }}
            onMouseOver={e => { e.currentTarget.style.background = "#1A2E8F"; e.currentTarget.style.color = "white"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A2E8F"; }}
          >
            Log In
          </button>
        </div>

        {/* Trial note */}
        <p style={{ fontSize: "11px", color: "#9CA3AF" }}>
          {early ? "$1/month · early adopter pricing · cancel anytime" : "7 days free · then $59.99/month · cancel anytime"}
        </p>

        {/* Matthias credit */}
        <div style={{
          paddingTop: "20px",
          borderTop: "1px solid #E5E7EB",
          width: "100%",
          maxWidth: "340px",
          marginTop: "20px"
        }}>
          <p style={{ fontSize: "11px", color: "#9CA3AF", lineHeight: "1.8" }}>
            Built on lessons from real companies, real failures, real exits.<br />
            <span style={{ color: "#6B7280", fontWeight: "500" }}>
              Matthias de Haan — Founder · Operator · Builder
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Subscription gate for signed-in users ──────────────────────────
function SubscriptionGate() {
  const { user } = useUser();
  const [checking, setChecking] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const early = isEarlyAdopter();

  useEffect(() => {
    if (!user) return;

    saveUser(
      user.id,
      user.primaryEmailAddress?.emailAddress,
      user.fullName
    );

    const checkSubscription = async () => {
      try {
        const res = await fetch('/api/check-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress
          }),
        });
        const data = await res.json();
        setHasSubscription(data.hasSubscription);
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    };

    checkSubscription();
  }, [user]);

  const [subscribeError, setSubscribeError] = useState(null);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async () => {
    setSubscribeError(null);
    setSubscribing(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          plan: early ? "early" : undefined,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      console.error('Checkout session error:', data);
      setSubscribeError(data.error || 'Something went wrong starting checkout. Please try again.');
    } catch (err) {
      console.error(err);
      setSubscribeError("Couldn't reach the payment system. Please try again.");
    }
    setSubscribing(false);
  };

  if (checking) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        color: "#6B7280",
        fontSize: "14px"
      }}>
        Checking your subscription...
      </div>
    );
  }

  if (!hasSubscription) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          textAlign: "center",
          maxWidth: "420px",
          padding: "40px 24px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(13,17,41,0.08)"
        }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "13px", fontWeight: "700", color: "#0D1129", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>
            The Founder's
          </div>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "13px", fontWeight: "700", color: "#1A2E8F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "20px" }}>
            Field Manual
          </div>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "28px", fontWeight: "700", color: "#0D1129", textTransform: "uppercase", marginBottom: "8px" }}>
            Start Your Journey
          </div>
          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.7", marginBottom: "8px" }}>
            Get unlimited access to your AI strategy partner — challenging your assumptions and helping you build smarter.
          </p>
          <div style={{ background: "#EEF0F8", borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: "#1A2E8F", fontWeight: "500" }}>
            {early ? "🎉 Early adopter pricing — thanks for testing with us" : "🎉 7-day free trial — no charge until day 8"}
          </div>
          <p style={{ fontSize: "24px", fontWeight: "700", color: "#0D1129", marginBottom: "24px" }}>
            {early
              ? <>$1<span style={{ fontSize: "14px", fontWeight: "400", color: "#6B7280" }}>/month</span></>
              : <>$59.99<span style={{ fontSize: "14px", fontWeight: "400", color: "#6B7280" }}>/month after trial</span></>}
          </p>
          <button onClick={handleSubscribe} disabled={subscribing} style={{
            background: "#1A2E8F", color: "white", border: "none",
            padding: "14px 40px", fontSize: "13px",
            fontFamily: "'Oswald', sans-serif", fontWeight: "600",
            cursor: subscribing ? "default" : "pointer", letterSpacing: "0.12em",
            textTransform: "uppercase", borderRadius: "8px", width: "100%",
            boxShadow: "0 4px 14px rgba(26,46,143,0.3)",
            opacity: subscribing ? 0.7 : 1
          }}>
            {subscribing ? "Loading..." : (early ? "Get Early Access — $1/mo" : "Start Free Trial")}
          </button>
          {subscribeError && (
            <p style={{ fontSize: "12px", color: "#B91C1C", marginTop: "10px" }}>
              {subscribeError}
            </p>
          )}
          <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "12px" }}>
            {early ? "$1/month · cancel anytime" : "7 days free · then $59.99/month · cancel anytime"}
          </p>
        </div>
      </div>
    );
  }

  return <StartupStrategyPartner />;
}

// ── Main App ───────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // landing | login | signup

  return (
    <>
      {/* Signed in — show subscription gate or agent */}
      <SignedIn>
        <SubscriptionGate />
      </SignedIn>

      {/* Signed out — show landing, login, or signup */}
      <SignedOut>
        {view === "landing" && (
          <LandingPage
            onLogin={() => setView("login")}
            onSignUp={() => setView("signup")}
          />
        )}
        {view === "login" && (
          <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
            <SignIn
              appearance={{
                elements: {
                  rootBox: { boxShadow: "0 4px 24px rgba(13,17,41,0.08)", borderRadius: "12px" },
                  card: { borderRadius: "12px" },
                  formButtonPrimary: { background: "#1A2E8F", borderRadius: "8px" }
                }
              }}
            />
            <button onClick={() => setView("landing")} style={{
              background: "transparent", border: "none", color: "#9CA3AF",
              fontSize: "12px", cursor: "pointer", textDecoration: "underline"
            }}>
              ← Back to home
            </button>
          </div>
        )}
        {view === "signup" && (
          <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
            <SignUp
              appearance={{
                elements: {
                  rootBox: { boxShadow: "0 4px 24px rgba(13,17,41,0.08)", borderRadius: "12px" },
                  card: { borderRadius: "12px" },
                  formButtonPrimary: { background: "#1A2E8F", borderRadius: "8px" }
                }
              }}
            />
            <button onClick={() => setView("landing")} style={{
              background: "transparent", border: "none", color: "#9CA3AF",
              fontSize: "12px", cursor: "pointer", textDecoration: "underline"
            }}>
              ← Back to home
            </button>
          </div>
        )}
      </SignedOut>
    </>
  );
}
