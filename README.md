# SVG clock

Simple SVG clock created with Snap - http://snapsvg.io/

More info on my blog post at http://simonrjones.net/2014/03/analog-clocks-in-svg/

Simon R Jones, Studio 24 - www.studio24.net
Robert Price - www.robertprice.co.uk


## Usage

Define a clock with `var clock = new Clock("clock")`

Valid arguments passed to Clock are `Clock(svgId, offset|hours, minutes, seconds)`

* svgId - ID of the svg element to display clock in, should be 300x300 in size
* offset|hours - Either offset to the current local time in +/- hours, or hour to set clock to (if minutes is set) 
* minutes - Minutes to set clock to. If this argument is set, the second argument is treated as the hour
* seconds - Seconds to set clock to (optional)

You can set the time with `clock.setTime(hours, minutes, seconds)`, for example `clock.setTime(21, 37, 0)` or `clock.setTime(21, 37)`

Start a clock with `clock.startClock()`

Stop a clock with `clock.stopClock()`

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


## Alternative Usage

Instead of passing parameters as an array, they can be passed in an object as the second parameter.

Define a clock with `var clock = new Clock("clock", options)`

Valid options are

* offset - The offset to the current local time in +/- hours.
* hours - The hour to set the clock to.
* minutes - the mintues to set the clock to.
* seconds - the seconds to set the clock to.
* movement - "normal" or "bounce", defines how the hands move on the clock. "normal" gives smooth movement, whereas "bounce" gives a classic BBC bounce to hands as they move into position. Default "normal".
* showSeconds - true or false, depending on wether to show the second hand or not. Default true.

As with the classic usage, if an offset is added, then hours, minutes and seconds are ignored.

If you want the clock to animate, you still need start it using the .startClock() method.

### Display a clock with a +10 hour offset, and with a bounce movement

    <script>
      var bouncer = new Clock("bouncer", { movement: "bounce", offset: 10, showSeconds: true });
      bouncer.startClock();
    </script>