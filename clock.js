function Clock(svgId, offset, minute, second) {

  // Setup clock face
  this.s = Snap("#" + svgId);
  this.showSeconds = true;

  // Set defaults
  this.offset = 0;

  // Set time or offset?
  if (minute != undefined) {
    // Set time
    this.hour = offset;
    this.minute = minute;
    if (second != undefined) {
      this.second = second;
    } else {
      this.second = 0;
    }
  } else if (offset != undefined) {
    // Set offset
    this.offset = offset;
    this.updateTime();
  } else {
    this.updateTime();
  }

  // Set up clock  
  this.drawClockFace();
}

Clock.prototype.hideSecondHand = function() {
  this.showSeconds = false;
  this.secondHand.remove();
}

Clock.prototype.drawClockFace = function() {
    var clockFace = this.s.circle(150, 150, 100);
    clockFace.attr({
      fill: "#FFF",
        stroke: "#000",
        strokeWidth: 4
    });

    // Draw hours
    for (var x=1;x<=12;x++) {
        var hourStroke = this.s.line(150,60,150,80);
        hourStroke.attr({
          stroke: "#000",
          strokeWidth: 4
        });

        var t = new Snap.Matrix();
        t.rotate((360/12)*x, 150, 150);
        hourStroke.transform(t);
    }

    this.hourHand = this.s.line(150,150,150,110);
    this.hourHand.attr({
      stroke: "#000",
      strokeWidth: 4
    });

    this.minuteHand = this.s.line(150,150,150,60);
    this.minuteHand.attr({
      stroke: "#000",
      strokeWidth: 3
    });

    this.secondHand = this.s.line(150,150,150,60);
    this.secondHand.attr({
      stroke: "#000",
      strokeWidth: 1
    });

    // Centre point
    var clockCenter = this.s.circle(150, 150, 6);
    clockCenter.attr({
      fill: "#000"
    });

    // Set initial location of hands
    var t = new Snap.Matrix();
    t.rotate(this.getSecondDegree(this.second), 150, 150);
    this.secondHand.transform(t);

    var t = new Snap.Matrix();
    t.rotate(this.getHourDegree(this.hour, this.minute), 150, 150);
    this.hourHand.transform(t);

    var t = new Snap.Matrix();
    t.rotate(this.getMinuteDegree(this.minute), 150, 150);
    this.minuteHand.transform(t);
  }

Clock.prototype.updateTime = function() {
    // Get time
    var now = new Date();

    // Do we have an offset?
    this.hour = now.getHours();
    this.hour += this.offset;

    // Normalise hours to 1-12
    if (this.hour > 23) {
      this.hour = this.hour - 24;
    } else if (this.hour < 0) {
      this.hour = 24 + this.hour;
    }
    if (this.hour > 12) {
      this.hour -= 12;
    }
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
  }

Clock.prototype.animateHands = function() {
    this.updateTime();

    // Move second hand
    if (this.showSeconds) {
      var t = new Snap.Matrix();
      t.rotate(this.getSecondDegree(this.second), 150, 150);
      this.secondHand.animate({transform: t}, 100);
    }

    // Move hour & minute?
    if (this.second == 0) {
      var t = new Snap.Matrix();
      t.rotate(this.getHourDegree(this.hour, this.minute), 150, 150);
      this.hourHand.animate({transform: t}, 100);

      var t = new Snap.Matrix();
      t.rotate(this.getMinuteDegree(this.minute), 150, 150);
      this.minuteHand.animate({transform: t}, 100);
    }
  }

Clock.prototype.getSecondDegree = function(second) {
    return (360/60) * second;
  }

Clock.prototype.getMinuteDegree = function(minute) {
    return (360/60) * minute;
  }

Clock.prototype.getHourDegree = function(hour, minute) {
    var increment = Math.round((30/60) * minute);
    return ((360/12) * hour) + increment;
  }

Clock.prototype.startClock = function() {
  // Update clock every second
  var instance = this;
  this.timeoutId = setInterval(function(){
    instance.animateHands();
  }, 1000);
}

Clock.prototype.stopClock = function() {
  clearTimeout(this.timeoutId);
}

