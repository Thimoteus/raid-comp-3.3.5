// Generated by CoffeeScript 1.6.3
(function() {
  var addUnitToRaidFrame, classComplement, classSpecsHandler, classes, complement, defaultUnitFrame, findNextEmptySlot, groups, i, invite, inviteHandler, resetInviter, resetInviterHandler, roleHandler, showRoles, specComplement, specRolesHandler, specs, _i;

  classes = ["warrior", "paladin", "deathknight", "shaman", "hunter", "druid", "rogue", "mage", "priest", "warlock"];

  specs = {
    "warrior": ['fury', 'arms', 'prot'],
    "paladin": ['prot', 'holy', 'ret'],
    "deathknight": ['blood', 'frost', 'unholy'],
    "shaman": ['ele', 'enhancement', 'resto'],
    "hunter": ['bm', 'mm', 'survival'],
    "druid": ['balance', 'feral', 'resto'],
    "rogue": ['assassin', 'combat', 'subtlety'],
    "mage": ['arcane', 'fire', 'frost'],
    "priest": ['disc', 'holy', 'shadow'],
    "warlock": ['aff', 'demo', 'destro']
  };

  groups = [];

  for (i = _i = 1; _i <= 5; i = ++_i) {
    groups.push("group" + i);
  }

  defaultUnitFrame = {
    'display': 'block',
    'backgroundColor': '#111',
    'fontWeight': 'normal'
  };

  complement = function(element, array) {
    var comp, e, _j, _len;
    comp = [];
    for (_j = 0, _len = array.length; _j < _len; _j++) {
      e = array[_j];
      if (e !== element) {
        comp.push(e);
      }
    }
    return comp;
  };

  classComplement = function(klass) {
    return complement(klass, classes);
  };

  specComplement = function(klass, spec) {
    return complement(spec, specs[klass]);
  };

  showRoles = function(klass, spec) {
    var hide, show;
    show = function(role) {
      return $(".roles div." + role).show();
    };
    hide = function(role) {
      return $(".roles div." + role).hide();
    };
    if (spec === "holy" || spec === "disc" || spec === "resto") {
      show('heal');
      hide('tank');
      hide('dps');
    } else if (spec === "prot") {
      show('tank');
      hide('dps');
      hide('heal');
    } else if (spec === "feral" || spec === "unholy" || spec === "blood") {
      show('tank');
      show('dps');
      hide('heal');
    } else {
      show('dps');
      hide('tank');
      hide('heal');
    }
    if (spec === "frost") {
      if (klass === "mage") {
        show('dps');
        hide('tank');
        return hide('heal');
      } else {
        show('dps');
        show('tank');
        return hide('heal');
      }
    }
  };

  classSpecsHandler = function(klass) {
    return $(".classes ." + klass).click(function() {
      var c, _j, _len, _ref;
      if (!$(this).hasClass('selected')) {
        $('.roles div').hide();
        $('.specs div span').removeClass('selected');
        $('.info span.spec').text("");
        $('.info span.role').text("");
        $("#ok").hide();
      }
      $(this).addClass('selected');
      _ref = classComplement(klass);
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        c = _ref[_j];
        $(".classes ." + c).removeClass('selected');
        $(".specs ." + c).hide();
      }
      $(".specs ." + klass).show();
      return $('.info span.klass').text(klass);
    });
  };

  specRolesHandler = function(klass, spec) {
    return $(".specs ." + klass + " ." + spec).click(function() {
      var s, _j, _len, _ref;
      if (!$(this).hasClass('selected')) {
        $('.roles span').removeClass('selected');
        $('.info span.role').text("");
        $('#ok').hide();
      }
      _ref = specComplement(klass, spec);
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        s = _ref[_j];
        $(".specs ." + klass + " ." + s).removeClass('selected');
      }
      $(this).addClass('selected');
      showRoles(klass, spec);
      return $('.info span.spec').text(spec);
    });
  };

  roleHandler = function(role) {
    return $(".roles ." + role + " span").click(function() {
      var other, _j, _len, _ref;
      $(this).addClass('selected');
      _ref = ["dps", "tank", "heal"];
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        other = _ref[_j];
        if (other !== role) {
          $(".roles ." + other + " span").removeClass('selected');
        }
      }
      $(".info span.role").text(role);
      return $('#ok').show();
    });
  };

  resetInviter = function() {
    $('#ok').hide();
    $(".roles div").hide().find('span').removeClass('selected');
    $(".specs div").hide().find('span').removeClass('selected');
    $(".classes span").removeClass('selected');
    return $('span.spec, span.klass, span.role').text("");
  };

  resetInviterHandler = function() {
    return $('#reset').click(function(event) {
      event.preventDefault();
      return resetInviter();
    });
  };

  findNextEmptySlot = function() {
    var getNextEmptySlotInGroup, group, groupHasEmptySlot, _j, _len;
    groupHasEmptySlot = function(group) {
      var slot, slots, _j, _len;
      slots = $(".raid ." + group + " div");
      for (_j = 0, _len = slots.length; _j < _len; _j++) {
        slot = slots[_j];
        if ($(slot).find('span').text().length === 0) {
          return true;
        }
      }
      return false;
    };
    getNextEmptySlotInGroup = function(group) {
      var slot, slots, _j, _len;
      slots = $(".raid ." + group + " div");
      for (_j = 0, _len = slots.length; _j < _len; _j++) {
        slot = slots[_j];
        if ($(slot).find('span').text().length === 0) {
          return slot;
        }
      }
    };
    for (_j = 0, _len = groups.length; _j < _len; _j++) {
      group = groups[_j];
      if (groupHasEmptySlot(group)) {
        return getNextEmptySlotInGroup(group);
      }
    }
    throw Error;
  };

  addUnitToRaidFrame = function(klass, spec, role) {
    var error, slot;
    try {
      slot = findNextEmptySlot();
      return $(slot).addClass(klass).find('span').addClass(spec).text(role);
    } catch (_error) {
      error = _error;
      return alert("There are no more empty slots.");
    }
  };

  invite = function() {
    var c, klass, role, roles, s, spec, updateStatsDpsCount, updateStatsRoleCount, _j, _k, _l, _len, _len1, _len2, _ref, _ref1;
    updateStatsRoleCount = function(role) {
      var current;
      current = parseInt($(".stats .roles ." + role).text());
      return $(".stats .roles ." + role).text(current + 1);
    };
    updateStatsDpsCount = function(dps) {
      var current;
      current = parseInt($(".stats .dps ." + dps).text());
      return $(".stats .dps ." + dps).text(current + 1);
    };
    for (_j = 0, _len = classes.length; _j < _len; _j++) {
      c = classes[_j];
      if ($('.classes .selected').hasClass(c)) {
        klass = c;
      }
    }
    _ref = specs[klass];
    for (_k = 0, _len1 = _ref.length; _k < _len1; _k++) {
      s = _ref[_k];
      if ($(".specs ." + klass + " .selected").hasClass(s)) {
        spec = s;
      }
    }
    _ref1 = ["dps", "tank", "heal"];
    for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
      roles = _ref1[_l];
      if ($(".roles ." + roles + " .selected").hasClass(roles)) {
        role = roles;
      }
    }
    updateStatsRoleCount(role);
    if (role === "dps") {
      if ((klass === "warrior" || klass === "paladin" || klass === "deathknight" || klass === "rogue") || (spec === "feral" || spec === "enhancement")) {
        updateStatsDpsCount("mdps");
      } else {
        updateStatsDpsCount("rdps");
      }
      if ((klass === "paladin" || klass === "shaman" || klass === "mage" || klass === "priest" || klass === "warlock") || (spec === "balance" || spec === "enhancement" || spec === "survival" || spec === "assassin")) {
        updateStatsDpsCount("magical");
      } else {
        updateStatsDpsCount("physical");
      }
    }
    return addUnitToRaidFrame(klass, spec, role);
  };

  inviteHandler = function() {
    return $("#ok").click(function(event) {
      event.preventDefault();
      invite();
      return resetInviter();
    });
  };

  $(function() {
    var klass, role, spec, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1;
    for (_j = 0, _len = classes.length; _j < _len; _j++) {
      klass = classes[_j];
      classSpecsHandler(klass);
    }
    for (_k = 0, _len1 = classes.length; _k < _len1; _k++) {
      klass = classes[_k];
      _ref = specs[klass];
      for (_l = 0, _len2 = _ref.length; _l < _len2; _l++) {
        spec = _ref[_l];
        specRolesHandler(klass, spec);
      }
    }
    _ref1 = ["dps", "tank", "heal"];
    for (_m = 0, _len3 = _ref1.length; _m < _len3; _m++) {
      role = _ref1[_m];
      roleHandler(role);
    }
    resetInviterHandler();
    return inviteHandler();
  });

}).call(this);
