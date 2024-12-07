<script>
document.addEventListener('DOMContentLoaded', function() {
    // Function to save form values to local storage and disable fields
    function saveToLocalStorage() {
        const facebookPixelId = document.getElementById('facebook_pixel').value;
        const surveyFormLink = document.getElementById('survey_form_link').value;
        const googleConversion = document.getElementById('google_conversion').value;
        const tiktokPixel = document.getElementById('tiktok_pixel').value;
        const lineTag = document.getElementById('line_tag').value;
        const reviewLink = document.getElementById('review_link').value;

        // Save all values to localStorage
        localStorage.setItem('facebook_pixel', facebookPixelId);
        localStorage.setItem('survey_form_link', surveyFormLink);
        localStorage.setItem('google_conversion', googleConversion);
        localStorage.setItem('tiktok_pixel', tiktokPixel);
        localStorage.setItem('line_tag', lineTag);
        localStorage.setItem('review_link', reviewLink);
        localStorage.setItem('fields_disabled', 'true');

        // Disable all fields
        const fields = [
            'facebook_pixel', 'survey_form_link', 'google_conversion',
            'tiktok_pixel', 'line_tag', 'review_link'
        ];
        fields.forEach(field => {
            document.getElementById(field).disabled = true;
        });

        alert('บันทึกข้อมูลสำเร็จ !');
    }

    // Function to load form values from local storage
    function loadFromLocalStorage() {
        const fields = [
            'facebook_pixel', 'survey_form_link', 'google_conversion',
            'tiktok_pixel', 'line_tag', 'review_link'
        ];
        
        fields.forEach(field => {
            const value = localStorage.getItem(field);
            if (value) {
                document.getElementById(field).value = value;
            }
        });

        if (localStorage.getItem('fields_disabled') === 'true') {
            fields.forEach(field => {
                document.getElementById(field).disabled = true;
            });
        }
    }

    // Function to enable form fields
    function enableFields() {
        const fields = [
            'facebook_pixel', 'survey_form_link', 'google_conversion',
            'tiktok_pixel', 'line_tag', 'review_link'
        ];
        
        fields.forEach(field => {
            document.getElementById(field).disabled = false;
        });
        localStorage.setItem('fields_disabled', 'false');
    }

    // Load values when the page loads
    loadFromLocalStorage();

    // Save values and disable fields when the "Save" div is clicked
    document.getElementById('save_tracking').addEventListener('click', saveToLocalStorage);

    // Enable fields when the "Edit" div is clicked
    document.getElementById('edit_tracking').addEventListener('click', enableFields);
});
</script>