// src/components/Login/shaders/planeFragment.js
const planeFragmentShader = `
uniform float uTransitionProgress; // Blends between uTextureCurrent and uTextureNext (0 to 1)
uniform sampler2D uTextureCurrent;
uniform sampler2D uTextureNext;
uniform float uTime;             // For animating the ripple
uniform vec2 uResolution;        // Canvas resolution for responsive ripple
uniform vec3 uPrimaryColor;      // To tint the textures with the theme's primary color

varying vec2 vUv;                // Interpolated UV coordinates from vertex shader

// A more interesting ripple function
vec2 ripple(vec2 uv, float time, float strength, float frequency, float speed) {
    vec2 center = vec2(0.5, 0.5);
    vec2 dir = uv - center;
    float dist = length(dir);
    float angle = atan(dir.y, dir.x);

    // Create a wave based on distance and time
    float wave = sin(dist * frequency - time * speed);

    // Apply distortion based on the wave
    float distortX = cos(angle) * wave * strength;
    float distortY = sin(angle) * wave * strength;

    return uv + vec2(distortX, distortY);
}

void main() {
    // Apply the ripple effect to the UV coordinates
    // Adjust strength, frequency, and speed for different ripple looks
    vec2 rippledUv = ripple(vUv, uTime, 0.03, 30.0, 2.0); // Increased strength slightly for more visible ripple

    // Ensure UVs stay within [0,1] range after distortion to prevent wrapping artifacts
    rippledUv = clamp(rippledUv, 0.0, 1.0);

    // Sample the current and next textures
    vec4 colorCurrent = texture2D(uTextureCurrent, rippledUv);
    vec4 colorNext = texture2D(uTextureNext, rippledUv);

    // Smooth transition between textures using mix and a smoothstep function
    // smoothstep creates a smoother transition at the start and end of the blend.
    float blendFactor = smoothstep(0.0, 1.0, uTransitionProgress);
    vec4 finalColor = mix(colorCurrent, colorNext, blendFactor);

    // The original SVG data URLs have fill-opacity. We want to respect that
    // but also apply an overall tint and ensure it's not fully opaque.
    // If your SVG patterns have actual content, this ensures they are visible.
    // The fill-opacity in your SVG data URLs is around 0.08 - 0.1, so we account for that.
    float baseOpacity = 0.1; // Base opacity for the pattern itself
    finalColor.a = mix(finalColor.a, baseOpacity, 0.5); // Blend original alpha with a desired base opacity

    // Apply the theme's primary color to tint the texture.
    finalColor.rgb *= uPrimaryColor;


    gl_FragColor = finalColor;
}
`;

export default planeFragmentShader;