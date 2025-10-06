// frontend/src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Film, Send } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
          {!isSubmitted ? (
            <>
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-indigo-500/50">
                  <Film className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-black mb-2">
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Reset Password
                  </span>
                </h1>
                <p className="text-gray-400">
                  Enter your email and we'll send you instructions to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/80 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Reset Instructions</span>
                </button>
              </form>

              {/* Back to Sign In */}
              <div className="mt-8 text-center">
                <Link 
                  to="/signin" 
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6 shadow-lg shadow-green-500/50">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Check Your Email
                  </span>
                </h2>
                <p className="text-gray-400 mb-8">
                  We've sent password reset instructions to<br />
                  <span className="text-white font-semibold">{email}</span>
                </p>

                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-400">
                    Didn't receive the email? Check your spam folder or try again with a different email address.
                  </p>
                </div>

                <Link 
                  to="/signin"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;