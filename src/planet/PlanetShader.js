/**
 * Simple test shader
 */

const PlanetShader = {

    vertexShader: /* glsl */`
	#define HalfPI 1.5707963267948966192313216916398
	#define PI 3.1415926535897932384626433832795
	#define LON_MULTIPLIER 0.15915494309189533576888376337251
	#define LAT_MULTIPLIER 0.63661977236758134307553505349006

	uniform sampler2D elevation;
	uniform float radius;
	uniform vec3 planetPosition;
	uniform vec2 lowerLeft;
	uniform vec2 upperRight;
	
	varying vec2 texUV;

	void main() {
		vec3 vPosition = position;
        float elevation = texture2D(elevation, vPosition.xy).r;
		float lon = vPosition.x * (upperRight.x - lowerLeft.x) + lowerLeft.x;
		float lat = vPosition.y * (upperRight.y - lowerLeft.y) + lowerLeft.y;

		float width = upperRight.x - lowerLeft.x;
		float height = upperRight.y - lowerLeft.y;

		texUV = vec2((lon - lowerLeft.x) / width, (lat - lowerLeft.y) /height );
		vPosition = vec3(-(cos(lat) * cos(lon)), sin(lat), cos(lat) * sin(lon));
		
		vPosition *= elevation+radius;
		
	    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
	}`,

    fragmentShader: /* glsl */`

	varying vec2 texUV;
	uniform sampler2D imagery;
	
	void main() {
		vec3 color = texture2D(imagery, texUV.xy).xyz;
		gl_FragColor = vec4(color, 1.0);
	}`

};

export { PlanetShader };
