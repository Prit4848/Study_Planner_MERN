import React from 'react';

const Support = () => {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Connect with Us</h1>
        <p className="text-center text-gray-600 mb-8">
          Follow us on social media for the latest updates and support.
        </p>
  
        <div className="flex justify-center space-x-6">
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=61563746221726" target="_blank" className="transition-transform transform hover:scale-110">
            <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" className="w-12 h-12" />
          </a>
          {/* LinkedIn */}
          <a href="https://github.com/Prit4848" target="_blank" className="transition-transform transform hover:scale-110">
            <img src="https://img.icons8.com/fluent/48/000000/github.png" alt="LinkedIn" className="w-12 h-12" />
          </a>
          {/* YouTube */}
          <a href="https://youtube.com/@studyplanner123?si=bzpppnMgiFQ-cl19" target="_blank" className="transition-transform transform hover:scale-110">
            <img src="https://img.icons8.com/fluent/48/000000/youtube-play.png" alt="YouTube" className="w-12 h-12" />
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/studyplanner753/" target="_blank" className="transition-transform transform hover:scale-110">
            <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram" className="w-12 h-12" />
          </a>
        </div>
  
        <div className="mt-8 text-center">
          <a href="mailto:studyplanner12233@gmail.com" className="text-blue-500 underline">studyplanner12233@gmail.com</a>
        </div>
      </div>
    );
  };
  
export default Support;