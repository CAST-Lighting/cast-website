Get-ChildItem 'C:\Users\JARVIS\cast-website\core\lib\makeswift\components\cast\*.register.ts' | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $p = $c.Contains('paddingTop')
    $b = $c.Contains('bgColor')
    $name = $_.BaseName.Replace('.register','')
    "$name  |  padding=$p  |  bg=$b"
}
