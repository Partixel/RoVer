const Command = require('../Command')

module.exports =
class NicknameAllyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nicknameally',
      properName: 'NicknameAlly',
      aliases: ['rovernicknameally'],
      description: "`<groupid>` Set a nickname for a ally in the NicknameGroup for use in username formatting",

      args: [
        {
          key: 'allyid',
          label: 'allyid',
          prompt: 'Ally',
          type: 'integer',
          infinite: false
        },
        {
          key: 'nickname',
          prompt: 'Nickname',
          type: 'string',
          infinite: true
        }
      ]
    })
  }

  async fn (msg, args) {
    if (this.server.ongoingSettingsUpdate) return msg.reply('Server settings are currently being saved - please try again in a few moments.')
	
	const allyNicknames = this.server.getSetting('allyNicknames')
	
    if (args.nickname != "none") {
      msg.reply(`Set nickname of ${args.allyid} to \`${args.nickname}\``)
      allyNicknames[args.allyid] = args.nickname
      this.server.setSetting('allyNicknames', allyNicknames)
    } else {
      msg.reply(`Nickname for ${args.allyid} has been removed.`)
      delete allyNicknames[args.allyid]
      this.server.setSetting('allyNicknames', allyNicknames)
    }
  }
}
