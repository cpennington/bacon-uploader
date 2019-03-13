function showUploader() {
  var htmlTemplate = [
    '<input id="replayupload" type="file" accept=".bcr">',
    '<button id="uploadreplay" onclick="uploadReplayes()">',
      'Upload Replays',
    '</button>',
  ];
  document.getElementById('app').innerHTML = getHtml(htmlTemplate);
}

function uploadReplays() {
  var files = document.getElementById('replayupload').files;
  var file = files[0];
  var fileName = file.name;
  var bucketKey = encodeURIComponent("bacon-uploader") + '//';

  var objectKey = bucketKey + fileName;
  s3.upload({
    Key: objectKey,
    Body: file,
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your replay: ', err.message);
    }
    alert('Successfully uploaded replays.');
  });
}
