import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ChessKingCanvasProps {
  currentSection?: number; // 0 to 10
  isDark: boolean;
}

const SECTION_IDS = [
  'start',
  'zahlen',
  'leistungen',
  'umsetzung',
  'arbeiten',
  'studio',
  'prozess',
  'faq',
  'system',
  'aktivitaet',
  'kontakt',
];

interface Pose {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  mPosX: number;
  mPosY: number;
  mPosZ: number;
  mScale: number;
}

const SECTION_POSES: Pose[] = [
  // 0: Start (Hero)
  {
    posX: 2.4, posY: -0.2, posZ: 0,
    rotX: 0.12, rotY: -0.45, rotZ: 0.04,
    scale: 1.4,
    mPosX: 0, mPosY: -0.8, mPosZ: 0, mScale: 1.05,
  },
  // 1: By the Numbers (King on left, stats on right)
  {
    posX: -2.6, posY: -0.1, posZ: 0.3,
    rotX: 0.18, rotY: 0.55, rotZ: -0.05,
    scale: 1.35,
    mPosX: 0, mPosY: -0.8, mPosZ: 0.2, mScale: 0.95,
  },
  // 2: Services Design (King on right)
  {
    posX: 2.6, posY: -0.2, posZ: 0.1,
    rotX: 0.08, rotY: -0.65, rotZ: 0.06,
    scale: 1.38,
    mPosX: 0, mPosY: -0.7, mPosZ: 0.1, mScale: 0.95,
  },
  // 3: Services Build (King on left)
  {
    posX: -2.7, posY: -0.1, posZ: 0.2,
    rotX: 0.2, rotY: 0.72, rotZ: -0.06,
    scale: 1.35,
    mPosX: 0, mPosY: -0.7, mPosZ: 0.1, mScale: 0.95,
  },
  // 4: Work / Portfolio (Spatial depth)
  {
    posX: -3.2, posY: -0.3, posZ: -1.2,
    rotX: 0.25, rotY: 0.85, rotZ: -0.08,
    scale: 1.2,
    mPosX: 0, mPosY: -1.0, mPosZ: -1.0, mScale: 0.85,
  },
  // 5: Studio Stack (King on right)
  {
    posX: 2.8, posY: -0.2, posZ: -0.2,
    rotX: 0.12, rotY: -0.52, rotZ: 0.04,
    scale: 1.3,
    mPosX: 0, mPosY: -0.8, mPosZ: -0.2, mScale: 0.9,
  },
  // 6: Process (King on left)
  {
    posX: -2.5, posY: -0.1, posZ: 0.1,
    rotX: 0.16, rotY: 0.62, rotZ: -0.05,
    scale: 1.32,
    mPosX: 0, mPosY: -0.7, mPosZ: 0.1, mScale: 0.9,
  },
  // 7: FAQ (King on left angled)
  {
    posX: -2.8, posY: -0.2, posZ: -0.8,
    rotX: 0.14, rotY: 0.75, rotZ: -0.06,
    scale: 1.25,
    mPosX: 0, mPosY: -0.9, mPosZ: -0.6, mScale: 0.85,
  },
  // 8: The System Bento Grid (Receded deep)
  {
    posX: -3.4, posY: -0.5, posZ: -1.8,
    rotX: 0.22, rotY: 0.92, rotZ: -0.07,
    scale: 1.1,
    mPosX: 0, mPosY: -1.1, mPosZ: -1.4, mScale: 0.75,
  },
  // 9: Activity Heatmap
  {
    posX: -3.2, posY: -0.4, posZ: -1.4,
    rotX: 0.2, rotY: 0.82, rotZ: -0.06,
    scale: 1.15,
    mPosX: 0, mPosY: -1.0, mPosZ: -1.0, mScale: 0.8,
  },
  // 10: Contact (Majestic centerpiece)
  {
    posX: 0, posY: -0.1, posZ: -0.4,
    rotX: 0.05, rotY: 0.0, rotZ: 0.0,
    scale: 1.45,
    mPosX: 0, mPosY: -0.6, mPosZ: -0.4, mScale: 1.0,
  },
];

