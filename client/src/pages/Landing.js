import React from "react";
// import Image from "next/image";
// import { Container } from "./Container";
import heroImg from "../assets/img/hero.png";
import "../styles/hero.css";  // Import the CSS file

const Landing = () => {
  return (
    <>
    <div className="container">
    <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to Unity Docs: Where Ideas Come to Life Together
            </h1>
            <p className="hero-description">
              Unity Docs is your go-to platform for seamless, real-time text editing. Whether you're working on a team project, drafting a proposal, or simply brainstorming with others, Unity Docs empowers you to create and refine content together, effortlessly. With intuitive features, robust editing tools, and the ability to track changes and contributions, we make teamwork more productive and enjoyable. Join us and experience the future of collaborative writing.
            </p>

            <div className="hero-buttons">
              <a
                href="/signup"
                target="_blank"
                rel="noopener"
                className="download-button">
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src={heroImg}
            width="616"
            height="617"
            className="hero-image"
            alt="Hero Illustration"
            loading="eager"
          />
        </div>
    </div>
    </>
  );
};

export default Landing;
