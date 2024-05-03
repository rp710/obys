function locomotiveAnime() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnime() {
  var t1 = gsap.timeline();

  t1.from(".line h1 ", {
    y: 100,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
  t1.from("#line1-part1 ", {
    opacity: 0,
    onStart: function () {
      var now = document.querySelector("#line1-part1 h5");
      var count = 0;
      setInterval(function () {
        if (count < 100) {
          now.innerHTML = count++;
        } else {
          now.innerHTML = count;
        }
      }, 30);
    },
  });
  t1.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });
  t1.to("#loader", {
    opacity: 0,
    duration: 0.1,
    delay: 2.8,
    ease: "power4.out",
  });
  t1.from("#page1", {
    y: 1200,
    opacity: 0,
    duration: 0.5,
  });
  t1.to("#loader", {
    display: "none",
  });
  t1.from("#nav", {
    y: -100,
    opacity: 0,
  });
  t1.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero3 h3,#hero4 h1", {
    y: 120,
    stagger: 0.2,
  });
  t1.from("#hero1,#page2", { opacity: 0 }, "-=1.2");
}

function cursorAnime() {
  document.addEventListener("mousemove", function (details) {
    gsap.to("#crsr", {
      left: details.x,
      top: details.y,
    });
  });
  Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet("#nav-part2 h4", {
    //   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    //   duration: 1,
  });
  var vc = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  vc.addEventListener("mouseenter", function () {
    vc.addEventListener("mousemove", function (details) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        // left: details.x - 570,
        // y: details.y - 300,
        left: details.x - 555,
        top: details.y - 200,
      });
    });
  });

  vc.addEventListener("mouseleave", function (details) {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      top: "-15%",
      left: "70%",
    });
  });
  var flag = 0;
  vc.addEventListener("click", function () {
    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-line"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-line"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}
function RohalAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    // debug: true,

    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.799994569354803 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.27, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.84, range: [0, 10] },
      metaball: { value: 0.44, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.38, range: [0, 2] },
      noise_scale: { value: 8.4, range: [0, 100] },
      noiseDetail: { value: 6.11, range: [0, 100] },
      distortionAmount: { value: 2.9, range: [0, 10] },
      scale: { value: 59.54, range: [0, 100] },
      speed: { value: 0.58, range: [0, 1] },
    },

    gooey: true,
  });
}
locomotiveAnime();
loadingAnime();
cursorAnime();
RohalAnimation();

document.addEventListener("mousemove", function (details) {
  gsap.to("#flag", {
    x: details.x,
    y: details.y,
  });
});
document.querySelector("#hero3").addEventListener("mouseenter", function () {
  gsap.to("#flag", {
    opacity: 1,
  });
});
document.querySelector("#hero3").addEventListener("mouseleave", function () {
  gsap.to("#flag", {
    opacity: 0,
  });
});
