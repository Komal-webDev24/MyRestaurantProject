import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Sora', sans-serif;
    background: #0a0a0f;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    position: relative;
    overflow: hidden;
  }

  .bg-glow {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .bg-glow-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.12); top: -100px; left: -100px; }
  .bg-glow-2 { width: 400px; height: 400px; background: rgba(236,72,153,0.08); bottom: -80px; right: -80px; }
  .bg-glow-3 { width: 300px; height: 300px; background: rgba(20,184,166,0.06); top: 50%; left: 50%; transform: translate(-50%,-50%); }

  .card {
    position: relative;
    z-index: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 48px 44px;
    width: 100%;
    max-width: 440px;
    backdrop-filter: blur(20px);
    box-shadow: 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
    animation: cardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    color: white;
    letter-spacing: -1px;
    font-family: 'JetBrains Mono', monospace;
    flex-shrink: 0;
  }

  .logo-name {
    font-size: 17px;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    letter-spacing: -0.3px;
  }

  .page-title {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.6px;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .page-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .form-group {
    margin-bottom: 18px;
  }

  .form-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
  }

  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 13px 16px;
    font-size: 15px;
    color: #fff;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .form-input::placeholder { color: rgba(255,255,255,0.2); }

  .form-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.06);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }

  .input-wrap { position: relative; }

  .eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.3);
    font-size: 16px;
    padding: 4px;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: rgba(255,255,255,0.7); }

  .btn-primary {
    width: 100%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-top: 8px;
    letter-spacing: -0.1px;
    box-shadow: 0 8px 24px rgba(99,102,241,0.3);
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 12px 28px rgba(99,102,241,0.35); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
    color: rgba(255,255,255,0.15);
    font-size: 12px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  .footer-text {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-top: 24px;
  }

  .link-btn {
    background: none;
    border: none;
    color: #818cf8;
    cursor: pointer;
    font-size: 13px;
    font-family: 'Sora', sans-serif;
    font-weight: 500;
    transition: color 0.2s;
    text-decoration: none;
  }
  .link-btn:hover { color: #a5b4fc; text-decoration: underline; }

  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -8px;
    margin-bottom: 16px;
  }

  .social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px;
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .social-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }

  .social-row { display: flex; gap: 10px; }

  /* OTP Input */
  .otp-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 8px 0 24px;
  }

  .otp-input {
    width: 52px;
    height: 60px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #fff;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    caret-color: #818cf8;
  }
  .otp-input:focus {
    border-color: #6366f1;
    background: rgba(99,102,241,0.08);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
  .otp-input.filled {
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.06);
    color: #a5b4fc;
  }

  .otp-hint {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  .resend-row {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-top: 16px;
  }

  .timer-chip {
    display: inline-block;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    color: #818cf8;
    margin-left: 6px;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 13px;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    padding: 0;
    margin-bottom: 28px;
    transition: color 0.2s;
  }
  .back-btn:hover { color: rgba(255,255,255,0.8); }

  .success-icon {
    width: 56px;
    height: 56px;
    background: rgba(20,184,166,0.12);
    border: 1.5px solid rgba(20,184,166,0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin: 0 auto 20px;
  }

  .steps-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 32px;
  }
  .step-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    transition: all 0.3s;
  }
  .step-dot.active {
    width: 20px;
    border-radius: 3px;
    background: #6366f1;
  }

  .terms-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }
  .terms-cb {
    width: 16px;
    height: 16px;
    accent-color: #6366f1;
    margin-top: 1px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .terms-text {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    line-height: 1.5;
  }

  .strength-bar-wrap {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }
  .strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(255,255,255,0.08);
    transition: background 0.3s;
  }

  @media (max-width: 480px) {
    .card { padding: 36px 24px; margin: 16px; border-radius: 20px; }
    .otp-input { width: 44px; height: 54px; font-size: 20px; }
  }
