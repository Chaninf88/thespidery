<script>
document.addEventListener('DOMContentLoaded', function() {
    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get all parameters from the URL
    const trackingPrice = getQueryParam('tracking_price');
    const facebookPixel = getQueryParam('facebook_pixel');
    const surveyFormLink = getQueryParam('survey_form_link');
    const googleConversion = getQueryParam('google_conversion');
    const tiktokPixel = getQueryParam('tiktok_pixel');
    const lineTag = getQueryParam('line_tag');
    const reviewLink = getQueryParam('review_link');

    // Log all parameters for debugging
    console.log('URL Parameters:', {
        trackingPrice,
        facebookPixel,
        surveyFormLink,
        googleConversion,
        tiktokPixel,
        lineTag,
        reviewLink
    });

    // Push tracking data to the data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'tracking_price': trackingPrice,
        'facebook_pixel': facebookPixel,
        'google_conversion': googleConversion,
        'tiktok_pixel': tiktokPixel,
        'line_tag': lineTag
    });

    // Get the button elements
    const surveyLinkButton = document.getElementById('survey_link_button');
    const reviewLinkButton = document.getElementById('review_link_button');

    // Set up survey button
    if (surveyLinkButton && surveyFormLink) {
        console.log('Setting up survey button with link:', surveyFormLink);
        surveyLinkButton.onclick = function() {
            window.location.href = surveyFormLink;
        };
    } else {
        console.log('Survey button setup failed:', {
            buttonExists: !!surveyLinkButton,
            linkExists: !!surveyFormLink
        });
    }

    // Set up review button
    if (reviewLinkButton && reviewLink) {
        console.log('Setting up review button with link:', reviewLink);
        reviewLinkButton.onclick = function() {
            window.location.href = reviewLink;
        };
    } else {
        console.log('Review button setup failed:', {
            buttonExists: !!reviewLinkButton,
            linkExists: !!reviewLink
        });
    }
});
</script>