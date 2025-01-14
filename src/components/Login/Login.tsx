import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate('/dashboard/users');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={'/images/lendsqr-logo.svg'} alt="Lendsqr Logo" className="logo" />
        <img src={'/images/sign-in-image.svg'} alt="Sign-In Illustration" className="illustration" />
      </div>
      <div className="login-right">
        <img src={'/images/lendsqr-logo.svg'} alt="Lendsqr Logo" className="logo-small" />
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <div className="password-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
          </div>
          </div>
          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="show-password"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>
          <a href="#" className="forgot-password">
            FORGOT PASSWORD?
          </a>
          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
