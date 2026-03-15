import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

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

  .error-msg {
    font-size: 12px;
    color: #ef4444;
    margin-top: 10px;
    text-align: center;
  }

  .success-msg {
    font-size: 12px;
    color: #22c55e;
    margin-top: 10px;
    text-align: center;
  }

  @media (max-width: 480px) {
    .card { padding: 36px 24px; margin: 16px; border-radius: 20px; }
    .otp-input { width: 44px; height: 54px; font-size: 20px; }
  }
`;

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
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [show, setShow]       = useState(false);
  const [agree, setAgree]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const strength = getStrength(pass);

  const handleSubmit = async () => {
    if (!name || !email || !pass || !agree) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/signup`, { name, email, password: pass });
      localStorage.setItem("pendingEmail", email);
      await axios.post(`${API}/send-otp`, { email });
      navigate("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <Logo />
      <StepDots current={0} total={3} />
      <h1 className="page-title">Create account</h1>
      <p className="page-sub">Join thousands of users already on Nexora.</p>

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

      {error && <p className="error-msg">{error}</p>}

      <button className="btn-primary" onClick={handleSubmit} disabled={!name || !email || !pass || !agree || loading}>
        {loading ? "Creating account..." : "Create Account →"}
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
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // ✅ Login ke baad seedha dashboard — OTP nahi
  const handleLogin = async () => {
    if (!email || !pass) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/login`, { email, password: pass });
      localStorage.setItem("token", res.data.token);
      window.location.href = "http://localhost:3000/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <Logo />
      <h1 className="page-title">Welcome back</h1>
      <p className="page-sub">Sign in to continue to your workspace.</p>

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

      {error && <p className="error-msg">{error}</p>}

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
  const [step, setStep]             = useState("email");
  const [email, setEmail]           = useState("");
  const [otp, setOtp]               = useState(["","","","","",""]);
  const [newPass, setNewPass]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [timer, setTimer]           = useState(30);
  const refList = [];
  const storeRef = (i) => (el) => { refList[i] = el; };

  const handleSendOtp = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/send-otp`, { email });
      localStorage.setItem("pendingEmail", email);
      setStep("otp");
      setTimer(30);
    } catch (err) {
      setError(err.response?.data?.message || "Email not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/verify-otp`, { email, otp: otp.join("") });
      setStep("newpass");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPass || newPass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    if (newPass.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/reset-password`, { email, password: newPass });
      localStorage.removeItem("pendingEmail");
      navigate("login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) setTimeout(() => refList[i+1]?.focus(), 0);
  };
  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      setTimeout(() => refList[i-1]?.focus(), 0);
  };
  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);
    if (text.length === 6) {
      setOtp(text.split(""));
      setTimeout(() => refList[5]?.focus(), 0);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${API}/send-otp`, { email });
      setTimer(30);
      setError("");
    } catch {
      setError("Could not resend OTP.");
    }
  };

  useState(() => {
    if (step !== "otp" || timer <= 0) return;
    const id = setInterval(() => setTimer(t => {
      if (t <= 1) { clearInterval(id); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(id);
  });

  return (
    <div className="card">
      <Logo />
      <button className="back-btn" onClick={() =>
        step === "email" ? navigate("login") :
        step === "otp" ? setStep("email") :
        setStep("otp")
      }>
        ← Back
      </button>

      {/* Step 1: Email */}
      {step === "email" && (
        <>
          <StepDots current={0} total={3} />
          <h1 className="page-title">Reset password</h1>
          <p className="page-sub">Enter your registered email to receive an OTP.</p>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-primary" onClick={handleSendOtp} disabled={!email || loading}>
            {loading ? "Sending..." : "Send OTP →"}
          </button>

          <p className="footer-text" style={{ marginTop: 16 }}>
            Remember password? <button className="link-btn" onClick={() => navigate("login")}>Sign in</button>
          </p>
        </>
      )}

      {/* Step 2: OTP */}
      {step === "otp" && (
        <>
          <StepDots current={1} total={3} />
          <h1 className="page-title">Enter OTP</h1>
          <p className="page-sub">
            We sent a 6-digit code to<br />
            <span style={{ color: "#a5b4fc", fontWeight: 500 }}>{email}</span>
          </p>

          <p className="otp-hint">Type or paste your OTP below</p>

          <div className="otp-row" onPaste={handleOtpPaste}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={storeRef(i)}
                className={`otp-input ${d ? "filled" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => handleOtpKey(i, e)}
              />
            ))}
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-primary" onClick={handleVerifyOtp} disabled={otp.join("").length < 6 || loading}>
            {loading ? "Verifying..." : "Verify OTP →"}
          </button>

          <div className="resend-row">
            {timer > 0 ? (
              <>Resend code in<span className="timer-chip">0:{String(timer).padStart(2,"0")}</span></>
            ) : (
              <>Didn't receive it? <button className="link-btn" onClick={handleResend}>Resend OTP</button></>
            )}
          </div>
        </>
      )}

      {/* Step 3: New Password */}
      {step === "newpass" && (
        <>
          <StepDots current={2} total={3} />
          <h1 className="page-title">New password</h1>
          <p className="page-sub">Choose a strong new password for your account.</p>

          <div className="form-group">
            <label className="form-label">New password</label>
            <div className="input-wrap">
              <input
                className="form-input"
                type={showNew ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                style={{ paddingRight: 44 }}
              />
              <button className="eye-btn" onClick={() => setShowNew(!showNew)} type="button">{showNew ? "🙈" : "👁"}</button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm password</label>
            <div className="input-wrap">
              <input
                className="form-input"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                style={{ paddingRight: 44 }}
              />
              <button className="eye-btn" onClick={() => setShowConfirm(!showConfirm)} type="button">{showConfirm ? "🙈" : "👁"}</button>
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-primary" onClick={handleResetPassword} disabled={!newPass || !confirmPass || loading}>
            {loading ? "Saving..." : "Reset Password →"}
          </button>
        </>
      )}
    </div>
  );
}

/* ─────────────── OTP Page (Signup ke baad) ─────────────── */
function OTPPage({ navigate }) {
  const [otp, setOtp]           = useState(["","","","","",""]);
  const [timer, setTimer]       = useState(30);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
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
    if (e.key === "Backspace" && !otp[i] && i > 0)
      setTimeout(() => refList[i-1]?.focus(), 0);
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);
    if (text.length === 6) {
      setOtp(text.split(""));
      setTimeout(() => refList[5]?.focus(), 0);
    }
  };

  const handleVerify = async () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    setError("");
    const email = localStorage.getItem("pendingEmail") || "";
    try {
      await axios.post(`${API}/verify-otp`, { email, otp: otp.join("") });
      localStorage.removeItem("pendingEmail");
      setVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("pendingEmail") || "";
    try {
      await axios.post(`${API}/send-otp`, { email });
      setTimer(30);
      setError("");
    } catch {
      setError("Could not resend OTP.");
    }
  };

  useState(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer(t => {
      if (t <= 1) { clearInterval(id); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(id);
  });

  return (
    <div className="card">
      <Logo />
      <button className="back-btn" onClick={() => navigate("login")}>← Back</button>
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

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-primary" onClick={handleVerify} disabled={otp.join("").length < 6 || loading}>
            {loading ? "Verifying..." : "Verify OTP →"}
          </button>

          <div className="resend-row">
            {timer > 0 ? (
              <>Resend code in<span className="timer-chip">0:{String(timer).padStart(2,"0")}</span></>
            ) : (
              <>Didn't receive it? <button className="link-btn" onClick={handleResend}>Resend OTP</button></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="success-icon" style={{ marginTop: 8 }}>✅</div>
          <h1 className="page-title" style={{ textAlign: "center" }}>Verified!</h1>
          <p className="page-sub" style={{ textAlign: "center" }}>
            Your account has been created.<br />You're all set to continue.
          </p>
          <button className="btn-primary" onClick={() => navigate("login")}>
            Go to Login →
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