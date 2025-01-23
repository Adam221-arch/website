// بيانات افتراضية
let phData = [];
let tdsData = [];
let labels = [];

// إنشاء الرسم البياني
const ctx = document.getElementById('sensor-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
                label: 'مستوى الـ pH',
                data: phData,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            },
            {
                label: 'عكورة المياه (TDS)',
                data: tdsData,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }
        ]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    }
});

// دالة لتحديث البيانات
function updateData() {
    // هنا يمكنك استبدال هذا الجزء بجلب البيانات الفعلية من الخادم
    const newPhValue = (Math.random() * 14).toFixed(2); // قيمة افتراضية لـ pH
    const newTdsValue = (Math.random() * 500).toFixed(2); // قيمة افتراضية للعكورة

    // إضافة حركة لتحديث القيم
    const phValueElement = document.getElementById('ph-value');
    const tdsValueElement = document.getElementById('tds-value');

    phValueElement.style.transform = 'scale(1.2)';
    tdsValueElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        phValueElement.style.transform = 'scale(1)';
        tdsValueElement.style.transform = 'scale(1)';
    }, 300);

    // تحديث الجدول
    phValueElement.textContent = newPhValue;
    tdsValueElement.textContent = newTdsValue;

    // تحديث الرسم البياني
    labels.push(new Date().toLocaleTimeString());
    phData.push(newPhValue);
    tdsData.push(newTdsValue);

    if (labels.length > 10) {
        labels.shift();
        phData.shift();
        tdsData.shift();
    }

    chart.update();
}

// تحديث البيانات كل 5 ثواني
setInterval(updateData, 5000);

// زر لتحديث البيانات يدويًا
document.querySelector('button').addEventListener('click', updateData);