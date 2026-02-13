// frontend/src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Film, ArrowRight, Check, X, Sparkles, Shield } from 'lucide-react';
import authService from '../services/authService';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumberOrSpecial: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate password on change
    if (name === 'password') {
      setPasswordValidation({
        minLength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasNumberOrSpecial: /[0-9!@#$%^&*]/.test(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate password requirements
    if (!passwordValidation.minLength || !passwordValidation.hasUpperCase || !passwordValidation.hasNumberOrSpecial) {
      setError('Please meet all password requirements');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.signup(formData);
      
      // Navigate to home page after successful signup
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const allRequirementsMet = passwordValidation.minLength && passwordValidation.hasUpperCase && passwordValidation.hasNumberOrSpecial;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Sign Up Card */}
      <div className="relative z-10 w-full max-w-md animate-fadeIn">
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/50 animate-pulse-slow">
              <Film className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-3 leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                Join CinePlex
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Create your account and start watching</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm backdrop-blur-sm animate-shake">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all placeholder-gray-500 font-medium"
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all placeholder-gray-500 font-medium"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 bg-black/50 backdrop-blur-sm text-white rounded-xl border-2 border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all placeholder-gray-500 font-medium"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className={`bg-gradient-to-br ${allRequirementsMet ? 'from-emerald-900/20 to-emerald-800/20 border-emerald-500/30' : 'from-blue-900/20 to-purple-900/20 border-blue-500/20'} border rounded-xl p-5 transition-all duration-300`}>
              <div className="flex items-center space-x-2 mb-3">
                <Shield className={`w-5 h-5 ${allRequirementsMet ? 'text-emerald-400' : 'text-blue-400'}`} />
                <p className={`text-sm font-bold ${allRequirementsMet ? 'text-emerald-400' : 'text-gray-400'}`}>
                  Password Requirements
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  {passwordValidation.minLength ? (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${passwordValidation.minLength ? 'text-emerald-400' : 'text-gray-400'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {passwordValidation.hasUpperCase ? (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${passwordValidation.hasUpperCase ? 'text-emerald-400' : 'text-gray-400'}`}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {passwordValidation.hasNumberOrSpecial ? (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${passwordValidation.hasNumberOrSpecial ? 'text-emerald-400' : 'text-gray-400'}`}>
                    One number or special character
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-black text-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900/90 text-gray-400 font-semibold">or sign up with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="group py-4 px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              <span className="group-hover:text-blue-400 transition-colors">Google</span>
            </button>
            <button 
              className="group py-4 px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              disabled={loading}
            >
              <span className="group-hover:text-blue-400 transition-colors">Facebook</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-8 text-lg">
            Already have an account?{' '}
            <Link 
              to="/signin" 
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors inline-flex items-center space-x-1 group"
            >
              <span>Sign In</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;