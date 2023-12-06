$dir = "./"

# Define the download URL and the destination
$nodeJsUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
$destination = "$env:TEMP\nodejs_installer.msi"

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
   Invoke-WebRequest -Uri $nodeJsUrl -OutFile $destination
   Start-Process -FilePath "msiexec.exe" -ArgumentList "/i $destination /qn" -Wait
}

# Change the current directory to the specified directory
Set-Location $dir

# Install npm packages
npm install

# Run node index.js
node index.js