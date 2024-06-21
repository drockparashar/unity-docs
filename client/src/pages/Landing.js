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
              The Ultimate Habit Tracker & To-Do List App
            </h1>
            <p className="hero-description">
              Take control of your daily routines and achieve your goals effortlessly with our all-in-one habit tracker and to-do list app. Seamlessly integrate your tasks and habits, stay organized with smart reminders, and visualize your progress with insightful analytics.
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