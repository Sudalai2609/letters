/* Dearest paper selection and live rich-text preview. */
(function () {
  "use strict";
  var config = window.DEAREST_PAPER_CONFIG;
  var richText = window.DEAREST_RICH_TEXT;
  var gallery = document.getElementById("paper-gallery");
  var categoriesHost = document.getElementById("paper-categories");
  var currentName = document.getElementById("paper-current-name");
  var resetButton = document.getElementById("paper-reset");
  var suggestionButton = document.getElementById("apply-paper-suggestion");
  var contrastStatus = document.getElementById("paper-contrast-status");
  var editor = document.getElementById("letter-editor");
  var toolbar = document.getElementById("letter-toolbar");
  var preview = document.getElementById("letter-live-preview");
  var previewContent = document.getElementById("letter-live-content");
  var compatibilityTextarea = document.querySelector(".letter-compatibility");

  if (!config || !richText || !gallery || !editor || !toolbar || !preview || !previewContent) return;

  var activeCategory = config.categories[0] ? config.categories[0].id : "";
  var selectedId = config.defaultId || "original";
  var richTextControls = richText.init(editor, toolbar);

  function selectedPreset() {
    return config.get(selectedId);
  }

  function updatePreview() {
    var safeHtml = richText.getHtml(editor);
    previewContent.innerHTML = safeHtml;
    if (compatibilityTextarea) compatibilityTextarea.value = richText.getText(editor);
    updateContrast();
  }

  function luminance(color) {
    var hex = richText.safeColor(color);
    if (!hex) return null;
    var rgb = hex.slice(1).match(/.{2}/g).map(function (part) { return parseInt(part, 16) / 255; });
    var linear = rgb.map(function (channel) {
      return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  }

  function hasLowContrast(foreground, background) {
    var foregroundLuminance = luminance(foreground);
    var backgroundLuminance = luminance(background);
    if (foregroundLuminance === null || backgroundLuminance === null) return false;
    var light = Math.max(foregroundLuminance, backgroundLuminance);
    var dark = Math.min(foregroundLuminance, backgroundLuminance);
    return (light + 0.05) / (dark + 0.05) < 4.5;
  }

  function updateContrast() {
    if (!contrastStatus) return;
    var preset = selectedPreset();
    var baseColor = richText.safeColor(previewContent.style.backgroundColor) || preset.base;
    var defaultInk = richText.safeColor(previewContent.style.color) || preset.ink;
    var low = hasLowContrast(defaultInk, baseColor);
    Array.prototype.forEach.call(previewContent.querySelectorAll("[style]"), function (element) {
      var foreground = element.style.color || window.getComputedStyle(element).color;
      var background = element.style.backgroundColor || baseColor;
      if (hasLowContrast(foreground, background)) low = true;
    });
    contrastStatus.textContent = low
      ? "Some selected ink colours may be difficult to read on this paper. Adjust them if needed."
      : "Default ink is checked for comfortable contrast. Your own colours stay unchanged.";
    contrastStatus.classList.toggle("is-warning", low);
  }

  function selectPaper(id) {
    var preset = config.get(id);
    selectedId = preset.id;
    currentName.textContent = preset.name;
    config.apply(previewContent, preset.id);
    previewContent.style.setProperty("--paper-font", '"' + preset.suggestedFont + '", Georgia, serif');

    Array.prototype.forEach.call(gallery.querySelectorAll(".paper-card"), function (card) {
      var isSelected = card.getAttribute("data-paper-id") === selectedId;
      card.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    updateContrast();
  }

  function renderCategoryTabs() {
    categoriesHost.textContent = "";
    config.categories.forEach(function (category) {
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "paper-category";
      tab.id = "paper-category-" + category.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "paper-gallery");
      tab.setAttribute("aria-selected", category.id === activeCategory ? "true" : "false");
      tab.tabIndex = category.id === activeCategory ? 0 : -1;
      tab.textContent = category.label;
      tab.addEventListener("click", function () {
        activeCategory = category.id;
        renderCategoryTabs();
        renderCards();
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        var index = config.categories.indexOf(category);
        var offset = event.key === "ArrowRight" ? 1 : -1;
        var next = config.categories[(index + offset + config.categories.length) % config.categories.length];
        activeCategory = next.id;
        renderCategoryTabs();
        renderCards();
        document.getElementById("paper-category-" + next.id).focus();
      });
      categoriesHost.appendChild(tab);
    });
  }

  function renderCards() {
    gallery.textContent = "";
    config.styles.filter(function (style) {
      return style.id !== (config.defaultId || "original") && style.category === activeCategory;
    }).forEach(function (style) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "paper-card";
      card.setAttribute("data-paper-id", style.id);
      card.setAttribute("aria-pressed", style.id === selectedId ? "true" : "false");
      card.setAttribute("aria-label", style.name + ". " + style.description);

      var thumb = document.createElement("span");
      thumb.className = "paper-thumb";
      thumb.setAttribute("data-texture", style.texture || "original");
      thumb.setAttribute("aria-hidden", "true");
      thumb.style.setProperty("--thumb-base", style.base || "#fffaf3");

      var name = document.createElement("span");
      name.className = "paper-card-name";
      name.textContent = style.name;
      var description = document.createElement("span");
      description.className = "paper-card-description";
      description.textContent = style.description;
      card.appendChild(thumb);
      card.appendChild(name);
      card.appendChild(description);
      card.addEventListener("pointerdown", function (event) {
        if (richTextControls && richTextControls.saveRange) richTextControls.saveRange();
        event.preventDefault();
      });
      card.addEventListener("click", function () {
        selectPaper(style.id);
      });
      gallery.appendChild(card);
    });
  }

  resetButton.addEventListener("click", function () {
    selectPaper(config.defaultId || "original");
    var original = config.get(config.defaultId || "original");
    activeCategory = original.category;
    renderCategoryTabs();
    renderCards();
    var originalTab = document.getElementById("paper-category-" + activeCategory);
    if (originalTab) originalTab.focus();
  });
  resetButton.addEventListener("pointerdown", function (event) {
    if (richTextControls && richTextControls.saveRange) richTextControls.saveRange();
    event.preventDefault();
  });

  suggestionButton.addEventListener("click", function () {
    var preset = selectedPreset();
    if (!richTextControls || typeof richTextControls.applySuggestion !== "function") return;
    richTextControls.applySuggestion(preset.suggestedFont, preset.suggestedColor);
    updatePreview();
  });

  editor.addEventListener("input", updatePreview);
  renderCategoryTabs();
  renderCards();
  selectPaper(selectedId);
  updatePreview();

  window.DEAREST_PAPER_UI = {
    getContent: function () {
      return {
        paperId: selectedId,
        richTextHtml: richText.getHtml(editor),
        text: richText.getText(editor)
      };
    },
    updateContrast: updateContrast
  };
})();
