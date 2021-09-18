song1 = "";
song2 = "";
lwx = 0;
rwx = 0;
lwy = 0;
rwy = 0;
slw = 0;
srw = 0;
s1 = "";
s2 = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, cheat)
    posenet.on("pose", gotPoses)
}

function cheat() {
    console.log("Success");
}

function draw() {
    image(video, 0, 0, 600, 500);
    s1 = song1.isPlaying();
    s2 = song2.isPlaying();
    fill("#FF0000")
    stroke("#FF0000")
    if (srw > 0.2) {
        circle(rwx,rwy,20)
        song2.stop()
        if (s1 == false) {
            song1.play()
            document.getElementById("song").innerHTML = "Harry Potter Song"
        }
    }

    if (slw > 0.2) {
        circle(lwx,lwy,20)
        song1.stop()
        if (s2 == false) {
            song2.play()
            document.getElementById("song").innerHTML = "Peter Pan Song"
        }
    }
    
    
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        srw = results[0].pose.keypoints[10].score;
        slw = results[0].pose.keypoints[9].score;
        lwx = results[0].pose.leftWrist.x
        lwy = results[0].pose.leftWrist.y
        rwx = results[0].pose.rightWrist.x
        rwy = results[0].pose.rightWrist.y
    }
}

