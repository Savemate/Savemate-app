export class ScannerPage {
    static render() {
        return `
            <div class="page" id="scannerPage">
                <div class="scanner-container">
                    <div class="scanner-placeholder">
                        <i class="fas fa-camera" style="font-size: 60px; margin-bottom: 15px;"></i>
                        <div>Point camera at barcode</div>
                    </div>
                    <p>Scan barcodes to compare prices across South African stores</p>
                    <button class="btn btn-primary" style="width: auto; margin-top: 20px;" onclick="App.startScanner()">
                        Start Scanning
                    </button>
                </div>

                <h2 class="section-title">Recently Scanned</h2>
                <div id="recentlyScanned">
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-barcode" style="font-size: 48px; margin-bottom: 16px;"></i>
                        <p>No recently scanned items</p>
                    </div>
                </div>
            </div>
        `;
    }
}