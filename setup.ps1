$addonName = Read-Host "Enter Addon Name (ADDON_NAME)"
$author = Read-Host "Enter Author Name (AUTHOR)"

if ([string]::IsNullOrWhiteSpace($addonName)) {
    Write-Warning "Addon Name cannot be empty. Exiting."
    exit
}

if ([string]::IsNullOrWhiteSpace($author)) {
    Write-Warning "Author Name cannot be empty. Exiting."
    exit
}

# Generate 5 new UUIDs
$uuid1 = [guid]::NewGuid().ToString()
$uuid2 = [guid]::NewGuid().ToString()
$uuid3 = [guid]::NewGuid().ToString()
$uuid4 = [guid]::NewGuid().ToString()
$uuid5 = [guid]::NewGuid().ToString()

$files = @(
    "packs/BP/manifest.json",
    "packs/RP/manifest.json",
    "config.json"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Replace placeholders
        $content = $content.Replace("[[[ADDON_NAME]]]", $addonName)
        $content = $content.Replace("[[[AUTHOR]]]", $author)
        $content = $content.Replace("[[[UUID1]]]", $uuid1)
        $content = $content.Replace("[[[UUID2]]]", $uuid2)
        $content = $content.Replace("[[[UUID3]]]", $uuid3)
        $content = $content.Replace("[[[UUID4]]]", $uuid4)
        $content = $content.Replace("[[[UUID5]]]", $uuid5)
        
        # Save file with UTF-8 Nobom encoding
        [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, [System.Text.Encoding]::UTF8)
        
        Write-Host "Updated: $file" -ForegroundColor Green
    } else {
        Write-Warning "File not found: $file"
    }
}

Write-Host "Please select a pack_icon.png file in the dialog..." -ForegroundColor Cyan
Add-Type -AssemblyName System.Windows.Forms
$owner = New-Object System.Windows.Forms.Form
$owner.TopMost = $true
$owner.WindowState = [System.Windows.Forms.FormWindowState]::Minimized
$owner.ShowInTaskbar = $false
$owner.Show()
$owner.Hide()

$dialog = New-Object System.Windows.Forms.OpenFileDialog
$dialog.Filter = "PNG Files (*.png)|*.png"
$dialog.Title = "Select pack_icon.png"

if ($dialog.ShowDialog($owner) -eq 'OK') {
    $iconPath = $dialog.FileName
    Copy-Item -Path $iconPath -Destination "packs/BP/pack_icon.png" -Force
    Copy-Item -Path $iconPath -Destination "packs/RP/pack_icon.png" -Force
    Write-Host "Copied: pack_icon.png to packs/BP and packs/RP" -ForegroundColor Green
} else {
    Write-Warning "Icon selection skipped."
}
$owner.Dispose()

Write-Host "Initialization complete!" -ForegroundColor Cyan
