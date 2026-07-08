import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignIn, useUser } from '@clerk/clerk-react';
import { saveUser } from './supabase';
import StartupStrategyPartner from './StartupStrategyPartner';

function SubscriptionGate() {
  const { user } = useUser();
  const [checking, setChecking] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

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
          body: JSON.stringify({ userId: user.id }),
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

  const handleSubscribe = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    }
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
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "13px",
            fontWeight: "700",
            color: "#0D1129",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "2px"
          }}>
            The Founder's
          </div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "13px",
            fontWeight: "700",
            color: "#1A2E8F",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "20px"
          }}>
            Field Manual
          </div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "28px",
            fontWeight: "700",
            color: "#0D1129",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>
            Start Your Journey
          </div>
          <p style={{
            fontSize: "14px",
            color: "#6B7280",
            lineHeight: "1.7",
            marginBottom: "8px"
          }}>
            Get unlimited access to your AI strategy partner — challenging your assumptions and helping you build smarter.
          </p>
          <p style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#0D1129",
            marginBottom: "24px"
          }}>
            $59.99<span style={{ fontSize: "14px", fontWeight: "400", color: "#6B7280" }}>/month</span>
          </p>
          <button
            onClick={handleSubscribe}
            style={{
              background: "#1A2E8F",
              color: "white",
              border: "none",
              padding: "14px 40px",
              fontSize: "13px",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: "8px",
              width: "100%",
              boxShadow: "0 4px 14px rgba(26,46,143,0.3)",
            }}
          >
            Subscribe Now
          </button>
          <p style={{
            fontSize: "11px",
            color: "#9CA3AF",
            marginTop: "12px"
          }}>
            Cancel anytime. Billed monthly.
          </p>
        </div>
      </div>
    );
  }

  return <StartupStrategyPartner />;
}

function App() {
  return (
    <>
      <SignedIn>
        <SubscriptionGate />
      </SignedIn>
      <SignedOut>
        <div style={{
          minHeight: "100vh",
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <SignIn
            appearance={{
              elements: {
                rootBox: {
                  boxShadow: "0 4px 24px rgba(13,17,41,0.08)",
                  borderRadius: "12px"
                },
                card: {
                  borderRadius: "12px"
                },
                formButtonPrimary: {
                  background: "#1A2E8F",
                  borderRadius: "8px"
                }
              }
            }}
          />
        </div>
      </SignedOut>
    </>
  );
}

export default App;
