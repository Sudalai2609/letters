/* Dearest paper presets. Add a preset here and it appears in the gallery. */
(function () {
  var categories = [
    { id: "classic", label: "Classic & Minimal" },
    { id: "vintage", label: "Vintage & Aged" },
    { id: "coffee", label: "Coffee & Tea" },
    { id: "romantic", label: "Romantic & Whimsical" },
    { id: "special", label: "Special & Artistic" }
  ];

  var styles = [
    {
      id: "original", category: "classic", name: "Original Dearest paper",
      description: "The familiar letter paper, styled to suit your letter.",
      texture: "original", base: "#fffaf3", ink: "#3a0f1f",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3a0f1f"
    },
    {
      id: "clean-ivory", category: "classic", name: "Clean ivory stationery",
      description: "Smooth ivory with a quiet, natural paper grain.",
      texture: "ivory", base: "#fbf7ed", ink: "#342a20",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#342a20"
    },
    {
      id: "warm-cream", category: "classic", name: "Warm cream paper",
      description: "A softly warm sheet with faint handmade fibres.",
      texture: "cream-fibre", base: "#f7efdf", ink: "#3b2d20",
      suggestedFont: "Georgia", suggestedColor: "#3b2d20"
    },
    {
      id: "soft-white", category: "classic", name: "Soft white writing paper",
      description: "Matte white with a restrained, fine-grain finish.",
      texture: "soft-white", base: "#f8f7f2", ink: "#292923",
      suggestedFont: "Georgia", suggestedColor: "#292923"
    },
    {
      id: "pastel-pink", category: "classic", name: "Pastel pink stationery",
      description: "Blush-tinted paper with a barely-there petal wash.",
      texture: "pink-wash", base: "#f8e9e8", ink: "#543543",
      suggestedFont: "Caveat", suggestedColor: "#543543"
    },
    {
      id: "muted-lavender", category: "classic", name: "Muted lavender paper",
      description: "A cool lilac cast, softened by a delicate paper grain.",
      texture: "lavender-wash", base: "#eee9f2", ink: "#393247",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#393247"
    },
    {
      id: "pale-blue", category: "classic", name: "Pale blue stationery",
      description: "Light blue writing paper with subtle natural fibres.",
      texture: "blue-fibre", base: "#e8f0f2", ink: "#263b45",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#263b45"
    },
    {
      id: "aged-parchment", category: "vintage", name: "Naturally aged parchment",
      description: "Softly warmed edges and fine parchment grain.",
      texture: "parchment-edge", edge: "deckled", base: "#eee0c2", ink: "#3b2d1d",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3b2d1d"
    },
    {
      id: "antique-yellow", category: "vintage", name: "Antique yellowed paper",
      description: "Aged ivory with uneven golden undertones.",
      texture: "yellowed", base: "#eadcaf", ink: "#3c301b",
      suggestedFont: "Georgia", suggestedColor: "#3c301b"
    },
    {
      id: "old-manuscript", category: "vintage", name: "Old manuscript paper",
      description: "A parchment surface with a quiet, faded margin.",
      texture: "manuscript", edge: "deckled", base: "#eee2c6", ink: "#3b2b1a",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3b2b1a"
    },
    {
      id: "faded-archive", category: "vintage", name: "Faded archival paper",
      description: "Softly faded with delicate corner ageing.",
      texture: "archive-fade", base: "#eee8d9", ink: "#343027",
      suggestedFont: "Georgia", suggestedColor: "#343027"
    },
    {
      id: "vintage-journal", category: "vintage", name: "Vintage journal paper",
      description: "Aged, lightly ruled paper with a worn binding edge.",
      texture: "journal", base: "#f0e5cc", ink: "#3b2d20",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3b2d20"
    },
    {
      id: "wrinkled", category: "vintage", name: "Slightly crumpled paper",
      description: "Gentle light and shadow suggest a page handled by hand.",
      texture: "wrinkle", base: "#efe5d1", ink: "#3c3021",
      suggestedFont: "Georgia", suggestedColor: "#3c3021"
    },
    {
      id: "torn-edge", category: "vintage", name: "Torn-edge paper",
      description: "A lightly irregular edge with a soft aged surface.",
      texture: "parchment-edge", edge: "torn", base: "#f1e3c7", ink: "#3b2d1d",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3b2d1d"
    },
    {
      id: "folded", category: "vintage", name: "Folded paper",
      description: "Faint crease marks cross a naturally warm sheet.",
      texture: "fold", base: "#f0e4cc", ink: "#3a2c1e",
      suggestedFont: "Georgia", suggestedColor: "#3a2c1e"
    },
    {
      id: "coffee-light", category: "coffee", name: "Light coffee-stained paper",
      description: "A pale wash and one delicate, faded ring.",
      texture: "coffee-light", base: "#f3e8d6", ink: "#3d3024",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#4a3424"
    },
    {
      id: "coffee-rings", category: "coffee", name: "Coffee-ring stationery",
      description: "A restrained coffee ring rests near the page edge.",
      texture: "coffee-ring", base: "#eee0cc", ink: "#392b20",
      suggestedFont: "Georgia", suggestedColor: "#4a3322"
    },
    {
      id: "tea-parchment", category: "coffee", name: "Tea-stained parchment",
      description: "Soft amber tea tones with uneven, natural variation.",
      texture: "tea-stain", edge: "deckled", base: "#efe0c1", ink: "#3b2d1c",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#493421"
    },
    {
      id: "brown-edges", category: "coffee", name: "Unevenly aged paper",
      description: "Subtle brown edges fade gradually toward the centre.",
      texture: "brown-edges", base: "#eee4d0", ink: "#3b3025",
      suggestedFont: "Georgia", suggestedColor: "#493628"
    },
    {
      id: "faded-corners", category: "coffee", name: "Faded-corner vintage letter",
      description: "Delicate stains and softened corners, kept light.",
      texture: "faded-corners", base: "#f0e5d3", ink: "#3b2d21",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#493628"
    },
    {
      id: "pressed-flowers", category: "romantic", name: "Pressed-flower details",
      description: "Tiny pressed blooms sit quietly around the sheet.",
      texture: "pressed-flowers", base: "#f5eee4", ink: "#393128",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#393128"
    },
    {
      id: "botanical", category: "romantic", name: "Subtle botanical stationery",
      description: "Faint leaf forms and a soft natural-paper grain.",
      texture: "botanical", base: "#f0efe4", ink: "#30372b",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#30372b"
    },
    {
      id: "floral-border", category: "romantic", name: "Faint floral border",
      description: "A pale floral edge leaves the writing area clear.",
      texture: "floral-border", base: "#f7efeb", ink: "#49363b",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#49363b"
    },
    {
      id: "handwritten-motifs", category: "romantic", name: "Handwritten-style motifs",
      description: "Very faint ink flourishes beneath the letter.",
      texture: "handwritten-motifs", base: "#f4eee7", ink: "#3d3332",
      suggestedFont: "Caveat", suggestedColor: "#46343a"
    },
    {
      id: "dreamy-grain", category: "romantic", name: "Dreamy paper grain",
      description: "A soft, quiet wash with barely visible texture.",
      texture: "dreamy-grain", base: "#f5edf0", ink: "#3b3039",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3b3039"
    },
    {
      id: "recycled-fibre", category: "special", name: "Recycled handmade paper",
      description: "Visible short fibres make each sheet feel hand-pressed.",
      texture: "recycled-fibre", edge: "deckled", base: "#eee9dc", ink: "#34352c",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#34352c"
    },
    {
      id: "watercolour", category: "special", name: "Watercolour paper",
      description: "A softly mottled surface with fine cold-press grain.",
      texture: "watercolour", base: "#f1ece5", ink: "#37312c",
      suggestedFont: "Georgia", suggestedColor: "#37312c"
    },
    {
      id: "linen", category: "special", name: "Linen-textured stationery",
      description: "A fine crosshatch recalls woven linen fibres.",
      texture: "linen", base: "#f2eee3", ink: "#39352c",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#39352c"
    },
    {
      id: "rough-handmade", category: "special", name: "Rough-edged handmade paper",
      description: "A natural deckled edge and light handmade fibres.",
      texture: "rough-fibre", edge: "rough", base: "#eee6d7", ink: "#373127",
      suggestedFont: "Georgia", suggestedColor: "#373127"
    },
    {
      id: "old-notebook", category: "special", name: "Old notebook paper",
      description: "Faint blue rules and a faded red margin.",
      texture: "notebook", base: "#f3efe2", ink: "#303c4a",
      suggestedFont: "Georgia", suggestedColor: "#303c4a"
    },
    {
      id: "faint-ruled", category: "special", name: "Faint ruled paper",
      description: "Very light writing lines on a warm, fibrous sheet.",
      texture: "faint-ruled", base: "#f4f0e5", ink: "#36362f",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#36362f"
    },
    {
      id: "antique-diary", category: "special", name: "Antique diary page",
      description: "Faded date lines, softened edges, and a little grain.",
      texture: "diary", edge: "deckled", base: "#efe4ce", ink: "#3a2d20",
      suggestedFont: "Cormorant Garamond", suggestedColor: "#3a2d20"
    }
  ];

  function get(id) {
    for (var i = 0; i < styles.length; i++) {
      if (styles[i].id === id) return styles[i];
    }
    return styles[0];
  }

  function has(id) {
    if (id === "original") return true;
    return styles.some(function (preset) { return preset.id === id; });
  }

  function apply(element, id) {
    if (!element) return get(id);
    var preset = get(id);
    element.classList.add("paper-sheet");
    element.setAttribute("data-paper-id", preset.id);
    element.setAttribute("data-texture", preset.texture || "original");
    if (preset.edge) element.setAttribute("data-edge", preset.edge);
    else element.removeAttribute("data-edge");
    element.style.removeProperty("background");
    element.style.backgroundColor = preset.base;
    element.style.setProperty("--paper-base", preset.base);
    element.style.setProperty("--paper-ink", preset.ink);
    element.style.setProperty("--paper-font", preset.suggestedFont);
    element.style.color = preset.ink;
    element.style.fontFamily = '"' + preset.suggestedFont + '", Georgia, serif';
    return preset;
  }

  window.DEAREST_PAPER_CONFIG = {
    defaultId: "original",
    categories: categories,
    styles: styles,
    get: get,
    has: has,
    apply: apply
  };
})();
