function hydroponic() {
  var prod = Math.min(500, Math.max(ship.co2, 0));
  ship.food += prod/250/ticks_per_day; // Litres of CO2 to kilograms
  ship.oxygen += prod/ticks_per_day;
  ship.co2 -= prod/ticks_per_day;
}

function water() {
  if(ship.waste_water > 20/ticks_per_day) {
    ship.waste_water -= 20/ticks_per_day;
    ship.clean_water += 20/ticks_per_day;
  }
}

function oxygen() {
  if(ship.oxygen < rooms.length*50000*23.5/100 || ship.co2 > rooms.length*50000*0.04/100) {
    ship.oxygen += 3000/ticks_per_day;
    ship.co2 -= 3000/ticks_per_day;
  }
}

function empty() {
}

var room_types = [hydroponic, water, oxygen, empty];


