import React, { memo, useState } from "react";
import styled from "styled-components";
import "../assets/main.scss";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Subscribe = memo(() => {
  const [email, updateEmail] = useState("");
  const [hasSubmitted, updateSubmitted] = useState(false);

  const handleSubmit = e => {
    if (email.length > 10) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "subscribe", email }),
      })
        .then(() => updateSubmitted(true))
        .catch(error => alert(error));

      // Reset input
      updateEmail("");
      // Update the submitted state
      if (hasSubmitted) {
        setTimeout(() => updateSubmitted(false), 1000);
      }
    }
    e.preventDefault();
  };

  return (
    <Div className="subscribe-container">
      <div className="subscribe-items-container">
        <div className="form-text-container">
          <p className="form-text">Get latest tech articles in your inbox</p>
        </div>
        <div className="form-main-container">
          {/* <div className="form-container"> */}
          <form
            method="post"
            className="form-control"
            name="subscribe"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="subscribe" />
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => updateEmail(e.target.value)}
              placeholder="Email address..."
              aria-label="email"
              className="email-input"
            />
            <button type="submit" className="btn-input">
              Subscribe
            </button>
          </form>
        </div>
        <span
          className={`submit-message center-child submit-${
            hasSubmitted ? "visible" : "hidden"
          }`}
        >
          Subscribed
        </span>
      </div>
    </Div>
  );
});

export default Subscribe;

const Div = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 0 1rem;
  background-image: linear-gradient(
    -71deg,
    #15c39a,
    #19bea0 6%,
    #19bea0 7%,
    #4c7af1 95%
  );
  height: 25rem;
  border-radius: 10px;
  .form-main-container {
    margin: 0 auto;
    width: 90%;
    background-color: #fcfcfc;
    padding: 0.5rem;
    border-radius: 3px;
  }
  .form-text {
    font-size: 2.4rem;
    color: #fcfcfc;
    padding: 1rem 2.5rem;
    margin-bottom: 2.5rem;
  }
  .form-control {
    padding: 0;
    display: grid;
    grid-template-columns: 84% 16%;
    border: none;
    .email-input {
      padding: 0.5rem 1rem;
      border: none;
      outline: none;
      &::placeholder {
        color: #d1cdc5;
        opacity: 1;
      }
    }
    .btn-input {
      color: #fcfcfc;
      font-size: 0.8rem;
      letter-spacing: 0.04rem;
      padding: 0.5rem 0;
      background-color: #446dd8;
      text-transform: uppercase;
      border: none;
      border-radius: 3px;
      &:hover {
        background-color: #5379db;
      }
    }
  }
  .submit-message {
    color: black;
    position: relative;
    top: 10%;
    text-transform: uppercase;
  }
  .submit-hidden {
    visibility: hidden;
  }
  .submit-visible {
    visibility: visible;
  }
  @media all and (max-width: 768px) {
    .form-text {
      font-size: 2rem;
    }
    .btn-input {
      font-size: 0.7rem;
    }
  }
  @media all and (max-width: 600px) {
    .form-text {
      font-size: 1.8rem;
    }
    .btn-input {
      font-size: 0.6rem;
    }
  }
  @media all and (max-width: 520px) {
    .form-text {
      font-size: 1.6rem;
    }
    .btn-input {
      font-size: 0.4rem;
    }
  }
`;
