const CreepBase = require('./creep.base');
const STATUSES = require('./creep.status');

const ROLE = 'builder';
const BODY_PARTS = [WORK, WORK, CARRY, MOVE];
const MIN_AMOUNT = 2;

class RoleBuilder extends CreepBase {
  constructor() {
    super(ROLE, BODY_PARTS, MIN_AMOUNT);
  }

  run(creep) {
    if (!this.hasRole(creep)) return false;

    if (creep.store[RESOURCE_ENERGY] === 0) {
      this.harvest(creep);
    } else if (creep.store.getFreeCapacity() === 0) {
      this.build(creep);
    }
  }

  build(creep) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      const code = creep.build(targets[0]);
      switch (code) {
        case ERR_NOT_IN_RANGE:
          this.moveTo(creep, targets[0], '#ffffff');
          break;
        case OK:
          creep.say('🚧 build');
          this.setStatus(creep, STATUSES.Build);
          break;
        default:
          console.log(this.getCreepName(creep), `⛔ code not handled: ${code}`);
      }
    }
  }
}

module.exports = new RoleBuilder();
