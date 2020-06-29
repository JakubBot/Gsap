let $q = document.querySelector.bind(document);
let $qa = document.querySelectorAll.bind(document);

function delay(n) {
  n = n || 2000;

  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  let tl = gsap.timeline({ defaults: { duration: 1.1, ease: Expo.easeInOut } });
  tl.set(".load-container", { transformOrigin: "left" })
    .to(".load-container", {
      scaleX: 1,
    })
    .set(".load-container", { transformOrigin: "right" })
    .to(".load-container", {
      scaleX: 0,
      delay: 0.3,
    });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.fromTo(".animate-this", {
    y: 30,
    opacity: 0,
  }, {
    duration: 1.5,
    y:0,
    opacity: 1,
    delay: 0.2,
    stagger: 0.4,
  })
}

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          pageTransition();
          await delay(1000);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });
});
