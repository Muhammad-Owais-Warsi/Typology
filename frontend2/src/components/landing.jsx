import React from "react";

const LandingPage = () => {
  const handleSignup = () => {
    // Redirect or open signup modal
    alert("Sign up clicked");
  };
  

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-[#f5f5f5] font-mono px-4 flex items-center justify-center">

      <img src="/chimp-logo.webp" className="w-32 h-32 flex-col lg:flex-row gap-10 md:w-100 md:h-100"/>
      
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="bg-yellow-300 text-black pr-1">ChimpType</span>
        </h1>
        <p className="text-[#bbbbbb] max-w-md mb-8">
          Race your friends. Type like a chimp.
        </p>
        <button
          onClick={handleSignup}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow-md transition-all duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
