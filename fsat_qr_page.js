<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate_qr_code');
    const clearButton = document.getElementById('clear_value');
    const billPriceInput = document.getElementById('bill_price');
    const qrCodeContainer = document.getElementById('qrcode');

    generateButton.addEventListener('click', async function() {
        // Get all tracking parameters from localStorage
        const facebookPixelId = localStorage.getItem('facebook_pixel');
        const surveyFormLink = localStorage.getItem('survey_form_link');
        const googleConversion = localStorage.getItem('google_conversion');
        const tiktokPixel = localStorage.getItem('tiktok_pixel');
        const lineTag = localStorage.getItem('line_tag');
        const reviewLink = localStorage.getItem('review_link');

        // Log retrieved values for debugging
        console.log('Retrieved values:', {
            facebookPixelId,
            surveyFormLink,
            googleConversion,
            tiktokPixel,
            lineTag,
            reviewLink
        });

        if (!facebookPixelId || !surveyFormLink) {
            alert('* จำเป็นต้องให้ข้อมูลอย่างครบถ้วนในหน้า "ตั้งค่า" ก่อนเริ่มใช้งาน');
            return;
        }

        const billPrice = billPriceInput.value.trim();

        if (!billPrice) {
            alert('* จำเป็นต้องกรอกยอดชำระของลูกค้า');
            return;
        }

        const baseUrl = "https://www.thespidery.co/tools/front-store-ads-tracking/thank-you-so-much";
        const params = new URLSearchParams({
            tracking_price: billPrice,
            facebook_pixel: facebookPixelId,
            survey_form_link: surveyFormLink,
            google_conversion: googleConversion || '',
            tiktok_pixel: tiktokPixel || '',
            line_tag: lineTag || '',
            review_link: reviewLink || ''
        });

        const fullUrl = `${baseUrl}?${params.toString()}`;
        console.log("Original URL:", fullUrl);

        try {
            const shortenedUrl = await shortenUrl(fullUrl);
            console.log("Shortened URL:", shortenedUrl);

            qrCodeContainer.innerHTML = '';
            new QRCode(qrCodeContainer, {
                text: shortenedUrl,
                width: 200,
                height: 200
            });
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while shortening the URL. Please try again.");
        }
    });

    clearButton.addEventListener('click', function() {
        qrCodeContainer.innerHTML = '';
        billPriceInput.value = '';
    });

    async function shortenUrl(longUrl) {
        const apiUrl = "https://spoo.me";
        const payload = new URLSearchParams({
            url: longUrl
        });

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.short_url;
    }
});
</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Variable to store the latest shortened URL
    let currentShortUrl = '';

    // Listen to all fetch requests
    const originalFetch = window.fetch;
    window.fetch = function() {
        return originalFetch.apply(this, arguments)
            .then(async response => {
                const clonedResponse = response.clone();
                try {
                    const data = await clonedResponse.json();
                    if (data.short_url) {
                        currentShortUrl = data.short_url;
                    }
                } catch (e) {
                    // Ignore json parsing errors
                }
                return response;
            });
    };

    // Add click event listener to the copy button
    const copyButton = document.getElementById('copy_qr_code_url_button');
    if (copyButton) {
        copyButton.addEventListener('click', async function() {
            if (currentShortUrl) {
                try {
                    await navigator.clipboard.writeText(currentShortUrl);
                    alert('คัดลอก URL สำเร็จ!'); // URL copied successfully!
                } catch (err) {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = currentShortUrl;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = 0;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        document.execCommand('copy');
                        alert('คัดลอก URL สำเร็จ!'); // URL copied successfully!
                    } catch (err) {
                        alert('ไม่สามารถคัดลอก URL ได้ กรุณาลองใหม่อีกครั้ง'); // Failed to copy URL, please try again
                    }
                    document.body.removeChild(textarea);
                }
            } else {
                alert('กรุณาสร้าง QR Code ก่อนคัดลอก URL'); // Please generate QR Code first
            }
        });
    }
});
</script>