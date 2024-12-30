import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";
import Image from "next/image";
import * as THREE from "three";

const HeroSection = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const technologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "AWS",
    "PostgreSQL",
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    // Scene setup with improved rendering
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Enhanced particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);

    // Create particles in a sphere distribution
    for (let i = 0; i < particlesCount; i++) {
      const radius = 25 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Enhanced gradient colors
      const hue = Math.random() * 0.1 + 0.6;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      speeds[i] = Math.random() * 0.02 + 0.01;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    // Enhanced shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec3 color;
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 4.0 * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Enhanced line material with gradient
    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        void main() {
          float intensity = 1.0 - length(vPosition) / 50.0;
          vec3 color = mix(vec3(0.5, 0.5, 1.0), vec3(0.8, 0.5, 1.0), intensity);
          gl_FragColor = vec4(color, intensity * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.Group();
    scene.add(lines);

    camera.position.z = 40;
    const targetCameraPos = new THREE.Vector3(0, 0, 40);

    // Enhanced mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Improved animation loop
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Smooth particle movement
      const positions = particlesGeometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        const radius = Math.sqrt(
          positions[idx] ** 2 +
            positions[idx + 1] ** 2 +
            positions[idx + 2] ** 2
        );

        // Rotate particles in different orbits
        const angle = speeds[i] * performance.now() * 0.001;
        const x = positions[idx];
        const z = positions[idx + 2];

        positions[idx] = x * Math.cos(angle) - z * Math.sin(angle);
        positions[idx + 2] = x * Math.sin(angle) + z * Math.cos(angle);
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Smooth camera movement
      const targetX = mouseRef.current.x * 5;
      const targetY = mouseRef.current.y * 5;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Dynamic line connections
      lines.children.forEach((line) => line.removeFromParent());

      for (let i = 0; i < particlesCount; i++) {
        const p1 = new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );

        for (let j = i + 1; j < particlesCount; j++) {
          const p2 = new THREE.Vector3(
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );

          const distance = p1.distanceTo(p2);

          if (distance < 12) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              p1,
              p2,
            ]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            lines.add(line);
          }
        }
      }

      renderer.render(scene, camera);
    };

    // Improved resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
      scene.remove(particles);
      scene.remove(lines);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(240, 247, 255, 0.8), rgba(255, 255, 255, 0.8), rgba(245, 243, 255, 0.8))",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100/80 backdrop-blur-sm text-blue-800 rounded-full text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Your Name
                </span>
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Full Stack Developer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Building digital experiences that make a difference. Specialized
              in modern web technologies and passionate about creating
              intuitive, high-performance applications.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/your-cv-link", "_blank")}
                className="px-6 py-3 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-5 h-5" />
                View CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative max-w-md mx-auto">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100/50 to-purple-100/50 backdrop-blur-sm shadow-2xl">
                <Image
                  width={500}
                  height={500}
                  src="https://my-image-storage-bucket-1234.s3.us-east-1.amazonaws.com/photo_2024-10-24_10-59-48.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  🚀 Open to Work
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-4 -bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  💻 Full Stack Developer
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute -bottom-0 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto mt-1" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
