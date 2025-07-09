// src/components/Login/shaders/planeVertex.js
const planeVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default planeVertexShader;