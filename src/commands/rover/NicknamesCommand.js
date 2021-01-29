const Command = require('../Command')
const DiscordServer = require('../../DiscordServer')
const Util = require('../../Util')

module.exports =
class NicknamesCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nicknames',
      properName: 'Nicknames',
      aliases: ['listnicknames'],
      description: 'Displays a list of rank and ally nicknames'
    })
  }


  async fn (msg) {
    let Text = ' '
	
	if (Object.keys(this.server.getSetting('rankNicknames')).length !== 0) {
		 Text += '**Rank Nicknames**\n'
		
		for (const [rank, nickname] of Object.entries(this.server.getSetting('rankNicknames'))) {
		  
		  Text += rank.toString() + ": " + nickname + "\n"

		  if (Text.length > 1500) {
			msg.reply(Text)
			Text = ' '
		  }
		}
	}
	
	if (Object.keys(this.server.getSetting('allyNicknames')).length !== 0) {
		Text += '**Ally Nicknames**\n'
		
		for (const [ally, nickname] of Object.entries(this.server.getSetting('allyNicknames'))) {
		  
		  Text += ally.toString() + ": " + nickname + "\n"

		  if (Text.length > 1500) {
			msg.reply(Text)
			Text = ' '
		  }
		}
	}
	
	if (Object.keys(this.server.getSetting('allyNicknames')).length === 0 && Object.keys(this.server.getSetting('rankNicknames')).length === 0) {
		Text += "No nicknames present"
	}

    if (Text.length > 0) msg.reply(Text)
	
  }
}
