document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input');
  const generateBtn = document.getElementById('generate-btn');
  const inputContainer = document.getElementById('input-container');
  const qrContainer = document.getElementById('qr-container');
  const qrcodeDiv = document.getElementById('qrcode');

  // QR코드 생성
  const generateQR = () => {
    const url = urlInput.value.trim();
    if (!url) {
      alert('URL을 입력해 주세요.');
      return;
    }
    try {
      qrcodeDiv.innerHTML = '';
      new QRCode(qrcodeDiv, {
        text: url,
        width: 260,
        height: 260,
        colorDark: '#334155',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      // 입력창은 하단으로, QR코드는 정중앙에
      inputContainer.classList.replace('center-pos', 'bottom-pos');
      qrContainer.classList.replace('qr-hidden', 'qr-visible');
    } catch (err) {
      console.error(err);
      alert('QR코드 생성 중 오류가 발생했습니다.');
    }
  };

  generateBtn.addEventListener('click', generateQR);
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') generateQR();
  });

  // QR코드 클릭 → JPG 다운로드
  qrcodeDiv.addEventListener('click', () => {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.download = 'qrcode.jpg';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  // 마우스 위치에 따라 그라데이션 색상 변화
  document.addEventListener('mousemove', (e) => {
    const x = Math.round((e.clientX / window.innerWidth) * 100);
    const y = Math.round((e.clientY / window.innerHeight) * 100);
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
  });
});
