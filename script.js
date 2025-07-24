// انتظر حتى يتم تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير تكبير للصور عند تحريك الماوس فوقها
    const gameImages = document.querySelectorAll('.game-image img');
    
    gameImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // إضافة تأثير نبض للأزرار عند النقر عليها
    const buttons = document.querySelectorAll('.btn, .btn-small');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // إذا كان الزر لا يؤدي إلى تمرير الصفحة، نمنع السلوك الافتراضي
            if (!this.getAttribute('href') || !this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    // تحريك سلس عند النقر على روابط التنقل
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // تحقق من أن الرابط يشير إلى عنصر داخل الصفحة
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // تعويض لارتفاع الهيدر
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // التحقق من صحة نموذج الاتصال
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // التحقق من صحة البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // إنشاء قائمة بالأخطاء
            let errors = [];
            
            if (name === '') {
                errors.push('يرجى إدخال الاسم');
            }
            
            if (email === '') {
                errors.push('يرجى إدخال البريد الإلكتروني');
            } else if (!emailRegex.test(email)) {
                errors.push('يرجى إدخال بريد إلكتروني صحيح');
            }
            
            if (message === '') {
                errors.push('يرجى إدخال رسالة');
            }
            
            // إذا كانت هناك أخطاء، عرضها
            if (errors.length > 0) {
                // إزالة أي رسائل خطأ سابقة
                const existingErrorDiv = document.querySelector('.form-errors');
                if (existingErrorDiv) {
                    existingErrorDiv.remove();
                }
                
                // إنشاء عنصر div لعرض الأخطاء
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-errors';
                errorDiv.style.color = 'var(--danger-color)';
                errorDiv.style.marginBottom = '20px';
                errorDiv.style.padding = '10px';
                errorDiv.style.backgroundColor = '#ffebee';
                errorDiv.style.borderRadius = '5px';
                
                // إضافة الأخطاء إلى العنصر
                const errorList = document.createElement('ul');
                errorList.style.paddingRight = '20px';
                
                errors.forEach(error => {
                    const errorItem = document.createElement('li');
                    errorItem.textContent = error;
                    errorList.appendChild(errorItem);
                });
                
                errorDiv.appendChild(errorList);
                
                // إضافة العنصر إلى النموذج
                contactForm.insertBefore(errorDiv, contactForm.firstChild);
            } else {
                // إذا لم تكن هناك أخطاء، إرسال النموذج (محاكاة)
                // في التطبيق الحقيقي، هنا سيتم إرسال البيانات إلى الخادم
                
                // إزالة أي رسائل خطأ سابقة
                const existingErrorDiv = document.querySelector('.form-errors');
                if (existingErrorDiv) {
                    existingErrorDiv.remove();
                }
                
                // إنشاء رسالة نجاح
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.style.color = 'var(--success-color)';
                successDiv.style.marginBottom = '20px';
                successDiv.style.padding = '10px';
                successDiv.style.backgroundColor = '#e8f5e9';
                successDiv.style.borderRadius = '5px';
                successDiv.style.textAlign = 'center';
                successDiv.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.';
                
                // إضافة رسالة النجاح إلى النموذج
                contactForm.insertBefore(successDiv, contactForm.firstChild);
                
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // إزالة رسالة النجاح بعد 5 ثوانٍ
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
            }
        });
    }

    // إضافة تأثير التمرير للعناصر
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.game-card, .section-title, .about-text, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تطبيق الأنماط الأولية للعناصر
    const elementsToAnimate = document.querySelectorAll('.game-card, .section-title, .about-text, .contact-form, .contact-info');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // تشغيل التأثير عند التمرير
    window.addEventListener('scroll', animateOnScroll);
    
    // تشغيل التأثير عند تحميل الصفحة
    animateOnScroll();

    // تغيير لون الهيدر عند التمرير
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // تغيير لون الهيدر عند التمرير
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});