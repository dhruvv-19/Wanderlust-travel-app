function scrollFilters(direction) {
  const filterBox = document.getElementById("filters");
  const scrollAmount = 300;

  if (direction === "left") {
    filterBox.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    filterBox.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}