import React, { useEffect, useState } from "react";
import Header from "../Componets/Header";
import Footer from "../Componets/Footer";
import profileImage from '../assets/organized_1.jpeg';
import alert_1 from '../assets/alert_1.jpeg';
import goals from '../assets/goals_1.jpeg'
import track from '../assets/track_1.jpeg'


const Index = () => {

  
  return (
    <>
    <Header/>
      <div className="container mx-auto p-4 relative z-10 reveal">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center mt-8 text-black animate-typing">
          Welcome to Study Planner
        </h1>
      </div>

      {/* Features Section */}
      <div className="container mx-auto p-4 mt-10 reveal">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 reveal">
          {[
            {
              img: profileImage,
              alt: "Feature 1",
              link: "/h-oraganize-shedule",
              title: "Organize Your Schedule",
              description: "Easily organize and manage your study schedule.",
            },
            {
              img:track,
              alt: "Feature 2",
              link: "/h-tracking-progress",
              title: "Track Your Progress",
              description: "Monitor your progress and stay motivated.",
            },
            {
              img: goals,
              alt: "Feature 3",
              link: "/h-oraganize-golal",
              title: "Organize Your Goals",
              description: "Set and organize your study goals effectively.",
            },
            {
              img: alert_1,
              alt: "Feature 4",
              link: "/h-personalize-alert",
              title: "Personalize Alerts",
              description: "Set personalized alerts to never miss a study session.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center animate-hover-3d"
            >
              <img
                src={feature.img}
                alt={feature.alt}
                className="mx-auto mb-4 w-12 h-12 sm:w-16 sm:h-16"
              />
              <a
                href={feature.link}
                className="text-lg sm:text-xl font-semibold text-gray-800"
              >
                {feature.title}
              </a>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto p-4 mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 reveal">
          Testimonials
        </h2>
        <div className="mt-6 reveal">
          {[
            {
              text: '"Study Planner has completely transformed the way I study. It\'s a game-changer!"',
              author: "- Chirag Surati",
            },
            {
              text: '"I love the simplicity and effectiveness of Study Planner. Highly recommend it!"',
              author: "- Ashish Patel",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center mt-6 animate-hover-3d reveal"
            >
              <p className="text-gray-800 italic">{testimonial.text}</p>
              <p className="mt-4 text-gray-600">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Index;
