import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mt-10">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">Welcome to our Study Planner website!</p>
        <p className="mb-4">
          Our mission is to help students organize their study schedules, track their progress, and achieve their academic goals. With our intuitive and easy-to-use planner, you can create detailed study plans, set goals, and monitor your progress with ease.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Create and manage study plans</li>
          <li>Track your progress with task completion</li>
          <li>Set and achieve your academic goals</li>
          <li>Receive reminders for your study tasks</li>
          <li>Monitor your daily streaks</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="mb-4">
          We are a group of dedicated individuals who are passionate about education and technology. Our team is committed to providing the best tools to help students succeed in their academic pursuits.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions, suggestions, or feedback, please don't hesitate to{' '}
          <a href="/contactUs" className="text-blue-500">
            contact us
          </a>
          . We are always here to help!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
