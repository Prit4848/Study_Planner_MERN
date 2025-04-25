import React from "react";
import profileImage from "../assets/organized_1.jpeg";
import alert_1 from "../assets/alert_1.jpeg";
import goals from "../assets/goals_1.jpeg";
import track from "../assets/track_1.jpeg";

const HowToUse = () => {
  return (
    <>
      {/* Header */}
      <div className="container mx-auto p-4 text-center mt-8 reveal">
        <h1 className="text-3xl sm:text-4xl font-bold text-black animate-typing">
          Welcome to Study Planner
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-lg">
          A smarter way to plan, track, and achieve your study goals!
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto p-4 mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 reveal">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[
            {
              img: profileImage,
              alt: "Organize Your Schedule",
              link: "/h-organize-schedule",
              title: "Organize Your Schedule",
              description: "Easily organize and manage your study schedule.",
            },
            {
              img: track,
              alt: "Track Your Progress",
              link: "/h-tracking-progress",
              title: "Track Your Progress",
              description: "Monitor your progress and stay motivated.",
            },
            {
              img: goals,
              alt: "Organize Your Goals",
              link: "/h-organize-goal",
              title: "Organize Your Goals",
              description: "Set and organize your study goals effectively.",
            },
            {
              img: alert_1,
              alt: "Personalize Alerts",
              link: "/h-personalize-alert",
              title: "Personalize Alerts",
              description: "Set personalized alerts to never miss a study session.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={feature.img}
                alt={feature.alt}
                className="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-md"
              />
              <a
                href={feature.link}
                className="block text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition"
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
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              text: `"Study Planner has completely transformed the way I study. It's a game-changer!"`,
              author: "- Chirag Surati",
            },
            {
              text: `"I love the simplicity and effectiveness of Study Planner. Highly recommend it!"`,
              author: "- Ashish Patel",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <p className="text-gray-800 italic text-lg">“{testimonial.text}”</p>
              <p className="mt-4 text-gray-600 font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HowToUse;
