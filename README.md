# SVG clock

Simple SVG clock created with Snap - http://snapsvg.io/

More info on my blog post at http://simonrjones.net/2014/03/analog-clocks-in-svg/

Simon R Jones, Studio 24 - www.studio24.net

## Usage

Define a clock with `var clock = new Clock("clock")`

Valid arguments passed to Clock are `Clock(svgId, offset|hours, minutes, seconds)`

* svgId - ID of the svg element to display clock in, should be 300x300 in size
* offset|hours - Either offset to the current local time in +/- hours, or hour to set clock to (if minutes is set) 
* minutes - Minutes to set clock to. If this argument is set, the second argument is treated as the hour
* seconds - Seconds to set clock to (optional)

You can set the time with `clock.setTime(hours, minutes, seconds)`, for example `clock.setTime(21, 37, 0)` or `clock.setTime(21, 37)`

Start a clock with `clock.startClock()`

Stop a clock with `clock.startClock()`

Hide the second hand with `clock.hideSecondHand()`

### Simple usage

    <svg id="clock" width="300" height="300">

    <script src="snap.svg-min.js"></script>
    <script src="clock.js"></script>
    <script>
      // Start clock
      var clock = new Clock("clock");
      clock.startClock();
    </script>

### Stop a clock

    <script>
      clock.stopClock(); 
    </script>

### Display clock with a -5hrs offset

    <script>
      var nyc = new Clock("clock", -5);
      nyc.startClock();
    </script>

### Display a clock at 21:45 exactly

It's best not to start a clock which you've set to a specific time. If you do start the clock it will immediately reset to the current local time as the clock updates.

    <script>
      var clock = new Clock("clock", 21, 45);
      clock.hideSecondHand();
    </script>