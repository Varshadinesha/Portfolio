// --- THREE.JS GALAXY SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);
const starColors = [new THREE.Color(0xffffff), new THREE.Color(0xffd2a1), new THREE.Color(0xa1c8ff)];

for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const starMaterial = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, blending: THREE.AdditiveBlending });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Nebula
const nebulaTexture = new THREE.TextureLoader().load('https://i.imgur.com/9H4gC9Y.png');
const nebulaMaterial = new THREE.PointsMaterial({
    map: nebulaTexture, size: 20, sizeAttenuation: true, transparent: true,
    opacity: 0.02, blending: THREE.AdditiveBlending,
    depthWrite: false, color: 0x00aaff
});
const nebulaGeometry = new THREE.BufferGeometry();
const nebulaCount = 3000;
const nebulaPositions = new Float32Array(nebulaCount * 3);
for (let i = 0; i < nebulaCount; i++) {
    nebulaPositions[i * 3] = (Math.random() - 0.5) * 80;
    nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    nebulaPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
}
nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
scene.add(nebula);

// --- INTERACTIVITY ---
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = 10 + t * 0.01;
    camera.position.y = t * 0.001;
}
document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
    stars.rotation.y += 0.0001;
    nebula.rotation.y += 0.0002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- UI ENHANCEMENTS ---
// Navbar scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Section fade-in effect
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});
