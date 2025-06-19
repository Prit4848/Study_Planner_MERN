import React from 'react';

// Image imports
import index from '../assets/howtoUse/index.png';
import register from '../assets/howtoUse/register.png';
import registerFill from '../assets/howtoUse/register_fill.png';
import registerComplete from '../assets/howtoUse/register_complete.png';
import login from '../assets/howtoUse/login.png';
import homePage from '../assets/howtoUse/home_page_option.png';
import blankDashboard from '../assets/howtoUse/blank_dashboard.png';
import createGoal from '../assets/howtoUse/create_goal.png';
import dashboardGoals from '../assets/howtoUse/dashboard_created_plan_and_goals.png';
import viewGoal from '../assets/howtoUse/view_goal.png';
import editGoal from '../assets/howtoUse/edit_goal.png';
import viewProfile from '../assets/howtoUse/view_profile.png';

const steps = [
  {
    title: "Step 1: Click on the 'Register' button from the main page.",
    description: "Find the button on the main page and click it to register and go to the registration page.",
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
    title: "Step 7: Create a Plan.",
    description: "On the dashboard, click the 'Create Plan' button to go to the plan creation page.",
    image: blankDashboard,
    reverse: false,
  },
  {
    title: "Step 8: Fill in the Goal form.",
    description: "Fill in the goal form to create your daily tasks and click the 'Create Goal' button.",
    image: createGoal,
    reverse: true,
  },
  {
    title: "Step 9: See Your Goals.",
    description: "On the dashboard, you can see your goals. Click 'View Goals' to go to the goal details page.",
    image: dashboardGoals,
    reverse: false,
  },
  {
    title: "Step 10: Full Details of the Goal.",
    description: "View the full details of the goal to see your study plan.",
    image: viewGoal,
    reverse: true,
  },
  {
    title: "Step 11: Go to Dashboard to Update Goals.",
    description: "Go back to the dashboard, click the edit button to go to the goal editing page.",
    image: dashboardGoals,
    reverse: false,
  },
  {
    title: "Step 12: Update Your Goal.",
    description: "Make the necessary updates to your goal and click the 'Update' button.",
    image: editGoal,
    reverse: true,
  },
  {
    title: "Step 13: Profile Page.",
    description: "Go to the profile page to see your profile, plans, and goals.",
    image: viewProfile,
    reverse: false,
  },
];

const OrganizeGoals = () => {
  return (
    <>
      <header className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl text-center mt-8 text-black">How to Organize Your Goals</h1>
      </header>

      <main className="container mx-auto p-4 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">Step-by-Step Guide</h2>
        <div className="mt-6 text-gray-800 space-y-8">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center lg:items-start ${step.reverse ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 p-4">
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2">{step.description}</p>
              </div>
              <div className="lg:w-1/2 p-4">
                <img src={step.image} alt={step.title} className="rounded-lg shadow-lg" />
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

export default OrganizeGoals;
