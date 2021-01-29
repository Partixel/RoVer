const Command = require('../Command')

module.exports =
class WelcomeMessageCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'rolefailedmessage',
      properName: 'RoleFailedMessage',
      aliases: ['roverrolefailedmessage'],
      description: '`<Message>` Set the message the user gets when they fail to get a role. Available replacements are %USERNAME%, %USERID%, %SERVER%, %DISCORDNAME%, and %DISCORDID%. Default: Welcome to %SERVER%, %USERNAME%!.',

      args: [
        {
          key: 'message',
          label: 'message',
          prompt: 'Role failed message',
          type: 'string',
          default: false,
          optional: true
        }
      ]
    })
  }

  async fn (msg, args) {
    if (this.server.ongoingSettingsUpdate) return msg.reply('Server settings are currently being saved - please try again in a few moments.')
    if (args.message) {
      this.server.setSetting('roleFailedMessage', args.message)
      msg.reply(`Set role failed message to \`${args.message}\``)
    } else {
      this.server.setSetting('roleFailedMessage', undefined)
      msg.reply('Set role failed  message back to default')
    }
  }
}
