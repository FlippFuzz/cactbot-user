'use strict';

// Rename this file to `raidboss.js` and edit it to change the raidboss ui.
// This file is Javascript.  Anything after "//" on a line is a comment.
// If you edit this file, remember to reload ACT or click the "Reload overlay"
// button on the raidboss CactbotOverlay.
// If there are errors in this file, they will appear in the OverlayPlugin.dll
// log window in ACT.


// If false, no timeline of upcoming events will be displayed during fights.
Options.TimelineEnabled = true;

// If false, triggers and timelines will not show or speak text, nor play
// sounds.
Options.AlertsEnabled = true;

// If false, then visual text alerts are not shown for triggers.
Options.TextAlertsEnabled = true;

// If false, then sound alerts are not played.
Options.SoundAlertsEnabled = true;

// If true, then text-to-speech alerts are read aloud.  Text-to-speech takes
// priority over custom sounds and text noises.  If a trigger does not have
// a tts entry then it will fall back on text and sound (if turned on).
Options.SpokenAlertsEnabled = true;

// Will override the singular TTS alerts if a group alert is set for a specific trigger
// Change phrasing to make sense in a group setting
Options.GroupSpokenAlertsEnabled = false;


// Show timer bars for events that will happen in this many seconds or less.
Options.ShowTimerBarsAtSeconds = 30;

// Once a timer bar reaches 0, keep it around this long after.
Options.KeepExpiredTimerBarsForSeconds = 0.7;

// Change the bar color to highlight it is coming up when this many seconds
// are left on it.
Options.BarExpiresSoonSeconds = 8;

// Number of bars to show in the space given to the UI by css.
Options.MaxNumberOfTimerBars = 6;


// Path to sound played for info-priority text popups, or when "Info" is
// specified as the sound name.
Options.InfoSound = '../../resources/sounds/freesound/percussion_hit.ogg';

// Path to sound played for alert-priority text popups, or when "Alert" is
// specified as the sound name.
Options.AlertSound = '../../resources/sounds/BigWigs/Alert.ogg';

// Path to sound played for alarm-priority text popups, or when "Alarm" is
// specified as the sound name.
Options.AlarmSound = '../../resources/sounds/BigWigs/Alarm.ogg';

// Path to sound played when "Long" is specified as the sound name.
Options.LongSound = '../../resources/sounds/BigWigs/Long.ogg';

// Volume between 0 and 1 to play the InfoSound at.
Options.InfoSoundVolume = 1;

// Volume between 0 and 1 to play the AlertSound at.
Options.AlertSoundVolume = 1;

// Volume between 0 and 1 to play the AlarmSound at.
Options.AlarmSoundVolume = 1;

// Volume between 0 and 1 to play the LongSound at.
Options.LongSoundVolume = 1;

// A set of nicknames to use for players, when trying to shorten names.
Options.PlayerNicks = {
  'Darkest Edgelord': 'Mary',
  'Captain Jimmy': 'Jimmy',
  'Pipira Pira': '&#x1F41F;',
};

// A set of triggers to be ignored. The key is the 'id' of the trigger, and
// the value should be true if the trigger is to be ignored, whereas false
// will have no effect.  The trigger ids can be found in the trigger files for
// each fight in the files inside of this directory:
// https://github.com/quisquous/cactbot/tree/master/ui/raidboss/data/triggers
Options.DisabledTriggers = {
  // Disable the /psych trigger from `test.js` in Summerford Farms.
  'Test Psych': true,
  // Disable the "eye lasers" trigger from `drowned_city_of_skalla.js`.
  'Hrodric Words': true,
  // Useless!
  'O12S Hello World Stack' : true,
  'E1S Delta Attack 1' : true,
  'E1S Delta Attack 2' : true,
  'E2S Doomvoid Cleaver' : true,
  'E2S Cycle of Retribution' : true,
  'E2S Cycle of Chaos' : true,
  'E3S Front Left Temporary Current' : true,
  'E3S Front Right Temporary Current' : true,
  'E3S Front Left Temporary Current 2' : true,
  'E3S Front Right Temporary Current 2' : true,
  'E3S Refreshed' : true,
  'E4S Massive Landslide - Front' : true,
  'E4S Massive Landslide - Sides' : true,
  'E4S Bury Directions' : true,
  'RubyEx Ruby Claw' : true,
  'RubyEx Change of Heart' : true,
  'RubyEx Pall of Rage' : true,
  'RubyEx Pall of Grief' : true,
  'E6S Strike Spark' : true,
  'E5S Stepped Leader Spread' : true,
  'E8S Hallowed Wings Knockback' : true,
  'E8S Hallowed Wings Right' : true,
  'E8S Hallowed Wings Left' : true,
  'E8S Forgetful Tank Second Frost' : true,
  'E8S Holy Divided' : true,
  'WOLEx Summon Wyrm': true,
  'WOLEx Spectral Black Mage / White Mage': true,
  'WOLEx Summoner / Warrior': true,
  'WOLEx Spectral Bard / Dark Knight': true,
  'WOLEx Spectral Ninja': true,
  'E9S Anti-Air Phaser Unlimited List': true,
  'E9S Wide-Angle Phaser Unlimited List': true
};


