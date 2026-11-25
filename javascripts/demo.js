// Demo atlas: search and group filters on the gallery, a lightbox on command pages.
// Re-runs on every page load, including instant navigation (Material's document$).
(function () {
  function gallery() {
    var grid = document.getElementById("demo-grid");
    if (!grid) return;
    var q = document.getElementById("demo-q");
    var buttons = document.querySelectorAll("#demo-filters button");
    var cards = grid.querySelectorAll(".demo-card");
    var none = document.createElement("div");
    none.className = "demo-none";
    none.textContent = "No command matches.";
    var group = "all";
    function apply() {
      var text = (q.value || "").trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var okGroup = group === "all" || (group === "fig" ? c.dataset.fig === "1" : c.dataset.g === group);
        var okText = !text || c.dataset.q.indexOf(text) >= 0;
        var on = okGroup && okText;
        c.classList.toggle("hide", !on);
        if (on) shown++;
      });
      if (!shown && !none.parentNode) grid.after(none);
      if (shown && none.parentNode) none.remove();
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        buttons.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        group = b.dataset.g;
        apply();
      });
    });
    q.addEventListener("input", apply);
  }
  function lightbox() {
    document.querySelectorAll("a.demo-zoom").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var box = document.createElement("div");
        box.className = "demo-lightbox";
        var img = document.createElement("img");
        img.src = a.getAttribute("href");
        img.alt = a.querySelector("img") ? a.querySelector("img").alt : "";
        box.appendChild(img);
        function close() { box.remove(); document.removeEventListener("keydown", key); }
        function key(ev) { if (ev.key === "Escape") close(); }
        box.addEventListener("click", close);
        document.addEventListener("keydown", key);
        document.body.appendChild(box);
      });
    });
  }
  function init() { gallery(); lightbox(); }
  if (window.document$ && window.document$.subscribe) window.document$.subscribe(init);
  else document.addEventListener("DOMContentLoaded", init);
})();
