import React from 'react';

// Image imports
import index from '../assets/howtoUse/index.png';
import register from '../assets/howtoUse/register.png';
import registerFill from '../assets/howtoUse/register_fill.png';
import registerComplete from '../assets/howtoUse/register_complete.png';
import login from '../assets/howtoUse/login.png';
import homePage from '../assets/howtoUse/home_page_option.png';
import dashboardGoals from '../assets/howtoUse/dashboard_created_plan_and_goals.png';
import setReminder from '../assets/howtoUse/set_p_reminder.png';
import whatsappAlert from '../assets/howtoUse/messege_alert.png';

const steps = [
  {
    title: "Step 1: Click on the 'Register' button from the main page.",
    description: "Find the button on the main page and click it to get registered and go to the register page.",
    image: index,
    reverse: false,
  },
  {
    title: "Step 2: Fill in the registration form.",
    description: "Fill in the registration form and click the 'Register' button to complete your registration.",
    image: register,
    reverse: true,
  },
  {
    title: "Step 3: Registration Success.",
    description: "Once registered, you will see a success message. Please proceed to the login page.",
    image: registerFill,
    reverse: false,
  },
  {
    title: "Step 4: Click 'Login'.",
    description: "Click the login button to proceed to the login page.",
    image: registerComplete,
    reverse: true,
  },
  {
    title: "Step 5: Go to the login page.",
    description: "Enter your email and password, then click the login button to go to the home page.",
    image: login,
    reverse: false,
  },
  {
    title: "Step 6: Home Page.",
    description: "This is the home page of your website. From here, go to the dashboard to create your plans.",
    image: homePage,
    reverse: true,
  },
  {
    title: "Step 7: Click 'View Plan'.",
    description: "Click the 'View Plan' button to go to the plan details page.",
    image: dashboardGoals,
    reverse: false,
  },
  {
    title: "Step 8: Set Study Reminder.",
    description: "Fill in the date and time, then set the reminder.",
    image: setReminder,
    reverse: true,
  },
  {
    title: "Step 9: View the Message on WhatsApp.",
    description: "At the set time, you will receive a reminder message on your WhatsApp.",
    image: whatsappAlert,
    reverse: false,
  },
];

const PersonalizedAlerts = () => {
  return (
    <>
      <header className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl text-center mt-8 text-black">How to Set Up Personalized Alerts</h1>
      </header>

      <main className="container mx-auto p-4 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">Step-by-Step Guide</h2>
        <div className="mt-6 text-gray-800 space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center lg:items-start ${
                step.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:w-1/2 p-4">
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2">{step.description}</p>
              </div>
              <div className="lg:w-1/2 p-4">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 text-center p-4 mt-10">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Study Planner. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default PersonalizedAlerts;
