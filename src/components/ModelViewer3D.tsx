import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Eye,
  Layers,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface ModelViewer3DProps {
  modelPath: string;
  modelName: string;
  fileSize?: string;
  brand: string;
}

type CameraPreset = 'perspective' | 'front' | 'top' | 'side';

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  modelPath,
  modelName,
  fileSize,
  brand,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const loadedModelRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // State
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>('0%');
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<CameraPreset>('perspective');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [userInteracting, setUserInteracting] = useState<boolean>(false);

  // Model bounding info for camera repositioning
  const modelBoundsRef = useRef<{
    center: THREE.Vector3;
    size: THREE.Vector3;
    maxDim: number;
    initialDistance: number;
  }>({
    center: new THREE.Vector3(0, 0, 0),
    size: new THREE.Vector3(1, 1, 1),
    maxDim: 1,
    initialDistance: 2,
  });

  // Setup camera preset positions
  const applyCameraPreset = useCallback((preset: CameraPreset) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const { initialDistance, center } = modelBoundsRef.current;
    const cam = cameraRef.current;
    const controls = controlsRef.current;

    setActivePreset(preset);

    switch (preset) {
      case 'perspective':
        cam.position.set(
          initialDistance * 0.85,
          initialDistance * 0.55,
          initialDistance * 1.15
        );
        break;
      case 'front':
        cam.position.set(0, initialDistance * 0.25, initialDistance * 1.35);
        break;
      case 'top':
        cam.position.set(0, initialDistance * 1.6, 0.05);
        break;
      case 'side':
        cam.position.set(initialDistance * 1.35, initialDistance * 0.3, 0);
        break;
    }

    cam.lookAt(center.x, center.y, center.z);
    controls.target.copy(center);
    controls.update();
  }, []);

  // Reset to initial perspective view
  const handleResetView = () => {
    applyCameraPreset('perspective');
  };

  // Zoom helpers
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const factor = direction === 'in' ? 0.82 : 1.22;
    const target = controlsRef.current.target;
    cam.position.sub(target).multiplyScalar(factor).add(target);
    controlsRef.current.update();
  };

  // Toggle wireframe mode
  const toggleWireframe = () => {
    if (!loadedModelRef.current) return;
    const nextState = !isWireframe;
    setIsWireframe(nextState);

    loadedModelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            m.wireframe = nextState;
          });
        } else if (mesh.material) {
          mesh.material.wireframe = nextState;
        }
      }
    });
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Listen to fullscreen changes from ESC key
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Main Three.js lifecycle
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    setLoading(true);
    setProgress(0);
    setProgressText('0%');
    setError(null);

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.05, 50);
    camera.position.set(1.5, 1.0, 1.8);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting setup (Studio Apple-style lighting with UNAM warmth)
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Hemisphere light (sky and ground subtle bounce)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdfe6ed, 0.9);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Main Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xf0f4ff, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    // Rim / Back light for edge definition
    const rimLight = new THREE.DirectionalLight(0xfff8ee, 0.8);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Subtle floor shadow plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(12, 12);
    const shadowPlaneMat = new THREE.ShadowMaterial({
      opacity: 0.18,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.01;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Subtle grid helper on floor for professional CAD/3D catalog look
    const gridHelper = new THREE.GridHelper(10, 20, 0x002b7a, 0xe2e8f0);
    gridHelper.position.y = -0.015;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    scene.add(gridHelper);

    // 5. OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.3;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go deep under ground
    controls.minDistance = 0.2;
    controls.maxDistance = 20;

    controls.addEventListener('start', () => {
      setUserInteracting(true);
    });

    controls.addEventListener('end', () => {
      setTimeout(() => setUserInteracting(false), 2000);
    });

    controlsRef.current = controls;

    // 6. Load GLB Model
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        loadedModelRef.current = model;

        // Enable shadow casting and receiving for all meshes
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Compute Bounding Box to center and scale correctly
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Center model at origin with base resting on plane Y=0
        model.position.x = -center.x;
        model.position.y = -box.min.y; // Sit base right on ground!
        model.position.z = -center.z;

        // Model group
        const group = new THREE.Group();
        group.add(model);
        scene.add(group);

        // Calculate optimal camera distance according to FOV
        const fov = camera.fov * (Math.PI / 180);
        const camDistance = (maxDim / 2) / Math.tan(fov / 2) * 1.5;

        // Update bounds ref
        modelBoundsRef.current = {
          center: new THREE.Vector3(0, size.y * 0.4, 0),
          size,
          maxDim,
          initialDistance: camDistance,
        };

        // Position camera
        camera.position.set(
          camDistance * 0.85,
          camDistance * 0.55,
          camDistance * 1.15
        );
        camera.near = maxDim * 0.01;
        camera.far = maxDim * 50;
        camera.updateProjectionMatrix();

        controls.target.set(0, size.y * 0.4, 0);
        controls.minDistance = maxDim * 0.35;
        controls.maxDistance = maxDim * 5.0;
        controls.update();

        setLoading(false);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setProgress(percent);
          const loadedMb = (xhr.loaded / (1024 * 1024)).toFixed(1);
          const totalMb = (xhr.total / (1024 * 1024)).toFixed(1);
          setProgressText(`${percent}% (${loadedMb} MB / ${totalMb} MB)`);
        } else {
          // Streaming without total header
          const loadedMb = (xhr.loaded / (1024 * 1024)).toFixed(1);
          setProgressText(`${loadedMb} MB cargados...`);
        }
      },
      (err) => {
        console.error('Error loading 3D model:', err);
        setError('No fue posible cargar el modelo 3D. Verifica la conexión o el formato del archivo.');
        setLoading(false);
      }
    );

    // 7. Animation Loop
    let isCancelled = false;
    const animate = () => {
      if (isCancelled) return;
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Auto rotation is handled by controls, only if user is not actively dragging
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // 8. Resize handling
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();

      // Dispose Three.js objects
      if (loadedModelRef.current) {
        loadedModelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
      }

      renderer.dispose();
    };
  }, [modelPath]);

  // Update autoRotate flag on controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate && !userInteracting;
    }
  }, [autoRotate, userInteracting]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-gradient-to-b from-slate-50/70 to-slate-100/40 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-slate-900' : 'h-[460px] md:h-[540px] lg:h-[600px]'
      }`}
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Brand & Model Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#002B7A]">{brand}</span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-medium text-slate-700">{modelName}</span>
          {fileSize && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
              {fileSize}
            </span>
          )}
        </div>
      </div>

      {/* 360 Hint Banner */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#CFA02C]" />
        <span className="text-[11px] font-medium text-slate-600">
          Arrastra para explorar en 360° • Usa la rueda para acercar o alejar
        </span>
      </div>

      {/* Top Right Actions (Fullscreen & Wireframe) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={toggleWireframe}
          title={isWireframe ? 'Ver materiales reales' : 'Ver malla 3D (Wireframe)'}
          className={`p-2 rounded-xl backdrop-blur-md border shadow-sm transition-all text-xs flex items-center gap-1.5 font-medium ${
            isWireframe
              ? 'bg-[#002B7A] text-white border-[#002B7A]'
              : 'bg-white/90 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden md:inline">{isWireframe ? 'Malla' : 'Material'}</span>
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          className="p-2 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md border border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Camera View Angle Presets */}
      <div className="absolute top-16 right-4 z-10 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 uppercase tracking-wider text-center">
          Vistas
        </span>
        <button
          onClick={() => applyCameraPreset('perspective')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            activePreset === 'perspective'
              ? 'bg-[#002B7A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Perspectiva
        </button>
        <button
          onClick={() => applyCameraPreset('front')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            activePreset === 'front'
              ? 'bg-[#002B7A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Frente
        </button>
        <button
          onClick={() => applyCameraPreset('top')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            activePreset === 'top'
              ? 'bg-[#002B7A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Teclado
        </button>
        <button
          onClick={() => applyCameraPreset('side')}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            activePreset === 'side'
              ? 'bg-[#002B7A] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Perfil
        </button>
      </div>

      {/* Floating Bottom Controls Toolbar */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-md">
        {/* Toggle Auto Rotation */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Detener rotación automática' : 'Iniciar rotación automática'}
          className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-medium ${
            autoRotate
              ? 'bg-[#002B7A] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="hidden sm:inline">{autoRotate ? 'Pausar' : 'Girar 360°'}</span>
        </button>

        <div className="w-[1px] h-5 bg-slate-200 mx-0.5"></div>

        {/* Zoom In */}
        <button
          onClick={() => handleZoom('in')}
          title="Acercar vista"
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => handleZoom('out')}
          title="Alejar vista"
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset Camera */}
        <button
          onClick={handleResetView}
          title="Restablecer posición inicial de cámara"
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden md:inline text-xs font-medium">Centrar</span>
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-opacity">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-[#002B7A] border-r-[#CFA02C] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Eye className="w-6 h-6 text-[#002B7A]" />
            </div>
          </div>
          <h4 className="text-base font-semibold text-slate-800 mb-1">
            Cargando modelo 3D institucional
          </h4>
          <p className="text-xs text-slate-500 mb-3 text-center max-w-xs">
            Optimizando texturas y geometrías para visualización interactiva de {modelName}
          </p>

          {/* Progress Bar */}
          <div className="w-64 max-w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-gradient-to-r from-[#002B7A] to-[#CFA02C] h-full transition-all duration-200 rounded-full"
              style={{ width: `${Math.max(5, progress)}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono font-medium text-slate-600">{progressText}</span>
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h4 className="text-base font-semibold text-slate-800 mb-1">
            Visualización 3D no disponible
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mb-4">
            {error}
          </p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              // Trigger reload
              const cur = modelPath;
              sceneRef.current = null;
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#002B7A] hover:bg-[#001B4E] text-white text-xs font-medium rounded-xl transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reintentar carga
          </button>
        </div>
      )}
    </div>
  );
};
