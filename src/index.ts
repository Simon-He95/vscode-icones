import * as vscode from 'vscode'

export function activate() {
  vscode.commands.registerCommand('iframe-icones.openUrl', () => {
    const panel = vscode.window.createWebviewPanel(
      'exampleWebView',
      'webview',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      },
    )

    panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>icones</title>
          <style>
            body{
              width:100%;
              height:100vh;
            }
          </style>
        </head>
        <body>
          <iframe src="https://icones.js.org/collection/all" width="100%" height="100%"></iframe>
        </body>
      </html>
    `
  })
}

export function deactivate() {
}
