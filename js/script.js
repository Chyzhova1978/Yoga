// Сучасний (Строгий) режим
"use strict"

function initSameProductsSlider() {
  const slider = document.querySelector(".same-products__slider")
  const track = document.querySelector(".same-products__track")
  const dotsWrap = document.querySelector(".same-products__dots")
  if (!slider || !track || !dotsWrap) return

  const slides = Array.from(track.querySelectorAll(".same-products__slide"))
  if (!slides.length) return

  let currentPage = 0
  const totalPages = slides.length
  let resizeTimer = null

  const clampPage = (page) => Math.max(0, Math.min(page, totalPages - 1))

  function updateDots() {
    dotsWrap.innerHTML = ""
    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement("button")
      dot.type = "button"
      dot.className = `same-products__dot${i === currentPage ? " same-products__dot--active" : ""}`
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`)
      dot.addEventListener("click", () => goToPage(i))
      dotsWrap.append(dot)
    }
  }

  function updateActiveDot() {
    const dots = dotsWrap.querySelectorAll(".same-products__dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("same-products__dot--active", index === currentPage)
    })
  }

  function goToPage(page) {
    currentPage = clampPage(page)
    track.style.transform = `translateX(-${currentPage * 100}%)`
    updateActiveDot()
  }

  function recalcSlider() {
    currentPage = clampPage(currentPage)
    goToPage(currentPage)
  }

  updateDots()
  recalcSlider()

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => recalcSlider(), 150)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initSameProductsSlider()
})

