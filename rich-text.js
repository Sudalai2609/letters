/* Dearest rich-text editing and safe document serialization. */
(function () {
  var TAGS = {
    p: "p", div: "div", br: "br", strong: "strong", b: "strong",
    em: "em", i: "em", u: "u", s: "s", strike: "s",
    h1: "h1", h2: "h2", h3: "h3", blockquote: "blockquote",
    ul: "ul", ol: "ol", li: "li", span: "span", small: "small", big: "big"
  };
  var DROP_WITH_CONTENT = {
    script: 1, style: 1, iframe: 1, object: 1, embed: 1, svg: 1,
    math: 1, template: 1, noscript: 1, form: 1, input: 1, button: 1,
    textarea: 1, select: 1, video: 1, audio: 1, canvas: 1, link: 1,
    meta: 1, base: 1
  };
  var SAFE_FONTS = [
    "Cormorant Garamond", "Georgia", "Pinyon Script", "Caveat", "Arial",
    "Times New Roman", "Palatino Linotype", "Verdana"
  ];
  var SIZE_MAP = { "1": 12, "2": 14, "3": 16, "4": 18, "5": 24, "6": 32, "7": 40 };

  function contains(root, node) {
    return !!node && (node === root || root.contains(node.nodeType === 1 ? node : node.parentNode));
  }

  function toHex(value) {
    value = String(value || "").trim();
    var shortHex = /^#([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(value);
    if (shortHex) return ("#" + shortHex[1] + shortHex[1] + shortHex[2] + shortHex[2] + shortHex[3] + shortHex[3]).toLowerCase();
    if (/^#[a-f0-9]{6}$/i.test(value)) return value.toLowerCase();
    var rgb = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i.exec(value);
    if (!rgb || (rgb[4] && Number(rgb[4]) < 0.98)) return "";
    var values = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    if (values.some(function (n) { return n < 0 || n > 255; })) return "";
    return "#" + values.map(function (n) { return n.toString(16).padStart(2, "0"); }).join("");
  }

  function safeFont(value) {
    value = String(value || "").replace(/["']/g, "").split(",")[0].trim();
    for (var i = 0; i < SAFE_FONTS.length; i++) {
      if (value.toLowerCase() === SAFE_FONTS[i].toLowerCase()) return SAFE_FONTS[i];
    }
    return "";
  }

  function safeSize(value) {
    value = String(value || "").trim().toLowerCase();
    var points = /^([0-9]+(?:\.[0-9]+)?)pt$/.exec(value);
    var pixels = /^([0-9]+(?:\.[0-9]+)?)px$/.exec(value);
    var ems = /^([0-9]+(?:\.[0-9]+)?)(?:em|rem)$/.exec(value);
    var amount = pixels ? Number(pixels[1]) : points ? Number(points[1]) * 4 / 3 : ems ? Number(ems[1]) * 16 : NaN;
    if (!isFinite(amount) || amount < 10 || amount > 48) return "";
    return Math.round(amount) + "px";
  }

  function styleValue(styleText, property) {
    var declarations = String(styleText || "").split(";");
    for (var i = 0; i < declarations.length; i++) {
      var split = declarations[i].indexOf(":");
      if (split < 0) continue;
      if (declarations[i].slice(0, split).trim().toLowerCase() === property) {
        return declarations[i].slice(split + 1).trim();
      }
    }
    return "";
  }

  function copySafeStyle(source, target) {
    var styleText = source.getAttribute("style") || "";
    var font = safeFont(styleValue(styleText, "font-family"));
    var size = safeSize(styleValue(styleText, "font-size"));
    var color = toHex(styleValue(styleText, "color"));
    var highlight = toHex(styleValue(styleText, "background-color"));
    var align = styleValue(styleText, "text-align").toLowerCase();
    var weight = styleValue(styleText, "font-weight").toLowerCase();
    var fontStyle = styleValue(styleText, "font-style").toLowerCase();
    var decoration = styleValue(styleText, "text-decoration-line") || styleValue(styleText, "text-decoration");
    decoration = decoration.toLowerCase().split(/\s+/).filter(function (part) {
      return part === "underline" || part === "line-through";
    }).join(" ");
    if (!font && source.tagName.toLowerCase() === "font") font = safeFont(source.getAttribute("face"));
    if (!color && source.tagName.toLowerCase() === "font") color = toHex(source.getAttribute("color"));
    if (!size && source.tagName.toLowerCase() === "font") {
      size = safeSize((SIZE_MAP[source.getAttribute("size")] || 0) + "px");
    }
    if (font) target.style.fontFamily = '"' + font + '", Georgia, serif';
    if (size) target.style.fontSize = size;
    if (color) target.style.color = color;
    if (highlight) target.style.backgroundColor = highlight;
    if (align === "left" || align === "center" || align === "right") target.style.textAlign = align;
    if (/^(normal|bold|bolder|lighter|[1-9]00)$/.test(weight)) target.style.fontWeight = weight;
    if (/^(normal|italic|oblique)$/.test(fontStyle)) target.style.fontStyle = fontStyle;
    if (decoration) target.style.textDecoration = decoration;
  }

  function sanitize(input) {
    if (typeof document === "undefined" || typeof DOMParser === "undefined") return "";
    var parsed = new DOMParser().parseFromString(String(input || ""), "text/html");
    var output = document.createElement("div");

    function copyChildren(source, target) {
      Array.prototype.forEach.call(source.childNodes, function (node) {
        if (node.nodeType === 3) {
          target.appendChild(document.createTextNode(node.nodeValue || ""));
          return;
        }
        if (node.nodeType !== 1) return;
        var tag = node.tagName.toLowerCase();
        if (DROP_WITH_CONTENT[tag]) return;
        var safeTag = TAGS[tag];
        if (!safeTag) {
          copyChildren(node, target);
          return;
        }
        var clean = document.createElement(safeTag);
        if (tag !== "br") {
          copySafeStyle(node, clean);
          copyChildren(node, clean);
        }
        target.appendChild(clean);
      });
    }

    copyChildren(parsed.body, output);
    return output.innerHTML;
  }

  function plainTextToHtml(text) {
    return String(text || "").replace(/\r\n?/g, "\n").split(/\n{2,}/).map(function (block) {
      var content = block.split("\n").map(function (line) {
        return line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }).join("<br>");
      return content ? "<p>" + content + "</p>" : "";
    }).filter(Boolean).join("");
  }

  function plainText(html) {
    if (typeof document === "undefined") return "";
    var safe = document.createElement("div");
    safe.innerHTML = sanitize(html);
    var chunks = [];
    function walk(node) {
      if (node.nodeType === 3) {
        chunks.push(node.nodeValue || "");
        return;
      }
      if (node.nodeType !== 1) return;
      var tag = node.tagName.toLowerCase();
      if (tag === "br") { chunks.push("\n"); return; }
      var isBlock = /^(p|div|h1|h2|h3|blockquote|li)$/.test(tag);
      if (isBlock && chunks.length && chunks[chunks.length - 1] !== "\n") chunks.push("\n");
      Array.prototype.forEach.call(node.childNodes, walk);
      if (isBlock && chunks[chunks.length - 1] !== "\n") chunks.push("\n");
    }
    Array.prototype.forEach.call(safe.childNodes, walk);
    return chunks.join("").replace(/\u00a0/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  }

  function getHtml(element) {
    return sanitize(element ? element.innerHTML : "");
  }

  function getText(element) {
    return plainText(getHtml(element));
  }

  function init(editor, toolbar) {
    if (!editor || !toolbar || editor.dataset.richTextReady === "1") return;
    editor.dataset.richTextReady = "1";
    document.execCommand("styleWithCSS", false, true);
    var lastRange = null;
    function eventElement(event) {
      return event.target && event.target.nodeType === 1 ? event.target : event.target && event.target.parentElement;
    }

    function saveRange() {
      var selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      var range = selection.getRangeAt(0);
      if (contains(editor, range.commonAncestorContainer)) lastRange = range.cloneRange();
    }

    function restoreRange(focusEditor) {
      if (!lastRange || !contains(editor, lastRange.commonAncestorContainer)) return false;
      if (focusEditor) editor.focus({ preventScroll: true });
      var selection = window.getSelection();
      if (!selection) return false;
      selection.removeAllRanges();
      selection.addRange(lastRange);
      return true;
    }

    function notifyChange() {
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      saveRange();
    }

    function run(command, value) {
      if (command === "lineBreak") {
        document.execCommand("insertHTML", false, "<br>");
      } else {
        document.execCommand(command, false, value || null);
      }
      notifyChange();
    }

    document.addEventListener("selectionchange", saveRange);
    editor.addEventListener("keyup", saveRange);
    editor.addEventListener("mouseup", saveRange);
    editor.addEventListener("input", saveRange);
    editor.addEventListener("focus", function () { restoreRange(false); });

    toolbar.addEventListener("pointerdown", function (event) {
      var target = eventElement(event);
      if (target && target.closest("button")) {
        saveRange();
        event.preventDefault();
      } else {
        saveRange();
      }
    });

    toolbar.addEventListener("click", function (event) {
      var target = eventElement(event);
      var button = target && target.closest("[data-rte-command]");
      if (!button || button.tagName.toLowerCase() !== "button") return;
      restoreRange(true);
      run(button.getAttribute("data-rte-command"), button.getAttribute("data-rte-value") || "");
    });

    toolbar.addEventListener("change", function (event) {
      var target = eventElement(event);
      var control = target && target.closest("[data-rte-command], [data-rte-color]");
      if (!control || control.tagName.toLowerCase() === "button") return;
      restoreRange(true);
      var colorCommand = control.getAttribute("data-rte-color");
      var command = control.getAttribute("data-rte-command");
      if (colorCommand) run(colorCommand, control.value);
      else if (command) run(command, control.value);
    });

    editor.addEventListener("paste", function (event) {
      var clip = event.clipboardData;
      if (!clip) return;
      event.preventDefault();
      var html = clip.getData("text/html");
      var clean = html ? sanitize(html) : plainTextToHtml(clip.getData("text/plain"));
      document.execCommand("insertHTML", false, clean);
      notifyChange();
    });

    return {
      saveRange: saveRange,
      restoreRange: restoreRange,
      applySuggestion: function (font, color) {
        if (!restoreRange(true)) {
          editor.focus({ preventScroll: true });
          var range = document.createRange();
          range.selectNodeContents(editor);
          range.collapse(false);
          var selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            lastRange = range.cloneRange();
          }
        }
        if (font && safeFont(font)) document.execCommand("fontName", false, safeFont(font));
        if (color && toHex(color)) document.execCommand("foreColor", false, toHex(color));
        notifyChange();
      }
    };
  }

  window.DEAREST_RICH_TEXT = {
    sanitize: sanitize,
    plainText: plainText,
    plainTextToHtml: plainTextToHtml,
    getHtml: getHtml,
    getText: getText,
    init: init,
    safeFont: safeFont,
    safeColor: toHex
  };
})();
