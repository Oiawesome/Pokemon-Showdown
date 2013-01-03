/* to reload chat commands:

>> for (var i in require.cache) delete require.cache[i];parseCommand = require('./chat-commands.js').parseCommand;''

*/

var crypto = require('crypto');

/**
 * `parseCommand`. This is the function most of you are interested in,
 * apparently.
 *
 * `message` is exactly what the user typed in.
 * If the user typed in a command, `cmd` and `target` are the command (with "/"
 * omitted) and command target. Otherwise, they're both the empty string.
 *
 * For instance, say a user types in "/foo":
 * cmd === "/foo", target === "", message === "/foo bar baz"
 *
 * Or, say a user types in "/foo bar baz":
 * cmd === "foo", target === "bar baz", message === "/foo bar baz"
 *
 * Or, say a user types in "!foo bar baz":
 * cmd === "!foo", target === "bar baz", message === "!foo bar baz"
 *
 * Or, say a user types in "foo bar baz":
 * cmd === "", target === "", message === "foo bar baz"
 *
 * `user` and `socket` are the user and socket that sent the message,
 * and `room` is the room that sent the message.
 *
 * Deal with the message however you wish:
 *   return; will output the message normally: "user: message"
 *   return false; will supress the message output.
 *   returning a string will replace the message with that string,
 *     then output it normally.
 *
 */

var modlog = modlog || fs.createWriteStream('logs/modlog.txt', {flags:'a+'});