export const ChessKingCanvas: React.FC<ChessKingCanvasProps> = ({ currentSection, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    kingGroup: THREE.Group;
    ambientLight: THREE.AmbientLight;
    keyLight: THREE.DirectionalLight;
    rimLight: THREE.DirectionalLight;
    fillLight: THREE.PointLight;
    materials: THREE.Material[];
    targetPos: { x: number; y: number; z: number };
    targetRot: { x: number; y: number; z: number };
    targetScale: number;
    mouse: { x: number; y: number };
    rafId: number;
    updateScrollPose: () => void;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Materials
    const kingMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x141416 : 0xe4e4e0,
      roughness: isDark ? 0.3 : 0.22,
      metalness: isDark ? 0.72 : 0.2,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.92,
      emissive: 0x553d08,
      emissiveIntensity: 0.25,
    });

    // 4. Build Intricate Staunton King 3D Geometry
    const kingGroup = new THREE.Group();

    // Lathe profile points for classic Staunton King body
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -3.2));
    points.push(new THREE.Vector2(1.85, -3.2)); // wide base
    points.push(new THREE.Vector2(1.85, -2.95));
    points.push(new THREE.Vector2(1.7, -2.85));
    points.push(new THREE.Vector2(1.65, -2.55));
    points.push(new THREE.Vector2(1.4, -2.35)); // lower tier
    points.push(new THREE.Vector2(1.35, -2.05));
    points.push(new THREE.Vector2(1.1, -1.75));
    points.push(new THREE.Vector2(0.9, -1.0)); // waist starts
    points.push(new THREE.Vector2(0.72, 0.0)); // slender waist
    points.push(new THREE.Vector2(0.8, 0.7));
    points.push(new THREE.Vector2(1.12, 0.95)); // collar lower
    points.push(new THREE.Vector2(1.18, 1.15)); // collar rim
    points.push(new THREE.Vector2(0.95, 1.25)); // neck indent
    points.push(new THREE.Vector2(1.0, 1.45));
    points.push(new THREE.Vector2(1.38, 2.35)); // crown bell flare
    points.push(new THREE.Vector2(1.45, 2.55)); // crown upper lip
    points.push(new THREE.Vector2(1.22, 2.62));
    points.push(new THREE.Vector2(0.65, 2.75)); // crown top bowl
    points.push(new THREE.Vector2(0.0, 2.78)); // center top

    const kingBodyGeo = new THREE.LatheGeometry(points, 48);
    kingBodyGeo.computeVertexNormals();
    const kingBody = new THREE.Mesh(kingBodyGeo, kingMaterial);
    kingGroup.add(kingBody);

    // Decorative Gold Collar Ring
    const collarRingGeo = new THREE.TorusGeometry(1.16, 0.07, 16, 48);
    collarRingGeo.rotateX(Math.PI / 2);
    collarRingGeo.translate(0, 1.05, 0);
    const collarRing = new THREE.Mesh(collarRingGeo, goldMaterial);
    kingGroup.add(collarRing);

    // Decorative Gold Crown Filigree Ring
    const crownRingGeo = new THREE.TorusGeometry(1.42, 0.06, 16, 48);
    crownRingGeo.rotateX(Math.PI / 2);
    crownRingGeo.translate(0, 2.52, 0);
    const crownRing = new THREE.Mesh(crownRingGeo, goldMaterial);
    kingGroup.add(crownRing);

    // Crown battlements / crenellations (8 mini spheres around crown rim)
    const crenelCount = 8;
    const crenelRadius = 1.34;
    const crenelGeo = new THREE.SphereGeometry(0.12, 16, 16);
    for (let i = 0; i < crenelCount; i++) {
      const angle = (i / crenelCount) * Math.PI * 2;
      const crenel = new THREE.Mesh(crenelGeo, goldMaterial);
      crenel.position.set(
        Math.cos(angle) * crenelRadius,
        2.62,
        Math.sin(angle) * crenelRadius
      );
      kingGroup.add(crenel);
    }

    // Crown Dome Cap
    const capGeo = new THREE.SphereGeometry(0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    capGeo.translate(0, 2.72, 0);
    const cap = new THREE.Mesh(capGeo, kingMaterial);
    kingGroup.add(cap);

    // Finial Pedestal
    const finialPedestalGeo = new THREE.CylinderGeometry(0.18, 0.28, 0.32, 24);
    finialPedestalGeo.translate(0, 3.32, 0);
    const finialPedestal = new THREE.Mesh(finialPedestalGeo, goldMaterial);
    kingGroup.add(finialPedestal);

    // Iconic Staunton King Cross Finial
    const crossGroup = new THREE.Group();
    const vertCrossGeo = new THREE.BoxGeometry(0.2, 0.95, 0.16);
    vertCrossGeo.translate(0, 3.85, 0);
    const vertCross = new THREE.Mesh(vertCrossGeo, goldMaterial);
    crossGroup.add(vertCross);

    const horizCrossGeo = new THREE.BoxGeometry(0.72, 0.2, 0.16);
    horizCrossGeo.translate(0, 3.98, 0);
    const horizCross = new THREE.Mesh(horizCrossGeo, goldMaterial);
    crossGroup.add(horizCross);

    const gemGeo = new THREE.OctahedronGeometry(0.14);
    gemGeo.translate(0, 3.98, 0);
    const gem = new THREE.Mesh(gemGeo, goldMaterial);
    crossGroup.add(gem);

    kingGroup.add(crossGroup);

    // Initial scale and position
    kingGroup.position.set(2.4, -0.2, 0);
    kingGroup.rotation.set(0.12, -0.45, 0.04);
    kingGroup.scale.set(1.4, 1.4, 1.4);
    scene.add(kingGroup);

    // 5. Lighting matching scfo.de studio photography
    const ambientLight = new THREE.AmbientLight(isDark ? 0x222228 : 0x888890, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.4 : 1.8);
    keyLight.position.set(-5, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, isDark ? 4.2 : 2.5);
    rimLight.position.set(7, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x4a6b82, isDark ? 1.5 : 0.8, 20);
    fillLight.position.set(-4, -3, 5);
    scene.add(fillLight);

    // Function to compute continuous real-time pose from scroll
    const updateScrollPose = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth < 1024;

      // Locate centers of all sections
      const centers: number[] = [];
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          if (i === 0) {
            centers.push(0);
          } else if (i === SECTION_IDS.length - 1) {
            centers.push(top + el.offsetHeight * 0.4);
          } else {
            centers.push(top + el.offsetHeight * 0.35);
          }
        } else {
          centers.push(i * window.innerHeight);
        }
      }

      // Calculate continuous progress across the section centers
      let progress = 0;
      const lastIdx = centers.length - 1;

      if (scrollY <= centers[0]) {
        progress = 0;
      } else if (scrollY >= centers[lastIdx]) {
        progress = lastIdx;
      } else {
        for (let i = 0; i < lastIdx; i++) {
          if (scrollY >= centers[i] && scrollY <= centers[i + 1]) {
            const dist = Math.max(1, centers[i + 1] - centers[i]);
            const rawT = (scrollY - centers[i]) / dist;
            const clampedT = Math.max(0, Math.min(1, rawT));
            // Hermite/smoothstep curve for silky continuous transitions
            const smoothT = clampedT * clampedT * (3 - 2 * clampedT);
            progress = i + smoothT;
            break;
          }
        }
      }

      // Interpolate between the bounding poses
      const baseIdx = Math.floor(progress);
      const nextIdx = Math.min(baseIdx + 1, SECTION_POSES.length - 1);
      const t = progress - baseIdx;

      const p0 = SECTION_POSES[baseIdx];
      const p1 = SECTION_POSES[nextIdx];

      const x0 = isMobile ? p0.mPosX : p0.posX;
      const x1 = isMobile ? p1.mPosX : p1.posX;
      const y0 = isMobile ? p0.mPosY : p0.posY;
      const y1 = isMobile ? p1.mPosY : p1.posY;
      const z0 = isMobile ? p0.mPosZ : p0.posZ;
      const z1 = isMobile ? p1.mPosZ : p1.posZ;
      const s0 = isMobile ? p0.mScale : p0.scale;
      const s1 = isMobile ? p1.mScale : p1.scale;

      state.targetPos.x = x0 + (x1 - x0) * t;
      state.targetPos.y = y0 + (y1 - y0) * t;
      state.targetPos.z = z0 + (z1 - z0) * t;

      state.targetRot.x = p0.rotX + (p1.rotX - p0.rotX) * t;
      state.targetRot.y = p0.rotY + (p1.rotY - p0.rotY) * t;
      state.targetRot.z = p0.rotZ + (p1.rotZ - p0.rotZ) * t;

      state.targetScale = s0 + (s1 - s0) * t;
    };

    // 6. Animation loop state
    const state = {
      renderer,
      scene,
      camera,
      kingGroup,
      ambientLight,
      keyLight,
      rimLight,
      fillLight,
      materials: [kingMaterial, goldMaterial],
      targetPos: { x: 2.4, y: -0.2, z: 0 },
      targetRot: { x: 0.12, y: -0.45, z: 0.04 },
      targetScale: 1.4,
      mouse: { x: 0, y: 0 },
      rafId: 0,
      updateScrollPose,
    };
    sceneRef.current = state;

    // Run initial pose calculation immediately
    updateScrollPose();

    // Mouse movement parallax listener
    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      state.mouse.x = normX;
      state.mouse.y = normY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Instant continuous scroll listener: fires immediately with zero delay
    const onScroll = () => {
      updateScrollPose();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize listener
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateScrollPose();
    };
    window.addEventListener('resize', onResize);

    // Render loop with responsive, low-latency spring tracking
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      // Increased lerp factor: 8.0 * delta (~13% per frame) for snappy immediate response
      const lerpFactor = Math.min(1.0, 8.0 * delta);

      // Mouse parallax offsets
      const mouseParallaxX = state.mouse.x * 0.35;
      const mouseParallaxY = state.mouse.y * 0.25;

      // Smooth position interpolation
      kingGroup.position.x += (state.targetPos.x + mouseParallaxX * 0.25 - kingGroup.position.x) * lerpFactor;
      kingGroup.position.y += (state.targetPos.y + mouseParallaxY * 0.25 - kingGroup.position.y) * lerpFactor;
      kingGroup.position.z += (state.targetPos.z - kingGroup.position.z) * lerpFactor;

      // Smooth rotation interpolation
      kingGroup.rotation.x += (state.targetRot.x - mouseParallaxY * 0.15 - kingGroup.rotation.x) * lerpFactor;
      kingGroup.rotation.y += (state.targetRot.y + mouseParallaxX * 0.3 - kingGroup.rotation.y) * lerpFactor;
      kingGroup.rotation.z += (state.targetRot.z - kingGroup.rotation.z) * lerpFactor;

      // Smooth scale interpolation
      const currentScale = kingGroup.scale.x;
      const newScale = currentScale + (state.targetScale - currentScale) * lerpFactor;
      kingGroup.scale.set(newScale, newScale, newScale);

      // Subtle breathing float animation
      const elapsedTime = clock.getElapsedTime();
      kingGroup.position.y += Math.sin(elapsedTime * 1.4) * 0.0012;

      renderer.render(scene, camera);
      state.rafId = requestAnimationFrame(animate);
    };

    state.rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(state.rafId);
      renderer.dispose();
      kingBodyGeo.dispose();
      collarRingGeo.dispose();
      crownRingGeo.dispose();
      crenelGeo.dispose();
      capGeo.dispose();
      finialPedestalGeo.dispose();
      vertCrossGeo.dispose();
      horizCrossGeo.dispose();
      gemGeo.dispose();
      kingMaterial.dispose();
      goldMaterial.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, []);

  // Update Section Camera Choreography if triggered externally
  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;
    s.updateScrollPose();
  }, [currentSection]);

  // Update Dark / Light Mode Palette
  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;

    const kingMat = s.materials[0] as THREE.MeshStandardMaterial;
    if (kingMat) {
      kingMat.color.setHex(isDark ? 0x141416 : 0xe4e4e0);
      kingMat.roughness = isDark ? 0.3 : 0.22;
      kingMat.metalness = isDark ? 0.72 : 0.2;
    }

    s.ambientLight.color.setHex(isDark ? 0x222228 : 0x888890);
    s.ambientLight.intensity = isDark ? 1.5 : 1.8;
    s.keyLight.intensity = isDark ? 2.4 : 2.0;
    s.rimLight.intensity = isDark ? 4.2 : 3.0;
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
    />
  );
};

