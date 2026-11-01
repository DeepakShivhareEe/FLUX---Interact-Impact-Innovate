import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ideathoncomp from "/src/assets/images/ideathoncomp.webp";
import conferenceImg from "/src/assets/images/conferenceImg.webp";
import atalFdp from "/src/assets/images/atalFdp.webp";
import sheLeadsBanner from "/src/assets/images/she_leads_hero_banner.jpg";

gsap.registerPlugin(ScrollTrigger);

interface AchievementData {
  id: string;
  theme: "offwhite" | "graphite" | "midgrey";
  titleLine1: string;
  titleLine2: string;
  dateLine: string;
  teamName: string;
  institution: string;
  description: string;
  image: string;
  link: string;
  yaw: number; // in radians
}

export default function AchievementScene() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const headingScreenRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const [activeMobileCard, setActiveMobileCard] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const achievements: AchievementData[] = [
    {
      id: "01",
      theme: "offwhite",
      titleLine1: "Ideathon 2025.",
      titleLine2: "1st Prize & Innovation Podium.",
      dateLine: "DECEMBER 17 - 19, 2025 // INNOVATION SPRINT",
      teamName: "FLUX INNOVATION & HARDWARE CELL",
      institution: "MADAN MOHAN MALAVIYA UNIVERSITY OF TECHNOLOGY",
      description: "Flagship 3-day multidisciplinary innovation sprint engineering viable prototypes evaluated by industry evaluators.",
      image: ideathoncomp,
      link: "/ideathon",
      yaw: 0.14, // ~+8 deg
    },
    {
      id: "02",
      theme: "graphite",
      titleLine1: "ByteBrawl Hackathon.",
      titleLine2: "Final Podium & Winners.",
      dateLine: "OCTOBER 26 - 29, 2026 // ANNUAL HACKATHON",
      teamName: "FLUX DEV & ALGORITHMS WING",
      institution: "DEPARTMENT OF COMPUTER SCIENCE & ENG., MMMUT",
      description: "High-intensity competitive coding showdown successfully concluded with grand podium champions 2 Pointer Approach, Quarks, and Team nakshatra.",
      image: conferenceImg,
      link: "/events/bytebrawl-hacktoberfest",
      yaw: -0.14, // ~-8 deg
    },
    {
      id: "03",
      theme: "midgrey",
      titleLine1: "ATAL FDP 2026.",
      titleLine2: "Mechanistic Interpretability.",
      dateLine: "JANUARY 19 - 24, 2026 // AICTE ATAL ACADEMY",
      teamName: "RESEARCH CELL & CSE FACULTY",
      institution: "DEPARTMENT OF COMPUTER SCIENCE & ENG., MMMUT",
      description: "Advanced deep dive into the hidden mathematical science of Mechanistic Interpretability, neural representation circuits, and explainable AI.",
      image: atalFdp,
      link: "/events/fdp",
      yaw: 0.12, // ~+7 deg
    },
    {
      id: "04",
      theme: "offwhite",
      titleLine1: "She Leads.",
      titleLine2: "Women in Tech Leadership.",
      dateLine: "SEPTEMBER 12 - 13 // ANNUAL SUMMIT",
      teamName: "FLUX WOMEN IN TECH INITIATIVE",
      institution: "DEPARTMENT OF COMPUTER SCIENCE & ENG., MMMUT",
      description: "Annual She Leads summit honoring excellence in technology leadership, interactive masterclasses, and executive mentorship.",
      image: sheLeadsBanner,
      link: "/she-leads",
      yaw: -0.14, // ~-8 deg
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const container = canvasContainerRef.current;
    const section = sectionRef.current;
    const headingScreen = headingScreenRef.current;
    if (!container || !section) return;

    let animId: number;
    let isVisible = true;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // ─────────────────────────────────────────────────────────────
    // 1. SCENE, CAMERA, RENDERER
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // Backdrop canvas with vertical gradient & soft glow on the left
    const bgCanvas = document.createElement("canvas");
    bgCanvas.width = 1024;
    bgCanvas.height = 1024;
    const bgCtx = bgCanvas.getContext("2d")!;

    // Base vertical gradient
    const vGrad = bgCtx.createLinearGradient(0, 0, 0, 1024);
    vGrad.addColorStop(0, "#08080a");
    vGrad.addColorStop(0.5, "#0d0d12");
    vGrad.addColorStop(1, "#141419");
    bgCtx.fillStyle = vGrad;
    bgCtx.fillRect(0, 0, 1024, 1024);

    // Soft grey-white glow rising from horizon on the left side (18-25% intensity)
    const leftGlow = bgCtx.createRadialGradient(240, 840, 40, 240, 840, 680);
    leftGlow.addColorStop(0, "rgba(220, 222, 232, 0.22)");
    leftGlow.addColorStop(0.5, "rgba(180, 182, 195, 0.08)");
    leftGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    bgCtx.fillStyle = leftGlow;
    bgCtx.fillRect(0, 0, 1024, 1024);

    // Darker vignette on the right
    const rightVignette = bgCtx.createRadialGradient(980, 512, 100, 980, 512, 750);
    rightVignette.addColorStop(0, "rgba(4, 4, 6, 0.58)");
    rightVignette.addColorStop(1, "rgba(0, 0, 0, 0)");
    bgCtx.fillStyle = rightVignette;
    bgCtx.fillRect(0, 0, 1024, 1024);

    // Faint vertical light streaks in sky
    const streaks = [190, 280, 410, 550, 710];
    streaks.forEach((sx) => {
      const streakGrad = bgCtx.createLinearGradient(sx, 0, sx, 1024);
      streakGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      streakGrad.addColorStop(0.35, "rgba(230, 235, 245, 0.045)");
      streakGrad.addColorStop(0.7, "rgba(195, 200, 215, 0.015)");
      streakGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      bgCtx.fillStyle = streakGrad;
      bgCtx.fillRect(sx - 18, 0, 36, 1024);
    });

    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    scene.background = bgTexture;

    // Fog matching backdrop for terrain dissolution
    const fogColor = new THREE.Color(0x0e0e12);
    scene.fog = new THREE.FogExp2(fogColor, 0.022);

    // Camera: FOV 50
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // ─────────────────────────────────────────────────────────────
    // 2. LIGHTING (Flat shading catches facets on terrain)
    // ─────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x282830, 0.60);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xdcdce4, 1.6);
    dirLight.position.set(-16, 14, 10);
    scene.add(dirLight);

    // ─────────────────────────────────────────────────────────────
    // 3. 3D CERTIFICATE CARDS & CONTAINED POSTER PLANES
    // ─────────────────────────────────────────────────────────────
    const cardW = 4.8;
    const cardH = 6.4;
    const cardThickness = 0.035;

    // Card positions along track
    const cardPositions = [
      { x: -3.4, y: 1.25, z: 4.0 },
      { x: 2.8, y: 1.25, z: -5.0 },
      { x: -3.2, y: 1.25, z: -14.0 },
      { x: 2.6, y: 1.25, z: -23.0 },
    ];

    const themeColors = {
      offwhite: {
        bg: "#d9d9dc",
        text: "#141416",
        muted: "#505058",
        rule: "rgba(20, 20, 22, 0.22)",
        photoBorder: "rgba(20, 20, 22, 0.18)",
        threeBg: 0xd9d9dc,
      },
      graphite: {
        bg: "#26262a",
        text: "#e6e6e8",
        muted: "#9a9aa2",
        rule: "rgba(230, 230, 232, 0.22)",
        photoBorder: "rgba(230, 230, 232, 0.18)",
        threeBg: 0x26262a,
      },
      midgrey: {
        bg: "#8e8e94",
        text: "#111111",
        muted: "#34343a",
        rule: "rgba(17, 17, 17, 0.24)",
        photoBorder: "rgba(17, 17, 17, 0.2)",
        threeBg: 0x8e8e94,
      },
    };

    const panelsGroup = new THREE.Group();
    const panelGroups: THREE.Group[] = [];
    const panelMeshes: THREE.Mesh[] = [];
    const panelMaterials: {
      front: THREE.MeshBasicMaterial;
      sides: THREE.MeshBasicMaterial;
      poster: THREE.MeshBasicMaterial;
    }[] = [];
    const disposables: { dispose: () => void }[] = [];

    // Helper to draw geometric Flux mark
    const drawFluxMark = (
      ctx: CanvasRenderingContext2D,
      ox: number,
      oy: number,
      size: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      const s = size / 250;
      const blocks = [
        [0, 0, 50, 50],
        [100, 0, 150, 50],
        [50, 50, 50, 50],
        [0, 100, 50, 50],
        [150, 100, 100, 50],
        [100, 150, 50, 50],
        [0, 200, 100, 50],
      ];
      for (const [bx, by, bw, bh] of blocks) {
        ctx.fillRect(ox + bx * s, oy + by * s, bw * s, bh * s);
      }
    };

    achievements.forEach((ach, idx) => {
      const pos = cardPositions[idx];
      const theme = themeColors[ach.theme];

      const cardG = new THREE.Group();
      cardG.position.set(pos.x, pos.y, pos.z);
      cardG.rotation.y = isMobile ? ach.yaw * 0.7 : ach.yaw;

      const cardGeom = new THREE.BoxGeometry(cardW, cardH, cardThickness);
      disposables.push(cardGeom);

      // High-resolution Canvas Texture for Certificate Card Face (1400 x 1860)
      const cv = document.createElement("canvas");
      cv.width = 1400;
      cv.height = 1860;
      const ctx = cv.getContext("2d")!;

      const renderCanvasContent = () => {
        // Solid flat card background (no borders, no corner squares, no frosted glass)
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, 1400, 1860);

        // 1. Small Flux logo mark top-left
        drawFluxMark(ctx, 110, 100, 52, theme.text);

        ctx.fillStyle = theme.text;
        ctx.font = "bold 22px 'Space Mono', monospace";
        ctx.fillText("FLUX // CITATION", 182, 128);

        ctx.fillStyle = theme.muted;
        ctx.font = "14px 'Space Mono', monospace";
        ctx.fillText("MMMUT GORAKHPUR • CSE", 182, 150);

        // 2. Large two-line title
        ctx.fillStyle = theme.text;
        ctx.font = "bold 70px 'Space Grotesk', sans-serif";
        ctx.fillText(ach.titleLine1, 110, 275);

        ctx.fillStyle = theme.muted;
        ctx.font = "italic 42px 'Playfair Display', serif";
        ctx.fillText(ach.titleLine2, 110, 345);

        // 3. Date line & divider
        ctx.strokeStyle = theme.rule;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(110, 400);
        ctx.lineTo(1290, 400);
        ctx.stroke();

        ctx.fillStyle = theme.text;
        ctx.font = "bold 19px 'Space Mono', monospace";
        ctx.fillText(ach.dateLine, 110, 442);

        // 4. Team / winner name in bold uppercase
        ctx.fillStyle = theme.text;
        ctx.font = "bold 36px 'Space Grotesk', sans-serif";
        ctx.fillText(ach.teamName, 110, 520);

        ctx.fillStyle = theme.muted;
        ctx.font = "17px 'Space Mono', monospace";
        ctx.fillText(ach.institution, 110, 560);

        // 5. Short grey description line
        ctx.fillStyle = theme.muted;
        ctx.font = "22px 'Space Grotesk', sans-serif";
        ctx.fillText(ach.description, 110, 625);

        // Subtle boundary frame for poster area
        ctx.strokeStyle = theme.photoBorder;
        ctx.lineWidth = 1;
        ctx.strokeRect(100, 675, 1200, 565);

        // 6. Bottom citation verification details (clean official citation record)
        ctx.strokeStyle = theme.rule;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(110, 1340);
        ctx.lineTo(470, 1340);
        ctx.stroke();

        ctx.fillStyle = theme.muted;
        ctx.font = "bold 13px 'Space Mono', monospace";
        ctx.fillText("DEPARTMENT OF COMPUTER SCIENCE & ENG.", 110, 1370);

        ctx.strokeStyle = theme.rule;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(840, 1340);
        ctx.lineTo(1200, 1340);
        ctx.stroke();

        ctx.fillStyle = theme.muted;
        ctx.font = "bold 13px 'Space Mono', monospace";
        ctx.fillText("MMMUT GORAKHPUR // UTTAR PRADESH", 840, 1370);

        // Small "flux" wordmark bottom-left
        ctx.fillStyle = theme.text;
        ctx.font = "bold 34px 'Space Grotesk', sans-serif";
        ctx.fillText("flux", 110, 1460);

        ctx.fillStyle = theme.muted;
        ctx.font = "15px 'Space Mono', monospace";
        ctx.fillText("• VERIFIED CITATION RECORD", 195, 1456);

        // 7. Tiny vertical text strip on right edge ("OFFICIAL RECOGNITION // 2026")
        ctx.save();
        ctx.translate(1348, 860);
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = theme.muted;
        ctx.font = "bold 15px 'Space Mono', monospace";
        ctx.fillText("OFFICIAL RECOGNITION // 2026", 0, 0);
        ctx.restore();

        frontTex.needsUpdate = true;
      };

      const frontTex = new THREE.CanvasTexture(cv);
      frontTex.colorSpace = THREE.SRGBColorSpace;
      frontTex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 16);
      frontTex.generateMipmaps = true;
      frontTex.minFilter = THREE.LinearMipmapLinearFilter;
      frontTex.magFilter = THREE.LinearFilter;
      disposables.push(frontTex);

      renderCanvasContent();

      document.fonts.ready.then(() => {
        renderCanvasContent();
      });

      // Card face material: unlit MeshBasicMaterial with toneMapped: false and fog: false
      // Ensures active card displays its exact real color (#d9d9dc, #26262a, #8e8e94)
      const frontMat = new THREE.MeshBasicMaterial({
        map: frontTex,
        toneMapped: false,
        fog: false,
        transparent: true,
        opacity: idx === 0 ? 1.0 : 0.6,
      });

      const sideMat = new THREE.MeshBasicMaterial({
        color: theme.threeBg,
        toneMapped: false,
        fog: false,
        transparent: true,
        opacity: idx === 0 ? 1.0 : 0.6,
      });
      disposables.push(frontMat, sideMat);

      const materials = [sideMat, sideMat, sideMat, sideMat, frontMat, sideMat];

      const panelMesh = new THREE.Mesh(cardGeom, materials);
      panelMesh.userData = { link: ach.link, title: ach.titleLine1 };
      cardG.add(panelMesh);

      // ─────────────────────────────────────────────────────────────
      // UNLIT DEDICATED POSTER PLANE (CONTAINED, FULL COLOR, NO CROP)
      // ─────────────────────────────────────────────────────────────
      const posterGeom = new THREE.PlaneGeometry(3.9, 1.95);
      disposables.push(posterGeom);

      const posterMat = new THREE.MeshBasicMaterial({
        toneMapped: false,
        fog: false,
        transparent: true,
        opacity: idx === 0 ? 1.0 : 0.6,
      });
      disposables.push(posterMat);

      const posterMesh = new THREE.Mesh(posterGeom, posterMat);
      // Centered in poster area
      posterMesh.position.set(0, -0.11, cardThickness / 2 + 0.003);
      posterMesh.userData = { link: ach.link, title: ach.titleLine1 };
      cardG.add(posterMesh);

      // Load full-color image and apply "contain" fitting with edge-only gradient
      const imgEl = new Image();
      imgEl.src = ach.image;

      const handleImageLoad = () => {
        const iw = imgEl.naturalWidth;
        const ih = imgEl.naturalHeight;
        if (!iw || !ih) return;

        const posterCv = document.createElement("canvas");
        posterCv.width = iw;
        posterCv.height = ih;
        const pCtx = posterCv.getContext("2d")!;

        // 1. Full vivid color (NO grayscale, NO desaturation filter)
        pCtx.drawImage(imgEl, 0, 0);

        // 2. Very light dark gradient on poster edges only (max 10% opacity)
        const edgeX = Math.round(iw * 0.04);
        const edgeY = Math.round(ih * 0.04);

        // Left edge
        const gL = pCtx.createLinearGradient(0, 0, edgeX, 0);
        gL.addColorStop(0, "rgba(0, 0, 0, 0.10)");
        gL.addColorStop(1, "rgba(0, 0, 0, 0)");
        pCtx.fillStyle = gL;
        pCtx.fillRect(0, 0, edgeX, ih);

        // Right edge
        const gR = pCtx.createLinearGradient(iw, 0, iw - edgeX, 0);
        gR.addColorStop(0, "rgba(0, 0, 0, 0.10)");
        gR.addColorStop(1, "rgba(0, 0, 0, 0)");
        pCtx.fillStyle = gR;
        pCtx.fillRect(iw - edgeX, 0, edgeX, ih);

        // Top edge
        const gT = pCtx.createLinearGradient(0, 0, 0, edgeY);
        gT.addColorStop(0, "rgba(0, 0, 0, 0.10)");
        gT.addColorStop(1, "rgba(0, 0, 0, 0)");
        pCtx.fillStyle = gT;
        pCtx.fillRect(0, 0, iw, edgeY);

        // Bottom edge
        const gB = pCtx.createLinearGradient(0, ih, 0, ih - edgeY);
        gB.addColorStop(0, "rgba(0, 0, 0, 0.10)");
        gB.addColorStop(1, "rgba(0, 0, 0, 0)");
        pCtx.fillStyle = gB;
        pCtx.fillRect(0, ih - edgeY, iw, edgeY);

        const posterTex = new THREE.CanvasTexture(posterCv);
        posterTex.colorSpace = THREE.SRGBColorSpace;
        posterTex.minFilter = THREE.LinearMipmapLinearFilter;
        posterTex.magFilter = THREE.LinearFilter;
        posterTex.generateMipmaps = true;
        disposables.push(posterTex);

        // Size poster plane to real aspect ratio with "contain" fit
        const imgAspect = iw / ih;
        const maxPosterW = 4.0;
        const maxPosterH = 2.0;
        const areaAspect = maxPosterW / maxPosterH;

        let finalW = maxPosterW;
        let finalH = maxPosterH;
        if (imgAspect > areaAspect) {
          finalH = maxPosterW / imgAspect;
        } else {
          finalW = maxPosterH * imgAspect;
        }

        posterMesh.geometry.dispose();
        posterMesh.geometry = new THREE.PlaneGeometry(finalW, finalH);
        disposables.push(posterMesh.geometry);

        posterMat.map = posterTex;
        posterMat.needsUpdate = true;
      };

      if (imgEl.complete && imgEl.naturalWidth > 0) {
        handleImageLoad();
      } else {
        imgEl.onload = handleImageLoad;
      }

      panelGroups.push(cardG);
      panelMeshes.push(panelMesh, posterMesh);
      panelMaterials.push({ front: frontMat, sides: sideMat, poster: posterMat });
      panelsGroup.add(cardG);
    });

    scene.add(panelsGroup);

    // ─────────────────────────────────────────────────────────────
    // 4. TERRAIN: JAGGED LOW-POLY GROUND
    // Wide ground of large irregular triangles (flat-shaded, noise-displaced
    // with sharp peaks and valleys). Dark graphite (#16161a to #1f1f24)
    // with glowing edge lines (25-35% opacity, brighter on ridges).
    // Foreground peaks rise in front of cards to hide bottom 8-12%.
    // Card bottoms are embedded in terrain, never floating.
    // ─────────────────────────────────────────────────────────────
    const terrainW = 110;
    const terrainD = 130;
    const segX = isMobile ? 22 : 44;
    const segZ = isMobile ? 26 : 50;

    const basePlane = new THREE.PlaneGeometry(terrainW, terrainD, segX, segZ);
    basePlane.rotateX(-Math.PI / 2);

    const pRnd = (x: number, z: number) => {
      const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    const bPos = basePlane.attributes.position;
    const cellW = terrainW / segX;
    const cellD = terrainD / segZ;

    for (let i = 0; i < bPos.count; i++) {
      let vx = bPos.getX(i);
      let vz = bPos.getZ(i);

      if (Math.abs(vx) < terrainW * 0.46 && Math.abs(vz) < terrainD * 0.46) {
        vx += (pRnd(vx, vz) - 0.5) * cellW * 0.65;
        vz += (pRnd(vx + 45.1, vz + 31.7) - 0.5) * cellD * 0.65;
        bPos.setX(i, vx);
        bPos.setZ(i, vz);
      }

      const n1 = Math.sin(vx * 0.11 + vz * 0.07) * 1.8;
      const n2 = Math.cos(vx * 0.20 - vz * 0.15) * 1.5;
      const n3 = Math.sin(vx * 0.35) * Math.cos(vz * 0.30) * 1.0;
      const ridge = (1.0 - Math.abs(Math.sin(vx * 0.15 + vz * 0.10))) * 2.8;
      let vy = -2.2 + n1 + n2 + n3 + ridge;

      const distFromTrackX = Math.abs(vx);
      if (distFromTrackX < 6.5) {
        const corridorBlend = distFromTrackX / 6.5;
        vy = THREE.MathUtils.lerp(-1.65, vy, corridorBlend * corridorBlend);
      }

      achievements.forEach((_, cIdx) => {
        const cPos = cardPositions[cIdx];
        const dx = vx - cPos.x;
        const dz = vz - cPos.z;

        // Base embedding
        if (Math.abs(dx) < 3.2 && Math.abs(dz) < 1.4) {
          vy = -1.75 - Math.abs(dx) * 0.04;
        }

        // Foreground jagged peaks
        if (Math.abs(dx) < 2.8 && dz >= 2.0 && dz <= 4.5) {
          const peakDist = Math.hypot(dx * 0.9, dz - 3.2);
          if (peakDist < 2.4) {
            const peakShape = (1.0 - peakDist / 2.4);
            const peakHeight = -1.22 + peakShape * 0.12 + (pRnd(vx * 3.7, vz * 2.9) - 0.5) * 0.18;
            vy = Math.max(vy, peakHeight);
          }
        }
      });

      if (vz > 6.0 && Math.abs(vx) < 5.5) {
        vy = Math.min(vy, -1.50);
      }

      bPos.setY(i, vy);
    }

    const terrainGeom = basePlane.toNonIndexed();
    terrainGeom.computeVertexNormals();

    const tPos = terrainGeom.attributes.position;
    const colors = new Float32Array(tPos.count * 3);
    const baseColor = new THREE.Color(0x19191e);

    for (let i = 0; i < tPos.count; i += 3) {
      const triX = tPos.getX(i);
      const triZ = tPos.getZ(i);
      const lumOffset = (pRnd(triX * 5.7, triZ * 3.3) - 0.5) * 0.08;
      const triColor = baseColor.clone();
      triColor.r = Math.min(0.14, Math.max(0.08, triColor.r + lumOffset));
      triColor.g = Math.min(0.14, Math.max(0.08, triColor.g + lumOffset));
      triColor.b = Math.min(0.17, Math.max(0.10, triColor.b + lumOffset));

      for (let v = 0; v < 3; v++) {
        colors[(i + v) * 3] = triColor.r;
        colors[(i + v) * 3 + 1] = triColor.g;
        colors[(i + v) * 3 + 2] = triColor.b;
      }
    }
    terrainGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeom, terrainMat);
    scene.add(terrainMesh);

    // Glowing edge lines on triangle edges
    const wireGeom = new THREE.WireframeGeometry(terrainGeom);
    const wPos = wireGeom.attributes.position;
    const wireColors = new Float32Array(wPos.count * 3);

    for (let i = 0; i < wPos.count; i++) {
      const wy = wPos.getY(i);
      const crestT = Math.min(1.0, Math.max(0.0, (wy - (-2.0)) / 4.8));
      const lineLum = 0.35 + 0.65 * Math.pow(crestT, 1.8);
      wireColors[i * 3] = lineLum;
      wireColors[i * 3 + 1] = lineLum;
      wireColors[i * 3 + 2] = lineLum;
    }
    wireGeom.setAttribute("color", new THREE.BufferAttribute(wireColors, 3));

    const wireMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.30,
      fog: true,
    });
    const wireLines = new THREE.LineSegments(wireGeom, wireMat);
    scene.add(wireLines);

    disposables.push(basePlane, terrainGeom, terrainMat, wireGeom, wireMat);

    // ─────────────────────────────────────────────────────────────
    // 5. CAMERA POSITIONING & ACTIVE BRIGHTNESS / LERP DIMMING
    // ─────────────────────────────────────────────────────────────
    const computeStops = () => {
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const aspect = width / height;

      const targetDistH = cardH / (2 * Math.tan(fovRad / 2) * 0.66);
      const targetDistW = cardW / (2 * Math.tan(fovRad / 2) * aspect * 0.78);
      const targetDist = Math.max(targetDistH, targetDistW);

      return achievements.map((ach, idx) => {
        const cPos = cardPositions[idx];
        const camPos = new THREE.Vector3(cPos.x, -0.30, cPos.z + targetDist);
        const lookTarget = new THREE.Vector3(cPos.x, 1.20, cPos.z);
        return { camPos, lookTarget, targetDist };
      });
    };

    let stops = computeStops();

    const camProxy = {
      posX: stops[0].camPos.x,
      posY: stops[0].camPos.y,
      posZ: stops[0].camPos.z,
      lookX: stops[0].lookTarget.x,
      lookY: stops[0].lookTarget.y,
      lookZ: stops[0].lookTarget.z,
      roll: 0,
    };

    camera.position.set(camProxy.posX, camProxy.posY, camProxy.posZ);
    camera.lookAt(camProxy.lookX, camProxy.lookY, camProxy.lookZ);

    const cursor = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      cursor.targetX = (e.clientX / width - 0.5) * 2;
      cursor.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─────────────────────────────────────────────────────────────
    // 6. GSAP SCROLL TIMELINE
    // ─────────────────────────────────────────────────────────────
    let activeTimeline: gsap.core.Timeline | null = null;

    const buildTimeline = () => {
      if (activeTimeline) {
        activeTimeline.scrollTrigger?.kill();
        activeTimeline.kill();
      }

      stops = computeStops();
      const N = achievements.length;

      const animState = { progress: 0 };

      const updateCamera = () => {
        const p = animState.progress;

        let cardProgress = 0;
        if (p > 0.4) {
          cardProgress = Math.min(N - 1, (p - 0.4) / 0.9);
        }

        const segIndex = Math.min(N - 2, Math.floor(cardProgress));
        const segLocal = cardProgress - segIndex;
        const easeP = 0.5 - 0.5 * Math.cos(segLocal * Math.PI);

        const fromStop = stops[segIndex];
        const toStop = stops[segIndex + 1];
        const arcSign = segIndex % 2 === 0 ? 1 : -1;

        const bx = THREE.MathUtils.lerp(fromStop.camPos.x, toStop.camPos.x, easeP);
        const by = THREE.MathUtils.lerp(fromStop.camPos.y, toStop.camPos.y, easeP);
        const bz = THREE.MathUtils.lerp(fromStop.camPos.z, toStop.camPos.z, easeP);

        const arcFactor = Math.sin(segLocal * Math.PI);
        camProxy.posX = bx + arcSign * arcFactor * 1.5;
        camProxy.posY = by - arcFactor * 0.2;
        camProxy.posZ = bz;
        camProxy.roll = arcSign * arcFactor * 0.035;

        camProxy.lookX = THREE.MathUtils.lerp(fromStop.lookTarget.x, toStop.lookTarget.x, easeP);
        camProxy.lookY = THREE.MathUtils.lerp(fromStop.lookTarget.y, toStop.lookTarget.y, easeP);
        camProxy.lookZ = THREE.MathUtils.lerp(fromStop.lookTarget.z, toStop.lookTarget.z, easeP);

        // Smooth distance-based lerp dimming:
        // Centered/active card is ALWAYS at full brightness (1.0).
        // Neighbor cards smoothly lerp down to 0.60 based on distance from center.
        achievements.forEach((_, cIdx) => {
          const dist = Math.abs(cIdx - cardProgress);
          let factor = 1.0;
          if (dist > 0.15) {
            const t = Math.min(1.0, (dist - 0.15) / 0.70);
            factor = 1.0 - 0.40 * (t * t * (3 - 2 * t)); // smoothstep
          }

          const mats = panelMaterials[cIdx];
          mats.front.opacity = factor;
          mats.sides.opacity = factor;
          mats.front.color.setScalar(factor);
          mats.sides.color.setScalar(factor);

          if (mats.poster) {
            mats.poster.opacity = factor;
            mats.poster.color.setScalar(factor);
          }
        });
      };

      // Set initial card brightness values immediately
      updateCamera();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(4, N) * 1.25 * window.innerHeight}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;

            // Heading wipe up: leaves completely during the first 12% of scroll
            if (headingScreen) {
              const headingLeave = Math.min(1, p / 0.12);
              headingScreen.style.transform = `translateY(${-headingLeave * 105}%)`;
              headingScreen.style.opacity = `${Math.max(0, 1 - headingLeave * 1.6)}`;
              headingScreen.style.pointerEvents = headingLeave >= 0.95 ? "none" : "auto";
            }

            // 3D Scene container fade-in
            if (container) {
              const sceneIn = Math.min(1, Math.max(0, (p - 0.01) / 0.10));
              container.style.opacity = `${sceneIn}`;
            }

            // Tab on right edge: safely docked, never overlaps centered card
            if (tabRef.current) {
              const hideTab = width < 1200 || p < 0.10 || p > 0.96;
              tabRef.current.style.opacity = hideTab ? "0" : "1";
              tabRef.current.style.pointerEvents = hideTab ? "none" : "auto";
            }
          },
        },
      });

      // 1. Initial heading screen wipe while resting on Card 0
      tl.to(animState, {
        progress: 0.4,
        duration: 0.6,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 2. Card 0 centered hold
      tl.to(animState, {
        progress: 0.4,
        duration: 0.5,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 3. Glide to Card 1
      tl.to(animState, {
        progress: 1.3,
        duration: 1.0,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 4. Card 1 centered hold
      tl.to(animState, {
        progress: 1.3,
        duration: 0.5,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 5. Glide to Card 2
      tl.to(animState, {
        progress: 2.2,
        duration: 1.0,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 6. Card 2 centered hold
      tl.to(animState, {
        progress: 2.2,
        duration: 0.5,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 7. Glide to Card 3
      tl.to(animState, {
        progress: 3.1,
        duration: 1.0,
        ease: "none",
        onUpdate: updateCamera,
      });

      // 8. Card 3 centered hold (held before section releases)
      tl.to(animState, {
        progress: 3.1,
        duration: 0.8,
        ease: "none",
        onUpdate: updateCamera,
      });

      activeTimeline = tl;
    };

    buildTimeline();

    const initTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      (window as any).__lenis?.resize();
    }, 120);

    // ─────────────────────────────────────────────────────────────
    // 7. RENDER LOOP & CURSOR PARALLAX
    // ─────────────────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      cursor.x += (cursor.targetX - cursor.x) * 0.08;
      cursor.y += (cursor.targetY - cursor.y) * 0.08;

      const parallaxX = cursor.x * 0.025;
      const parallaxY = cursor.y * 0.018;

      camera.position.set(
        camProxy.posX + parallaxX * 0.4,
        camProxy.posY + parallaxY * 0.3,
        camProxy.posZ
      );
      camera.lookAt(camProxy.lookX, camProxy.lookY, camProxy.lookZ);
      camera.rotation.z = camProxy.roll + parallaxX * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 8. INTERACTIVE CLICK
    // ─────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(panelMeshes, true);
      if (intersects.length > 0) {
        const link = intersects[0].object.userData.link;
        if (link) navigate(link);
      }
    };
    renderer.domElement.addEventListener("click", handleClick);

    // ─────────────────────────────────────────────────────────────
    // 9. RESIZE & DISPOSAL
    // ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      buildTimeline();
      ScrollTrigger.refresh();
      (window as any).__lenis?.resize();
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(onResize, 60);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", handleClick);

      if (activeTimeline) {
        activeTimeline.scrollTrigger?.kill();
        activeTimeline.kill();
      }

      disposables.forEach((d) => d.dispose());
      bgTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [navigate]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.84;
    const newIdx = Math.round(scrollLeft / (cardWidth + 16));
    setActiveMobileCard(Math.max(0, Math.min(achievements.length - 1, newIdx)));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cardWidth = el.offsetWidth * 0.84;
    el.scrollTo({ left: index * (cardWidth + 16), behavior: "smooth" });
    setActiveMobileCard(index);
  };

  return (
    <section
      id="achievement-scene-section"
      ref={sectionRef}
      className="relative z-30 w-full min-h-[100svh] md:h-screen bg-[#08080a] overflow-x-hidden md:overflow-hidden select-none safe-section-py md:safe-fullscreen"
    >
      {/* ─────────────────────────────────────────────────────────────
          MOBILE 2D VIEW (Scroll-snap carousel, NO WebGL)
      ───────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col justify-center w-full px-4 py-8 min-h-[100svh]">
        {/* Mobile Heading */}
        <div className="text-center mb-6">
          <span className="font-script text-3xl text-neutral-400 italic block mb-1">
            Achievements &amp;
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl tracking-tight uppercase text-white leading-none">
            RECOGNITIONS
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-white/20" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-400">
              // COMPETITIVE PODIUMS // MMMUT
            </span>
            <span className="h-px w-6 bg-white/20" />
          </div>
        </div>

        {/* 2D Swipeable Card Carousel with CSS scroll snap */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {achievements.map((item) => (
            <div
              key={item.id}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center rounded-sm border border-white/15 bg-[#101014] p-4 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Photo frame */}
                <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden mb-3 bg-black/60">
                  <img
                    src={item.image}
                    alt={item.titleLine1}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-white/20 rounded-sm font-mono text-[10px] uppercase tracking-wider text-white">
                    {item.id} / 04
                  </div>
                </div>

                <span className="font-mono text-[11px] tracking-widest uppercase text-white/50 block mb-1">
                  {item.dateLine}
                </span>

                <h3 className="font-sans font-bold text-lg text-white uppercase leading-snug">
                  {item.titleLine1}
                </h3>
                <h4 className="font-sans font-semibold text-sm text-neutral-300 uppercase leading-snug mb-2">
                  {item.titleLine2}
                </h4>

                <p className="font-sans text-sm text-neutral-300 font-light leading-relaxed line-clamp-3 mb-3">
                  {item.description}
                </p>

                <span className="font-mono text-[11px] text-white/60 tracking-wider uppercase block">
                  {item.teamName}
                </span>
              </div>

              <button
                onClick={() => navigate(item.link)}
                className="mt-4 w-full h-11 min-h-[44px] flex items-center justify-center gap-2 border border-white/25 bg-white/10 active:bg-white active:text-black text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-sm"
              >
                <span>View Details</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Dots indicator with >= 44px tap targets */}
        <div className="flex items-center justify-center gap-1 mt-1">
          {achievements.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer bg-transparent border-none p-0"
            >
              <span
                className={`h-2 transition-all duration-300 rounded-full ${
                  activeMobileCard === idx ? "w-6 bg-white" : "w-2 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="text-center font-mono text-[11px] text-white/40 uppercase tracking-widest mt-2">
          Swipe to view ({activeMobileCard + 1} of {achievements.length})
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. 3D WEBGL SCENE CONTAINER (Fades in as heading leaves, Desktop only)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={canvasContainerRef}
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-auto z-10 opacity-0 transition-opacity duration-300"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. LIGHT GRAIN OVERLAY (3% opacity, Desktop only)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. HEADING SCREEN BEFORE THE 3D SCENE (Desktop only)
          Slides/wipes UP as user scrolls, text never overlaps cards.
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={headingScreenRef}
        className="hidden md:flex absolute inset-0 z-30 flex-col items-center justify-center bg-[#08080a] px-6 text-center will-change-transform pointer-events-auto"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-script text-4xl sm:text-6xl md:text-7xl text-neutral-300 italic tracking-wide mb-2 select-none">
            Achievements &amp;
          </span>
          <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white leading-none select-none">
            RECOGNITIONS
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-white/20" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-neutral-400">
              // COMPETITIVE HACKATHONS // RESEARCH COMMENDATIONS // MMMUT
            </span>
            <span className="h-px w-10 sm:w-16 bg-white/20" />
          </div>
          <div className="mt-14 flex flex-col items-center gap-2 text-neutral-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] animate-pulse">
            <span>Scroll to Explore</span>
            <span className="text-sm">↓</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. VERTICAL TAB ON RIGHT EDGE ("LATEST WIN", Desktop only)
          Safely docked to avoid overlapping cards, hidden on mobile
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={tabRef}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-25 pointer-events-auto transition-opacity duration-300"
      >
        <button
          onClick={() => navigate("/ideathon")}
          className="group flex items-center gap-3 py-4 px-2.5 bg-black/85 hover:bg-white hover:text-black text-white border-l border-y border-white/20 backdrop-blur-md transition-all duration-300 shadow-2xl cursor-pointer"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-bold">
            LATEST WIN: IDEATHON &apos;25
          </span>
          <span className="font-mono text-xs group-hover:-translate-x-0.5 transition-transform">
            ↗
          </span>
        </button>
      </div>

      {/* Top & Bottom seamless gradient vignettes (Desktop only) */}
      <div className="hidden md:block absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#08080a] to-transparent pointer-events-none z-20" />
      <div className="hidden md:block absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#08080a] to-transparent pointer-events-none z-20" />
    </section>
  );
}
