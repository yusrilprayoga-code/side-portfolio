# Image Optimization Script for Portfolio
# Run this to compress all images in public folder

Write-Host "Starting Image Optimization..." -ForegroundColor Cyan
Write-Host ""

# Check if sharp-cli is installed
$sharpInstalled = npm list -g sharp-cli 2>$null
if (-not $sharpInstalled) {
    Write-Host "WARNING: sharp-cli not found. Installing..." -ForegroundColor Yellow
    npm install -g sharp-cli
}

# Create optimized output folder
$outputFolder = "public/images-optimized"
if (-not (Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
}

# Optimize images folder
Write-Host "Optimizing /public/images/ folder..." -ForegroundColor Green
Get-ChildItem -Path "public/images" -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Replace("$PWD\public\images\", "")
    $outputPath = Join-Path $outputFolder $relativePath
    $outputDir = Split-Path $outputPath -Parent
    
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    Write-Host "  Compressing: $($_.Name)" -ForegroundColor Gray
    
    # Convert to WebP with 80% quality
    sharp -i $_.FullName -o "$outputPath.webp" -f webp -q 80
}

# Optimize certificates folder
Write-Host ""
Write-Host "Optimizing /public/certificate/ folder..." -ForegroundColor Green
$certOutputFolder = "public/certificate-optimized"
if (-not (Test-Path $certOutputFolder)) {
    New-Item -ItemType Directory -Path $certOutputFolder | Out-Null
}

Get-ChildItem -Path "public/certificate" -Include *.png,*.PNG -Recurse | ForEach-Object {
    $outputPath = Join-Path $certOutputFolder "$($_.BaseName).webp"
    
    Write-Host "  Compressing: $($_.Name)" -ForegroundColor Gray
    sharp -i $_.FullName -o $outputPath -f webp -q 75
}

Write-Host ""
Write-Host "SUCCESS: Image optimization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Size Comparison:" -ForegroundColor Cyan

# Calculate original size
$originalSize = (Get-ChildItem -Path "public/images","public/certificate" -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
$optimizedSize = (Get-ChildItem -Path $outputFolder,$certOutputFolder -Include *.webp -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
$savings = $originalSize - $optimizedSize
$savingsPercent = ($savings / $originalSize) * 100

Write-Host "  Original:  $([math]::Round($originalSize, 2)) MB" -ForegroundColor Red
Write-Host "  Optimized: $([math]::Round($optimizedSize, 2)) MB" -ForegroundColor Green
Write-Host "  Savings:   $([math]::Round($savings, 2)) MB ($([math]::Round($savingsPercent, 1)) percent)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Review optimized images in /public/images-optimized and /public/certificate-optimized"
Write-Host "  2. If satisfied, replace original folders"
Write-Host "  3. Update import paths to use .webp extension"
Write-Host ""
