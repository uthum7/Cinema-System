// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, TrendingUp, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const dummyFeaturedMovies = [
    { id: 1, title: 'Inception', poster_path: 'https://picsum.photos/seed/inception/300/450', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', release_date: '2010-07-16', rating: 8.8 },
    { id: 2, title: 'The Dark Knight', poster_path: 'https://picsum.photos/seed/darkknight/300/450', overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', release_date: '2008-07-18', rating: 9.0 },
    { id: 3, title: 'Interstellar', poster_path: 'https://picsum.photos/seed/interstellar/300/450', overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', release_date: '2014-11-07', rating: 8.6 },
    { id: 4, title: 'Dune', poster_path: 'https://picsum.photos/seed/dune/300/450', overview: 'Paul Atreides, a brilliant and gifted young man born into a great destiny...', release_date: '2021-10-22', rating: 8.5 },
  ];

  const dummyPromotions = [
    { id: 1, title: 'Weekend Bonanza', description: '20% off all tickets this weekend!', banner_url: 'https://picsum.photos/seed/promo1/1200/400' },
    { id: 2, title: 'Family Pack', description: 'Special discounts for family bookings.', banner_url: 'https://picsum.photos/seed/promo2/1200/400' },
  ];

  useEffect(() => {
    setFeaturedMovies(dummyFeaturedMovies);
    setPromotions(dummyPromotions);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900"></div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">Now Playing in 4K & Dolby Atmos</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Your Ultimate
            </span>
            <br />
            <span className="text-white">Movie Experience</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover the latest blockbusters and timeless classics in stunning quality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/movies" 
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Explore Movies</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/schedule"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>View Schedule</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-yellow-500/20">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Hot Deals</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Special Offers
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Don't miss out on amazing deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promotions.map(promo => (
              <div 
                key={promo.id} 
                className="group relative rounded-3xl overflow-hidden h-80 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105"
              >
                <img 
                  src={promo.banner_url} 
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-4xl font-black mb-3 text-white">{promo.title}</h3>
                  <p className="text-xl text-gray-300 mb-6">{promo.description}</p>
                  <button className="self-start px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                    Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-purple-500/20">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Top Rated</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured This Week
              </span>
            </h2>
            <p className="text-gray-400 text-lg">The best movies playing right now</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map(movie => (
              <Link 
                to="/booking" 
                key={movie.id} 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
              >
                <div className="relative overflow-hidden aspect-[2/3]">
                  <img 
                    src={movie.poster_path} 
                    alt={movie.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-500/20">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">{movie.rating}</span>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{movie.overview}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quick Booking
                </span>
              </h2>
              <p className="text-gray-400 text-lg">Find your perfect showtime in seconds</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <select className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <option>Select Movie</option>
                {featuredMovies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
              </select>
              <input 
                type="date" 
                className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <Link 
                to="/schedule" 
                className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <span>Find Showtimes</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;