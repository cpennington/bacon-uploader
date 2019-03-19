var bucketName = "bacon-uploader";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:a7daa586-be94-47b4-bbf0-9f2a67bb1c41";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});

function showUploader() {
  var htmlTemplate = [
    '<input id="replayupload" type="file" accept=".zip" multiple>',
    '<button id="uploadreplay" onclick="uploadReplays()">',
    "Upload Replays",
    "</button>"
  ];
  document.getElementById("app").innerHTML = getHtml(htmlTemplate);
}

function uploadReplays() {
  var files = document.getElementById("replayupload").files;
  for (idx in files) {
    var file = files[idx];
    var fileName = file.name;

    var objectKey = fileName;
    s3.upload(
      {
        Key: objectKey,
        Body: file
      },
      function(err, data) {
        if (err) {
          return console.log(
            "There was an error uploading your replay: ",
            err.message
          );
        }
        console.log("Successfully uploaded replay.");
      }
    );
  }
}
