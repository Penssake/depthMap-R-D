# _3Ddepth Research Portion_

## **Readings**

**Why Use:** A modular, decoupled application architecture pays off in the long run. Constructor pattern and the prototype property. Allows for extensions and replace functionality without breaking other things. Would also make it easier to use with multiple frameworks that use class methods.

**Why Use:** Mediator pattern. A mediator is a behavioral design pattern that allows us to expose a unified interface through which the different parts of a system may communicate. The mediator only uses events because it makes life easy when dealing with modern JavaScript web app frameworks.

**Why Use:** Promises over callbacks for complete control over application flow. Mentioned in readings were two libraries that seem to be promise structuring libraries used in 3d projects. Not convinced to use them over writing out the promises in vanilla js. Libraries mentioned were [**Q library**](https://github.com/kriskowal/q) and [**when.js**](https://github.com/cujojs/when)

## **Libraries**

Three.js

## **Performance Optimization**

**Low poly 3d graphic**\
**Low fidelity graphic**\
**Can restrict camera movements if necessary**\
**Caching of loaded data**

## **Performance tools**

[**Themable FPS meter**](https://darsa.in/fpsmeter/)\
[**Three.js renderer.info property**](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js#L82) - It’s worth keeping an eye on this to make sure objects are not being rendered when they move out of the current viewport.\
[**localForage**](https://hacks.mozilla.org/2014/02/localforage-offline-storage-improved/) - smarter local storage, persistant

## **Mentions for complex projects**

### **Web workers**

[**Catalina**](http://catilinejs.com/)
