const menuBtn = document.querySelector(".hamburger");
const navFC = document.querySelector(".nav-fc");
const navFCItem = document.querySelectorAll(".fc-item");
const box = document.querySelectorAll(".box");
const nav = document.querySelector(".navi");
const navContainer = document.querySelector(".nav");
const hero = document.querySelector(".hero");

box.forEach((box) =>
  box.addEventListener("click", () => {
    // removeActiveClasses();
    box.classList.toggle("active");
  })
);

menuBtn.addEventListener("click", () => {
  navFC.classList.toggle("active");
  menuBtn.classList.toggle("is-active");
});

navFCItem.forEach((navItem) =>
  navItem.addEventListener("click", () => {
    navFC.classList.remove("active");
    menuBtn.classList.remove("is-active");
  })
);

function removeActiveClasses() {
  box.forEach((box) => {
    box.classList.remove("active");
  });
}

const scrollTo = function (e) {
  e.preventDefault();

  if (e.target.classList.contains("navi-item")) {
    console.log("Link");
    const id = e.target.getAttribute("href");
    console.log(id);
    document
      .querySelector(id)
      .scrollIntoView({ block: "start", inline: "start" });
  }
};

// const scrollTo = function (e) {
//   e.preventDefault();

//   if (e.target.classList.contains("navi-item")) {
//     console.log("Link");
//     const id = e.target.getBoundingClientRect();
//     // const id = e.target.getAttribute("href");
//     console.log(id);
//     // document.querySelector(id).scrollIntoView({ behavior: "smooth" });

//     window.scrollTo(id.left, id.top + window.scrollY - 80);
//   }
// };

nav.addEventListener("click", scrollTo);
navFC.addEventListener("click", scrollTo);

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("navi-item")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".navi-item");
    const button = link.closest(".nav").querySelector("h1");

    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// // Sticky navigation on scroll
// const header = document.querySelector(".hero");
// const navHeight = navContainer.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    navContainer.classList.add("active");
  } else {
    navContainer.classList.remove("active");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${2 * navContainer.offsetHeight}px`,
});

headerObserver.observe(hero);

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".testimonial");
  const btnLeft = document.querySelector(".testi--button--left");
  const btnRight = document.querySelector(".testi--button--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length - 1;
  const slider = document.querySelector(".testimonails");
  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `TranslateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  // Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
