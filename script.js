document.addEventListener("DOMContentLoaded", () => {
  // Navigation toggle
  const navToggle = document.getElementById("navToggle")
  const navLinks = document.getElementById("navLinks")

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      document.body.classList.toggle("nav-open")
    })

    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll("a")
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        document.body.classList.remove("nav-open")
      })
    })
  }

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Scroll indicator
  const scrollIndicator = document.createElement("div")
  scrollIndicator.className = "scroll-indicator"
  document.body.appendChild(scrollIndicator)

  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100
    scrollIndicator.style.width = scrolled + "%"
  })

  // COMPLETELY REDESIGNED LEVEL NAVIGATION
  const levelButtons = document.querySelectorAll(".level-btn")

  if (levelButtons.length > 0) {
    levelButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the level number from the data attribute
        const levelNum = button.getAttribute("data-level")

        // Remove active class from all buttons
        levelButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")

        // Hide all level info divs
        document.querySelectorAll(".level-info").forEach((info) => {
          info.style.display = "none"
        })

        // Show the selected level info
        const selectedLevel = document.getElementById(`level-${levelNum}`)
        if (selectedLevel) {
          selectedLevel.style.display = "block"
        }
      })
    })

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      const activeButton = document.querySelector(".level-btn.active")
      if (!activeButton) return

      const currentLevel = Number.parseInt(activeButton.getAttribute("data-level"))

      if (e.key === "ArrowRight" && currentLevel < 7) {
        const nextButton = document.querySelector(`.level-btn[data-level="${currentLevel + 1}"]`)
        if (nextButton) nextButton.click()
      } else if (e.key === "ArrowLeft" && currentLevel > 1) {
        const prevButton = document.querySelector(`.level-btn[data-level="${currentLevel - 1}"]`)
        if (prevButton) prevButton.click()
      }
    })
  }

  // Particles background
  const particlesContainer = document.getElementById("particles")

  if (particlesContainer) {
    // Create particles
    for (let i = 0; i < 60; i++) {
      createParticle()
    }

    function createParticle() {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      // Random size
      const size = Math.random() * 4 + 1

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1

      // Random color
      const colors = ["#00c8ff", "#9d00ff", "#ff5e00"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Random animation duration
      const duration = Math.random() * 10 + 5 // Faster animation

      // Apply styles
      particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        opacity: ${opacity};
        animation: float ${duration}s linear infinite;
      `

      particlesContainer.appendChild(particle)
    }
  }

  // Video player for trailer
  const videoContainer = document.querySelector(".video-container")

  if (videoContainer) {
    const playButton = videoContainer.querySelector(".play-button")
    const videoPlaceholder = videoContainer.querySelector(".video-placeholder")

    if (playButton && videoPlaceholder) {
      playButton.addEventListener("click", () => {
        // Create video element
        const video = document.createElement("video")
        video.src = "images/gameTrailer.mp4"
        video.controls = true
        video.autoplay = true
        video.className = "trailer-video"

        // Replace placeholder with video
        videoPlaceholder.innerHTML = ""
        videoPlaceholder.appendChild(video)

        // Remove play button
        playButton.style.display = "none"
      })
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add CSS for particles
  const style = document.createElement("style")
  style.textContent = `
    .particle {
      position: absolute;
      pointer-events: none;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0) rotate(0);
      }
      25% {
        transform: translateY(-15px) translateX(10px) rotate(90deg);
      }
      50% {
        transform: translateY(0) translateX(15px) rotate(180deg);
      }
      75% {
        transform: translateY(15px) translateX(5px) rotate(270deg);
      }
      100% {
        transform: translateY(0) translateX(0) rotate(360deg);
      }
    }
  `
  document.head.appendChild(style)

  // Enhanced scroll reveal animation with faster transitions
  const revealElements = document.querySelectorAll(
    ".feature-card, .level-display, .download-button, .credits-card, .hero-content, .hero-image",
  )

  revealElements.forEach((element) => {
    element.classList.add("reveal")
  })

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight
    const revealPoint = 100

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })
  }

  // Initial check
  revealOnScroll()

  // Check on scroll
  window.addEventListener("scroll", revealOnScroll)

  // Feature card hover effects
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".feature-icon")
      if (icon) {
        icon.style.transform = "scale(1.1)"
      }
    })

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".feature-icon")
      if (icon) {
        icon.style.transform = "scale(1)"
      }
    })
  })
})
