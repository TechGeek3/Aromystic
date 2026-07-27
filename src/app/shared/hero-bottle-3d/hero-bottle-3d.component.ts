import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

@Component({
  selector: 'app-hero-bottle-3d',
  standalone: true,
  template: `
    <div class="stage" #host>
      <span class="hint">drag to rotate</span>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .stage {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 340px;
      cursor: grab;
    }
    .stage:active { cursor: grabbing; }
    .stage canvas { display: block; }
    .hint {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(230, 211, 171, 0.7);
      pointer-events: none;
      opacity: 0.9;
    }
  `],
})
export class HeroBottle3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  @Input() accent = '#c9a96a';

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private controls?: OrbitControls;
  private frameId = 0;
  private resizeObs?: ResizeObserver;
  private disposables: Array<{ dispose: () => void }> = [];
  private autoResumeTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    const width = el.clientWidth || 480;
    const height = el.clientHeight || 480;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.2);
    this.camera = camera;

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 6, 6);
    scene.add(key);
    const gold = new THREE.PointLight(0xffcf8a, 18, 30);
    gold.position.set(-3, 1, 3);
    scene.add(gold);
    const rim = new THREE.PointLight(0x7fb0ff, 12, 30);
    rim.position.set(3, -1, -4);
    scene.add(rim);

    const bottle = this.buildBottle();
    scene.add(bottle);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.72;
    controls.target.set(0, 0.1, 0);
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      if (this.autoResumeTimer) clearTimeout(this.autoResumeTimer);
    });
    controls.addEventListener('end', () => {
      if (this.autoResumeTimer) clearTimeout(this.autoResumeTimer);
      this.autoResumeTimer = setTimeout(() => (controls.autoRotate = true), 2500);
    });
    this.controls = controls;

    const animate = () => {
      this.frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    this.resizeObs = new ResizeObserver(() => this.onResize());
    this.resizeObs.observe(el);
  }

  private buildBottle(): THREE.Group {
    const group = new THREE.Group();
    const acc = new THREE.Color(this.accent);

    const profile: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.6),
      new THREE.Vector2(0.9, -1.6),
      new THREE.Vector2(1.02, -1.48),
      new THREE.Vector2(1.02, 0.85),
      new THREE.Vector2(0.96, 1.08),
      new THREE.Vector2(0.55, 1.34),
      new THREE.Vector2(0.34, 1.5),
      new THREE.Vector2(0.34, 1.82),
    ];
    const bodyGeo = new THREE.LatheGeometry(profile, 96);
    bodyGeo.computeVertexNormals();
    const glass = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 1.3,
      roughness: 0.05,
      metalness: 0,
      ior: 1.46,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      attenuationColor: new THREE.Color('#9fb6d6'),
      attenuationDistance: 3.2,
      envMapIntensity: 1.3,
      transparent: true,
    });
    const body = new THREE.Mesh(bodyGeo, glass);
    this.disposables.push(bodyGeo, glass);
    group.add(body);

    const liquidGeo = new THREE.CylinderGeometry(0.92, 0.92, 1.9, 64, 1, false);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: acc,
      transmission: 0.6,
      roughness: 0.25,
      thickness: 1,
      ior: 1.35,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: 1,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.55;
    this.disposables.push(liquidGeo, liquidMat);
    group.add(liquid);

    const capGeo = new THREE.CylinderGeometry(0.38, 0.4, 0.62, 48);
    const capMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141f36'),
      metalness: 0.9,
      roughness: 0.3,
      envMapIntensity: 1,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 2.12;
    this.disposables.push(capGeo, capMat);
    group.add(cap);

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c9a96a'),
      metalness: 1,
      roughness: 0.28,
      envMapIntensity: 1.4,
    });
    this.disposables.push(goldMat);
    const ringGeo = new THREE.TorusGeometry(0.4, 0.055, 24, 64);
    const ring = new THREE.Mesh(ringGeo, goldMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.82;
    this.disposables.push(ringGeo);
    group.add(ring);

    const bandGeo = new THREE.CylinderGeometry(1.045, 1.045, 0.95, 96, 1, true);
    const bandMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#faf6ef'),
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide,
      envMapIntensity: 0.7,
    });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = -0.12;
    this.disposables.push(bandGeo, bandMat);
    group.add(band);

    const emblemTex = new THREE.TextureLoader().load('logo-emblem.png');
    emblemTex.colorSpace = THREE.SRGBColorSpace;
    emblemTex.anisotropy = this.renderer?.capabilities.getMaxAnisotropy() ?? 1;
    const emblemGeo = new THREE.CircleGeometry(0.5, 64);
    const emblemMat = new THREE.MeshStandardMaterial({
      map: emblemTex,
      roughness: 0.5,
      metalness: 0.15,
      envMapIntensity: 0.6,
    });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.set(0, -0.12, 1.05);
    this.disposables.push(emblemGeo, emblemMat, emblemTex);
    group.add(emblem);

    group.rotation.y = -0.3;
    return group;
  }


  private onResize(): void {
    if (!this.renderer || !this.camera) return;
    const el = this.host.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    if (this.autoResumeTimer) clearTimeout(this.autoResumeTimer);
    this.resizeObs?.disconnect();
    this.controls?.dispose();
    this.disposables.forEach((d) => d.dispose());
    this.scene?.environment?.dispose();
    this.renderer?.dispose();
    if (this.renderer) {
      this.renderer.domElement.remove();
    }
  }
}



