Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot '..\frontend\public\assets\figma\school\school-overview-photo.png'
$cleanPath = Join-Path $PSScriptRoot '..\frontend\public\assets\figma\school\school-overview-photo-clean.png'
$comparisonPath = Join-Path $PSScriptRoot '..\artifacts\school-overview-asset-comparison.png'

$source = [System.Drawing.Bitmap]::new((Resolve-Path $sourcePath).Path)
try {
  if ($source.Width -ne 452 -or $source.Height -ne 265) { throw "Unexpected source dimensions: $($source.Width)x$($source.Height)" }
  $crop = [System.Drawing.Rectangle]::new(16, 16, 420, 233)
  $clean = $source.Clone($crop, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try {
    $clean.Save((Join-Path (Split-Path $cleanPath) 'school-overview-photo-clean.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  } finally { $clean.Dispose() }

  $scale = 1
  $comparison = [System.Drawing.Bitmap]::new(452, 265)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($comparison)
    try {
      $graphics.Clear([System.Drawing.Color]::White)
      $graphics.DrawImage($source, 0, 0, 220, 129)
      $cleanImage = [System.Drawing.Image]::FromFile((Resolve-Path $cleanPath))
      try { $graphics.DrawImage($cleanImage, 232, 0, 220, 129) } finally { $cleanImage.Dispose() }
    } finally { $graphics.Dispose() }
    $comparison.Save((Join-Path (Split-Path $comparisonPath) 'school-overview-asset-comparison.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  } finally { $comparison.Dispose() }
  Write-Output "Source: $($source.Width)x$($source.Height)"
  Write-Output "Crop: x=16 y=16 width=420 height=233"
  Write-Output "Clean: 420x233"
} finally { $source.Dispose() }
