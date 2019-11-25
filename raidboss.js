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
};


// An array of user-defined triggers, in the format defined in the readme:
// https://github.com/quisquous/cactbot/tree/master/ui/raidboss/data/triggers
Options.Triggers = [

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
        regex: /:(\y{Name}):1D6F:Reprisal:/,
        condition: function(data) {
          return data.role == 'tank';
        },
        infoText: function(data, matches) {
          return {
            en: 'Reprisal: ' + data.ShortName(matches[1]),
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

	  537.0 "Hidden - Enable Left Right Mode"
	  542.0 "Hidden - Enable Left Right Mode"
	  545.0 "Hidden - Enable Left Right Mode"

	  567.0 "Hidden - Disable Left Right Mode"
	  578.0 "Hidden - Disable Left Right Mode"
	  588.0 "Hidden - Disable Left Right Mode"
	  
      317.0 "Buster Soon!"
    `,
	timelineTriggers: [
      {
        id: 'E3S Buster Soon',
        regex: /Buster Soon!/,
        alertText: {
          en: 'Buster Soon',
        },
		id: 'E3S Hidden - Disable Left Right Mode',
        regex: /Hidden - Disable Left Right Mode/,
        run: function(data) {
          data.temporaryCurrentLeftRightMode = false;
        },
		id: 'E3S Hidden - Enable Left Right Mode',
        regex: /Hidden - Enable Left Right Mode/,
        run: function(data) {
          data.temporaryCurrentLeftRightMode = true;
        },
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
  }
];

// Per trigger options.  By default, each trigger uses the global options
// of TextAlertsEnabled, SoundAlertsEnabled, and SpokenAlertsEnabled.
// These global options are set up top in this file.
//
// If a per trigger entry is present (regardless if true/false), it will
// override whatever the global option is set to.
//
// SoundOverride (if present) behaves like 'sound' on an individual trigger, in
// that it will take the place of the info/alert/alarm noise if no sound has
// been specified.  SoundAlert (or SoundAlertsEnabled) must still be true for
// that override to be played.
//
// Here's some example per trigger options that modify the test triggers
// in Summerford Farms:
// https://github.com/quisquous/cactbot/blob/master/ui/raidboss/data/triggers/test.js

Options.PerTriggerOptions = {
  // Just like Options.DisabledTriggers, this is the trigger id to apply to.
  // This overrides the settings for the "/laugh" trigger from the test
  // triggers.  You can try this out by teleporting to Summerford Farms
  // and /laugh at a striking dummy.  It will use these settings and moo.
//  'Test Laugh': {
//    // Play the text to speech.
//    SpeechAlert: false,
//    // Play the sound alert.
//    SoundAlert: true,
//    // Show the info/alert/alarm text on screen.
//    TextAlert: false,
//    // Play this sound (replacing any sound from the original).
//    SoundOverride: '../../resources/sounds/WeakAuras/CowMooing.ogg',
//    // Play the sound (if any) at this volume.
//    VolumeOverride: 0.3,
// },
  // This makes /poke-ing a striking dummy in Summerford Farms only
  // use text to speech with no visual text indicator or other sound.
  'Test Poke': {
    SpeechAlert: true,
    SoundAlert: false,
    TextAlert: false,
    // Override the tts output as well.
    TTSText: function(data) {
      return 'Custom Poke (' + data.pokes + ')';
    },
  },
  // This makes /clap-ing a striking dummy override the default
  // behavior to use the group TTS
  'Test Clap': {
    GroupSpeechAlert: true,
    SpeechAlert: true,
    SoundAlert: false,
    TextAlert: false,
    // Override the tts output as well.
    GroupTTSText: function(data) {
      return 'Custom CLAP';
    },
  },
};

