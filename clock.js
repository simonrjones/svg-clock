function Clock(svgId, offset, minute, second) {
  "use strict";

  // Setup clock face
  this.s = new Snap("#" + svgId);

  // Set defaults
  this.showSeconds = true;
  this.offset = 0;
  this.hour = 0;
  this.minute = 0;
  this.second = 0;
  this.movement = "normal";

  // if offset is an object it'll hold the configuration settings
  if (offset !== null && typeof offset === "object") {
    var options = offset;
    if ("movement" in options) {
      if (options.movement === "bounce") {
        this.movement = "bounce";
      }
    }
    if ("showSeconds" in options) {
      this.showSeconds = options.showSeconds;
    }
    if ("offset" in options) {
      this.offset = options.offset;
      this.updateTime();
    } else if ("hours" in options || "minutes" in options || "seconds" in options) {
      if ("hours" in options) {
        this.hour = options.hours;
      }
      if ("minutes" in options) {
        this.minute = options.minutes;
      }
      if ("seconds" in options) {
        this.second = options.seconds;
      }
    } else {
      this.updateTime();
    }

  // else use parameters for configuration settings
  } else {
    // Set time or offset?
    if (minute !== undefined) {
      // Set time
      this.hour = offset;
      this.minute = minute;
      if (second !== undefined) {
        this.second = second;
      } else {
        this.second = 0;
      }
    } else if (offset !== undefined) {
      // Set offset
      this.offset = offset;
      this.updateTime();
    } else {
      this.updateTime();
    }
  }

  // Set up clock
  this.drawClockFace();
}

Clock.prototype.hideSecondHand = function() {
  this.showSeconds = false;
  this.secondHand.remove();
};

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

  if (this.showSeconds) {
    this.secondHand = this.s.line(150,150,150,60);
    this.secondHand.attr({
      stroke: "#000",
      strokeWidth: 1
    });
  }

  // Centre point
  var clockCenter = this.s.circle(150, 150, 6);
  clockCenter.attr({
    fill: "#000"
  });

  // Set initial location of hands
  if (this.showSeconds) {
    var s = new Snap.Matrix();
    s.rotate(this.getSecondDegree(this.second), 150, 150);
    this.secondHand.transform(s);
  }
  
  var h = new Snap.Matrix();
  h.rotate(this.getHourDegree(this.hour, this.minute), 150, 150);
  this.hourHand.transform(h);

  var m = new Snap.Matrix();
  m.rotate(this.getMinuteDegree(this.minute), 150, 150);
  this.minuteHand.transform(m);
};

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
};

Clock.prototype.animateHands = function() {
  this.updateTime();

  // Move second hand
  if (this.showSeconds) {
    var s = new Snap.Matrix();
    s.rotate(this.getSecondDegree(this.second), 150, 150);
    if (this.movement === "bounce") {
      this.secondHand.animate({transform: s}, 400, mina.bounce);
    } else {
      this.secondHand.animate({transform: s}, 100);
    }
  }

  // Move hour & minute?
  if (this.second === 0) {
    var h = new Snap.Matrix();
    h.rotate(this.getHourDegree(this.hour, this.minute), 150, 150);
    if (this.movement === "bounce") {
      this.hourHand.animate({transform: h}, 400, mina.bounce);
    } else {
      this.hourHand.animate({transform: h}, 100);
    }

    var m = new Snap.Matrix();
    m.rotate(this.getMinuteDegree(this.minute), 150, 150);
    if (this.movement === "bounce") {
      this.minuteHand.animate({transform: m}, 400, mina.bounce);
    } else {
      this.minuteHand.animate({transform: m}, 100);
    }
  }
};

Clock.prototype.getSecondDegree = function(second) {
  return (360/60) * second;
};

Clock.prototype.getMinuteDegree = function(minute) {
  return (360/60) * minute;
};

Clock.prototype.getHourDegree = function(hour, minute) {
  var increment = Math.round((30/60) * minute);
  return ((360/12) * hour) + increment;
};

Clock.prototype.startClock = function() {
  // Update clock every second
  var instance = this;
  this.timeoutId = setInterval(function(){
    instance.animateHands();
  }, 1000);
};

Clock.prototype.stopClock = function() {
  clearTimeout(this.timeoutId);
};