// An array of user-defined triggers, in the format defined in the readme:
// https://github.com/quisquous/cactbot/tree/master/ui/raidboss/data/triggers
//Options.Triggers = [
Options.Triggers.push(
  // (1) Simple example trigger: show text on screen when you die.
  {
    // Match every zone.
    zoneRegex: /.*/,
    triggers: [
      {
        regex: /:You are defeated by/,
        alarmText: 'YOU DIED',
      },
    ],
  },

  // You can add other triggers for other zones too.  Here's more examples:
  //
  // (2) Maybe you want a silly kissy noise whenever you a blow a kiss in
  // a housing zone!
  {
    zoneRegex: /^(Mist|The Goblet|The Lavender Beds|Shirogane)$/,
    triggers: [
      {
        regex: /You blow a kiss/,
        sound: '../../resources/sounds/PowerAuras/bigkiss.ogg',
        volume: 0.5,
      },
    ],
  },

  // (3) Maybe you want to modify some existing timeline and triggers:
  //
  // Add some extra triggers to the test timeline.  To use it, see:
  // https://github.com/quisquous/cactbot/blob/master/ui/raidboss/data/timelines/test.txt
  {
    // The zone this should apply to.
    // This should match the zoneRegex in the triggers file.
    zoneRegex: /^Middle La Noscea$/,

    // Add some additional timeline events to the test timeline.
    timeline: `
      # Note: Hash marks are comments inside of a timeline file.
      # This format is the same as ACT timeline.

      # Add a new personal event to the test timeline.
      5.2 "(Remember To Use Feint!)"

      # Remind yourself to shield the tank 5 seconds before final sting.
      infotext "Final Sting" before 5 "shield the tank"

      # Events you don't like, you can hide.  This gets rid of "Long Castbar".
      hideall "Long Castbar"
    `,

    // Add some additional triggers that will go off in Summerford Farms.
    triggers: [
      // If you provoke the striking dummy (or anything), this will trigger.
      {
        id: 'User Example Provoke',
        regex: /You use Provoke/,
        infoText: 'Provoke!',
        tts: 'provoke',
      },

      // A more complicated regen trigger.
      {
        id: 'User Example Regen',
        // This will match log lines from ACT that look like this:
        // "Nacho Queen gains the effect of Regen from Taco Cat for 21.00 Seconds."
        regex: /gains the effect of Regen from \y{Name} for (\y{Float}) Seconds/,
        delaySeconds: function(data, matches) {
          // Wait the amount of seconds regen lasts before reminding you to
          // reapply it.  This is not smart enough to figure out if you
          // cast it twice, and is left as an exercise for the reader to
          // figure out how to do so via storing variables on `data`.
          return data.ParseLocaleFloat(matches[1]);
        },

        alertText: 'Regen Reminder',
        tts: 'regen',
      },
    ],
  },
  {
    zoneRegex: /.*/,
    triggers: [
      {
        id: 'Test Laugh Everywhere',
        regex: /:You burst out laughing at the striking dummy/,
        regexDe: /:Du lachst herzlich mit der Trainingspuppe/,
        regexFr: /:Vous vous esclaffez devant le mannequin d'entraînement/,
        regexCn: /:.*看着木人高声大笑/,
        suppressSeconds: 5,
        alarmText: {
          en: 'hahahahaha',
          de: 'hahahahaha',
          fr: 'Mouahahaha',
          cn: '2333333333',
        },
        tts: {
          en: 'hahahahaha',
          de: 'hahahahaha',
          fr: 'Haha mort de rire',
          cn: '哈哈哈哈哈哈',
        },
        groupTTS: {
          en: 'group laugh',
          de: 'Gruppenlache',
          fr: 'group motivation',
          cn: '组哈哈',
        },
      },
      {
        id: 'General Reprisal',
        netRegex: NetRegexes.ability({ id: '1D6F' }),
        condition: function(data, matches) {
          //if (matches.source !== data.me && !data.party.inAlliance(matches.source))
          //  return false;
          return data.role == 'tank';
        },
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Reprisal: ' + name,
          };
        },
      },
      {
        // Example Log:
        // [22:53:41.135] 15:102D0725:Solyln Fay:8D2:Trick Attack:4000B1D9:Shiva:1E710203:6EE90000:5050E:27E0000:0:0:0:0:0:0:0:0:0:0:0:0:52259022:72360160:10000:10000:0:1000:99.99231:99.99231:0:3.095573:115384:115384:10000:10000:0:1000:102.6915:104.0818:-0.004453726:-2.428089:00006070
        // [22:53:41.000] 00:102b:Solyln Fay uses Trick Attack.
        id: 'General Trick Attack',
        netRegex: NetRegexes.ability({ id: '8D2' }),
        infoText: function(data, matches) {
          let name = data.ShortName(matches.source);
          return {
            en: 'Trick Attack: ' + name,
          };
        },
      },
    ]
  },
  {
    zoneRegex: /^Alphascape V4.0 \(Savage\)$/,
    triggers: [
      {
        id: 'O12S Archive All Blue Arrow',
        regex: / 1B:........:Rear Power Unit:....:....:009D:0000:0000:0000:/,
        alertText: {
          en: 'Right',
          de: 'Hinten Links',
          fr: 'Arrière gauche',
        },
      },
      {
        id: 'O12S Archive All Red Arrow',
        regex: / 1B:........:Rear Power Unit:....:....:009C:0000:0000:0000:/,
        alertText: {
          en: 'Left',
          de: 'Hinten Rechts',
          fr: 'Arrière droite',
        },
      },
      {
        id: 'O12S Latent Defect',
        regex: / 1A:\y{ObjectId}:(\y{Name}) gains the effect of (?:Unknown_686|Latent Defect) from/,
        regexDe: / 1A:\y{ObjectId}:(\y{Name}) gains the effect of (?:Unknown_686|Latenter Defekt) from/,
        regexFr: / 1A:\y{ObjectId}:(\y{Name}) gains the effect of (?:Unknown_686|Bogue latent|Bogue Latent) from/,
        regexJa: / 1A:\y{ObjectId}:(\y{Name}) gains the effect of (?:Unknown_686|レイテントバグ) from/,
        condition: function(data, matches) {
          return data.me == matches[1];
        },
        alertText: {
          en: 'Latent Defect',
          de: 'Blauer Marker',
          fr: 'Marqueur bleu',
          ja: 'レイテントついた',
        },
      },
    ],
  },
  {
    zoneRegex: /(^Eden's Gate: Resurrection \(Savage\)$|Unknown Zone \(355\))/,
    triggers: [
      {
        id: 'E1S Delta Attack 1 v2',
        regex: / 14:44F4:Eden Prime starts using (?:Delta Attack|)/,
        regexDe: / 14:44F4:Eden Prime starts using (?:Delta-Attacke|)/,
        regexFr: / 14:44F4:Eden Prime starts using (?:Attaque Delta|)/,
        regexJa: / 14:44F4:Eden Prime starts using (?:デルタアタック|)/,
        alertText: {
          en: 'Intercardinal Spread',
        },
      },
      {
        id: 'E1S Delta Attack 2 v2',
        regex: / 14:44F8:Eden Prime starts using (?:Delta Attack|)/,
        regexDe: / 14:44F8:Eden Prime starts using (?:Delta-Attacke|)/,
        regexFr: / 14:44F8:Eden Prime starts using (?:Attaque Delta|)/,
        regexJa: / 14:44F8:Eden Prime starts using (?:デルタアタック|)/,
        alertText: function(data) {
          if (data.role == 'tank') {
            return {
              en: 'Get In, Cooldown, Spread',
            };
          }
          return {
            en: 'In, Stack Behind',
          };
        },
      },
    ],
  },
  {
    zoneRegex: /(^Eden's Gate: Descent \(Savage\)$|Unknown Zone \(356\))/,
    timeline: `
      136.0 "Phase 2: Hand"
      205.0 "Phase 3: Single Flare, Puddle and Prey"
      275.0 "Phase 4: Equilibrium and Clock"
      344.0 "Phase 5: Double Flares"
      378.0 "Spread for Flares"
      385.0 "Stack"
      424.0 "Flares + Eyes"
      443.0 "Equilibrium"
      447.0 "Punishing Ray"
      453.0 "Clock Positions"

      # InfoTexts
      infotext "Phase 2: Hand"
      infotext "Phase 3: Single Flare, Puddle and Prey"
      infotext "Phase 4: Equilibrium and Clock"
      infotext "Phase 5: Double Flares"

      infotext "Spread for Flares"
      infotext "Stack"
      infotext "Flares + Eyes"
      infotext "Equilibrium"
      infotext "Punishing Ray"
      infotext "Clock Positions"
    `,
    triggers: [
      {
        id: 'E2S Doomvoid Cleaver v2',
        regex: / 14:3E63:Voidwalker starts using (?:Doomvoid Cleaver|)/,
        regexDe: / 14:3E63:Nichtswandler starts using (?:Nichtsmarter-Schlachter|)/,
        regexFr: / 14:3E63:Marcheuse Du Néant starts using (?:Couperet Du Néant Ravageur|)/,
        regexJa: / 14:3E63:ヴォイドウォーカー starts using (?:ドゥームヴォイド・クリーバー|)/,
        alertText: {
          en: 'Clock Positions',
          fr: 'Position',
          ja: '散開',
        },
      },
      {
        id: 'E2S Cycle of Retribution v2',
        regex: / 14:4659:Voidwalker starts using (?:Cycle Of Retribution|)/,
        regexFr: / 14:4659:Marcheuse Du Néant starts using (?:Multi-taillade Vengeresse|)/,
        regexJa: / 14:4659:ヴォイドウォーカー starts using (?:復讐の連続剣|)/,
        alertText: {
          en: 'In, Clock, Sides',
          fr: 'Intérieur, Position, Côtés',
          ja: '中 => 散開 => 横',
        },
      },
      {
        id: 'E2S Cycle of Chaos v2',
        regex: / 14:40B9:Voidwalker starts using (?:Cycle Of Chaos|)/,
        regexFr: / 14:40B9:Marcheuse Du Néant starts using (?:Multi-taillade Chaotique|)/,
        regexJa: / 14:40B9:ヴォイドウォーカー starts using (?:混沌の連続剣|)/,
        alertText: {
          en: 'Sides, In, Clock',
          fr: 'Côtés, Intérieur, Position',
          ja: '横 => 中 => 散開',
        },
      },
    ],
  },
  {
    zoneRegex: /^Eden's Gate: Inundation \(Savage\)$/,
    timeline: `
      hideall "Hidden - Disable Left Right Mode"
      hideall "Hidden - Enable Left Right Mode"

      2.0 "Hidden - Disable Left Right Mode"
      14.0 "Hidden - Disable Left Right Mode"
      25.0 "Hidden - Disable Left Right Mode"

      133.0 "Hidden - Enable Left Right Mode"
      142.0 "Hidden - Enable Left Right Mode"
      147.0 "Hidden - Enable Left Right Mode"

      188.0 "Hidden - Disable Left Right Mode"
      198.0 "Hidden - Disable Left Right Mode"
      212.0 "Hidden - Disable Left Right Mode"

      317.0 "Buster Soon!"

      537.0 "Hidden - Enable Left Right Mode"
      542.0 "Hidden - Enable Left Right Mode"
      545.0 "Hidden - Enable Left Right Mode"

      567.0 "Hidden - Disable Left Right Mode"
      578.0 "Hidden - Disable Left Right Mode"
      588.0 "Hidden - Disable Left Right Mode"
    `,
    timelineTriggers: [
      {
        id: 'E3S Buster Soon',
        regex: /Buster Soon!/,
        alertText: {
          en: 'Buster Soon',
        }
      },
      {
        id: 'E3S Hidden - Disable Left Right Mode',
        regex: /Hidden - Disable Left Right Mode/,
        run: function(data) {
          data.temporaryCurrentLeftRightMode = false;
        }
      },
      {
        id: 'E3S Hidden - Enable Left Right Mode',
        regex: /Hidden - Enable Left Right Mode/,
        run: function(data) {
          data.temporaryCurrentLeftRightMode = true;
        }
      },
    ],
    triggers: [
      {
        id: 'E3S Refreshed v2',
        regex: / 14:400F:Leviathan starts using Refreshing Shower/,
        regexCn: / 14:400F:利维亚桑 starts using Refreshing Shower/,
        regexDe: / 14:400F:Leviathan starts using Erwachen der Tiefen/,
        regexFr: / 14:400F:Léviathan starts using Éveil De L'[eE]au/,
        regexJa: / 14:400F:リヴァイアサン starts using 水の覚醒/,
        run: function(data) {
          data.refreshed = true;
          // "E3S Hidden - Disable Left Right Mode" doesn't seem to work. Use refreshing shower as another way to hopefully activate it
          data.temporaryCurrentLeftRightMode = false;
        },
      },
      {
        id: 'E3S Black Smokers',
        regex: / 00:282B:Leviathan begins casting Black Smokers/,
        run: function(data) {
          // Just to really make sure "E3S Hidden - Enable Left Right Mode" activates
          data.temporaryCurrentLeftRightMode = true;
        },
      },
      {
        id: 'E3S Front Left Temporary Current v2',
        regex: / 14:3FEB:Leviathan starts using Temporary Current/,
        regexCn: / 14:3FEB:利维亚桑 starts using Temporary Current/,
        regexDe: / 14:3FEB:Leviathan starts using Unstete Gezeiten/,
        regexFr: / 14:3FEB:Léviathan starts using Courant Évanescent/,
        regexJa: / 14:3FEB:リヴァイアサン starts using テンポラリーカレント/,
        alertText: function(data) {
          if (data.temporaryCurrentLeftRightMode) {
            return {
              en: 'Left Front / Right Back',
            };
          }
          return {
            en: 'Front left / Back right',
            de: 'Vorne Links / Hinten Rechts',
            fr: 'Avant gauche / Arrière droite',
            ja: '左前 / 右後ろ',
          };
        },
      },
      {
        id: 'E3S Front Right Temporary Current v2',
        regex: / 14:3FEA:Leviathan starts using Temporary Current/,
        regexCn: / 14:3FEA:利维亚桑 starts using Temporary Current/,
        regexDe: / 14:3FEA:Leviathan starts using Unstete Gezeiten/,
        regexFr: / 14:3FEA:Léviathan starts using Courant Évanescent/,
        regexJa: / 14:3FEA:リヴァイアサン starts using テンポラリーカレント/,
        alertText: function(data) {
          if (data.temporaryCurrentLeftRightMode) {
            return {
              en: 'Left Back / Right Front',
            };
          }
          return {
            en: 'Front right / Back left',
            de: 'Vorne Rechts / Hinten Links',
            fr: 'Avant droit / Arrière gauche',
            ja: '右前 / 左後ろ',
          };
        },
      },
      {
        // Note: there are different abilities for the followup
        // temporary current, but there's only a 1 second cast time.
        // The original has a 6 second cast time and 4 seconds before
        // the next one.
        id: 'E3S Front Left Temporary Current 2 v2',
        regex: / 14:3FEA:Leviathan starts using Temporary Current/,
        regexCn: / 14:3FEA:利维亚桑 starts using Temporary Current/,
        regexDe: / 14:3FEA:Leviathan starts using Unstete Gezeiten/,
        regexFr: / 14:3FEA:Léviathan starts using Courant Évanescent/,
        regexJa: / 14:3FEA:リヴァイアサン starts using テンポラリーカレント/,
        condition: function(data) {
          return data.refreshed;
        },
        delaySeconds: 6.2,
        alertText: function(data) {
          if (data.temporaryCurrentLeftRightMode) {
            return {
              en: 'Left Front / Right Back',
            };
          }
          return {
            en: 'Front left / Back right',
            de: 'Vorne Links / Hinten Rechts',
            fr: 'Avant gauche / Arrière droite',
            ja: '左前 / 右後ろ',
          };
        },
      },
      {
        id: 'E3S Front Right Temporary Current 2 v2',
        regex: / 14:3FEB:Leviathan starts using Temporary Current/,
        regexCn: / 14:3FEB:利维亚桑 starts using Temporary Current/,
        regexDe: / 14:3FEB:Leviathan starts using Unstete Gezeiten/,
        regexFr: / 14:3FEB:Léviathan starts using Courant Évanescent/,
        regexJa: / 14:3FEB:リヴァイアサン starts using テンポラリーカレント/,
        condition: function(data) {
          return data.refreshed;
        },
        delaySeconds: 6.2,
        alertText: function(data) {
          if (data.temporaryCurrentLeftRightMode) {
            return {
              en: 'Left Back / Right Front',
            };
          }
          return {
            en: 'Front right / Back left',
            de: 'Vorne Rechts / Hinten Links',
            fr: 'Avant droit / Arrière gauche',
            ja: '右前 / 左後ろ',
          };
        },
      },
    ]
  },
  {
    zoneRegex: /^Eden's Gate: Sepulture \(Savage\)$/,
    triggers: [
      {
        // Evil Earth Callouts - Part 1
        id: 'E4S - Evil Earth Detection',
        regex: /.*15:.*:Titan:410C:Evil Earth:E0000000.*44:44:0:0:0:1000:(\d*:\d*):0/,
        // No idea why, but this function is always triggered 8 times all with the same timestamp and text...
        // [1/12/2019 10:12:45 am] Info: Replay: BrowserConsole: [23:03:05.691] 15:4000F63A:Titan:410C:Evil Earth:E0000000::0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:::::::::::44:44:0:0:0:1000:115:115:0 (Source: , Line: 545)
        alertText: function(data, matches) {
          //console.log(matches[0]);
          data.evilEarth = true;
          switch(matches[1]) {
            case "95:105":  // Verified - 1 Dec 2019, 21:23, 21:45, 21:52
            case "105:95":  // Verified - 1 Dec 2019, 21:23, 21:45, 21:52
            case "85:115":  // Verified - 1 Dec 2019, 21:42
            case "115:85":  // Verified - 1 Dec 2019, 21:42
              data.evilEarthSafeSpot = 'Alpha';
              break;
            case "95:95":   // Verified - 1 Dec 2019, 21:56
            case "105:105": // Verified - 1 Dec 2019, 21:56
            case "85:85":   // Verified - 1 Dec 2019, 21:14
            case "115:115": // Verified - 1 Dec 2019, 21:14
              data.evilEarthSafeSpot = 'Bravo';
              break;
            default:
              data.evilEarthSafeSpot = 'UNKNOWN';
              // console.log('E4S - Evil Earth Detection - Unknown location ' + matches[0])
              break;
          }
          return {
            en: 'Go to ' + data.evilEarthSafeSpot,
           };
        }
      },
      {
        // Evil Earth Callouts - Part 2
        id: 'E4S - Aftershock',
        regex: /.* 15:.*:Titan:41B5:Aftershock:E0000000.*44:44:0:0:0:1000:(\d*:\d*):0/,
        alertText: function(data, matches) {
          //console.log(matches[0]);
          if(data.evilEarth == true) {
            if((data.evilEarthSafeSpot == 'Alpha' && matches[1] == '105:105') || (data.evilEarthSafeSpot == 'Bravo' && matches[1] == '95:105')) {
              data.evilEarth == false
              return {
                en: 'MOVE!',
              };
            }
          }
        },
      },
      {
        id: 'E4S Massive Landslide - Front v2',
        regex: / 15:\y{ObjectId}:Titan:40E6:Earthen Gauntlets:/,
        regexCn: / 15:\y{ObjectId}:泰坦:40E6:Earthen Gauntlets:/,
        regexDe: / 15:\y{ObjectId}:Titan:40E6:Gaia-Armberge:/,
        regexFr: / 15:\y{ObjectId}:Titan:40E6:Poing Tellurique:/,
        regexJa: / 15:\y{ObjectId}:タイタン:40E6:大地の手甲:/,
        alertText: {
          en: 'Gauntlets: Front',
        },
      },
      {
        id: 'E4S Massive Landslide - Sides v2',
        regex: / 15:\y{ObjectId}:Titan:4117:Massive Landslide:/,
        regexCn: / 15:\y{ObjectId}:泰坦:4117:Massive Landslide:/,
        regexDe: / 15:\y{ObjectId}:Titan:4117:Gigantischer Bergsturz:/,
        regexFr: / 15:\y{ObjectId}:Titan:4117:Glissement Apocalyptique:/,
        regexJa: / 15:\y{ObjectId}:タイタン:4117:メガ・ランドスライド:/,
        infoText: {
          en: 'Landslide: Sides',
        },
      },
      {
        id: 'E4S Tectonic Uplift',
        regex: Regexes.ability({ id: '4122', source: 'Titan Maximum', capture: false }),
        infoText: {
          en: 'Orange Two, Yellow 3',
        },
      },
// Fixed in Cactbot 0.15.2
//    // Unfortunately, "E4S Bury Directions" is sometimes not triggering.
//    // Hoping that this is the issue - reverting cactbot changes for earthen armor detection to v0.14.1's
//    {
//        id: 'E4S Earthen Armor v2',
//        regex: / 15:\y{ObjectId}:Titan:40E[79]:Earthen Armor:/,
//        regexCn: / 15:\y{ObjectId}:泰坦:40E[79]:大地之铠:/,
//        regexDe: / 15:\y{ObjectId}:Titan:40E[79]:Gaia-Panzer:/,
//        regexFr: / 15:\y{ObjectId}:Titan:40E[79]:Armure Tellurique:/,
//        regexJa: / 15:\y{ObjectId}:タイタン:40E[79]:大地の鎧:/,
//        regexKo: / 15:\y{ObjectId}:타이탄:40E[79]:대지의 갑옷:/,
//        run: function(data) {
//          data.phase = 'armor';
//          delete data.printedBury;
//        },
//      },
      {
        // Bomb positions are all x = (86 west, 100 mid, 114 east), y = (86, 100, 114).
        // Note: as these may hit multiple people, there may be multiple lines for the same bomb.
        id: 'E4S Bury Directions v2',
        regex: Regexes.abilityFull({ id: '4142', source: 'Bomb Boulder' }),
        regexDe: Regexes.abilityFull({ id: '4142', source: 'Bomber-Brocken' }),
        regexFr: Regexes.abilityFull({ id: '4142', source: 'Bombo Rocher' }),
        regexJa: Regexes.abilityFull({ id: '4142', source: 'ボムボルダー' }),
        regexCn: Regexes.abilityFull({ id: '4142', source: '爆破岩石' }),
        regexKo: Regexes.abilityFull({ id: '4142', source: '바위폭탄' }),
        condition: function(data) {
          return !data.printedBury;
        },
        durationSeconds: 7,
        alertText: function(data, matches) {
          let x = matches.x;
          let y = matches.y;

          if (data.phase == 'armor') {
            // Three line bombs (middle, e/w, w/e), with seismic wave.
            if (x < 95) {
              data.printedBury = true;
              return {
                en: 'Bravo TWO Side',
                de: 'Im Osten vestecken',
                fr: 'Cachez-vous derrière à l\'est',
                cn: '右边躲避',
                ko: '동쪽으로',
              };
            } else if (x > 105) {
              data.printedBury = true;
              return {
                en: 'Alpha One Side',
                de: 'Im Westen vestecken',
                fr: 'Cachez-vous derrière à l\'ouest',
                cn: '左边躲避',
                ko: '서쪽으로',
              };
            }
          } else if (data.phase == 'landslide') {
            // Landslide cardinals/corners + middle, followed by remaining 4.
            let xMiddle = x < 105 && x > 95;
            let yMiddle = y < 105 && y > 95;
            // Ignore middle point, which may come first.
            if (xMiddle && yMiddle)
              return;

            data.printedBury = true;
            if (!xMiddle && !yMiddle) {
              // Corners dropped first.  Cardinals safe.
              return {
                en: 'Go Cardinals First',
                de: 'Zuerst zu den Seiten gehen',
                fr: 'Allez aux cardinaux en premier',
                ja: '十字',
                cn: '十字',
                ko: '먼저 측면으로 이동',
              };
            }
            // Cardinals dropped first.  Corners safe.
            return {
              en: 'Go Corners First',
              de: 'Zuerst in die Ecken gehen',
              fr: 'Allez dans les coins en premier',
              cn: '先去角落',
              ko: '먼저 코너로 이동',
            };
          }
        },
      },
      {
        id: 'E4S - Crumbling Down Boulders - Part 1',
        regex: /.*15:.*:Titan:4110:Seismic Wave/,
        alertText: function(data, matches) {
          //console.log(matches[0]);
          data.seismicWave = true;
          return {
            en: 'MOVE!',
           };
        }
      },
      {
        id: 'E4S - Crumbling Down Boulders - Part 2',
        regex: /.*15:.*:Bomb Boulder:410A:Explosion:E0000000/,
        alertText: function(data, matches) {
          //console.log(matches[0]);
          data.seismicWave = false;
          return {
            en: 'MOVE!',
           };
        }
      },
    ],
  },
  {
  // Ruby EX
    zoneRegex: /^Cinder Drift \(Extreme\)$/,
    triggers: [
      {
        id: 'RubyEx Check Chariot or Dynamo',
        regex: /Raven's image (readies Iron Chariot|begins casting Lunar Dynamo)/,
        suppressSeconds: 1,
        alertText: {
          en: 'Check Chariot or Dynamo',
        },
      },
      {
        id: 'RubyEx Change of Heart v2',
        regex: Regexes.startsUsing({ source: 'The Ruby Weapon', id: '4AFC', capture: false }),
        regexDe: Regexes.startsUsing({ source: 'Rubin-Waffe', id: '4AFC', capture: false }),
        regexFr: Regexes.startsUsing({ source: 'Arme Rubis', id: '4AFC', capture: false }),
        regexJa: Regexes.startsUsing({ source: 'ルビーウェポン', id: '4AFC', capture: false }),
        alertText: {
          en: 'Prepare for Tank Swap',
        },
      },
      {
        id: 'RubyEx Ruby Claw v2',
        regex: Regexes.startsUsing({ source: 'Raven\'s Image', id: '4AFF' }),
        regexDe: Regexes.startsUsing({ source: 'Naels Trugbild', id: '4AFF' }),
        regexFr: Regexes.startsUsing({ source: 'Spectre De Nael', id: '4AFF' }),
        regexJa: Regexes.startsUsing({ source: 'ネールの幻影', id: '4AFF' }),
        suppressSeconds: 1,
        response: Responses.tankBuster(),
      },
      {
        id: 'RubyEx Pall of Rage v2',
        regex: Regexes.gainsEffect({ effect: 'Pall of Rage' }),
        regexDe: Regexes.gainsEffect({ effect: 'Zorn' }),
        regexFr: Regexes.gainsEffect({ effect: 'Fureur' }),
        regexJa: Regexes.gainsEffect({ effect: '憤怒' }),
        preRun: function(data, matches) {
          data.colors = data.colors || [];
          data.colors[matches.target] = 'blue';
        },
        infoText: function(data, matches) {
          if (data.me == matches.target) {
            return {
              en: 'Right. Attack Blue.',
              de: 'Greife Blau an (Osten)',
              fr: 'Attaquez le bleu (Est)',
              ko: '파란색 공격 (오른쪽)',
            };
          }
        },
      },
      {
        id: 'RubyEx Pall of Grief v2',
        regex: Regexes.gainsEffect({ effect: 'Pall of Grief' }),
        regexDe: Regexes.gainsEffect({ effect: 'Trauer' }),
        regexFr: Regexes.gainsEffect({ effect: 'Angoisse' }),
        regexJa: Regexes.gainsEffect({ effect: '悲嘆' }),
        preRun: function(data, matches) {
          data.colors = data.colors || [];
          data.colors[matches.target] = 'red';
        },
        infoText: function(data, matches) {
          if (data.me == matches.target) {
            return {
              en: 'Left. Attack Red.',
              de: 'Greife Rot an (Westen)',
              fr: 'Attaquez le rouge (Ouest)',
              ko: '빨간색 공격 (왼쪽)',
            };
          }
        },
      },
    ]
  },
  {
    // E5S
    zoneRegex: /^Eden's Verse: Fulmination \(Savage\)$/,
    timeline: `
      1.0  "NEXT: Rods->Add->Buster"
      37.0 "Off Tank 3 Orbs"
      39.0 "Everyone 1 Orb"

      74.0 "NEXT: Stormclouds->Knockback->Buster"
      75.0 "Tanks and DPS 1 Orb"

      147.0 "NEXT: Buffed Aoe->Add->Buster->Stepped Leader"
      149.0 "Everyone 1 Orb"

      180.0 "Off Tank 3 Orbs"
      200.0 "Prepare for Stepped Leader"

      229.0 "Fury's 14"
      231.0 "Everyone 1 Orb"

      275.0 "NEXT: Donut Stepped Leader->Chain Lightning->Buster"
      280.0 "Stack for Donut Stepped Leader"

      318.0 "NEXT: Add, Buffed Aoe, Stepped Leader, Buster"
      319.0 "Off Tank 3 Orbs"
      360.0 "Prepare for Stepped Leader"

      338.0 "Everyone 1 Orb"

      385.0 "NEXT: Fury's 14 with charge!"
      389.0 "Everyone 1 Orb"

      430.0 "NEXT: Stormclouds->Knockback->Chain Lightning->Buster"
      435.0 "Tanks and DPS 1 Orb"

#     480.0 "Everyone 1 Orb"

      530.0 "NEXT: Stepped Leader->Buffed AoE -> Buffed AoE"
      532.0 "Prepare for Stepped Leader"

      547.0 "Everyone 1 Orb"
      576.0 "Everyone 1 Orb"
    `,
    timelineTriggers: [
      {
        id: 'E5S Off Tank 3 Orbs',
        regex: /Off Tank 3 Orbs/,
        alertText: {
          en: 'Off Tank 3 Orbs',
        }
      },
      {
        id: 'E5S Everyone 1 Orb',
        regex: /Everyone 1 Orb/,
        alertText: {
          en: 'Everyone 1 Orb',
        }
      },
      {
        id: 'E5S Tanks and DPS 1 Orb',
        regex: /Tanks and DPS 1 Orb/,
        alertText: {
          en: 'Tanks and DPS 1 Orb',
        }
      },
      {
        id: 'E5S Prepare for Stepped Leader',
        regex: /Prepare for Stepped Leader/,
        alertText: {
          en: 'Prepare for Stepped Leader',
        }
      },
      {
        id: 'E5S Stack for Donut Stepped Leader',
        regex: /Stack for Donut Stepped Leader/,
        alertText: {
          en: 'Stack for Donut Stepped Leader',
        }
      }
    ],
    triggers: [
      {
        // Cactbot v0.16.12 made this too slow. Reverted to pre-v0.16.12 trigger.
        id: 'E5S Stepped Leader Spread v2',
        regex: Regexes.startsUsing({ id: '4BC6', source: 'Ramuh', capture: false }),
        regexDe: Regexes.startsUsing({ id: '4BC6', source: 'Ramuh', capture: false }),
        regexFr: Regexes.startsUsing({ id: '4BC6', source: 'Ramuh', capture: false }),
        regexJa: Regexes.startsUsing({ id: '4BC6', source: 'ラムウ', capture: false }),
        regexKo: Regexes.startsUsing({ id: '4BC6', source: '라무', capture: false }),
        regexCn: Regexes.startsUsing({ id: '4BC6', source: '拉姆', capture: false }),
        condition: function(data) {
          return !data.furysBoltActive;
        },
        delaySeconds: 3.0,
        response: Responses.spread('alarm'),
      }
    ]
  },
  {
    // E6S
    zoneRegex: /^Eden's Verse: Furor \(Savage\)$/,
    timeline: `
      70.0 "Arms Length"
      149.0 "Center Boss"
      165.0 "Tanks Healers Tethers"
      186.0 "Bait AoE in middle"
      205.0 "DPS Tethers"
      284.0 "Bait AoE in middle"
      339.0 "Tanks Healers Tethers"
      357.0 "DPS Tethers"
      366.0 "Center Boss"
      396.0 "Bait AoE in middle"
      406.0 "Buster Combo And Center Boss"
      442.0 "Tank Healer Delta, DPS Bravo"
      490.3 "Bait Aoe, then goto intercardinals"
      521.0 "Tank Healer tethers, then intercardinals"
      536.0 "DPS tethers, then air bump, then intercardinals"
    `,
    timelineTriggers: [
      {
        id: 'E6S Arms Length',
        regex: /Arms Length/,
        alertText: {
          en: 'Arms Length',
        }
      },
      {
        id: 'E6S Center Boss',
        regex: /Center Boss/,
        alertText: {
          en: 'Center Boss',
        }
      },
      {
        id: 'E6S Tanks Healers Tethers',
        regex: /Tanks Healers Tethers/,
        alertText: {
          en: 'Tanks Healers Tethers',
        }
      },
      {
        id: 'E6S Bait AoE in middle',
        regex: /Bait AoE in middle/,
        alertText: {
          en: 'Bait AoE in middle',
        }
      },
      {
        id: 'E6S DPS Tethers',
        regex: /DPS Tethers/,
        alertText: {
          en: 'DPS Tethers',
        }
      },
      {
        id: 'E6S Buster Combo + Center Boss',
        regex: /Buster Combo And Center Boss/,
        alertText: {
          en: 'Buster Combo And Center Boss',
        }
      },
      {
        id: 'E6S Tank Healer Delta, DPS Bravo',
        regex: /Tank Healer Delta, DPS Bravo/,
        alertText: {
          en: 'Tank Healer Delta, DPS Bravo',
        }
      },
      {
        id: 'E6S Bait Aoe, then goto intercardinals',
        regex: /Bait Aoe, then goto intercardinals/,
        alertText: {
          en: 'Bait Aoe, then goto intercardinals',
        }
      },
      {
        id: 'E6S Tank Healer tethers, then intercardinals',
        regex: /Tank Healer tethers, then intercardinals/,
        alertText: {
          en: 'Tank Healer tethers, then intercardinals',
        }
      },
      {
        id: 'E6S DPS tethers, then air bump, then intercardinals',
        regex: /DPS tethers, then air bump, then intercardinals/,
        alertText: {
          en: 'DPS tethers, then air bump, then intercardinals',
        }
      }
    ],
    triggers: [
      {
        id: 'E6S Strike Spark v2',
        regex: Regexes.startsUsing({ source: ['Ifrit', 'Raktapaksa'], id: '4BD3', capture: false }),
        regexDe: Regexes.startsUsing({ source: ['Ifrit', 'Raktapaksa'], id: '4BD3', capture: false }),
        regexFr: Regexes.startsUsing({ source: ['Ifrit', 'Raktapaksa'], id: '4BD3', capture: false }),
        regexJa: Regexes.startsUsing({ source: ['イフリート', 'ラクタパクシャ'], id: '4BD3', capture: false }),
        promise: function(data) {
          let p = new Promise(async (res) => {

            // console.log("E6S Strike Spark v2: Promise triggered");

            // helper function to delay the promise execution for the given time
            const sleep = (m) => new Promise((r) => setTimeout(r, m));

            await sleep(10000);

            let combatantNames = null;

            const ifritLocaleNames = {
              en: 'Ifrit',
              de: 'Ifrit',
              fr: 'Ifrit',
              ja: 'イフリート',
            };

            const raktapaksaLocaleNames = {
              en: 'Raktapaksa',
              de: 'Raktapaksa',
              fr: 'Raktapaksa',
              ja: 'ラクタパクシャ',
            };

            // select the 4 most recent Ifrit or Raktapaksa's depending on phase
            if (data.phase === 'ifrit')
              combatantNames = [ifritLocaleNames[data.lang]];
            else
              combatantNames = [raktapaksaLocaleNames[data.lang]];

            let combatantData = await window.callOverlayHandler({
              call: 'getCombatants',
              names: combatantNames,
            });

            // if we could not retrieve combatant data, the
            // trigger will not work, so just resume promise here.
            if (!(combatantData !== null &&
              combatantData.combatants &&
              combatantData.combatants.length)) {
              // console.log("Issue obtaining combatantData!");
              data.safeZone = null;
              res();
            }

            // console.log("Obtained combatantData!");

            // we need to filter for the Ifrit with the highest ID
            // since that one is always the safe spot.
            let sortedCombatants = combatantData.combatants.sort((a, b) => a.ID - b.ID);
            let currentHighestCombatant = sortedCombatants.pop();

            // all variation ranges for all the 9 ball positions for the kicking actors
            // north      x: 96-104   y: 85-93
            // northeast  x: 107-115  y: 85-93
            // northwest  x: 85-93    y: 85-93
            // east       x: 107-115  y: 96-104
            // west       x: 85-93    y: 96-104
            // south      x: 96-104   y: 107-115
            // southeast  x: 107-115  y: 107-115
            // southwest  x: 85-93    y: 107-115
            let safeZoneObj1 = { en: '', de: '' };
            let safeZoneObj2 = { en: '', de: '' };

            // don't need to go through all the posibilities,
            // only those 4 ifs do reflect the above positions
            if (currentHighestCombatant.PosY > 84 && currentHighestCombatant.PosY < 94) {
              safeZoneObj1 = {
                en: 'north',
                de: 'nord',
              };
            } else if (currentHighestCombatant.PosY > 106 && currentHighestCombatant.PosY < 116) {
              safeZoneObj1 = {
                en: 'south',
                de: 'süd',
              };
            }

            if (currentHighestCombatant.PosX > 84 && currentHighestCombatant.PosX < 94) {
              safeZoneObj2 = {
                en: 'west',
                de: 'west',
              };
            } else if (currentHighestCombatant.PosX > 106 && currentHighestCombatant.PosX < 116) {
              safeZoneObj2 = {
                en: 'east',
                de: 'ost',
              };
            }

            data.safeZone = {
              en: safeZoneObj1.en + safeZoneObj2.en,
              de: safeZoneObj1.de + safeZoneObj2.de,
            };

            // console.log("Raw Data for " + data.phase);
            // sortedCombatants.forEach(function (item, index) {
            //     console.log("Index: " + index + " ID: " + item.ID + " PosX: " + item.PosX + " PosY: " + item.PosY);
            // });

            // console.log("Final Result");
            // console.log("currentHighestCombatant.PosX: " + currentHighestCombatant.PosX);
            // console.log("currentHighestCombatant.PosY: " + currentHighestCombatant.PosY);
            // console.log("safeZone: " + data.safeZone.en);

            switch(data.safeZone.en) {
              case "north":
                data.safeZone.en = "Alpha";
                break;
              case "northeast":
                data.safeZone.en = "Two";
                break;
              case "east":
                data.safeZone.en = "Bravo";
                break;
              case "southeast":
                data.safeZone.en = "Four";
                break;
              case "south":
                data.safeZone.en = "Charlie";
                break;
              case "southwest":
                data.safeZone.en = "Three";
                break;
              case "west":
                data.safeZone.en = "Delta";
                break;
              case "northwest":
                data.safeZone.en = "One";
                break;
            }

            // console.log("Modified safeZone: " + data.safeZone.en);

            res();
          });

          return p;
        },
        infoText: function(data) {
          return data.safeZone === null ? '???' : data.safeZone;
        },
      },
    ]
  },
/*  {
    // E7 NM
    zoneRegex: /^Eden's Verse: Iconoclasm$/,
    triggers: [
      {
        id: 'E7 Light or Dark Course',
        regex: Regexes.abilityFull({ source: 'Unforgiven Idolatry', id: ['4C3C', '4E63', '4C40', '4C3E', '4C22', '4C23'], capture: false }),
        promise: function(data) {
          let p = new Promise(async (res) => {
            let combatantData = await window.callOverlayHandler({
              call: 'getCombatants',
            });

            console.log(JSON.stringify(combatantData, null, 2));

            res();
          });

          return p;
        }
      }
    ]
  },*/
  {
    // E7S
    zoneRegex: /^Eden's Verse: Iconoclasm \(Savage\)$/,
    timeline: `
      233.0 "Move Add"
      256.0 "Move Add"
      280.0 "Move Add"
      303.0 "Move Add Slightly"
    `,
    timelineTriggers: [
      {
        id: 'E7S Move Add',
        regex: /Move Add/,
        alertText: {
          en: 'Move Add',
        }
      },
      {
        id: 'E7S Move Add Slightly',
        regex: /Move Add Slightly/,
        alertText: {
          en: 'Move Add Slightly',
        }
      },
    ],
    triggers: [
      {
        id: 'E7S Words of Motion State Tracker',
        regex: Regexes.startsUsing({ source: 'The Idol of Darkness', id: '4C2B', capture: false }),
        run: function(data) {
          // Data is reset every pull. Initialize it if it does not exist.
          data.wordsOfMotionState = data.wordsOfMotionState || "Start";

          let previousState = data.wordsOfMotionState;
          switch(data.wordsOfMotionState) {
            case "Start":
              data.wordsOfMotionState = "Phase 1 Portals";
              data.phase1PortalsState = "Start";
              data.phase1PortalsPrevTime = -1;
              data.phase1PortalsSafeSpot = "";
              data.phase1PortalsCallout = "";
              data.phase1PortalsCalloutDone = false;
              break;
            case "Phase 1 Portals":
              data.wordsOfMotionState = "??? TODO Levi Spread";
              break;
          }
          // console.log("E7S Words of Motion State Tracker: previousState: " + previousState + ", newState: " + data.wordsOfMotionState);
        }
      },
      {
        id: 'E7S Light or Dark Course',
        regex: Regexes.abilityFull({ source: 'Unforgiven Idolatry', id: ['4C5A', '4C62', '4C63', '4C64'], capture: false }),
        condition: function(data, matches) {
          // console.log(JSON.stringify(matches, null, 2));
          if(data.wordsOfMotionState == "Phase 1 Portals") {
            // Example result from matches
            // Doing capture: false because there's a need to obtain the time and the automatic capture doesn't include time.
            // [22:05:32.667] 15:4000EA63:Unforgiven Idolatry:4C62:Light's Course:E0000000::0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:::::::::::148000:148000:10000:10000:0:1000:95:75:0:-4.792213E-05:00004080
            let result = matches[0].match(/\[(.*?)\].*:(.*):(.*):(.*):(.*):(.*)/);
            // console.log(JSON.stringify(result, null, 2))
            let currentTime = (new Date('1970-01-01T' + result[1] + 'Z')).getTime();
            let x = parseFloat(result[2]);
            let y = parseFloat(result[3]);

            //console.log("x: " + x + ", y: " + y + ", currentTime: " + currentTime + ", prevTime: " + data.phase1PortalsPrevTime);

            // We will move to the next State if time greater than previous state by 1 second.
            if(currentTime > data.phase1PortalsPrevTime + 1000) {
              data.phase1PortalsCalloutDone = false; // Reset this. We only want to callout once for each state.

              let previousState = data.phase1PortalsState;
              data.phase1PortalsPrevTime = currentTime;
              switch(data.phase1PortalsState) {
                case "Start":
                  data.phase1PortalsState = "After Front to Back 1";
                  break;
                case "After Front to Back 1": // We are tracking the Light/Dark Course at the end of each state. So the states are actually AFTER the course AoEs.
                  data.phase1PortalsState = "After Front to Back 2";
                  break;
                case "After Front to Back 2":
                  data.phase1PortalsState = "After First Set Right to Left 1";
                  break;
                case "After First Set Right to Left 1":
                  data.phase1PortalsState = "After First Set Right to Left 2";
                  break;
                case "After First Set Right to Left 2":
                  data.phase1PortalsState = "After Second Set Right to Left 1";
                  break;
                case "After Second Set Right to Left 1":
                  data.phase1PortalsState = "After Second Set Right to Left 2";
                  break;
                case "After Second Set Right to Left 2":
                  data.phase1PortalsState = "After Third Set Right to Left 1";
                  break;
                case "After Third Set Right to Left 1":
                  data.phase1PortalsState = "After Third Set Right to Left 2";
                  break;
                case "After Third Set Right to Left 2":
                  data.phase1PortalsState = "End";
                  break;
              }
              // console.log("STATE CHANGE. NEW: " + data.phase1PortalsState + " OLD: " + previousState);
            }

            // console.log(((new Date(currentTime)).toISOString().split("T"))[1] + " Light/Dark Course. x: " + x + ", y: " + y + ", State: " + data.phase1PortalsState);

            // Perform logic based on current state
            switch(data.phase1PortalsState) {
              case "After Front to Back 1":
                // Figure out which was fired first
                if(Math.abs(x - 95) < 1) { // Probably fine to do a direct comparision against 95. This is just in case position is off by a little.
                  // Red will fire first.
                  data.phase1PortalsSafeSpot = "Back";
                  data.phase1PortalsCallout = "Go to Blue First";
                  // console.log("phase1PortalsSafeSpot: " + data.phase1PortalsSafeSpot);

                  if(data.phase1PortalsCalloutDone == false) { // Only alertText once in each state.
                      data.phase1PortalsCalloutDone = true;
                      return true; // Perform alertText.
                  } else {
                      return false;
                  }
                }

                if(Math.abs(x - 105) < 1) {
                  // Blue will fire first.
                  data.phase1PortalsSafeSpot = "Front";
                  data.phase1PortalsCallout = "Go to Red First";
                  // console.log("phase1PortalsSafeSpot: " + data.phase1PortalsSafeSpot);

                  if(data.phase1PortalsCalloutDone == false) { // Only alertText once in each state.
                    data.phase1PortalsCalloutDone = true;
                    return true; // Perform alertText.
                  } else {
                    return false;
                  }
                }
                break;

              case "After Front to Back 2":
                // Nothing to do
                // Can alertText safe spot again.
                if(data.phase1PortalsCalloutDone == false) { // Only alertText once in each state.
                  data.phase1PortalsCallout = data.phase1PortalsSafeSpot;
                  data.phase1PortalsCalloutDone = true;
                  return true; // Perform alertText.
                } else {
                  return false;
                }
                break;

              case "zAfter First Set Right to Left 1":
              case "zAfter Second Set Right to Left 1":
              case "zAfter Third Set Right to Left 1":
                // alertText + update next position. Only do this ONCE in this state.
                if(data.phase1PortalsCalloutDone == false) {
                  if(Math.abs(y - 85) < 1) {
                    data.phase1PortalsCallout = "Back";
                    data.phase1PortalsCalloutDone = true;
                    return true;
                  } else if (Math.abs(y - 95) < 1) {
                    data.phase1PortalsSafeSpot = "Front";
                    data.phase1PortalsCalloutDone = true;
                    return true;
                  }
                }
                return false;
                break;
              case "zAfter First Set Right to Left 2":
              case "zAfter Second Set Right to Left 2":
                if(data.phase1PortalsCalloutDone == false) {
                  data.phase1PortalsCallout = "Remember to check colours";
                  data.phase1PortalsCalloutDone = true;
                  return true;
                }
                break;
            }
          }
          return false; // Don't perform alertText
        },
        alertText: function(data, matches) {
            // console.log("alertText: " + data.phase1PortalsCallout);
            return data.phase1PortalsCallout;
        }
      }
    ]
  },
  {
    // E8S
    zoneRegex: /^Eden's Verse: Refulgence \(Savage\)$/,
    timeline: `
      161.0 "Threes Enter"
      165.0 "Light Rampant Ends"

      495.0 "Stack South for Akh Rhai"

      543.0 "Move to intercardinal"

      562.0 "Blue Knockback Mirror"
      567.0 "Green Knockback Mirror"
      572.0 "Red Knockback Mirror"

      590.0 "Back to Mid"
      595.0 "Stack South for Akh Rhai"
      611.0 "Stack North for Akh Rhai"
      619.0 "Split Stack for Akh Morn"

      678.0 "Twos Enter"
      684.0 "Clock Positions"

      692.0 "Move Boss North"

      734.0 "Stack closer to boss"

      760.0 "Split Stack for Akh Morn"

      780.0 "Split Stack for Akh Morn"
    `,
    timelineTriggers: [
      {
        id: 'E8S Light Rampant Threes Enter',
        regex: /Threes Enter/,
        alertText: {
          en: 'Threes Enter',
        }
      },
      {
        id: 'E8S Light Rampant Ends',
        regex: /Light Rampant Ends/,
        alertText: {
          en: 'Light Rampant Ends',
        }
      },
      {
        id: 'E8S Stack South for Akh Rhai',
        regex: /Stack South for Akh Rhai/,
        alertText: {
          en: 'Stack South for Akh Rhai',
        }
      },
      {
        id: 'E8S Stack North for Akh Rhai',
        regex: /Stack North for Akh Rhai/,
        alertText: {
          en: 'Stack North for Akh Rhai',
        }
      },
      {
        id: 'E8S Split Stack for Akh Morn',
        regex: /Split Stack for Akh Morn/,
        alertText: {
          en: 'Split Stack for Akh Morn',
        }
      },
      {
        id: 'E8S Move to intercardinal',
        regex: /Move to intercardinal/,
        alertText: {
          en: 'Move to intercardinal',
        }
      },
      {
        id: 'E8S Blue Knockback Mirror',
        regex: /Blue Knockback Mirror/,
        alertText: {
          en: 'Boss to Blue. Look away from boss and blue.',
        }
      },
      {
        id: 'E8S Green Knockback Mirror',
        regex: /Green Knockback Mirror/,
        alertText: {
          en: 'Look away from green',
        }
      },
      {
        id: 'E8S Red Knockback Mirror',
        regex: /Red Knockback Mirror/,
        alertText: {
          en: 'Look away from Red',
        }
      },
      {
        id: 'E8S Back to Mid',
        regex: /Back to Mid/,
        alertText: {
          en: 'Back to Mid',
        }
      },
      {
        id: 'E8S Icelight Dragonsong Twos Enter',
        regex: /Twos Enter/,
        alertText: {
          en: 'Twos Enter',
        }
      },
      {
        id: 'E8S Icelight Dragonsong Clock Positions',
        regex: /Clock Positions/,
        alertText: {
          en: 'Clock Positions',
        }
      },
      {
        id: 'E8S Move Boss North',
        regex: /Move Boss North/,
        alertText: {
          en: 'Move Boss North',
        }
      },
      {
        id: 'E8S Wyrm Lament 2 Stack closer to boss',
        regex: /Stack closer to boss/,
        alertText: {
          en: 'Stack closer to boss',
        }
      }
    ],
    triggers: [
      {
        id: 'E8S Forgetful Tank Second Frost v2',
        netRegex: NetRegexes.startsUsing({ source: 'Shiva', id: '4D6[67]', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Shiva', id: '4D6[67]', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Shiva', id: '4D6[67]', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'シヴァ', id: '4D6[67]', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '希瓦', id: '4D6[67]', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '시바', id: '4D6[67]', capture: false }),
        condition: (data) => data.role == 'tank',
        delaySeconds: 44,
        durationSeconds: 9,
        suppressSeconds: 80,
        infoText: function(data) {
          if (data.firstFrost == 'driving') {
            return {
              en: 'Biting Frost - Face Boss Outwards',
              de: 'Frosthieb als nächstes',
              fr: 'Taillade de givre bientôt',
              cn: '下次攻击前侧面',
              ko: '다음: Biting/スラッシュ',
            };
          }
          return {
            en: 'Driving Frost - Face Boss Inwards',
            de: 'Froststoß als nächstes',
            fr: 'Percée de givre bientôt',
            cn: '下次攻击后面',
            ko: '다음: Driving/スラスト',
          };
        },
        tts: function(data) {
          if (data.firstFrost == 'driving') {
            return {
              en: 'Biting Frost Next',
              de: 'Frosthieb als nächstes',
              fr: 'Taillade de givre bientôt',
              cn: '下次攻击前侧面',
              ko: '다음: 바이팅 스라슈',
            };
          }
          return {
            en: 'Driving Frost Next',
            de: 'Froststoß als nächstes',
            fr: 'Percée de givre bientôt',
            cn: '下次攻击后面',
            ko: '다음: 드라이빙 스라스토',
          };
        }
      },
      {
        id: 'E8S Mirror Mirror 3 Blue',
        regex: /E8S Mirror Mirror 3 Blue/,
        alertText: function(data, matches) {
            data.e8sMirrorMirror3Colour = "Blue";
            return "" + data.e8sMirrorMirror3Colour;
        }
      },
      {
        id: 'E8S Mirror Mirror 3 Red',
        regex: /E8S Mirror Mirror 3 Red/,
        alertText: function(data, matches) {
            data.e8sMirrorMirror3Colour = "Red";
            return "" + data.e8sMirrorMirror3Colour;
        }
      },
      {
        id: 'E8S Hallowed Wings Left v2',
        netRegex: NetRegexes.startsUsing({ source: 'Shiva', id: '4D75', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Shiva', id: '4D75', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Shiva', id: '4D75', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'シヴァ', id: '4D75', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '希瓦', id: '4D75', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '시바', id: '4D75', capture: false }),
        durationSeconds: 9,
        alertText: function(data, matches) {
            var result = "Right";
            // Check whether this is the first hallowed wings
            // First hallowed wings means this is mirror mirror 3.
            data.e8sFirstHallowedWings = data.e8sFirstHallowedWings || "yes"; // Probably more efficient if this is boolean
            if(data.e8sFirstHallowedWings == "yes") {
                data.e8sMirrorMirror3Colour = data.e8sMirrorMirror3Colour || "unknown";
                if(data.e8sMirrorMirror3Colour == "Red") {
                    result = "North, B to A\nSouth, A to D";
                } else if(data.e8sMirrorMirror3Colour == "Blue") {
                    result = "North, C to D\nSouth, D to A";
                } else {
                    result = "Red, North, B to A\nRed, South, A to D\nBlue, North, C to D\nBlue, South, D to A\n";
                }
            }
            data.e8sFirstHallowedWings = "no";
            return result;
        }
      },
      {
        id: 'E8S Hallowed Wings Right v2',
        netRegex: NetRegexes.startsUsing({ source: 'Shiva', id: '4D76', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Shiva', id: '4D76', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Shiva', id: '4D76', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'シヴァ', id: '4D76', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '希瓦', id: '4D76', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '시바', id: '4D76', capture: false }),
        durationSeconds: 9,
        alertText: function(data, matches) {
            var result = "Left";
            // Check whether this is the first hallowed wings
            // First hallowed wings means this is mirror mirror 3.
            data.e8sFirstHallowedWings = data.e8sFirstHallowedWings || "yes"; // Probably more efficient if this is boolean
            if(data.e8sFirstHallowedWings == "yes") {
                data.e8sMirrorMirror3Colour = data.e8sMirrorMirror3Colour || "unknown";
                if(data.e8sMirrorMirror3Colour == "Red") {
                    result = "North, D to C\nSouth, C to B";
                } else if(data.e8sMirrorMirror3Colour == "Blue") {
                    result = "North, A to B\nSouth, B to C";
                } else {
                    result = "Red, North, D to C\nRed, South, C to B\nBlue, North, A to B\nBlue, South, B to C";
                }
            }
            data.e8sFirstHallowedWings = "no";
            return result;
        }
      },
      {
        id: 'E8S Hallowed Wings Move to Edge for Uptimne ',
        netRegex: NetRegexes.startsUsing({ source: 'Shiva', id: '4D77', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Shiva', id: '4D77', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Shiva', id: '4D77', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'シヴァ', id: '4D77', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '希瓦', id: '4D77', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '시바', id: '4D77', capture: false }),
        alertText: function(data, matches) {
          return 'Move to Edge and activate cooldown';
        }
      },
      {
        id: 'E8S Hallowed Wings Prepare to Arms Length', // Cactbot default doesn't work
        netRegex: NetRegexes.startsUsing({ source: 'Frozen Mirror', id: '4DBD', capture: false }),
        delaySeconds: 0,
        alertText: function(data, matches) {
          return 'Watch Enemy List!';
        }
      },
      {
        id: 'E8S Hallowed Wings Arms Length', // Cactbot default doesn't work
        netRegex: NetRegexes.startsUsing({ source: 'Frozen Mirror', id: '4DBD', capture: false }),
        delaySeconds: 2.5,
        alertText: function(data, matches) {
          return 'Arms Length';
        }
      },
      {
        id: 'E8S Holy Divided v2',
        netRegex: NetRegexes.startsUsing({ source: 'Shiva', id: '4D83', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Shiva', id: '4D83', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Shiva', id: '4D83', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'シヴァ', id: '4D83', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '希瓦', id: '4D83', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '시바', id: '4D83', capture: false }),
        alertText: function(data, matches) {
          return 'Middle';
        }
      }
    ]
  },
  {
    // WOL EX
    zoneId: ZoneId.TheSeatOfSacrificeExtreme,
    timeline: `
    `,
    timelineTriggers: [
    ],
    triggers: [
      {
        // Increasing this to alarm text because there are instances whereby this was overwritten by another infoText.
        id: 'WOLEx Summon Wyrm v2',
        netRegex: NetRegexes.startsUsing({ source: 'Warrior Of Light', id: '4F41', capture: false }),
        delaySeconds: 6,
        alarmText: {
          en: 'Avoid Wyrm Dash',
        },
      },
      {
        // Modifying these to have more useful callouts
        id: 'WOLEx Spectral Black Mage / White Mage v2',
        netRegex: NetRegexes.startsUsing({ source: 'Spectral Black Mage', id: '4F3D', capture: false }),
        condition: (data) => data.ultimateSeen && !data.calledSpectral,
        preRun: (data) => data.calledSpectral = true,
        durationSeconds: 9,
        infoText: {
          en: 'Towers (Black Mage + White Mage)',
        },
      },
      {
        id: 'WOLEx Summoner / Warrior v2',
        netRegex: NetRegexes.startsUsing({ source: 'Spectral Summoner', id: '4F3F', capture: false }),
        condition: (data) => data.ultimateSeen && !data.calledSpectral,
        preRun: (data) => data.calledSpectral = true,
        durationSeconds: 9,
        infoText: {
          en: 'Bahamut Corners (Summoner + Warrior)',
        },
      },
      {
        id: 'WOLEx Spectral Bard / Dark Knight v2',
        netRegex: NetRegexes.startsUsing({ source: 'Spectral Dark Knight', id: '4F3A', capture: false }),
        condition: (data) => data.ultimateSeen && !data.calledSpectral,
        preRun: (data) => data.calledSpectral = true,
        durationSeconds: 9,
        infoText: {
          en: 'Bubble Corners (Dark Knight + Bard)',
        },
      },
      {
        id: 'WOLEx Spectral Ninja v2',
        netRegex: NetRegexes.startsUsing({ source: 'Spectral Ninja', id: '4EFD', capture: false }),
        infoText: {
          en: 'Pair Stacks and Knockback (Ninja)',
        },
        durationSeconds: 9,
        run: function(data) {
          data.ninja = true;
        },
      }
    ]
  },
  {
    // Shiva Unreal
    zoneId: ZoneId.TheAkhAfahAmphitheatreUnreal,
    timeline: `
    `,
    timelineTriggers: [
      {
        id: 'ShivaUn Avalanche Move North',
        regex: /Avalanche/,
        beforeSeconds: 20,
        alertText: {
          en: 'Move Boss North',
        }
      }
    ],
    triggers: [
    ]
  },
  {
    // Emerald Weapon EX
    zoneId: ZoneId.CastrumMarinumExtreme,
    timeline: `
    `,
    timelineTriggers: [
      {
        id: 'EmeraldEx Tertius Aire Tam Storm',
        regex: /Aire Tam Storm/,
        beforeSeconds: 9,
        alertText: {
          en: 'Avoid Puddle',
        }
      },
      {
        id: 'EmeraldEx Secundus Terminus Est',
        regex: /Secundus Terminus Est/,
        beforeSeconds: 12,
        alertText: {
          en: 'Hold Inner Release',
        }
      }
    ],
    triggers: [
      {
        id: 'EmeraldEx Tertius Terminus est',
        netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55CC', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55CC', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55CC', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55CC', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Swords',
            de: 'Schwerter',
            fr: 'Épées',
            cn: '剑',
            ko: '검',
          }
        },
        run: function(data) {
          data.EmeraldExInSwords = true;
          // console.log('EmeraldEx Tertius Terminus est: Setting data.EmeraldExInSwords = true');
        }
      },
      {
        id: 'EmeraldEx Swords + Sidescape', // This means that the boss has upper half left.
        netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55D[4-5]', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55D[4-5]', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55D[4-5]', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55D[4-5]', capture: false }),
        condition: function(data, matches, output) {
          data.EmeraldExInSwords = data.EmeraldExInSwords || false;
          if (data.EmeraldExInSwords == true) {
            // console.log('EmeraldEx Swords + Sidescape: condition true');
            return true;
          } else {
            // console.log('EmeraldEx Swords + Sidescape: condition false');
            return false;
          }
        },
        durationSeconds: 21,
        alarmText: {en: 'Side, KnockBack, Out then In'},
      },
      {
        id: 'EmeraldEx Swords + Expire', // This means that the boss has only bottom half.
        netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55D1', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55D1', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55D1', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55D1', capture: false }),
        condition: function(data, matches, output) {
          data.EmeraldExInSwords = data.EmeraldExInSwords || false;
          if (data.EmeraldExInSwords == true) {
            // console.log('EmeraldEx Swords + Expire: condition true');
            return true;
          } else {
            // console.log('EmeraldEx Swords + Expire: condition false');
            return false;
          }
        },
        durationSeconds: 21,
        alarmText: {en: 'Out, Puddle, In, then Out'},
      },
    ]
  },
  {
    // E9S
    zoneId: ZoneId.EdensPromiseUmbraSavage,
    // Our markers are:
    //    1
    //  A   B
    //4       2
    //  D   C
    //    3
    timeline: `
    `,
    timelineTriggers: [
      /*{
        id: 'E9S Summon Adds',
        regex: /Summon/,
        durationSeconds: 15,
        alertText: {
          en: '0: Front\n1: Dodge the one that isn\'t being cleaved\n2: Back',
        }
      } */
    ],
    triggers: [
      {
        id: 'E9S Anti-Air Phaser Unlimited 2',
        netRegex: NetRegexes.startsUsing({ id: '561[23]', source: 'Cloud Of Darkness', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ id: '561[23]', source: 'Wolke Der Dunkelheit', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ id: '561[23]', source: 'Nuage De Ténèbres', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ id: '561[23]', source: '暗闇の雲', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ id: '561[23]', source: '暗黑之云', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ id: '561[23]', source: '어둠의 구름', capture: false }),
        durationSeconds: 15,
        alertText: {en: 'Anti Air'}
      },
      {
        id: 'E9S Wide-Angle Phaser Unlimited 2',
        netRegex: NetRegexes.startsUsing({ id: '560[DE]', source: 'Cloud Of Darkness', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ id: '560[DE]', source: 'Wolke Der Dunkelheit', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ id: '560[DE]', source: 'Nuage De Ténèbres', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ id: '560[DE]', source: '暗闇の雲', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ id: '560[DE]', source: '暗黑之云', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ id: '560[DE]', source: '어둠의 구름', capture: false }),
        durationSeconds: 15,
        alertText: {en: 'Wide Angle'}
      }
    ]
  },
  {
    // E10S
    zoneId: ZoneId.EdensPromiseLitanySavage,
    timeline: `
        432.0 "Orbs with Knockback"
        532.0 "Prepare for Pitch Bog 2"
        623.0 "Orbs with Knockback"
    `,
    timelineTriggers: [
      {
        id: 'E10S Orbs with Knockback',
        regex: /Orbs with Knockback/,
        alertText: {
          en: 'Orbs with Knockback',
        }
      },
      {
        id: 'E10S Prepare for Pitch Bog 2',
        regex: /Prepare for Pitch Bog 2/,
        alertText: {
          en: 'Prepare for Pitch Bog 2',
        }
      }
    ],
    triggers: [
      {
        id: 'E10S Throne Of Shadow',
        netRegex: NetRegexes.startsUsing({ source: 'Shadowkeeper', id: '5717', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Schattenkönig', id: '5717', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Roi De L\'Ombre', id: '5717', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: '影の王', id: '5717', capture: false }),
        delaySeconds: 0,
        response: Responses.getOut('alert'),
      },
      {
        id: 'E10S Giga Slash Shadow Drop Right',
        netRegex: NetRegexes.startsUsing({ source: 'Shadowkeeper', id: '5B2D', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Schattenkönig', id: '5B2D', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Roi De L\'Ombre', id: '5B2D', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: '影の王', id: '5B2D', capture: false }),
        durationSeconds: (data) => data.gigaSlashCleaveDebuffDuration,
        alertText: (data, _, output) => {
          let ret = '';
          switch (data.gigaSlashCleaveDebuffId) {
          case '973':
            ret = 'Left';
            break;
          case '974':
            ret = 'Right';
            break;
          case '975':
            ret = 'North';
            break;
          case '976':
            ret = 'South';
            break;
          }

          delete data.gigaSlashCleaveDebuffId;
          delete data.gigaSlashCleaveDebuffDuration;
          if (!ret)
            return;

          return output.leftCleave() + ", " + output.dropShadow({ dir: ret });
        },
        infoText: (data, _, output) => output.leftCleave(),
        outputStrings: {
          dropShadow: {
            en: 'Drop Shadow ${dir}',
            de: 'Schatten im ${dir} ablegen',
            fr: 'Déposez l\'ombre du côté ${dir}',
            ja: '${dir}へ、影を捨てる',
            cn: '${dir}放影子',
            ko: '${dir}에 그림자 놓기',
          },
          leftCleave: {
            en: 'Left Cleave',
            de: 'Linker Cleave',
            fr: 'Cleave gauche',
            ja: '左半面へ攻撃',
            cn: '左侧顺劈',
            ko: '왼쪽 공격',
          },
        },
      },
      {
        id: 'E10S Giga Slash Shadow Drop Left',
        netRegex: NetRegexes.startsUsing({ source: 'Shadowkeeper', id: '5B2C', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Schattenkönig', id: '5B2C', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Roi De L\'Ombre', id: '5B2C', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: '影の王', id: '5B2C', capture: false }),
        durationSeconds: (data) => data.gigaSlashCleaveDebuffDuration,
        alertText: (data, _, output) => {
          let ret = '';
          switch (data.gigaSlashCleaveDebuffId) {
          case '973':
            ret = 'Right';
            break;
          case '974':
            ret = 'Left';
            break;
          case '975':
            ret = 'South';
            break;
          case '976':
            ret = 'North';
            break;
          }

          delete data.gigaSlashCleaveDebuffId;
          delete data.gigaSlashCleaveDebuffDuration;
          if (!ret)
            return;

          return output.rightCleave() + ", " + output.dropShadow({ dir: ret });
        },
        infoText: (data, _, output) => output.rightCleave(),
        outputStrings: {
          dropShadow: {
            en: 'Drop Shadow ${dir}',
            de: 'Schatten im ${dir} ablegen',
            fr: 'Déposez l\'ombre du côté ${dir}',
            ja: '${dir}へ、影を捨てる',
            cn: '${dir}放影子',
            ko: '${dir}에 그림자 놓기',
          },
          rightCleave: {
            en: 'Right Cleave',
            de: 'Rechter Cleave',
            fr: 'Cleave droit',
            ja: '右半面へ攻撃',
            cn: '右侧顺劈',
            ko: '오른쪽 공격',
          },
        },
      },
    ]
  },
  {
    // E11S
    zoneId: ZoneId.EdensPromiseAnamorphosisSavage,
    timeline: `
    `,
    timelineTriggers: [
    ],
    triggers: [
      {
        id: 'E11S Elemental Break Fire',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '5663', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Fusioniert(?:e|er|es|en) Ascian', id: '5663', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Sabreur De Destins', id: '5663', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'フェイトブレイカー', id: '5663', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '绝命战士', id: '5663', capture: false }),
        alertText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Clock -> Pairs',
            de: 'Himmelsrichtung -> Auf Partner sammeln',
            fr: 'Position -> Packez-vous avec votre partenaire',
            ja: '8方向散開 -> ペア頭割り',
            cn: '八方 -> 分摊',
            ko: '8산개 -> 파트너 쉐어뎀',
          },
        },
      },
      {
        id: 'E11S Elemental Break Lightning',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '5666', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Fusioniert(?:e|er|es|en) Ascian', id: '5666', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Sabreur De Destins', id: '5666', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'フェイトブレイカー', id: '5666', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '绝命战士', id: '5666', capture: false }),
        alertText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Clock -> Spread',
            de: 'Himmelsrichtung -> Verteilen',
            fr: 'Position -> Dispersez-vous',
            ja: '8方向散開 -> 散開',
            cn: '八方 -> 分散',
            ko: '8산개 -> 산개',
          },
        },
      },
      {
        id: 'E11S Elemental Break Holy',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '5668', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Fusioniert(?:e|er|es|en) Ascian', id: '5668', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Sabreur De Destins', id: '5668', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'フェイトブレイカー', id: '5668', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '绝命战士', id: '5668', capture: false }),
        alertText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Clock -> Holy Groups',
            de: 'Himmelsrichtung -> Sanctus Gruppen',
            fr: 'Position -> Groupes',
            ja: '8方向散開 -> 光3方向頭割り',
            cn: '八方 -> 光三向分摊',
            ko: '8산개 -> 홀리 그룹 쉐어',
          },
        },
      },
      {
        id: 'E11S Sundered Sky Start Move 1',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '567[7-8]', capture: false }),
        delaySeconds: 28,
        run: (data) => {
          // console.log("E11S Sundered Sky Start Move 1");
        },
        alarmText: {en: 'Move'},
      },
      {
        id: 'E11S Sundered Sky Start Move 2',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '567[7-8]', capture: false }),
        delaySeconds: 33,
        run: (data) => {
          // console.log("E11S Sundered Sky Start Move 2");
        },
        alarmText: {en: 'Move + Arms Length'},
      },
      {
        id: 'E11S Cycle of Faith Fire',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '568A', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Fusioniert(?:e|er|es|en) Ascian', id: '568A', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Sabreur De Destins', id: '568A', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'フェイトブレイカー', id: '568A', capture: false }),
        durationSeconds: 12,
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Fire\nClock -> Cross Pairs ->\nWait Knockback -> Stack at back'
          },
        },
      },
      {
        id: 'E11S Cycle of Faith Lightning',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '5692', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Fusioniert(?:e|er|es|en) Ascian', id: '5692', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Sabreur De Destins', id: '5692', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'フェイトブレイカー', id: '5692', capture: false }),
        durationSeconds: 12,
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Lightning\nClock -> Spread ->\nSides Out -> Lightning'
          },
        },
      },
      {
        id: 'E11S Cycle of Faith Holy',
        netRegex: NetRegexes.startsUsing({ source: 'Fatebreaker', id: '569A', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Fusioniert(?:e|er|es|en) Ascian', id: '569A', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Sabreur De Destins', id: '569A', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'フェイトブレイカー', id: '569A', capture: false }),
        durationSeconds: 12,
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Holy\nClock -> Holy Groups ->\nSides -> Rotate'
          },
        },
      },
    ]
  },
  {
    // Diamond Weapon EX
    zoneId: ZoneId.TheCloudDeckExtreme,
    timeline: `
        433.5 "Return to Original Platform"
        517.0 "Shrapnel Next"
    `,
    timelineTriggers: [
      {
        id: 'DiamondEx Return to Original Platform',
        regex: /Return to Original Platform/,
        alertText: {
          en: 'Return to Original Platform',
        }
      },
      {
        id: 'DiamondEx Shrapnel Next',
        regex: /Shrapnel Next/,
        alertText: {
          en: 'Shrapnel Next',
        }
      },
    ],
    triggers: [
      {
        id: 'DiamondEx P2 North/South Jump',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5FB5', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5FB5', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5FB5', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5FB5', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'One Near, Two Away',
            de: 'Hin oder weg ausweichen',
            fr: 'Rapprochez-vous/Éloignez-vous',
          },
        },
      },
      {
        id: 'DiamondEx P2 Zig-Zag Jump',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5FB2', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5FB2', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5FB2', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5FB2', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'Dodge Side',
            de: 'Orb vom Osten/Westen ausweichen',
            fr: 'Esquivez Est/Ouest',
          },
        },
      },
      {
        id: 'DiamondEx Adamant Purge West Diamond Rain',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5F9B', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5F9B', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5F9B', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5F9B', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'go Red -> Diamond Rain Next',
            de: 'Geh nach Osten -> AoE',
            fr: 'Allez à l\'est -> AoE',
          },
        },
      },
      {
        id: 'DiamondEx Adamant Purge East Diamond Rain',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5F9A', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5F9A', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5F9A', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5F9A', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'go Blue -> Diamond Rain Next',
            de: 'Geh nach Westen -> AoE',
            fr: 'Allez à l\'ouest -> AoE',
          },
        },
      },
      {
        id: 'DiamondEx Adamant Purge West Diamond Flash',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5FA5', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5FA5', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5FA5', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5FA5', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'go Red -> stack',
            de: 'Geh nach Osten -> Sammeln',
            fr: 'Allez à l\'est -> Packez-vous',
          },
        },
      },
      {
        id: 'DiamondEx Adamant Purge East Diamond Flash',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5FA4', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5FA4', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5FA4', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5FA4', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'go Blue -> stack',
            de: 'Geh nach Westen -> Sammeln',
            fr: 'Allez à l\'ouest -> Packez-vous',
          },
        },
      },
      {
        id: 'DiamondEx Adamant Purge West Homing Laser',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5FA3', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5FA3', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5FA3', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5FA3', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'go Red -> spread',
            de: 'Geh nach Osten -> Verteilen',
            fr: 'Allez à l\'est -> Dispersez-vous',
          },
        },
      },
      {
        id: 'DiamondEx Adamant Purge East Homing Laser',
        netRegex: NetRegexes.startsUsing({ source: 'The Diamond Weapon', id: '5FA2', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Diamant-Waffe', id: '5FA2', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Arme Diamant', id: '5FA2', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ダイヤウェポン', id: '5FA2', capture: false }),
        infoText: (data, _, output) => output.text(),
        outputStrings: {
          text: {
            en: 'go Blue -> spread',
            de: 'Geh nach Westen -> Verteilen',
            fr: 'Allez à l\'ouest -> Dispersez-vous',
          },
        },
      },
    ]
  },
  {
    // E12S
    zoneId: ZoneId.EdensPromiseEternitySavage,
    timeline: `
      287.0 "Boss Must Face South"
      1181.4 "Single Apoc. Move to Side"
      1185.7 "Single Apoc. Move to Middle"
      1189.1 "Single Apoc. Spread to Safe Side"
      1195.1 "Single Apoc. Back to Middle"
      1295.2 "Double Apoc. Move to Middle"
      1297.2 "Double Apoc. Look for next hit"
      1301.2 "Double Apoc. Move to Edge"
      1382.1 "Advanced Relativity. Stack for AoE"
      
      1023.0 "Ferrus Reprisal" #Shockwave Pulsar
      1080.5 "Flipp Reprisal"  #Shockwave Pulsar
      1101.7 "Ferrus Reprisal" #Basic Relativity
      1147.9 "Flipp Reprisal"  #Shockwave Pulsar
      1206.0 "Ferrus Reprisal" #Shockwave Pulsar after Singular Apocalypse
      1224.2 "Flipp Reprisal"  #Intermediate Relativity
      1265.4 "Ferrus Reprisal" #Shockwave Pulsar
      1330.5 "Ferrus Reprisal" #Shockwave Pulsar after Dual Apocalypse
      1349.7 "Flipp Reprisal"  #Advanced Relativity
      1395.2 "Ferrus Reprisal" #Shockwave Pulsar
      1439.1 "Flipp Reprisal" #Shockwave Pulsar after Triple Apocalypse
      1470.9 "Ferrus Reprisal" #Terminal Relativity
      1499.5 "Flipp Reprisal" #Shockwave Pulsar 2
    `,
    timelineTriggers: [
      {
        id: 'E12S Ensure Boss Faces South',
        regex: /Boss Must Face South/,
        alarmText: {
          en: 'Boss Must Face South',
        }
      },
      {
        id: 'E12S Blade Of Flame 1',
        regex: /Blade Of Flame 1/,
        alarmText: {
          en: '2 Next',
        }
      },
      {
        id: 'E12S Blade Of Flame 2',
        regex: /Blade Of Flame 2/,
        alarmText: {
          en: '3 Next',
        }
      },
      {
        id: 'E12S Blade Of Flame 3',
        regex: /Blade Of Flame 3/,
        alarmText: {
          en: '4 Next',
        }
      },
      {
        id: 'E12S Blade Of Flame 4',
        regex: /Blade Of Flame 4/,
        alarmText: {
          en: 'Knockback',
        }
      },
      {
        id: 'E12S P2 Single Apoc. Spread to Safe Side',
        regex: /Single Apoc. Spread to Safe Side/,
        alarmText: {
          en: 'Spread to Safe Side',
        }
      },
      {
        id: 'E12S P2 Single Apoc. Move to Middle',
        regex: /Single Apoc. Move to Middle/,
        alarmText: {
          en: 'Stack Middle.',
        }
      },
      {
        id: 'E12S P2 Double Apoc. Move to Middle',
        regex: /Double Apoc. Move to Middle/,
        alarmText: {
          en: 'Move to Middle. Tank Cooldown',
        }
      },
      {
        id: 'E12S P2 Double Apoc. Look for next hit',
        regex: /Double Apoc. Look for next hit/,
        alarmText: {
          en: 'Look for next hit.',
        }
      },
      {
        id: 'E12S P2 Double Apoc. Move to Edge',
        regex: /Double Apoc. Move to Edge/,
        alarmText: {
          en: 'Move to Edge.',
        }
      },
      {
        id: 'E12S P2 Advanced Relativity. Stack for AoE',
        regex: /Advanced Relativity. Stack for AoE/,
        alarmText: {
          en: 'Stack for AoE',
        }
      },
    ],
    triggers: [
      {
        id: 'E12S Promise Weight Cleanup',
        // Overwriting this trigger to also figure out the 3rd set of titan bombs
        netRegex: NetRegexes.startsUsing({ source: 'Eden\'s Promise', id: '58A5', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Edens Verheißung', id: '58A5', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Promesse D\'Éden', id: '58A5', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'プロミス・オブ・エデン', id: '58A5', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '伊甸之约', id: '58A5', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '에덴의 약속', id: '58A5', capture: false }),
        suppressSeconds: 2,
        run: (data) => {
          // console.log("E12S Promise Weight Cleanup triggered.");
          
          delete data.weightTargets;

          if(data.seenFirstBombs) {
              data.seenSecondBombs = true;
              // console.log("E12S Promise Weight Cleanup. Setting seenSecondBombs = true");
          }

          data.seenFirstBombs = true;
        },
      },
      {
        id: 'E12S Promise Junction Titan Bombs',
        netRegex: NetRegexes.headMarker({}),
        condition: (data) => data.isDoorBoss,
        response: (data, matches, output) => {
          // Figure out headmarker Id
          const firstHeadmarker = parseInt('00DA', 16);
          
          if (typeof data.decOffset === 'undefined')
            data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
         
          const id = (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');

          // Good timings. 8:18, 9:19, before 9:48, 10:05 https://www.youtube.com/watch?v=xoRH_7wqHl8&ab_channel=EavanWells
          // Blue - 00BB
          // Yellow - 00B9
          // Orange - 00BA

          // Handle pairs for blue for 2nd set
          if (id === '00BB') {
            data.weightTargets = data.weightTargets || [];
            data.weightTargets.push(matches.target);

            // Handle double blue titan on 2nd iterations.
            if (data.seenFirstBombs && !data.seenSecondBombs && data.weightTargets.length === 2) {
              if (data.weightTargets.includes(data.me)) {
                const partner = data.weightTargets[data.weightTargets[0] === data.me ? 1 : 0];
                return {
                  alarmText: 'D or B with ' + partner,
                };
              }
            }
          }

          // No callouts if the headmarker is not on the player
          // console.log("matches.target: " + matches.target);
          // console.log("data.role: " + data.role);
          // console.log("data.me: " + data.me);
          if (matches.target !== data.me)
            return;
                
          let role = data.role;

          // 1st Set of bombs
          if(!data.seenFirstBombs) {
            // console.log("Junction Titan Bombs - 1st Set");

            if (role === 'tank') {
              if (id === '00B9') { // Yellow
                //console.log("  Tank. Yellow. A");
                return {alarmText: 'Yellow. A'};
              } else if (id === '00BA') { // Orange
                //console.log("  Tank. Orange. 4");
                return {alarmText: 'Orange. 4'};
              } else if (id === '00BB') { // Blue - How did you get this? South.
                //console.log("  Tank. Blue. C");
                return {alarmText: 'Blue. C'};
              }
            }
            else if (role === 'healer') {
              if (id === '00B9') { // Yellow
                //console.log("  Healer. Yellow. D");
                return {alarmText: 'Yellow. D'};
              } else if (id === '00BA') { // Orange
                //console.log("  Healer. Orange. 4");
                return {alarmText: 'Orange. 4'};
              } else if (id === '00BB') { // Blue - How did you get this? South.
                //console.log("  Healer. Blue. C");
                return {alarmText: 'Blue. C'};
              }
            }
            else { // dps
              //console.log("  Warning: not implemented");
            }
          }
          // 2nd set of bombs
          else if (!data.seenSecondBombs) {
            //console.log("Junction Titan Bombs - 2nd Set");

            // Tank/headers are the same
            if (role === 'tank' || role === 'healer') {
              if (id === '00BA') { // Orange
                //console.log("  Tank/Healer. Orange. A");
                return {alarmText: 'Orange. A'};
              }
            }
            // DPS
            else {
              if (id === '00BA') { // Orange
                //console.log("  DPS. Orange. C");
                return {alarmText: 'Orange. C'};
              }
            }
          }
          // 3rd set of bombs
          else {
            //console.log("Junction Titan Bombs - 3rd Set");

            // Tank/headers are the same
            if (role === 'tank' || role === 'healer') {
              if (id === '00B9') { // Yellow
                //console.log("  Tank/Healer. Yellow. 4");
                return {alarmText: 'Yellow. 4'};
              } else if (id === '00BA') { // Orange
                //console.log("  Tank/Healer. Orange. A");
                return {alarmText: 'Orange. A'};
              } else if (id === '00BB') { // Blue
                //console.log("  Tank/Healer. Blue. 3");
                return {alarmText: 'Blue. 3'};
              }
            }
            // DPS
            else {
              //console.log("  Warning: not implemented");
            }
          }
        }
      },
      {
        id: 'E12S Promise Palm Of Temperance SE',
        netRegex: NetRegexes.startsUsing({ source: 'Guardian Of Eden', id: '58B4', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Wächter Von Eden', id: '58B4', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Gardien D\'Éden', id: '58B4', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ガーディアン・オブ・エデン', id: '58B4', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '伊甸守卫', id: '58B4', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '에덴의 수호자', id: '58B4', capture: false }),
        durationSeconds: 10,
        infoText: (_data, _matches, output) => output.knockback(),
        outputStrings: {
          knockback: {
            en: 'Knockback. Go South East. Left',
            de: 'SO Rückstoß',
            fr: 'SE Poussée',
            ja: '東南ノックバック',
            cn: '右下（东南）击退',
            ko: '남동쪽(5시)에서 넉백',
          },
        },
      },
      {
        id: 'E12S Promise Palm Of Temperance SW',
        netRegex: NetRegexes.startsUsing({ source: 'Guardian Of Eden', id: '58B5', capture: false }),
        netRegexDe: NetRegexes.startsUsing({ source: 'Wächter Von Eden', id: '58B5', capture: false }),
        netRegexFr: NetRegexes.startsUsing({ source: 'Gardien D\'Éden', id: '58B5', capture: false }),
        netRegexJa: NetRegexes.startsUsing({ source: 'ガーディアン・オブ・エデン', id: '58B5', capture: false }),
        netRegexCn: NetRegexes.startsUsing({ source: '伊甸守卫', id: '58B5', capture: false }),
        netRegexKo: NetRegexes.startsUsing({ source: '에덴의 수호자', id: '58B5', capture: false }),
        durationSeconds: 10,
        infoText: (_data, _matches, output) => output.knockback(),
        outputStrings: {
          knockback: {
            en: 'Knockback. Go South West. Right',
            de: 'SW Rückstoß',
            fr: 'SO Poussée',
            ja: '西南ノックバック',
            cn: '左下（西南）击退',
            ko: '남서쪽(7시)에서 넉백',
          },
        },
      },
      {
        id: 'E12S Big Lions',
        netRegex: NetRegexes.ability({ source: 'Beastly Sculpture', id: '58B9', capture: false }),
        suppressSeconds: 2,
        delaySeconds: 1,
        response: (data, matches, output) => {
          //console.log("E12S Big Lions");
                    
          if(data.seenFirstLionBreath && !data.seenSecondLionBreath) {
            // 2nd Lions
            data.seenSecondLionBreath = true;
            //console.log("E12S Big Lions: 2nd lions");
            return {alarmText: 'Release. Big Lion Swap.'};
          } else if(data.seenSecondLionBreath) {
            //console.log("E12S Big Lions: 3rd lions");
          } else {
            // 1st Lions
            data.seenFirstLionBreath = true;
            //console.log("E12S Big Lions: 1st lions");
            return {alarmText: 'Arms Length. Big Lion Swap. Make Sure To Wait.'};
          }
        },
      },
      {
        id: 'E12S Relativity Debuffs',
        // Players originally get `Spell-in-Waiting: Return` or `Spell-in-Waiting: Return IV`.
        // When Spell-in-Waiting Return IV wears off, players get Return IV effect.
        // When Return IV effect wears off, players get Return effect.
        // When Return effect wears off, players go back to previous locations
        //
        // Return = 994
        // Return IV = 995
        netRegex: NetRegexes.gainsEffect({ effectId: '99[45]' }),
        condition: Conditions.targetIsYou(),
        response: (data, _matches, output) => {
          // cactbot-builtin-response
          output.responseOutputStrings = Object.assign({
            moveAway: {
              en: 'Move!',
              de: 'Bewegen!',
              fr: 'Bougez !',
              ja: '避けて！',
              cn: '快移动！',
              ko: '이동하기!',
            },
          }, {        
            flare: {
              en: 'Flare - Edge',
            },
            stack: {
              en: 'Stack',
            },
            shadoweye: {
              en: 'Gaze - Middle Ring',
            },
            eruption: {
              en: 'Eruption - Stand on your marker',
            },
            blizzard: {
              en: 'Ice - Stack in middle',
            },
            aero: {
              en: 'Aero - Edge',
            },
          });         
     
          if (data.phase !== 'intermediate')
            return { infoText: output.moveAway() };
     
          const key = data.intermediateDebuffs && data.intermediateDebuffs.shift();
          if (!key)
            return { infoText: output.moveAway() };
          return { alertText: output[key]() };
        },
      },
    ]
  }
);

Options.Triggers.push({
    zoneId: ZoneId.TheMinstrelsBalladZodiarksFall,
    timeline: `
      55.0 "2x Sigil"
      78.0 "Animals+Boss Charge"
      112.0 "Sigil+Rotating Snakes"
      152.0 "Boss Fists+Snakes"
      
      372.0 "3x Sigils Rays"
      385.0 "Animals+Line"
      430.0 "Sigils+Boss Charge"
      455.0 "Snakes+Animals+Line"
      501.0 "3x Sigils, then boss fists"
      
      583.0 "Sigil+Rotating Snakes+Line"
      634.0 "3x Sigil+Sigils Rays"
      654.0 "Sigil+Animals+Line"
      710.0 "3x Sigils, then boss fists"
      746.0 "Sigil+Rotating Snake+Animals+Line"
    `,
    timelineReplace: [
      {
        'locale': 'en',
        'replaceText': {
          'Kokytos': 'Kokytos-1hp',
          'Paradeigma': 'Paradeigma-Summon Animals',
          'Keraunos Eidolon': 'Keraunos Eidolon',
          'Ania': 'Ania-Tank Buster',
          'Algedon' : 'Algedon-Boss Charge',
          'Adikia' : 'Adikia-Boss Fists',
          'Phobos' : 'Phobos-AoE',
          'Astral Flow' : 'Astral Flow-Rotate',
          'Astral Eclipse' : 'Astral Eclipse-Stars'
        },
      },
    ],
    timelineTriggers: [
    ],
    triggers: [
      {
          id: 'ZodiarkEx Algedon Boss Charge',
          type: 'StartsUsing',
          netRegex: NetRegexes.startsUsing({ id: '67E[CD]', source: 'Zodiark', capture: false }),
          alarmText: {
            en: 'Boss Charge'
          },
      },
      {
          id: 'ZodiarkEx Adikia Boss Fists',
          type: 'StartsUsing',
          netRegex: NetRegexes.startsUsing({ id: '67F1', source: 'Zodiark', capture: false }),
          alarmText: {
            en: 'Boss Fists'
          },
      },
    ],
});
