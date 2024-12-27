Option Explicit

Dim objFSO, objShell, objWMI, colProcessors, objProcessor
Dim threads, maxThreads, jsonFile, jsonContent, startupFolder, shortcutPath, luncherPath

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

jsonFile = objShell.CurrentDirectory & "\config.json"
startupFolder = objShell.SpecialFolders("Startup")
shortcutPath = startupFolder & "\luncher.vbs.lnk"
luncherPath = objShell.CurrentDirectory & "\luncher.vbs"

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

' Create a shortcut to the luncher.vbs in the Startup folder
Dim shortcut
Set shortcut = objShell.CreateShortcut(shortcutPath)
shortcut.TargetPath = luncherPath
shortcut.WorkingDirectory = objShell.CurrentDirectory
shortcut.Save

Dim selfPath
selfPath = WScript.ScriptFullName
CreateObject("Scripting.FileSystemObject").DeleteFile selfPath
