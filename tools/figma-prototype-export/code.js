// Export Prototype Interactions v2 — dumps every prototype reaction on the
// current page (trigger, action, destination, animation, easing, duration)
// as JSON so agents can implement Figma animations exactly.
// UI is created inline via figma.showUI() — no external ui.html needed.

const MAX_DEPTH = 16;
const out = [];

function sanitize(value) {
  return JSON.parse(JSON.stringify(value));
}

function collect(node, depth) {
  if (!node || depth > MAX_DEPTH) return;
  if (Array.isArray(node.reactions) && node.reactions.length > 0) {
    out.push({
      id: node.id,
      name: node.name,
      type: node.type,
      reactions: sanitize(node.reactions),
    });
  }
  if ("children" in node) {
    for (const child of node.children) collect(child, depth + 1);
  }
}

collect(figma.currentPage, 0);

const payload = {
  file: figma.root.name,
  page: figma.currentPage.name,
  pageId: figma.currentPage.id,
  count: out.length,
  nodes: out,
};

const UI_HTML = `
<!doctype html>
<html>
  <head>
    <style>
      body { font-family: Inter, sans-serif; margin: 0; padding: 12px; }
      textarea { width: 100%; height: calc(100vh - 100px); box-sizing: border-box; font-family: monospace; font-size: 11px; }
      .row { margin-top: 8px; display: flex; gap: 8px; }
      button { flex: 1; padding: 8px; cursor: pointer; }
      #status { margin-top: 6px; color: #555; font-size: 12px; }
    </style>
  </head>
  <body>
    <textarea id="out" readonly></textarea>
    <div class="row">
      <button id="copy">Copy JSON</button>
      <button id="download">Download .json</button>
    </div>
    <div id="status">Menunggu data…</div>
    <script>
      onmessage = function (event) {
        var data = event.data.pluginMessage;
        if (data && data.type === "json") {
          document.getElementById("out").value = data.json;
          document.getElementById("status").textContent =
            data.json.length + " chars — klik Download, simpan ke docs/figma-prototype/interactions.json";
        }
      };
      document.getElementById("copy").onclick = function () {
        var t = document.getElementById("out");
        t.select();
        document.execCommand("copy");
        document.getElementById("status").textContent = "Copied!";
      };
      document.getElementById("download").onclick = function () {
        var blob = new Blob([document.getElementById("out").value], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "figma-interactions.json";
        a.click();
      };
    </script>
  </body>
</html>`;

figma.showUI(UI_HTML, { width: 560, height: 640 });
figma.ui.postMessage({ type: "json", json: JSON.stringify(payload, null, 2) });
