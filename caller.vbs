Option Explicit

Dim objShell, luncherPath

Set objShell = CreateObject("WScript.Shell")
luncherPath = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\luncher.vbs")

If objShell.ExpandEnvironmentStrings("%APPDATA%") <> "" Then
    ' Execute luncher.vbs in its correct working directory
    objShell.Run Chr(34) & luncherPath & Chr(34), 0, False
Else
    ' Log or handle error (optional)
End If
