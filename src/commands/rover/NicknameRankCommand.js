const Command = require('../Command')

module.exports =
class NicknameRankCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nicknamerank',
      properName: 'NicknameRank',
      aliases: ['rovernicknamerank'],
      description: "`<groupid>` Set a nickname for a rank in the NicknameGroup for use in username formatting",

      args: [
        {
          key: 'rankid',
          label: 'rankid',
          prompt: 'Rank',
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
	
	const rankNicknames = this.server.getSetting('rankNicknames')
	
    if (args.nickname != "none") {
      msg.reply(`Set nickname of ${args.rankid} to \`${args.nickname}\``)
      rankNicknames[args.rankid] = args.nickname
      this.server.setSetting('rankNicknames', rankNicknames)
    } else {
      msg.reply(`Nickname for ${args.rankid} has been removed.`)
      delete rankNicknames[args.rankid]
      this.server.setSetting('rankNicknames', rankNicknames)
    }
  }
}