`;

/* ─────────────── Helpers ─────────────── */
function getStrength(p) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const strengthColor = ["#ef4444","#f97316","#eab308","#22c55e"];
const strengthLabel = ["Weak","Fair","Good","Strong"];

/* ─────────────── Components ─────────────── */
function Logo() {
  return (
    <div className="logo-area">
      <div className="logo-icon">Nx</div>
      <span className="logo-name">Nexora</span>
    </div>
  );
}

function StepDots({ current, total }) {
  return (
    <div className="steps-row">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`step-dot ${i === current ? "active" : ""}`} />
      ))}
    </div>
  );
}

/* ─────────────── Sign Up Page ─────────────── */
function SignUpPage({ navigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const strength = getStrength(pass);

  const handleSubmit = () => {
    if (!name || !email || !pass || !agree) return;
    navigate("otp");
  };

  return (
    <div className="card">
      <Logo />
      <StepDots current={0} total={3} />
      <h1 className="page-title">Create account</h1>
      <p className="page-sub">Join thousands of users already on Nexora.</p>

      <div className="social-row" style={{ marginBottom: 20 }}>
        <button className="social-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
        </button>
        <button className="social-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          GitHub
        </button>
      </div>

      <div className="divider">or sign up with email</div>

      <div className="form-group">
        <label className="form-label">Full name</label>
        <input className="form-input" placeholder="Alex Johnson" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Email address</label>
        <input className="form-input" type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="input-wrap">
          <input className="form-input" type={show ? "text" : "password"} placeholder="Min. 8 characters" value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 44 }} />
          <button className="eye-btn" onClick={() => setShow(!show)} type="button">{show ? "🙈" : "👁"}</button>
        </div>
        {pass && (
          <>
            <div className="strength-bar-wrap">
              {[0,1,2,3].map(i => (
                <div key={i} className="strength-seg" style={{ background: i < strength ? strengthColor[strength-1] : undefined }} />
              ))}
            </div>
            <p style={{ fontSize: 11, color: strengthColor[strength-1], marginTop: 4 }}>{strengthLabel[strength-1]}</p>
          </>
        )}
      </div>

      <div className="terms-row">
        <input type="checkbox" className="terms-cb" id="terms" checked={agree} onChange={e => setAgree(e.target.checked)} />
        <label className="terms-text" htmlFor="terms">
          I agree to the <button className="link-btn" style={{ fontSize: 12 }}>Terms of Service</button> and <button className="link-btn" style={{ fontSize: 12 }}>Privacy Policy</button>
        </label>
      </div>

      <button className="btn-primary" onClick={handleSubmit} disabled={!name || !email || !pass || !agree}>
        Create Account →
      </button>

      <p className="footer-text">
        Already have an account?{" "}
        <button className="link-btn" onClick={() => navigate("login")}>Sign in</button>
      </p>
    </div>
  );
}

/* ─────────────── Login Page ─────────────── */
function LoginPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !pass) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("otp"); }, 1200);
  };

  return (
    <div className="card">
      <Logo />
      <h1 className="page-title">Welcome back</h1>
      <p className="page-sub">Sign in to continue to your workspace.</p>

      <div className="social-row" style={{ marginBottom: 20 }}>
        <button className="social-btn">
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
        </button>
        <button className="social-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          GitHub
        </button>
      </div>

      <div className="divider">or continue with email</div>

      <div className="form-group">
        <label className="form-label">Email address</label>
        <input className="form-input" type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="input-wrap">
          <input className="form-input" type={show ? "text" : "password"} placeholder="Enter your password" value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 44 }} />
          <button className="eye-btn" onClick={() => setShow(!show)} type="button">{show ? "🙈" : "👁"}</button>
        </div>
      </div>

      <div className="forgot-row">
        <button className="link-btn" onClick={() => navigate("forgot")}>Forgot password?</button>
      </div>

      <button className="btn-primary" onClick={handleLogin} disabled={!email || !pass || loading}>
        {loading ? "Signing in..." : "Sign In →"}
      </button>

      <p className="footer-text">
        Don't have an account?{" "}
        <button className="link-btn" onClick={() => navigate("signup")}>Create one</button>
      </p>
    </div>
  );
}

/* ─────────────── Forgot Password Page ─────────────── */
function ForgotPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="card">
      <Logo />
      <button className="back-btn" onClick={() => navigate("login")}>
        ← Back to sign in
      </button>

      {!sent ? (
        <>
          <h1 className="page-title">Reset password</h1>
          <p className="page-sub">Enter your email and we'll send you a 6-digit OTP to reset your password.</p>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <button className="btn-primary" onClick={handleSend} disabled={!email}>
            Send OTP →
          </button>
        </>
      ) : (
        <>
          <div className="success-icon">✉️</div>
          <h1 className="page-title" style={{ textAlign: "center" }}>Check your inbox</h1>
          <p className="page-sub" style={{ textAlign: "center" }}>
            We've sent a 6-digit OTP to<br />
            <span style={{ color: "#a5b4fc", fontWeight: 500 }}>{email}</span>
          </p>
          <button className="btn-primary" onClick={() => navigate("otp")}>
            Enter OTP →
          </button>
          <p className="footer-text" style={{ marginTop: 16 }}>
            Wrong email?{" "}
            <button className="link-btn" onClick={() => setSent(false)}>Change email</button>
          </p>
        </>
      )}
    </div>
  );
}

/* ─────────────── OTP Page ─────────────── */
function OTPPage({ navigate }) {
  const [otp, setOtp] = useState(["","","","","",""]);
  const [timer, setTimer] = useState(30);
  const [verified, setVerified] = useState(false);
  const refs = Array.from({ length: 6 }, () => null);
  const refList = [];

  const storeRef = (i) => (el) => { refList[i] = el; };

  const handleChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) setTimeout(() => refList[i+1]?.focus(), 0);
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      setTimeout(() => refList[i-1]?.focus(), 0);
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);
    if (text.length === 6) {
      setOtp(text.split(""));
      setTimeout(() => refList[5]?.focus(), 0);
    }
  };

  const handleVerify = () => {
    if (otp.join("").length < 6) return;
    setVerified(true);
  };

  useState(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer(t => { if (t <= 1) { clearInterval(id); return 0; } return t-1; }), 1000);
    return () => clearInterval(id);
  });

  return (
    <div className="card">
      <Logo />
      <button className="back-btn" onClick={() => navigate("login")}>
        ← Back
      </button>
      <StepDots current={1} total={3} />

      {!verified ? (
        <>
          <h1 className="page-title">Verify your identity</h1>
          <p className="page-sub">Enter the 6-digit code we sent to your email address.</p>

          <p className="otp-hint">Type or paste your OTP below</p>

          <div className="otp-row" onPaste={handlePaste}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={storeRef(i)}
                className={`otp-input ${d ? "filled" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
              />
            ))}
          </div>

          <button className="btn-primary" onClick={handleVerify} disabled={otp.join("").length < 6}>
            Verify OTP →
          </button>

          <div className="resend-row">
            {timer > 0 ? (
              <>Resend code in<span className="timer-chip">0:{String(timer).padStart(2,"0")}</span></>
            ) : (
              <>Didn't receive it? <button className="link-btn" onClick={() => setTimer(30)}>Resend OTP</button></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="success-icon" style={{ marginTop: 8 }}>✅</div>
          <h1 className="page-title" style={{ textAlign: "center" }}>Verified!</h1>
          <p className="page-sub" style={{ textAlign: "center" }}>
            Your identity has been confirmed.<br />You're all set to continue.
          </p>
          <button className="btn-primary" onClick={() => navigate("login")}>
            Go to Dashboard →
          </button>
        </>
      )}
    </div>
  );
}

/* ─────────────── Root App ─────────────── */
export default function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
        <div className="bg-glow bg-glow-3" />
        {page === "signup"  && <SignUpPage  navigate={setPage} />}
        {page === "login"   && <LoginPage   navigate={setPage} />}
        {page === "forgot"  && <ForgotPage  navigate={setPage} />}
        {page === "otp"     && <OTPPage     navigate={setPage} />}
      </div>
    </>
  );
}