var State = function() {
}

State.prototype.addItemType = function addItemType(itemType) {
    this[itemType] = {
        immediate: {
            cooldown: 0
        },
        daily: {
            data:[],
            isActive: false,
            timer: 0
        },
        monthly: []
    };
}

State.prototype.isActive = function isActive(itemType, level) {
    return this[itemType][level].isActive;
}

State.prototype.setActive = function setActive(itemType, level, bool) {
    this[itemType][level].isActive = bool;
}

State.prototype.setTimer = function setTimer(itemType, level, time) {
    this[itemType][level].timer = time;
}

State.prototype.getTimer = function getTimer(itemType, level) {
    return this[itemType][level].timer;
}

State.prototype.addData = function addData(itemType, level, data) {
    this[itemType][level].data.push(data);
}

State.prototype.getData = function getData(itemType, level) {
    return this[itemType][level].data;
}

State.prototype.setCooldown = function setCooldown(itemType, time) {
    this[itemType].immediate.cooldown = time;
}

State.prototype.getCooldown = function getCooldown(itemType) {
    return this[itemType].immediate.cooldown;
}

module.exports = State;
