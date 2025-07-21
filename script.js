let pyodideReady = false;
let pyodide;

async function main() {
    debugger
  pyodide = await loadPyodide();
  pyodideReady = true;
}

main();

async function runPython() {
  if (!pyodideReady) {
    document.getElementById("output").textContent = "⏳ Loading Python interpreter...";
    return;
  }

  const code = document.getElementById("python-code").value;
  const output = document.getElementById("output");
  try {
    let result = await pyodide.runPythonAsync(code);
    output.textContent = result ?? "(No output)";
  } catch (err) {
    output.textContent = `❌ Error:\n${err}`;
  }
}
