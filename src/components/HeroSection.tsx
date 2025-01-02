import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";
import Image from "next/image";
import * as THREE from "three";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>();

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

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create DNA strands
    const createStrand = () => {
      const points: THREE.Vector3[] = [];
      const radius = 8;
      const height = 40;
      const turns = 3;
      const pointsPerTurn = 30;
      const totalPoints = turns * pointsPerTurn;

      for (let i = 0; i < totalPoints; i++) {
        const angle = (i / pointsPerTurn) * Math.PI * 2;
        const y = (i / totalPoints) * height - height / 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }

      return points;
    };

    // Custom shader for glowing effect
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#4a90e2") },
        color2: { value: new THREE.Color("#9b51e0") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 3.0;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float noise = sin(vPosition.y * 0.2 + time);
          vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
          float alpha = 0.8 - distance(gl_PointCoord, vec2(0.5));
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    // Create multiple DNA strands
    const strands: THREE.Points[] = [];
    const strandCount = 3;

    for (let i = 0; i < strandCount; i++) {
      const points = createStrand();
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Add random offset for each point
      const positionAttribute = geometry.getAttribute("position");
      const positions = positionAttribute.array;
      for (let j = 0; j < positions.length; j += 3) {
        positions[j] += (Math.random() - 0.5) * 0.5;
        positions[j + 1] += (Math.random() - 0.5) * 0.5;
        positions[j + 2] += (Math.random() - 0.5) * 0.5;
      }

      const strand = new THREE.Points(geometry, glowMaterial.clone());
      strand.rotation.x = Math.random() * Math.PI;
      strand.rotation.z = i * (Math.PI / strandCount);
      strands.push(strand);
      scene.add(strand);

      // Add connecting lines
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.rotation.copy(strand.rotation);
      scene.add(line);
    }

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let isMouseMoving = false;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.y * 0.5;
      targetRotation.y = mouse.x * 0.5;
      isMouseMoving = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth animation
    const clock = new THREE.Clock();
    const currentRotation = new THREE.Vector2();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth rotation
      if (isMouseMoving) {
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      } else {
        // Auto-rotation when no mouse movement
        currentRotation.y += 0.001;
      }

      strands.forEach((strand, i) => {
        strand.rotation.x = currentRotation.x;
        strand.rotation.y = currentRotation.y + i * (Math.PI / strandCount);

        const material = strand.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
      });

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Reset mouse movement flag periodically
    setInterval(() => {
      isMouseMoving = false;
    }, 3000);

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      strands.forEach((strand) => {
        strand.geometry.dispose();
        (strand.material as THREE.ShaderMaterial).dispose();
      });
      renderer.dispose();
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background: "var(--gradient-background)",
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
              <span className="inline-block px-4 py-2 bg-primary/10 backdrop-blur-sm text-primary rounded-full text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Tan Hangsapho
                </span>
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Full Stack Developer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl"
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
                  className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-shadow duration-300 border"
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
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1OunQR9djK8CL5V0SFJoBCncjCH6gYLnX/view?usp=sharing",
                    "_blank"
                  )
                }
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
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
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm shadow-2xl">
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
                className="absolute -right-4 -top-4 bg-background/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border"
              >
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
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
                className="absolute -left-4 -bottom-7 bg-background/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border"
              >
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
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
          className="absolute bottom-4 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span
              className="text-sm text-muted-foreground cursor-pointer"
              onClick={scrollToAbout}
            >
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto mt-1" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
