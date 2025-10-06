// frontend/src/pages/BookingPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { Film, Calendar, Clock, MapPin, Users, Maximize2, Minimize2, Eye, ChevronRight } from 'lucide-react';

const CinemaHall3D = ({ hallLayout, selectedSeats, onSeatClick, isVisible }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const seatsRef = useRef(new Map());
  const frameRef = useRef(null);
  const isInitialized = useRef(false);
  const cleanupRef = useRef(null);
  const [showSeatView, setShowSeatView] = useState(false);
  const [selectedSeatPosition, setSelectedSeatPosition] = useState(null);

  const initializeScene = useCallback(() => {
    if (!mountRef.current || isInitialized.current) return;
    
    isInitialized.current = true;
    const currentMount = mountRef.current;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        60,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 15, 20);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x0a0a0a, 1);
      rendererRef.current = renderer;
      
      currentMount.innerHTML = '';
      currentMount.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
      mainLight.position.set(0, 20, 10);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const frontLight = new THREE.DirectionalLight(0x8855ff, 0.6);
      frontLight.position.set(0, 10, 15);
      scene.add(frontLight);

      // Screen with glow
      const screenGeometry = new THREE.PlaneGeometry(20, 11);
      const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        emissive: 0x4422ff,
        emissiveIntensity: 0.3
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, 5.5, -12);
      scene.add(screen);

      // Screen frame
      const frameGeometry = new THREE.BoxGeometry(22, 13, 0.5);
      const frameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        metalness: 0.8,
        roughness: 0.2
      });
      const screenFrame = new THREE.Mesh(frameGeometry, frameMaterial);
      screenFrame.position.set(0, 5.5, -12.3);
      scene.add(screenFrame);

      // Floor with subtle gradient
      const floorGeometry = new THREE.PlaneGeometry(40, 35);
      const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.7
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.1;
      floor.receiveShadow = true;
      scene.add(floor);

      // Mouse interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let hoveredSeat = null;

      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Array.from(seatsRef.current.values()).flatMap(group => group.children));

        if (hoveredSeat && hoveredSeat.parent) {
          const seatGroup = hoveredSeat.parent;
          if (!seatGroup.userData.isOccupied && !seatGroup.userData.isSelected) {
            seatGroup.children.forEach(child => {
              if (child.material) {
                child.material.emissive.setHex(0x000000);
              }
            });
          }
        }

        if (intersects.length > 0) {
          const seat = intersects[0].object;
          const seatGroup = seat.parent;
          
          if (seatGroup && !seatGroup.userData.isOccupied && !seatGroup.userData.isSelected) {
            seatGroup.children.forEach(child => {
              if (child.material) {
                child.material.emissive.setHex(0x4422ff);
              }
            });
            hoveredSeat = seat;
            renderer.domElement.style.cursor = 'pointer';
          } else {
            renderer.domElement.style.cursor = 'default';
          }
        } else {
          hoveredSeat = null;
          renderer.domElement.style.cursor = 'default';
        }
      };

      const onMouseClick = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Array.from(seatsRef.current.values()).flatMap(group => group.children));

        if (intersects.length > 0) {
          const seat = intersects[0].object;
          const seatGroup = seat.parent;
          
          if (seatGroup && !seatGroup.userData.isOccupied) {
            setSelectedSeatPosition(seatGroup.position.clone());
            setShowSeatView(true);
            
            setTimeout(() => {
              setShowSeatView(false);
              onSeatClick(seatGroup.userData.seatId);
            }, 3000);
          }
        }
      };

      renderer.domElement.addEventListener('mousemove', onMouseMove);
      renderer.domElement.addEventListener('click', onMouseClick);

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        
        if (showSeatView && selectedSeatPosition) {
          camera.position.set(
            selectedSeatPosition.x,
            selectedSeatPosition.y + 2,
            selectedSeatPosition.z + 1
          );
          camera.lookAt(0, 5.5, -12);
        } else {
          const time = Date.now() * 0.0003;
          camera.position.x = Math.sin(time) * 2;
          camera.position.y = 15 + Math.cos(time * 0.7) * 2;
          camera.position.z = 20 + Math.sin(time * 0.5) * 3;
          camera.lookAt(0, 3, 0);
        }
        
        renderer.render(scene, camera);
      };
      
      animate();

      const handleResize = () => {
        if (currentMount && camera && renderer) {
          camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      cleanupRef.current = () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement) {
          renderer.domElement.removeEventListener('mousemove', onMouseMove);
          renderer.domElement.removeEventListener('click', onMouseClick);
        }
        seatsRef.current.forEach((seatGroup) => {
          if (scene && seatGroup) {
            scene.remove(seatGroup);
            seatGroup.traverse((child) => {
              if (child.geometry) child.geometry.dispose();
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(material => material.dispose());
                } else {
                  child.material.dispose();
                }
              }
            });
          }
        });
        seatsRef.current.clear();
        if (renderer) renderer.dispose();
        sceneRef.current = null;
        rendererRef.current = null;
        cameraRef.current = null;
        isInitialized.current = false;
      };

    } catch (error) {
      console.error('Error initializing 3D scene:', error);
      isInitialized.current = false;
    }
  }, [onSeatClick, showSeatView, selectedSeatPosition]);

  useEffect(() => {
    if (isVisible) {
      initializeScene();
    } else if (cleanupRef.current) {
      cleanupRef.current();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    }
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [isVisible, initializeScene]);

  useEffect(() => {
    if (!sceneRef.current || !isInitialized.current || hallLayout.length === 0) return;

    seatsRef.current.forEach((seatGroup) => {
      if (sceneRef.current && seatGroup) {
        sceneRef.current.remove(seatGroup);
        seatGroup.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    });
    seatsRef.current.clear();

    let zPosition = 12;
    
    hallLayout.forEach((row) => {
      if (!row || row.seats.length === 0) {
        zPosition -= 2.5;
        return;
      }

      const seatsInRow = row.seats.length;
      const startX = -(seatsInRow - 1) * 1.2 / 2;

      row.seats.forEach((seat, seatIndex) => {
        try {
          const seatGroup = new THREE.Group();
          
          const seatGeometry = new THREE.BoxGeometry(1, 0.6, 1);
          let seatColor, backColor;
          
          if (seat.isOccupied) {
            seatColor = 0xff4444;
            backColor = 0xcc3333;
          } else if (selectedSeats.includes(seat.id)) {
            seatColor = 0x44ff44;
            backColor = 0x33cc33;
          } else {
            seatColor = 0x666666;
            backColor = 0x555555;
          }
          
          const seatMaterial = new THREE.MeshStandardMaterial({
            color: seatColor,
            emissive: selectedSeats.includes(seat.id) ? 0x002200 : 0x000000,
            metalness: 0.3,
            roughness: 0.7
          });
          
          const seatMesh = new THREE.Mesh(seatGeometry, seatMaterial);
          seatMesh.position.set(0, 0.3, 0);
          seatMesh.castShadow = true;
          seatMesh.receiveShadow = true;

          const backGeometry = new THREE.BoxGeometry(1, 1.2, 0.2);
          const backMaterial = new THREE.MeshStandardMaterial({
            color: backColor,
            emissive: selectedSeats.includes(seat.id) ? 0x002200 : 0x000000,
            metalness: 0.3,
            roughness: 0.7
          });
          
          const backMesh = new THREE.Mesh(backGeometry, backMaterial);
          backMesh.position.set(0, 0.9, -0.4);
          backMesh.castShadow = true;

          const armGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.6);
          const armMaterial = new THREE.MeshStandardMaterial({ 
            color: backColor,
            metalness: 0.3,
            roughness: 0.7
          });
          
          const leftArm = new THREE.Mesh(armGeometry, armMaterial);
          leftArm.position.set(-0.45, 0.7, 0);
          leftArm.castShadow = true;
          
          const rightArm = new THREE.Mesh(armGeometry, armMaterial);
          rightArm.position.set(0.45, 0.7, 0);
          rightArm.castShadow = true;

          seatGroup.add(seatMesh);
          seatGroup.add(backMesh);
          seatGroup.add(leftArm);
          seatGroup.add(rightArm);

          seatGroup.position.set(startX + seatIndex * 1.2, 0, zPosition);
          seatGroup.userData = {
            seatId: seat.id,
            isOccupied: seat.isOccupied,
            isSelected: selectedSeats.includes(seat.id)
          };

          sceneRef.current.add(seatGroup);
          seatsRef.current.set(seat.id, seatGroup);
        } catch (error) {
          console.error(`Error creating seat ${seat.id}:`, error);
        }
      });

      zPosition -= 1.8;
    });
  }, [hallLayout, selectedSeats]);

  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.style.display = isVisible ? 'block' : 'none';
    }
  }, [isVisible]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[500px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
      style={{ minHeight: '500px', position: 'relative', display: isVisible ? 'block' : 'none' }}
    >
      {(!sceneRef.current || seatsRef.current.size === 0) && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/90">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading 3D Cinema Hall...</p>
          </div>
        </div>
      )}
      
      {showSeatView && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-10 animate-in fade-in duration-300">
          <div className="text-center text-white max-w-md">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Seat View Preview</h3>
              <p className="text-gray-400 mb-6">Experience the view from this seat</p>
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-white/10">
                <div className="aspect-video bg-gradient-to-b from-purple-900/50 to-gray-900 rounded-xl flex items-center justify-center mb-3 border border-purple-500/20">
                  <span className="text-white font-bold text-2xl">SCREEN</span>
                </div>
                <p className="text-sm text-gray-400">Perfect viewing angle • Crystal clear sound</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-pulse w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Selecting seat...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingPage = () => {
  const showtimeId = 's1';
  const [hallLayout, setHallLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice] = useState(12.50);
  const [view3D, setView3D] = useState(true);
  const [movieInfo, setMovieInfo] = useState({ 
    title: 'Loading...', 
    poster: 'https://picsum.photos/seed/loading/300/450', 
    hall: 'N/A', 
    time: 'N/A',
    date: 'N/A'
  });

  const dummyShowtimeData = {
    's1': { movie: { title: 'Inception', poster: 'https://picsum.photos/seed/inception/300/450' }, hall: 'Hall A', time: '14:00', date: '2023-10-27'},
  };

  const initializeHallLayout = useCallback(() => {
    const layout = [
      { rowName: 'AA', seats: Array.from({ length: 6 }, (_, i) => ({ id: `AA${i + 1}`, name: `AA${i + 1}`, isOccupied: Math.random() > 0.8, isSelected: false })) },
      { rowName: 'A', seats: Array.from({ length: 10 }, (_, i) => ({ id: `A${i + 1}`, name: `A${i + 1}`, isOccupied: Math.random() > 0.7, isSelected: false })) },
      { rowName: 'B', seats: Array.from({ length: 12 }, (_, i) => ({ id: `B${i + 1}`, name: `B${i + 1}`, isOccupied: Math.random() > 0.6, isSelected: false })) },
      { rowName: '', seats: [] },
      { rowName: 'C', seats: Array.from({ length: 12 }, (_, i) => ({ id: `C${i + 1}`, name: `C${i + 1}`, isOccupied: Math.random() > 0.5, isSelected: false })) },
      { rowName: 'D', seats: Array.from({ length: 10 }, (_, i) => ({ id: `D${i + 1}`, name: `D${i + 1}`, isOccupied: Math.random() > 0.7, isSelected: false })) },
      { rowName: 'E', seats: Array.from({ length: 8 }, (_, i) => ({ id: `E${i + 1}`, name: `E${i + 1}`, isOccupied: Math.random() > 0.85, isSelected: false })) },
    ];
    setHallLayout(layout);
  }, []);

  const fetchMovieInfo = useCallback((id) => {
    const data = dummyShowtimeData[id] || { 
      movie: {title: 'Unknown Movie', poster: 'https://picsum.photos/seed/unknown/300/450'}, 
      hall: 'N/A', 
      time: 'N/A', 
      date: 'N/A' 
    };
    setMovieInfo({
      title: data.movie.title,
      poster: data.movie.poster,
      hall: data.hall,
      time: data.time,
      date: data.date,
    });
  }, []);

  useEffect(() => {
    initializeHallLayout();
    fetchMovieInfo(showtimeId);
  }, [showtimeId, fetchMovieInfo, initializeHallLayout]);

  const handleSeatClick = useCallback((seatId) => {
    const updatedHallLayout = hallLayout.map(row => {
      const updatedSeatsInRow = row.seats.map(seat => {
        if (seat.id === seatId) {
          if (seat.isOccupied) return seat;
          return { ...seat, isSelected: !seat.isSelected };
        }
        return seat;
      });
      return { ...row, seats: updatedSeatsInRow };
    });
    setHallLayout(updatedHallLayout);

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  }, [hallLayout, selectedSeats]);

  const totalSeatsSelected = selectedSeats.length;
  const totalPrice = totalSeatsSelected * ticketPrice;

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero Header */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Select Your Seats
            </span>
          </h1>
          <p className="text-xl text-gray-300">Choose the perfect spot for your movie experience</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cinema Hall</h2>
                <button
                  onClick={() => setView3D(!view3D)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-xl font-semibold hover:bg-purple-600/30 transition-all"
                >
                  {view3D ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span>{view3D ? '2D View' : '3D View'}</span>
                </button>
              </div>

              {view3D ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 bg-blue-900/20 border border-blue-500/20 px-4 py-2 rounded-xl">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">Interactive 3D View</span>
                  </div>
                  <CinemaHall3D 
                    hallLayout={hallLayout} 
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatClick}
                    isVisible={view3D}
                  />
                  <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-2 font-semibold">How to use:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Camera automatically rotates for best view</li>
                      <li>• Hover over seats to highlight them</li>
                      <li>• Click to preview seat view</li>
                      <li>• Seat auto-selects after preview</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mb-8">
                    <div className="relative">
                      <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mb-2"></div>
                      <div className="text-center text-gray-500 text-sm font-semibold tracking-wider">SCREEN</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {hallLayout.map((row, rowIndex) => (
                      <div key={row.rowName || `aisle-${rowIndex}`} className={`flex items-center justify-center ${row.seats.length === 0 ? 'my-6' : ''}`}>
                        {row.seats.length > 0 && (
                          <span className="w-10 h-10 flex items-center justify-center text-sm font-bold text-gray-500 mr-3">
                            {row.rowName}
                          </span>
                        )}
                        <div className={`flex ${row.seats.length === 0 ? 'hidden' : ''} gap-2`}>
                          {row.seats.map(seat => (
                            <button
                              key={seat.id}
                              className={`w-10 h-10 flex items-center justify-center text-xs rounded-lg font-bold transition-all duration-300 transform hover:scale-110 ${
                                seat.isOccupied 
                                  ? 'bg-red-500/30 text-red-400 cursor-not-allowed border border-red-500/50' :
                                  seat.isSelected 
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50 scale-110 border border-green-400' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 border border-gray-600'
                              }`}
                              onClick={() => handleSeatClick(seat.id)}
                            >
                              {seat.name}
                            </button>
                          ))}
                        </div>
                        {row.seats.length === 0 && <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-8 mt-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-700/50 border border-gray-600 rounded-lg"></div>
                  <span className="text-gray-400">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg shadow-green-500/50"></div>
                  <span className="text-gray-400">Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-500/30 border border-red-500/50 rounded-lg"></div>
                  <span className="text-gray-400">Occupied</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/20 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>

            <div className="flex items-start space-x-4 mb-6">
              <img src={movieInfo.poster} alt={movieInfo.title} className="w-20 h-28 object-cover rounded-xl shadow-lg border-2 border-white/10"/>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{movieInfo.title}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{movieInfo.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{movieInfo.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span>{movieInfo.hall}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold">Selected Seats ({totalSeatsSelected})</h3>
              </div>
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seatId => (
                    <span key={seatId} className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-sm font-semibold shadow-lg">
                      {seatId}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No seats selected yet</p>
              )}
            </div>

            <div className="border-t border-white/10 pt-6 mb-6 space-y-3">
              <div className="flex justify-between text-gray-400">
                <span>Ticket Price:</span>
                <span className="text-white font-semibold">${ticketPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Seats Selected:</span>
                <span className="text-white font-semibold">{totalSeatsSelected}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold pt-3 border-t border-white/10">
                <span>Total:</span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/payment">
              <button
                disabled={selectedSeats.length === 0}
                className="group w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Payment</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;