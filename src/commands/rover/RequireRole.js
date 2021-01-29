const { stripIndents, oneLine } = require('common-tags')
const Command = require('../Command')
const Util = require('../../Util')
const VirtualGroups = require('../../VirtualGroups.js')
const config = require('../../data/client.json')

module.exports =
class RequireRole extends Command {
  constructor (client) {
    super(client, {
      name: 'requirerole',
      properName: 'RequireRole',
      aliases: [],
      description: '`<"Discord Role">` Requires/unrequires the specified role. At least one of the required roles must be given by TRAoVer for the role awarded message',

      args: [
        {
          key: 'role',
          prompt: 'Discord Role to require:',
          type: 'role'
        },
        {
          key: 'required',
          prompt: 'true/false:',
          type: 'boolean'
        },
      ]
    })
  }

  async fn (msg, args) {
    if (this.server.ongoingSettingsUpdate) return msg.reply('Server settings are currently being saved - please try again in a few moments.')

    if (!this.server.isRoleInUse(args.role.id)) {
      msg.reply(
        oneLine`:no_entry_sign: That role is not bound to. (verified role, not verified role, or from a group binding).
        Run \`${msg.guild.commandPrefix}bindings\` to see all role bindings.`
      )
      return
    }

	const requiredRoles = this.server.getSetting('requiredRoles')
    if (args.required) {
      msg.reply(`Required ${args.role.name}`)
      requiredRoles[args.role.id] = true
      this.server.setSetting('requiredRoles', requiredRoles)
    } else {
      msg.reply(`Unrequired ${args.role.name}`)
      delete requiredRoles[args.role.id]
      this.server.setSetting('requiredRoles', requiredRoles)
    }
  }
}
