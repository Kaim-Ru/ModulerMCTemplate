$addonName = Read-Host "Enter Addon Name (ADDON_NAME)"
$author = Read-Host "Enter Author Name (AUTHOR)"
$mcServerVersion = Read-Host "Enter @minecraft/server version (x.y.z)"
$mcServerUiVersion = Read-Host "Enter @minecraft/server-ui version (x.y.z)"

if ([string]::IsNullOrWhiteSpace($addonName)) {
    Write-Warning "Addon Name cannot be empty. Exiting."
    exit
}

if ([string]::IsNullOrWhiteSpace($author)) {
    Write-Warning "Author Name cannot be empty. Exiting."
    exit
}

if ([string]::IsNullOrWhiteSpace($mcServerVersion)) {
    Write-Warning "@minecraft/server version cannot be empty. Exiting."
    exit
}

if ([string]::IsNullOrWhiteSpace($mcServerUiVersion)) {
    Write-Warning "@minecraft/server-ui version cannot be empty. Exiting."
    exit
}

# Find the best matching npm version for a @minecraft package
# Priority: stable (x.y.z) > rc (x.y.z-rc.N) > beta (x.y.z-beta.N)
function Get-MinecraftPackageVersion {
    param([string]$PackageName, [string]$Version)

    Write-Host "Fetching versions for $PackageName ..." -ForegroundColor Cyan
    $allVersionsJson = npm view $PackageName versions --json 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Failed to fetch versions for ${PackageName}: $allVersionsJson"
        return $null
    }

    $allVersions = $allVersionsJson | ConvertFrom-Json

    $matching = @($allVersions | Where-Object { $_ -eq $Version -or $_ -like "$Version-*" })

    if ($matching.Count -eq 0) {
        Write-Warning "No versions found for $PackageName matching $Version"
        return $null
    }

    # Stable release
    $stable = @($matching | Where-Object { $_ -eq $Version })
    if ($stable.Count -gt 0) { return $stable[0] }

    # RC release (highest RC number wins)
    $rc = @($matching | Where-Object { $_ -like "$Version-rc.*" }) |
        Sort-Object { [int]([regex]::Match($_, '-rc\.(\d+)$').Groups[1].Value) } -Descending |
        Select-Object -First 1
    if ($rc) { return $rc }

    # Beta release (highest beta number wins)
    $beta = @($matching | Where-Object { $_ -like "$Version-beta.*" }) |
        Sort-Object { [int]([regex]::Match($_, '-beta\.(\d+)$').Groups[1].Value) } -Descending |
        Select-Object -First 1
    if ($beta) { return $beta }

    return $null
}

$mcServerNpmVersion = Get-MinecraftPackageVersion -PackageName "@minecraft/server" -Version $mcServerVersion
if (-not $mcServerNpmVersion) {
    Write-Warning "Could not resolve npm version for @minecraft/server $mcServerVersion. Exiting."
    exit
}
Write-Host "@minecraft/server  : $mcServerVersion  ->  npm: $mcServerNpmVersion" -ForegroundColor Green

$mcServerUiNpmVersion = Get-MinecraftPackageVersion -PackageName "@minecraft/server-ui" -Version $mcServerUiVersion
if (-not $mcServerUiNpmVersion) {
    Write-Warning "Could not resolve npm version for @minecraft/server-ui $mcServerUiVersion. Exiting."
    exit
}
Write-Host "@minecraft/server-ui: $mcServerUiVersion  ->  npm: $mcServerUiNpmVersion" -ForegroundColor Green

# Generate 5 new UUIDs
$uuid1 = [guid]::NewGuid().ToString()
$uuid2 = [guid]::NewGuid().ToString()
$uuid3 = [guid]::NewGuid().ToString()
$uuid4 = [guid]::NewGuid().ToString()
$uuid5 = [guid]::NewGuid().ToString()

$files = @(
    "packs/BP/manifest.json",
    "packs/RP/manifest.json",
    "config.json",
    "deno.json"
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
        $content = $content.Replace("[[[MC_SERVER_VERSION]]]", $mcServerVersion)
        $content = $content.Replace("[[[MC_SERVER_UI_VERSION]]]", $mcServerUiVersion)
        $content = $content.Replace("[[[MC_SERVER_VERSION_NPM]]]", $mcServerNpmVersion)
        $content = $content.Replace("[[[MC_SERVER_UI_VERSION_NPM]]]", $mcServerUiNpmVersion)
        
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
