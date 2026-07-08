import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import StartupStrategyPartner from './StartupStrategyPartner';

function App() {
  return (
    <>
      <SignedIn>
        <StartupStrategyPartner />
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
                headerTitle: {
                  fontFamily: "'Oswald', sans-serif",
                  color: "#0D1129"
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
