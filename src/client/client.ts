import { animationsExample } from './examples/animations';
import { cubeExample } from './examples/cube';
import { liveExample } from './examples/live';
import { modelsExample } from './examples/models';
import { shadersExample } from './examples/shaders';

// Select current example
if (document.querySelector('.animations')) {

    animationsExample();

}

if (document.querySelector('.cube')) {

    cubeExample();

}

if (document.querySelector('.live')) {

    liveExample();

}

if (document.querySelector('.models')) {

    modelsExample();

}

if (document.querySelector('.shaders')) {

    shadersExample();

}

// Add navigation
const nav = document.createElement('nav');
nav.innerHTML = /* HTML */`
<ul>
    <li><a href="index.html">Intro</a></li>
    <li><a href="cube.html">Basic Scene</a></li>
    <li><a href="live.html">Basic Scene Extended</a></li>
    <li><a href="models.html">Models</a></li>
    <li><a href="animations.html">Skeletal Animation</a></li>
    <li><a href="shaders.html">Shaders</a></li>
</ul>
`;
document.body.append(nav);