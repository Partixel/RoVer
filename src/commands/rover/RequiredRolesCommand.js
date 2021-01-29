const Command = require('../Command')
const DiscordServer = require('../../DiscordServer')
const Util = require('../../Util')

module.exports =
class RequiredRolesCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'requiredroles',
      properName: 'RequiredRoles',
      aliases: ['listrequiredroles'],
      description: 'Displays a list of required roles'
    })
  }

  async getRoleName (id) {
    const role = await this.server.server.roles.fetch(id)
    if (role) return role.name
    return '<Deleted role>'
  }

  async fn (msg) {
    let Text = ' '
	
	if (Object.keys(this.server.getSetting('requiredRoles')).length !== 0) {
		 Text += '**Required Roles**\n'
		
		for (const role of Object.keys(this.server.getSetting('requiredRoles'))) {
		  
		  Text += await this.getRoleName(role) + "\n"

		  if (Text.length > 1500) {
			msg.reply(Text)
			Text = ' '
		  }
		}
	} else {
		Text += "No required roles"
	}

    if (Text.length > 0) msg.reply(Text)
	
  }
}
