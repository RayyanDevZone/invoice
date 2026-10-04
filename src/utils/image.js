// Shrinks an image data URL so its longest side is at most `maxSize` pixels,
// keeping it small enough to store in the database. PNG keeps QR codes sharp.
export const shrinkImage = (dataUrl, maxSize = 600) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Could not read that image'));
    img.src = dataUrl;
  });