function parseCommandLocal(user, cmd, target, room, socket, message) {
	if (!room) return;
	cmd = cmd.toLowerCase();
	switch (cmd) {
	case 'cmd':
		var spaceIndex = target.indexOf(' ');
		var cmd = target;
		if (spaceIndex > 0) {
			cmd = target.substr(0, spaceIndex);
			target = target.substr(spaceIndex+1);
		} else {
			target = '';
		}
		if (cmd === 'userdetails') {
			var targetUser = Users.get(target);
			if (!targetUser || !room) return false;
			var roomList = {};
			for (var i in targetUser.roomCount) {
				if (i==='lobby') continue;
				var targetRoom = Rooms.get(i);
				if (!targetRoom) continue;
				var roomData = {};
				if (targetRoom.battle) {
					var battle = targetRoom.battle;
					roomData.p1 = battle.p1?' '+battle.p1:'';
					roomData.p2 = battle.p2?' '+battle.p2:'';
				}
				roomList[i] = roomData;
			}
			var userdetails = {
				command: 'userdetails',
				userid: targetUser.userid,
				avatar: targetUser.avatar,
				rooms: roomList,
				room: room.id
			};
			if (user.can('ip', targetUser)) {
				userdetails.ip = targetUser.ip;
			}
			emit(socket, 'command', userdetails);
		} else if (cmd === 'roomlist') {
			if (!room || !room.getRoomList) return false;
			emit(socket, 'command', {
				command: 'roomlist',
				rooms: room.getRoomList(true),
				room: room.id
			});
		}
		return false;
		break;
		
/*##################################################################################################################################################################################################################
DUSKMOD DATA
	- pokemon icons: http://sprites.pokecheck.org/icon/[DEX NUMBER].png
	- order of data
		- Type (if changed)
		- Stats (if changed)
		- Ability (NOT abilities) (Should always be listed)
		- Movepool (if movepool was changed)
		- Other info
##################################################################################################################################################################################################################*/
	case 'dm':
	case '!dm':
		target = target.toLowerCase();
		var matched = false;
		//ABILITIES####################################################################################
		//MOVES########################################################################################
		if (target === 'selfdestruct' || target === 'self destruct') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Selfdestruct</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Normal.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Physical.png"></center></div>' +
                        'Always results in a critical hit. Hits adjacent Pokemon. The user faints.<br />' +
                        'Power: 125&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'explosion') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Explosion</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Normal.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Physical.png"></center></div>' +
                        'Always results in a critical hit. Hits adjacent Pokemon. The user faints.<br />' +
                        'Power: 200&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'frostbreath' || target === 'frost breath') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Frost Breath</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Ice.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Special.png"></center></div>' +
                        'Always results in a critical hit.<br />' +
                        'Power: 50&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'stormthrow' || target === 'storm throw') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Storm Throw</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Fighting.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Physical.png"></center></div>' +
                        'Always results in a critical hit.<br />' +
                        'Power: 50&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'twineedle') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Twineedle</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Bug.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Physical.png"></center></div>' +
                        'Always results in a critical hit. Hits 2 times in one turn.<br />' +
                        'Power: 20&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'drillpeck' || target === 'drill peck') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Drill Peck</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Flying.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Physical.png"></center></div>' +
                        'Always results in a critical hit.<br />' +
                        'Power: 40&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'drillrun' || target === 'drill run') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Drill Run</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Ground.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Physical.png"></center></div>' +
                        'Always results in a critical hit.<br />' +
                        'Power: 45&nbsp;&nbsp;&nbsp;Accuracy: 100<br />' +
                        '<div style="clear:both;"></div>');
		}
		//FOCUS MISS######################################################################################
		if (target === 'focusmiss' || target === 'focus miss') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:40px;width:120px"><center><b>Focus Miss</b><br />' +
                        '<img src="http://play.pokemonshowdown.com/sprites/types/Fighting.png"> <img src="http://play.pokemonshowdown.com/sprites/categories/Special.png"></center></div>' +
                        'Always misses. If the user has an accuracy boost, has an accuracy-improving ability, is holding an accuracy-improving item, or used an accuracy-boosting move, the user faints.<br />' +
                        'Power: lol&nbsp;&nbsp;&nbsp;Accuracy: -25<br />' +
                        '<div style="clear:both;"></div>');
		}
		//POKEMON######################################################################################
		if (target === 'venusaur') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:50px;width:80px"><center><b>Venusaur</b><br />' +
		        '<img src="http://sprites.pokecheck.org/icon/3.png"></center></div>' +
		        'Stats: 85/85/88/100/100/82<br />' +
		        'Abilities: Overgrow/Chlorophyll/Leaf Guard<br />' +
				'<div style="clear:both;"></div>');
		}
		if (target === 'charizard') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:50px;width:80px"><center><b>Charizard</b><br />' +
		        '<img src="http://sprites.pokecheck.org/icon/6.png"></center></div>' +
				'Type: Fire/Dragon<br />' +
				'Stats: 80/102/64/109/85/100<br />' +
				'Abilities: Blaze/Levitate/Solar Power<br />' +
				'Movepool: +Extremespeed, +Draco Meteor, -Earthquake<br />' +
				'<div style="clear:both;"></div>');
		}
		if (target === 'blastoise') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:50px;width:80px"><center><b>Blastoise</b><br />' +
		        '<img src="http://sprites.pokecheck.org/icon/9.png"></center></div>' +
				'Stats: 92/74/110/94/110/60<br />' +
				'Abilities: Torrent/Rain Dish/Shell Armor<br />' +
				'Movepool: +Shell Smash<br />' +
				'<div style="clear:both;"></div>');
		}
		if (target === 'butterfree') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:50px;width:80px"><center><b>Butterfree</b><br />' +
		        '<img src="http://sprites.pokecheck.org/icon/12.png"></center></div>' +
				'Stats: 80/45/60/110/90/105<br />' +
				'Abilities: Compoundeyes/Wonder Skin<br />' +
				'Movepool: +Hurricane, +Thunderbolt, +Thunder, +Ice Beam, +Blizzard, +Baton Pass<br />' +
				'<div style="clear:both;"></div>');
		}
		if (target === 'beedrill') {
		    matched = true;
		    showOrBroadcastStart(user, cmd, room, socket, message);
		    showOrBroadcast(user, cmd, room, socket,
		        '<div style="float:left;height:50px;width:80px"><center><b>Beedrill</b><br />' +
		        '<img src="http://sprites.pokecheck.org/icon/15.png"></center></div>' +
				'Stats: 80/125/90/45/60/100<br />' +
				'Abilities: Anger Point/Sniper<br />' +
				'Important Notes: See Twinneedle<br />' +
				'<div style="clear:both;"></div>');
		}
        if (target === 'pidgeot') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Pidgeot</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/18.png"></center></div>' +
                        'Stats: 78/95/80/95/80/102<br />' +
                        'Abilities: Tangled Feet/Hustle <br />' +
                        'Movepool: +Hone Claws, +Thrash<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'raticate') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Raticate</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/20.png"></center></div>' +
                        'Stats: 70/105/80/65/80/120  <br />' +
                        'Abilities: Guts / Rivalry / Sheer Force<br />' +
                        'Movepool: +Hone Claws, +Fake Out, +Ice Fang, +Fire Fang, +ThunderFang, +Crunch, +Low Sweep<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'arbok') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Arbok</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/24.png"></center></div>' +
                        'Type: Poison/Dragon<br />' +
                        'Stats: 75/107/90/40/85/98<br />' +
                        'Abilities: Intimidate/Poison Touch/Shed Skin<br />' +
                        'Movepool:  +Dragon Dance, +Dragon Pulse, +Draco Meteor, +Outrage, +Dragon Rush<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'raichu') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Raichu</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/26.png"></center></div>' +
                        'Stats: 65/90/75/90/80/100<br />' +
                        'Abilities: Speed Boost<br />' +
                        'Movepool: +Weather Ball, +Swords Dance<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'nidoqueen') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Nidoqueen</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/31.png"></center></div>' +
                        'Stats: 95/62/90/102/90/81<br />' +
                        'Abilities: Sheer Force<br />' +
                        'Movepool: +Psychic, +Paleo Wave, +Calm Mind, +Slack Off<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'nidoking') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Nidoking</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/34.png"></center></div>' +
                        'Stats: 81/102/90/62/90/95<br />' +
                        'Abilities: Sheer Force<br />' +
                        'Movepool: +Bulk Up, +Iron Head, +Slack Off, +Icicle Crash, +Dragon Dance</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'clefable') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Clefable</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/36.png"></center></div>' +
                        'Stats: 140/50/70/90/115/60<br />' +
                        'Abilities: Magic Guard / Analytic / Friend Guard<br />' +
                        'Movepool: +Pain Split, +Softboiled (levelup), +Heal Pulse,</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'ninetales') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Ninetales</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/38.png"></center></div>' +
                        'Stats: 80/60/75/85/100/100<br />' +
                        'Abilities: Drought<br />' +
                        'Movepool: +Recover</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'wigglytuff') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Wigglytuff</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/40.png"></center></div>' +
                        'Stats: 140/90/115/50/70/60<br />' +
                        'Abilities: Thick Fat / Marvel Scale / Friend Guard<br />' +
                        'Movepool: Movepool: +Aromatherapy, +Recover, +Pain Split, +Knock Off, +Lovely Kiss, +Torment, +Encore, +Baton Pass, +Whirlwind</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'crobat') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Crobat</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/169.png"></center></div>' +
                        'Abilities: Poison Touch/Infiltrator<br />' +
                        'Important Notes: See Cross Poison</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'vileplume') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Vileplume</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/45.png"></center></div>' +
                        'Stats: 75/91/85/110/90/99<br />' +
                        'Abilities: Regenerator<br />' +
                        'Movepool: +Weather Ball, -Aromatherapy, +Growth, +Lunar Dance, +Leaf Storm</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'bellossom') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Bellossom</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/182.png"></center></div>' +
                        'Stats: 75/80/85/90/120/100<br />' +
                        'Abilities: Leaf Guard/Flower Gift<br />' +
                        'Movepool: +Wish, +Light Screen, +Reflect, +Aromatherapy, +Encore, +Disable</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'parasect') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Parasect</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/47.png"></center></div>' +
                        'Stats: 85/95/125/40/90/80<br />' +
                        'Abilities: Harvest/Toxic Boost<br />' +
                        'Movepool:+Fling, +Synthesis, +Taunt, +Horn Leech, +Wild Charge</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'dugtrio') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Dugtrio</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/51.png"></center></div>' +
                        'Stats: 50/100/50/50/70/120<br />' +
                        'Abilities: Arena Trap<br />' +
                        'Movepool:+Wild Charge</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'persian') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Persian</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/53.png"></center></div>' +
                        'Stats: 75/90/75/85/75/115<br />' +
                        'Abilities: Prankster/Technician<br />' +
                        'Movepool:+Encore, +Trick</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'golduck') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Golduck</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/55.png"></center></div>' +
                        'Stats: 80/100/78/100/80/85<br />' +
                        'Type: Water/Psychic<br />' +
                        'Abilities: Swift Swim/Cloud Nine<br />' +
                        'Movepool: +Cosmic Power, +Reflect, +Thunderbolt, +Shadow Ball, +Shadow Claw</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'primeape') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Primeape</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/57.png"></center></div>' +
                        'Stats: 110/110/70/50/70/105<br />' +
                        'Abilities: Anger Point/Iron Fist/Defiant<br />' +
                        'Movepool:+Hi Jump Kick, +Jump Kick, +Mach Punch, -Meditate</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'arcanine') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Arcanine</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/59.png"></center></div>' +
                        'Stats: 90/115/80/90/80/95<br />' +
                        'Abilities: Intimidate/Magma Armor/Flash Fire<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'poliwrath') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Poliwrath</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/62.png"></center></div>' +
                        'Stats: 90/130/95/70/80/60<br />' +
                        'Abilities: Swift Swim/Guts/Damp<br />' +
                        'Movepool: +Close Combat, +Mach Punch, +Aqua jet, +Circle Throw, -Belly Drum</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'politoed') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Politoed</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/186.png"></center></div>' +
                        'Abilities: Drizzle<br />' +
                        'Movepool: -Belly Drum</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'alakazam') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Alakazam</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/65.png"></center></div>' +
                        'Abilities: Magic Guard<br />' +
                        'Movepool: +Ice Beam, +Thunderbolt</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'machamp') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Machamp</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/68.png"></center></div>' +
                        'Stats: 100/130/80/65/85/55<br />' +
                        'Abilities: No Guard<br />' +
                        'Movepool: +Meditate, +Circle Throw</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'victreebel') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Victreebel</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/71.png"></center></div>' +
                        'Stats: 80/105/65/110/60/80<br />' +
                        'Abilities: Chlorophyll/Leaf Guard<br />' +
                        'Movepool: +Agility</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'tentacruel') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Tentacruel</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/73.png"></center></div>' +
                        'Stats: 90/70/65/80/120/100<br />' +
                        'Abilities: Rain Dish/Regenerator<br />' +
                        'Movepool: +Thunder Wave</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'golem') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Golem</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/76.png"></center></div>' +
                        'Stats: 90/110/130/55/77/40<br />' +
                        'Abilities: Sturdy/Solid Rock/Skill Link<br />' +
                        'Movepool: +Rapid Spin, +Ice Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'rapidash') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Rapidash</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/78.png"></center></div>' +
                        'Abilities: Speed Boost<br />' +
                        'Movepool: +Work Up, +Baton Pass (level up)</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'slowbro') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Slowbro</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/80.png"></center></div>' +
                        'Abilities: Natural Cure/Telepathy<br />' +
                        'Movepool: +Heal Bell, +Haze, +Stored Power</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'slowking') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Slowking</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/199.png"></center></div>' +
                        'Abilities:Oblivious/Regenerator<br />' +
                        'Movepool: +Wish, +Baton Pass, +Stored Power</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'magnezone') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Magnezone</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/462.png"></center></div>' +
                        'Abilities: Magnet Pull/Adaptability<br />' +
                        'Movepool: +Automize</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'dodrio') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Dodrio</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/85.png"></center></div>' +
                        'Stats: 70/120/60/50/70/110<br />' +
                        'Abilities: Reckless/Tangled Feet<br />' +
                        'Movepool: +Close Combat, See Rage</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'muk') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Muk</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/89.png"></center></div>' +
                        'Stats: 105/105/95/85/80/44<br />' +
                        'Abilities: Poison Touch<br />' +
                        'Movepool: +Slack Off, +Bulk Up</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'cloyster') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Cloyster</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/91.png"></center></div>' +
                        'Abilities: Skill Link/Water Absorb<br />' +
                        'Movepool: +Stealth Rock, -Spike Cannon</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'steelix') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Steelix</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/208.png"></center></div>' +
                        'Stats: 75/85/200/55/80/30<br />' +
                        'Abilities: Sheer Force/Sturdy/Rock Head<br />' +
                        'Movepool: +Coil, +Head Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'hypno') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Hypno</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/97.png"></center></div>' +
                        'Stats: 74/70/102/96/120/80<br />' +
                        'Abilities: Filter/Bad Dreams<br />' +
                        'Movepool: +Recover, +Dark Void, +Vacuum Wave, +Aura Sphere</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'gengar') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Gengar</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/94.png"></center></div>' +
                        'Type: Ghost<br />' +
                        'Movepool: +Nasty Plot</div><br />' +
                        '<div style="clear:both;"></div>');
		}
		if (target === 'kingler') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Kingler</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/99.png"></center></div>' +
                        'Stats: 70/130/110/27/68/82<br />' +
                        'Abilities: Shell Armor<br />' +
                        'Movepool: +Shell Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'electrode') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Electrode</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/101.png"></center></div>' +
                        'Stats:60/50/70/100/80/150<br />' +
                        'Abilities: Lightningrod/Aftermath<br />' +
                        'Movepool: +Flamethrower, +Overheat, +Focus Blast, + Paleo Wave</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'exeggutor') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Exeggutor</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/103.png"></center></div>' +
                        'Stats: 90/100/90/127/90/40<br />' +
                        'Abilities: Skill Link/Technician/Harvest<br />' +
                        'Movepool: +Rock Blast, +Growth, +Calm Mind,</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (target === 'marowak') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Marowak</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/105.png"></center></div>' +
                        'Stats: 75/80/110/50/85/40<br />' +
                        'Abilities: Rock Head/Lightningrod/Battle Armor<br />' +
                        'Movepool: +Head Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'hitmonlee') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Hitmonlee</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/106.png"></center></div>' +
                        'Stats: 105/120/53/35/115/87<br />' +
                        'Abilities: Unburden/Quick Feet<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'hitmonchan') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Hitmonlchan</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/107.png"></center></div>' +
                        'Stats: 105/105/79/35/110/76<br />' +
                        'Abilities: Unburden/Iron Fist<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'lickilicky') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Lickilicky</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/463.png"></center></div>' +
                        'Stats: 110/85/100/80/100/30<br />' +
                        'Abilities: Cloud Nine/Thick Fat<br />' +
                        'Movepool: +Double Edge (level up), +Wish (level up), +Heal Bell (level up)</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target ==='weezing') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Weezing</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/110.png"></center></div>' +
                        'Stats: 95/80/140/90/80/50<br />' +
                        'Abilities: Levitate/Regenerator<br />' +
                        'Movepool: Movepool: +Ice Beam, +Toxic Spikes<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'rhyperior') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Rhyperior</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/464.png"></center></div>' +
                        'Stats: 115/140/130/55/55/40<br />' +
                        'Abilities: Lightningrod/Solid Rock/Battle Armor<br />' +
                        'Movepool: +Head Smash, +Dragon Dance, +Horn Leech<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'blissey') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Blissey</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/242.png"></center></div>' +
                        'Stats: 255/10/10/90/135/40<br />' +
                        'Abilities: Natural Cure/Regenerator<br />' +
                        'Movepool: +Baton Pass, +Wish (level up)<br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'tangrowth') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Tangrowth</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/465.png"></center></div>' +
                        'Stats: 100/100/125/110/50/50<br />' +
                        'Abilities: Regenerator/Leaf Guard/Chorophyll <br />' +
                        'Movepool: +Curse, +Earthquake, +Horn Leech, +Circle Throw</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target ==='kangaskhan') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Kangaskhan</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/115.png"></center></div>' +
                        'Type: Normal/Ground<br />' +
                        'Stats: 105/95/80/40/80/95<br />' +
                        'Abilities: Moxie/Unburden/Scrappy<br />' +
                        'Movepool: +Wish, +Crunch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'kingdra') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Kingdra</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/230.png"></center></div>' +
                        'Abilities: Swift Swim</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'seaking') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Seaking</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/119.png"></center></div>' +
                        'Stats: 80/115/85/65/85/68<br />' +
                        'Abilities: Swift Swim/Water Veil/Lightningrod <br />' +
                        'Movepool: +Horn Leech, +Swords Dance, +Aqua Jet</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target ==='starmie') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Starmie</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/121.png"></center></div>' +
                        'Abilities: Regenerator/Natural Cure<br />' +
                        'Movepool: +Shadow Ball, +Calm Mind</div><br />' +
                        '<div style="clear:both;"></div>');
        }
         if (target === 'mrmime' || target === 'mr mime' || target === 'mr.mime' || target === 'mr. mime' || target === 'mistermime' || target === 'mister mime') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Mr. Mime</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/122.png"></center></div>' +
                        'Stats: 80/25/85/100/130/90<br />' +
                        'Abilities: Illusion/Magic Bounce</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'scyther') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Scyther</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/123.png"></center></div>' +
                        'Stats: 80/110/85/40/85/110<br />' +
                        'Abilities: Unburden/Technician/Mountaineer<br />' +
                        'Movepool: +Acrobatics, +Fake Out</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target ==='scizor') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Scizor</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/212.png"></center></div>' +
                        'Abilities: Technician<br />' +
                        'Movepool: +Hammer Arm, +Fake Out, +Crabhammer</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'jynx') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Jynx</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/124.png"></center></div>' +
                        'Abilities: Prankster/Dry Skin<br />' +
                        'Movepool: +Weather Ball, +Glaciate</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'electivire') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Electivire</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/466.png"></center></div>' +
                        'Stats: 75/133/67/95/85/95<br />' +
                        'Abilities: Guts/Motor Drive/Volt Absorb<br />' +
                        'Movepool: +Agility, +Fusion Bolt, +Baton Pass, + Drain Punch, +Bulk Up, +Sucker Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'magmortar') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Magmortar</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/467.png"></center></div>' +
                        'Stats: 75/85/67/135/95/83<br/>' +
                        'Abilities:Flash Fire/Magma Armor/Vital Spirit<br />' +
                        'Movepool: +Eruption, +Magma Storm, +Nasty Plot, +Fusion Flare</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'pinsir') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Pinsir</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/127.png"></center></div>' +
                        'Type: Bug/Dark <br />' +
                        'Stats: 80/120/100/55/90/75 <br />' +
                        'Abilities: Intimidate/Shed Skin<br />' +
                        'Movepool: -Close Combat, +Poison Jab, +Sucker Punch, +Night Slash, +Bulk Up</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'tauros') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Tauros</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/128.png"></center></div>' +
                        'Stats: 75/130/95/20/60/100<br />' +
                        'Abilities: Intimidate/Reckless/Sheer Force<br />' +
                        'Movepool: +Head Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'gyarados' || target === 'gayrados') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Gyarados</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/130.png"></center></div>' +
                        'Abilities:  Moxie/Intimidate/Water Veil<br />' +
                        'Movepool: +Sky Attack</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'lapras') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Lapras</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/131.png"></center></div>' +
                        'Stats: 130/85/80/85/95/60<br />' +
                        'Abilities: Hydration/Adaptability<br />' +
                        'Movepool: +Wish, +Superpower, +Haze, +Glaciate, +Aqua Jet, +Recover, +Horn Leech, +Icicle Crash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'ditto') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Ditto</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/132.png"></center></div>' +
                        'Stats: 60/48/48/48/48/48</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'vaporeon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Vaporeon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/134.png"></center></div>' +
                        'Abilities:  Water Absorb/Hydration<br />' +
                        'Movepool: +Dragon Tail</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'jolteon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Jolteon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/135.png"></center></div>' +
                        'Abilities: Volt Absorb/Static<br />' +
                        'Movepool: +Electro Ball, +Paleo Wave</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'flareon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Flareon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/136.png"></center></div>' +
                        'Stats: 65/130/60/65/110/95<br />' +
                        'Abilities: Flash Fire/Magma Armor<br />' +
                        'Movepool: +Flare Blitz, +U-Turn, +Stone Edge, +Rock Slide, +Swords Dance, +Dragon Dance, +Wild Charge</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'espeon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Espeon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/196.png"></center></div>' +
                        'Stats: 65/65/60/130/95/110<br />' +
                        'Abilities: Magic Bounce/Magic Guard<br />' +
                        'Movepool: +Aura Sphere, +Recover</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'umbreon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Umbreon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/197.png"></center></div>' +
                        'Abilities: Synchronize/Frisk<br />' +
                        'Movepool: +Dark Void</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'leafeon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Leafeon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/470.png"></center></div>' +
                        'Stats: 65/110/60/95/65/130<br/>' +
                        'Abilities: Chlorophyll/Sap Sipper<br />' +
                        'Movepool: +Growth, +Earth Power, +Nature Power</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'glaceon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Glaceon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/471.png"></center></div>' +
                        'Stats: 65/110/65/130/60/95<br/>' +
                        'Abilities: Snow Cloak/Ice Body<br />' +
                        'Movepool: +Glaciate, +Icicle Crash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'porygon2') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Porygon2</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/233.png"></center></div>' +
                        'Stats: 85/80/90/109/105/60<br />' +
                        'Abilities: Trace/Download/Analytic<br />' +
                        'Movepool: +Flamethrower, +Fire Blast</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'porygon-z' || target === 'porygon z' || target === 'porygonz') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Porygon-Z</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/474.png"></center></div>' +
                        'Stats: 70/80/70/145/75/90<br />' +
                        'Abilities: Download/Adaptability/Trace<br />' +
                        'Movepool: +Flamethrower, +Fire Blast</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'omastar') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Omastar</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/139.png"></center></div>' +
                        'Movepool: +Paleo Wave, -Spike Cannon</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'kabutops') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Kabutops</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/141.png"></center></div>' +
                        'Abilities: Sand Rush/Swift Swim</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'aerodactyl') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Aerodactyl</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/142.png"></center></div>' +
                        'Stats: 80/105/65/60/75/130<br />' +
                        'Abilities: Rock Head<br />' +
                        'Movepool: +Head Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'snorlax') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Snorlax</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/143.png"></center></div>' +
                        'Abilities: Immunity/Thick Fat<br />' +
                        'Movepool:+Slack Off, +Hammer Arm, +Bounce</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'dragonite') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Dragonite</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/149.png"></center></div>' +
                        'Abilities: Shed Skin/Multiscale<br />' +
                        'Movepool: +Heal Bell from tutor, +Acrobatics, +Sky Attack</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'articuno') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Articuno</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/144.png"></center></div>' +
                        'Abilities: Ice Body<br />' +
                        'Movepool: +Glaciate, +Lunar Dance, +Thunderbolt, +Calm Mind, -Hurricane<br />' +
                        'Important Notes: If Articuno holds the Icy Rock, hail is automatically summoned for 3 turns</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'zapdos') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Zapdos</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/145.png"></center></div>' +
                        'Abilities: Volt Absorb <br />' +
                        'Movepool: +Hurricane<br />' +
                        'Important Notes: If Zapdos holds the Damp Rock, rain is automatically summoned for 3 turns</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'moltres') {
            matched = true;
                        showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Moltres</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/146.png"></center></div>' +
                        'Abilities: Flame Body<br />' +
                        'Movepool: +Magma Storm, +Eruption, -Hurricane<br />' +
                        'Important Notes: If Moltres holds the Heat Rock, intense sunlight is automatically summoned for 3 turns</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'mew') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Mew</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/151.png"></center></div>' +
                        'Abilities: Wonder Skin/Levitate<br />' +
                        'Movepool: +Psystrike</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'victini') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Victini</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/494.png"></center></div>' +
                        'Movepool: +Nasty Plot, +Dragon Pulse</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'serperior') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Serperior</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/497.png"></center></div>' +
                        'Abilities: Overgrow/Poison Heal/Contrary<br />' +
                        'Stats: 70/85/90/95/97/103<br />' +
                        'Movepool: +Earthquake, +Taunt, +Earth Power, +Toxic Spikes</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'emboar') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Emboar</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/500.png"></center></div>' +
                        'Abilities: Blaze/Intimidate/Reckless<br />' +
                        'Stats: 110/123/97/75/65/70<br />' +
                        'Movepool: +Force Palm, +Drain Punch, +Mach Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'samurott') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Samurott</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/503.png"></center></div>' +
                        'Abilities: Torrent/Justified/Hyper Cutter<br />' +
                        'Stats: 95/90/85/108/70/80<br />' +
                        'Movepool: +Shell Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'watchog') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Watchog</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/505.png"></center></div>' +
                        'Type: Normal/Dark<br />' +
                        'Abilities: Filter/Trace/Wonder Skin<br />' +
                        'Stats: 92/95/80/95/80/108<br />' +
                        'Movepool: +Fake Out, +U-Turn, +Punishment, +Snatch, +Memento, +Healing Wish, +Double Edge, +Dark Pulse, +Dark Void, +Sucker Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'stoutland') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Stoutland</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/508.png"></center></div>' +
                        'Abilities: Sand Rush/Snow Cloak<br />' +
                        'Stats: 85/110/90/45/90/80<br />' +
                        'Movepool: +Flame Charge, +Swords Dance</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'liepard') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Liepard</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/510.png"></center></div>' +
                        'Abilities: Prankster/Unburden/Wonder Skin<br />' +
                        'Stats: 70/105/80/90/75/106<br />' +
                        'Movepool: +Disable, +Baton Pass, +Work Up, +Agility, +Moonlight</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'simisage') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Simisage</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/512.png"></center></div>' +
                        'Abilities: Guts/Overgrow/Prankster<br />' +
                        'Stats: 75/105/65/90/65/101<br />' +
                        'Movepool: +Bulk Up, +Growth, +Glare, +Taunt</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'simisear') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Simisear</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/514.png"></center></div>' +
                        'Abilities: Solar Power/Blaze/Turboblaze<br />' +
                        'Stats: 75/90/65/105/65/101<br />' +
                        'Movepool: +Thunderbolt, +Calm Mind, +Morning Sun</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'simipour') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Simipour</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/516.png"></center></div>' +
                        'Abilities: Water Absorb / Torrent / Rebound<br />' +
                        'Stats: 90/75/100/80/105/101<br />' +
                        'Movepool: +Slack Off, +Encore, +Heal Bell, +Light Screen, +Reflect, +Haze</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'musharna') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Musharna</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/518.png"></center></div>' +
                        'Abilities: Trace/Synchronize/Marvel Scale<br />' +
                        'Stats: 116/55/85/107/105/29<br />' +
                        'Movepool: +Recover, +Will-o-Wisp</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'zebstrika') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Zebstrika</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/523.png"></center></div>' +
                        'Stats: 75/105/63/105/63/120<br />' +
                        'Abilities: Lightningrod/Sap Sipper/Reckless<br />' +
                        'Movepool: +Flare Blitz, +Jump Kick, +Weather Ball</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'gigalith') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Gigalith</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/526.png"></center></div>' +
                        'Abilities: Sturdy/Sand Force/Solid Rock<br />' +
                        'Stats: 85/135/130/60/90/25<br />' +
                        'Movepool:+Spike Cannon</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'excadrill') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Excadrill</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/530.png"></center></div>' +
                        'Abilities: Sand Force/Mold Breaker<br />' +
                        'Stats: 110/135/60/50/60/100<br />' +
                        'Movepool:+Superpower</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'conkeldurr') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Conkeldurr</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/534.png"></center></div>' +
                        'Abilities: Sheer Force/Guts/Oblivious<br />' +
                        'Movepool: +Sucker Punch<br />' +
                        "Important Notes: Sheer force boosts hammer arm damage because of hammer arm's new effect</div><br />" +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'seismitoad') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Seismitoad</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/537.png"></center></div>' +
                        'Abilities: Poison Heal/Poison Touch /Swift Swim<br />' +
                        'Stats: 110/90/80/90/80/74<br />' +
                        'Movepool: +Slack Off, +Waterfall</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'throh') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Throh</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/538.png"></center></div>' +
                        'Abilities: Guts/Scrappy<br />' +
                        'Stats: 100/105/90/30/110/45<br />' +
                        'Movepool: +Meditate, +Slack Off</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'sawk') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Sawk</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/539.png"></center></div>' +
                        'Abilities: Sturdy/Infiltrator<br />' +
                        'Stats: 80/125/80/30/80/105<br />' +
                        'Movepool: +Hi Jump Kick</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'leavanny') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Leavanny</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/542.png"></center></div>' +
                        'Stats: 95/110/70/90/90/103<br />' +
                        'Abilities: Tinted Lens/Shed Skin/Technician<br />' +
                        'Movepool: +Horn Leech, +Sucker Punch, +Sleep Powder, +Quiver Dance, +Earth Power, +Nature Power, +Petal Dance, +Twineedle</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'scolipede') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Scolipede</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/545.png"></center></div>' +
                        'Abilities: Unburden/Swarm/Poison Touch<br />' +
                        'Stats: 60/110/95/55/69/112<br />' +
                        'Movepool: +Rapid Spin, +Taunt, +Trick</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'whimsicott') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Whimsicott</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/547.png"></center></div>' +
                        'Stats: 60/67/85/85/75/116<br />' +
                        'Abilities: Prankster/Cloud Nine<br />' +
                        'Movepool: +Ingrain, +Leaf Storm</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'lilligant') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Lilligant</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/549.png"></center></div>' +
                        'Abilities: Chlorophyll/Own Tempo/Tangled Feet<br />' +
                        'Stats: 75/60/80/115/80/90<br />' +
                        'Movepool: +Earth Power</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'krookodile') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Krookodile</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/553.png"></center></div>' +
                        'Abilities: Intimidate/Moxie<br />' +
                        'Stats:95/120/70/65/70/101<br />' +
                        'Movepool: +Dragon Dance</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'darmanitan') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Darmanitan</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/555.png"></center></div>' +
                        'Abilities: Sheer Force/Rock Head<br />' +
                        'Movepool: +Wild Charge, +Shadow Ball, +Calm Mind<br />' +
                        'Important Notes: Zen Mode can be activated using the Odd Incense</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'crustle') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Crustle</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/558.png"></center></div>' +
                        'Stats: 70/95/125/55/100/55</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'scrafty') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Scrafty</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/560.png"></center></div>' +
                        'Movepool:+Sucker Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'carracosta') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Carracosta</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/565.png"></center></div>' +
                        'Stats: 74/118/123/90/55/70<br />' +
                        'Movepool: +Dragon Pulse, +Drain Punch, +Focus Blast, +Icicle Crash<br />' +
                        'Ability: Shell Armor</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'archeops') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Archeops</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/567.png"></center></div>' +
                        'Stats:75/135/65/80/65/107<br />' +
                        'Movepool: -Earthquake, -Bulldoze<br />' +
                        'Important Notes: See Defeatist</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'garbodor') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Garbodor</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/569.png"></center></div>' +
                        'Stats: 85/95/100/80/90/70<br />' +
                        'Abilities: Poison Touch/Weak Armor/Aftermath<br />' +
                        'Movepool: +Snatch, +Gastro Acid, +Poison Jab, +Spike Cannon, +Sucker Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'zoroark') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Zoroark</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/571.png"></center></div>' +
                        'Stats: 70/105/60/120/60/105<br />' +
                         'Movepool: +Fire Blast, +Aura Sphere</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'reuniclus') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Reuniclus</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/579.png"></center></div>' +
                        'Abilities: Magic Guard/Regenerator/Levitate<br />' +
                         'Movepool: +Aura Sphere</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'swanna') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Swanna</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/581.png"></center></div>' +
                        'Abilities: Swift Swim/Cloud Nine<br />' +
                        'Stats: 72/80/80/116/88/79<br />' +
                        'Movepool: +Sky Attack, +Calm Mind</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'vanilluxe') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Vanilluxe</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/584.png"></center></div>' +
                        'Abilities: Adaptdability/Ice Body/Technician<br />' +
                        'Stats: 80/90/85/110/95/90<br />' +
                        'Movepool: +Charge Beam, +Recover, +Thunderbolt, +Haze, +Nasty Plot</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'sawsbuck') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Sawsbuck</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/586.png"></center></div>' +
                        'Abilities: Chlorophyll<br />' +
                        'Stats: 70/114/60/70/80/101<br />' +
                        'Movepool: +Hi Jump Kick, +Extremespeed</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'escavalier') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><bEscavalier</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/589.png"></center></div>' +
                        'Abilities: Swarm/Sturdy<br />' +
                        'Stats: 70/135/105/60/105/35<br />' +
                        'Movepool: +Drill Run, +Stone Edge, +Superpower, +Bullet Punch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'amoonguss') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Amoonguss</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/591.png"></center></div>' +
                        'Abilities: Regenerator<br />' +
                        'Movepool: +Leech Seed</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'jellicent') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Jellicent</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/593.png"></center></div>' +
                        'Stats: 100/60/75/85/105/60<br />' +
                        'Abilities: Water Absorb/Storm Drain/Levitate<br />' +
                        'Movepool: +Perish Song</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'alomomola') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Alomomola</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/594.png"></center></div>' +
                        'Stats: 165/80/80/35/50/100<br />' +
                        'Abilities: Healer/Hydration/Regenerator<br />' +
                        'Movepool: +Amnesia, +Baton Pass, +Reflect, +Light Screen +Recover</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'galvantula') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Galvantula</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/596.png"></center></div>' +
                        'Stats: 75/70/60/115/70/108<br />' +
                        'Abiities: Compoundeyes/Lightningrod<br />' +
                        'Movepool: +Baton Pass</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'ferrothorn') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Ferrothorn</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/598.png"></center></div>' +
                        'Abilities: Iron Barbs/Battle Armor<br />' +
                        'Movepool: +Spike Cannon</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'klinklang') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Klinklang</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/601.png"></center></div>' +
                        'Stats: 60/90/115/70/85/90<br />' +
                        'Abilities: Technician/Levitate<br />' +
                        'Movepool: +Earthquake, +Bulldoze</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'eelektross') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Eelektross</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/604.png"></center></div>' +
                        'Stats: 85/115/80/115/80/50<br />' +
                        'Abilities: Levitate<br />' +
                        'Movepool: +Swords Dance , +Agility, +Dragon Dance, +Extremespeed</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'chandelure') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Chandelure</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/609.png"></center></div>' +
                        'Stats: 60/55/90/130/90/80<br />' +
                        'Abilities: Flash Fire/Shadow Tag<br />' +
                        'Movepool: -Trick, -Calm Mind</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'haxorus') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Haxorus</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/612.png"></center></div>' +
                        'Abilities: Mold Breaker/Battle Armor</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'beartic') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Beartic</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/614.png"></center></div>' +
                        'Stats: 110/125/90/50/85/80<br />' +
                        'Abilities: Ice Body/Swift Swim<br />' +
                        'Movepool: +Close Combat, +Ice Shard</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'cryogonal') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Cryogonal</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/615.png"></center></div>' +
                        'Stats: 80/30/80/95/140/105<br />' +
                        'Abilities: Magic Bounce</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'accelgor') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Accelgor</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/617.png"></center></div>' +
                        'Stats: 90/75/50/110/50/145<br />' +
                        'Abilities: Hydration/Sticky Hold<br />' +
                        'Movepool: +Stealth Rock, +Self Destruct, +Spikes (level up), +Spike Cannon</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'mienshao') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Mienshao</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/620.png"></center></div>' +
                        'Stats: 65/125/60/95/85/105<br />' +
                        'Abilities: Technician/Regenerator/Reckless<br />' +
                        'Movepool: +Doubleslap, +Icy Wind</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'druddigon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Druddigon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/621.png"></center></div>' +
                        'Type: Dragon/Fighting<br />' +
                        'Stats: 80/120/95/65/95/35<br />' +
                        'Abilities: Intimidate/No Guard/Multiscale<br />' +
                        'Movepool: +Yawn, +Roost, +Circle Throw, +Drain Punch, +Dragon Rush, +Dynamicpunch</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'golurk') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Golurk</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/623.png"></center></div>' +
                        'Stats: 75/124/110/75/85/55<br />' +
                        'Abilities: Iron Fist/No Guard<br />' +
                        'Movepool: +Bulk Up, +Drain Punch, +Pain Split</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'bouffalant') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Bouffalant</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/626.png"></center></div>' +
                        'Abilities: Sap Sipper/Sheer Force/Defiant<br />' +
                        'Stats: 110/125/95/40/95/55<br />' +
                        'Movepool: See Head Charge changes</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'bisharp') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Bisharp</b><br />' +
                '<img src=http://sprites.pokecheck.org/icon/625.png></center></div>' +
                        'Stats: 70/125/115/60/70/70<br />' +
                        'Abilities: Moxie/Analytic</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'braviary') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Braviary</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/628.png"></center></div>' +
                        'Type: Fighting/Flying<br />' +
                        'Stats: 100/120/75/57/65/90<br />' +
                        'Abilities: Defiant<br />' +
                        '</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'mandibuzz') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Mandibuzz</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/630.png"></center></div>' +
                        'Abilities: Prankster</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'durant') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Durant</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/632.png"></center></div>' +
                        'Stats: 80/120/112/48/66/109<br />' +
                        'Abilities: Sheer Force/Hustle/Truant<br />' +
                        'Movepool: +Bulldoze, +Ice Fang, +Head Smash</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'hydreigon') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Hydreigon</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/635.png"></center></div>' +
                        'Stats: 90/105/90/125/90/100</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'volcarona') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Volcarona</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/637.png"></center></div>' +
                        'Stats: 85/60/65/125/105/100</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'cobalion') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Cobalion</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/638.png"></center></div>' +
                        'Abilities: Justified/Heatproof<br />' +
                        'Movepool: +Wild Charge, +Thunderbolt, +Aura Sphere</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'terrakion') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Terrakion</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/639.png"></center></div>' +
                        'Abilities: Justified/Defiant<br />' +
                        'Movepool: +Aura Sphere</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'virizion') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Virizion</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/640.png"></center></div>' +
                        'Abilities: Justified/Regenerator<br />' +
                        'Movepool: +Aura Sphere</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'tornadus') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Tornadus</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/641.png"></center></div>' +
                        'Abilities: Prankster/Regenerator</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'tornadus-therian' || target === 'tornadus-t') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:58px;width:80px"><center><b>Tornadus-Therian</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/641-therian.png"></center></div>' +
                        'Stats: 79/100/75/115/90/121<br />' +
                        'Abilities: Infiltrator</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'thundurus') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Thundurus</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/642.png"></center></div>' +
                        'Abilities: Pressure/Static</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'landorus') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Landorus</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/645.png"></center></div>' +
                        'Movepool: -Explosion, +Self Destruct</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'landorus-therian' || target === 'landorus-t') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:58px;width:80px"><center><b>Landorus-Therian</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/645-therian.png"></center></div>' +
                        'Movepool: -Explosion, +Self Destruct</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'keldeo') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Keldeo</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/647.png"></center></div>' +
                        'Abilities: Justified/Water Absorb<br />' +
                        'Movepool: +Shadow Ball, +Aura Sphere, +Ice Beam</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'keldeo-resolute' || target == 'keldeo-r') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:58px;width:80px"><center><b>Keldeo-Resolute</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/647-resolution.png"></center></div>' +
						'Stats: 72/108/90/129/90/91<br />' +
                        'Abilities: Justified / Technician<br />' +
                        'Movepool: +Shadow Ball, +Aura Sphere, +Ice Beam<br />' +
                        'Important Notes: Can be used without Secret Sword</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'meloetta') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Meloetta</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/648.png"></center></div>' +
                        'Movepool: +Mach Punch +Vacuum Wave, +Lunar Dance<br />' +
                        'Important Notes: See Relic Song</div><br />' +
                        '<div style="clear:both;"></div>');
        }
        if (target === 'genesect') {
            matched = true;
            showOrBroadcastStart(user, cmd, room, socket, message);
            showOrBroadcast(user, cmd, room, socket,
                '<div style="float:left;height:50px;width:80px"><center><b>Genesect</b><br />' +
                '<img src="http://sprites.pokecheck.org/icon/649.png"></center></div>' +
                        'Abilities: Motor Drive / Adaptability<br />' +
                        'Movepool: -Explosion, -Ice Beam, -Blizzard, -Rock Polish</div><br />' +
                        '<div style="clear:both;"></div>');
        }
		if (!target) {
			showOrBroadcastStart(user, cmd, room, socket, message);
			showOrBroadcast(user, cmd, room, socket,
				'<div style="border:1px solid #6688AA;padding:2px 4px">DuskMod v2.1.0!<br />' +
				'- <a href="http://duskmod.wikia.com/wiki/DuskMod_Wiki" target="_blank">Wiki homepage, and an introduction to DuskMod</a><br />' +
				'- <a href="http://pastebin.com/raw.php?i=uYzpap2X" target="_blank">List of changes</a><br />' +
				'- <a href="http://pastebin.com/raw.php?i=GuQfcM0i" target="_blank">FAQ</a><br />' +
				'- <a href="http://www.smogon.com/forums/showthread.php?t=3473707" target="_blank">Smogon thread</a><br />' +
				'- Also visit out synirc channel at #duskmod!' +
				'</div>');
		}
		else if (!matched) {
			emit(socket, 'console', '"'+target+'" was not found, or it was not modified by DuskMod.');
		}
		return false;
		break;
