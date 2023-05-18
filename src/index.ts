import * as vscode from 'vscode'

export function activate(context: any) {
  // todo: 解决iframe与vscode通信问题
  vscode.commands.registerCommand('vscode-icones.openUrl', () => {
    const panel = vscode.window.createWebviewPanel(
      'webview panel',
      'Icones',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')],

      },
    )
    const scriptPathOnDisk = vscode.Uri.joinPath(context.extensionUri, 'media', 'main.js')

    // And the uri we use to load this script in the webview
    const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk)
    const nonce = getNonce()
    const iconesUrl = 'https://vscode-icones.netlify.app/'
    // dev url
    // const iconesUrl = 'http://127.0.0.1:3333/'
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
          <iframe id="icones" src="${iconesUrl}" width="100%" height="100%"></iframe>
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `
    panel.webview.onDidReceiveMessage(
      ({ type, data }) => {
        // 设置剪贴板内容
        if (type === 'copy') {
          vscode.env.clipboard.writeText(data).then(() => {
            vscode.window.showInformationMessage('复制成功!  ✅')
          })
        }
      },
    )
  })
}

export function deactivate() {
}

function getNonce() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
