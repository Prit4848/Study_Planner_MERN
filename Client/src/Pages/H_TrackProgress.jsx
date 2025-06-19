import React from 'react';

// Image imports
import index from '../assets/howtoUse/index.png';
import register from '../assets/howtoUse/register.png';
import registerFill from '../assets/howtoUse/register_fill.png';
import registerComplete from '../assets/howtoUse/register_complete.png';
import login from '../assets/howtoUse/login.png';
import homePage from '../assets/howtoUse/home_page_option.png';
import goalsBreakdown from '../assets/howtoUse/dashboard_created_plan_and_goals.png';
import viewPlan from '../assets/howtoUse/view_plan.png';
import progressTracking from '../assets/howtoUse/view_progress_tracking.png';

const steps = [
  {
    title: "Step 1: Click on the 'Register' button from the main page.",
    description: "Find the button on the main page and click it to get registered and go to the register page.",
    image: index,
    reverse: false,
  },
  {
    title: "Step 2: Fill in the Register form.",
    description: "Fill in the register form and click the Register button to complete your registration.",
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
    title: "Step 4: Click Login.",
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
    title: "Step 7: Break down your goals into manageable tasks.",
    description: "Divide your goals into smaller, actionable tasks to make them more achievable.",
    image: goalsBreakdown,
    reverse: false,
  },
  {
    title: "Step 8: Click 'View Plan'.",
    description: "Click the 'View Plan' button to go to the plan details page.",
    image: viewPlan,
    reverse: true,
  },
  {
    title: "Step 9: View your progress.",
    description: "Click the 'Plan Tracking' button to go to the progress tracking page and see your progress to stay motivated.",
    image: progressTracking,
    reverse: false,
  },
];

const TrackProgress = () => {
  return (
    <>
      <header className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl text-center mt-8 text-black">How to Track Your Progress</h1>
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

export default TrackProgress;
