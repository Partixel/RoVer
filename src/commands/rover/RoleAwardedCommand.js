const Command = require('../Command')

module.exports =
class WelcomeMessageCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'roleawardedmessage',
      properName: 'RoleAwardedMessage',
      aliases: ['roverroleawardedmessage'],
      description: '`<Message>` Set the message the user gets when they get a role. Available replacements are %USERNAME%, %USERID%, %SERVER%, %DISCORDNAME%, and %DISCORDID%. Default: Welcome to %SERVER%, %USERNAME%!.',

      args: [
        {
          key: 'message',
          label: 'message',
          prompt: 'Role awarded message',
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
      this.server.setSetting('roleAwardedMessage', args.message)
      msg.reply(`Set role awarded message to \`${args.message}\``)
    } else {
      this.server.setSetting('roleAwardedMessage', undefined)
      msg.reply('Set role awarded  message back to default')
    }
  }
}
