function denull(x) {
  return x ? x : 0;
}

function accum(x, y) {
  for(var i in y) {
    x[i] = denull(x[i]) + y[i];
  }
}

function dccum(x, y) {
  for(var i in y) {
    x[i] = denull(x[i]) - y[i];
  }
}

function calc_scale1(thing) {
  var scale = {};
  for(var i in thing.down) {
    if(denull(thing.up[i]) < 0.001 && thing.down[i] < 0.001) {
      continue;
    }
    if(thing.down[i] > 0) {
      scale[i] = denull(thing.up[i]) / thing.down[i];
    }
  }
  return scale;
}

function scale_of(thing, scale) {
  var scale = 1;
  for(var i in thing.down) {
    if(scale[i]) {
      scale = Math.min(scale, scale[i]);
    }
  }
  return scale;
}

function mul(m, thing) {
  var scaled = {up: {}, down: {}};
  for(var i in thing.up) {
    scaled.up[i] = m*thing.up[i];
  }
  for(var i in thing.down) {
    scaled.down[i] = m*thing.down[i];
  }
  return scaled;
}

function scale_by(scale, thing) {
  var min = 1;
  for(var i in thing.down) {
    if(scale[i]) {
      min = Math.min(min, scale[i]);
    }
  }
  return mul(min, thing);
}

function sum_things(scale) {
  var sum = scale_by(scale, mul(ship.crew, crew));
  for(var i = 0; i < rooms.length; ++i) {
    var scaled = scale_by(scale, rooms[i]);
    accum(sum.up, scaled.up);
    accum(sum.down, scaled.down);
  }
  return mul(days_per_tick, sum);
}

function combine_scale(scale0, scale1) {
  var combined = {};
  for(var i in scale0) {
    combined[i] = scale1[i] ? scale0[i]*scale1[i] : scale0[i];
  }
  for(var i in scale1) {
    if(!scale0[i]) {
      combined[i] = scale1[i];
    }
  }
  return combined;
}

function unit_scale(scale) {
  for(var i in scale) {
    if(scale[i] < 0.9999) {
      return false;
    }
  }
  return true;
}

function calc_scale() {
  var scale = {};
  var sum = sum_things(scale);
  accum(sum.up, ship);
  var new_scale = calc_scale1(sum);
  while(!unit_scale(new_scale)) {
    scale = combine_scale(scale, new_scale);
    sum = sum_things(scale);
    accum(sum.up, ship);
    new_scale = calc_scale1(sum);
  }
  return scale;
}


