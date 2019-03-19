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

function uploadReplays() {
  var files = document.getElementById("replayupload").files;
  const log = document.getElementById("upload-log");
  Array.prototype.forEach.call(files, function(file) {
    var fileName = file.name;

    var objectKey = fileName + "-" + Date.now();
    s3.upload(
      {
        Key: objectKey,
        Body: file
      },
      function(err, data) {
        console.log(err, data);
        var logMessage = document.createElement("div");
        var name = document.createElement("span");
        name.appendChild(document.createTextNode(fileName));
        logMessage.appendChild(name);
        var logBody = document.createElement("span");
        logMessage.appendChild(logBody);
        if (err) {
          logBody.appendChild(
            document.createTextNode(
              "There was an error uploading your replay: " + err.message
            )
          );
          logMessage.classList.add("error");
        } else {
          logBody.appendChild(
            document.createTextNode("Successfully uploaded replay.")
          );
          logMessage.classList.add("success");
        }
        log.appendChild(logMessage);
      }
    );
  });
}
