var hydroponic = {
  name: "hyroponic",
  up: {
    oxygen: 500,
    food: 2
  },
  down: {
    co2: 500,
    clean_water: 2
  }
};
var water = {
  name: "water",
  up: {
    clean_water: 20
  },
  down: {
    waste_water: 20
  }
};
var oxygen = {
  name: "oxygen",
  up: {
    oxygen: 3000
  },
  down: {
    co2: 3000
  }
};
var empty = {
  name: "empty",
  up: {},
  down: {}
}
var room_types = [hydroponic, water, oxygen, empty];
