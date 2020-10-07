const blobToDataUrl = (blob, callback) => {
  let a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
};

export default blobToDataUrl;