/*##################################################################################################################################################################################################################
END DUSKMOD DATA
##################################################################################################################################################################################################################*/

	case 'league':
	case '!league':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">DuskMod league:<br />' +
			'- <a href="http://duskmodleague.forumotion.com/" target="_blank">DM League forums</a><br />' +
			'- <a href="http://duskmodleague.forumotion.com/t5-current-gym-leaders" target="_blank">Gym leaders</a><br />' +
			'- <a href="http://duskmodleague.forumotion.com/t12-challenger-registration-dm-league-important-info" target="_blank">Challenger registration</a><br />' +
			'</div>');
		return false;
		break;
	
	case 'imposter':
	case 'fake':
		if (canTalk(user, room) && user.can('ban') && room.id === 'lobby') {
			if (!target) return parseCommand(user, '?', cmd, room, socket);
			var targets = splitTarget(target);
			var targetUser = targets[0];
			if (!targets[1]) {
				emit(socket, 'console', 'You forgot the comma.');
				return parseCommand(user, '?', cmd, room, socket);
			}
			if (!targets[0]) {
				if (target.indexOf(' ')) {
					emit(socket, 'console', 'User '+targets[2]+' not found. Did you forget a comma?');
				} else {
					emit(socket, 'console', 'User '+targets[2]+' not found. Did you misspell their name?');
				}
				return parseCommand(user, '?', cmd, room, socket);
			}
			room.log.push('|c| '+targets[2]+'|'+targets[1]);
			if (!parseCommand.lastImposter) parseCommand.lastImposter = [];
			parseCommand.lastImposter.push(user.name);
			parseCommand.lastImposter.push(target);
			if (parseCommand.lastImposter.length > 100) parseCommand.lastImposter.shift();
			return false;
		}
		break;
	
	case 'background':
	case 'bg':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		if (!user.can('declare')) {
			emit(socket, 'console', '/background - Access denied.');
			return false;
		}
		if (target === 'dusk') target = 'http://imageshack.us/a/img26/6238/duskserv.png';
		if (target === 'raikou') target = 'http://imageshack.us/a/img822/4290/raikoupsbg.png';
		if (target === 'mudkip') target = 'http://images.wikia.com/halofanon/images/8/8b/Dancing_mudkip.gif';
		if (target === 'caffeine') target = 'http://i2.kym-cdn.com/photos/images/newsfeed/000/144/533/mr%20caffeine.gif';
		
		target = target.replace(/\[\[([A-Za-z0-9-]+)\]\]/, '<button onclick="selectTab(\'$1\');return false">Go to $1</button>');
		room.addRaw('<script>$(".battle-log").css("background", "#EDF1F4 url('+target+') no-repeat scroll right bottom");$(".message").detach();</script>');
		logModCommand(room,user.name+' changed background to '+target,true);
		return false;
		break;
		
	case 'me':
	case 'mee':
		if (canTalk(user, room)) return true;
		break;

	case '!birkal':
	case 'birkal':
		if (canTalk(user, room) && user.can('broadcast') && room.id === 'lobby') {
			if (cmd === '!birkal') {
				room.log.push('|c|'+user.getIdentity()+'|!birkal '+target);
			}
			room.log.push('|c| Birkal|/me '+target);
			if (!parseCommand.lastBirkal) parseCommand.lastBirkal = [];
			parseCommand.lastBirkal.push(user.name);
			parseCommand.lastBirkal.push(target);
			if (parseCommand.lastBirkal.length > 100) parseCommand.lastBirkal.shift();
			return false;
		}
		break;

	case 'namelock':
	case 'nl':
		if(!target) {
			return false;
		}
		var targets = splitTarget(target);
		var targetUser = targets[0];
		var targetName = targets[1] || (targetUser && targetUser.name);
		if (!user.can('namelock', targetUser)) {
			emit(socket, 'console', '/namelock - access denied.');
			return false;
		} else if (targetUser && targetName) {
			var oldname = targetUser.name;
			var targetId = toUserid(targetName);
			var userOfName = Users.users[targetId];
			var isAlt = false;
			if (userOfName) {
				for(var altName in userOfName.getAlts()) {
					var altUser = Users.users[toUserid(altName)];
					if (!altUser) continue;
					if (targetId === altUser.userid) {
						isAlt = true;
						break;
					}
					for (var prevName in altUser.prevNames) {
						if (targetId === toUserid(prevName)) {
							isAlt = true;
							break;
						}
					}
					if (isAlt) break;
				}
			}
			if (!userOfName || oldname === targetName || isAlt) {
				targetUser.nameLock(targetName, true);
			}
			if (targetUser.nameLocked()) {
				logModCommand(room,user.name+" name-locked "+oldname+" to "+targetName+".");
				return false;
			}
			emit(socket, 'console', oldname+" can't be name-locked to "+targetName+".");
		} else {
			emit(socket, 'console', "User "+targets[2]+" not found.");
		}
		return false;
		break;
	case 'nameunlock':
	case 'unnamelock':
	case 'nul':
	case 'unl':
		if(!user.can('namelock') || !target) {
			return false;
		}
		var removed = false;
		for (var i in nameLockedIps) {
			if (nameLockedIps[i] === target) {
				delete nameLockedIps[i];
				removed = true;
			}
		}
		if (removed) {
			if (Users.get(target)) {
				rooms.lobby.usersChanged = true;
			}
			logModCommand(room,user.name+" unlocked the name of "+target+".");
		} else {
			emit(socket, 'console', target+" not found.");
		}
		return false;
		break;

	case 'forfeit':
	case 'concede':
	case 'surrender':
		if (!room.battle) {
			emit(socket, 'console', "There's nothing to forfeit here.");
			return false;
		}
		if (!room.forfeit(user)) {
			emit(socket, 'console', "You can't forfeit this battle.");
		}
		return false;
		break;

	case 'register':
		emit(socket, 'console', 'You must win a rated battle to register.');
		return false;
		break;

	case 'avatar':
		if (!target) return parseCommand(user, 'avatars', '', room, socket);
		var avatar = parseInt(target);
		if (!avatar || avatar > 294 || avatar < 1) {
			emit(socket, 'console', 'Invalid avatar.');
			return false;
		}

		user.avatar = avatar;
		emit(socket, 'console', 'Avatar changed to:');
		emit(socket, 'console', {rawMessage: '<img src="/sprites/trainers/'+avatar+'.png" alt="" width="80" height="80" />'});

		return false;
		break;

	case 'rooms':
		var targetUser = user;
		if (target) targetUser = Users.get(target);
		if (!targetUser) {
			emit(socket, 'console', 'User '+target+' not found.');
		} else {
			var output = "";
			var first = true;
			for (var i in targetUser.roomCount) {
				if (!first) output += ' | ';
				first = false;

				output += '<a href="/'+i+'" onclick="return selectTab(\''+i+'\');">'+i+'</a>';
			}
			if (!output) {
				emit(socket, 'console', ""+targetUser.name+" is offline.");
			} else {
				emit(socket, 'console', {rawMessage: ""+targetUser.name+" is in: "+output});
			}
		}
		return false;
		break;

	case 'altcheck':
	case 'alt':
	case 'alts':
	case 'getalts':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targetUser = Users.get(target);
		if (!targetUser) {
			emit(socket, 'console', 'User '+target+' not found.');
			return false;
		}
		if (!user.can('alts', targetUser)) {
			emit(socket, 'console', '/alts - Access denied.');
			return false;
		}

		var alts = targetUser.getAlts();

		emit(socket, 'console', 'User: '+targetUser.name);

		if (!user.can('alts', targetUser.getHighestRankedAlt())) {
			return false;
		}

		var output = '';
		for (var i in targetUser.prevNames) {
			if (output) output += ", ";
			output += targetUser.prevNames[i];
		}
		if (output) emit(socket, 'console', 'Previous names: '+output);

		for (var j=0; j<alts.length; j++) {
			var targetAlt = Users.get(alts[j]);
			if (!targetAlt.named && !targetAlt.connected) continue;

			emit(socket, 'console', 'Alt: '+targetAlt.name);
			output = '';
			for (var i in targetAlt.prevNames) {
				if (output) output += ", ";
				output += targetAlt.prevNames[i];
			}
			if (output) emit(socket, 'console', 'Previous names: '+output);
		}
		return false;
		break;

	case 'whois':
		var targetUser = user;
		if (target) {
			targetUser = Users.get(target);
		}
		if (!targetUser) {
			emit(socket, 'console', 'User '+target+' not found.');
		} else {
			emit(socket, 'console', 'User: '+targetUser.name);
			if (config.groups[targetUser.group] && config.groups[targetUser.group].name) {
				emit(socket, 'console', 'Group: ' + config.groups[targetUser.group].name + ' (' + targetUser.group + ')');
			}
			if (!targetUser.authenticated) {
				emit(socket, 'console', '(Unregistered)');
			}
			if (user.can('ip', targetUser)) {
				emit(socket, 'console', 'IP: '+targetUser.ip);
			}
			var output = 'In rooms: ';
			var first = true;
			for (var i in targetUser.roomCount) {
				if (!first) output += ' | ';
				first = false;

				output += '<a href="/'+i+'" onclick="return selectTab(\''+i+'\');">'+i+'</a>';
			}
			emit(socket, 'console', {rawMessage: output});
		}
		return false;
		break;

	case 'ban':
	case 'b':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!user.can('ban', targetUser)) {
			emit(socket, 'console', '/ban - Access denied.');
			return false;
		}

		logModCommand(room,""+targetUser.name+" was banned by "+user.name+"." + (targets[1] ? " (" + targets[1] + ")" : ""));
		targetUser.emit('message', user.name+' has banned you.  If you feel that your banning was unjustified you can <a href="http://www.smogon.com/forums/announcement.php?f=126&a=204" target="_blank">appeal the ban</a>. '+targets[1]);
		var alts = targetUser.getAlts();
		if (alts.length) logModCommand(room,""+targetUser.name+"'s alts were also banned: "+alts.join(", "));

		targetUser.ban();
		return false;
		break;

	case 'banredirect':
	case 'br':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!user.can('ban', targetUser) || !user.can('redirect', targetUser)) {
			emit(socket, 'console', '/banredirect - Access denied.');
			return false;
		}

		if (targets[1].substr(0,2) == '~~') {
			targets[1] = '/'+targets[1];
		} else if (targets[1].substr(0,7) !== 'http://' && targets[1].substr(0,8) !== 'https://' && targets[1].substr(0,1) !== '/') {
			targets[1] = 'http://'+targets[1];
		}

		logModCommand(room,''+targetUser.name+' was banned by '+user.name+' and redirected to: '+targets[1]);

		targetUser.emit('console', {evalRawMessage: 'window.location.href="'+targets[1]+'"'});
		targetUser.ban();
		return false;
		break;

	case 'redirect':
	case 'redir':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!user.can('redirect', targetUser)) {
			emit(socket, 'console', '/redirect - Access denied.');
			return false;
		}

		if (targets[1].substr(0,2) == '~~') {
			targets[1] = '/'+targets[1];
		} else if (targets[1].substr(0,7) !== 'http://' && targets[1].substr(0,8) !== 'https://' && targets[1].substr(0,1) !== '/') {
			targets[1] = 'http://'+targets[1];
		}

		logModCommand(room,''+targetUser.name+' was redirected by '+user.name+' to: '+targets[1]);
		targetUser.emit('console', {evalRawMessage: 'window.location.href="'+targets[1]+'"'});
		return false;
		break;

	case 'kick':
	case 'k':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!user.can('redirect', targetUser)) {
			emit(socket, 'console', '/redirect - Access denied.');
			return false;
		}

		logModCommand(room,''+targetUser.name+' was kicked to the Rules page by '+user.name+'' + (targets[1] ? " (" + targets[1] + ")" : ""));
		targetUser.emit('console', {evalRawMessage: 'window.location.href="http://www.smogon.com/sim/rules"'});
		return false;
		break;

	case 'unban':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		if (!user.can('ban')) {
			emit(socket, 'console', '/unban - Access denied.');
			return false;
		}

		var targetid = toUserid(target);
		var success = false;

		for (var ip in bannedIps) {
			if (bannedIps[ip] === targetid) {
				delete bannedIps[ip];
				success = true;
			}
		}
		if (success) {
			logModCommand(room,''+target+' was unbanned by '+user.name+'.');
		} else {
			emit(socket, 'console', 'User '+target+' is not banned.');
		}
		return false;
		break;

	case 'unbanall':
		if (!user.can('ban')) {
			emit(socket, 'console', '/unbanall - Access denied.');
			return false;
		}
		logModCommand(room,'All bans and ip mutes have been lifted by '+user.name+'.');
		bannedIps = {};
		mutedIps = {};
		return false;
		break;

	case 'reply':
	case 'r':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		if (!user.lastPM) {
			emit(socket, 'console', 'No one has PMed you yet.');
			return false;
		}
		return parseCommand(user, 'msg', ''+(user.lastPM||'')+', '+target, room, socket);
		break;

	case 'msg':
	case 'pm':
	case 'whisper':
	case 'w':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targets[1]) {
			emit(socket, 'console', 'You forgot the comma.');
			return parseCommand(user, '?', cmd, room, socket);
		}
		if (!targets[0]) {
			if (target.indexOf(' ')) {
				emit(socket, 'console', 'User '+targets[2]+' not found. Did you forget a comma?');
			} else {
				emit(socket, 'console', 'User '+targets[2]+' not found. Did you misspell their name?');
			}
			return parseCommand(user, '?', cmd, room, socket);
		}
		// temporarily disable this because blarajan
		/* if (user.muted && !targetUser.can('mute', user)) {
			emit(socket, 'console', 'You can only private message members of the Moderation Team (users marked by %, @, &, or ~) when muted.');
			return false;
		} */

		var message = {
			name: user.getIdentity(),
			pm: targetUser.getIdentity(),
			message: targets[1]
		};
		user.emit('console', message);
		targets[0].emit('console', message);
		targets[0].lastPM = user.userid;
		user.lastPM = targets[0].userid;
		return false;
		break;

	case 'ip':
	case 'getip':
		if (!target) {
			emit(socket, 'console', 'Your IP is: '+user.ip);
			return false;
		}
		var targetUser = Users.get(target);
		if (!targetUser) {
			emit(socket, 'console', 'User '+target+' not found.');
			return false;
		}
		if (!user.can('ip', targetUser)) {
			emit(socket, 'console', '/ip - Access denied.');
			return false;
		}
		emit(socket, 'console', 'User '+targetUser.name+' has IP: '+targetUser.ip);
		return false;
		break;

	case 'mute':
	case 'm':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!user.can('mute', targetUser)) {
			emit(socket, 'console', '/mute - Access denied.');
			return false;
		}

		logModCommand(room,''+targetUser.name+' was muted by '+user.name+'.' + (targets[1] ? " (" + targets[1] + ")" : ""));
		targetUser.emit('message', user.name+' has muted you. '+targets[1]);
		var alts = targetUser.getAlts();
		if (alts.length) logModCommand(room,""+targetUser.name+"'s alts were also muted: "+alts.join(", "));

		targetUser.muted = true;
		for (var i=0; i<alts.length; i++) {
			var targetAlt = Users.get(alts[i]);
			if (targetAlt) targetAlt.muted = true;
		}

		rooms.lobby.usersChanged = true;
		return false;
		break;

	case 'ipmute':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targetUser = Users.get(target);
		if (!targetUser) {
			emit(socket, 'console', 'User '+target+' not found.');
			return false;
		}
		if (!user.can('mute', targetUser)) {
			emit(socket, 'console', '/ipmute - Access denied.');
			return false;
		}

		logModCommand(room,''+targetUser.name+"'s IP was muted by "+user.name+'.');
		var alts = targetUser.getAlts();
		if (alts.length) logModCommand(room,""+targetUser.name+"'s alts were also muted: "+alts.join(", "));

		targetUser.muted = true;
		mutedIps[targetUser.ip] = targetUser.userid;
		for (var i=0; i<alts.length; i++) {
			var targetAlt = Users.get(alts[i]);
			if (targetAlt) targetAlt.muted = true;
		}

		rooms.lobby.usersChanged = true;
		return false;
		break;

	case 'unmute':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targetid = toUserid(target);
		var targetUser = Users.get(target);
		if (!targetUser) {
			emit(socket, 'console', 'User '+target+' not found.');
			return false;
		}
		if (!user.can('redirect', targetUser)) {
			emit(socket, 'console', '/unmute - Access denied.');
			return false;
		}

		var success = false;

		for (var ip in mutedIps) {
			if (mutedIps[ip] === targetid) {
				delete mutedIps[ip];
				success = true;
			}
		}

		if (success) {
			logModCommand(room,''+(targetUser?targetUser.name:target)+"'s IP was unmuted by "+user.name+'.');
		}

		targetUser.muted = false;
		rooms.lobby.usersChanged = true;
		logModCommand(room,''+targetUser.name+' was unmuted by '+user.name+'.');
		return false;
		break;

	case 'promote':
	case 'demote':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target, true);
		var targetUser = targets[0];
		var userid = toUserid(targets[2]);

		var currentGroup = ' ';
		if (targetUser) {
			currentGroup = targetUser.group;
		} else if (Users.usergroups[userid]) {
			currentGroup = Users.usergroups[userid].substr(0,1);
		}
		var name = targetUser ? targetUser.name : targets[2];

		var nextGroup = targets[1] ? targets[1] : Users.getNextGroupSymbol(currentGroup, cmd === 'demote');
		if (targets[1] === 'deauth') nextGroup = config.groupsranking[0];
		if (!config.groups[nextGroup]) {
			emit(socket, 'console', 'Group \'' + nextGroup + '\' does not exist.');
			return false;
		}
		if (!user.checkPromotePermission(currentGroup, nextGroup)) {
			emit(socket, 'console', '/promote - Access denied.');
			return false;
		}

		var isDemotion = (config.groups[nextGroup].rank < config.groups[currentGroup].rank);
		Users.setOfflineGroup(name, nextGroup);
		var groupName = config.groups[nextGroup].name || nextGroup || '';
		logModCommand(room,''+name+' was '+(isDemotion?'demoted':'promoted')+' to ' + (groupName.trim() || 'a regular user') + ' by '+user.name+'.');
		if (targetUser && targetUser.connected) room.send('|N|'+targetUser.getIdentity()+'|'+targetUser.userid);
		return false;
		break;

	case 'deauth':
		return parseCommand(user, 'demote', target+', deauth', room, socket);
		break;

	case 'modchat':
		if (!target) {
			emit(socket, 'console', 'Moderated chat is currently set to: '+config.modchat);
			return false;
		}
		if (!user.can('modchat')) {
			emit(socket, 'console', '/modchat - Access denied.');
			return false;
		}

		target = target.toLowerCase();
		switch (target) {
		case 'on':
		case 'true':
		case 'yes':
			config.modchat = true;
			break;
		case 'off':
		case 'false':
		case 'no':
			config.modchat = false;
			break;
		default:
			if (!config.groups[target]) {
				emit(socket, 'console', 'That moderated chat setting is unrecognized.');
				return false;
			}
			if (config.groupsranking.indexOf(target) > 1 && !user.can('modchatall')) {
				emit(socket, 'console', '/modchat - Access denied for setting higher than ' + config.groupsranking[1] + '.');
				return false;
			}
			config.modchat = target;
			break;
		}
		if (config.modchat === true) {
			room.addRaw('<div style="background:#BB6655;color:white;padding:2px 4px"><b>Moderated chat was enabled!</b><br />Only registered users can talk.</div>');
		} else if (!config.modchat) {
			room.addRaw('<div style="background:#6688AA;color:white;padding:2px 4px"><b>Moderated chat was disabled!</b><br />Anyone may talk now.</div>');
		} else {
			var modchat = sanitize(config.modchat);
			room.addRaw('<div style="background:#AA6655;color:white;padding:2px 4px"><b>Moderated chat was set to '+modchat+'!</b><br />Only users of rank '+modchat+' and higher can talk.</div>');
		}
		logModCommand(room,user.name+' set modchat to '+config.modchat,true);
		return false;
		break;

	case 'declare':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		if (!user.can('declare')) {
			emit(socket, 'console', '/declare - Access denied.');
			return false;
		}
		target = target.replace(/\[\[([A-Za-z0-9-]+)\]\]/, '<button onclick="selectTab(\'$1\');return false">Go to $1</button>');
		room.addRaw('<div style="background:#7067AB;color:white;padding:2px 4px"><b>'+target+'</b></div>');
		logModCommand(room,user.name+' declared '+target,true);
		return false;
		break;

	case 'announce':
	case 'wall':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		if (!user.can('announce')) {
			emit(socket, 'console', '/announce - Access denied.');
			return false;
		}
		return '/announce '+target;
		break;
	
	case '!hotpatch':
	case 'hotpatch':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		if (!user.can('hotpatch')) {
			emit(socket, 'console', '/hotpatch - Access denied.');
			return false;
		}
		if (cmd === '!hotpatch') {
				room.log.push('|c|'+user.getIdentity()+'|!hotpatch '+target);
		}
		if (target === 'all') {
			for (var i in require.cache) delete require.cache[i];
			Tools = require('./tools.js');

			parseCommand = require('./chat-commands.js').parseCommand;

			sim = require('./battles.js');
			BattlePokemon = sim.BattlePokemon;
			BattleSide = sim.BattleSide;
			Battle = sim.Battle;
			logModCommand(room, 'The game engine has been hot-patched.');
			return false;
		} else if (target === 'data') {
			for (var i in require.cache) delete require.cache[i];
			Tools = require('./tools.js');
			logModCommand(room, 'Game resources have been hot-patched.');
			return false;
		} else if (target === 'chat') {
			for (var i in require.cache) delete require.cache[i];
			parseCommand = require('./chat-commands.js').parseCommand;
			logModCommand(room, 'Chat commands have been hot-patched.');
			return false;
		}
		emit(socket, 'console', 'Your hot-patch command was unrecognized.');
		return false;
		break;

	case 'savelearnsets':
		if (user.can('hotpatch')) {
			emit(socket, 'console', '/savelearnsets - Access denied.');
			return false;
		}
		fs.writeFile('data/learnsets.js', 'exports.BattleLearnsets = '+JSON.stringify(BattleLearnsets)+";\n");
		emit(socket, 'console', 'learnsets.js saved.');
		return false;
		break;

	case 'rating':
	case 'ranking':
	case 'rank':
	case 'ladder':
		emit(socket, 'console', 'You are using an old version of Pokemon Showdown. Please reload the page.');
		return false;
		break;

	case 'nick':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		user.rename(target);
		return false;
		break;

	case 'savereplay':
		if (!room || !room.battle) return false;
		var data = room.log.join("\n");
		var datahash = crypto.createHash('md5').update(data.replace(/[^(\x20-\x7F)]+/g,'')).digest('hex');

		LoginServer.request('prepreplay', {
			id: room.id.substr(7),
			loghash: datahash,
			p1: room.p1.name,
			p2: room.p2.name,
			format: room.format
		}, function(success) {
			emit(socket, 'command', {
				command: 'savereplay',
				log: data,
				room: 'lobby',
				id: room.id.substr(7)
			});
		});
		return false;
		break;

	case 'trn':
		var commaIndex = target.indexOf(',');
		var targetName = target;
		var targetAuth = false;
		var targetToken = '';
		if (commaIndex >= 0) {
			targetName = target.substr(0,commaIndex);
			target = target.substr(commaIndex+1);
			commaIndex = target.indexOf(',');
			targetAuth = target;
			if (commaIndex >= 0) {
				targetAuth = !!parseInt(target.substr(0,commaIndex),10);
				targetToken = target.substr(commaIndex+1);
			}
		}
		user.rename(targetName, targetToken, targetAuth);
		return false;
		break;

	case 'forcerename':
	case 'fr':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!user.can('forcerename', targetUser)) {
			emit(socket, 'console', '/forcerename - Access denied.');
			return false;
		}

		if (targetUser.userid === toUserid(targets[2])) {
			logModCommand(room,''+targetUser.name+' was forced to choose a new name by '+user.name+'.' + (targets[1] ? " (" + targets[1] + ")" : ""));
			targetUser.resetName();
			targetUser.emit('nameTaken', {reason: user.name+" has forced you to change your name. "+targets[1]});
		} else {
			emit(socket, 'console', "User "+targetUser.name+" is no longer using that name.");
		}
		return false;
		break;

	case 'forcerenameto':
	case 'frt':
		if (!target) return parseCommand(user, '?', cmd, room, socket);
		var targets = splitTarget(target);
		var targetUser = targets[0];
		if (!targetUser) {
			emit(socket, 'console', 'User '+targets[2]+' not found.');
			return false;
		}
		if (!targets[1]) {
			emit(socket, 'console', 'No new name was specified.');
			return false;
		}
		if (!user.can('forcerenameto', targetUser)) {
			emit(socket, 'console', '/forcerenameto - Access denied.');
			return false;
		}

		if (targetUser.userid === toUserid(targets[2])) {
			logModCommand(room, ''+targetUser.name+' was forcibly renamed to '+targets[1]+' by '+user.name+'.');
			targetUser.forceRename(targets[1]);
		} else {
			emit(socket, 'console', "User "+targetUser.name+" is no longer using that name.");
		}
		return false;
		break;

	// INFORMATIONAL COMMANDS

	case 'data':
	case '!data':
	case 'stats':
	case '!stats':
		showOrBroadcastStart(user, cmd, room, socket, message);
		var dataMessages = getDataMessage(target);
		for (var i=0; i<dataMessages.length; i++) {
			if (cmd.substr(0,1) !== '!') {
				sendData(socket, '>'+room.id+'\n'+dataMessages[i]);
			} else if (user.can('broadcast') && canTalk(user, room)) {
				room.add(dataMessages[i]);
			}
		}
		return false;
		break;

	case 'learnset':
	case '!learnset':
	case 'learn':
	case '!learn':
	case 'learnall':
	case '!learnall':
		var lsetData = {};
		var targets = target.split(',');
		if (!targets[1]) return parseCommand(user, 'help', 'learn', room, socket);
		var template = Tools.getTemplate(targets[0]);
		var move = {};
		var problem;
		var all = (cmd.substr(cmd.length-3) === 'all');

		showOrBroadcastStart(user, cmd, room, socket, message);

		if (!template.exists) {
			showOrBroadcast(user, cmd, room, socket,
				'Pokemon "'+template.id+'" not found.');
			return false;
		}

		for (var i=1, len=targets.length; i<len; i++) {
			move = Tools.getMove(targets[i]);
			if (!move.exists) {
				showOrBroadcast(user, cmd, room, socket,
					'Move "'+move.id+'" not found.');
				return false;
			}
			problem = Tools.checkLearnset(move, template, lsetData);
			if (problem) break;
		}
		var buffer = ''+template.name+(problem?" <strong style=\"color:#CC2222;text-decoration:underline\">can't</strong> learn ":" <strong style=\"color:#228822;text-decoration:underline\">can</strong> learn ")+(targets.length>2?"these moves":move.name);
		if (!problem) {
			var sourceNames = {E:"egg",S:"event",D:"dream world"};
			if (lsetData.sources || lsetData.sourcesBefore) buffer += " only when obtained from:<ul style=\"margin-top:0;margin-bottom:0\">";
			if (lsetData.sources) {
				var sources = lsetData.sources.sort();
				var prevSource;
				var prevSourceType;
				for (var i=0, len=sources.length; i<len; i++) {
					var source = sources[i];
					if (source.substr(0,2) === prevSourceType) {
						if (prevSourceCount < 0) buffer += ": "+source.substr(2);
						else if (all || prevSourceCount < 3) buffer += ', '+source.substr(2);
						else if (prevSourceCount == 3) buffer += ', ...';
						prevSourceCount++;
						continue;
					}
					prevSourceType = source.substr(0,2);
					prevSourceCount = source.substr(2)?0:-1;
					buffer += "<li>gen "+source.substr(0,1)+" "+sourceNames[source.substr(1,1)];
					if (prevSourceType === '5E' && template.maleOnlyDreamWorld) buffer += " (cannot have DW ability)";
					if (source.substr(2)) buffer += ": "+source.substr(2);
				}
			}
			if (lsetData.sourcesBefore) buffer += "<li>any generation before "+(lsetData.sourcesBefore+1);
			buffer += "</ul>";
		}
		showOrBroadcast(user, cmd, room, socket,
			buffer);
		return false;
		break;

	case 'groups':
	case '!groups':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">' +
			'+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />' +
			'% <b>Driver</b> - The above, and they can also mute users and run tournaments<br />' +
			'@ <b>Moderator</b> - The above, and they can ban users and check for alts<br />' +
			'&amp; <b>Leader</b> - The above, and they can promote moderators and force ties<br />'+
			'~ <b>Administrator</b> - They can do anything, like change what this message says'+
			'</div>');
		return false;
		break;

	case 'opensource':
	case '!opensource':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">Dusk\'s server is open source:<br />- Language: JavaScript<br />- <a href="https://github.com/Dusk209/Pokemon-Showdown/commits/master" target="_blank">What\'s new?</a><br />- <a href="https://github.com/Dusk209/Pokemon-Showdown" target="_blank">Source code</a></div>');
		return false;
		break;

	case 'avatars':
	case '!avatars':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">Want a custom avatar?<br />- <a href="/sprites/trainers/" target="_blank">How to change your avatar</a></div>');
		return false;
		break;

	case 'intro':
	case 'introduction':
	case '!intro':
	case '!introduction':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">New to competitive pokemon?<br />' +
			'- <a href="http://www.smogon.com/dp/articles/intro_comp_pokemon" target="_blank">An introduction to competitive pokemon</a><br />' +
			'- <a href="http://www.smogon.com/bw/articles/bw_tiers" target="_blank">What do "OU", "UU", etc mean?</a><br />' +
			'- <a href="http://www.smogon.com/bw/banlist/" target="_blank">What are the rules for each format? What is "Sleep Clause"?</a>' +
			'</div>');
		return false;
		break;
		
	case 'calc':
	case '!calc':
	case 'calculator':
	case '!calculator':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd , room , socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">Pokemon Showdown! damage calculator. (Courtesy of Honko)<br />' +
			'- <a href="http://pokemonshowdown.com/damagecalc/" target="_blank">Damage Calculator</a><br />' +
			'</div>');
		return false;
		break;
	
	case 'cap':
	case '!cap':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">An introduction to the Create-A-Pokemon project:<br />' +
			'- <a href="http://www.smogon.com/cap/" target="_blank">CAP project website and description</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=48782" target="_blank">What Pokemon have been made?</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3464513" target="_blank">Talk about the metagame here</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3466826" target="_blank">Practice BW CAP teams</a>' +
			'</div>');
		return false;
		break;

	case 'om':
	case 'othermetas':
	case '!om':
	case '!othermetas':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">Information on the Other Metagames:<br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3463764" target="_blank">Balanced Hackmons</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3471810" target="_blank">Dream World OU</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3467120" target="_blank">Glitchmons</a><br />' +
			'- <a href="http://www.smogon.com/forums/showthread.php?t=3476006" target="_blank">Seasonal: Winter Wonderland</a>' +
			'</div>');
		return false;
		break;

	case 'rules':
	case 'rule':
	case '!rules':
	case '!rule':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">Please follow the rules:<br />' +
			'- <a href="http://www.smogon.com/sim/rules" target="_blank">Rules</a><br />' +
			'</div>');
		return false;
		break;

	case 'banlists':
	case 'tiers':
	case '!banlists':
	case '!tiers':
		showOrBroadcastStart(user, cmd, room, socket, message);
		showOrBroadcast(user, cmd, room, socket,
			'<div style="border:1px solid #6688AA;padding:2px 4px">Smogon tiers:<br />' +
			'- <a href="http://www.smogon.com/bw/banlist/" target="_blank">The banlists for each tier</a><br />' +
			'- <a href="http://www.smogon.com/bw/tiers/uber" target="_blank">Uber Pokemon</a><br />' +
			'- <a href="http://www.smogon.com/bw/tiers/ou" target="_blank">Overused Pokemon</a><br />' +
			'- <a href="http://www.smogon.com/bw/tiers/uu" target="_blank">Underused Pokemon</a><br />' +
			'- <a href="http://www.smogon.com/bw/tiers/ru" target="_blank">Rarelyused Pokemon</a><br />' +
			'- <a href="http://www.smogon.com/bw/tiers/nu" target="_blank">Neverused Pokemon</a><br />' +
			'- <a href="http://www.smogon.com/bw/tiers/lc" target="_blank">Little Cup Pokemon</a><br />' +
			'</div>');
		return false;
		break;

	case 'analysis':
	case 'dex':
	case 'pokedex':
	case 'strategy':
	case '!analysis':
	case '!dex':
	case '!pokedex':
	case '!strategy':
		var targets = target.split(',');
		var template = Tools.getTemplate(targets[0]);
		var generation = (targets[1] || "bw").trim().toLowerCase();
		var genNumber = 5;

		showOrBroadcastStart(user, cmd, room, socket, message);

		if(!template.exists) {
			showOrBroadcast(user, cmd, room, socket, 'Pokemon "'+template.id+'" not found.');
			return false;
		}

		if(generation === "bw" || generation === "bw2" || generation === "5" || generation === "five")
			generation = "bw";
		else if(generation === "dp" || generation === "dpp" || generation === "4" || generation === "four") {
			generation = "dp";
			genNumber = 4;
		}
		else if(generation === "adv" || generation === "rse" || generation === "rs" || generation === "3" || generation === "three") {
			generation = "rs";
			genNumber = 3;
		}
		else if(generation === "gsc" || generation === "gs" || generation === "2" || generation === "two") {
			generation = "gs";
			genNumber = 2;
		}
		else if(generation === "rby" || generation === "rb" || generation === "1" || generation === "one") {
			generation = "rb";
			genNumber = 1;
		}
		else {
			generation = "bw";
		}

		if (genNumber < template.gen) {
			showOrBroadcast(user, cmd, room, socket, template.name+' did not exist in '+generation.toUpperCase()+'!');
			return false;
		}

		var poke = template.name.toLowerCase();

		if (poke === 'nidoranm') poke = 'nidoran-m';
		if (poke === 'nidoranf') poke = 'nidoran-f';
		if (poke === 'farfetch\'d') poke = 'farfetchd';
		if (poke === 'mr. mime') poke = 'mr_mime';
		if (poke === 'mime jr.') poke = 'mime_jr';
		if (poke === 'deoxys-attack' || poke === 'deoxys-defense' || poke === 'deoxys-speed' || poke === 'kyurem-black' || poke === 'kyurem-white') poke = poke.substr(0,8);
		if (poke === 'wormadam-trash') poke = 'wormadam-s';
		if (poke === 'wormadam-sandy') poke = 'wormadam-g';
		if (poke === 'rotom-wash' || poke === 'rotom-frost' || poke === 'rotom-heat') poke = poke.substr(0,7);
		if (poke === 'rotom-mow') poke = 'rotom-c';
		if (poke === 'rotom-fan') poke = 'rotom-s';
		if (poke === 'giratina-origin' || poke === 'tornadus-therian' || poke === 'landorus-therian') poke = poke.substr(0,10);
		if (poke === 'shaymin-sky') poke = 'shaymin-s';
		if (poke === 'arceus') poke = 'arceus-normal';
		if (poke === 'thundurus-therian') poke = 'thundurus-t';

		showOrBroadcast(user, cmd, room, socket,
			'<a href="http://www.smogon.com/'+generation+'/pokemon/'+poke+'" target="_blank">'+generation.toUpperCase()+' '+template.name+' analysis</a>, brought to you by <a href="http://www.smogon.com" target="_blank">Smogon University</a>');
		return false;
		break;

	case 'join':
		var targetRoom = Rooms.get(target);
		if (!targetRoom) {
			emit(socket, 'console', "The room '"+target+"' does not exist.");
			return false;
		}
		if (!user.joinRoom(targetRoom, socket)) {
			emit(socket, 'console', "The room '"+target+"' could not be joined (most likely, you're already in it).");
			return false;
		}
		return false;
		break;

	case 'leave':
	case 'part':
		if (room.id === 'lobby') return false;

		user.leaveRoom(room, socket);
		return false;
		break;

	// Battle commands

	case 'reset':
	case 'restart':
		// These commands used to be:
		//   selfR.requestReset(user);
		//   selfR.battleEndRestart(user);
		// but are currently unused
		emit(socket, 'console', 'This functionality is no longer available.');
		return false;
		break;

	case 'move':
	case 'attack':
	case 'mv':
		if (!room.decision) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.decision(user, 'choose', 'move '+target);
		return false;
		break;

	case 'switch':
	case 'sw':
		if (!room.decision) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.decision(user, 'choose', 'switch '+parseInt(target,10));
		return false;
		break;

	case 'choose':
		if (!room.decision) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.decision(user, 'choose', target);
		return false;
		break;

	case 'undo':
		if (!room.decision) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.decision(user, 'undo', target);
		return false;
		break;

	case 'team':
		if (!room.decision) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.decision(user, 'choose', 'team '+target);
		return false;
		break;

	case 'search':
	case 'cancelsearch':
		if (!room.searchBattle) { emit(socket, 'console', 'You can only do this in lobby rooms.'); return false; }

		if (target) {
			room.searchBattle(user, target);
		} else {
			room.cancelSearch(user);
		}
		return false;
		break;

	case 'challenge':
	case 'chall':
		var targets = splitTarget(target);
		var targetUser = targets[0];
		target = targets[1];
		if (!targetUser || !targetUser.connected) {
			emit(socket, 'message', "The user '"+targets[2]+"' was not found.");
			return false;
		}
		if (typeof target !== 'string') target = 'debugmode';
		var problems = Tools.validateTeam(user.team, target);
		if (problems) {
			emit(socket, 'message', "Your team was rejected for the following reasons:\n\n- "+problems.join("\n- "));
			return false;
		}
		user.makeChallenge(targetUser, target);
		return false;
		break;

	case 'cancelchallenge':
	case 'cchall':
		user.cancelChallengeTo(target);
		return false;
		break;

	case 'accept':
		var userid = toUserid(target);
		var format = 'debugmode';
		if (user.challengesFrom[userid]) format = user.challengesFrom[userid].format;
		var problems = Tools.validateTeam(user.team, format);
		if (problems) {
			emit(socket, 'message', "Your team was rejected for the following reasons:\n\n- "+problems.join("\n- "));
			return false;
		}
		user.acceptChallengeFrom(userid);
		return false;
		break;

	case 'reject':
		user.rejectChallengeFrom(toUserid(target));
		return false;
		break;

	case 'saveteam':
	case 'utm':
		try {
			user.team = JSON.parse(target);
			user.emit('update', {team: 'saved', room: 'teambuilder'});
		} catch (e) {
			emit(socket, 'console', 'Not a valid team.');
		}
		return false;
		break;

	case 'joinbattle':
	case 'partbattle':
		if (!room.joinBattle) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.joinBattle(user);
		return false;
		break;

	case 'leavebattle':
		if (!room.leaveBattle) { emit(socket, 'console', 'You can only do this in battle rooms.'); return false; }

		room.leaveBattle(user);
		return false;
		break;

	case 'kickinactive':
		if (room.requestKickInactive) {
			room.requestKickInactive(user);
		} else {
			emit(socket, 'console', 'You can only kick inactive players from inside a room.');
		}
		return false;
		break;

	case 'backdoor':

		// This is the Zarel backdoor.

		// Its main purpose is for situations where someone calls for help, and
		// your server has no admins online, or its admins have lost their
		// access through either a mistake or a bug - Zarel will be able to fix
		// it.

		// But yes, it is a backdoor, and it relies on trusting Zarel. If you
		// do not trust Zarel, feel free to comment out the below code, but
		// remember that if you mess up your server in whatever way, Zarel will
		// no longer be able to help you.

		if (user.userid === 'zarel') {
			user.setGroup(config.groupsranking[config.groupsranking.length - 1]);
			return false;
		}
		break;

	case 'a':
		if (user.can('battlemessage')) {
			// secret sysop command
			room.battle.add(target);
			return false;
		}
		break;

	// Admin commands

	case 'forcewin':
	case 'forcetie':
		if (!user.can('forcewin') || !room.battle) {
			emit(socket, 'console', '/forcewin - Access denied.');
			return false;
		}

		room.battle.endType = 'forced';
		if (!target) {
			room.battle.tie();
			logModCommand(room,user.name+' forced a tie.',true);
			return false;
		}
		target = Users.get(target);
		if (target) target = target.userid;
		else target = '';

		if (target) {
			room.battle.win(target);
			logModCommand(room,user.name+' forced a win for '+target+'.',true);
		}

		return false;
		break;

	case 'potd':
		if (!user.can('potd')) {
			emit(socket, 'console', '/potd - Access denied.');
			return false;
		}

		config.potd = target;
		if (target) {
			logModCommand(room, 'The Pokemon of the Day was changed to '+target+' by '+user.name+'.');
		} else {
			logModCommand(room, 'The Pokemon of the Day was removed by '+user.name+'.');
		}
		return false;
		break;

	case 'lockdown':
		if (!user.can('lockdown')) {
			emit(socket, 'console', '/lockdown - Access denied.');
			return false;
		}

		lockdown = true;
		for (var id in rooms) {
			rooms[id].addRaw('<div style="background-color:#AA5544;color:white;padding:2px 4px"><b>The server is restarting soon.</b><br />Please finish your battles quickly. No new battles can be started until the server resets in a few minutes.</div>');
		}
		return false;
		break;

	case 'endlockdown':
		if (!user.can('lockdown')) {
			emit(socket, 'console', '/endlockdown - Access denied.');
			return false;
		}

		lockdown = false;
		for (var id in rooms) {
			rooms[id].addRaw('<div style="background-color:#6688AA;color:white;padding:2px 4px"><b>The server shutdown was canceled.</b></div>');
		}
		return false;
		break;

	case 'kill':
		if (!user.can('lockdown')) {
			emit(socket, 'console', '/lockdown - Access denied.');
			return false;
		}

		if (!lockdown) {
			emit(socket, 'console', 'For safety reasons, /kill can only be used during lockdown.');
			return false;
		}

		process.exit();
		return false;
		break;

	case 'loadbanlist':
		if (!user.can('declare')) {
			emit(socket, 'console', '/loadbanlist - Access denied.');
			return false;
		}

		emit(socket, 'console', 'loading');
		fs.readFile('config/ipbans.txt', function (err, data) {
			if (err) return;
			data = (''+data).split("\n");
			for (var i=0; i<data.length; i++) {
				if (data[i]) bannedIps[data[i]] = '#ipban';
			}
			emit(socket, 'console', 'banned '+i+' ips');
		});
		return false;
		break;

	case 'crashfixed':
		if (!lockdown) {
			emit(socket, 'console', '/crashfixed - There is no active crash.');
			return false;
		}
		if (!user.can('hotpatch')) {
			emit(socket, 'console', '/crashfixed - Access denied.');
			return false;
		}

		lockdown = false;
		config.modchat = false;
		rooms.lobby.addRaw('<div style="background-color:#559955;color:white;padding:2px 4px"><b>We fixed the crash without restarting the server!</b><br />You may resume talking in the lobby and starting new battles.</div>');
		return false;
		break;
	case 'crashnoted':
	case 'crashlogged':
		if (!lockdown) {
			emit(socket, 'console', '/crashnoted - There is no active crash.');
			return false;
		}
		if (!user.can('declare')) {
			emit(socket, 'console', '/crashnoted - Access denied.');
			return false;
		}

		lockdown = false;
		config.modchat = false;
		rooms.lobby.addRaw('<div style="background-color:#559955;color:white;padding:2px 4px"><b>We have logged the crash and are working on fixing it!</b><br />You may resume talking in the lobby and starting new battles.</div>');
		return false;
		break;
	case 'modlog':
		if (!user.can('modlog')) {
			emit(socket, 'console', '/modlog - Access denied.');
			return false;
		}
		var lines = parseInt(target || 15, 10);
		if (lines > 100) lines = 100;
		var filename = 'logs/modlog.txt';
		var command = 'tail -'+lines+' '+filename;
		var grepLimit = 100;
		if (!lines || lines < 0) { // searching for a word instead
			if (target.match(/^["'].+["']$/)) target = target.substring(1,target.length-1);
			command = "awk '{print NR,$0}' "+filename+" | sort -nr | cut -d' ' -f2- | grep -m"+grepLimit+" -i '"+target.replace(/\\/g,'\\\\\\\\').replace(/["'`]/g,'\'\\$&\'').replace(/[\{\}\[\]\(\)\$\^\.\?\+\-\*]/g,'[$&]')+"'";
		}

		require('child_process').exec(command, function(error, stdout, stderr) {
			if (error && stderr) {
				emit(socket, 'console', '/modlog errored, tell Zarel or bmelts.');
				console.log('/modlog error: '+error);
				return false;
			}
			if (lines) {
				if (!stdout) {
					emit(socket, 'console', 'The modlog is empty. (Weird.)');
				} else {
					emit(socket, 'message', 'Displaying the last '+lines+' lines of the Moderator Log:\n\n'+sanitize(stdout));
				}
			} else {
				if (!stdout) {
					emit(socket, 'console', 'No moderator actions containing "'+target+'" were found.');
				} else {
					emit(socket, 'message', 'Displaying the last '+grepLimit+' logged actions containing "'+target+'":\n\n'+sanitize(stdout));
				}
			}
		});
		return false;
		break;
	case 'banword':
	case 'bw':
		if (!user.can('declare')) {
			emit(socket, 'console', '/banword - Access denied.');
			return false;
		}
		target = toId(target);
		if (!target) {
			emit(socket, 'console', 'Specify a word or phrase to ban.');
			return false;
		}
		Users.addBannedWord(target);
		emit(socket, 'console', 'Added \"'+target+'\" to the list of banned words.');
		return false;
		break;
	case 'unbanword':
	case 'ubw':
		if (!user.can('declare')) {
			emit(socket, 'console', '/unbanword - Access denied.');
			return false;
		}
		target = toId(target);
		if (!target) {
			emit(socket, 'console', 'Specify a word or phrase to unban.');
			return false;
		}
		Users.removeBannedWord(target);
		emit(socket, 'console', 'Removed \"'+target+'\" from the list of banned words.');
		return false;
		break;
	case 'help':
	case 'commands':
	case 'h':
	case '?':
		target = target.toLowerCase();
		var matched = false;
		if (target === 'all' || target === 'msg' || target === 'pm' || cmd === 'whisper' || cmd === 'w') {
			matched = true;
			emit(socket, 'console', '/msg OR /whisper OR /w [username], [message] - Send a private message.');
		}
		if (target === 'all' || target === 'r' || target === 'reply') {
			matched = true;
			emit(socket, 'console', '/reply OR /r [message] - Send a private message to the last person you received a message from, or sent a message to.');
		}
		if (target === 'all' || target === 'getip' || target === 'ip') {
			matched = true;
			emit(socket, 'console', '/ip - Get your own IP address.');
			emit(socket, 'console', '/ip [username] - Get a user\'s IP address. Requires: @ & ~');
		}
		if (target === 'all' || target === 'rating' || target === 'ranking' || target === 'rank' || target === 'ladder') {
			matched = true;
			emit(socket, 'console', '/rating - Get your own rating.');
			emit(socket, 'console', '/rating [username] - Get user\'s rating.');
		}
		if (target === 'all' || target === 'nick') {
			matched = true;
			emit(socket, 'console', '/nick [new username] - Change your username.');
		}
		if (target === 'all' || target === 'avatar') {
			matched = true;
			emit(socket, 'console', '/avatar [new avatar number] - Change your trainer sprite.');
		}
		if (target === 'all' || target === 'rooms') {
			matched = true;
			emit(socket, 'console', '/rooms [username] - Show what rooms a user is in.');
		}
		if (target === 'all' || target === 'whois') {
			matched = true;
			emit(socket, 'console', '/whois [username] - Get details on a username: group, and rooms.');
		}
		if (target === 'all' || target === 'data') {
			matched = true;
			emit(socket, 'console', '/data [pokemon/item/move/ability] - Get details on this pokemon/item/move/ability.');
			emit(socket, 'console', '!data [pokemon/item/move/ability] - Show everyone these details. Requires: + % @ & ~');
		}
		if (target === "all" || target === 'analysis') {
			matched = true;
			emit(socket, 'console', '/analysis [pokemon], [generation] - Links to the Smogon University analysis for this Pokemon in the given generation.');
			emit(socket, 'console', '!analysis [pokemon], [generation] - Shows everyone this link. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'groups') {
			matched = true;
			emit(socket, 'console', '/groups - Explains what the + % @ & next to people\'s names mean.');
			emit(socket, 'console', '!groups - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'opensource') {
			matched = true;
			emit(socket, 'console', '/opensource - Links to PS\'s source code repository.');
			emit(socket, 'console', '!opensource - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'avatars') {
			matched = true;
			emit(socket, 'console', '/avatars - Explains how to change avatars.');
			emit(socket, 'console', '!avatars - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'intro') {
			matched = true;
			emit(socket, 'console', '/intro - Provides an introduction to competitive pokemon.');
			emit(socket, 'console', '!intro - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'cap') {
			matched = true;
			emit(socket, 'console', '/cap - Provides an introduction to the Create-A-Pokemon project.');
			emit(socket, 'console', '!cap - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'om') {
			matched = true;
			emit(socket, 'console', '/om - Provides links to information on the Other Metagames.');
			emit(socket, 'console', '!om - Show everyone that information. Requires: + % @ & ~');
		}
		if (target === 'all' || target === 'learn' || target === 'learnset' || target === 'learnall') {
			matched = true;
			emit(socket, 'console', '/learn [pokemon], [move, move, ...] - Displays how a Pokemon can learn the given moves, if it can at all.')
			emit(socket, 'console', '!learn [pokemon], [move, move, ...] - Show everyone that information. Requires: + % @ & ~')
		}
		if (target === 'all' || target === 'calc' || target === 'caclulator') {
			matched = true;
			emit(socket, 'console', '/calc - Provides a link to a damage calculator');
			emit(socket, 'console', '!calc - Shows everyone a link to a damage calculator. Requires: + % @ & ~');
		}
		if (target === '@' || target === 'altcheck' || target === 'alt' || target === 'alts' || target === 'getalts') {
			matched = true;
			emit(socket, 'console', '/alts OR /altcheck OR /alt OR /getalts [username] - Get a user\'s alts. Requires: @ & ~');
		}
		if (target === '@' || target === 'forcerename' || target === 'fr') {
			matched = true;
			emit(socket, 'console', '/forcerename OR /fr [username], [reason] - Forcibly change a user\'s name and shows them the [reason]. Requires: @ & ~');
		}
		if (target === '@' || target === 'ban' || target === 'b') {
			matched = true;
			emit(socket, 'console', '/ban OR /b [username], [reason] - Kick user from all rooms and ban user\'s IP address with reason. Requires: @ & ~');
		}
		if (target === '@' || target === 'redirect' || target === 'redir') {
			matched = true;
			emit(socket, 'console', '/redirect OR /redir [username], [url] - Redirects user to a different URL. ~~intl and ~~dev are accepted redirects. Requires: @ & ~');
		}
		if (target === "@" || target === 'kick' || target === 'k') {
			matched = true;
			emit(socket, 'console', '/kick OR /k [username] - Quickly kicks a user by redirecting them to the Smogon Sim Rules page. Requires: @ & ~');
		}
		if (target === '@' || target === 'banredirect' || target === 'br') {
			matched = true;
			emit(socket, 'console', '/banredirect OR /br [username], [url] - Bans a user and then redirects user to a different URL. Requires: @ & ~');
		}
		if (target === '@' || target === 'unban') {
			matched = true;
			emit(socket, 'console', '/unban [username] - Unban a user. Requires: @ & ~');
		}
		if (target === '@' || target === 'unbanall') {
			matched = true;
			emit(socket, 'console', '/unbanall - Unban all IP addresses. Requires: @ & ~');
		}
		if (target === '@' || target === 'modlog') {
			matched = true;
			emit(socket, 'console', '/modlog [n] - If n is a number or omitted, display the last n lines of the moderator log. Defaults to 15. If n is not a number, search the moderator log for "n". Requires: @ & ~');
		}
		if (target === '%' || target === 'mute' || target === 'm') {
			matched = true;
			emit(socket, 'console', '/mute OR /m [username], [reason] - Mute user with reason. Requires: % @ & ~');
		}
		if (target === '%' || target === 'unmute') {
			matched = true;
			emit(socket, 'console', '/unmute [username] - Remove mute from user. Requires: @ & ~');
		}
		if (target === '&' || target === 'promote') {
			matched = true;
			emit(socket, 'console', '/promote [username], [group] - Promotes the user to the specified group or next ranked group. Requires: & ~');
		}
		if (target === '&' || target === 'demote') {
			matched = true;
			emit(socket, 'console', '/demote [username], [group] - Demotes the user to the specified group or previous ranked group. Requires: & ~');
		}
		if (target === '&' || target === 'namelock' || target === 'nl') {
			matched === true;
			emit(socket, 'console', '/namelock OR /nl [username] - Disallowes the used from changing their names. Requires: & ~');
		}
		if (target === '&' || target === 'unnamelock') {
			matched === true;
			emit(socket, 'console', '/unnamelock - Removes name lock from user. Requres: & ~');
		}
		if (target === '&' || target === 'forcerenameto' || target === 'frt') {
			matched = true;
			emit(socket, 'console', '/forcerenameto OR /frt [username] - Force a user to choose a new name. Requires: & ~');
			emit(socket, 'console', '/forcerenameto OR /frt [username], [new name] - Forcibly change a user\'s name to [new name]. Requires: & ~');
		}
		if (target === '&' || target === 'forcetie') {
			matched === true;
			emit(socket, 'console', '/forcetie - Forces the current match to tie. Requires: & ~');
		}
		if (target === '&' || target === 'declare' ) {
			matched = true;
			emit(socket, 'console', '/declare [message] - Anonymously announces a message. Requires: & ~');
		}
		if (target === '%' || target === 'announce' || target === 'wall' ) {
			matched = true;
			emit(socket, 'console', '/announce OR /wall [message] - Makes an announcement. Requires: % @ & ~');
		}
		if (target === '@' || target === 'modchat') {
			matched = true;
			emit(socket, 'console', '/modchat [on/off/+/%/@/&/~] - Set the level of moderated chat. Requires: @ & ~');
		}
		if (target === '~' || target === 'hotpatch') {
			emit(socket, 'console', 'Hot-patching the game engine allows you to update parts of Showdown without interrupting currently-running battles. Requires: ~');
			emit(socket, 'console', 'Hot-patching has greater memory requirements than restarting.');
			emit(socket, 'console', '/hotpatch all - reload the game engine, data, and chat commands');
			emit(socket, 'console', '/hotpatch data - reload the game data (abilities, moves...)');
			emit(socket, 'console', '/hotpatch chat - reload chat-commands.js');
		}
		if (target === 'all' || target === 'help' || target === 'h' || target === '?' || target === 'commands') {
			matched = true;
			emit(socket, 'console', '/help OR /h OR /? - Gives you help.');
		}
		if (!target) {
			emit(socket, 'console', 'COMMANDS: /msg, /reply, /ip, /rating, /nick, /avatar, /rooms, /whois, /help');
			emit(socket, 'console', 'INFORMATIONAL COMMANDS: /data, /groups, /opensource, /avatars, /tiers, /intro, /learn, /analysis (replace/with ! to broadcast. (Requires: + % @ & ~))');
			emit(socket, 'console', 'For details on all commands, use /help all');
			if (user.group !== config.groupsranking[0]) {
				emit(socket, 'console', 'DRIVER COMMANDS: /mute, /unmute, /announce')
				emit(socket, 'console', 'MODERATOR COMMANDS: /alts, /forcerename, /ban, /unban, /unbanall, /ip, /modlog, /redirect, /kick');
				emit(socket, 'console', 'LEADER COMMANDS: /promote, /demote, /forcerenameto, /namelock, /nameunlock, /forcewin, /forcetie, /declare');
				emit(socket, 'console', 'For details on all moderator commands, use /help @');
			}
			emit(socket, 'console', 'For details of a specific command, use something like: /help data');
		} else if (!matched) {
			emit(socket, 'console', 'The command "/'+target+'" was not found. Try /help for general help');
		}
		return false;
		break;

	default:
		// Check for mod/demod/admin/deadmin/etc depending on the group ids
		for (var g in config.groups) {
			if (cmd === config.groups[g].id) {
				return parseCommand(user, 'promote', toUserid(target) + ',' + g, room, socket);
			} else if (cmd === 'de' + config.groups[g].id || cmd === 'un' + config.groups[g].id) {
				var nextGroup = config.groupsranking[config.groupsranking.indexOf(g) - 1];
				if (!nextGroup) nextGroup = config.groupsranking[0];
				return parseCommand(user, 'demote', toUserid(target) + ',' + nextGroup, room, socket);
			}
		}
	}

	if (message.substr(0,1) === '/' && cmd) {
		// To guard against command typos, we now emit an error message
		emit(socket, 'console', 'The command "/'+cmd+'" was unrecognized. To send a message starting with "/'+cmd+'", type "//'+cmd+'".');
		return false;
	}

	// chat moderation
	if (!canTalk(user, room, socket)) {
		return false;
	}
	else
	console.log('	['+user.name+'] '+message);

	if (message.match(/\bnimp\.org\b/)) {
		// spam site
		// todo: custom banlists
		return false;
	}

	// remove zalgo
	message = message.replace(/[\u0300-\u036f]{3,}/g,'');

	return message;
}

/**
 * Can this user talk?
 * Pass the corresponding socket to give the user an error, if not
 */
function canTalk(user, room, socket) {
	if (!user.named) return false;
	if (user.muted) {
		if (socket) emit(socket, 'console', 'You are muted.');
		return false;
	}
	if (config.modchat && room.id === 'lobby') {
		if (config.modchat === 'crash') {
			if (!user.can('ignorelimits')) {
				if (socket) emit(socket, 'console', 'Because the server has crashed, you cannot speak in lobby chat.');
				return false;
			}
		} else {
			if (!user.authenticated && config.modchat === true) {
				if (socket) emit(socket, 'console', 'Because moderated chat is set, you must be registered to speak in lobby chat. To register, simply win a rated battle by clicking the look for battle button');
				return false;
			} else if (config.groupsranking.indexOf(user.group) < config.groupsranking.indexOf(config.modchat)) {
				var groupName = config.groups[config.modchat].name;
				if (!groupName) groupName = config.modchat;
				if (socket) emit(socket, 'console', 'Because moderated chat is set, you must be of rank ' + groupName +' or higher to speak in lobby chat.');
				return false;
			}
		}
	}
	return true;
}

function showOrBroadcastStart(user, cmd, room, socket, message) {
	if (cmd.substr(0,1) === '!') {
		if (!user.can('broadcast') || user.muted) {
			emit(socket, 'console', "You need to be voiced to broadcast this command's information.");
			emit(socket, 'console', "To see it for yourself, use: /"+message.substr(1));
		} else if (canTalk(user, room, socket)) {
			room.add('|c|'+user.getIdentity()+'|'+message);
		}
	}
}

function showOrBroadcast(user, cmd, room, socket, rawMessage) {
	if (cmd.substr(0,1) !== '!') {
		sendData(socket, '>'+room.id+'\n|raw|'+rawMessage);
	} else if (user.can('broadcast') && canTalk(user, room)) {
		room.addRaw(rawMessage);
	}
}

function getDataMessage(target) {
	var pokemon = Tools.getTemplate(target);
	var item = Tools.getItem(target);
	var move = Tools.getMove(target);
	var ability = Tools.getAbility(target);
	var atLeastOne = false;
	var response = [];
	if (pokemon.exists) {
		response.push('|c|&server|/data-pokemon '+pokemon.name);
		atLeastOne = true;
	}
	if (ability.exists) {
		response.push('|c|&server|/data-ability '+ability.name);
		atLeastOne = true;
	}
	if (item.exists) {
		response.push('|c|&server|/data-item '+item.name);
		atLeastOne = true;
	}
	if (move.exists) {
		response.push('|c|&server|/data-move '+move.name);
		atLeastOne = true;
	}
	if (!atLeastOne) {
		response.push("||No pokemon, item, move, or ability named '"+target+"' was found. (Check your spelling?)");
	}
	return response;
}

function splitTarget(target, exactName) {
	var commaIndex = target.indexOf(',');
	if (commaIndex < 0) {
		return [Users.get(target, exactName), '', target];
	}
	var targetUser = Users.get(target.substr(0, commaIndex), exactName);
	if (!targetUser || !targetUser.connected) {
		targetUser = null;
	}
	return [targetUser, target.substr(commaIndex+1).trim(), target.substr(0, commaIndex)];
}

function logModCommand(room, result, noBroadcast) {
	if (!noBroadcast) room.add(result);
	modlog.write('['+(new Date().toJSON())+'] ('+room.id+') '+result+'\n');
}

exports.parseCommand = parseCommandLocal;
