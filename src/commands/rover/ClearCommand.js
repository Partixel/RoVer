const Command = require('../Command')
const DiscordServer = require('../../DiscordServer')

module.exports =
class ClearCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'clear',
      properName: 'Clear',
      description: '`<Discord User>` Clears all the users roles',
      throttling: { usages: 1, duration: 10 }, // 1 usage every 10 seconds

      args: [
        {
          key: 'user',
          prompt: 'User to clear',
          type: 'user'
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(this.userPermissions) || msg.member.roles.cache.find(role => role.name === 'RoVer Admin') || msg.member.roles.cache.find(role => role.name === 'RoVer Updater')
  }

  async fn (msg, args) {
	const target = args.user

    const server = await this.discordBot.getServer(msg.guild.id)
	const member = await server.getMember(target.id)
	if (!member) {
		return msg.reply('User not in guild.')
	}
	member.member.roles.set([])
	
	msg.reply(`Cleared ${member.member}'s roles`)
  }
}