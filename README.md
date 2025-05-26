# PoliTo Rocket Team Discord Role Bot

This Discord bot automatically assigns roles to new members based on data stored in a Supabase database. For now, it assigns a placeholder role until the full role list is defined.

## Features

- Listens for new members joining the Discord server.
- Checks the Supabase database for the user's Discord username.
- Assigns the appropriate role (currently a placeholder role).
- Logs actions to the console.
- Welcomes new members with a message in a designated channel.

## Prerequisites

- Node.js (v16.9.0 or higher)
- A Discord bot token with required intents enabled.
- Supabase project with a table named `members` containing `discord_username` and `division` fields.
- `.env` file containing your secrets.

## Setup

1. **Clone the repository**

git clone https://github.com/egekaya1/PRT-role-bot.git
cd PRT-role-bot

2. **Install dependencies**

npm install

3. **Create a `.env` file**

Create a file named `.env` in the project root with the following contents:

DISCORD_TOKEN=your_discord_bot_token_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_or_service_key

Make sure `.env` is in `.gitignore` to keep it private.

4. **Run the bot**

node index.js

## How it works

* The bot connects to Discord using the bot token.
* On the `guildMemberAdd` event (when a new member joins), it:

  * Looks up the member’s Discord username in the Supabase `members` table.
  * If found, assigns the appropriate role (currently a placeholder role).
  * Sends a welcome message in a specific channel (you can configure this).
* All important actions and errors are logged to the console.

## Adding new roles

* Update the role assignment logic in `index.js` once the list of roles and divisions is finalized.
* Make sure the role names in Discord exactly match those in the code.

