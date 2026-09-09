/* Reports System 2 - PWA installation helper */
(() => {
  let deferredPrompt = null;
  const INSTALL_DISMISSED_KEY = 'pwa-install-dismissed-v2';

  const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = () => /android/i.test(navigator.userAgent);

  const createBanner = () => {
    if (isStandalone() || document.getElementById('pwaInstallBanner')) return;
    if (localStorage.getItem(INSTALL_DISMISSED_KEY) === '1') return;

    const banner = document.createElement('aside');
    banner.id = 'pwaInstallBanner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'تثبيت التطبيق');
    banner.innerHTML = `
      <div class="pwa-install-icon"><img src="logo.png" alt=""></div>
      <div class="pwa-install-content">
        <strong>ثبّت تطبيق التقارير</strong>
        <span>${isIOS() ? 'اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية.' : 'ثبّت التطبيق للوصول السريع واستخدامه كتطبيق مستقل.'}</span>
      </div>
      <button type="button" id="pwaInstallAction">${isIOS() ? 'التعليمات' : 'تثبيت'}</button>
      <button type="button" id="pwaInstallClose" aria-label="إغلاق">×</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('pwaInstallClose').onclick = () => {
      localStorage.setItem(INSTALL_DISMISSED_KEY, '1');
      banner.remove();
    };

    document.getElementById('pwaInstallAction').onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        banner.remove();
      } else if (isIOS()) {
        alert('لتثبيت التطبيق على iPhone: اضغط زر المشاركة في Safari ثم اختر «إضافة إلى الشاشة الرئيسية».');
      } else {
        alert('إذا ظهر خيار تثبيت التطبيق في قائمة المتصفح، اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».');
      }
    };
  };

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    createBanner();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    document.getElementById('pwaInstallBanner')?.remove();
    localStorage.setItem('pwa-installed', '1');
  });

  window.addEventListener('DOMContentLoaded', () => {
    if (isStandalone()) {
      localStorage.setItem('pwa-installed', '1');
      return;
    }
    if (isIOS()) setTimeout(createBanner, 800);
  });
})();
