var fso = WScript.CreateObject('Scripting.FileSystemObject');
var script_base = fso.GetParentFolderName(WScript.ScriptFullName);

var pageant_path = 'c:\\program files\\iputty\\pageant.exe'
if (!fso.FileExists(pageant_path)) {
	WScript.echo('pageant not found')
	WScript.Quit(1);
}


var shell = WScript.CreateObject('WScript.Shell')
var env = shell.Environment('PROCESS')
var my_documents_path = shell.SpecialFolders('MyDocuments')
var home_path = env('HOMEDRIVE')+env('HOMEPATH')

var ppk_path = my_documents_path + '\\schan.ppk'
if (!fso.FileExists(ppk_path)) {
	WScript.echo('ppk not found')
	WScript.Quit(2);
}

var plink_script_path = script_base + '\\plink-schan.js'
if (!fso.FileExists(plink_script_path)) {
	WScript.echo('plink-schan.js not found')
	WScript.Quit(3)
}
var cmd = '"'+pageant_path+'" "'+ppk_path+'" -c "'+plink_script_path+'"';
shell.run(cmd, 1)

//var start_folder = shell.SpecialFolders('Start')

