let pyodideReady = false;
let pyodide;

async function main() {
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
    // Redirect stdout/stderr using Python's contextlib
    await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = sys.stderr = StringIO()
    `);

    // Run user code
    await pyodide.runPythonAsync(code);

    // Get the printed output
    const result = await pyodide.runPythonAsync(`sys.stdout.getvalue()`);
    output.textContent = result || "(No output)";
  } catch (err) {
    output.textContent = `❌ Error:\n${err}`;
  }
}
