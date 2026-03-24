$key = "c5e8c27b-db1a-4d61-bc6f-573516520663"
$headers = @{ "X-API-Key" = $key; "Content-Type" = "application/json" }

$body1 = '{"path":"/trade-pro"}'
$r1 = Invoke-RestMethod -Uri "https://api.makeswift.com/v1/pages" -Method POST -Headers $headers -Body $body1
Write-Host "Created /trade-pro - id: $($r1.id)"

$body2 = '{"path":"/distributor-finder"}'
$r2 = Invoke-RestMethod -Uri "https://api.makeswift.com/v1/pages" -Method POST -Headers $headers -Body $body2
Write-Host "Created /distributor-finder - id: $($r2.id)"
