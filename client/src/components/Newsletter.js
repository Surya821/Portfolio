import { useState } from "react";
import { Col, Row } from "react-bootstrap";
const API_URL = process.env.REACT_APP_API_URL;

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || email.indexOf("@") === -1) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      return;
    }

    setStatus('sending');
    setMessage('Subscribing...');
    
    try {
      const response = await fetch(`${API_URL}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        setStatus('success');
        setMessage('Successfully subscribed! Check your email.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.status || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
      setMessage('Failed to connect to server. Please try again later.');
    }
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setStatus('');
      setMessage('');
    }, 5000);
  };

  return (
    <>
      <Col lg={12}>
        <div className="newsletter-bx wow slideInUp">
          <Row>
            <Col lg={12} md={6} xl={5}>
              <h3>Subscribe to our Newsletter<br></br> & Never miss latest updates</h3>
              {status === 'sending' && !showToast && (
                <p style={{ color: '#fff', marginTop: '15px' }}>Sending...</p>
              )}
            </Col>
            <Col md={6} xl={7}>
              <form onSubmit={handleSubmit}>
                <div className="new-email-bx">
                  <input 
                    value={email} 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email Address"
                    disabled={status === 'sending'}
                  />
                  <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </Col>
      
      {/* Toast Notification */}
      {showToast && (
        <div className={`toast-notification ${status === 'success' ? 'toast-success' : 'toast-error'}`}>
          <div className="toast-icon">
            {status === 'success' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
              </svg>
            )}
          </div>
          <div className="toast-content">
            <div className="toast-title">{status === 'success' ? 'Success!' : 'Error'}</div>
            <div className="toast-message">{message}</div>
          </div>
          <button className="toast-close" onClick={() => setShowToast(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}