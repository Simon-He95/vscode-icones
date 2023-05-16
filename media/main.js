// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
  const vscode = acquireVsCodeApi()
  window.addEventListener('message', (e) => {
    const data = e.data
    if (data) {
      if (data.eventType === 'copy')
        vscode.postMessage(data)
    }
  })
}())
