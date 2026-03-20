document.addEventListener('DOMContentLoaded', function () {
    const ctaButton = document.getElementById('cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            alert('Cảm ơn bạn đã quan tâm đến TechOn. Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất!');
        });
    }
});
